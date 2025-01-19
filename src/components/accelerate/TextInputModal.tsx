import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  title: string;
}

export default function TextInputModal({ isOpen, onClose, onSubmit, title }: TextInputModalProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(text);
    setText('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Enter {title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-2 border rounded-lg mb-4"
          placeholder={`Enter your ${title.toLowerCase()} here...`}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}