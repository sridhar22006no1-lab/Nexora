import React from 'react';
import { ShieldCheck, Heart, Sparkles, Layout, Briefcase, Code2 } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg text-white font-black flex items-center justify-center">
                N
              </div>
              <span className="font-extrabold text-base text-white">Nexora</span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                Student Career Platform
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Nexora connects ambitious engineering students with high-growth technology careers through verified proof-of-work, open codebases, and transparent job discovery across India.
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              Optimized for mobile phones, tablets, and desktop browsers.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Verified Fresher Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Project Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('builder')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                >
                  Free Portfolio Builder →
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('career-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resume & Career Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Transparency & Anti-Spam Pledge */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Transparency Pledge
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Zero Fake Consultancies
              </div>
              <p className="text-slate-400 leading-relaxed">
                All vacancy links route directly to official company career systems (Zomato, Zoho, Swiggy, Freshworks, Razorpay) with verified stipends.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 Nexora Platform. Built with modern React, TypeScript, Tailwind & Supabase.</p>
          <p>Public Academic & Career Resource for Tech Freshers</p>
        </div>
      </div>
    </footer>
  );
};
