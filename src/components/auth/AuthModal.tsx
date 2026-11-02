import React, { useState } from 'react';
import { X, Lock, Mail, User, GraduationCap, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { signInUser, signUpUser, loginAsDemoStudent } from '../../lib/supabase';
import { UserProfile } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('B.Tech Information Technology');
  const [graduationYear, setGraduationYear] = useState(2026);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (mode === 'signin') {
        const res = await signInUser(email, password);
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.message);
        }
      } else {
        const res = await signUpUser({
          email,
          password,
          fullName: fullName.trim() || 'Student Member',
          institution: institution.trim() || 'Engineering College',
          degree,
          graduationYear
        });
        if (res.success && res.user) {
          onAuthSuccess(res.user);
          onClose();
        } else {
          setErrorMsg(res.message);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demo = loginAsDemoStudent();
    onAuthSuccess(demo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl overflow-hidden">
        {/* Top Glow Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Nexora Student Account
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              {mode === 'signin' ? 'Welcome Back' : 'Create Free Account'}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === 'signin'
                ? 'Sign in to access your personal study hub, planner & portfolio.'
                : 'Join engineering students building verified proof-of-work.'}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Register Free
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Student Learner"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">College / Institute</label>
                    <input
                      type="text"
                      placeholder="e.g. Engineering College"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Batch</label>
                    <select
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(parseInt(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value={2025}>Batch 2025</option>
                      <option value={2026}>Batch 2026</option>
                      <option value={2027}>Batch 2027</option>
                      <option value={2028}>Batch 2028</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-slate-300 font-bold mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="student@college.edu or email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Dashboard' : 'Create Free Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login Button */}
          <div className="pt-2 border-t border-slate-800 text-center space-y-2">
            <span className="text-[11px] text-slate-500 block">Want to test without registering?</span>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-indigo-300 font-bold text-xs border border-slate-700 hover:border-indigo-500/50 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 1-Click Student Demo Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
