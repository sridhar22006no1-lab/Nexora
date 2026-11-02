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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Supabase Backend Settings
            </h2>
            <p className="text-xs text-slate-500">
              Configure real-time PostgreSQL database & storage sync
            </p>
          </div>
        </div>

        {/* Status Alert */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl mb-4 text-xs font-semibold flex items-center gap-2 ${
              testResult.connected
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {testResult.connected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://your-project-id.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px] text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-slate-400" />
              Supabase Anon (Public) Key
            </label>
            <textarea
              rows={3}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px] text-slate-800 resize-none"
            />
          </div>

          {/* Guide Helper Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-1.5 text-[11px] text-slate-600">
            <div className="font-bold text-slate-800 flex items-center justify-between">
              <span>Where to find these keys:</span>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-0.5"
              >
                Supabase Dashboard <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p>1. Open your project on <span className="font-semibold text-slate-700">supabase.com</span></p>
            <p>2. Go to <span className="font-semibold text-slate-700">Project Settings → API</span></p>
            <p>3. Copy <span className="font-semibold text-slate-700">Project URL</span> and <span className="font-semibold text-slate-700">anon / public</span> API key.</p>
            <div className="pt-1 text-slate-500 italic">
              * Note: Even without an API key, Nexora works in <strong>Hybrid Offline Mode</strong> using local storage so you can test everything seamlessly.
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              {isTesting ? 'Testing...' : 'Test Connection'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm cursor-pointer"
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
