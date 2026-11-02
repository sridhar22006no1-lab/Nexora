import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Github, 
  Plus, 
  Search, 
  Sparkles, 
  Star, 
  ArrowUpRight,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  RotateCcw,
  CheckCircle2,
  GraduationCap,
  Check
} from 'lucide-react';
import { StudentProject } from '../types';

interface ProjectsViewProps {
  projects: StudentProject[];
  onOpenAddProjectModal: () => void;
}

const STARRED_STORAGE_KEY = 'nexora_starred_projects';

const CATEGORIES = [
  'All Categories',
  'Web Development',
  'AI & ML',
  'UI/UX Design',
  'PWA & Mobile',
  'Cloud & DevOps'
];

const FILTER_TECH_OPTIONS = [
  'React',
  'TypeScript',
  'Next.js',
  'Python',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Supabase',
  'Docker',
  'Prisma ORM'
];

type SortOption = 'popular' | 'latest' | 'starred';

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onOpenAddProjectModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  // Star upvote persistence
  const [starredIds, setStarredIds] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STARRED_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  const toggleStar = (id: string) => {
    setStarredIds(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const toggleTechFilter = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedTechs([]);
    setSortBy('popular');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All Categories' ? 1 : 0) + 
    selectedTechs.length + 
    (searchQuery.trim() ? 1 : 0);

  // Search & Filter Algorithm
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category Filter
      const matchesCategory =
        selectedCategory === 'All Categories' || project.category === selectedCategory;

      // Technology Filters (Multi-select: matches any selected tech)
      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.some(tech => 
          project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
        );

      // Search Query Filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.authorName.toLowerCase().includes(q) ||
        project.authorCollege.toLowerCase().includes(q) ||
        project.technologies.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesTech && matchesSearch;
    }).sort((a, b) => {
      const aStars = (a.stars || 1) + (starredIds[a.id] ? 1 : 0);
      const bStars = (b.stars || 1) + (starredIds[b.id] ? 1 : 0);

      if (sortBy === 'popular') {
        const aScore = aStars + (a.featured ? 5 : 0);
        const bScore = bStars + (b.featured ? 5 : 0);
        return bScore - aScore;
      }
      if (sortBy === 'starred') {
        return bStars - aStars;
      }
      // 'latest'
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [projects, selectedCategory, selectedTechs, searchQuery, sortBy, starredIds]);

  return (
    <div className="space-y-6 py-2 animate-fadeIn">
      {/* Top Header Row: Clean & Professional */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Verified Student Proof-of-Work
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore Student Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Browse verified software, open-source codebases, and live interactive demos built by engineering undergrads.
          </p>
        </div>

        <button
          onClick={onOpenAddProjectModal}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Publish Your Project
        </button>
      </div>

      {/* Prominent LinkedIn / Naukri Inspired Search & Filter Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Main Search Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Prominent Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by project name, tech stack (e.g. React, Python), keywords, or developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 pl-10 pr-9 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Controls Row */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs py-2.5 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer flex-1 sm:flex-none"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sorting Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-slate-950 text-slate-200 text-xs py-2.5 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer flex-1 sm:flex-none"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="latest">Sort: Recently Added</option>
              <option value="starred">Sort: Most Starred</option>
            </select>

            {/* Collapsible More Filters Button */}
            <button
              type="button"
              onClick={() => setIsMoreFiltersOpen(!isMoreFiltersOpen)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer shrink-0 ${
                isMoreFiltersOpen || selectedTechs.length > 0
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>More Filters</span>
              {selectedTechs.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {selectedTechs.length}
                </span>
              )}
              {isMoreFiltersOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters Section */}
        {isMoreFiltersOpen && (
          <div className="pt-4 border-t border-slate-800/80 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                Filter by Technologies & Libraries:
              </span>
              {selectedTechs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTechs([])}
                  className="text-[11px] text-slate-400 hover:text-indigo-300 cursor-pointer"
                >
                  Clear Tech Filters
                </button>
              )}
            </div>

            {/* Clean Tech Pills Grid */}
            <div className="flex flex-wrap gap-2">
              {FILTER_TECH_OPTIONS.map(tech => {
                const isSelected = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTechFilter(tech)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                        : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                    <span>{tech}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Filters Pill Bar (When filters are applied) */}
        {activeFiltersCount > 0 && (
          <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Active Filters:</span>
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-200 text-[11px] border border-slate-700">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-rose-400 cursor-pointer ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'All Categories' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-[11px] border border-indigo-500/30">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All Categories')} className="hover:text-rose-400 cursor-pointer ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedTechs.map(tech => (
              <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-violet-500/20 text-violet-300 text-[11px] border border-violet-500/30">
                {tech}
                <button onClick={() => toggleTechFilter(tech)} className="hover:text-rose-400 cursor-pointer ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <button
              onClick={resetAllFilters}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold ml-auto flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>
        )}
      </div>

      {/* Discovery Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <strong className="text-white font-bold">{filteredProjects.length}</strong> of {projects.length} verified projects
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Verified Deployments</span>
        </div>
      </div>

      {/* Project Cards Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/20">
            <Code2 className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-white text-base">No matching projects found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query, clearing filters, or publish a new student project.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-750 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenAddProjectModal}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-colors cursor-pointer shadow-md"
            >
              + Publish Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isStarred = Boolean(starredIds[project.id]);
            const starsCount = (project.stars || 1) + (isStarred ? 1 : 0);

            return (
              <div
                key={project.id}
                className="bg-slate-900/90 dark:bg-slate-900 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Category Pill & Upvote Button */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase tracking-wider">
                      {project.category}
                    </span>

                    <button
                      onClick={() => toggleStar(project.id)}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        isStarred
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-white'
                      }`}
                      title={isStarred ? 'Unstar project' : 'Star project'}
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                      <span className="font-bold">{starsCount}</span>
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  {/* Short Description */}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Developer & College Attribution */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="font-semibold text-slate-200 truncate">{project.authorName}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]" title={project.authorCollege}>
                      {project.authorCollege}
                    </div>
                  </div>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-400" /> GitHub Repo
                  </a>

                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
