import React from 'react';
import type { LabReportData } from '../types/medical';
import { Printer, X, Stethoscope } from 'lucide-react';

interface DoctorBriefModalProps {
  report: LabReportData;
  onClose: () => void;
}

export const DoctorBriefModal: React.FC<DoctorBriefModalProps> = ({ report, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const criticalAndBorderline = report.biomarkers.filter(
    (b) => b.status !== 'normal'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-300 print:border-none print:shadow-none print:w-full print:m-0">
        {/* Modal Top Actions (Hidden on Print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-sm tracking-wide">
              1-Page Physician Pre-Consultation Summary (30-Second Glance Format)
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print to PDF / Paper</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable 1-Page Document Body */}
        <div className="p-8 font-sans space-y-6">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                MediMind • Clinical Consultation Brief
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Multi-Disciplinary Team (MDT) AI Triage & Prioritized Patient Questions
              </p>
            </div>
            <div className="text-right text-xs text-slate-700">
              <div className="font-bold text-slate-900">DATE: {report.reportDate}</div>
              <div>LAB: {report.labName}</div>
              <div>SAMPLE: {report.sampleType}</div>
            </div>
          </div>

          {/* Patient Demographics Bar */}
          <div className="grid grid-cols-4 gap-4 p-3 bg-slate-100 rounded-lg border border-slate-300 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">PATIENT NAME:</span>
              <span className="font-bold text-slate-900 text-sm">{report.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">AGE / GENDER:</span>
              <span className="font-bold text-slate-900">{report.age} Yrs / {report.gender}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">TRIAGE RISK:</span>
              <span className={`font-black uppercase ${
                report.consensusSummary.overallRisk === 'CRITICAL'
                  ? 'text-rose-600'
                  : report.consensusSummary.overallRisk === 'HIGH'
                  ? 'text-amber-600'
                  : 'text-emerald-700'
              }`}>
                {report.consensusSummary.overallRisk} RISK ({report.consensusSummary.consensusScore}% Consensus)
              </span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">REPORT REF ID:</span>
              <span className="font-mono text-slate-700">{report.id}</span>
            </div>
          </div>

          {/* Emergency Alert (If any) */}
          {report.emergencyAlert && report.emergencyAlert.isCritical && (
            <div className="p-3 bg-rose-50 border-2 border-rose-600 rounded-lg text-xs text-rose-900">
              <span className="font-black text-rose-700 block">🚨 CRITICAL BIO-MARKER ALERT:</span>
              {report.emergencyAlert.description}
            </div>
          )}

          {/* Section 1: Abnormal Biomarkers at a Glance */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
              1. Flagged Abnormal Parameters
            </h4>
            <table className="w-full text-xs text-left border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-700 font-bold">
                  <th className="p-2 border border-slate-300">Test Name</th>
                  <th className="p-2 border border-slate-300">Observed Value</th>
                  <th className="p-2 border border-slate-300">Reference Range</th>
                  <th className="p-2 border border-slate-300">Clinical Flag</th>
                </tr>
              </thead>
              <tbody>
                {criticalAndBorderline.map((b) => (
                  <tr key={b.id} className="border-b border-slate-200">
                    <td className="p-2 font-bold text-slate-900 border border-slate-300">{b.name}</td>
                    <td className="p-2 font-black text-slate-900 border border-slate-300">
                      {b.value} {b.unit}
                    </td>
                    <td className="p-2 text-slate-600 border border-slate-300">
                      {b.minNormal} - {b.maxNormal} {b.unit}
                    </td>
                    <td className="p-2 border border-slate-300">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        b.status === 'critical_high' || b.status === 'critical_low'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 2: MDT Clinical Consensus */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">
              2. Multidisciplinary Board Impressions
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-800">
              {report.consensusSummary.primaryFindings.map((f, i) => (
                <li key={i} className="leading-snug">{f}</li>
              ))}
            </ul>
          </div>

          {/* Section 3: Patient's Prioritized Questions for the Consultation */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1 flex items-center justify-between">
              <span>3. Patient Consultation Checklist (Prioritized for this OPD)</span>
              <span className="font-normal normal-case text-slate-500 text-[11px]">
                Prepared by patient via MediMind
              </span>
            </h4>
            <div className="space-y-2">
              {report.doctorQuestions.map((q, idx) => (
                <div key={q.id} className="p-2.5 rounded bg-slate-50 border border-slate-300 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Q{idx + 1}: {q.question}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 bg-slate-200 rounded">
                      {q.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    <em>Rationale: {q.rationale}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 text-center flex items-center justify-between">
            <span>Powered by MediMind • IDEAVYA 2026 AI Medical Intelligence</span>
            <span>Educational triage tool. Treating physician retains complete clinical authority.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
