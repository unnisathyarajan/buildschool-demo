import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile } from '../../utils/profile';
import type { Profile } from '../../types/profile';

export default function ProfileForm() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Partial<Profile>>({
    full_name: '',
    linkedin_url: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getProfile(user!.id);
      if (data) {
        setProfile(data);
      }
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsLoading(true);
      await updateProfile(user.id, profile);
      setError(null);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={profile.full_name || ''}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          className="mt-1 block w-full rounded-md bg-primary border border-gray-600 text-white px-3 py-2"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-300">
          LinkedIn URL
        </label>
        <input
          id="linkedinUrl"
          type="url"
          value={profile.linkedin_url || ''}
          onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
          className="mt-1 block w-full rounded-md bg-primary border border-gray-600 text-white px-3 py-2"
          placeholder="https://linkedin.com/in/your-profile"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-secondary text-primary py-2 rounded-lg font-semibold hover:bg-secondary-light disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}