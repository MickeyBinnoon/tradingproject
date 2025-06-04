import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Activity, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PerformanceWidget() {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  
  // Mock performance data
  const performanceData = {
    "1W": [
      { date: "Mon", value: 10000, profit: 0 },
      { date: "Tue", value: 10150, profit: 1.5 },
      { date: "Wed", value: 10080, profit: 0.8 },
      { date: "Thu", value: 10220, profit: 2.2 },
      { date: "Fri", value: 10195, profit: 1.95 },
      { date: "Sat", value: 10340, profit: 3.4 },
      { date: "Sun", value: 10280, profit: 2.8 }
    ],
    "1M": [
      { date: "Week 1", value: 10000, profit: 0 },
      { date: "Week 2", value: 10350, profit: 3.5 },
      { date: "Week 3", value: 10680, profit: 6.8 },
      { date: "Week 4", value: 10520, profit: 5.2 }
    ],
    "3M": [
      { date: "Month 1", value: 10000, profit: 0 },
      { date: "Month 2", value: 10780, profit: 7.8 },
      { date: "Month 3", value: 11240, profit: 12.4 }
    ],
    "1Y": [
      { date: "Q1", value: 10000, profit: 0 },
      { date: "Q2", value: 11200, profit: 12 },
      { date: "Q3", value: 12100, profit: 21 },
      { date: "Q4", value: 12470, profit: 24.7 }
    ]
  };

  const currentData = performanceData[selectedPeriod];
  const latestProfit = currentData[currentData.length - 1]?.profit || 0;

  const metricsData = [
    { name: "Sharpe Ratio", value: 2.84, icon: Activity, color: "text-blue-600" },
    { name: "Max Drawdown", value: "5.2%", icon: TrendingDown, color: "text-red-600" },
    { name: "Win Rate", value: "73.5%", icon: Target, color: "text-green-600" },
    { name: "Total Trades", value: 1247, icon: TrendingUp, color: "text-purple-600" }
  ];

  const pieData = [
    { name: "Winning Trades", value: 73.5, color: "#10B981" },
    { name: "Losing Trades", value: 26.5, color: "#EF4444" }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Performance Analytics</h2>
          <p className="text-slate-600 mt-1">Verified results from our algorithmic trading system</p>
        </div>
        
        <div className="flex bg-white rounded-xl border border-slate-200 p-1">
          {["1W", "1M", "3M", "1Y"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Main Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Portfolio Growth</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-3xl font-bold text-green-600">+{latestProfit}%</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Current Value</div>
            <div className="text-2xl font-bold text-slate-900">
              ${currentData[currentData.length - 1]?.value.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#F59E0B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">{metric.name}</p>
                    <p className={`text-2xl font-bold mt-1 ${metric.color}`}>
                      {metric.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-slate-50`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Win Rate Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
      >
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Trade Success Rate</h3>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-64 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex-1 md:ml-8 space-y-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium text-slate-700">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}