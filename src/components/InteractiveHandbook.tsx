import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, BookOpen, Building, ArrowRight, Trophy } from 'lucide-react';

interface HandbookStep {
  id: string;
  title: string;
  description: string;
  category: 'energy' | 'waste' | 'culture' | 'procurement';
}

export function InteractiveHandbook() {
  const steps: HandbookStep[] = [
    {
      id: 'step-1',
      title: 'تدقيق استهلاك الطاقة',
      description: 'إجراء فحص شامل لمصادر استهلاك الكهرباء في المبنى المؤسسي وتحديد أماكن الهدر.',
      category: 'energy'
    },
    {
      id: 'step-2',
      title: 'تركيب إضاءة موفرة',
      description: 'استبدال جميع المصابيح التقليدية بمصابيح LED وتركيب حساسات حركة في الممرات.',
      category: 'energy'
    },
    {
      id: 'step-3',
      title: 'سياسة الطباعة المزدوجة',
      description: 'ضبط إعدادات الطابعات لتكون الطباعة على الوجهين افتراضياً لتقليل استهلاك الورق.',
      category: 'waste'
    },
    {
      id: 'step-4',
      title: 'إلغاء البلاستيك ذو الاستخدام الواحد',
      description: 'منع استخدام الأكواب والصحون البلاستيكية في كافيتريا المؤسسة واستبدالها ببدائل مستدامة.',
      category: 'waste'
    },
    {
      id: 'step-5',
      title: 'لجنة الاستدامة الداخلية',
      description: 'تشكيل لجنة من الموظفين لمتابعة تطبيق المبادرات الخضراء ونشر الوعي البيئي.',
      category: 'culture'
    },
    {
      id: 'step-6',
      title: 'المشتريات الخضراء',
      description: 'تعديل سياسة المشتريات لتفضيل الموردين المحليين والمنتجات الحاصلة على شهادات بيئية.',
      category: 'procurement'
    }
  ];

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('handbookProgress');
    if (savedProgress) {
      setCompletedSteps(JSON.parse(savedProgress));
    }
  }, []);

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => {
      const newProgress = prev.includes(id) 
        ? prev.filter(stepId => stepId !== id)
        : [...prev, id];
      
      localStorage.setItem('handbookProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const progressPercentage = Math.round((completedSteps.length / steps.length) * 100);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'energy': return 'bg-amber-100 text-amber-700';
      case 'waste': return 'bg-emerald-100 text-emerald-700';
      case 'culture': return 'bg-blue-100 text-blue-700';
      case 'procurement': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'energy': return 'الطاقة';
      case 'waste': return 'النفايات';
      case 'culture': return 'الثقافة';
      case 'procurement': return 'المشتريات';
      default: return 'عام';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6 pb-6 border-b border-gray-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">الدليل التفاعلي للتحول الأخضر</h2>
            <p className="text-gray-500 mt-1">خطوات عملية للمؤسسات لبناء بيئة عمل مستدامة</p>
          </div>
        </div>

        <div className="w-full md:w-64 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">نسبة الإنجاز</span>
            <span className="text-sm font-bold text-primary-600">{progressPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {progressPercentage === 100 && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 mt-3 text-xs font-bold text-amber-500 justify-center"
            >
              <Trophy className="w-4 h-4" />
              <span>مؤسسة خضراء بالكامل!</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleStep(step.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                isCompleted 
                  ? 'border-primary-500 bg-primary-50/30' 
                  : 'border-gray-100 bg-white hover:border-primary-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <button 
                  className={`mt-1 shrink-0 transition-colors ${
                    isCompleted ? 'text-primary-500' : 'text-gray-300 group-hover:text-primary-300'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getCategoryColor(step.category)}`}>
                      {getCategoryLabel(step.category)}
                    </span>
                  </div>
                  <h3 className={`font-bold text-lg mb-1 transition-colors ${isCompleted ? 'text-gray-900' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors ${isCompleted ? 'text-gray-600' : 'text-gray-500'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
