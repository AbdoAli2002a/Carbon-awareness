import { Users, Clock, Leaf, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export function InstructorDashboard() {
  // Mock data for learning analytics
  const engagementData = [
    { week: 'الأسبوع 1', students: 45, avgFootprint: 1200 },
    { week: 'الأسبوع 2', students: 85, avgFootprint: 1150 },
    { week: 'الأسبوع 3', students: 120, avgFootprint: 1050 },
    { week: 'الأسبوع 4', students: 180, avgFootprint: 900 },
    { week: 'الأسبوع 5', students: 250, avgFootprint: 750 },
  ];

  // SCORM/LTI Mock Export Data
  const lmsExportMock = {
    courseId: "ENV-101",
    timestamp: new Date().toISOString(),
    analytics: {
      totalActiveStudents: 250,
      averageSimulationTimeMinutes: 45,
      averageCarbonFootprintKg: 750
    },
    students: [
      { id: "STU-001", name: "أحمد سعيد", completionRate: 100, footprintReduction: 15 },
      { id: "STU-002", name: "سارة محمد", completionRate: 85, footprintReduction: 8 }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl" aria-hidden="true">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold" id="stat-students">الطلاب المتفاعلون</p>
            <p className="text-3xl font-black text-gray-900" aria-labelledby="stat-students">250</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl" aria-hidden="true">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold" id="stat-time">متوسط وقت المحاكاة</p>
            <p className="text-3xl font-black text-gray-900" aria-labelledby="stat-time">45 <span className="text-lg font-bold text-gray-400">دقيقة</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-xl" aria-hidden="true">
            <Leaf className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold" id="stat-footprint">متوسط البصمة الكربونية</p>
            <p className="text-3xl font-black text-gray-900" aria-labelledby="stat-footprint">750 <span className="text-lg font-bold text-gray-400">كجم</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">تحليل تفاعل الطلاب (شهرياً)</h3>
          <div className="h-[300px]" aria-label="رسم بياني يوضح زيادة عدد الطلاب المتفاعلين أسبوعياً">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="week" stroke="#9ca3af" tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [value, 'طالب']}
                />
                <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow-sm text-white flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">تصدير بيانات LMS (SCORM/LTI)</h3>
            <button 
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:ring-2 focus:ring-primary-500 outline-none"
              aria-label="تحميل بيانات النظام بصيغة JSON"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              تنزيل JSON
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            هذا الهيكل البرمجي يوضح كيفية تصدير نتائج وتفاعل الطلاب لدمجها مع أنظمة إدارة التعلم مثل Moodle أو Blackboard.
          </p>
          <div className="bg-gray-950 p-4 rounded-xl flex-1 overflow-auto border border-gray-800 font-mono text-sm" tabIndex={0} aria-label="كود JSON يوضح بيانات التصدير">
            <pre className="text-green-400 leading-relaxed">
              {JSON.stringify(lmsExportMock, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
