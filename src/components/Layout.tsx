import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Activity, BookOpen, Building2, Landmark, Menu, X, Users, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AccessibilityToolbar } from './AccessibilityToolbar';
import { NotificationBell } from './NotificationBell';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'الرئيسية', path: '/', icon: Leaf },
    { name: 'كلية التربية النوعية', path: '/specific-education', icon: Building2 },
    { name: 'التعليم الذكي', path: '/edtech', icon: GraduationCap },
    { name: 'المحاكاة', path: '/simulation', icon: Activity },
    { name: 'الجامعات', path: '/universities', icon: Building2 },
    { name: 'الدولة', path: '/government', icon: Landmark },
    { name: 'المعرفة', path: '/library', icon: BookOpen },
    { name: 'المجتمع', path: '/community', icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <AccessibilityToolbar />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                مستدام<span className="text-primary-500">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <NotificationBell />
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/50 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white z-50 shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-4 flex justify-between items-center border-b border-gray-100">
                <span className="text-xl font-bold text-gray-900">القائمة</span>
                <button
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full relative">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-primary-400" />
              <span className="text-2xl font-bold tracking-tight">مستدام</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              منصة تفاعلية تهدف إلى تعزيز الوعي الكربوني والتنمية المستدامة في المجتمع العربي والمؤسسات الأكاديمية والقطاع الحكومي.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/simulation" className="hover:text-primary-400 transition-colors">حاسبة البصمة الكربونية</Link></li>
              <li><Link to="/universities" className="hover:text-primary-400 transition-colors">المبادرات الجامعية</Link></li>
              <li><Link to="/government" className="hover:text-primary-400 transition-colors">رؤية الاستدامة</Link></li>
              <li><Link to="/library" className="hover:text-primary-400 transition-colors">المكتبة الخضراء</Link></li>
              <li><Link to="/community" className="hover:text-primary-400 transition-colors">مساهمات المجتمع</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <p className="text-gray-400 text-sm mb-4">اشترك في النشرة البريدية للحصول على آخر التحديثات البيئية.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="البريد الإلكتروني" className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
              <button className="bg-primary-600 hover:bg-primary-500 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">اشترك</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} مستدام. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}
