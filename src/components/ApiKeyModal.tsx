import React, { useState } from 'react';
import { Key, ShieldCheck, X, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string, provider: string) => void;
  initialKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaveKey,
  initialKey
}) => {
  const [apiKey, setApiKey] = useState(initialKey);
  const [provider, setProvider] = useState<'qwen' | 'gemini' | 'zap'>('gemini');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(apiKey.trim(), provider);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl shadow-xl p-6 text-slate-900 animate-fadeIn">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base text-slate-900">
              AI Engine & Vision Configuration
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Provider Selector */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Select Medical LLM Engine:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                provider === 'gemini'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Gemini Vision
            </button>
            <button
              type="button"
              onClick={() => setProvider('qwen')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                provider === 'qwen'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Qwen 2.5
            </button>
            <button
              type="button"
              onClick={() => setProvider('zap')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                provider === 'zap'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Zap AI / Swarm
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              API Key (Stored in local browser storage only):
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              Without an API key, MediMind runs with verified hospital benchmark datasets!
            </p>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Saved!
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Save & Activate
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
