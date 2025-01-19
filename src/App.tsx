import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import Journey from './components/Journey';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import ProfileAnalysisPage from './pages/journey/ProfileAnalysisPage';
import SkillAssessmentPage from './pages/journey/SkillAssessmentPage';
import MarketAlignmentPage from './pages/journey/MarketAlignmentPage';
import CommunicationPage from './pages/journey/CommunicationPage';
import CareerAstrologyPage from './pages/journey/CareerAstrologyPage';
import VoiceAssistant from './components/VoiceAssistant';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider } from './context/NavigationContext';

type Page = 'home' | 'auth' | 'profile' | 'skills' | 'market' | 'communication' | 'astrology';

function AppContent() {
  const [currentPage, setCurrentPage] = React.useState<Page>('home');
  const { user } = useAuth();

  const handleNavigation = (page: Page) => {
    if ((page !== 'home' && page !== 'auth') && !user) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
  };

  if (currentPage === 'auth') {
    return <AuthPage onAuthSuccess={() => setCurrentPage('home')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfileAnalysisPage onNavigateToSkills={() => handleNavigation('skills')} />;
      case 'skills':
        return <SkillAssessmentPage />;
      case 'market':
        return <MarketAlignmentPage />;
      case 'communication':
        return <CommunicationPage />;
      case 'astrology':
        return <CareerAstrologyPage />;
      default:
        return (
          <>
            <Hero onGetStarted={() => handleNavigation('auth')} />
            <Benefits />
            <Journey />
            <HowItWorks />
            <Testimonials />
            <FAQ />
          </>
        );
    }
  };

  return (
    <NavigationProvider onNavigate={handleNavigation}>
      <div className="min-h-screen bg-white">
        <Navbar 
          onJourneySelect={(page) => handleNavigation(page as Page)}
          onHomeClick={() => handleNavigation('home')}
          onGetStartedClick={() => handleNavigation('auth')}
        />
        {renderPage()}
        <Footer />
        <VoiceAssistant />
      </div>
    </NavigationProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;