import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { JobsView } from './components/JobsView';
import { ProjectsView } from './components/ProjectsView';
import { PortfolioBuilderView } from './components/PortfolioBuilderView';
import { CareerGuideView } from './components/CareerGuideView';
import { AddProjectModal } from './components/AddProjectModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { ActiveTab, JobListing, StudentProject } from './types';
import { fetchProjects, fetchJobs, checkSupabaseConnection } from './lib/supabase';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [projects, setProjects] = useState<StudentProject[]>([]);
  const [supabaseStatus, setSupabaseStatus] = useState({
    connected: false,
    url: 'Loading...',
    message: ''
  });

  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // Synchronize hash with active tab for direct mobile URL linking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'builder' || hash === 'portfolio') setActiveTab('builder');
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

  const loadData = async () => {
    const status = await checkSupabaseConnection();
    setSupabaseStatus({
      connected: status.connected,
      url: status.url,
      message: status.message
    });

    const [jList, pList] = await Promise.all([fetchJobs(), fetchProjects()]);
    setJobs(jList);
    setProjects(pList);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProjectAdded = (newProject: StudentProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        supabaseStatus={supabaseStatus}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        onOpenAddProjectModal={() => setIsAddProjectModalOpen(true)}
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
