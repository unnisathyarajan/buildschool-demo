import React from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useProfileStatus } from '../../hooks/useProfileStatus';

export default function ProfileStatus() {
  const { resumeStatus, jobDescriptionStatus, isLoading } = useProfileStatus();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
          <span className="ml-2 text-gray-600">Loading status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h3>
      
      <StatusItem
        label="Resume"
        isUploaded={resumeStatus}
      />
      
      <StatusItem
        label="Job Description"
        isUploaded={jobDescriptionStatus}
      />
    </div>
  );
}

interface StatusItemProps {
  label: string;
  isUploaded: boolean;
}

function StatusItem({ label, isUploaded }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <span className="text-gray-700">{label}</span>
      {isUploaded ? (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-5 w-5 mr-1" />
          <span className="text-sm">Uploaded</span>
        </div>
      ) : (
        <div className="flex items-center text-gray-400">
          <XCircle className="h-5 w-5 mr-1" />
          <span className="text-sm">Not uploaded</span>
        </div>
      )}
    </div>
  );
}