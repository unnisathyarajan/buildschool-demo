import React, { useState } from 'react';
import { Upload, FileText, Link as LinkIcon } from 'lucide-react';
import FileUploadModal from '../accelerate/FileUploadModal';
import TextInputModal from '../accelerate/TextInputModal';
import LinkInputModal from '../accelerate/LinkInputModal';
import UploadConfirmation from './UploadConfirmation';

interface DocumentUploadProps {
  title: string;
  instruction: string;
  onUpload: (content: string, type: 'content' | 'file_url' | 'link_url') => Promise<void>;
  currentValue?: string;
  error?: string | null;
}

export default function DocumentUpload({ 
  title, 
  instruction, 
  onUpload,
  currentValue,
  error 
}: DocumentUploadProps) {
  const [showFileModal, setShowFileModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(error || null);

  const handleUpload = async (content: string, type: 'content' | 'file_url' | 'link_url') => {
    try {
      setUploadError(null);
      await onUpload(content, type);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } catch (error: any) {
      console.error(`Error uploading ${title.toLowerCase()}:`, error);
      setUploadError(error.message || `Failed to upload ${title.toLowerCase()}`);
      setTimeout(() => setUploadError(null), 5000);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{instruction}</p>
      
      {currentValue && (
        <div className="text-sm text-gray-300 bg-primary/50 p-2 rounded">
          Current {title.toLowerCase()} uploaded
        </div>
      )}
      
      {(uploadError || error) && (
        <div className="text-sm text-red-400 bg-red-500/10 p-2 rounded">
          {uploadError || error}
        </div>
      )}
      
      <UploadConfirmation 
        show={showConfirmation} 
        message={`${title} uploaded successfully!`} 
      />

      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={() => setShowFileModal(true)}
          className="flex items-center justify-center gap-2 p-2 border border-secondary/20 rounded hover:bg-primary"
        >
          <Upload className="h-4 w-4 text-secondary" />
          <span className="text-gray-300">Upload</span>
        </button>
        <button 
          onClick={() => setShowTextModal(true)}
          className="flex items-center justify-center gap-2 p-2 border border-secondary/20 rounded hover:bg-primary"
        >
          <FileText className="h-4 w-4 text-secondary" />
          <span className="text-gray-300">Text</span>
        </button>
        <button 
          onClick={() => setShowLinkModal(true)}
          className="flex items-center justify-center gap-2 p-2 border border-secondary/20 rounded hover:bg-primary"
        >
          <LinkIcon className="h-4 w-4 text-secondary" />
          <span className="text-gray-300">Link</span>
        </button>
      </div>

      <FileUploadModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onUpload={(content) => handleUpload(content, 'file_url')}
        title={title}
      />
      <TextInputModal
        isOpen={showTextModal}
        onClose={() => setShowTextModal(false)}
        onSubmit={(content) => handleUpload(content, 'content')}
        title={title}
      />
      <LinkInputModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSubmit={(content) => handleUpload(content, 'link_url')}
        title={title}
      />
    </div>
  );
}