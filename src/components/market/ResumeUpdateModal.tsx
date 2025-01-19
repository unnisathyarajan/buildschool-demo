import React, { useState } from 'react';
import { X, Copy, Download, FileText } from 'lucide-react';
import ResumeFormatSelector from './ResumeFormatSelector';
import ResumePreview from './ResumePreview';
import ScoreComparisonChart from './ScoreComparisonChart';
import { exportToDocx } from '../../utils/docxExport';

interface ResumeUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  beforeScore?: number;
  afterScore?: number;
}

export default function ResumeUpdateModal({ 
  isOpen, 
  onClose, 
  content,
  beforeScore = 65, // Default scores for demonstration
  afterScore = 85
}: ResumeUpdateModalProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'plain' | 'json' | 'html' | 'docx'>('plain');

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = async () => {
    if (selectedFormat === 'docx') {
      await exportToDocx(content);
    } else {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `updated-resume.${selectedFormat === 'json' ? 'json' : selectedFormat === 'html' ? 'html' : 'txt'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Your ATS-Optimized Resume</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <Copy className="h-5 w-5" />
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              {selectedFormat === 'docx' ? <FileText className="h-5 w-5" /> : <Download className="h-5 w-5" />}
              Download {selectedFormat.toUpperCase()}
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <ScoreComparisonChart beforeScore={beforeScore} afterScore={afterScore} />
          
          <ResumeFormatSelector
            content={content}
            onFormatSelect={setSelectedFormat}
            selectedFormat={selectedFormat}
          />
          <ResumePreview content={content} format={selectedFormat} />
        </div>
      </div>
    </div>
  );
}