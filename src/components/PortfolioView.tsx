import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Github, 
  Linkedin, 
  Mail, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Send, 
  ShieldCheck,
  Code2,
  Database,
  Terminal,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { StudentProfile, StudentProject } from '../types';
import { submitContactMessage } from '../lib/supabase';

interface PortfolioViewProps {
  profile: StudentProfile;
  projects: StudentProject[];
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ profile, projects }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; success: boolean } | null>(null);

  const sridharProjects = projects.filter((p) => p.authorName.toLowerCase().includes('sridhar'));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}#portfolio`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await submitContactMessage({
        name: contactName,
        email: contactEmail,
        subject: contactSubject || 'Portfolio Inquiry',
        message: contactMessage,
      });

      setStatusMessage({ text: res.message, success: res.success });
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    } catch (err: any) {
      setStatusMessage({ text: 'Error submitting message. Please email directly.', success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Top Banner Card: Sridhar's Profile */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-600"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
          {/* Avatar & Title info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-teal-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
              SR
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {profile.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                  Batch {profile.graduationYear}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Available for Hire
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-indigo-700">
                {profile.headline}
              </p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" /> {profile.degree} • {profile.institution}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {profile.location}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Share Link Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedLink ? 'Link Copied!' : 'Share Portfolio'}
            </button>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Bio paragraph */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Profile Strength Meter & Recruiter Readiness Audit */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-indigo-800/40 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" /> Recruiter Evaluation Audit
            </div>
            <h3 className="text-xl font-bold text-white">
              Profile Strength: 92% Complete
            </h3>
            <p className="text-xs text-slate-300">
              Evaluated based on code proofs, production deployments, and academic accreditation.
            </p>
          </div>

          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Recruiter Score</span>
              <span className="text-emerald-400">92 / 100</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div className="h-full bg-gradient-to-r from-teal-400 to-indigo-400 rounded-full w-[92%] transition-all duration-1000"></div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-indigo-800/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Degree & College Verified</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>2 Production Projects Deployed</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Public GitHub Repos Active</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Supabase Cloud Integration</span>
          </div>
        </div>
      </div>

      {/* Technical Skills Categorized Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Verified Technical Stack & Competencies
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hands-on technologies used across live projects and academic coursework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <Code2 className="w-4 h-4" /> Frontend Engineering
            </div>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Next.js 15 (App Router)', 'TypeScript', 'Tailwind CSS', 'JavaScript (ES6+)', 'HTML5 & Responsive CSS'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Databases */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <Database className="w-4 h-4" /> Backend & Relational Databases
            </div>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Supabase (Auth & RLS)', 'SQLite', 'RESTful API Design'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tooling & Architecture */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <Terminal className="w-4 h-4" /> Dev Tools & System Practices
            </div>
            <div className="flex flex-wrap gap-2">
              {['Git & GitHub', 'Vite 5 Bundler', 'Zod Input Validation', 'Postman', 'Docker Fundamentals', 'Linux / Windows PowerShell'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Deep Dive */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Sridhar's Flagship Engineering Projects
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Production-grade systems built to address authentic user problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sridharProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Production Proof
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Github className="w-4 h-4" /> Inspect Code
                </a>

                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  Launch Demo <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supabase-Connected Direct Contact / Inquiries Form */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
              <Mail className="w-3.5 h-3.5" /> Contact Sridhar Directly
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Get In Touch for Opportunities
            </h2>
            <p className="text-xs text-slate-500">
              Inquiring about full-time roles, internships, or collaborative development? Send a message here — saved directly into Supabase database.
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                statusMessage.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar (Recruiter)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Full Stack Developer Opening (Batch 2026)"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell Sridhar about the role, technical requirements, or schedule an interview..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-indigo-200 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending to Supabase...' : 'Send Message to Sridhar'}
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-400">
            Or reach out directly via email at <a href={`mailto:${profile.email}`} className="text-indigo-600 font-bold hover:underline">{profile.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
};
