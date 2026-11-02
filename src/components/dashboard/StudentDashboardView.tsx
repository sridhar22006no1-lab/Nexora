import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  Bot, 
  Calendar, 
  Layout, 
  ArrowRight, 
  Award, 
  TrendingUp, 
  Target,
  FileText,
  User,
  GraduationCap,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { UserProfile, ActiveTab } from '../../types';
import { fetchUserNotes, fetchStudyTasks, fetchPomodoroStats } from '../../lib/supabase';

interface StudentDashboardViewProps {
  user: UserProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiStudy?: () => void;
  onOpenNotes?: () => void;
  onOpenPlanner?: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  user,
  setActiveTab,
  onOpenAiStudy,
  onOpenNotes,
  onOpenPlanner,
}) => {
  const [notesCount, setNotesCount] = useState<number>(0);
  const [tasksCount, setTasksCount] = useState<number>(0);
  const [pomodoroStats, setPomodoroStats] = useState(() => fetchPomodoroStats());

  useEffect(() => {
    let isMounted = true;
    const loadDynamicUserData = async () => {
      try {
        const [uNotes, uTasks] = await Promise.all([
          fetchUserNotes(user.id),
          fetchStudyTasks(user.id)
        ]);
        if (isMounted) {
          setNotesCount(uNotes.length);
          setTasksCount(uTasks.filter(t => t.status !== 'completed').length);
          setPomodoroStats(fetchPomodoroStats());
        }
      } catch (e) {
        console.warn('Dashboard user data fetch error:', e);
      }
    };
    loadDynamicUserData();
    return () => { isMounted = false; };
  }, [user.id]);
  return (
    <div className="space-y-8 py-2">
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 p-6 sm:p-10 border border-indigo-900/50 shadow-xl text-white">
        {/* Glow orb */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Student Dashboard • Batch {user.graduationYear || 2026}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Welcome back, {user.fullName}! 🚀
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track your daily learning progress, generate ATS-ready proof-of-work portfolios, and prepare for upcoming campus & corporate fresher drives.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                {user.degree} • {user.institution}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('builder')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Layout className="w-4 h-4" /> Edit Portfolio
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-4 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Briefcase className="w-4 h-4" /> View Openings
            </button>
          </div>
        </div>
      </div>

      {/* Gamified Core Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="bg-slate-900/90 dark:bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
            <Flame className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">{user.studyStreak || 5} Days</div>
            <div className="text-xs text-slate-400 font-semibold">Active Study Streak</div>
          </div>
        </div>

        {/* Study Hours */}
        <div 
          onClick={onOpenPlanner || (() => setActiveTab('planner'))}
          className="bg-slate-900/90 dark:bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-indigo-500/50 transition-colors cursor-pointer"
        >
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">{pomodoroStats.todayMinutes} mins</div>
            <div className="text-xs text-slate-400 font-semibold">Today's Focus Logged</div>
          </div>
        </div>

        {/* Profile Strength */}
        <div 
          onClick={() => setActiveTab('analytics')}
          className="bg-slate-900/90 dark:bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-emerald-500/50 transition-colors cursor-pointer"
        >
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">85% Ready</div>
            <div className="text-xs text-slate-400 font-semibold">Recruiter Score</div>
          </div>
        </div>

        {/* Matching Jobs */}
        <div 
          onClick={() => setActiveTab('jobs')}
          className="bg-slate-900/90 dark:bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4 hover:border-blue-500/50 transition-colors cursor-pointer"
        >
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">6 Openings</div>
            <div className="text-xs text-slate-400 font-semibold">Batch 2026 Verified</div>
          </div>
        </div>
      </div>

      {/* Main SaaS Study & Career Modules Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" /> Nexora Student Learning & Career Hub
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Module 1: AI Study Assistant */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-violet-500/50 shadow-sm transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl border border-violet-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">
                  AI Powered
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                AI Study Companion
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Summarize lecture notes, debug coding issues, generate practice MCQs, and explain complex engineering concepts instantly.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Code Debugger</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Quiz Generator</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Concept Explainer</span>
              </div>
            </div>

            <button
              onClick={onOpenAiStudy || (() => setActiveTab('ai-study'))}
              className="mt-6 w-full py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-violet-500/30 transition-all cursor-pointer"
            >
              Launch AI Assistant <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module 2: Notes Management */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/50 shadow-sm transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                  Semester Hub
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                Academic Notes & Formulae
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Organize unit study handouts, quick formula cheat-sheets, and solved university question banks with instant search.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold">{notesCount} Saved Notes</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Unit Handouts</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Markdown View</span>
              </div>
            </div>

            <button
              onClick={onOpenNotes || (() => setActiveTab('notes'))}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-indigo-500/30 transition-all cursor-pointer"
            >
              Open Notes Manager <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Module 3: Study Planner & Pomodoro */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 shadow-sm transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                  Focus Engine
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Study Planner & Timer
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Stay on track with 25-minute Pomodoro focus blocks, assignment milestone checklists, and semester exam countdowns.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[11px] font-semibold">{tasksCount} Active Tasks</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Pomodoro 25m</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">Exam Countdown</span>
              </div>
            </div>

            <button
              onClick={onOpenPlanner || (() => setActiveTab('planner'))}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-500/30 transition-all cursor-pointer"
            >
              Launch Focus Planner <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access to Portfolio & Career Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Portfolio Status Card */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Layout className="w-4 h-4 text-indigo-400" /> Public Developer Portfolio
            </div>
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live & Shareable
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Your developer portfolio showcases working software, GitHub commit proofs, and dynamic recruiter readiness scores.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('builder')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Open Portfolio Generator <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Verified Job Alerts Card */}
        <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Briefcase className="w-4 h-4 text-teal-400" /> Fresher & Intern Vacancies
            </div>
            <span className="text-xs text-indigo-300 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Batch 2025 - 2027
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            100% verified corporate openings (Zomato, Zoho, Swiggy, Freshworks, Razorpay) with transparent INR stipends.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Browse 6 Verified Openings <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
