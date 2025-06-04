import React from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Pricing() {
  const plans = [
    {
      name: "Demo",
      price: "Free",
      period: "30 days",
      description: "Try our algorithms risk-free",
      icon: Shield,
      color: "border-slate-200",
      bgColor: "bg-white",
      buttonStyle: "border-slate-300 text-slate-700 hover:bg-slate-50",
      features: [
        "Paper trading simulation",
        "Access to basic algorithms",
        "Real-time performance tracking",
        "Educational resources",
        "Email support"
      ],
      limitations: [
        "No real money trading",
        "Limited to $10K virtual capital"
      ]
    },
    {
      name: "Starter",
      price: "$97",
      period: "/month",
      description: "Perfect for new algorithmic traders",
      icon: Zap,
      color: "border-blue-200",
      bgColor: "bg-blue-50",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      features: [
        "Live trading with real money",
        "Pattern Alchemy© algorithm",
        "24/7 automated execution",
        "Real-time alerts & notifications",
        "Priority email support",
        "Basic risk management tools"
      ],
      minCapital: "$5,000",
      maxDrawdown: "8%",
      expectedReturn: "15-20% annually"
    },
    {
      name: "Pro",
      price: "$197",
      period: "/month",
      description: "Advanced algorithms for serious traders",
      icon: Star,
      color: "border-amber-300",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      buttonStyle: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white",
      popular: true,
      features: [
        "All Starter features",
        "Adapt Fusion© algorithm",
        "Advanced risk management",
        "Custom position sizing",
        "Performance analytics dashboard",
        "Phone & chat support",
        "Strategy customization"
      ],
      minCapital: "$10,000",
      maxDrawdown: "5%",
      expectedReturn: "20-25% annually"
    },
    {
      name: "Enterprise",
      price: "$497",
      period: "/month",
      description: "Maximum performance for large accounts",
      icon: Crown,
      color: "border-purple-200",
      bgColor: "bg-purple-50",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      features: [
        "All Pro features",
        "Multi-account management",
        "Institutional-grade execution",
        "Custom algorithm development",
        "Dedicated account manager",
        "White-label solutions",
        "API access"
      ],
      minCapital: "$50,000",
      maxDrawdown: "3%",
      expectedReturn: "25-30% annually"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Choose Your Trading Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Select the perfect plan for your investment goals. All plans include our proven algorithms, 
            24/7 automated trading, and transparent performance tracking.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card className={`${plan.bgColor} ${plan.color} border-2 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent"></div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.name === 'Demo' ? 'bg-slate-100' :
                    plan.name === 'Starter' ? 'bg-blue-100' :
                    plan.name === 'Pro' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                    'bg-purple-100'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${
                      plan.name === 'Demo' ? 'text-slate-600' :
                      plan.name === 'Starter' ? 'text-blue-600' :
                      plan.name === 'Pro' ? 'text-white' :
                      'text-purple-600'
                    }`} />
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600">{plan.period}</span>
                  </div>
                  
                  <p className="text-slate-600">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Performance Metrics */}
                  {plan.expectedReturn && (
                    <div className="bg-white/50 rounded-xl p-4 space-y-2">
                      <div className="text-sm text-slate-600">Expected Performance</div>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Annual Return:</span>
                          <span className="font-semibold text-green-600">{plan.expectedReturn}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Drawdown:</span>
                          <span className="font-semibold text-red-600">{plan.maxDrawdown}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Capital:</span>
                          <span className="font-semibold">{plan.minCapital}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations for Demo */}
                  {plan.limitations && (
                    <div className="space-y-2 pt-4 border-t border-slate-200">
                      <div className="text-sm font-medium text-slate-600">Limitations:</div>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="text-sm text-slate-500">
                          • {limitation}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Link to={createPageUrl("Onboarding")} className="block">
                      <Button className={`w-full py-3 font-semibold transition-all duration-300 ${plan.buttonStyle}`}>
                        {plan.name === 'Demo' ? 'Start Free Demo' : `Choose ${plan.name}`}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "What's included in the free demo?",
                answer: "The demo includes full access to our trading algorithms using simulated money. You'll see real-time performance and get familiar with the platform before risking real capital."
              },
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated accordingly."
              },
              {
                question: "What brokers do you support?",
                answer: "We support major forex and CFD brokers including MetaTrader 4/5 platforms. Our team will help you connect your preferred broker during onboarding."
              },
              {
                question: "Is my money safe?",
                answer: "Your funds remain in your own broker account at all times. We only have permission to execute trades, never to withdraw funds."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}