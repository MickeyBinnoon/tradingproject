import React from "react";
import { motion } from "framer-motion";
import PerformanceWidget from "../components/performance/PerformanceWidget";
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

export default function Performance() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Verified Performance
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transparent, audited results from our algorithmic trading system. 
            All data is verified by third-party services including MyFXBook.
          </p>
        </motion.div>

        {/* Performance Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: TrendingUp, label: "Annual Return", value: "24.7%", color: "text-green-600" },
            { icon: BarChart3, label: "Sharpe Ratio", value: "2.84", color: "text-blue-600" },
            { icon: PieChart, label: "Win Rate", value: "73.5%", color: "text-purple-600" },
            { icon: Activity, label: "Max Drawdown", value: "5.2%", color: "text-orange-600" }
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 ${metric.color.replace('text-', 'bg-')}/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Performance Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PerformanceWidget />
        </motion.div>

        {/* Verification Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8 mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Performance Verification
          </h3>
          <p className="text-slate-700 max-w-2xl mx-auto">
            All performance data shown is verified by MyFXBook, an independent third-party 
            verification service. Results are updated in real-time and reflect actual trading 
            performance after fees and slippage.
          </p>
        </motion.div>
      </div>
    </div>
  );
}