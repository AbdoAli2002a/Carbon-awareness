import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  cycleFontSize: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  dyslexiaFont: boolean;
  toggleDyslexiaFont: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    
    // Handle High Contrast (تفعيل وضع التباين العالي)
    if (highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Handle Dark Mode (الوضع المظلم)
    if (darkMode) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }

    // Handle Font Size (تغيير حجم الخط)
    html.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    html.classList.add(`text-size-${fontSize}`);

    // Handle Reduce Motion (إيقاف الحركات)
    if (reduceMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }

    // Handle Dyslexia Font (خطوط مخصصة لسهولة القراءة)
    if (dyslexiaFont) {
      html.classList.add('dyslexia-font');
    } else {
      html.classList.remove('dyslexia-font');
    }
  }, [highContrast, darkMode, fontSize, reduceMotion, dyslexiaFont]);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleReduceMotion = () => setReduceMotion(!reduceMotion);
  const cycleFontSize = () => {
    setFontSize(prev => prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal');
  };
  const toggleDyslexiaFont = () => setDyslexiaFont(!dyslexiaFont);

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast, darkMode, toggleDarkMode, fontSize, cycleFontSize, reduceMotion, toggleReduceMotion, dyslexiaFont, toggleDyslexiaFont }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within an AccessibilityProvider');
  return context;
};
