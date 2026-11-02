import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Edit3, 
  Share2, 
  Download, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Plus, 
  Trash2, 
  GraduationCap, 
  MapPin, 
  Award,
  Layers,
  ArrowUpRight,
  Save,
  Copy,
  Smartphone
} from 'lucide-react';
import { PortfolioData } from '../types';
import { samplePortfolios } from '../lib/mockData';

export const PortfolioBuilderView: React.FC = () => {
  const [mobileMode, setMobileMode] = useState<'edit' | 'preview'>('preview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // State for user's portfolio data
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('nexora_user_portfolio');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return samplePortfolios[0];
  });

  const [skillInput, setSkillInput] = useState('');

  // Calculate dynamic recruiter readiness score
  const calculateStrength = () => {
    let score = 20; // base score
    if (portfolio.fullName.trim()) score += 15;
    if (portfolio.headline.trim()) score += 15;
    if (portfolio.institution.trim()) score += 10;
    if (portfolio.skills.length >= 4) score += 15;
    if (portfolio.projects.length >= 1) score += 15;
    if (portfolio.githubUrl.trim() || portfolio.linkedinUrl.trim()) score += 10;
    return Math.min(score, 100);
  };

  const strength = calculateStrength();

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (!skillInput.trim()) return;

    if (!portfolio.skills.includes(skillInput.trim())) {
      setPortfolio({
        ...portfolio,
        skills: [...portfolio.skills, skillInput.trim()]
      });
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setPortfolio({
      ...portfolio,
      skills: portfolio.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleAddProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          title: 'New Showcase Project',
          description: 'A brief 1-2 sentence description of the architecture and problem solved.',
          tech: ['React', 'TypeScript', 'Tailwind'],
          github: 'https://github.com',
          demo: 'https://demo.app'
        }
      ]
    });
  };

  const handleRemoveProject = (index: number) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((_, i) => i !== index)
    });
  };

  const handleProjectChange = (index: number, field: string, value: any) => {
    const updated = [...portfolio.projects];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolio({ ...portfolio, projects: updated });
  };

  const handleSave = () => {
    try {
      localStorage.setItem('nexora_user_portfolio', JSON.stringify(portfolio));
      setSavedStatus('Portfolio saved successfully!');
      setTimeout(() => setSavedStatus(null), 3000);
    } catch (e) {
      setSavedStatus('Saved locally!');
    }
  };

  const handleCopyShareLink = () => {
    const slug = portfolio.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const shareUrl = `${window.location.origin}#portfolio?u=${slug || 'developer'}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const loadPreset = (preset: PortfolioData) => {
    setPortfolio(preset);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" />
            Nexora Student Portfolio Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Public Developer Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Generate an interactive, mobile-optimized proof-of-work portfolio in minutes. Showcase your working software, GitHub repositories, and live demos directly to tech recruiters.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-500" />
            {savedStatus ? 'Saved!' : 'Save Portfolio'}
          </button>

          <button
            onClick={handleCopyShareLink}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            {copiedLink ? 'Link Copied!' : 'Copy Shareable Link'}
          </button>
        </div>
      </div>

      {/* Preset Switcher & Mobile Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="text-slate-500 font-bold px-2">Sample Templates:</span>
          {samplePortfolios.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => loadPreset(preset)}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-700 hover:text-indigo-600 font-semibold border border-slate-200 text-xs shadow-2xs transition-colors cursor-pointer"
            >
              Preset {idx + 1}: {preset.fullName}
            </button>
          ))}
        </div>

        {/* Mobile View Toggle */}
        <div className="flex sm:hidden items-center p-1 bg-white rounded-xl border border-slate-200 w-full justify-center">
          <button
            onClick={() => setMobileMode('edit')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
              mobileMode === 'edit' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Form
          </button>
          <button
            onClick={() => setMobileMode('preview')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
              mobileMode === 'preview' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Live Preview
          </button>
        </div>
      </div>

      {/* Split Grid: Editor (Left) & Real-time Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: EDIT FORM */}
        <div className={`lg:col-span-5 space-y-6 ${mobileMode === 'preview' ? 'hidden sm:block' : 'block'}`}>
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-600" /> Portfolio Details
              </h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                Live Sync
              </span>
            </div>

            {/* Basic Info */}
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Arjun Sharma"
                  value={portfolio.fullName}
                  onChange={(e) => setPortfolio({ ...portfolio, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Professional Headline / Role *</label>
                <input
                  type="text"
                  placeholder="e.g. Full-Stack Developer & Cloud Undergrad"
                  value={portfolio.headline}
                  onChange={(e) => setPortfolio({ ...portfolio, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree / Branch</label>
                  <input
                    type="text"
                    placeholder="B.Tech Computer Science"
                    value={portfolio.degree}
                    onChange={(e) => setPortfolio({ ...portfolio, degree: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Graduation Batch</label>
                  <input
                    type="number"
                    placeholder="2026"
                    value={portfolio.graduationYear}
                    onChange={(e) => setPortfolio({ ...portfolio, graduationYear: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">College / University</label>
                <input
                  type="text"
                  placeholder="e.g. National Institute of Technology"
                  value={portfolio.institution}
                  onChange={(e) => setPortfolio({ ...portfolio, institution: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, Tamil Nadu, India"
                  value={portfolio.location}
                  onChange={(e) => setPortfolio({ ...portfolio, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">About Me (Bio)</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of your technical focus and engineering passion..."
                  value={portfolio.bio}
                  onChange={(e) => setPortfolio({ ...portfolio, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Skills Tag Input */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Technical Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type skill & press Enter (e.g. React, Next.js)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {portfolio.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-[11px] flex items-center gap-1 border border-indigo-100"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="text-indigo-400 hover:text-indigo-700 cursor-pointer ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Social URLs */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={portfolio.githubUrl}
                    onChange={(e) => setPortfolio({ ...portfolio, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={portfolio.linkedinUrl}
                    onChange={(e) => setPortfolio({ ...portfolio, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Projects Editor */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Showcase Projects ({portfolio.projects.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              <div className="space-y-3">
                {portfolio.projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs relative">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(idx)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="Remove project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div>
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={proj.title}
                        onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                        className="w-full font-bold text-slate-900 bg-transparent border-b border-slate-200 focus:outline-none pb-1"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={2}
                        placeholder="Description..."
                        value={proj.description}
                        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                        className="w-full text-slate-600 bg-transparent border-b border-slate-200 focus:outline-none resize-none text-[11px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <input
                        type="url"
                        placeholder="GitHub URL"
                        value={proj.github}
                        onChange={(e) => handleProjectChange(idx, 'github', e.target.value)}
                        className="w-full px-2 py-1 bg-white rounded border border-slate-200"
                      />
                      <input
                        type="url"
                        placeholder="Demo URL"
                        value={proj.demo}
                        onChange={(e) => handleProjectChange(idx, 'demo', e.target.value)}
                        className="w-full px-2 py-1 bg-white rounded border border-slate-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME PUBLIC PORTFOLIO PREVIEW */}
        <div className={`lg:col-span-7 space-y-6 ${mobileMode === 'edit' ? 'hidden sm:block' : 'block'}`}>
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
            {/* Live Preview Top Bar */}
            <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-slate-300">Public Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline">Mobile & Desktop Ready</span>
                <button
                  onClick={handleCopyShareLink}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3 h-3" /> Share
                </button>
              </div>
            </div>

            {/* Rendered Portfolio Page */}
            <div className="p-6 sm:p-8 space-y-8 bg-slate-50/50">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-teal-400 to-indigo-600"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-1">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-teal-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0">
                      {portfolio.fullName.slice(0, 2).toUpperCase() || 'DV'}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {portfolio.fullName || 'Candidate Name'}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                          Batch {portfolio.graduationYear}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Available for Hire
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-indigo-600">
                        {portfolio.headline || 'Full Stack Engineer'}
                      </p>

                      <div className="text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          {portfolio.degree} • {portfolio.institution}
                        </span>
                        {portfolio.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {portfolio.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {portfolio.githubUrl && (
                      <a
                        href={portfolio.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> GitHub
                      </a>
                    )}
                    {portfolio.linkedinUrl && (
                      <a
                        href={portfolio.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#0a66c2] text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                      >
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                {portfolio.bio && (
                  <p className="text-xs text-slate-600 mt-4 pt-3 border-t border-slate-100 leading-relaxed">
                    {portfolio.bio}
                  </p>
                )}
              </div>

              {/* Dynamic Recruiter Readiness Meter */}
              <div className="bg-gradient-to-r from-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-indigo-300 font-bold text-[10px] uppercase tracking-wider block">
                      Recruiter Evaluation Audit
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      Profile Strength: {strength}% Ready
                    </h4>
                  </div>

                  <div className="w-full sm:w-48 space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300">Readiness Score</span>
                      <span className="text-emerald-400">{strength} / 100</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full transition-all duration-500"
                        style={{ width: `${strength}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Technical Skills */}
              {portfolio.skills.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2.5">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Verified Technical Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolio.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Showcase Projects */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">
                  Featured Proof-of-Work Projects
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolio.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all"
                    >
                      <div className="space-y-2">
                        <h5 className="font-bold text-slate-900 text-sm">{proj.title}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.tech.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                          >
                            <Github className="w-3.5 h-3.5" /> Code
                          </a>
                        )}
                        {proj.demo && (
                          <a
                            href={proj.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
                          >
                            Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
