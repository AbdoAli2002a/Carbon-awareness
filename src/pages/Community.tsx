import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ThumbsUp, ThumbsDown, MessageSquare, PlusCircle, User, Star, LogIn, LogOut, Tag, Share2, Twitter, Facebook, Link } from 'lucide-react';
import { CommunityPost } from '../types';
import { db, auth, signInWithGoogle, logout } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { collection, onSnapshot, doc, setDoc, updateDoc, increment, getDoc, query, orderBy, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { EventsCalendar } from '../components/EventsCalendar';

const AVAILABLE_TAGS = ['إعادة تدوير', 'طاقة متجددة', 'نقل مستدام', 'ترشيد استهلاك', 'تشجير', 'أخرى'];

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPost, setNewPost] = useState<{title: string, content: string, type: string, tags: string[]}>({ title: '', content: '', type: 'قصة نجاح', tags: [] });
  const [user, setUser] = useState(auth.currentUser);
  const [filterTag, setFilterTag] = useState<string>('الكل');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('upvotes', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CommunityPost[];
      setPosts(postsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (postId: string, voteValue: number) => {
    if (!user) {
      alert("يرجى تسجيل الدخول للتصويت.");
      return;
    }

    try {
      const voteRef = doc(db, 'posts', postId, 'votes', user.uid);
      const voteSnap = await getDoc(voteRef);
      
      let netChange = voteValue;

      if (voteSnap.exists()) {
        const existingVote = voteSnap.data().value;
        if (existingVote === voteValue) {
          // Remove vote
          await deleteDoc(voteRef);
          netChange = -voteValue;
        } else {
          // Change vote
          await setDoc(voteRef, { userId: user.uid, value: voteValue });
          netChange = voteValue * 2;
        }
      } else {
        await setDoc(voteRef, { userId: user.uid, value: voteValue });
      }

      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        upvotes: increment(netChange),
        updatedAt: Date.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `posts/${postId}/votes`);
    }
  };

  const toggleTag = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : prev.tags.length < 5 ? [...prev.tags, tag] : prev.tags
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("يرجى تسجيل الدخول لنشر مساهمة.");
      return;
    }
    if (!newPost.title || !newPost.content) return;

    try {
      const postRef = doc(collection(db, 'posts'));
      const now = Date.now();
      const postData = {
        author: user.displayName || user.email?.split('@')[0] || 'مستخدم',
        authorId: user.uid,
        title: newPost.title,
        content: newPost.content,
        type: newPost.type,
        tags: newPost.tags,
        upvotes: 0,
        createdAt: now,
        updatedAt: now,
        date: new Date().toISOString().split('T')[0] // for display
      };

      await setDoc(postRef, postData);
      
      setIsFormOpen(false);
      setNewPost({ title: '', content: '', type: 'قصة نجاح', tags: [] });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    }
  };

  const displayedPosts = filterTag === 'الكل' 
    ? posts 
    : posts.filter(post => post.tags?.includes(filterTag));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-2xl mb-6">
          <MessageSquare className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">مساهمات المجتمع</h1>
        <p className="text-lg text-gray-600">
          شارك قصص نجاحك في تقليل البصمة الكربونية أو اقترح أفكاراً مبتكرة لحماية بيئتنا. صوت لأفضل الأفكار والمبادرات.
        </p>
      </motion.div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 justify-center pb-4">
        <button
          onClick={() => setFilterTag('الكل')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            filterTag === 'الكل'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          الكل
        </button>
        {AVAILABLE_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              filterTag === tag
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            {tag}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">أبرز المساهمات</h2>
        <div className="flex gap-3">
          {user ? (
            <>
              <button 
                onClick={logout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج
              </button>
              <button 
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                مساهمة جديدة
              </button>
            </>
          ) : (
            <button 
              onClick={signInWithGoogle}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              تسجيل الدخول للمشاركة
            </button>
          )}
        </div>
      </div>

      {isFormOpen && user && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold mb-4">أضف مساهمتك</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">نوع المساهمة</label>
                <select 
                  value={newPost.type}
                  onChange={e => setNewPost({...newPost, type: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                >
                  <option value="قصة نجاح">قصة نجاح</option>
                  <option value="فكرة مبتكرة">فكرة مبتكرة</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">العنوان</label>
              <input 
                type="text" 
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">التصنيفات (اختر حتى 5)</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {AVAILABLE_TAGS.map(tag => {
                  const isSelected = newPost.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${
                        isSelected
                          ? 'bg-primary-100 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">التفاصيل</label>
              <textarea 
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]" 
                required 
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button 
                type="submit" 
                className="px-6 py-3 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                نشر
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-6">
        {displayedPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            لا توجد مساهمات بهذا التصنيف حتى الآن.
          </div>
        )}
        {displayedPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-6"
          >
            {/* Voting Column */}
            <div className="flex flex-col items-center gap-2 border-l border-gray-100 pl-6 shrink-0">
              <button 
                onClick={() => handleVote(post.id, 1)}
                className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
              >
                <ThumbsUp className="w-6 h-6" />
              </button>
              <span className="text-xl font-bold text-gray-900">{post.upvotes}</span>
              <button 
                onClick={() => handleVote(post.id, -1)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <ThumbsDown className="w-6 h-6" />
              </button>
            </div>

            {/* Content Column */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                  post.type === 'قصة نجاح' ? 'bg-primary-100 text-primary-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {post.type}
                </div>
                {index < 2 && filterTag === 'الكل' && ( // Top 2 are considered "Top Rated"
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                    <Star className="w-3 h-3 fill-amber-500" /> متميز
                  </div>
                )}
                {post.tags && post.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                <span className="text-gray-400 text-sm mr-auto">{post.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{post.content}</p>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <User className="w-4 h-4" />
                  بواسطة: <span className="font-semibold text-gray-700">{post.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors group relative" title="مشاركة عبر تويتر">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative" title="مشاركة عبر فيسبوك">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors group relative" title="نسخ الرابط" onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('تم نسخ الرابط');
                  }}>
                    <Link className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <EventsCalendar />
    </div>
  );
}
