import React, { useState } from 'react';
import { X, Database, CheckCircle2, AlertCircle, Key, Link as LinkIcon, RefreshCw, ExternalLink } from 'lucide-react';
import { getStoredConfig, saveStoredConfig, checkSupabaseConnection } from '../lib/supabase';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const currentConfig = getStoredConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ connected: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    // Temporarily save to test
    saveStoredConfig({ url: url.trim(), anonKey: anonKey.trim() });
    const res = await checkSupabaseConnection();
    setTestResult({ connected: res.connected, message: res.message });
    setIsTesting(false);
  };

  const handleSave = () => {
    saveStoredConfig({ url: url.trim(), anonKey: anonKey.trim() });
    onConfigSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-800 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">
              Supabase Backend Settings
            </h2>
            <p className="text-xs text-slate-400">
              Configure real-time PostgreSQL database & Row Level Security (RLS)
            </p>
          </div>
        </div>

        {/* Status Alert */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
              testResult.connected
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
            }`}
          >
            {testResult.connected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://your-project-id.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 focus:outline-none focus:border-indigo-500 font-mono text-[11px] text-slate-100"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              Supabase Anon (Public) Key
            </label>
            <textarea
              rows={3}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 focus:outline-none focus:border-indigo-500 font-mono text-[11px] text-slate-100 resize-none"
            />
          </div>

          {/* Guide Helper Box */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
            <div className="font-bold text-slate-200 flex items-center justify-between">
              <span>Where to find these keys:</span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-0.5"
              >
                Supabase Dashboard <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p>1. Open your project on <span className="font-semibold text-slate-300">supabase.com</span></p>
            <p>2. Go to <span className="font-semibold text-slate-300">Project Settings → API</span></p>
            <p>3. Copy <span className="font-semibold text-slate-300">Project URL</span> and <span className="font-semibold text-slate-300">anon / public</span> API key.</p>
            <div className="pt-1 text-slate-500 italic">
              * Note: Even without an API key, Nexora works in <strong>Hybrid Offline Mode</strong> with local storage persistence and RLS isolation simulation.
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-800/80 text-slate-300 hover:bg-slate-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              {isTesting ? 'Testing...' : 'Test Connection'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all shadow-md cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
