import { motion } from 'motion/react';
import { 
  MonitorPlay, 
  Palette, 
  Utensils, 
  Mic, 
  Sun, 
  FileX, 
  TreePine,
  Trophy,
  Sliders,
  Building,
  GraduationCap
} from 'lucide-react';

export default function SpecificEducation() {
  const departments = [
    {
      id: 'edtech',
      title: 'قسم تكنولوجيا التعليم',
      icon: MonitorPlay,
      colorTheme: 'bg-blue-50 text-blue-700 border-blue-100',
      iconTheme: 'bg-blue-100 text-blue-600',
      initiatives: [
        { title: 'إدارة المخلفات الإلكترونية (E-Waste)', desc: 'إطلاق حملة لجمع الحواسيب والأسلاك القديمة من المعامل وإعادة تدويرها أو التبرع بها، وحساب "الكربون الذي تم توفيره" وعرضه على الموقع.' },
        { title: 'معامل الحوسبة الخضراء (Green Labs)', desc: 'تطبيق سياسة الإغلاق التلقائي (Sleep Mode) لأجهزة الكمبيوتر في المعامل بعد فترات عدم الاستخدام، واستبدال الإضاءة بلمبات LED موفرة للطاقة.' },
        { title: 'تطوير المحتوى', desc: 'تكليف الطلاب بتصميم انفوجرافيك ومقاطع موشن جرافيك عن أضرار الانبعاثات لعرضها في الشاشات الداخلية للكلية ورفعها على منصتنا الإلكترونية.' }
      ]
    },
    {
      id: 'art',
      title: 'قسم التربية الفنية',
      icon: Palette,
      colorTheme: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
      iconTheme: 'bg-fuchsia-100 text-fuchsia-600',
      initiatives: [
        { title: 'الفن المستدام (Upcycled Art)', desc: 'تحويل النفايات البلاستيكية والمعدنية والخشبية إلى أعمال فنية ومجسمات تعبر عن قضايا المناخ.' },
        { title: 'المعرض الافتراضي', desc: 'تصوير هذه الأعمال الفنية ورفعها على "معرض VR الافتراضي" داخل الموقع الإلكتروني الذي صممناه، ليتمكن زوار الموقع من مشاهدتها.' },
        { title: 'مواد صديقة للبيئة', desc: 'استبدال بعض الألوان والمواد الكيميائية ببدائل طبيعية أو ذات أساس مائي (Water-based) لتقليل الانبعاثات الكيميائية (VOCs).' }
      ]
    },
    {
      id: 'home-ec',
      title: 'قسم الاقتصاد المنزلي',
      icon: Utensils,
      colorTheme: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      iconTheme: 'bg-emerald-100 text-emerald-600',
      initiatives: [
        { title: 'المطبخ منخفض الانبعاثات', desc: 'التركيز في المناهج العملية على "الطبخ المستدام"؛ مثل تقليل هدر الطعام، استخدام أجهزة طهي موفرة للطاقة، وتقليل استهلاك اللحوم الحمراء (ذات البصمة الكربونية العالية) لصالح بدائل نباتية.' },
        { title: 'أزياء بلا هدر (Zero-Waste Fashion)', desc: 'تشجيع الطلاب في تخصص الملابس والنسيج على تصميم أزياء من أقمشة معاد تدويرها، لتقليل هدر المنسوجات.' }
      ]
    },
    {
      id: 'media',
      title: 'قسم الإعلام التربوي',
      icon: Mic,
      colorTheme: 'bg-violet-50 text-violet-700 border-violet-100',
      iconTheme: 'bg-violet-100 text-violet-600',
      initiatives: [
        { title: 'الصحافة البيئية', desc: 'إصدار مجلة رقمية (تُرفع على الموقع) ترصد أخبار الاستدامة في الكلية وجامعة المنيا.' },
        { title: 'راديو الكلية وبودكاست', desc: 'إنتاج "بودكاست" دوري يستضيف أساتذة الكلية للحديث عن دور تخصصاتهم في حماية البيئة.' }
      ]
    }
  ];

  const generalInitiatives = [
    {
      title: 'استغلال طبيعة المنيا المُشمسة',
      desc: 'محافظة المنيا تتمتع بسطوع شمسي ممتاز. يمكن اقتراح مشروع تخرج لتركيب "خلايا شمسية مصغرة" لتشغيل إضاءة ممرات الكلية أو لشحن هواتف الطلاب في ساحات الانتظار.',
      icon: Sun,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      title: 'تحدي "أسبوع بلا ورق"',
      desc: 'تحويل تسليم التكليفات (Assignments) والامتحانات القصيرة (Quizzes) بشكل كامل إلى المنصات الرقمية لتقليل البصمة الكربونية الناتجة عن استهلاك الورق والطباعة.',
      icon: FileX,
      color: 'text-teal-500',
      bg: 'bg-teal-50'
    },
    {
      title: 'مبادرة زراعة الحرم الجامعي',
      desc: 'تخصيص مساحة داخل الكلية ليقوم الطلاب بزراعة أشجار الظل والنباتات التي تمتص ثاني أكسيد الكربون، وتسمية كل شجرة باسم الدفعة أو القسم الذي زرعها.',
      icon: TreePine,
      color: 'text-green-600',
      bg: 'bg-green-50'
    }
  ];

  const integrationSteps = [
    {
      title: 'لوحة الصدارة (Leaderboard)',
      desc: 'استخدام أداة لوحة الصدارة في الموقع لإطلاق مسابقة شهرية بين أقسام الكلية؛ القسم الذي يستهلك ورقاً أقل أو ينفذ مبادرة بيئية أفضل يحصل على "درع الكلية الأخضر".',
      icon: Trophy
    },
    {
      title: 'محاكاة قرارات العميد',
      desc: 'بناء محاكاة صغيرة في الموقع توضح للطلاب: "ماذا لو قررت إدارة الكلية إيقاف تشغيل التكييفات لساعة واحدة يومياً؟" وكيف سيؤثر ذلك على خفض انبعاثات الكلية.',
      icon: Sliders
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary-50 rounded-2xl text-primary-600">
            <GraduationCap className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">تطبيق كلية التربية النوعية</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          نموذج تطبيقي لدمج الوعي الكربوني والممارسات المستدامة داخل كلية التربية النوعية بجامعة المنيا، من خلال الأقسام العلمية المختلفة والمبادرات الطلابية.
        </p>
      </motion.div>

      {/* 1. Departments Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Building className="w-8 h-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">أفكار تطبيقية حسب الأقسام العلمية</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-3xl border ${dept.colorTheme} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-black/5">
                  <div className={`p-3 rounded-xl ${dept.iconTheme}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{dept.title}</h3>
                </div>
                <div className="space-y-4">
                  {dept.initiatives.map((init, i) => (
                    <div key={i} className="bg-white/60 p-4 rounded-xl backdrop-blur-sm">
                      <h4 className="font-bold mb-1 text-gray-900">{init.title}</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{init.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2. General Initiatives Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <TreePine className="w-8 h-8 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">مبادرات عامة على مستوى مبنى الكلية</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {generalInitiatives.map((init, index) => {
            const Icon = init.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center"
              >
                <div className={`p-4 rounded-2xl mb-4 ${init.bg} ${init.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{init.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{init.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Website Integration Section */}
      <section>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <MonitorPlay className="w-7 h-7 text-primary-400" />
              دمج الواقع بالموقع الإلكتروني
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl">
              لتحقيق أقصى استفادة، صُمم هذا الموقع ليكون المرآة الرقمية لكل الأنشطة والمبادرات المقامة على أرض الواقع داخل أروقة الكلية.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrationSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl backdrop-blur-sm hover:bg-gray-800 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-900 rounded-xl text-primary-400 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-gray-100">{step.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
