import React from 'react';
import { CheckCircle } from 'lucide-react';

interface UploadConfirmationProps {
  show: boolean;
  message: string;
}

export default function UploadConfirmation({ show, message }: UploadConfirmationProps) {
  if (!show) return null;

  return (
    <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-2 rounded-lg mt-2">
      <CheckCircle className="h-5 w-5" />
      <span className="text-sm">{message}</span>
    </div>
  );
}