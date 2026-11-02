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
    <div className="space-y-12 py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Engineering Student Career Playbook
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            How to Stand Out as a Tech Fresher in 2026
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            In today's competitive tech market, 1-page PDF resumes alone rarely get interviews. Recruiters and engineering managers look for <span className="text-white font-bold">verifiable proof-of-work</span>, clean Git hygiene, and deployed applications.
          </p>
        </div>
      </div>

      {/* Comparison: Generic Resume vs Proof-of-Work Portfolio */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-slate-900">
            What Tech Recruiters Look For: The Proof-of-Work Shift
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare the difference between typical un-shortlisted applications and top 5% candidate portfolios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What Doesn't Work */}
          <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <XCircle className="w-5 h-5 shrink-0" />
              Common Mistakes (High Rejection Rate)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
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
          <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              The Nexora Standard (Top 5% Shortlist)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span><strong>Real-World Utility:</strong> Projects that solve authentic student or local business problems (e.g. AU Study Hub, Nexora).</span>
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
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-xl">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">GitHub Profile Optimization</h3>
              <p className="text-xs text-slate-500">Your public developer footprint</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Pin Your Top 2-3 Repos:</strong> Ensure your best full-stack project (like AU Study Hub or Nexora) is pinned with description and tags.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Add a Profile README:</strong> Create a repository named after your username (e.g., `sridhar22006no1-lab`) with tech badges and contact info.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Write Meaningful Commits:</strong> Use prefixes like `feat:`, `fix:`, `refactor:`, `docs:` instead of vague commit messages.</span>
            </div>
          </div>
        </div>

        {/* LinkedIn Checklist */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0a66c2] text-white rounded-xl">
              <Linkedin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">LinkedIn Profile Optimization</h3>
              <p className="text-xs text-slate-500">Recruiter search indexing</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0a66c2] shrink-0 mt-0.5" />
              <span><strong>Explicit Headline:</strong> Don't just say "Student at XYZ College". Say: <em>"Aspiring Full-Stack Developer | React, Next.js, TypeScript, Supabase | B.Tech IT '26"</em>.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0a66c2] shrink-0 mt-0.5" />
              <span><strong>Featured Section:</strong> Add clickable media links directly to your Nexora portfolio and live project demos.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0a66c2] shrink-0 mt-0.5" />
              <span><strong>Turn on "Open to Work":</strong> Configure visibility to "Recruiters only" or public banner with target titles (Frontend Engineer, Software Development Trainee).</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA To Explore Jobs */}
      <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-indigo-950">
            Ready to test your readiness against live openings?
          </h3>
          <p className="text-xs text-indigo-700">
            Browse verified opportunities for Batch 2025 - 2027 with explicit INR stipends.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('jobs')}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
        >
          Explore Verified Openings <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
