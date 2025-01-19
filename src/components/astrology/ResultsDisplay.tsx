import React from 'react';
import { Star, Award, Target, TrendingUp } from 'lucide-react';

interface ResultsDisplayProps {
  results: {
    analysisResults: any[];
    skillAssessments: any[];
    careerAlignments: any[];
    industryInsights: any[];
  };
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const sections = [
    {
      title: "Profile Analysis",
      icon: Star,
      data: results.analysisResults[0]?.analysis_result,
      color: "indigo",
      bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    },
    {
      title: "Skill Assessment",
      icon: Award,
      data: {
        assessment: results.skillAssessments[0]?.assessment_result,
        gaugeData: results.skillAssessments[0]?.gauge_chart_data
      },
      color: "purple",
      bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    },
    {
      title: "Career Alignment",
      icon: Target,
      data: results.careerAlignments[0]?.analysis_result,
      color: "blue",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    },
    {
      title: "Industry Insights",
      icon: TrendingUp,
      data: results.industryInsights[0]?.insight_result,
      color: "emerald",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <div 
          key={section.title}
          className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div 
            className="h-48 relative overflow-hidden"
            style={{
              backgroundImage: `url(${section.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-3">
                  <section.icon className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">{section.title}</h3>
                </div>
                <p className="text-gray-200 max-w-xl">
                  {index === 1 && section.data?.gaugeData && (
                    <span className="font-semibold">
                      ATS Score: {section.data.gaugeData.score}% - {section.data.gaugeData.description}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="p-8">
            {section.data ? (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: typeof section.data === 'string' 
                    ? section.data
                        .replace(/\n/g, '<br/>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-700">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/#{3} (.*?)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">$1</h3>')
                        .replace(/#{2} (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
                        .replace(/#{1} (.*?)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-6 text-gray-900">$1</h1>')
                    : typeof section.data === 'object' && section.data.assessment
                    ? section.data.assessment
                        .replace(/\n/g, '<br/>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-700">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    : JSON.stringify(section.data, null, 2)
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <section.icon className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg italic">No data available yet</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}