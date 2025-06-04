import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/api/entities";

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await Testimonial.list("-created_date", 10);
      setTestimonials(data);
    } catch (error) {
      // Use fallback data if entity is empty
      setTestimonials([]);
    }
    setIsLoading(false);
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Real Results from Real Traders
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how Alchemist™ has helped investors achieve consistent returns.
            </p>
          </motion.div>

          {/* Fallback testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "Software Engineer",
                content: "Alchemist™ has completely transformed my investment strategy. The automated trading has given me consistent returns while I focus on my career.",
                rating: 5,
                return_achieved: 18.5,
                months_using: 8
              },
              {
                name: "Michael Chen",
                title: "Business Owner",
                content: "As someone with limited trading experience, Alchemist™ made it incredibly easy to start investing. The transparency and performance speak for themselves.",
                rating: 5,
                return_achieved: 22.3,
                months_using: 12
              },
              {
                name: "Emily Rodriguez",
                title: "Financial Advisor",
                content: "I've recommended Alchemist™ to several clients. The risk management and consistent performance make it an excellent addition to any portfolio.",
                rating: 5,
                return_achieved: 15.7,
                months_using: 6
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          +{testimonial.return_achieved}%
                        </div>
                        <div className="text-xs text-slate-600">Return Achieved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {testimonial.months_using}mo
                        </div>
                        <div className="text-xs text-slate-600">Using Platform</div>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-sm text-slate-600">{testimonial.title}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Real Results from Real Traders
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See how Alchemist™ has helped investors achieve consistent returns.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-2xl border-slate-200">
                <CardContent className="p-12 text-center">
                  {/* Rating */}
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
                    "{currentTestimonial.content}"
                  </p>

                  {/* Performance Metrics */}
                  {(currentTestimonial.return_achieved || currentTestimonial.months_using) && (
                    <div className="flex items-center justify-center space-x-12 mb-8">
                      {currentTestimonial.return_achieved && (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 mr-2" />
                            +{currentTestimonial.return_achieved}%
                          </div>
                          <div className="text-sm text-slate-600">Return Achieved</div>
                        </div>
                      )}
                      {currentTestimonial.months_using && (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 flex items-center justify-center">
                            <Calendar className="w-6 h-6 mr-2" />
                            {currentTestimonial.months_using}mo
                          </div>
                          <div className="text-sm text-slate-600">Using Platform</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {currentTestimonial.name[0]}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-lg">{currentTestimonial.name}</div>
                      {currentTestimonial.title && (
                        <div className="text-slate-600">{currentTestimonial.title}</div>
                      )}
                      {currentTestimonial.company && (
                        <div className="text-sm text-slate-500">{currentTestimonial.company}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-slate-300 hover:border-amber-500 hover:text-amber-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-amber-500 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-slate-300 hover:border-amber-500 hover:text-amber-600"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}