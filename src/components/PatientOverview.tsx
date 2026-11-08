import React, { useState } from 'react';
import type { LabReportData } from '../types/medical';
import {
  User,
  Calendar,
  Building2,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Edit3,
  Save,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface PatientOverviewProps {
  report: LabReportData;
  onUpdatePatientInfo: (info: { name: string; age: number; gender: string; lab: string }) => void;
  onProceedNext: () => void;
}

export const PatientOverview: React.FC<PatientOverviewProps> = ({
  report,
  onUpdatePatientInfo,
  onProceedNext
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(report.patientName);
  const [age, setAge] = useState(report.age);
  const [gender, setGender] = useState(report.gender);
  const [lab, setLab] = useState(report.labName);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePatientInfo({ name, age: Number(age), gender, lab });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Patient Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg shadow-xs">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {report.patientName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {report.age} Yrs • {report.gender}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  report.consensusSummary.overallRisk === 'CRITICAL'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : report.consensusSummary.overallRisk === 'HIGH'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {report.consensusSummary.overallRisk} RISK
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{report.labName}</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Report Date: {report.reportDate}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Patient Details'}</span>
          </button>
        </div>

        {/* Quick Edit Form (If opened) */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Patient Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-600 block mb-1">Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:outline-none focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center justify-center gap-1"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Extracted Biomarkers Table */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>Extracted Test Parameters ({report.biomarkers.length} Biomarkers Normalized)</span>
            </h3>
            <span className="text-xs text-slate-500">
              Sample Type: <strong className="text-slate-700">{report.sampleType}</strong>
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-4">Test Name</th>
                  <th className="py-2.5 px-4">Observed Value</th>
                  <th className="py-2.5 px-4">Reference Range</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.biomarkers.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{b.name}</td>
                    <td className="py-2.5 px-4 font-black text-slate-900">
                      {b.value} <span className="text-slate-500 font-normal">{b.unit}</span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {b.minNormal} - {b.maxNormal} {b.unit}
                    </td>
                    <td className="py-2.5 px-4">
                      {b.status === 'normal' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Normal
                        </span>
                      ) : b.status === 'borderline' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Borderline / Low
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          Critical Flag
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 font-medium">{b.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Primary Takeaways Box */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>MDT Clinical Summary & Reassurance:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-blue-950 mt-1">
            {report.consensusSummary.primaryFindings.map((finding, idx) => (
              <li key={idx} className="leading-relaxed">{finding}</li>
            ))}
          </ul>
        </div>

        {/* Step Progression Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Step 1 of 6 Completed • Data Extracted & Validated
          </span>
          <button
            onClick={onProceedNext}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:translate-x-1"
          >
            <span>Step 2: View Visual Gauges & Voice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

