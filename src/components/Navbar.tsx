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
  Sun, 
  Moon, 
  User, 
  LogOut, 
  LayoutDashboard,
  LogIn,
  BookOpen,
  Calendar,
  Bot,
  TrendingUp
} from 'lucide-react';
import { ActiveTab, UserProfile, ThemeMode } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  supabaseStatus: { connected: boolean; url: string; message: string };
  onOpenSupabaseModal: () => void;
  onOpenAddProjectModal: () => void;
  user: UserProfile | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  supabaseStatus,
  onOpenSupabaseModal,
  onOpenAddProjectModal,
  user,
  onOpenAuthModal,
  onSignOut,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Supabase Status Strip */}
      <div className="bg-slate-950 text-slate-400 text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenSupabaseModal}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
              title="Click to view or edit Supabase connection"
            >
              <span className={`inline-block w-2 h-2 rounded-full ${supabaseStatus.connected ? 'bg-emerald-400 animate-pulse' : 'bg-teal-400'}`}></span>
              <span className="font-medium text-slate-300 text-xs">
                {supabaseStatus.connected ? 'Supabase Connected' : 'Nexora Cloud Engine'}
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
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="hidden sm:inline">AI-Powered Student Hub</span>
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
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 rounded-xl text-white font-black text-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                N
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                    Nexora
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold border border-indigo-500/20 uppercase tracking-wider">
                    INDIA
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                  AI Student Career & Study Hub
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-slate-800 text-indigo-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            {user && (
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                Dashboard
              </button>
            )}

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'bg-slate-800 text-indigo-400 font-bold border border-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Notes Hub
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'planner'
                  ? 'bg-slate-800 text-indigo-400 font-bold border border-indigo-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Study Planner
            </button>

            <button
              onClick={() => setActiveTab('ai-study')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ai-study'
                  ? 'bg-slate-800 text-violet-400 font-bold border border-violet-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-violet-400" />
              AI Study Tutor
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Analytics
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'bg-slate-800 text-indigo-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Explore Jobs
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 font-bold">
                6 Active
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-slate-800 text-indigo-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Projects
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'builder'
                  ? 'bg-slate-800 text-indigo-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              Portfolio Generator
            </button>

            <button
              onClick={() => setActiveTab('career-guide')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'career-guide'
                  ? 'bg-slate-800 text-indigo-400 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Career Playbook
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenAddProjectModal}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-slate-400" /> Post Project
            </button>

            {/* Auth / Profile State */}
            {user ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-bold text-white border border-slate-700 transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-[10px] font-bold">
                    {user.fullName.slice(0, 1)}
                  </div>
                  <span className="truncate max-w-[100px]">{user.fullName.split(' ')[0]}</span>
                </button>
                <button
                  onClick={onSignOut}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" /> Student Login
              </button>
            )}
          </div>

          {/* Mobile Actions: Theme + Auth + Burger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Dashboard
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900/98 px-4 pt-3 pb-6 space-y-2 text-slate-200">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold ${
                activeTab === 'home' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              Home Overview
            </button>

            {user && (
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                  activeTab === 'dashboard' ? 'bg-indigo-600 text-white font-bold' : 'text-indigo-400'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Student Dashboard
              </button>
            )}

            <button
              onClick={() => { setActiveTab('notes'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'notes' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" /> Study Notes Hub
            </button>

            <button
              onClick={() => { setActiveTab('planner'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'planner' ? 'bg-indigo-600/20 text-blue-400 font-bold' : 'text-slate-300'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-400" /> Study Planner & Pomodoro
            </button>

            <button
              onClick={() => { setActiveTab('ai-study'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'ai-study' ? 'bg-violet-600/20 text-violet-400 font-bold' : 'text-slate-300'
              }`}
            >
              <Bot className="w-4 h-4 text-violet-400" /> AI Study Tutor & Quizzes
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'analytics' ? 'bg-emerald-600/20 text-emerald-400 font-bold' : 'text-slate-300'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Progress & Career Analytics
            </button>

            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between ${
                activeTab === 'jobs' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Explore Jobs</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 font-bold">6 Active</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'projects' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              <Code2 className="w-4 h-4" /> Student Projects
            </button>

            <button
              onClick={() => { setActiveTab('builder'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'builder' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300'
              }`}
            >
              <Layout className="w-4 h-4" /> Portfolio Generator & Preview
            </button>

            <button
              onClick={() => { setActiveTab('career-guide'); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                activeTab === 'career-guide' ? 'bg-indigo-600/20 text-indigo-400 font-bold' : 'text-slate-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Career Playbook
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => { onOpenAddProjectModal(); setMobileMenuOpen(false); }}
              className="font-bold text-indigo-400"
            >
              + Post Your Project
            </button>

            {user ? (
              <button
                onClick={() => { onSignOut(); setMobileMenuOpen(false); }}
                className="font-semibold text-rose-400 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
                className="font-bold text-white bg-indigo-600 px-3 py-1.5 rounded-lg"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
