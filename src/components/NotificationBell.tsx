import { useState, useEffect, useRef } from 'react';
import { Bell, Sparkles, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dailyTip, setDailyTip] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchDailyTip = async (carbonData?: { total: number, topCategory: string }) => {
    setIsLoading(true);
    try {
      const dataToUse = carbonData || JSON.parse(localStorage.getItem('userCarbonData') || '{}');
      const response = await fetch('/api/gemini/daily-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUse)
      });
      const data = await response.json();
      
      if (data.tip) {
        setDailyTip(data.tip);
        localStorage.setItem('dailyTip', data.tip);
        localStorage.setItem('dailyTipDate', new Date().toDateString());
        setHasUnread(true);
      }
    } catch (error) {
      console.error("Failed to fetch daily tip:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedDate = localStorage.getItem('dailyTipDate');
    const today = new Date().toDateString();
    
    if (savedDate !== today) {
      // Fetch new tip for today
      fetchDailyTip();
    } else {
      // Load existing tip
      const savedTip = localStorage.getItem('dailyTip');
      if (savedTip) {
        setDailyTip(savedTip);
      }
    }

    // Listen for updates from the calculator
    const handleCarbonDataUpdate = () => {
      // Re-fetch the tip based on the newly calculated data if they just updated it today
      fetchDailyTip();
    };

    window.addEventListener('carbonDataUpdated', handleCarbonDataUpdate);
    return () => window.removeEventListener('carbonDataUpdated', handleCarbonDataUpdate);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        className="p-2 relative rounded-full hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {hasUnread && (
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-500" />
                نصيحة اليوم الذكية
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mb-2 text-primary-500" />
                  <p className="text-sm">جاري تخصيص نصيحة لك...</p>
                </div>
              ) : dailyTip ? (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {dailyTip}
                    </p>
                    <p className="text-xs text-gray-400 mt-3 font-mono">
                      بناءً على بيانات بصمتك الكربونية المسجلة.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500 text-sm">
                  لا توجد إشعارات حالياً.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
