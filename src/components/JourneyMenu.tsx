import React from 'react';
import { ChevronDown } from 'lucide-react';

interface JourneyMenuProps {
  onPageSelect: (page: string) => void;
}

export default function JourneyMenu({ onPageSelect }: JourneyMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { label: 'Profile Analysis', value: 'profile' },
    { label: 'Skill Assessment', value: 'skills' },
    { label: 'Skill Alignment', value: 'market' },
    { label: 'Industry Insights', value: 'communication' },
    { label: 'Career Astrology', value: 'astrology' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-secondary transition-colors"
      >
        Begin Your Journey
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onPageSelect(item.value);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}