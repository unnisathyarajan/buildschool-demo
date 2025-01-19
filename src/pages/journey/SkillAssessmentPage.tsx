import React from 'react';
import AccelerateHero from '../../components/accelerate/AccelerateHero';
import AlignmentAnalysis from '../../components/accelerate/AlignmentAnalysis';

export default function SkillAssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AccelerateHero />
        <div className="mb-12">
          <AlignmentAnalysis />
        </div>
      </div>
    </div>
  );
}