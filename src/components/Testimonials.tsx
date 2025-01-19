import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    content: "Job Catalyst helped me identify the exact skills I needed to land my dream job. Within 2 months, I received multiple offers!"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovation Labs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    content: "The company insights feature was a game-changer. I was able to align my applications with company values and culture perfectly."
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Global Brands",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    content: "The AI-generated cover letters saved me countless hours while maintaining a personal touch. Highly recommended!"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-primary to-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Success Stories</h2>
          <p className="mt-4 text-xl text-gray-300">
            See how Job Catalyst has helped professionals land their dream jobs
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              <div className="absolute -top-4 -left-4">
                <Quote className="h-8 w-8 text-secondary opacity-50" />
              </div>
              <div className="bg-primary-light p-6 rounded-lg shadow-xl border border-secondary/20">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-secondary fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-secondary"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}