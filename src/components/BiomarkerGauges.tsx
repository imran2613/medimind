import React, { useState } from 'react';
import type { Biomarker, BiomarkerStatus } from '../types/medical';
import { CheckCircle2, AlertTriangle, AlertOctagon, ChevronDown, ChevronUp, Sparkles, Activity } from 'lucide-react';

interface BiomarkerGaugesProps {
  biomarkers: Biomarker[];
}

export const BiomarkerGauges: React.FC<BiomarkerGaugesProps> = ({ biomarkers }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedAnalogy, setExpandedAnalogy] = useState<Record<string, boolean>>({});

  const categories = ['All', ...Array.from(new Set(biomarkers.map((b) => b.category)))];

  const filteredBiomarkers =
    selectedCategory === 'All'
      ? biomarkers
      : biomarkers.filter((b) => b.category === selectedCategory);

  const toggleAnalogy = (id: string) => {
    setExpandedAnalogy((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusBadge = (status: BiomarkerStatus) => {
    switch (status) {
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Normal
          </span>
        );
      case 'borderline':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Borderline
          </span>
        );
      case 'critical_high':
      case 'critical_low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
            {status === 'critical_high' ? 'High Concern' : 'Critically Low'}
          </span>
        );
    }
  };

  const getPositionPercent = (b: Biomarker) => {
    const rangeSpan = (b.maxNormal - b.minNormal) * 2;
    const offsetMin = b.minNormal - rangeSpan * 0.25;
    const offsetMax = b.maxNormal + rangeSpan * 0.75;
    const clamped = Math.max(offsetMin, Math.min(offsetMax, b.value));
    const percent = ((clamped - offsetMin) / (offsetMax - offsetMin)) * 100;
    return Math.max(5, Math.min(95, percent));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Visual Biomarker Risk Gauges
              </h2>
              <p className="text-xs text-slate-500">
                Intuitive color-coded gauges replacing clinical confusion with instant clarity.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBiomarkers.map((b) => {
          const pinPercent = getPositionPercent(b);
          const isExpanded = expandedAnalogy[b.id] ?? false;

          return (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition-all ${
                b.status === 'critical_high' || b.status === 'critical_low'
                  ? 'bg-rose-50/40 border-rose-200 hover:border-rose-400'
                  : b.status === 'borderline'
                  ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400'
                  : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{b.name}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-semibold">
                      {b.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{b.plainEnglish}</p>
                </div>
                {getStatusBadge(b.status)}
              </div>

              {/* Numerical Value Display */}
              <div className="flex items-baseline justify-between mt-3 mb-2">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-black text-slate-900">{b.value}</span>
                  <span className="text-xs text-slate-500 font-medium">{b.unit}</span>
                </div>
                <div className="text-xs text-slate-500 text-right">
                  <span>Normal: </span>
                  <span className="font-bold text-slate-700">
                    {b.minNormal} - {b.maxNormal} {b.unit}
                  </span>
                </div>
              </div>

              {/* Visual Gauge Bar */}
              <div className="relative pt-3 pb-1">
                {/* The Color Band Bar */}
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-200 border border-slate-300">
                  <div className="w-[20%] bg-blue-400" title="Low Range" />
                  <div className="w-[45%] bg-emerald-500" title="Normal Healthy Range" />
                  <div className="w-[20%] bg-amber-400" title="Borderline Warning" />
                  <div className="w-[15%] bg-rose-500" title="Critical Elevated Range" />
                </div>

                {/* Patient Value Pin */}
                <div
                  className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-500"
                  style={{ left: `${pinPercent}%` }}
                >
                  <div className="w-3 h-3 rotate-45 bg-slate-900 shadow-md border border-white" />
                  <div className="w-0.5 h-3 bg-slate-900" />
                </div>
              </div>

              {/* Gauge Legend */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mt-1 font-medium">
                <span>Low</span>
                <span className="text-emerald-600 font-bold">Optimal Safe</span>
                <span className="text-amber-600 font-bold">Borderline</span>
                <span className="text-rose-600 font-bold">Critical</span>
              </div>

              {/* ELI10 Analogy Toggle Button */}
              <div className="mt-3 pt-3 border-t border-slate-200/80">
                <button
                  onClick={() => toggleAnalogy(b.id)}
                  className="w-full flex items-center justify-between text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Explain Like I'm 10 (Analogy)
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-950 leading-relaxed animate-fadeIn">
                    <span className="font-bold text-blue-800">Kid-Friendly Analogy: </span>
                    {b.analogy}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
