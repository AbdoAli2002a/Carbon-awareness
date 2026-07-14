export interface University {
  id: string;
  name: string;
  score: number;
  reductionPercentage: number;
  initiatives: number;
}

export interface GreenProject {
  id: string;
  name: string;
  location: string;
  type: 'طاقة شمسية' | 'طاقة رياح' | 'إعادة تدوير' | 'مباني خضراء';
  status: 'مكتمل' | 'قيد التنفيذ' | 'مخطط';
  impact: string;
  coordinates: { x: number; y: number }; // Percentage for map positioning
}

export interface LibraryItem {
  id: string;
  title: string;
  type: 'مقالة' | 'فيديو' | 'بودكاست' | 'مستند';
  category: string;
  duration?: string;
  date: string;
  imageUrl?: string;
  content?: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorId?: string;
  title: string;
  content: string;
  type: 'قصة نجاح' | 'فكرة مبتكرة';
  upvotes: number;
  date: string;
  tags: string[];
  createdAt?: number;
  updatedAt?: number;
}
