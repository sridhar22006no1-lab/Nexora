import React, { useState, useMemo } from 'react';
import { 
  Code2, 
  Github, 
  ExternalLink, 
  Plus, 
  Search, 
  Sparkles, 
  Star, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Layers,
  GraduationCap,
  Users
} from 'lucide-react';
import { StudentProject } from '../types';

interface ProjectsViewProps {
  projects: StudentProject[];
  onOpenAddProjectModal: () => void;
}

const STARRED_STORAGE_KEY = 'nexora_starred_projects';

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onOpenAddProjectModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'stars' | 'latest' | 'title'>('stars');
  
  const [starredIds, setStarredIds] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STARRED_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  const categories = [
    'All',
    'Web Development',
    'AI & ML',
    'UI/UX Design',
    'PWA & Mobile',
    'Cloud & DevOps'
  ];

  const popularTechs = [
    'All',
    'React',
    'TypeScript',
    'Next.js',
    'Python',
    'Node.js',
    'Tailwind CSS',
    'PostgreSQL'
  ];

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

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCat =
        selectedCategory === 'All' || project.category === selectedCategory;

      const matchesTech =
        selectedTech === 'All' ||
        project.technologies.some(t => t.toLowerCase().includes(selectedTech.toLowerCase()));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.authorName.toLowerCase().includes(q) ||
        project.authorCollege.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesTech && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'stars') {
        const aStars = (a.stars || 0) + (starredIds[a.id] ? 1 : 0);
        const bStars = (b.stars || 0) + (starredIds[b.id] ? 1 : 0);
        return bStars - aStars;
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [projects, selectedCategory, selectedTech, searchQuery, sortBy, starredIds]);

  return (
    <div className="space-y-8 py-2 animate-fadeIn">
      {/* Top SaaS Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 p-6 sm:p-8 border border-indigo-900/40 shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Verified Proof-of-Work Community
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Student Project Community & Showcase 🚀
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore working software, inspect clean GitHub architecture, test interactive web demos, and showcase your own semester capstone builds to technical recruiters.
            </p>
          </div>

          <button
            onClick={onOpenAddProjectModal}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer shrink-0 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" /> Publish Your Project
          </button>
        </div>

        {/* Quick Stats Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Total Projects: <strong className="text-white font-bold">{projects.length}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
            <Users className="w-3.5 h-3.5 text-violet-400" />
            <span>Colleges Represented: <strong className="text-white font-bold">18+</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/60 px-3.5 py-1.5 rounded-xl border border-slate-700/60 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Verified GitHub Repos</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 text-slate-100 placeholder-slate-400 border border-slate-800 text-xs focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 text-slate-200 text-xs py-2 px-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="stars">Most Starred</option>
              <option value="latest">Latest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Tech Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-slate-400 text-[11px] font-semibold shrink-0 mr-1">
            Tech Filter:
          </span>
          {popularTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 cursor-pointer ${
                selectedTech === tech
                  ? 'bg-violet-600 text-white font-bold'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto border border-indigo-500/20">
            <Code2 className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-white text-base">No projects found in this view</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your category or technology filter, or be the first to publish a verified student build!
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedTech('All'); setSearchQuery(''); }}
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
                className="bg-slate-900/90 dark:bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Category & Star Counter */}
                  <div className="flex items-center justify-between mb-3">
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

                  {/* Title & Tagline */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Author attribution */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="font-semibold text-slate-200">{project.authorName}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[150px]" title={project.authorCollege}>
                      {project.authorCollege}
                    </div>
                  </div>

                  {/* Technologies tags */}
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

                {/* Footer action buttons */}
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
