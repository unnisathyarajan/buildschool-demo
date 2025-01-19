import React from 'react';
import { TrendingUp, Target, Mail } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Accelerate Your Career Journey with AI-Powered Insights
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Transform your job search with intelligent analysis, personalized recommendations, and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-secondary text-primary px-8 py-4 rounded-full hover:bg-secondary-light transition-all transform hover:scale-105 text-lg font-bold shadow-lg"
              >
                Begin Your Journey
              </button>
              <button className="border-2 border-secondary text-secondary px-8 py-4 rounded-full hover:bg-secondary hover:text-primary transition-all transform hover:scale-105 text-lg font-bold">
                Watch Demo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, text: "Skills Analysis" },
                { icon: Target, text: "ATS Optimization" },
                { icon: Mail, text: "Custom Templates" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="text-secondary h-6 w-6" />
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-2xl blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80"
                alt="Professional team collaboration"
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full object-cover aspect-4/3"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}