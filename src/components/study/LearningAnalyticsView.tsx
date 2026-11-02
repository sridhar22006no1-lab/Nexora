import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Award, 
  Target, 
  CheckCircle2, 
  BarChart3, 
  Calendar, 
  Sparkles, 
  ArrowUpRight, 
  BookOpen, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Check, 
  Circle
} from 'lucide-react';
import { UserProfile, SkillProgress, AchievementBadge, ActiveTab } from '../../types';

interface LearningAnalyticsViewProps {
  user: UserProfile | null;
  setActiveTab: (tab: ActiveTab) => void;
}

const WEEKLY_STUDY_DAYS = [
  { day: 'Mon', hours: 2.5, sessions: 3 },
  { day: 'Tue', hours: 3.2, sessions: 4 },
  { day: 'Wed', hours: 1.8, sessions: 2 },
  { day: 'Thu', hours: 4.0, sessions: 5 },
  { day: 'Fri', hours: 3.5, sessions: 4 },
  { day: 'Sat', hours: 5.0, sessions: 6 },
  { day: 'Sun', hours: 2.0, sessions: 2 },
];

const SKILL_DOMAINS: SkillProgress[] = [
  { subject: 'Data Structures & Algorithms', hoursSpent: 8.5, masteryPercentage: 82, color: 'from-violet-500 to-indigo-500' },
  { subject: 'Operating Systems (Concurrency & Memory)', hoursSpent: 5.2, masteryPercentage: 76, color: 'from-blue-500 to-cyan-500' },
  { subject: 'Full Stack Web Development (React & Node)', hoursSpent: 6.0, masteryPercentage: 90, color: 'from-emerald-500 to-teal-500' },
  { subject: 'Database Systems (SQL & Normalization)', hoursSpent: 4.0, masteryPercentage: 70, color: 'from-amber-500 to-orange-500' },
  { subject: 'System Design & Distributed Cloud', hoursSpent: 2.8, masteryPercentage: 65, color: 'from-rose-500 to-pink-500' },
];

const ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: '5-Day Streak Flame Keeper',
    description: 'Maintained a continuous daily study streak for 5 consecutive days.',
    icon: '🔥',
    unlocked: true,
    unlockedDate: 'Nov 02, 2026'
  },
  {
    id: 'badge-2',
    title: 'Deadlock & Concurrency Master',
    description: 'Solved and summarized all 4 Coffman deadlock conditions in Operating Systems.',
    icon: '🎓',
    unlocked: true,
    unlockedDate: 'Oct 31, 2026'
  },
  {
    id: 'badge-3',
    title: 'First 20 Hours of Deep Work',
    description: 'Logged 20+ hours of focused, distraction-free Pomodoro study blocks.',
    icon: '⏱️',
    unlocked: true,
    unlockedDate: 'Oct 28, 2026'
  },
  {
    id: 'badge-4',
    title: 'Placement Century: 100 DSA Problems',
    description: 'Solve 100 problems covering Arrays, Two Pointers, Trees, and Dynamic Programming.',
    icon: '💻',
    unlocked: false,
    progress: 68
  },
  {
    id: 'badge-5',
    title: 'System Architect Pioneer',
    description: 'Design and deploy a full-stack project with live PostgreSQL database and Supabase Auth.',
    icon: '🚀',
    unlocked: true,
    unlockedDate: 'Nov 01, 2026'
  },
  {
    id: 'badge-6',
    title: 'Speed Revision Marathon',
    description: 'Complete 10 interactive practice quizzes with 85%+ aggregate accuracy.',
    icon: '⚡',
    unlocked: false,
    progress: 70
  }
];

export const LearningAnalyticsView: React.FC<LearningAnalyticsViewProps> = ({ user, setActiveTab }) => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'semester'>('week');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    resume: true,
    projects: true,
    github: true,
    dsa: false,
    aptitude: false
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalWeeklyHours = WEEKLY_STUDY_DAYS.reduce((sum, d) => sum + d.hours, 0);
  const maxDayHours = Math.max(...WEEKLY_STUDY_DAYS.map(d => d.hours));

  // Compute readiness score
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const readinessScore = 60 + Math.round((checkedCount / Object.keys(checklist).length) * 35);

  return (
    <div className="space-y-7 py-2 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-8 border border-indigo-900/40 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Student Learning Analytics & Performance
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Progress, Milestones & Career Readiness 📈
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track weekly study hours, analyze subject mastery distribution, unlock achievement badges, and measure your placement drive readiness.
            </p>
          </div>

          {/* Timeframe Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold shrink-0">
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                timeframe === 'week' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                timeframe === 'month' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Past Month
            </button>
            <button
              onClick={() => setTimeframe('semester')}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
                timeframe === 'semester' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Semester
            </button>
          </div>
        </div>

        {/* 4 Core Metric KPI Cards */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Study Hours Logged</span>
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-white">{totalWeeklyHours.toFixed(1)} hrs</div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
              <ArrowUpRight className="w-3 h-3" /> +3.5 hrs vs last week
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Active Study Streak</span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{user?.studyStreak || 5} Days</div>
            <div className="text-[11px] text-amber-300 font-semibold mt-1">
              🔥 Keep it going tomorrow!
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Quiz Accuracy Rate</span>
              <Award className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div className="text-2xl font-black text-white">88%</div>
            <div className="text-[11px] text-violet-300 font-semibold mt-1">
              Top 10% in CS Cohort
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Placement Readiness</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{readinessScore} / 100</div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">
              Tier-1 Corporate Ready
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly Chart & Subject Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left Column: Weekly Study Hours Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                Weekly Study Time Distribution
              </h3>
              <p className="text-xs text-slate-400">
                Daily hours logged through Pomodoro focus sessions and note revision
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              Avg: 3.1 hrs/day
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="pt-4 pb-2">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-800">
              {WEEKLY_STUDY_DAYS.map((d, idx) => {
                const heightPercent = (d.hours / maxDayHours) * 85;
                const isHigh = d.hours >= 3.5;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-950 text-indigo-300 font-bold px-1.5 py-0.5 rounded border border-slate-800 whitespace-nowrap">
                      {d.hours}h ({d.sessions} sessions)
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[42px] bg-slate-800/80 rounded-t-xl overflow-hidden flex flex-col justify-end transition-all group-hover:scale-105">
                      <div
                        className={`w-full transition-all duration-1000 ${
                          isHigh
                            ? 'bg-gradient-to-t from-indigo-600 to-violet-500'
                            : 'bg-gradient-to-t from-slate-700 to-indigo-500'
                        }`}
                        style={{ height: `${heightPercent}%`, minHeight: '8px' }}
                      ></div>
                    </div>

                    {/* Day label */}
                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-white transition-colors">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Standard Study Day
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span> Deep Work Sprint (3.5h+)
            </span>
            <button
              onClick={() => setActiveTab('planner')}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Open Focus Planner →
            </button>
          </div>
        </div>

        {/* Right Column: Subject Mastery Progress (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              Subject Mastery Index
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated across unit completion, test scores & hours
            </p>
          </div>

          <div className="space-y-4">
            {SKILL_DOMAINS.map((skill, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 truncate pr-2">{skill.subject}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400">{skill.hoursSpent}h</span>
                    <span className="font-bold text-white">{skill.masteryPercentage}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                    style={{ width: `${skill.masteryPercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('ai-study')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Take Practice Quiz to Boost Mastery
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Achievement Badges & Placement Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Achievements Showcase (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Gamified Badges & Milestones
              </h3>
              <p className="text-xs text-slate-400">
                Unlock badges as you hit deep study milestones and semester goals
              </p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              4 / 6 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ACHIEVEMENTS.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  badge.unlocked
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/30 border-slate-800/50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl p-2 rounded-xl bg-slate-800 border border-slate-700 shrink-0">
                    {badge.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{badge.title}</h4>
                      {badge.unlocked ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-amber-400 font-bold">{badge.progress}%</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                      {badge.description}
                    </p>
                    {badge.unlockedDate && (
                      <div className="text-[10px] text-indigo-400 font-semibold pt-1">
                        Unlocked on {badge.unlockedDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Readiness Checklist (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Placement Drive Checklist
              </h3>
              <p className="text-xs text-slate-400">
                Action items required to pass corporate & campus screening rounds
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => toggleCheck('resume')}
                className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <span className={checklist.resume ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                  1. ATS-Compliant 1-Page Resume Generated
                </span>
                {checklist.resume ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('projects')}
                className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <span className={checklist.projects ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                  2. At least 1 Full-Stack Project with Live Demo
                </span>
                {checklist.projects ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('github')}
                className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <span className={checklist.github ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                  3. Clean GitHub Profile & Commit Activity
                </span>
                {checklist.github ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('dsa')}
                className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <span className={checklist.dsa ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                  4. Top 50 LeetCode Medium Problems Solved
                </span>
                {checklist.dsa ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-400" />}
              </button>

              <button
                type="button"
                onClick={() => toggleCheck('aptitude')}
                className="w-full text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs transition-colors cursor-pointer"
              >
                <span className={checklist.aptitude ? 'text-slate-200 font-medium' : 'text-slate-400'}>
                  5. Quantitative Aptitude & Core CS Revisions
                </span>
                {checklist.aptitude ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => setActiveTab('builder')}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              Launch Portfolio Builder
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs transition-colors cursor-pointer"
            >
              View Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
