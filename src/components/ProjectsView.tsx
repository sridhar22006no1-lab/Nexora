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
  CheckCircle2
} from 'lucide-react';
import { StudentProject } from '../types';

interface ProjectsViewProps {
  projects: StudentProject[];
  onOpenAddProjectModal: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onOpenAddProjectModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [starredIds, setStarredIds] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Web Development',
    'AI & ML',
    'UI/UX Design',
    'PWA & Algorithms',
    'Cloud & DevOps'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCat =
        selectedCategory === 'All' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.authorName.toLowerCase().includes(q) ||
        project.authorCollege.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const toggleStar = (id: string) => {
    setStarredIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-bold text-teal-700">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Proof-of-Work Showcase
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Mini-Project Showcase
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Browse working software built by engineering undergrads. Inspect GitHub commit discipline, code organization, and launch live interactive demos.
          </p>
        </div>

        <button
          onClick={onOpenAddProjectModal}
          className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-200 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Your Project
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No projects found in this category</h3>
          <p className="text-xs text-slate-500">
            Be the first to publish a verified student project in this category!
          </p>
          <button
            onClick={onOpenAddProjectModal}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            + Add Your Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isStarred = Boolean(starredIds[project.id]);
            const starsCount = (project.stars || 0) + (isStarred ? 1 : 0);

            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Stars Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100 uppercase tracking-wider">
                      {project.category}
                    </span>

                    <button
                      onClick={() => toggleStar(project.id)}
                      className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg border transition-colors cursor-pointer ${
                        isStarred
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-700'
                      }`}
                      title="Star this project"
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-500' : ''}`} />
                      <span className="font-semibold">{starsCount}</span>
                    </button>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Author attribution */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div>
                      By <span className="font-semibold text-slate-800">{project.authorName}</span>
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
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub Code
                  </a>

                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
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
