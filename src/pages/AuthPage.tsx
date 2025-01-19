import React, { useState, useEffect } from 'react';
import { Mail, Lock, Github, Linkedin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createProfile } from '../utils/auth';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const { signIn, signUp, error, user } = useAuth();

  useEffect(() => {
    if (user) {
      onAuthSuccess();
    }
  }, [user, onAuthSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        await signIn(email, password);
      } else {
        const { user: newUser, error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;
        if (newUser) {
          await createProfile(newUser.id, {
            full_name: fullName,
            linkedin_url: linkedinUrl
          });
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-primary-light p-8 rounded-xl shadow-2xl border border-secondary/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-300">
            {isSignIn ? 'Sign in to continue your journey' : 'Begin your career transformation'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignIn && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-primary border border-gray-600 text-white px-3 py-2 mt-1 block w-full rounded-lg"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary border border-gray-600 text-white pl-10 block w-full rounded-lg p-2.5"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-primary border border-gray-600 text-white pl-10 block w-full rounded-lg p-2.5"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isSignIn && (
            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-300">
                LinkedIn URL
              </label>
              <input
                id="linkedinUrl"
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="bg-primary border border-gray-600 text-white px-3 py-2 mt-1 block w-full rounded-lg"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-secondary text-primary py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-300">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-secondary hover:text-secondary-light font-medium"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}