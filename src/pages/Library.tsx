import { motion, AnimatePresence } from 'motion/react';
import { libraryData } from '../data/mockData';
import { FileText, Video, Headphones, Download, Search, Filter, X } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { LibraryItem } from '../types';

export default function Library() {
  const [filter, setFilter] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<LibraryItem | null>(null);
  
  const filteredData = libraryData.filter(item => {
    const matchesFilter = filter === 'الكل' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'مقالة': return <FileText className="w-5 h-5" />;
      case 'فيديو': return <Video className="w-5 h-5" />;
      case 'بودكاست': return <Headphones className="w-5 h-5" />;
      case 'مستند': return <Download className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">مركز المعرفة والمحتوى</h1>
        <p className="text-lg text-gray-600">
          مكتبة شاملة تضم مقالات تفاعلية، مقاطع فيديو، وحلقات بودكاست لنشر الوعي حول التغير المناخي والحلول المستدامة.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="ابحث في المكتبة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
          />
          <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['الكل', 'مقالة', 'فيديو', 'بودكاست', 'مستند'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                filter === type 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
            onClick={() => {
              if (item.content || item.type === 'مقالة') {
                setSelectedArticle(item);
              }
            }}
          >
            <div className="relative aspect-video overflow-hidden shrink-0">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 flex items-center gap-1.5 shadow-sm">
                {getIcon(item.type)}
                {item.type}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <span className="text-xs font-bold text-primary-600 mb-2 block">{item.category}</span>
              <h3 className="font-bold text-lg text-gray-900 mb-4 line-clamp-2 leading-tight">
                {item.title}
              </h3>
              
              <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-50 pt-4 mt-auto">
                <span>{item.date}</span>
                {item.duration && (
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
                    {item.duration}
                  </span>
                )}
                {item.type === 'مستند' && (
                  <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1 font-semibold text-xs" onClick={(e) => e.stopPropagation()}>
                    تحميل PDF
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          لا يوجد محتوى يطابق بحثك.
        </div>
      )}

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
                    {getIcon(selectedArticle.type)}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-gray-900 line-clamp-1">{selectedArticle.title}</h2>
                    <span className="text-sm text-gray-500">{selectedArticle.date}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 sm:p-10">
                {selectedArticle.imageUrl && (
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title} 
                    className="w-full h-[300px] object-cover rounded-2xl mb-8"
                  />
                )}
                <div className="prose prose-green prose-lg max-w-none rtl markdown-body">
                  <Markdown>{selectedArticle.content || '*لا يوجد محتوى نصي متاح لهذا العنصر.*'}</Markdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
