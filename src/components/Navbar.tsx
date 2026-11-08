import React from 'react';
import { Key, Sparkles, PhoneCall, Stethoscope, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onSelectSample: (key: string) => void;
  activeSampleKey: string;
  onOpenApiKeyModal: () => void;
  hasCustomKey: boolean;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectSample,
  activeSampleKey,
  onOpenApiKeyModal,
  hasCustomKey,
  activePage,
  onNavigate
}) => {
  const pages = [
    { id: 'overview', label: '1. Patient Overview', short: 'Overview' },
    { id: 'gauges', label: '2. Visual Gauges & Voice', short: 'Gauges & Voice' },
    { id: 'graph', label: '3. MiroFish Graph', short: 'MiroFish Graph' },
    { id: 'boardroom', label: '4. Doctor Boardroom', short: 'Boardroom' },
    { id: 'prep_sheet', label: '5. Doctor Prep Sheet', short: 'Prep Sheet' },
    { id: 'trends', label: '6. Trends (Past vs Now)', short: 'Trends' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('overview')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  MediMind
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  IDEAVYA 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Clinical Intelligence & Multi-Doctor Triage Platform
              </p>
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Presets:
            </span>
            <button
              onClick={() => onSelectSample('kft_sample')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSampleKey === 'kft_sample'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              KFT (Mr. Sample Report, 22y)
            </button>
            <button
              onClick={() => onSelectSample('metabolic')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSampleKey === 'metabolic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              Diabetic / Fatty Liver
            </button>
            <button
              onClick={() => onSelectSample('critical_cardiac')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeSampleKey === 'critical_cardiac'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-600 hover:bg-rose-50'
              }`}
            >
              🚨 Cardiac Emergency
            </button>
          </div>

          {/* Right Tools */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenApiKeyModal}
              title="Configure AI Engine API Key"
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                hasCustomKey
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {hasCustomKey ? 'AI API Active' : 'AI Engine'}
              </span>
            </button>

            <a
              href="tel:108"
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
              title="Emergency Ambulance Line (India)"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>108</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Page Navigation Stepper (Clean White Tabs) */}
      <div className="border-t border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar">
            {pages.map((p, idx) => {
              const isActive = activePage === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onNavigate(p.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <span>{p.label}</span>
                  {idx < pages.length - 1 && (
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-blue-200' : 'text-slate-400'}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
