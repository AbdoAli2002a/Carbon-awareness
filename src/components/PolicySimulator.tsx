import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Landmark, TreePine, CarFront, Factory } from 'lucide-react';

export function PolicySimulator() {
  const [treesPlanted, setTreesPlanted] = useState(0); // in millions
  const [evAdoption, setEvAdoption] = useState(0); // percentage
  const [renewableEnergy, setRenewableEnergy] = useState(20); // percentage

  // Simulate projection over 10 years
  const projectionData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const data = [];
    let baseEmissions = 500; // base metric tons

    for (let i = 0; i <= 10; i++) {
      const year = currentYear + i;
      
      // Calculate reductions based on policies
      // Trees: each million reduces 0.5 tons cumulatively
      const treeReduction = (treesPlanted * 0.5) * (i / 10); 
      
      // EV: each 10% reduces 5 tons
      const evReduction = (evAdoption * 0.5) * (i / 10);
      
      // Renewable: each 10% above 20 reduces 10 tons
      const renewableReduction = (Math.max(0, renewableEnergy - 20)) * (i / 10);

      const totalReduction = treeReduction + evReduction + renewableReduction;
      // Also add natural base growth if no policies are enacted
      const naturalGrowth = i * 5; 
      
      let projected = baseEmissions + naturalGrowth - totalReduction;
      let businessAsUsual = baseEmissions + naturalGrowth;

      data.push({
        year: year.toString(),
        'الوضع المعتاد': Math.max(0, Math.round(businessAsUsual)),
        'مع السياسات': Math.max(0, Math.round(projected)),
      });
    }
    return data;
  }, [treesPlanted, evAdoption, renewableEnergy]);

  const finalReduction = projectionData[10]['الوضع المعتاد'] - projectionData[10]['مع السياسات'];
  const reductionPercentage = Math.round((finalReduction / projectionData[10]['الوضع المعتاد']) * 100);

  return (
    <div className="bg-gray-900 rounded-3xl p-8 shadow-xl text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gray-800 text-primary-400 rounded-xl">
          <Landmark className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">صناع القرار</h2>
          <p className="text-gray-400 text-sm mt-1">محاكاة أثر السياسات الحكومية على الانبعاثات الوطنية حتى 2035</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Policy Knobs */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <TreePine className="w-4 h-4 text-green-400" />
                زراعة الأشجار (مليون شجرة)
              </label>
              <span className="font-mono text-green-400 font-bold">{treesPlanted}m</span>
            </div>
            <input
              type="range"
              min="0" max="100" step="5"
              value={treesPlanted}
              onChange={(e) => setTreesPlanted(Number(e.target.value))}
              className="w-full accent-green-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <CarFront className="w-4 h-4 text-blue-400" />
                اعتماد السيارات الكهربائية (%)
              </label>
              <span className="font-mono text-blue-400 font-bold">{evAdoption}%</span>
            </div>
            <input
              type="range"
              min="0" max="100" step="10"
              value={evAdoption}
              onChange={(e) => setEvAdoption(Number(e.target.value))}
              className="w-full accent-blue-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Factory className="w-4 h-4 text-amber-400" />
                مزيج الطاقة المتجددة (%)
              </label>
              <span className="font-mono text-amber-400 font-bold">{renewableEnergy}%</span>
            </div>
            <input
              type="range"
              min="20" max="100" step="5"
              value={renewableEnergy}
              onChange={(e) => setRenewableEnergy(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">التخفيض المتوقع في 2035</p>
            <div className="text-4xl font-black text-white">
              {reductionPercentage}% <span className="text-lg text-green-400 font-bold">↓</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBAU" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="year" stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" tick={{fill: '#9ca3af'}} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="الوضع المعتاد" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBAU)" />
              <Area type="monotone" dataKey="مع السياسات" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
