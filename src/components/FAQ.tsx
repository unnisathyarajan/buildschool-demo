import React from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does Job Catalyst analyze my skills?",
    answer: "Our AI-powered platform analyzes your resume and professional experience against current market demands, providing detailed insights into your skill set's competitiveness."
  },
  {
    question: "What kind of company insights do you provide?",
    answer: "We offer comprehensive insights including employee satisfaction rates, company culture analysis, benefits information, and current challenges faced by employees."
  },
  {
    question: "How accurate are the ATS optimization recommendations?",
    answer: "Our ATS optimization engine is regularly updated to match the latest recruitment software patterns, ensuring over 90% accuracy in improving resume visibility."
  },
  {
    question: "Can I customize the cover letter templates?",
    answer: "Yes! While our AI generates initial templates, you can fully customize them to match your personal style and specific job requirements."
  },
  {
    question: "How often is the market demand data updated?",
    answer: "Our market demand data is updated daily, pulling from thousands of job postings and industry sources to provide the most current insights."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-300">
            Find answers to common questions about Job Catalyst
          </p>
        </div>
        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-secondary/20 pb-6">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 text-secondary" />
                ) : (
                  <Plus className="h-5 w-5 text-secondary" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}