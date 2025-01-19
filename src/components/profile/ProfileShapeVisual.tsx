import React from 'react';

interface ProfileShapeVisualProps {
  shape: string;
}

const shapes = {
  t: {
    title: 'T-Shaped Profile',
    description: 'T-shaped professionals combine broad knowledge across multiple domains (horizontal bar) with deep expertise in one area (vertical bar). This versatile profile is highly valued in modern workplaces as it enables both specialized contribution and cross-functional collaboration.'
  },
  i: {
    title: 'I-Shaped Profile',
    description: 'I-shaped professionals are deep specialists who focus intensively on a single skill or domain. This profile is ideal for roles requiring deep technical expertise or specialized knowledge, particularly in research, development, or highly technical positions.'
  },
  pi: {
    title: 'Pi-Shaped Profile',
    description: 'Pi-shaped professionals excel in two distinct areas of expertise while maintaining broad knowledge across other domains. This profile is particularly valuable in roles requiring the integration of multiple disciplines or in leadership positions bridging different technical areas.'
  },
  comb: {
    title: 'Comb-Shaped Profile',
    description: 'Comb-shaped professionals possess multiple areas of deep expertise combined with broad knowledge. This profile is ideal for senior roles requiring diverse expertise and the ability to lead multiple specialized teams or projects.'
  },
  e: {
    title: 'E-Shaped Profile',
    description: 'E-shaped professionals combine expertise, experience, execution, and exploration capabilities. This modern profile is particularly suited for innovation-driven roles and leadership positions requiring both technical depth and business acumen.'
  }
};

const renderShape = (shape: string) => {
  switch (shape) {
    case 't':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="30" fill="#4F46E5" rx="4"/>
          <rect x="85" y="50" width="30" height="130" fill="#4F46E5" rx="4"/>
          <text x="100" y="40" textAnchor="middle" fill="white" className="text-xs">Breadth of Knowledge</text>
          <text x="75" y="120" transform="rotate(-90 75,120)" fill="white" className="text-xs">Depth of Expertise</text>
        </svg>
      );
    case 'i':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <rect x="85" y="20" width="30" height="160" fill="#4F46E5" rx="4"/>
          <text x="75" y="120" transform="rotate(-90 75,120)" fill="white" className="text-xs">Depth of Expertise</text>
        </svg>
      );
    case 'pi':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="30" fill="#4F46E5" rx="4"/>
          <rect x="40" y="50" width="30" height="130" fill="#4F46E5" rx="4"/>
          <rect x="130" y="50" width="30" height="130" fill="#4F46E5" rx="4"/>
          <text x="100" y="40" textAnchor="middle" fill="white" className="text-xs">Breadth of Knowledge</text>
          <text x="30" y="120" transform="rotate(-90 30,120)" fill="white" className="text-xs">Expertise 1</text>
          <text x="120" y="120" transform="rotate(-90 120,120)" fill="white" className="text-xs">Expertise 2</text>
        </svg>
      );
    case 'comb':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="30" fill="#4F46E5" rx="4"/>
          <rect x="40" y="50" width="20" height="130" fill="#4F46E5" rx="4"/>
          <rect x="90" y="50" width="20" height="130" fill="#4F46E5" rx="4"/>
          <rect x="140" y="50" width="20" height="130" fill="#4F46E5" rx="4"/>
          <text x="100" y="40" textAnchor="middle" fill="white" className="text-xs">Multiple Areas of Expertise</text>
        </svg>
      );
    case 'e':
      return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="30" fill="#4F46E5" rx="4"/>
          <rect x="20" y="85" width="160" height="30" fill="#4F46E5" rx="4"/>
          <rect x="20" y="150" width="160" height="30" fill="#4F46E5" rx="4"/>
          <rect x="20" y="20" width="30" height="160" fill="#4F46E5" rx="4"/>
          <text x="100" y="40" textAnchor="middle" fill="white" className="text-xs">Expertise</text>
          <text x="100" y="105" textAnchor="middle" fill="white" className="text-xs">Experience</text>
          <text x="100" y="170" textAnchor="middle" fill="white" className="text-xs">Execution</text>
        </svg>
      );
    default:
      return null;
  }
};

export default function ProfileShapeVisual({ shape }: ProfileShapeVisualProps) {
  const shapeInfo = shapes[shape as keyof typeof shapes];
  if (!shapeInfo) return null;

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg p-12 mb-16">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Understanding Your Profile Shape</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex items-center justify-center bg-white rounded-xl shadow-inner p-8 h-80">
          {renderShape(shape)}
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="text-2xl font-bold text-indigo-600 mb-4">{shapeInfo.title}</h4>
          <p className="text-gray-700 leading-relaxed text-lg">
            {shapeInfo.description}
          </p>
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h5 className="text-lg font-semibold text-indigo-900 mb-2">Why This Matters</h5>
            <p className="text-gray-600">
              Understanding your profile shape helps you leverage your strengths, identify growth opportunities, and align your career path with roles that best match your expertise pattern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}