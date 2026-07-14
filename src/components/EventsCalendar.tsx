import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Bell, Users, X, CheckCircle2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  organizer: string;
}

export function EventsCalendar() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'ورشة عمل: إعادة تدوير المخلفات الإلكترونية',
      type: 'ورشة عمل',
      date: '2026-08-15',
      location: 'كلية التربية النوعية - معمل 3',
      organizer: 'قسم تكنولوجيا التعليم'
    },
    {
      id: '2',
      title: 'حملة تشجير الحرم الجامعي',
      type: 'حملة تشجير',
      date: '2026-08-20',
      location: 'الساحة الرئيسية للجامعة',
      organizer: 'اتحاد الطلاب'
    },
    {
      id: '3',
      title: 'المؤتمر الطلابي الأول للمناخ',
      type: 'مؤتمر مناخي',
      date: '2026-09-05',
      location: 'قاعة المؤتمرات الكبرى',
      organizer: 'كلية العلوم'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRemindMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call for setting up email reminder
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedEvent(null);
        setEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mt-12">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
        <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">تقويم الفعاليات البيئية</h2>
          <p className="text-sm text-gray-500">أحدث ورش العمل، حملات التشجير والمؤتمرات المناخية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-2 h-full ${
              event.type === 'ورشة عمل' ? 'bg-blue-500' :
              event.type === 'حملة تشجير' ? 'bg-green-500' : 'bg-purple-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                event.type === 'ورشة عمل' ? 'bg-blue-50 text-blue-700' :
                event.type === 'حملة تشجير' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'
              }`}>
                {event.type}
              </span>
              <div className="flex items-center text-sm font-bold text-gray-700 bg-gray-50 px-2 py-1 rounded-lg">
                <Calendar className="w-4 h-4 ml-1 text-gray-400" />
                {event.date}
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-3">{event.title}</h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 ml-2 text-gray-400" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 ml-2 text-gray-400" />
                {event.organizer}
              </div>
            </div>

            <button
              onClick={() => setSelectedEvent(event)}
              className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-colors bg-primary-50 text-primary-700 hover:bg-primary-100 group-hover:bg-primary-600 group-hover:text-white"
            >
              <Bell className="w-4 h-4" />
              ذكرني بهذه الفعالية
            </button>
          </motion.div>
        ))}
      </div>

      {/* Reminder Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => !isSubmitting && !success && setSelectedEvent(null)}
                className="absolute top-4 left-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isSubmitting || success}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 mt-2 text-center">
                <div className="inline-flex p-3 bg-primary-50 text-primary-600 rounded-full mb-4">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">تفعيل التنبيهات</h3>
                <p className="text-gray-500 text-sm mt-2">
                  سنقوم بإرسال تذكير لك قبل بدء <strong>{selectedEvent.title}</strong>
                </p>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 font-bold"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  تم تسجيل بريدك بنجاح! سنقوم بتذكيرك في الموعد.
                </motion.div>
              ) : (
                <form onSubmit={handleRemindMe} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني الجامعي"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none text-left"
                      dir="ltr"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      'تأكيد التذكير'
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
