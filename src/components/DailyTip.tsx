import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';

export function DailyTip() {
  const [tip, setTip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTip = async () => {
    setIsLoading(true);
    try {
      // Attempt to load user data from local storage if they used the calculator
      const savedData = localStorage.getItem('carbonData');
      let payload = {};
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // We'd need to calculate the total and top category, but since we don't save that exactly, we can send a general request
        // For now, let's just send empty payload for a generic tip
        payload = {};
      }

      const response = await fetch('/api/gemini/daily-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (data.tip) {
        setTip(data.tip);
        localStorage.setItem('dailyTip', JSON.stringify({
          text: data.tip,
          date: new Date().toISOString().split('T')[0]
        }));
      }
    } catch (error) {
      console.error('Failed to fetch daily tip:', error);
      setTip('قلل من استخدام البلاستيك ذو الاستخدام الواحد للحد من النفايات التي تلوث البيئة.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkDailyTip = () => {
      const today = new Date().toISOString().split('T')[0];
      const savedTip = localStorage.getItem('dailyTip');
      
      if (savedTip) {
        try {
          const parsed = JSON.parse(savedTip);
          if (parsed.date === today && parsed.text) {
            setTip(parsed.text);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          // ignore
        }
      }
      
      fetchTip();
    };

    checkDailyTip();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-white/80 backdrop-blur-md border border-primary-100 rounded-2xl p-6 shadow-sm relative overflow-hidden mt-8 max-w-xl"
    >
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary-400 to-accent-400"></div>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl text-primary-600 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              نصيحة الاستدامة اليومية
            </h3>
            <button 
              onClick={fetchTip}
              disabled={isLoading}
              className="text-gray-400 hover:text-primary-600 transition-colors disabled:opacity-50"
              title="تحديث النصيحة"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <div className="text-gray-700 leading-relaxed text-sm min-h-[2.5rem] flex items-center">
            {isLoading ? (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
            ) : (
              <div className="prose prose-sm prose-primary m-0 p-0 markdown-body">
                <Markdown>{tip || ''}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
