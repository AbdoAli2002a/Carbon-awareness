import { motion } from 'motion/react';
import { ArrowLeft, Globe2, TrendingDown, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DailyTip } from '../components/DailyTip';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-primary-50/50 -z-10" />
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-200/30 blur-3xl mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-accent-200/30 blur-3xl mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-semibold text-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                مبادرة وطنية للاستدامة
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                نحو مستقبل <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-600 to-primary-400">بلا انبعاثات</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                اكتشف أثرك البيئي وساهم في صياغة مستقبل مستدام. منصة تفاعلية تجمع بين الوعي الفردي، المبادرات الجامعية، والسياسات الوطنية.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/simulation"
                  className="inline-flex justify-center items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                >
                  ابدأ المحاكاة الآن
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <Link
                  to="/library"
                  className="inline-flex justify-center items-center gap-2 bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  استكشف المعرفة
                </Link>
              </div>

              <DailyTip />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="طبيعة مستدامة" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-white max-w-sm">
                    <p className="font-semibold text-lg mb-1">الهدف العالمي 2050</p>
                    <p className="text-white/80 text-sm">الوصول إلى الحياد الكربوني (Net Zero) لضمان بيئة مستدامة للأجيال القادمة.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-800">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-gray-800 p-3 rounded-2xl mb-4">
                <Wind className="w-8 h-8 text-primary-400" />
              </div>
              <span className="text-4xl font-black mb-2 text-primary-400">421<span className="text-2xl text-gray-400 font-bold ml-1">ppm</span></span>
              <span className="text-gray-400 text-sm font-medium">تركيز ثاني أكسيد الكربون الحالي</span>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-gray-800 p-3 rounded-2xl mb-4">
                <Globe2 className="w-8 h-8 text-accent-400" />
              </div>
              <span className="text-4xl font-black mb-2 text-accent-400">+1.1<span className="text-2xl text-gray-400 font-bold ml-1">°C</span></span>
              <span className="text-gray-400 text-sm font-medium">الاحترار العالمي المتوقع</span>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-gray-800 p-3 rounded-2xl mb-4">
                <TrendingDown className="w-8 h-8 text-green-400" />
              </div>
              <span className="text-4xl font-black mb-2 text-green-400">18<span className="text-2xl text-gray-400 font-bold ml-1">%</span></span>
              <span className="text-gray-400 text-sm font-medium">معدل تبني الطاقة النظيفة الإقليمي</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
