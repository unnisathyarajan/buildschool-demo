import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
      >
        <UserCircle className="w-6 h-6 text-secondary" />
      </button>
      <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}