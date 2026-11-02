import React, { useState } from 'react';
import { 
  Briefcase, 
  Code2, 
  User, 
  Database, 
  ExternalLink, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
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
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSupabaseModal}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
              title="Click to view or edit Supabase connection"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${supabaseStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="font-medium text-slate-200">
                {supabaseStatus.connected ? 'Supabase Connected:' : 'Hybrid Local Mode:'}
              </span>
              <span className="text-slate-400 font-mono text-[11px] group-hover:underline">
                {supabaseStatus.url.replace(/^https?:\/\//, '')}
              </span>
              <span className="text-[10px] bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded border border-slate-700">
                Settings
              </span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Corporate Openings
            </span>
            <span className="text-slate-600">•</span>
            <span>Batch 2025 - 2027 Fresher Hub</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="h-10 w-10 bg-indigo-600 rounded-xl text-white font-extrabold flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                N
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Nexora
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 uppercase tracking-wider">
                    India
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden md:block">
                  Student Career & Portfolio Hub
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Explore Jobs
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-100 text-indigo-700 font-bold">
                6 Active
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Student Projects
            </button>

            <button
              onClick={() => setActiveTab('career-guide')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'career-guide'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Career & Resume Guide
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/sridhar22006no1-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Sridhar's GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com/in/sridhar-it"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Sridhar's LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenAddProjectModal}
              className="px-3.5 py-2 rounded-lg text-xs font-bold border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              + Submit Project
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-indigo-700 text-white ring-2 ring-indigo-400 ring-offset-2'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <User className="w-4 h-4" />
              Sridhar's Portfolio
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white"
            >
              Portfolio
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 rounded-lg text-left text-sm font-semibold ${
                activeTab === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center justify-between ${
                activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Explore Jobs</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700 font-bold">6 Active</span>
            </button>
            <button
              onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                activeTab === 'projects' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
              }`}
            >
              <Code2 className="w-4 h-4" /> Student Projects Showcase
            </button>
            <button
              onClick={() => { setActiveTab('career-guide'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                activeTab === 'career-guide' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Career & Resume Guide
            </button>
            <button
              onClick={() => { setActiveTab('portfolio'); setMobileMenuOpen(false); }}
              className={`px-3 py-2.5 rounded-lg text-left text-sm font-semibold flex items-center gap-2 ${
                activeTab === 'portfolio' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-900'
              }`}
            >
              <User className="w-4 h-4" /> Sridhar's Public Portfolio
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { onOpenAddProjectModal(); setMobileMenuOpen(false); }}
              className="text-xs font-bold text-indigo-600"
            >
              + Submit Your Project
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
