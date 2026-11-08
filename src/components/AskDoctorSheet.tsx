import React, { useState } from 'react';
import type { DoctorQuestion } from '../types/medical';
import {
  FileText,
  Printer,
  CheckSquare,
  Square,
  Stethoscope,
  Pill,
  Activity,
  AlertCircle
} from 'lucide-react';

interface AskDoctorSheetProps {
  questions: DoctorQuestion[];
  onOpenDoctorBrief: () => void;
}

export const AskDoctorSheet: React.FC<AskDoctorSheetProps> = ({
  questions,
  onOpenDoctorBrief
}) => {
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: true }), {})
  );

  const toggleQuestion = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Urgent Priority
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            High Priority
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Routine Discussion
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Medication':
        return <Pill className="w-4 h-4 text-blue-600" />;
      case 'Diagnostics':
        return <Activity className="w-4 h-4 text-emerald-600" />;
      default:
        return <Stethoscope className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              "Ask My Doctor" Consultation Prep Sheet
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Empowering patients for India's 3-minute consultations. Check the questions you wish to take to your appointment.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDoctorBrief}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-105 shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export Doctor Brief (PDF)</span>
        </button>
      </div>

      {/* Questions Checklist */}
      <div className="space-y-3.5 mt-5">
        {questions.map((q) => {
          const isChecked = selectedIds[q.id] ?? true;

          return (
            <div
              key={q.id}
              onClick={() => toggleQuestion(q.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isChecked
                  ? 'bg-blue-50/30 border-blue-200 shadow-xs hover:border-blue-400'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <button
                  type="button"
                  className="mt-0.5 text-blue-600 transition-colors shrink-0"
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(q.category)}
                      <span className="text-xs font-bold text-slate-700">
                        {q.category} • Specialist: {q.specialistTitle}
                      </span>
                    </div>
                    {getPriorityBadge(q.priority)}
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    "{q.question}"
                  </p>

                  <div className="mt-2 text-xs text-slate-600 flex items-start gap-1.5 bg-white/70 p-2 rounded-lg border border-slate-200/60">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-800">Why this matters: </strong>
                      {q.rationale}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
