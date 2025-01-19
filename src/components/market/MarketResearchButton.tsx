import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from '../../hooks/useNavigate';

interface MarketResearchButtonProps {
  className?: string;
}

export default function MarketResearchButton({ className = '' }: MarketResearchButtonProps) {
  const { navigateTo } = useNavigate();

  return (
    <div className="text-center space-y-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-gray-600 mb-6">
          You've uncovered your strengths—now it's time to see how they shine in the market! 
          Click 'Discover My Market Alignment' to explore the roles, industries, and trends 
          where your skills are in high demand. Align your profile with market opportunities 
          and take the next step toward career success!
        </p>
      </div>
      <button
        onClick={() => navigateTo('communication')}
        className={`flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 font-semibold shadow-lg ${className}`}
      >
        <Search className="h-5 w-5" />
        Discover My Market Alignment
      </button>
    </div>
  );
}