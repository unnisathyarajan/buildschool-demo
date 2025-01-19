import React from 'react';
import { X, Loader2 } from 'lucide-react';

interface ResumeUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  content: string;
}

export default function ResumeUpdateModal({ isOpen, onClose, loading, content }: ResumeUpdateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Your ATS-Optimized Resume</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="ml-3 text-lg text-gray-600">Optimizing your resume...</span>
            </div>
          ) : (
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: content
                  .replace(/\n/g, '<br/>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-700">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/#{3} (.*?)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-indigo-900">$1</h3>')
                  .replace(/#{2} (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-indigo-900">$1</h2>')
                  .replace(/#{1} (.*?)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-6 text-indigo-900">$1</h1>')
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}