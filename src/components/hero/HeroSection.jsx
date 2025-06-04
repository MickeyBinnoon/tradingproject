import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import AnimatedChart from "./AnimatedChart";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-100/40 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/50 shadow-sm"
            >
              <Shield className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-slate-700">Verified Performance • 98.2% Uptime</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight"
              >
                Effortless
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent block leading-normal">
                  Automated Trading
                </span>
                Proven Results.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-slate-600 max-w-lg leading-relaxed"
              >
                Our advanced algorithms monitor the markets around the clock and automatically execute trades whenever opportunities arise. No experience required.
              </motion.p>
            </div>

            {/* Key Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">24.7%</div>
                <div className="text-sm text-slate-600">Avg. Annual Return</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">5.2%</div>
                <div className="text-sm text-slate-600">Max Drawdown</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">2.8</div>
                <div className="text-sm text-slate-600">Sharpe Ratio</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to={createPageUrl("Onboarding")} className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Start Free Demo
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to={createPageUrl("Performance")} className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-all duration-300">
                  View Performance
                  <TrendingUp className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-4 pt-4"
            >
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">2,500+</span> traders trust Alchemist™
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AnimatedChart />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
