import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CareerDetailModal from './components/CareerDetailModal';
import AICounselorChat from './components/AICounselorChat';

// Pages
import HomePage from './pages/HomePage';
import ExploreCareersPage from './pages/ExploreCareersPage';
import CoursesPage from './pages/CoursesPage';
import AssessmentPage from './pages/AssessmentPage';
import CareerComparePage from './pages/CareerComparePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AboutProjectPage from './pages/AboutProjectPage';

function CareerApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [comparisonCareers, setComparisonCareers] = useState([]);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  function openAuthModal(mode = 'login') {
    setAuthModal({ isOpen: true, mode });
  }

  function closeAuthModal() {
    setAuthModal({ isOpen: false, mode: 'login' });
  }

  function handleSelectCareer(career) {
    setSelectedCareer(career);
  }

  function handleCompareCareer(career) {
    if (!comparisonCareers.some(c => c.id === career.id)) {
      setComparisonCareers(prev => [...prev.slice(-2), career]);
    }
    setActiveTab('compare');
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={openAuthModal}
        openDetailModal={handleSelectCareer}
      />

      {/* Main Content Page Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectCareer={handleSelectCareer}
            setSelectedCategory={setSelectedCategory}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreCareersPage
            onSelectCareer={handleSelectCareer}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesPage
            setSelectedCategory={setSelectedCategory}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'assessment' && (
          <AssessmentPage
            onSelectCareer={handleSelectCareer}
            setActiveTab={setActiveTab}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'compare' && (
          <CareerComparePage
            comparisonCareers={comparisonCareers}
            onSelectCareer={handleSelectCareer}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            onSelectCareer={handleSelectCareer}
            setActiveTab={setActiveTab}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            onSelectCareer={handleSelectCareer}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'about' && (
          <AboutProjectPage />
        )}
      </main>

      {/* Career Details Modal */}
      {selectedCareer && (
        <CareerDetailModal
          career={selectedCareer}
          onClose={() => setSelectedCareer(null)}
          onSelectCareer={handleSelectCareer}
          onCompare={handleCompareCareer}
          openAuthModal={openAuthModal}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={closeAuthModal}
      />

      {/* Floating 24/7 AI Career Counselor */}
      <AICounselorChat />

      {/* Academic Synopsis Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CareerApp />
    </AuthProvider>
  );
}
