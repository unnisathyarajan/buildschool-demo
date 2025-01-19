import React from 'react';
import { LineChart, Target, Users, Brain, Clock, Shield } from 'lucide-react';

const benefits = [
  {
    icon: LineChart,
    title: "Market Demand Analysis",
    description: "Get real-time insights into the demand for your skills across different industries and locations."
  },
  {
    icon: Target,
    title: "Skills Gap Analysis",
    description: "Identify key skills you need to develop to increase your marketability and earning potential."
  },
  {
    icon: Users,
    title: "Company Culture Insights",
    description: "Access detailed information about company values, employee satisfaction, and workplace culture."
  },
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description: "Receive personalized suggestions to improve your resume and application materials."
  },
  {
    icon: Clock,
    title: "Time-Saving Templates",
    description: "Generate customized cover letters and email templates tailored to each application."
  },
  {
    icon: Shield,
    title: "ATS Optimization",
    description: "Ensure your applications pass through Applicant Tracking Systems with higher success rates."
  }
];

export default function Benefits() {
  return (
    <section id="features" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Why Choose Job Catalyst?</h2>
          <p className="mt-4 text-xl text-gray-300">
            Streamline your job search with powerful features designed to give you an edge
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-primary-light p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-secondary/20"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <benefit.icon className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}