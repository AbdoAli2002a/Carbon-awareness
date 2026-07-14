import { motion } from 'motion/react';
import { CarbonCalculator } from '../components/CarbonCalculator';
import { PolicySimulator } from '../components/PolicySimulator';

export default function Simulation() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">المحاكاة التفاعلية</h1>
        <p className="text-lg text-gray-600">
          استخدم أدوات المحاكاة المتقدمة لحساب أثرك الفردي، واكتشف كيف يمكن للسياسات الكبرى أن تعيد تشكيل المستقبل البيئي لدولتنا.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CarbonCalculator />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PolicySimulator />
      </motion.section>
    </div>
  );
}
