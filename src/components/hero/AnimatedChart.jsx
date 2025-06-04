import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function AnimatedChart() {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  // Generate realistic trading data
  useEffect(() => {
    const generateData = () => {
      const baseData = [];
      let price = 10000;
      
      for (let i = 0; i < 30; i++) {
        const change = (Math.random() - 0.4) * 0.02; // Slight upward bias
        price = price * (1 + change);
        baseData.push({
          day: i + 1,
          value: Math.round(price),
          profit: Math.round((price - 10000) / 10000 * 100 * 100) / 100
        });
      }
      return baseData;
    };

    const initialData = generateData();
    setData(initialData);

    // Animate new data points every 3 seconds
    const interval = setInterval(() => {
      if (isAnimating) {
        setData(generateData());
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="relative">
      {/* Dashboard Frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Live Performance</h3>
            <p className="text-sm text-slate-600">Real-time algorithm results</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Active</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600">
              +{data.length > 0 ? data[data.length - 1]?.profit : 0}%
            </div>
            <div className="text-sm text-green-700">Total Return</div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">47</div>
            <div className="text-sm text-blue-700">Trades Today</div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                domain={['dataMin - 200', 'dataMax + 200']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#F59E0B"
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Algorithm Status */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
            <span className="text-sm font-medium text-slate-700">Pattern Alchemy© Active</span>
          </div>
          <span className="text-xs text-slate-500">Last updated: now</span>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl shadow-lg flex items-center justify-center z-20"
      >
        <span className="text-white font-bold text-lg">₿</span>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 15, 0],
          x: [0, -5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl shadow-lg flex items-center justify-center z-20"
      >
        <span className="text-white font-bold">$</span>
      </motion.div>
    </div>
  );
}