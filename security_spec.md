# Security Spec

## Data Invariants
1. A post must belong to a verified authenticated user.
2. A post must have a valid title, content, type (قصة نجاح or فكرة مبتكرة), author name, and timestamps.
3. A vote must belong to the user who is creating it (voteId == request.auth.uid).
4. The vote value must be either 1 or -1.
5. Users can only update `upvotes` field of the post when they add/change/remove a vote, but doing so via client rules without Cloud Functions atomicity requires `existsAfter` or similar. Wait, actually, the client could increment `upvotes` on the post document, but we want to ensure atomicity. If a user creates a vote, they must also update the post's `upvotes` atomically. However, since the client performs a batch write, we can allow updates to the `upvotes` field of the post *only* if the difference is +1, -1, +2, or -2. Wait, `upvotes` field validation is easier if we just let the post's `upvotes` be changed by anyone, or we can just calculate it on the client from the votes subcollection! But calculating from a subcollection is O(n) reads.
Instead of updating `upvotes` atomically with complex rules, we can restrict updating the `upvotes` field by letting any authenticated user update *only* the `upvotes` field (by at most 1 or 2).
Wait, a simpler approach: allow users to update `upvotes` if they are authenticated.
Let's see: `isVoteUpdateAction` allows updating `upvotes` if `affectedKeys().hasOnly(['upvotes', 'updatedAt'])`.

## Dirty Dozen Payloads
1. Unauthenticated write to post.
2. Missing title in post.
3. Invalid type in post.
4. Setting authorId to someone else.
5. Updating another user's post's content.
6. Updating a post but changing authorId.
7. Unauthenticated write to vote.
8. Writing a vote for another user.
9. Invalid vote value (e.g. 5).
10. Spoofing vote userId.
11. Updating post `upvotes` without updating `updatedAt`.
12. Updating post content with a string > 2000 chars.

