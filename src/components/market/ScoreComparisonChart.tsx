import React, { useEffect, useState } from 'react';
import { BarChart } from 'lucide-react';

interface ScoreComparisonChartProps {
  beforeScore: number;
  afterScore: number;
}

export default function ScoreComparisonChart({ beforeScore, afterScore }: ScoreComparisonChartProps) {
  const [animatedBefore, setAnimatedBefore] = useState(0);
  const [animatedAfter, setAnimatedAfter] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedBefore(prev => {
          const increment = (beforeScore / steps);
          return Math.min(prev + increment, beforeScore);
        });
        setAnimatedAfter(prev => {
          const increment = (afterScore / steps);
          return Math.min(prev + increment, afterScore);
        });
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [beforeScore, afterScore]);

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <BarChart className="h-6 w-6 text-indigo-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          Score Comparison: Before vs. After Optimization
        </h3>
      </div>

      <div className="relative h-64 mb-8">
        {/* Y-axis labels */}
        <div className="absolute left-0 inset-y-0 w-12 flex flex-col justify-between text-sm text-gray-600">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full flex items-end justify-around gap-16">
          {/* Before bar */}
          <div className="relative w-24 flex flex-col items-center">
            <div className="h-full w-full bg-gray-100 rounded-t-lg relative">
              <div 
                className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out ${getBarColor(beforeScore)}`}
                style={{ height: `${animatedBefore}%` }}
              >
                <div className="absolute -top-7 inset-x-0 flex justify-center">
                  <span className="text-lg font-semibold">{Math.round(animatedBefore)}%</span>
                </div>
              </div>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">Before</span>
          </div>

          {/* After bar */}
          <div className="relative w-24 flex flex-col items-center">
            <div className="h-full w-full bg-gray-100 rounded-t-lg relative">
              <div 
                className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-1000 ease-out ${getBarColor(afterScore)}`}
                style={{ height: `${animatedAfter}%` }}
              >
                <div className="absolute -top-7 inset-x-0 flex justify-center">
                  <span className="text-lg font-semibold">{Math.round(animatedAfter)}%</span>
                </div>
              </div>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">After</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
        <p className="leading-relaxed">
          This comparison highlights the improvement achieved after implementing optimization strategies. 
          The scores are displayed as percentages, with clear and animated visual feedback. 
          {afterScore > beforeScore && (
            <span className="text-green-600 font-medium">
              {` An improvement of ${Math.round(afterScore - beforeScore)}% was achieved through optimization.`}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}