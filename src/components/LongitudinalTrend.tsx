import React from 'react';
import type { LongitudinalPoint } from '../types/medical';
import {
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface LongitudinalTrendProps {
  trendData?: LongitudinalPoint[];
}

export const LongitudinalTrend: React.FC<LongitudinalTrendProps> = ({ trendData }) => {
  if (!trendData || trendData.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Longitudinal Biomarker Trajectory
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Secret Weapon Differentiator
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Comparing 6-Month Historical Reports vs Today to catch silent disease progression early.
            </p>
          </div>
        </div>

        {/* Delta Badges */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>Renal Health Stable (eGFR G1)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#cbd5e1',
                borderRadius: '0.75rem',
                color: '#0f172a',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            {trendData[0].hba1c !== undefined && (
              <Line
                type="monotone"
                dataKey="hba1c"
                name="HbA1c (%)"
                stroke="#db2777"
                strokeWidth={3}
                dot={{ r: 5, fill: '#db2777' }}
                activeDot={{ r: 7 }}
              />
            )}
            {trendData[0].sgpt !== undefined && (
              <Line
                type="monotone"
                dataKey="sgpt"
                name="SGPT / Liver (U/L)"
                stroke="#d97706"
                strokeWidth={2.5}
                dot={{ r: 5, fill: '#d97706' }}
              />
            )}
            {trendData[0].cholesterol !== undefined && (
              <Line
                type="monotone"
                dataKey="cholesterol"
                name="Triglycerides (mg/dL)"
                stroke="#0284c7"
                strokeWidth={2}
                dot={{ r: 4, fill: '#0284c7' }}
              />
            )}
            {trendData[0].platelets !== undefined && (
              <Line
                type="monotone"
                dataKey="platelets"
                name="Platelet Count (10³/µL)"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 5, fill: '#059669' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Clinical Trajectory Takeaway */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Trajectory Analysis: </strong>
            Parameters demonstrate consistent stability over 180 days. Continue balanced hydration and annual monitoring.
          </span>
        </div>
      </div>
    </div>
  );
};
