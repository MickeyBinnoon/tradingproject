import React from "react";
import { motion } from "framer-motion";
import { Shield, Star, CheckCircle, Award, Users, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrustIndicators() {
  const trustMetrics = [
    {
      icon: Shield,
      title: "Regulated & Compliant",
      description: "Full regulatory compliance and third-party audited",
      value: "SEC Registered"
    },
    {
      icon: Star,
      title: "4.9/5 Rating",
      description: "Based on 500+ verified Trustpilot reviews",
      value: "Trustpilot"
    },
    {
      icon: CheckCircle,
      title: "98.2% Uptime",
      description: "Reliable 24/7 trading execution",
      value: "Last 12 months"
    },
    {
      icon: Award,
      title: "Industry Award",
      description: "Best Algorithmic Trading Platform 2024",
      value: "FinTech Awards"
    }
  ];

  const securityFeatures = [
    "Bank-level 256-bit SSL encryption",
    "Multi-factor authentication",
    "Cold storage for funds",
    "Real-time fraud monitoring",
    "Insurance coverage up to $500K",
    "Regulatory compliance (SEC/FINRA)"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trusted by Thousands of Investors
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our platform maintains the highest standards of security, transparency, and regulatory compliance.
          </p>
        </motion.div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{metric.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{metric.description}</p>
                  <div className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security & Compliance Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-8 h-8 text-amber-500" />
                <h3 className="text-3xl font-bold text-slate-900">
                  Bank-Level Security
                </h3>
              </div>
              <p className="text-lg text-slate-600 mb-8">
                Your funds and data are protected by institutional-grade security measures 
                and regulatory oversight.
              </p>
              
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Risk Disclosure Box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Risk Disclosure</h4>
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">
                      Trading involves substantial risk of loss and is not suitable for all investors. 
                      Past performance is not indicative of future results. All trading algorithms 
                      carry inherent risks.
                    </p>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p>• Never invest more than you can afford to lose</p>
                      <p>• Diversify your investment portfolio</p>
                      <p>• Consult with a financial advisor</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Badges */}
              <div className="flex items-center justify-center space-x-4 mt-8">
                <div className="bg-white rounded-lg shadow-md px-4 py-2 border border-slate-200">
                  <div className="text-xs font-medium text-slate-600">Verified by</div>
                  <div className="font-bold text-slate-900">MyFXBook</div>
                </div>
                <div className="bg-white rounded-lg shadow-md px-4 py-2 border border-slate-200">
                  <div className="text-xs font-medium text-slate-600">Rated on</div>
                  <div className="font-bold text-slate-900">Trustpilot</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}