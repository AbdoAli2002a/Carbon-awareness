import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Thermometer, Wind, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function IoTDashboard() {
  const [data, setData] = useState(Array.from({length: 15}, (_, i) => ({
    time: `-${15 - i}s`,
    power: 450 + Math.random() * 50,
    temp: 23 + Math.random() * 2,
    aqi: 35 + Math.random() * 10
  })));

  const [activeMetric, setActiveMetric] = useState<'power' | 'temp' | 'aqi'>('power');

  // Simulated Real-time Updates (تحديث البيانات برمجياً لتمثيل إنترنت الأشياء)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const last = newData[newData.length - 1];
        
        // إضافة بعض العشوائية لمحاكاة القراءات الحقيقية
        newData.push({
          time: new Date().toLocaleTimeString('ar-SA', { second: '2-digit' }),
          power: Math.max(300, last.power + (Math.random() - 0.5) * 40),
          temp: Math.max(20, Math.min(28, last.temp + (Math.random() - 0.5))),
          aqi: Math.max(10, Math.min(100, last.aqi + (Math.random() - 0.5) * 5))
        });
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const latestData = data[data.length - 1];

  const getMetricDetails = () => {
    switch (activeMetric) {
      case 'temp': return { key: 'temp', color: '#ef4444', label: 'الحرارة', unit: '°C' };
      case 'aqi': return { key: 'aqi', color: '#14b8a6', label: 'مؤشر جودة الهواء', unit: 'AQI' };
      default: return { key: 'power', color: '#f59e0b', label: 'الاستهلاك', unit: 'kW' };
    }
  };

  const activeDetails = getMetricDetails();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="bg-primary-50 border border-primary-100 p-4 rounded-xl flex items-start gap-3" role="alert">
        <AlertTriangle className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-primary-900 text-sm mb-1">لوحة المستشعرات الحية (IoT)</p>
          <p className="text-primary-700 text-xs leading-relaxed">
            تعرض هذه اللوحة قراءات حية (محاكاة) لمستشعرات موزعة في مبنى الكلية. يتم تحديث البيانات برمجياً كل ثانيتين لدراسة استهلاك الطاقة الفعلي. اضغط على أي بطاقة لعرض تفاصيلها.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setActiveMetric('power')}
          className={`bg-white p-6 rounded-2xl border text-right transition-all shadow-sm relative overflow-hidden group ${activeMetric === 'power' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-gray-100 hover:border-amber-300'}`}
          aria-label={`استهلاك الكهرباء الحالي: ${Math.round(latestData.power)} كيلوواط`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl" aria-hidden="true">
              <Zap className="w-6 h-6" />
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <p className="text-sm text-gray-500 font-semibold mb-1">استهلاك الكهرباء الحالي</p>
          <p className="text-4xl font-black text-gray-900 font-mono">{Math.round(latestData.power)} <span className="text-base text-gray-400 font-bold">kW</span></p>
        </button>

        <button 
          onClick={() => setActiveMetric('temp')}
          className={`bg-white p-6 rounded-2xl border text-right transition-all shadow-sm relative overflow-hidden ${activeMetric === 'temp' ? 'border-red-500 ring-2 ring-red-500/20' : 'border-gray-100 hover:border-red-300'}`}
          aria-label={`متوسط حرارة المعامل: ${latestData.temp.toFixed(1)} درجة مئوية`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-xl" aria-hidden="true">
              <Thermometer className="w-6 h-6" />
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <p className="text-sm text-gray-500 font-semibold mb-1">متوسط حرارة المعامل</p>
          <p className="text-4xl font-black text-gray-900 font-mono">{latestData.temp.toFixed(1)} <span className="text-base text-gray-400 font-bold">°C</span></p>
        </button>

        <button 
          onClick={() => setActiveMetric('aqi')}
          className={`bg-white p-6 rounded-2xl border text-right transition-all shadow-sm relative overflow-hidden ${activeMetric === 'aqi' ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-gray-100 hover:border-teal-300'}`}
          aria-label={`مؤشر جودة الهواء: ${Math.round(latestData.aqi)}`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-teal-50 text-teal-500 rounded-xl" aria-hidden="true">
              <Wind className="w-6 h-6" />
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
          </div>
          <p className="text-sm text-gray-500 font-semibold mb-1">مؤشر جودة الهواء (AQI)</p>
          <p className="text-4xl font-black text-gray-900 font-mono">{Math.round(latestData.aqi)} <span className="text-base text-gray-400 font-bold">جيد</span></p>
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          تحليل مباشر: <span style={{ color: activeDetails.color }}>{activeDetails.label}</span>
        </h3>
        <div className="h-[400px]" aria-label="رسم بياني حي للمؤشر المحدد">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="time" stroke="#9ca3af" tick={{fill: '#6b7280', fontSize: 12}} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`${Math.round(value)} ${activeDetails.unit}`, activeDetails.label]}
                isAnimationActive={false}
              />
              <Line 
                type="monotone" 
                dataKey={activeDetails.key} 
                stroke={activeDetails.color} 
                strokeWidth={3} 
                dot={false} 
                isAnimationActive={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
