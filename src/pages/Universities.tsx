import { motion } from 'motion/react';
import { universitiesData } from '../data/mockData';
import { ActivityHeatmap } from '../components/ActivityHeatmap';
import { Trophy, GraduationCap, Leaf, Award, BookOpen } from 'lucide-react';

export default function Universities() {
  const sortedUniversities = [...universitiesData].sort((a, b) => b.score - a.score);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-2xl mb-6">
          <GraduationCap className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">الجامعات والبحث العلمي</h1>
        <p className="text-lg text-gray-600">
          منصة لعرض مبادرات الحرم الجامعي الأخضر، وإبراز دور المؤسسات الأكاديمية في قيادة الابتكار نحو مستقبل مستدام.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900">ترتيب الجامعات الخضراء</h2>
            </div>
            
            <div className="space-y-4">
              {sortedUniversities.map((uni, index) => (
                <div key={uni.id} className="flex items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ml-4 ${
                    index === 0 ? 'bg-amber-100 text-amber-700' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-primary-50 text-primary-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{uni.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-green-600 flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        {uni.reductionPercentage}% خفض
                      </span>
                    </div>
                  </div>
                  <div className="text-xl font-black text-primary-600">
                    {uni.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Initiatives & Articles */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="bg-primary-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-800 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">برنامج الحرم الجامعي الأخضر</h2>
              <p className="text-primary-200 mb-6 max-w-lg">
                مبادرة تهدف إلى تحويل الجامعات إلى نماذج مصغرة للمدن المستدامة من خلال إدارة ذكية للنفايات، واستخدام الطاقة الشمسية، وتعزيز النقل الأخضر داخل الحرم.
              </p>
              <button className="bg-white text-primary-900 px-6 py-2 rounded-lg font-bold hover:bg-primary-50 transition-colors">
                انضم للمبادرة
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <Award className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">منح الأبحاث البيئية</h3>
              <p className="text-gray-600 text-sm mb-4">
                تمويل للأبحاث المبتكرة في مجالات التقاط الكربون وتخزينه والطاقة المتجددة للباحثين والطلاب.
              </p>
              <a href="#" className="text-blue-600 text-sm font-bold hover:underline">اقرأ التفاصيل ←</a>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <BookOpen className="w-8 h-8 text-emerald-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">المقالات الأكاديمية</h3>
              <p className="text-gray-600 text-sm mb-4">
                تصفح أحدث الأوراق البحثية والمقالات المبسطة المنشورة من قبل خبراء البيئة في الجامعات المحلية.
              </p>
              <a href="#" className="text-emerald-600 text-sm font-bold hover:underline">تصفح المكتبة ←</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Heatmap Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <ActivityHeatmap />
      </motion.div>
    </div>
  );
}

// Ensure BookOpen is imported. It wasn't in the initial imports for Universities.
