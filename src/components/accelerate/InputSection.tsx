import React, { useState } from 'react';
import { Upload, Link, FileText } from 'lucide-react';
import FileUploadModal from './FileUploadModal';
import TextInputModal from './TextInputModal';
import LinkInputModal from './LinkInputModal';

interface InputSectionProps {
  title: string;
  instruction: string;
  onContentUpdate: (content: string) => void;
}

export default function InputSection({ title, instruction, onContentUpdate }: InputSectionProps) {
  const [showFileModal, setShowFileModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">{instruction}</p>
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => setShowFileModal(true)}
          className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" />
          <span className="text-sm">Upload</span>
        </button>
        <button 
          onClick={() => setShowTextModal(true)}
          className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50"
        >
          <FileText className="h-4 w-4" />
          <span className="text-sm">Text</span>
        </button>
        <button 
          onClick={() => setShowLinkModal(true)}
          className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded hover:bg-gray-50"
        >
          <Link className="h-4 w-4" />
          <span className="text-sm">Link</span>
        </button>
      </div>

      <FileUploadModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onUpload={onContentUpdate}
        title={title}
      />
      <TextInputModal
        isOpen={showTextModal}
        onClose={() => setShowTextModal(false)}
        onSubmit={onContentUpdate}
        title={title}
      />
      <LinkInputModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSubmit={onContentUpdate}
        title={title}
      />
    </div>
  );
}