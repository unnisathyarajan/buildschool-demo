import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import WelcomeMessage from './profile/WelcomeMessage';
import UserInfoForm from './profile/UserInfoForm';
import ResumeUpload from './profile/ResumeUpload';
import JobDescriptionUpload from './profile/JobDescriptionUpload';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-primary-light w-full max-w-2xl mx-4 rounded-xl shadow-2xl border border-secondary/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Profile</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8">
            <WelcomeMessage />
            <UserInfoForm />
            <ResumeUpload />
            <JobDescriptionUpload />
          </div>
        </div>
      </div>
    </div>
  );
}