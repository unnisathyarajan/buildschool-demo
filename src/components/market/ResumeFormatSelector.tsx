import React from 'react';
import { FileText, FileJson, Mail, FileType2 } from 'lucide-react';

interface ResumeFormatSelectorProps {
  content: string;
  onFormatSelect: (format: 'plain' | 'json' | 'html' | 'docx') => void;
  selectedFormat: 'plain' | 'json' | 'html' | 'docx';
}

export default function ResumeFormatSelector({ content, onFormatSelect, selectedFormat }: ResumeFormatSelectorProps) {
  const formats = [
    { id: 'plain', label: 'Plain Text', icon: FileText },
    { id: 'json', label: 'JSON Format', icon: FileJson },
    { id: 'html', label: 'HTML Format', icon: Mail },
    { id: 'docx', label: 'DOCX Format', icon: FileType2 }
  ];

  return (
    <div className="flex gap-4 mb-6 border-b pb-4">
      {formats.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onFormatSelect(id as 'plain' | 'json' | 'html' | 'docx')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            selectedFormat === id 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
    </div>
  );
}