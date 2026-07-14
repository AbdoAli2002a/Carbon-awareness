import { useAccessibility } from '../contexts/AccessibilityContext';
import { Eye, Type, Play, Languages, Moon } from 'lucide-react';

export function AccessibilityToolbar() {
  const { 
    highContrast, toggleHighContrast, 
    darkMode, toggleDarkMode,
    fontSize, cycleFontSize, 
    reduceMotion, toggleReduceMotion,
    dyslexiaFont, toggleDyslexiaFont
  } = useAccessibility();

  return (
    <div 
      className="bg-gray-900 text-white py-2 px-4 flex flex-wrap justify-center gap-4 text-sm"
      role="toolbar" 
      aria-label="شريط أدوات إمكانية الوصول"
    >
      <button 
        onClick={cycleFontSize}
        className="flex items-center gap-2 hover:text-primary-400 transition-colors px-2 py-1 rounded focus:ring-2 focus:ring-primary-500 outline-none"
        aria-label={`تغيير حجم الخط، الحجم الحالي: ${fontSize}`}
      >
        <Type className="w-4 h-4" aria-hidden="true" />
        <span>تكبير الخط</span>
      </button>

      <div className="w-px h-5 bg-gray-700 hidden sm:block" aria-hidden="true"></div>

      <button 
        onClick={toggleDyslexiaFont}
        className={`flex items-center gap-2 hover:text-primary-400 transition-colors px-2 py-1 rounded focus:ring-2 focus:ring-primary-500 outline-none ${dyslexiaFont ? 'text-primary-400 font-bold' : ''}`}
        aria-pressed={dyslexiaFont}
        aria-label="تفعيل خط القراءة الميسرة (Dyslexia-friendly)"
      >
        <Languages className="w-4 h-4" aria-hidden="true" />
        <span>خط القراءة الميسرة</span>
      </button>

      <div className="w-px h-5 bg-gray-700 hidden sm:block" aria-hidden="true"></div>

      <button 
        onClick={toggleDarkMode}
        className={`flex items-center gap-2 hover:text-primary-400 transition-colors px-2 py-1 rounded focus:ring-2 focus:ring-primary-500 outline-none ${darkMode ? 'text-primary-400 font-bold' : ''}`}
        aria-pressed={darkMode}
        aria-label="تفعيل الوضع المظلم"
      >
        <Moon className="w-4 h-4" aria-hidden="true" />
        <span>الوضع المظلم</span>
      </button>

      <div className="w-px h-5 bg-gray-700 hidden sm:block" aria-hidden="true"></div>

      <button 
        onClick={toggleHighContrast}
        className={`flex items-center gap-2 hover:text-primary-400 transition-colors px-2 py-1 rounded focus:ring-2 focus:ring-primary-500 outline-none ${highContrast ? 'text-primary-400 font-bold' : ''}`}
        aria-pressed={highContrast}
        aria-label="تفعيل وضع التباين العالي"
      >
        <Eye className="w-4 h-4" aria-hidden="true" />
        <span>التباين العالي</span>
      </button>

      <div className="w-px h-5 bg-gray-700 hidden sm:block" aria-hidden="true"></div>

      <button 
        onClick={toggleReduceMotion}
        className={`flex items-center gap-2 hover:text-primary-400 transition-colors px-2 py-1 rounded focus:ring-2 focus:ring-primary-500 outline-none ${reduceMotion ? 'text-primary-400 font-bold' : ''}`}
        aria-pressed={reduceMotion}
        aria-label="إيقاف الحركات الانتقالية"
      >
        <Play className="w-4 h-4" aria-hidden="true" />
        <span>إيقاف الحركات</span>
      </button>
    </div>
  );
}
