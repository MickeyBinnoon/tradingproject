import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle, User, DollarSign, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { User as UserEntity } from "@/api/entities";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    trading_experience: "",
    broker: "",
    subscription_plan: "demo",
    demo_balance: 10000
  });

  // Predefined values for slider (logarithmic scale)
  const sliderValues = [100, 1000, 10000, 100000, 1000000];
  const SLIDER_MIN = 0; // Index 0
  const SLIDER_MAX = 4; // Index 4 (for 1,000,000)

  const steps = [
    {
      title: "Welcome to Alchemist™",
      subtitle: "Let's get you set up for automated trading success",
      icon: User
    },
    {
      title: "Risk Assessment",
      subtitle: "Help us understand your trading preferences",
      icon: DollarSign
    },
    {
      title: "Demo Setup",
      subtitle: "Configure your practice account",
      icon: Settings
    },
    {
      title: "Ready to Trade",
      subtitle: "Your account is configured and ready",
      icon: Zap
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await UserEntity.updateMyUserData({
        ...formData,
        onboarding_completed: true
      });
      navigate(createPageUrl("Dashboard"));
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Convert slider index to actual value
  const indexToValue = (index) => {
    if (index <= 0) return sliderValues[0];
    if (index >= sliderValues.length - 1) return sliderValues[sliderValues.length - 1];
    
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    const fraction = index - lowerIndex;
    
    if (lowerIndex === upperIndex) {
      return sliderValues[lowerIndex];
    }
    
    // Logarithmic interpolation between values
    const lowerValue = sliderValues[lowerIndex];
    const upperValue = sliderValues[upperIndex];
    
    const logLower = Math.log10(lowerValue);
    const logUpper = Math.log10(upperValue);
    const logResult = logLower + fraction * (logUpper - logLower);
    
    return Math.round(Math.pow(10, logResult));
  };

  // Convert actual value to slider index
  const valueToIndex = (value) => {
    if (value <= sliderValues[0]) return 0;
    if (value >= sliderValues[sliderValues.length - 1]) return sliderValues.length - 1;
    
    // Find the closest preset values
    for (let i = 0; i < sliderValues.length - 1; i++) {
      if (value >= sliderValues[i] && value <= sliderValues[i + 1]) {
        if (value === sliderValues[i]) return i;
        if (value === sliderValues[i + 1]) return i + 1;
        
        // Logarithmic interpolation
        const logLower = Math.log10(sliderValues[i]);
        const logUpper = Math.log10(sliderValues[i + 1]);
        const logValue = Math.log10(value);
        
        const fraction = (logValue - logLower) / (logUpper - logLower);
        return i + fraction;
      }
    }
    
    return sliderValues.length - 1;
  };

  const handleSliderChange = (values) => {
    const newValue = indexToValue(values[0]);
    updateFormData('demo_balance', newValue);
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for parsing
    // Only allow numbers
    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value) || 0;
      if (numValue <= 1000000000) {
        updateFormData('demo_balance', numValue);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-1 mx-4 ${
                    index < currentStep ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-slate-600">
              {steps[currentStep].subtitle}
            </p>
          </motion.div>
        </div>

        {/* Step Content */}
        <Card className="bg-white shadow-xl border-slate-200">
          <CardContent className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Step 0: Welcome */}
                {currentStep === 0 && (
                  <div className="text-center space-y-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto">
                      <Zap className="w-12 h-12 text-white" />
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">
                        Start Your Automated Trading Journey
                      </h2>
                      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        In just a few minutes, you'll have access to our proven algorithms 
                        that have delivered consistent returns for thousands of traders.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mt-12">
                      {[
                        { title: "Day Trading", desc: "Working around the clock" },
                        { title: "Risk Management", desc: "Built-in protection for your capital" },
                        { title: "Transparent Results", desc: "See every trade and performance metric" }
                      ].map((feature, index) => (
                        <div key={index} className="p-6 bg-slate-50 rounded-xl">
                          <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-sm text-slate-600">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Risk Assessment */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Tell Us About Your Trading Experience
                      </h2>
                      <p className="text-slate-600">
                        This helps us recommend the best algorithms for your profile
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-base font-medium text-slate-900 mb-4 block">
                          What's your trading knowledge level?
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { value: "beginner", label: "Beginner", desc: "New to trading" },
                            { value: "intermediate", label: "Intermediate", desc: "Some experience" },
                            { value: "advanced", label: "Advanced", desc: "Very experienced" }
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => updateFormData('trading_experience', option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                formData.trading_experience === option.value
                                  ? 'border-amber-500 bg-amber-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="font-semibold text-slate-900">{option.label}</div>
                              <div className="text-sm text-slate-600">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Demo Setup */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Demo Setup
                      </h2>
                      <p className="text-slate-600">
                        Set up your demo account balance for practice trading
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <Label className="text-base font-medium text-slate-900 mb-6 block">
                          Choose Your Demo Account Balance
                        </Label>
                        
                        {/* Text Input */}
                        <div className="mb-8">
                          <Label className="text-sm font-medium text-slate-700 mb-2 block">
                            Enter Amount
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-slate-500 text-lg">$</span>
                            </div>
                            <Input
                              type="text"
                              value={formData.demo_balance === 0 ? '' : formData.demo_balance.toLocaleString()}
                              onChange={handleTextInputChange}
                              className="pl-8 h-12 text-lg"
                              placeholder="10,000"
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Maximum: $1,000,000,000</p>
                        </div>

                        {/* Slider */}
                        <div className="mb-8">
                          <Label className="text-sm font-medium text-slate-700 mb-4 block">
                            Or Use Slider
                          </Label>
                          <div className="px-4">
                            <Slider
                              value={[valueToIndex(formData.demo_balance)]}
                              onValueChange={handleSliderChange}
                              max={SLIDER_MAX}
                              min={SLIDER_MIN}
                              step={0.01}
                              className="w-full"
                            />
                            <div className="flex justify-between mt-4 text-sm text-slate-600">
                              {sliderValues.map((value) => (
                                <button
                                  key={value}
                                  onClick={() => updateFormData('demo_balance', value)}
                                  className={`px-2 py-1 rounded transition-colors ${
                                    Math.abs(formData.demo_balance - value) < value * 0.1
                                      ? 'bg-amber-100 text-amber-700 font-medium'
                                      : 'hover:bg-slate-100'
                                  }`}
                                >
                                  ${value.toLocaleString()}
                                </button>
                              ))}
                            </div>
                          </div>
                          {formData.demo_balance > 1000000 && (
                            <p className="text-xs text-amber-600 mt-2 text-center">
                              Slider shows maximum value of $1,000,000
                            </p>
                          )}
                        </div>

                        {/* Current Selection Display */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 text-center">
                          <h3 className="font-semibold text-slate-900 mb-2">Selected Demo Balance</h3>
                          <div className="text-3xl font-bold text-amber-600">
                            ${formData.demo_balance.toLocaleString()}
                          </div>
                          <p className="text-sm text-slate-600 mt-2">
                            This virtual money will be used for practice trading
                          </p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="font-semibold text-blue-900 mb-2">
                          Practice with Confidence
                        </h3>
                        <p className="text-blue-800 text-sm">
                          Use virtual money to test our algorithms and get familiar with the platform. 
                          You can switch to live trading anytime after you're comfortable with the results.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Completion */}
                {currentStep === 3 && (
                  <div className="text-center space-y-8">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">
                        You're All Set!
                      </h2>
                      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Your Alchemist™ demo account is ready. You can now access your dashboard 
                        and start practicing with automated trading.
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-6 max-w-md mx-auto">
                      <h3 className="font-semibold text-slate-900 mb-4">Your Setup Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Knowledge Level:</span>
                          <span className="font-medium capitalize">{formData.trading_experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Demo Balance:</span>
                          <span className="font-medium">${formData.demo_balance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Account Type:</span>
                          <span className="font-medium capitalize">Demo</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={handleComplete}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold"
                      >
                        Go to Dashboard
                      </Button>
                      
                      <p className="text-sm text-slate-500">
                        Need help? <Link to="#" className="text-amber-600 hover:underline">Contact our support team</Link>
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.trading_experience) ||
                (currentStep === 2 && !formData.demo_balance)
              }
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}