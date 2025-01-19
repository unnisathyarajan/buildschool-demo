import React from 'react';
import { Menu, X, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProfileButton from './ProfileButton';
import JourneyMenu from './JourneyMenu';

interface NavbarProps {
  onJourneySelect: (page: string) => void;
  onHomeClick: () => void;
  onGetStartedClick: () => void;
}

export default function Navbar({ onJourneySelect, onHomeClick, onGetStartedClick }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, signOut } = useAuth();

  const menuItems = [
    { label: 'Home', onClick: onHomeClick },
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="bg-primary fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-secondary" />
            <button onClick={onHomeClick} className="ml-2 text-2xl font-bold text-white">
              Job Catalyst
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button 
                key={item.label}
                onClick={item.onClick || (() => {})}
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <JourneyMenu onPageSelect={onJourneySelect} />
            {user ? (
              <div className="flex items-center gap-4">
                <ProfileButton />
                <button
                  onClick={() => signOut()}
                  className="bg-secondary text-primary px-6 py-2 rounded-full hover:bg-secondary-light transition-colors font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onGetStartedClick}
                className="bg-secondary text-primary px-6 py-2 rounded-full hover:bg-secondary-light transition-colors font-semibold"
              >
                Get Started
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {user && <ProfileButton />}
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick || (() => {})}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-secondary"
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => signOut()}
                className="w-full bg-secondary text-primary px-6 py-2 rounded-full hover:bg-secondary-light"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={onGetStartedClick}
                className="w-full bg-secondary text-primary px-6 py-2 rounded-full hover:bg-secondary-light"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}