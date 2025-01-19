import React from 'react';
import AccelerateHero from '../components/accelerate/AccelerateHero';
import AlignmentAnalysis from '../components/accelerate/AlignmentAnalysis';

export default function AcceleratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <AccelerateHero />
      <AlignmentAnalysis />
    </div>
  );
}