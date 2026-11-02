import React, { useState } from 'react';
import { X, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { StudentProject } from '../types';
import { createProject } from '../lib/supabase';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (project: StudentProject) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectAdded,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<StudentProject['category']>('Web Development');
  const [authorName, setAuthorName] = useState('Sridhar');
  const [authorCollege, setAuthorCollege] = useState('Jaya Engineering College, Chennai');
  const [technologies, setTechnologies] = useState('React, TypeScript, Tailwind CSS, Supabase');
  const [githubUrl, setGithubUrl] = useState('https://github.com/sridhar22006no1-lab');
  const [liveDemoUrl, setLiveDemoUrl] = useState('https://');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !tagline || !githubUrl) return;

    setIsSubmitting(true);
    try {
      const techArray = technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const created = await createProject({
        title,
        tagline,
        category,
        authorName: authorName || 'Sridhar',
        authorCollege: authorCollege || 'Jaya Engineering College, Chennai',
        technologies: techArray.length > 0 ? techArray : ['Web Tech'],
        githubUrl,
        liveDemoUrl: liveDemoUrl || githubUrl,
        featured: false,
      });

      onProjectAdded(created);
      onClose();
    } catch (err) {
      console.error('Failed to create project', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
            <Sparkles className="w-3 h-3" /> Proof-of-Work Verification
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Publish Student Project
          </h2>
          <p className="text-xs text-slate-500">
            Showcase your working codebase to recruiters and fellow students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. AgriVision — Crop Disease Classifier"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">One-Sentence Tagline *</label>
            <input
              type="text"
              required
              placeholder="e.g. Offline MobileNetV3 model running on WebGL for real-time paddy crop blight detection"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 cursor-pointer"
              >
                <option value="Web Development">Web Development</option>
                <option value="AI & ML">AI & ML</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="PWA & Algorithms">PWA & Algorithms</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Author Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Institution / College</label>
            <input
              type="text"
              placeholder="e.g. Jaya Engineering College, Chennai"
              value={authorCollege}
              onChange={(e) => setAuthorCollege(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Technologies (comma separated)</label>
            <input
              type="text"
              placeholder="React, TypeScript, Tailwind CSS, Supabase"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">GitHub Repo URL *</label>
              <input
                type="url"
                required
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Live Demo URL</label>
              <input
                type="url"
                placeholder="https://myproject.app"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish to Showcase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
