import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, LineChart, Cpu, Trophy } from 'lucide-react';
import { InstructorDashboard } from '../components/edtech/InstructorDashboard';
import { WebQuests } from '../components/edtech/WebQuests';
import { IoTDashboard } from '../components/edtech/IoTDashboard';
import { Gamification } from '../components/edtech/Gamification';

export default function EdTechHub() {
  const [activeTab, setActiveTab] = useState<'instructor' | 'quests' | 'iot' | 'gamification'>('instructor');

  const tabs = [
    { id: 'instructor', label: 'لوحة الأستاذ', icon: LineChart },
    { id: 'quests', label: 'الرحلات المعرفية', icon: BookOpen },
    { id: 'iot', label: 'بيانات المستشعرات', icon: Cpu },
    { id: 'gamification', label: 'التلعيب والشارات', icon: Trophy },
  ] as const;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4" id="edtech-heading">تكنولوجيا التعليم الأخضر</h1>
        <p className="text-lg text-gray-600">
          بيئة تعليمية وتطبيقية متكاملة لدمج الوعي الكربوني والمحاكاة البيئية في المناهج الأكاديمية والممارسات الطلابية.
        </p>
      </motion.div>

      {/* Tabs Navigation */}
      <div 
        className="flex flex-wrap gap-2 justify-center border-b border-gray-200 pb-4"
        role="tablist"
        aria-labelledby="edtech-heading"
      >
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-colors ${
                isActive 
                  ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' 
                  : 'bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="pt-6 min-h-[60vh]">
        {activeTab === 'instructor' && (
          <div role="tabpanel" id="panel-instructor" aria-labelledby="tab-instructor">
            <InstructorDashboard />
          </div>
        )}
        {activeTab === 'quests' && (
          <div role="tabpanel" id="panel-quests" aria-labelledby="tab-quests">
            <WebQuests />
          </div>
        )}
        {activeTab === 'iot' && (
          <div role="tabpanel" id="panel-iot" aria-labelledby="tab-iot">
            <IoTDashboard />
          </div>
        )}
        {activeTab === 'gamification' && (
          <div role="tabpanel" id="panel-gamification" aria-labelledby="tab-gamification">
            <Gamification />
          </div>
        )}
      </div>
    </div>
  );
}
