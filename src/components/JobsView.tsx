import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Filter, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw,
  Building,
  GraduationCap,
  Share2
} from 'lucide-react';
import { JobListing } from '../types';

interface JobsViewProps {
  jobs: JobListing[];
  initialSearchQuery?: string;
}

export const JobsView: React.FC<JobsViewProps> = ({ jobs, initialSearchQuery = '' }) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const [workplace, setWorkplace] = useState<string>('all');
  const [locationHub, setLocationHub] = useState<string>('all');
  const [employmentType, setEmploymentType] = useState<string>('all');
  const [batch, setBatch] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Multi-parameter Job Filtering Algorithm
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== 'published') return false;

      const q = query.toLowerCase().trim();
      const matchesText =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(q));

      const matchesWorkplace = workplace === 'all' || job.workplaceType === workplace;
      const matchesLocation = locationHub === 'all' || job.location.toLowerCase().includes(locationHub.toLowerCase());
      const matchesType = employmentType === 'all' || job.employmentType === employmentType;
      const matchesBatch = batch === 'all' || job.graduationBatch.includes(batch);

      return matchesText && matchesWorkplace && matchesLocation && matchesType && matchesBatch;
    });
  }, [jobs, query, workplace, locationHub, employmentType, batch]);

  const handleResetFilters = () => {
    setQuery('');
    setWorkplace('all');
    setLocationHub('all');
    setEmploymentType('all');
    setBatch('all');
  };

  const handleShare = (job: JobListing) => {
    navigator.clipboard.writeText(`${window.location.origin}#jobs?id=${job.id}`);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 py-2 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-8 border border-indigo-900/40 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            100% Anti-Spam Guarantee • Direct Corporate Careers Portals
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Verified Fresher & Intern Vacancies 💼
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All listings are verified against authentic corporate career portals with explicit verification timestamps. Zero third-party consultancies or registration fees.
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="mt-7 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by role, company name, skill (e.g. React, Node.js, SQL), or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {/* Workplace Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Workplace Mode
              </label>
              <select
                value={workplace}
                onChange={(e) => setWorkplace(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">Any Mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Location Hub */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Location Hub
              </label>
              <select
                value={locationHub}
                onChange={(e) => setLocationHub(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Locations</option>
                <option value="chennai">Chennai</option>
                <option value="bengaluru">Bengaluru</option>
                <option value="gurugram">Gurugram</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="coimbatore">Coimbatore</option>
                <option value="remote">Remote India</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Employment Type
              </label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time Fresher</option>
              </select>
            </div>

            {/* Graduation Batch */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Graduation Batch
              </label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Batches</option>
                <option value="2025">Batch 2025</option>
                <option value="2026">Batch 2026</option>
                <option value="2027">Batch 2027</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators & Reset */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div>
              Showing <span className="font-bold text-white">{filteredJobs.length}</span> of {jobs.length} verified listings
            </div>
            {(query || workplace !== 'all' || locationHub !== 'all' || employmentType !== 'all' || batch !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Listing Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/20">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-white text-lg">No matching job openings found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search keywords or clearing filters to view all fresher openings.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-colors cursor-pointer shadow-md"
          >
            Show All Listings
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-slate-900/90 dark:bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:-translate-y-0.5"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                    {job.companyName}
                  </span>
                  
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified ({job.verifiedDate})
                    </span>
                  )}

                  <span className="text-[11px] font-medium text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50">
                    Batch: {job.graduationBatch.join(', ')}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {job.title}
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-violet-400" /> {job.workplaceType} • {job.employmentType}
                  </span>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {job.requiredSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setQuery(skill)}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800 hover:bg-indigo-600/30 hover:text-indigo-300 text-slate-300 text-[11px] font-medium border border-slate-700/50 transition-colors cursor-pointer"
                      title={`Filter by ${skill}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compensation & Action CTA */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 gap-4 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    {job.employmentType === 'Internship' ? 'Monthly Stipend' : 'Annual CTC'}
                  </span>
                  <span className="text-base sm:text-lg font-black text-white">
                    {job.compensation}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(job)}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy shareable link"
                  >
                    {copiedId === job.id ? (
                      <span className="text-[10px] text-emerald-400 font-bold px-1">Copied!</span>
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
