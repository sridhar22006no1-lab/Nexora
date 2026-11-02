import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Code2, 
  MapPin, 
  ShieldCheck, 
  Award,
  ArrowUpRight,
  Layout,
  Smartphone,
  Zap,
  Users
} from 'lucide-react';
import { JobListing, StudentProject, ActiveTab } from '../types';

interface HomeViewProps {
  jobs: JobListing[];
  projects: StudentProject[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSearchQuery: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  jobs,
  projects,
  setActiveTab,
  onSelectSearchQuery,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectSearchQuery(searchInput.trim());
      setActiveTab('jobs');
    }
  };

  const handleTagClick = (tag: string) => {
    onSelectSearchQuery(tag);
    setActiveTab('jobs');
  };

  const featuredJobs = jobs.slice(0, 3);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <div className="space-y-12 sm:space-y-16 py-2">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white px-5 sm:px-12 py-14 sm:py-20 shadow-2xl border border-indigo-800/40">
        <div className="relative max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-700/60 text-xs font-semibold text-indigo-200">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
            🇮🇳 India's Student Career & Developer Portfolio Platform
          </div>

          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-[1.15]">
            Show Your Skills. <br />
            <span className="bg-gradient-to-r from-indigo-300 via-teal-300 to-white bg-clip-text text-transparent">
              Land Your Dream Role.
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Replace passive paper resumes with real proof-of-work. Generate your shareable developer portfolio, showcase working software, and discover verified fresher roles from top tech teams across India.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-xl">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search jobs by skill (e.g. React, Python, Node.js, Cloud)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors shrink-0 cursor-pointer shadow-md"
              >
                Find Jobs
              </button>
            </div>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs text-slate-400">
            <span className="text-slate-500 font-medium hidden sm:inline">Popular:</span>
            {['React Fresher', 'TypeScript', 'Node.js', 'Python AI', 'Chennai', 'Bengaluru', 'Remote'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleTagClick(chip)}
                className="bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/60 transition-colors cursor-pointer text-[11px]"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-12 pt-8 border-t border-indigo-800/50 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="flex items-start gap-3 bg-indigo-900/40 p-4 rounded-2xl border border-indigo-800/30">
            <div className="p-2 bg-indigo-600/30 text-indigo-300 rounded-xl shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Verified Fresher Openings</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">100% direct official portals. Transparent stipends, zero spam.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-indigo-900/40 p-4 rounded-2xl border border-indigo-800/30">
            <div className="p-2 bg-teal-600/30 text-teal-300 rounded-xl shrink-0">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Free Portfolio Builder</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Generate your mobile-friendly developer portfolio in 2 minutes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-indigo-900/40 p-4 rounded-2xl border border-indigo-800/30">
            <div className="p-2 bg-amber-600/30 text-amber-300 rounded-xl shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-white">Proof-of-Work Showcase</h3>
              <p className="text-[11px] text-slate-300 mt-0.5">Showcase real code repositories and live interactive web demos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" /> Curated Opportunities
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Verified Fresher & Internship Openings
            </h2>
            <p className="text-xs text-slate-500">
              Direct application links to official company careers portals with verified stipends.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            View all {jobs.length} jobs <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                    {job.companyName}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> {job.location}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">
                    {job.workplaceType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {job.requiredSkills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Compensation</span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">{job.compensation}</span>
                </div>
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  Apply <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Generator CTA Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-indigo-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Layout className="w-3.5 h-3.5" /> Instant & Mobile Optimized
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            Build Your Public Developer Portfolio
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Need a clean portfolio link to send to recruiters or attach to your job applications? Use Nexora's free portfolio generator to showcase your projects, skills, and code proof in real-time.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('builder')}
          className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer shrink-0"
        >
          Open Portfolio Generator <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Featured Community Projects */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-teal-600 font-bold text-xs uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" /> Proof-of-Work
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Student Mini-Project Showcase
            </h2>
            <p className="text-xs text-slate-500">
              Real projects built by engineering students — inspect code repositories and launch live interactive demos.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-800 cursor-pointer"
          >
            Explore all {projects.length} projects <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 uppercase">
                    {proj.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {proj.authorCollege}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {proj.title}
                </h3>
                
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {proj.tagline}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {proj.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-700 hover:text-slate-900"
                >
                  GitHub Code
                </a>
                <a
                  href={proj.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-0.5"
                >
                  Live Demo <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
