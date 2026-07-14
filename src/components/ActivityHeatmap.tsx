import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Flame } from 'lucide-react';

export function ActivityHeatmap() {
  const [selectedCell, setSelectedCell] = useState<{ faculty: string, activity: string, value: number } | null>(null);

  const faculties = [
    'التربية النوعية',
    'الهندسة',
    'العلوم',
    'الطب',
    'الزراعة',
    'الفنون الجميلة'
  ];

  const activities = [
    'إعادة التدوير',
    'توفير الطاقة',
    'المواصلات الخضراء',
    'المبادرات الورقية',
    'الندوات البيئية',
    'مشاريع التشجير'
  ];

  // Mock data generation
  const generateData = () => {
    const data: { [key: string]: { [key: string]: number } } = {};
    faculties.forEach(faculty => {
      data[faculty] = {};
      activities.forEach(activity => {
        // Generate a random score between 0 and 100
        data[faculty][activity] = Math.floor(Math.random() * 100);
      });
    });
    // Let's boost Specific Education just to make it stand out as requested previously
    data['التربية النوعية']['توفير الطاقة'] = 95;
    data['التربية النوعية']['إعادة التدوير'] = 88;
    return data;
  };

  const [data] = useState(generateData());

  const getColor = (value: number) => {
    if (value < 20) return 'bg-emerald-50';
    if (value < 40) return 'bg-emerald-200';
    if (value < 60) return 'bg-emerald-400';
    if (value < 80) return 'bg-emerald-600';
    return 'bg-emerald-800';
  };

  const getTextColor = (value: number) => {
    return value >= 60 ? 'text-white' : 'text-emerald-900';
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">الخريطة الحرارية للتفاعل</h2>
            <p className="text-sm text-gray-500">معدلات الأنشطة البيئية حسب الكلية</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header row */}
          <div className="flex mb-2">
            <div className="w-32 shrink-0"></div>
            {activities.map(activity => (
              <div key={activity} className="flex-1 text-center text-xs font-semibold text-gray-500 -rotate-45 origin-bottom-right mb-4 whitespace-nowrap">
                {activity}
              </div>
            ))}
          </div>

          {/* Data rows */}
          <div className="space-y-2">
            {faculties.map(faculty => (
              <div key={faculty} className="flex items-center gap-2">
                <div className="w-32 shrink-0 text-sm font-bold text-gray-700 text-right pr-2">
                  {faculty}
                </div>
                {activities.map(activity => {
                  const value = data[faculty][activity];
                  return (
                    <motion.div
                      key={`${faculty}-${activity}`}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onMouseEnter={() => setSelectedCell({ faculty, activity, value })}
                      onMouseLeave={() => setSelectedCell(null)}
                      className={`flex-1 aspect-square rounded-md flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${getColor(value)} ${getTextColor(value)}`}
                    >
                      {value}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Tooltip info */}
      <div className="mt-8 flex items-center justify-between bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-600">مؤشر التفاعل:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-emerald-50"></div>
            <div className="w-4 h-4 rounded bg-emerald-200"></div>
            <div className="w-4 h-4 rounded bg-emerald-400"></div>
            <div className="w-4 h-4 rounded bg-emerald-600"></div>
            <div className="w-4 h-4 rounded bg-emerald-800"></div>
          </div>
          <span className="text-xs text-gray-500 mr-2">(من الأقل للأكثر)</span>
        </div>

        <div className="h-8 flex items-center justify-end w-1/2">
          <AnimatePresence mode="wait">
            {selectedCell && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-700 flex items-center gap-2 bg-white px-3 py-1 rounded border border-gray-200 shadow-sm"
              >
                <Info className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">{selectedCell.faculty}</span>
                <span>- {selectedCell.activity}:</span>
                <span className="font-bold text-emerald-600">{selectedCell.value} نقطة</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
