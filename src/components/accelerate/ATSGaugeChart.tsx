import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface ATSGaugeChartProps {
  score: number;
}

export default function ATSGaugeChart({ score }: ATSGaugeChartProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = score / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedScore(prev => Math.min(prev + increment, score));
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-600';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getGradient = (value: number) => {
    if (value >= 80) return 'from-green-200 to-green-600';
    if (value >= 60) return 'from-yellow-200 to-yellow-500';
    return 'from-red-200 to-red-500';
  };

  const getDescription = (value: number) => {
    if (value >= 80) {
      return "Excellent! Your resume is well-optimized for ATS systems. Keep maintaining this high standard.";
    }
    if (value >= 60) {
      return "Good start, but there's room for improvement. Consider enhancing key sections and keywords.";
    }
    return "Your resume needs optimization to better align with ATS requirements. Focus on incorporating relevant keywords and proper formatting.";
  };

  // Calculate the arc path for the gauge
  const radius = 120;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg">
      <div className="relative w-64 h-32 mb-8">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 256 128">
          <path
            d="M8 120 A 120 120 0 0 1 248 120"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Score arc */}
          <path
            d="M8 120 A 120 120 0 0 1 248 120"
            fill="none"
            className={`stroke-current ${getScoreColor(score)}`}
            strokeWidth="16"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 1.5s ease-in-out',
            }}
          />
          {/* Score text */}
          <text
            x="128"
            y="100"
            textAnchor="middle"
            className={`${getScoreColor(score)} font-bold text-4xl`}
          >
            {Math.round(animatedScore)}%
          </text>
        </svg>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">ATS Compatibility Score</h3>
        <div className={`flex items-start gap-2 p-4 rounded-lg bg-gradient-to-r ${getGradient(score)} bg-opacity-10`}>
          <AlertCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${getScoreColor(score)}`} />
          <p className="text-gray-700 text-left">
            {getDescription(score)}
          </p>
        </div>
      </div>
    </div>
  );
}