import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calculator, Car, Zap, Plane, Sparkles, Loader2, Download } from 'lucide-react';
import Markdown from 'react-markdown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function CarbonCalculator() {
  const [electricity, setElectricity] = useState(500);
  const [carType, setCarType] = useState('petrol');
  const [kmDriven, setKmDriven] = useState(1000);
  const [flights, setFlights] = useState(2);
  
  const [isGeneratingTips, setIsGeneratingTips] = useState(false);
  const [tips, setTips] = useState<string | null>(null);

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const [reportContent, setReportContent] = useState<string | null>(null);

  const calculateFootprint = () => {
    // Basic mock calculation formula (kg CO2 per month)
    let electricityCo2 = electricity * 0.4;
    
    let carMultiplier = 0.2;
    if (carType === 'hybrid') carMultiplier = 0.1;
    if (carType === 'electric') carMultiplier = 0.05;
    
    let carCo2 = kmDriven * carMultiplier;
    let flightCo2 = flights * 250; // avg 250kg per short flight

    const total = electricityCo2 + carCo2 + flightCo2;
    return { electricityCo2, carCo2, flightCo2, total };
  };

  const results = calculateFootprint();
  const nationalAverage = 1200; // Mock national average per month

  const chartData = [
    { name: 'الكهرباء', value: results.electricityCo2, color: '#3b82f6' }, // blue
    { name: 'النقل', value: results.carCo2, color: '#f59e0b' }, // amber
    { name: 'السفر', value: results.flightCo2, color: '#8b5cf6' }, // purple
  ];

  useEffect(() => {
    const topCategory = chartData.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    
    localStorage.setItem('userCarbonData', JSON.stringify({
      total: Math.round(results.total),
      topCategory: topCategory.name === 'الكهرباء' ? 'electricity' : topCategory.name === 'النقل' ? 'car' : 'flight'
    }));
    
    // Dispatch a custom event so the notification bell can update
    window.dispatchEvent(new Event('carbonDataUpdated'));
  }, [results.total, results.electricityCo2, results.carCo2, results.flightCo2]);

  const generateTips = async () => {
    setIsGeneratingTips(true);
    setTips(null);
    try {
      const response = await fetch('/api/gemini/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          electricity,
          carType,
          kmDriven,
          flights,
          total: Math.round(results.total)
        })
      });
      const data = await response.json();
      if (data.tips) {
        setTips(data.tips);
      } else {
        setTips('حدث خطأ في جلب النصائح. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      setTips('حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGeneratingTips(false);
    }
  };

  const generateBasicPdfReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Force render of the hidden basic report
      setReportContent('basic');
      
      setTimeout(async () => {
        if (!reportRef.current) return;
        const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Carbon_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        setIsGeneratingReport(false);
        setReportContent(null);
      }, 500);
    } catch (error) {
      console.error(error);
      alert('حدث خطأ في توليد التقرير.');
      setIsGeneratingReport(false);
      setReportContent(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
          <Calculator className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">حاسبة البصمة الكربونية</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Zap className="w-4 h-4 text-blue-500" />
              استهلاك الكهرباء الشهري (كيلوواط/ساعة)
            </label>
            <input
              type="range"
              min="100" max="2000" step="50"
              value={electricity}
              onChange={(e) => setElectricity(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="text-left font-mono text-sm text-gray-500 mt-1">{electricity} kWh</div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Car className="w-4 h-4 text-amber-500" />
              المسافة المقطوعة بالسيارة شهرياً (كم)
            </label>
            <input
              type="range"
              min="0" max="5000" step="100"
              value={kmDriven}
              onChange={(e) => setKmDriven(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="text-left font-mono text-sm text-gray-500 mt-1">{kmDriven} km</div>
            
            <div className="flex gap-2 mt-3">
              {['petrol', 'hybrid', 'electric'].map(type => (
                <button
                  key={type}
                  onClick={() => setCarType(type)}
                  className={`flex-1 py-2 text-sm rounded-lg border font-medium transition-colors ${
                    carType === type ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {type === 'petrol' ? 'بنزين' : type === 'hybrid' ? 'هجين' : 'كهربائي'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Plane className="w-4 h-4 text-purple-500" />
              عدد رحلات الطيران السنوية
            </label>
            <input
              type="range"
              min="0" max="20" step="1"
              value={flights}
              onChange={(e) => setFlights(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="text-left font-mono text-sm text-gray-500 mt-1">{flights} رحلات</div>
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-gray-50 rounded-2xl p-6 flex flex-col">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 font-medium mb-2">إجمالي انبعاثاتك الشهرية</p>
            <div className="text-5xl font-black text-gray-900 mb-2">
              {Math.round(results.total)} <span className="text-xl text-gray-400 font-bold">كجم CO₂</span>
            </div>
            
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${
              results.total > nationalAverage ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {results.total > nationalAverage ? 'أعلى من' : 'أقل من'} المتوسط الوطني ({nationalAverage} كجم)
            </div>
          </div>

          <div className="flex-1 min-h-[200px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 14, fontWeight: 600 }} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${Math.round(value)} كجم`, 'الانبعاثات']}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={generateTips}
              disabled={isGeneratingTips}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-70"
            >
              {isGeneratingTips ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {isGeneratingTips ? 'جاري تحليل بياناتك...' : 'احصل على نصائح شخصية بالذكاء الاصطناعي'}
            </button>
            <button
              onClick={generateBasicPdfReport}
              disabled={isGeneratingReport}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-primary-100 text-primary-700 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-70"
            >
              {isGeneratingReport ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Download className="w-5 h-5" />
              )}
              {isGeneratingReport ? 'جاري تجهيز التقرير...' : 'تحميل تقريرك الشهري (PDF)'}
            </button>
          </div>

          <AnimatePresence>
            {tips && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-primary-100 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-primary-700">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-bold">نصائح مخصصة لك</h3>
                  </div>
                  <div className="prose prose-sm prose-primary max-w-none rtl markdown-body text-gray-700">
                    <Markdown>{tips}</Markdown>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hidden Report Container for PDF Generation */}
      {reportContent && (
        <div className="absolute left-[-9999px] top-[-9999px]">
          <div ref={reportRef} className="w-[800px] p-12 bg-white text-gray-900 rtl">
            <div className="flex items-center gap-4 mb-8 border-b pb-6">
              <div className="p-4 bg-primary-50 rounded-2xl">
                <Calculator className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">تقرير البصمة الكربونية الشهري</h1>
                <p className="text-gray-500 text-lg mt-2">تم إصدار التقرير في: {new Date().toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-500 font-semibold mb-1">الإجمالي</p>
                <p className="text-3xl font-bold">{Math.round(results.total)} <span className="text-sm">كجم</span></p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-500 font-semibold mb-1">الكهرباء</p>
                <p className="text-3xl font-bold text-blue-600">{Math.round(results.electricityCo2)} <span className="text-sm">كجم</span></p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-500 font-semibold mb-1">النقل</p>
                <p className="text-3xl font-bold text-amber-600">{Math.round(results.carCo2 + results.flightCo2)} <span className="text-sm">كجم</span></p>
              </div>
            </div>

            <div className="prose prose-lg prose-primary max-w-none markdown-body">
              {reportContent === 'basic' ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">ملخص النتائج</h3>
                  <p>لقد قمت بحساب بصمتك الكربونية الشهرية. التفاصيل موضحة أعلاه وتعتمد على استهلاك الكهرباء ({electricity} كيلوواط/ساعة)، نوع السيارة ({carType}) والمسافة المقطوعة ({kmDriven} كم)، إضافة لعدد رحلات الطيران السنوية ({flights}).</p>
                  <p>استمر في تحسين نمط حياتك للوصول إلى استدامة أفضل وتقليل انبعاثاتك.</p>
                </div>
              ) : (
                <Markdown>{reportContent}</Markdown>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
