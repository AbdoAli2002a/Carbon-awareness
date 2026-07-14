import { motion } from 'motion/react';
import { Map, Target, CheckCircle2, Circle, View } from 'lucide-react';

export function WebQuests() {
  // Mock Data for Quests
  const quests = [
    { 
      id: 1, 
      title: "اكتشاف مصادر الهدر المخفية", 
      description: "قم بمسح المعامل الأكاديمية لاكتشاف الأجهزة التي تستهلك طاقة أثناء وضع الاستعداد.",
      progress: 75,
      tasks: [
        { name: "التوجه لمعمل الحاسب الآلي 101", completed: true },
        { name: "تسجيل قراءة العداد الذكي", completed: true },
        { name: "إطفاء 5 حواسيب في وضع الاستعداد", completed: true },
        { name: "رفع التقرير النهائي للمشرف", completed: false },
      ]
    },
    { 
      id: 2, 
      title: "تقييم الغطاء النباتي للكلية", 
      description: "استخدم الجولة الافتراضية لحصر المساحات الخضراء واقتراح أماكن لزراعة أشجار جديدة.",
      progress: 30,
      tasks: [
        { name: "القيام بجولة افتراضية في الساحة الرئيسية", completed: true },
        { name: "تحديد 3 مناطق غير مستغلة", completed: false },
        { name: "اقتراح أنواع نباتات مقاومة للحرارة", completed: false },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Quests List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Map className="w-6 h-6 text-primary-600" aria-hidden="true" />
          الرحلات المعرفية (WebQuests)
        </h2>
        
        {quests.map(quest => (
          <div key={quest.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden" role="region" aria-labelledby={`quest-title-${quest.id}`}>
            {/* Progress Bar Background */}
            <div 
              className="absolute top-0 right-0 h-1 bg-primary-500 transition-all duration-1000"
              style={{ width: `${quest.progress}%` }}
              role="progressbar"
              aria-valuenow={quest.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`نسبة إنجاز الرحلة: ${quest.progress} بالمائة`}
            ></div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-900" id={`quest-title-${quest.id}`}>{quest.title}</h3>
              <span className="text-sm font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md" aria-hidden="true">{quest.progress}%</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{quest.description}</p>
            
            <ul className="space-y-3" aria-label="المهام المطلوبة">
              {quest.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" aria-label="مكتمل" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 shrink-0" aria-label="غير مكتمل" />
                  )}
                  <span className={task.completed ? "text-gray-500 line-through decoration-gray-300" : "text-gray-700 font-medium"}>
                    {task.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 360 VR Viewer Placeholder */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl flex flex-col relative" aria-label="جولة افتراضية بزاوية 360 درجة">
        <div className="p-4 bg-gray-950/80 backdrop-blur-md absolute top-0 w-full z-10 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center gap-2 text-white">
            <View className="w-5 h-5 text-primary-400" aria-hidden="true" />
            <h3 className="font-bold text-sm">مستعرض الحرم الجامعي (360° VR)</h3>
          </div>
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">محاكاة تفاعلية</span>
        </div>
        
        <div className="flex-1 relative min-h-[400px] flex items-center justify-center bg-gray-800 overflow-hidden cursor-move">
          {/* Simulated 360 Environment using a wide image and CSS animation for slow panning */}
          <div className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" aria-hidden="true"></div>
            <p className="text-white/80 font-semibold text-sm tracking-widest uppercase">يتم تحميل البيئة التفاعلية...</p>
            <p className="text-gray-500 text-xs mt-2 max-w-xs mx-auto">
              (مكون برمجي جاهز للربط مع مكتبات مثل Pannellum أو React 360)
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
