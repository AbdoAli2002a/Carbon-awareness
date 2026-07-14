import { Trophy, Award, Medal, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function Gamification() {
  const leaderboardData = [
    { rank: 1, team: "كلية الهندسة البيئية", reduction: 45, members: 120 },
    { rank: 2, team: "كلية العلوم", reduction: 38, members: 85 },
    { rank: 3, team: "كلية تكنولوجيا المعلومات", reduction: 32, members: 150 },
    { rank: 4, team: "كلية إدارة الأعمال", reduction: 25, members: 200 },
  ];

  const badges = [
    { id: 1, title: "مُحلل بيانات مناخية", icon: <Star className="w-8 h-8 text-amber-500" />, date: "2024-05-10", desc: "أكمل تحليل بيانات انبعاثات الكلية بنجاح.", earned: true },
    { id: 2, title: "صديق للبيئة الذهبي", icon: <ShieldCheck className="w-8 h-8 text-green-500" />, date: "2024-06-01", desc: "خفض استهلاكه الشخصي للكهرباء بنسبة 30%.", earned: true },
    { id: 3, title: "قائد فريق أخضر", icon: <Medal className="w-8 h-8 text-primary-500" />, date: "جارٍ الإنجاز", desc: "قم بتوجيه 5 طلاب جدد لاستخدام المحاكاة.", earned: false },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      {/* Leaderboard */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
          <Trophy className="w-8 h-8 text-amber-500" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-gray-900" id="leaderboard-heading">لوحة الصدارة (الأقسام)</h2>
        </div>
        
        <div className="space-y-4" role="list" aria-labelledby="leaderboard-heading">
          {leaderboardData.map((team, index) => (
            <div key={index} className="flex items-center p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary-200 transition-colors" role="listitem">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ml-4 shrink-0 shadow-sm ${
                  index === 0 ? 'bg-amber-400 text-amber-900' :
                  index === 1 ? 'bg-gray-300 text-gray-800' :
                  index === 2 ? 'bg-orange-300 text-orange-900' :
                  'bg-white text-gray-600 border border-gray-200'
                }`}
                aria-label={`المركز ${team.rank}`}
              >
                {team.rank}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">{team.team}</h3>
                <p className="text-xs text-gray-500">{team.members} طالب متفاعل</p>
              </div>
              <div className="text-left" aria-label={`نسبة التخفيض ${team.reduction} بالمائة`}>
                <div className="text-xl font-black text-green-600">
                  {team.reduction}%
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">خفض انبعاثات</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges Wallet */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl text-white">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
          <Award className="w-8 h-8 text-primary-400" aria-hidden="true" />
          <h2 className="text-2xl font-bold" id="badges-heading">محفظة الشارات الرقمية</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list" aria-labelledby="badges-heading">
          {badges.map((badge) => (
            <div 
              key={badge.id} 
              className={`p-5 rounded-2xl border transition-all ${
                badge.earned 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                  : 'bg-gray-900/50 border-gray-800 opacity-60 grayscale'
              }`}
              role="listitem"
              aria-label={`شارة: ${badge.title}. ${badge.earned ? 'مكتسبة' : 'غير مكتسبة'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="p-3 bg-gray-900 rounded-xl shadow-inner">
                  {badge.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${badge.earned ? 'bg-primary-900/50 text-primary-300' : 'bg-gray-800 text-gray-500'}`}>
                  {badge.date}
                </span>
              </div>
              <h3 className={`font-bold text-sm mb-1 ${badge.earned ? 'text-white' : 'text-gray-400'}`}>{badge.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
