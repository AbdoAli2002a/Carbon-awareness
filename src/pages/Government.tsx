import { motion } from 'motion/react';
import { projectsData } from '../data/mockData';
import { MapPin, Target, Sun, Wind, Recycle, Building } from 'lucide-react';
import { useState } from 'react';

import { InteractiveHandbook } from '../components/InteractiveHandbook';

export default function Government() {
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'طاقة شمسية': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'طاقة رياح': return <Wind className="w-5 h-5 text-blue-500" />;
      case 'إعادة تدوير': return <Recycle className="w-5 h-5 text-green-500" />;
      case 'مباني خضراء': return <Building className="w-5 h-5 text-teal-500" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">الدولة والسياسات</h1>
        <p className="text-lg text-gray-600">
          تعرف على أهداف التنمية المستدامة والمشاريع الوطنية الكبرى التي تقود التحول نحو اقتصاد أخضر.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Vision Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-primary-900 text-white rounded-3xl p-8">
            <Target className="w-10 h-10 text-primary-400 mb-4" />
            <h2 className="text-2xl font-bold mb-4">أهداف رؤية الاستدامة</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 shrink-0"></div>
                <p className="text-primary-100 text-sm">الوصول إلى الحياد الصِفري بحلول عام 2060.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 shrink-0"></div>
                <p className="text-primary-100 text-sm">توليد 50% من الطاقة عبر مصادر متجددة بحلول 2030.</p>
              </li>
              <li className="flex gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 shrink-0"></div>
                <p className="text-primary-100 text-sm">زراعة 10 مليارات شجرة لتقليل التصحر.</p>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">تفاصيل المشروع المحدد</h3>
            {activeProject ? (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getIconForType(activeProject.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{activeProject.name}</h4>
                    <p className="text-xs text-gray-500">{activeProject.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">النوع</span>
                    <span className="text-sm font-semibold text-gray-900">{activeProject.type}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">الحالة</span>
                    <span className={`text-sm font-semibold px-2 py-0.5 rounded-full inline-block ${
                      activeProject.status === 'مكتمل' ? 'bg-green-100 text-green-700' :
                      activeProject.status === 'قيد التنفيذ' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activeProject.status}
                    </span>
                  </div>
                </div>
                
                <div className="bg-primary-50 p-4 rounded-xl">
                  <span className="text-xs text-primary-600 font-bold block mb-1">الأثر البيئي</span>
                  <p className="text-sm text-primary-900">{activeProject.impact}</p>
                </div>
              </motion.div>
            ) : (
              <p className="text-sm text-gray-500">اختر مشروعاً من الخريطة لعرض تفاصيله.</p>
            )}
          </div>
        </motion.div>

        {/* Interactive Map Area (Stylized Representation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden relative min-h-[500px] flex items-center justify-center p-8"
        >
          {/* Abstract Map Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
             backgroundImage: 'radial-gradient(#16a34a 1px, transparent 1px)',
             backgroundSize: '24px 24px'
          }}></div>
          
          <div className="relative w-full max-w-2xl aspect-video bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-blue-50/50">
              {/* Very abstract map shape */}
              <svg className="w-full h-full text-gray-200 drop-shadow-sm" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path fill="currentColor" d="M10,20 Q30,10 50,30 T90,20 L95,80 Q70,90 50,70 T10,80 Z" />
              </svg>
            </div>

            {/* Project Pins */}
            {projectsData.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`absolute w-8 h-8 -ml-4 -mt-8 flex items-center justify-center transition-transform hover:scale-110 focus:outline-none z-10`}
                style={{ top: `${project.coordinates.y}%`, left: `${project.coordinates.x}%` }}
              >
                <div className={`relative flex items-center justify-center w-full h-full ${activeProject.id === project.id ? 'animate-bounce' : ''}`}>
                  <MapPin className={`w-8 h-8 ${activeProject.id === project.id ? 'text-primary-600 drop-shadow-md' : 'text-gray-400'}`} fill={activeProject.id === project.id ? '#f0fdf4' : 'white'} />
                </div>
              </button>
            ))}
          </div>
          
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 text-sm text-gray-600 max-w-xs">
            <p><strong>خريطة المشاريع التفاعلية:</strong> اضغط على المؤشرات لاستكشاف مبادرات الطاقة النظيفة المنتشرة في أنحاء البلاد.</p>
          </div>
        </motion.div>
      </div>

      <InteractiveHandbook />
    </div>
  );
}
