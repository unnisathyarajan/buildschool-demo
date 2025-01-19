import React from 'react';
import { Upload, Search, FileCheck, Building, Mail, BookOpen } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: "Resume and Job Description",
    description: "Upload your resume and job description for AI-powered analysis."
  },
  {
    icon: Search,
    title: "Market Research",
    description: "Get insights into job market demands and salary trends."
  },
  {
    icon: FileCheck,
    title: "Skill Gap Analysis",
    description: "Identify skill gaps and receive personalized development plans."
  },
  {
    icon: Building,
    title: "Company Insights",
    description: "Access detailed company information and culture insights."
  },
  {
    icon: Mail,
    title: "Generate Templates",
    description: "Create tailored resumes and cover letters."
  },
  {
    icon: BookOpen,
    title: "Interview Prep",
    description: "Get AI-powered interview preparation and coaching."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">
            Your journey to career success starts here
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <step.icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 text-lg font-medium">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}