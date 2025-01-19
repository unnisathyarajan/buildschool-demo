import React from 'react';
import { FileEdit } from 'lucide-react';

interface UpdateResumeButtonProps {
  onClick: () => void;
  className?: string;
}

export default function UpdateResumeButton({ onClick, className = '' }: UpdateResumeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-all transform hover:scale-105 font-semibold shadow-lg ${className}`}
    >
      <FileEdit className="h-5 w-5" />
      Update my Resume
    </button>
  );
}