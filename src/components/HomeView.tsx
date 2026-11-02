import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Code2, 
  ExternalLink, 
  Github, 
  MapPin, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { JobListing, StudentProject, StudentProfile, ActiveTab } from '../types';

interface HomeViewProps {
  jobs: JobListing[];
  projects: StudentProject[];
  profile: StudentProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSearchQuery: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  jobs,
  projects,
  profile,
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
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white px-6 sm:px-12 py-16 sm:py-20 shadow-2xl border border-indigo-800/40">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-800/60 border border-indigo-700/60 text-xs font-semibold text-indigo-200">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
            🇮🇳 India's Dedicated Student Career & Portfolio Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Show Your Skills. <br />
            <span className="bg-gradient-to-r from-indigo-300 via-teal-300 to-white bg-clip-text text-transparent">
              Build Your Future.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Replace passive text resumes with clickable live demos, verified GitHub commits, and transparent fresher opportunities. Designed for engineering undergrads across India.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-xl">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search jobs by skill (e.g. React, Python, TypeScript, Node.js)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3 py-3 text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors shrink-0 cursor-pointer shadow-md shadow-indigo-300/30"
              >
                Search Jobs
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Popular:</span>
            {['React Fresher', 'TypeScript', 'Node.js', 'Python AI', 'Chennai', 'Remote'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleTagClick(chip)}
                className="bg-slate-800/80 hover:bg-slate-700 hover:text-white text-slate-300 px-3 py-1 rounded-full border border-slate-700/60 transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Pillars Teaser Bar */}
        <div className="mt-14 pt-8 border-t border-indigo-800/50 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3.5 bg-indigo-900/40 p-4 rounded-xl border border-indigo-800/30">
            <div className="p-2.5 bg-indigo-600/30 text-indigo-300 rounded-lg shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Verified Fresher Openings</h3>
              <p className="text-xs text-slate-300 mt-1">Real opportunities with INR stipends. 100% direct company portals, zero spam.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-indigo-900/40 p-4 rounded-xl border border-indigo-800/30">
            <div className="p-2.5 bg-teal-600/30 text-teal-300 rounded-lg shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Showcase Your Projects</h3>
              <p className="text-xs text-slate-300 mt-1">Stand out with working code, live demos, and verified GitHub commits.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 bg-indigo-900/40 p-4 rounded-xl border border-indigo-800/30">
            <div className="p-2.5 bg-amber-600/30 text-amber-300 rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Track Profile Strength</h3>
              <p className="text-xs text-slate-300 mt-1">Benchmark your technical profile readiness for engineering recruiter evaluations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metric Counters Banner */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">100%</div>
          <div className="text-xs font-semibold text-slate-600 mt-1">Verified Corporate Portals</div>
          <div className="text-[10px] text-slate-400 mt-0.5">No agency commissions</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-600">₹40,000+</div>
          <div className="text-xs font-semibold text-slate-600 mt-1">Average Intern Stipend</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Transparent compensation</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">Batch '25/'26</div>
          <div className="text-xs font-semibold text-slate-600 mt-1">Target Engineering Cohort</div>
          <div className="text-[10px] text-slate-400 mt-0.5">B.Tech / B.E. / MCA</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">PostgreSQL</div>
          <div className="text-xs font-semibold text-slate-600 mt-1">Supabase Real-Time Backend</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Offline Local Fallback</div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Briefcase className="w-4 h-4" /> Opportunities
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Verified Fresher & Internship Openings
            </h2>
            <p className="text-sm text-slate-500">
              Direct application links to official company careers portals with verified stipends.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 group cursor-pointer"
          >
            View all {jobs.length} jobs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                    {job.companyName}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-indigo-600 transition-colors">
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mt-2.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                    {job.workplaceType}
                  </span>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.requiredSkills.slice(0, 4).map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Compensation</span>
                  <span className="text-sm font-extrabold text-slate-900">{job.compensation}</span>
                </div>
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  Apply <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sridhar's Flagship Spotlight */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for Full Stack Opportunities (Batch 2026)
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Meet the Creator: Sridhar's Verified Portfolio
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              B.Tech Information Technology undergrad at <strong>Jaya Engineering College, Chennai</strong>. Specializing in high-performance React, Next.js 15, TypeScript, Prisma ORM, and Supabase. Built AU Study Hub and Nexora.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Supabase', 'Prisma'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-indigo-200 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              View Full Portfolio & Resume <ArrowRight className="w-4 h-4" />
            </button>
            
            <div className="flex gap-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-[#0a66c2] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Student Projects Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider">
              <Code2 className="w-4 h-4" /> Proof-of-Work
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Student Mini-Project Showcase
            </h2>
            <p className="text-sm text-slate-500">
              Working software built by engineering students — inspect code repositories and launch live interactive demos.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('projects')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 group cursor-pointer"
          >
            Explore all {projects.length} projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div 
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    By {proj.authorName}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg leading-snug">
                  {proj.title}
                </h3>
                
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {proj.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
                <a
                  href={proj.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
                >
                  Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anti-Spam & Recruiter Mission Callout */}
      <section className="bg-slate-100 rounded-3xl p-8 border border-slate-200/80">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex p-3 bg-indigo-100 text-indigo-700 rounded-2xl mb-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Why Nexora Works for Students & Recruiters
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Standard job boards are filled with third-party placement agencies charging ₹20,000 upfront fees. Nexora exclusively publishes verified corporate portals and highlights actual GitHub proof-of-work so students get evaluated on merit.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
            >
              Browse Fresher Jobs
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="px-5 py-2.5 rounded-xl bg-white text-slate-800 border border-slate-300 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Inspect Sridhar's Architecture
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
