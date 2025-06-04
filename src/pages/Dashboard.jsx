import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User } from "@/api/entities";
import { PerformanceMetric } from "@/api/entities";
import { TrendingUp, TrendingDown, Activity, DollarSign, Settings, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      const metricsData = await PerformanceMetric.list("-date", 30);
      setMetrics(metricsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  // Generate sample data if no metrics exist
  const sampleMetrics = [
    { date: "2024-01-01", total_return: 12.5, monthly_return: 2.1, drawdown: -1.2, trades_count: 45, win_rate: 72 },
    { date: "2024-01-02", total_return: 14.2, monthly_return: 2.3, drawdown: -0.8, trades_count: 52, win_rate: 74 },
    { date: "2024-01-03", total_return: 15.8, monthly_return: 2.5, drawdown: -1.5, trades_count: 48, win_rate: 71 },
    { date: "2024-01-04", total_return: 18.3, monthly_return: 2.7, drawdown: -0.9, trades_count: 56, win_rate: 75 },
    { date: "2024-01-05", total_return: 20.1, monthly_return: 2.8, drawdown: -1.1, trades_count: 51, win_rate: 73 }
  ];

  const displayMetrics = metrics.length > 0 ? metrics : sampleMetrics;
  const latestMetric = displayMetrics[displayMetrics.length - 1];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-slate-600">
              Here's your algorithmic trading performance overview
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              onClick={loadDashboardData}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Link to={createPageUrl("Settings")}>
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Return",
              value: `+${latestMetric?.total_return || 0}%`,
              icon: TrendingUp,
              color: "text-green-600",
              bgColor: "bg-green-50"
            },
            {
              title: "Monthly Return",
              value: `+${latestMetric?.monthly_return || 0}%`,
              icon: DollarSign,
              color: "text-blue-600",
              bgColor: "bg-blue-50"
            },
            {
              title: "Current Drawdown",
              value: `${latestMetric?.drawdown || 0}%`,
              icon: TrendingDown,
              color: "text-red-600",
              bgColor: "bg-red-50"
            },
            {
              title: "Win Rate",
              value: `${latestMetric?.win_rate || 0}%`,
              icon: Activity,
              color: "text-purple-600",
              bgColor: "bg-purple-50"
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 font-medium">{metric.title}</p>
                      <p className={`text-2xl font-bold mt-1 ${metric.color}`}>
                        {metric.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-white shadow-lg border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">
                Performance Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={displayMetrics}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
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
                    />
                    <Area
                      type="monotone"
                      dataKey="total_return"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      fill="url(#colorGradient)"
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trading Activity */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Recent Trading Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { pair: "EUR/USD", action: "BUY", profit: "+$127.50", time: "2 hours ago" },
                    { pair: "GBP/JPY", action: "SELL", profit: "+$89.30", time: "4 hours ago" },
                    { pair: "USD/CAD", action: "BUY", profit: "-$45.20", time: "6 hours ago" },
                    { pair: "AUD/USD", action: "SELL", profit: "+$156.80", time: "8 hours ago" }
                  ].map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          trade.action === 'BUY' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <div className="font-medium text-slate-900">{trade.pair}</div>
                          <div className="text-sm text-slate-600">{trade.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {trade.profit}
                        </div>
                        <div className="text-sm text-slate-600">{trade.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-white shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900">
                  Algorithm Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="font-medium text-slate-900">Pattern Alchemy©</div>
                        <div className="text-sm text-slate-600">Active & Trading</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">LIVE</div>
                  </div>

                  {user?.subscription_plan !== 'demo' && (
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div>
                          <div className="font-medium text-slate-900">Adapt Fusion©</div>
                          <div className="text-sm text-slate-600">Active & Trading</div>
                        </div>
                      </div>
                      <div className="text-blue-600 font-semibold">LIVE</div>
                    </div>
                  )}

                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="text-sm text-slate-600 mb-2">Account Status</div>
                    <div className="font-semibold text-slate-900 capitalize">
                      {user?.subscription_plan || 'Demo'} Plan
                    </div>
                    {user?.subscription_plan === 'demo' && (
                      <Link to={createPageUrl("Pricing")} className="inline-block mt-2">
                        <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                          Upgrade to Live Trading
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}