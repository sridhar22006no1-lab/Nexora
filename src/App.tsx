import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { JobsView } from './components/JobsView';
import { ProjectsView } from './components/ProjectsView';
import { PortfolioBuilderView } from './components/PortfolioBuilderView';
import { CareerGuideView } from './components/CareerGuideView';
import { StudentDashboardView } from './components/dashboard/StudentDashboardView';
import { NotesManagerView } from './components/study/NotesManagerView';
import { StudyPlannerView } from './components/study/StudyPlannerView';
import { AiStudyAssistantView } from './components/study/AiStudyAssistantView';
import { LearningAnalyticsView } from './components/study/LearningAnalyticsView';
import { AuthModal } from './components/auth/AuthModal';
import { AddProjectModal } from './components/AddProjectModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { ActiveTab, JobListing, StudentProject, UserProfile, ThemeMode } from './types';
import { fetchProjects, fetchJobs, checkSupabaseConnection, getCurrentAuthUser, signOutUser } from './lib/supabase';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Theme Mode: Default is 'dark' for premium SaaS aesthetic
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('nexora_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {
      // ignore
    }
    return 'dark';
  });

  const [supabaseStatus, setSupabaseStatus] = useState({
    connected: false,
    url: 'Loading...',
    message: ''
  });

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // Sync theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('nexora_theme', theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Hash-based routing sync
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'dashboard') setActiveTab('dashboard');
      else if (hash === 'notes') setActiveTab('notes');
      else if (hash === 'planner') setActiveTab('planner');
      else if (hash === 'ai-study' || hash === 'ai') setActiveTab('ai-study');
      else if (hash === 'analytics') setActiveTab('analytics');
      else if (hash === 'builder' || hash === 'portfolio') setActiveTab('builder');
      else if (hash === 'jobs') setActiveTab('jobs');
      else if (hash === 'projects') setActiveTab('projects');
      else if (hash === 'career-guide') setActiveTab('career-guide');
      else if (hash === 'home' || hash === '') setActiveTab('home');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'builder' ? 'portfolio' : tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial load
  const loadData = async () => {
    const [status, currentUser, jList, pList] = await Promise.all([
      checkSupabaseConnection(),
      getCurrentAuthUser(),
      fetchJobs(),
      fetchProjects()
    ]);

    setSupabaseStatus({
      connected: status.connected,
      url: status.url,
      message: status.message
    });

    if (currentUser) {
      setUser(currentUser);
    }

    setJobs(jList);
    setProjects(pList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    setActiveTab('dashboard');
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
    if (activeTab === 'dashboard') {
      setActiveTab('home');
    }
  };

  const handleProjectAdded = (newProject: StudentProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white' : 'bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white'
    }`}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        supabaseStatus={supabaseStatus}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        onOpenAddProjectModal={() => setIsAddProjectModalOpen(true)}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {activeTab === 'home' && (
          <HomeView
            jobs={jobs}
            projects={projects}
            setActiveTab={handleTabChange}
            onSelectSearchQuery={(q) => setSearchQuery(q)}
          />
        )}

        {activeTab === 'dashboard' && (
          user ? (
            <StudentDashboardView
              user={user}
              setActiveTab={handleTabChange}
              onOpenNotes={() => handleTabChange('notes')}
              onOpenPlanner={() => handleTabChange('planner')}
              onOpenAiStudy={() => handleTabChange('ai-study')}
            />
          ) : (
            <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">Protected Route</h2>
                <p className="text-xs text-slate-400">
                  Authentication required. Sign in or register for free to access your personal student dashboard, learning streak, and career analytics.
                </p>
              </div>
              <div className="pt-3 flex flex-col gap-2.5">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Sign In / Register Free
                </button>
                <button
                  onClick={() => handleTabChange('home')}
                  className="w-full py-2.5 rounded-2xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-750 transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'notes' && (
          <NotesManagerView
            user={user}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'planner' && (
          <StudyPlannerView
            user={user}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'ai-study' && (
          <AiStudyAssistantView
            user={user}
            onNavigateToNotes={() => handleTabChange('notes')}
          />
        )}

        {activeTab === 'analytics' && (
          <LearningAnalyticsView
            user={user}
            setActiveTab={handleTabChange}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsView
            jobs={jobs}
            initialSearchQuery={searchQuery}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectsView
            projects={projects}
            onOpenAddProjectModal={() => setIsAddProjectModalOpen(true)}
          />
        )}

        {activeTab === 'builder' && (
          <PortfolioBuilderView />
        )}

        {activeTab === 'career-guide' && (
          <CareerGuideView
            setActiveTab={handleTabChange}
          />
        )}
      </main>

      <Footer setActiveTab={handleTabChange} />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        onClose={() => setIsAddProjectModalOpen(false)}
        onProjectAdded={handleProjectAdded}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onConfigSaved={loadData}
      />
    </div>
  );
}

export default App;
