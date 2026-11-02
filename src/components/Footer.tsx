import React from 'react';
import { Github, Linkedin, Mail, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg text-white font-bold flex items-center justify-center">
                N
              </div>
              <span className="font-extrabold text-lg text-white">Nexora</span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                Student Career Platform
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Nexora bridges the gap between ambitious engineering students and authentic tech careers. We emphasize 
              <span className="text-white font-medium"> verifiable proof-of-work</span> over paper resumes — showcasing working software, real git commits, and transparent fresher opportunities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/sridhar22006no1-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
                title="Sridhar's GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sridhar-it"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#0a66c2] hover:text-white flex items-center justify-center transition-colors"
                title="Sridhar's LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:sridhar22006no1@gmail.com"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
                title="Contact Sridhar"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Platform Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="hover:text-white transition-colors"
                >
                  Verified Fresher Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className="hover:text-white transition-colors"
                >
                  Student Project Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('career-guide')}
                  className="hover:text-white transition-colors"
                >
                  Resume & Profile Strength Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Sridhar's Developer Portfolio →
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & College Attribution */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Anti-Spam Guarantee
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Zero Fake Consultancies
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Every job link routes directly to authentic corporate career portals (Zomato, Zoho, Swiggy, Freshworks) with zero commission or middlemen.
              </p>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">
              Developed by <span className="text-slate-300 font-medium">Sridhar</span> • Dept of IT, Jaya Engineering College, Chennai (Batch 2026).
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Nexora Platform. Built with React 18, TypeScript, Tailwind & Supabase.</p>
          <div className="flex items-center gap-2">
            <span>Designed for Indian Engineering Undergrads</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
