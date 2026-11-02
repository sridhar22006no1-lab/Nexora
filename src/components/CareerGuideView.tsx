import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Github, 
  Linkedin, 
  Lightbulb, 
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ActiveTab } from '../types';

interface CareerGuideViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const CareerGuideView: React.FC<CareerGuideViewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-10 py-2 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-6 sm:p-10 text-white border border-indigo-900/40 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Engineering Student Career Playbook
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            How to Stand Out as a Tech Fresher in 2026 🚀
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            In today's competitive tech market, 1-page PDF resumes alone rarely get interviews. Recruiters and engineering managers look for <span className="text-white font-bold">verifiable proof-of-work</span>, clean Git hygiene, and deployed applications.
          </p>
        </div>
      </div>

      {/* Comparison: Generic Resume vs Proof-of-Work Portfolio */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            What Tech Recruiters Look For: The Proof-of-Work Shift
          </h2>
          <p className="text-xs text-slate-400">
            Compare the difference between typical un-shortlisted applications and top 5% candidate portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Doesn't Work */}
          <div className="bg-rose-950/20 rounded-2xl p-6 border border-rose-900/40 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
              <XCircle className="w-5 h-5 shrink-0 text-rose-500" />
              Common Mistakes (High Rejection Rate)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Tutorial clones (e.g., standard To-Do apps, clone of Netflix without backend or unique logic).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>GitHub repositories with only 1 commit ("Initial commit") and empty READMEs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Listing 20 programming languages on your resume without building any substantial project in them.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Applying through unverified consultancies that ask for security deposits.</span>
              </li>
            </ul>
          </div>

          {/* What Actually Gets Interviews */}
          <div className="bg-emerald-950/20 rounded-2xl p-6 border border-emerald-900/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              The Nexora Standard (Top 5% Shortlist)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Real-World Utility:</strong> Projects that solve authentic student or local business problems (e.g. Nexora Study Hub).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Live Deployments:</strong> Every project has a working, high-speed Vercel/Netlify demo URL that loads in under 2 seconds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Git Discipline:</strong> Clear feature branches, atomic commit messages, and a comprehensive `README.md` with system architecture diagrams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Modern Stack:</strong> Strong mastery of TypeScript, React/Next.js, and serverless backends like Supabase or PostgreSQL with Prisma.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* GitHub & LinkedIn Optimization Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GitHub Checklist */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-white rounded-xl border border-slate-700">
              <Github className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">GitHub Profile Optimization</h3>
              <p className="text-xs text-slate-400">Your public developer footprint</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Pin Your Top 2-3 Repos:</strong> Ensure your best full-stack project is pinned with description, tags, and live demo link.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Add a Profile README:</strong> Create a repository named after your GitHub username with tech badges and contact info.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Write Meaningful Commits:</strong> Use prefixes like `feat:`, `fix:`, `refactor:`, `docs:` instead of vague commit messages.</span>
            </div>
          </div>
        </div>

        {/* LinkedIn Checklist */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-600/30">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">LinkedIn Profile Optimization</h3>
              <p className="text-xs text-slate-400">Recruiter search indexing</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Explicit Headline:</strong> Don't just say "Student at XYZ College". Say: <em>"Aspiring Full-Stack Developer | React, TypeScript, Supabase | B.Tech '26"</em>.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Featured Section:</strong> Add clickable media links directly to your Nexora portfolio and live project demos.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Turn on "Open to Work":</strong> Configure visibility to "Recruiters only" or public banner with target titles (Frontend Engineer, Software Development Trainee).</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA To Explore Jobs & Portfolio */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 rounded-3xl p-8 border border-indigo-900/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-white">
            Ready to test your readiness against live openings?
          </h3>
          <p className="text-xs text-slate-300">
            Browse verified opportunities for Batch 2025 - 2027 with explicit INR stipends.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('builder')}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Build ATS Portfolio
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Explore Verified Openings <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
