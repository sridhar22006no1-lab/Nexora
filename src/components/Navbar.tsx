import React, { useState } from 'react';
import { 
  Briefcase, 
  Code2, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck,
  Plus,
  Layout,
  Smartphone
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  supabaseStatus: { connected: boolean; url: string; message: string };
  onOpenSupabaseModal: () => void;
  onOpenAddProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  supabaseStatus,
  onOpenSupabaseModal,
  onOpenAddProjectModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Supabase & Anti-Spam Status Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSupabaseModal}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
              title="Click to view or edit Supabase connection"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${supabaseStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-teal-400'}`}></span>
              <span className="font-medium text-slate-200 text-xs">
                {supabaseStatus.connected ? 'Supabase Database Connected' : 'Nexora Cloud Engine Ready'}
              </span>
              <span className="text-[10px] bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded border border-slate-700">
                Config
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Anti-Spam Job Portals
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline">Mobile & Desktop Web Platform</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="h-10 w-10 bg-indigo-600 rounded-xl text-white font-black text-xl flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                N
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Nexora
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 uppercase tracking-wider">
                    INDIA
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden md:block">
                  Student Career & Portfolio Hub
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'bg-slate-100 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Explore Jobs
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                6 Active
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-slate-100 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Student Projects
            </button>

            <button
              onClick={() => setActiveTab('career-guide')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'career-guide'
                  ? 'bg-slate-100 text-indigo-600 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Career Playbook
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenAddProjectModal}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" /> Post Project
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-indigo-700 text-white ring-2 ring-indigo-400 ring-offset-2'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Build Free Portfolio
            </button>
          </div>

          {/* Mobile Quick Action Buttons & Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('builder')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-xs"
            >
              Build Portfolio
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-left text-xs font-semibold ${
                activeTab === 'home' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between ${
                activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" /> Explore Jobs</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">6 Active</span>
            </button>
            <button
              onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'projects' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> Student Projects Showcase
            </button>
            <button
              onClick={() => { setActiveTab('builder'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'builder' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-100 text-slate-800'
              }`}
            >
              <Layout className="w-3.5 h-3.5" /> Portfolio Generator & Preview
            </button>
            <button
              onClick={() => { setActiveTab('career-guide'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'career-guide' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Career & Resume Guide
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { onOpenAddProjectModal(); setMobileMenuOpen(false); }}
              className="text-xs font-bold text-indigo-600"
            >
              + Post Your Project
            </button>
            <button
              onClick={() => { onOpenSupabaseModal(); setMobileMenuOpen(false); }}
              className="text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              Supabase Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
