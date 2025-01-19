import React from 'react';
import { GraduationCap, UserCircle, Brain, LineChart, Target, Phone } from 'lucide-react';

const steps = [
  {
    number: "1",
    title: "Defining Your Professional Identity",
    description: "Get a comprehensive analysis of your professional profile and potential.",
    icon: UserCircle,
    color: "bg-indigo-500"
  },
  {
    number: "2",
    title: "Capability Assessment",
    description: "Identify your strengths and areas for improvement.",
    icon: Brain,
    color: "bg-blue-500"
  },
  {
    number: "3",
    title: "Skillset Optimization",
    description: "See how your profile aligns with market demands.",
    icon: Target,
    color: "bg-green-500"
  },
  {
    number: "4",
    title: "Career Market Intelligence",
    description: "Receive a customized plan to achieve your career goals.",
    icon: LineChart,
    color: "bg-purple-500"
  },
  {
    number: "5",
    title: "Interview Readiness",
    description: "Learn how to position yourself effectively for target roles.",
    icon: GraduationCap,
    color: "bg-pink-500"
  },
  {
    number: "6",
    title: "Career Resiliency Coach",
    description: "Get personalized guidance from our expert career coach.",
    icon: Phone,
    color: "bg-orange-500"
  }
];

export default function Journey() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Your Journey to Success</h2>
          <p className="mt-4 text-xl text-gray-600">
            We guide you every step of the way
          </p>
        </div>

        {/* Circular Journey Infographic */}
        <div className="relative max-w-6xl mx-auto" style={{ height: '900px' }}>
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center z-20 shadow-xl">
            <div className="text-center text-white p-6">
              <GraduationCap className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold leading-tight">Journey of a<br />Job Seeker</h3>
            </div>
          </div>

          {/* Background Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border-4 border-dashed border-indigo-200 rounded-full" />

          {/* Steps Circle */}
          <div className="relative w-full h-full">
            {steps.map((step, index) => {
              const angle = (index * 360) / steps.length;
              const radius = 400;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    width: '300px'
                  }}
                >
                  <div className="p-6 rounded-2xl shadow-xl bg-white hover:scale-105 transition-transform duration-300 cursor-pointer relative border border-indigo-100">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center text-xl font-bold z-10 shadow-lg">
                      {step.number}
                    </div>
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3 min-h-[60px] flex items-center justify-center leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-10 py-4 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg font-semibold">
            Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}