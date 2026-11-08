import React, { useState } from 'react';
import type { DeliberationMessage, DoctorAgent } from '../types/medical';
import { VIRTUAL_DOCTORS } from '../data/sampleReports';
import {
  Users,
  AlertCircle,
  Sparkles,
  Send,
  Stethoscope,
  HeartPulse,
  Activity,
  FlaskConical,
  Pill,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

interface VirtualBoardroomProps {
  deliberations: DeliberationMessage[];
  consensusScore: number;
  overallRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  primaryFindings: string[];
}

export const VirtualBoardroom: React.FC<VirtualBoardroomProps> = ({
  deliberations,
  consensusScore,
  primaryFindings
}) => {
  const [activeRound, setActiveRound] = useState<'all' | 'round1_specialist' | 'round2_debate' | 'round3_consensus'>('all');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ doctorId: string; userQ: string; reply: string }[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  const filteredDeliberations =
    activeRound === 'all'
      ? deliberations
      : deliberations.filter((d) => d.round === activeRound);

  const getDoctor = (id: string): DoctorAgent => {
    return VIRTUAL_DOCTORS.find((d) => d.id === id) || VIRTUAL_DOCTORS[0];
  };

  const getIconForDoctor = (id: string) => {
    switch (id) {
      case 'dr_kumar':
        return <HeartPulse className="w-4 h-4 text-white" />;
      case 'dr_reddy':
        return <Activity className="w-4 h-4 text-white" />;
      case 'dr_ali':
        return <FlaskConical className="w-4 h-4 text-white" />;
      case 'dr_iyer':
        return <Pill className="w-4 h-4 text-white" />;
      default:
        return <Stethoscope className="w-4 h-4 text-white" />;
    }
  };

  const handleAskDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || !selectedDoctorId) return;

    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      if (selectedDoctorId === 'dr_reddy') {
        reply = `As an Endocrinologist, I look closely at insulin resistance and fluid-mineral balance. Regarding "${customQuestion}", your metabolic indices are reassuring. Maintain balanced hydration and wholesome food intake.`;
      } else if (selectedDoctorId === 'dr_kumar') {
        reply = `From a Cardiology perspective regarding "${customQuestion}": Potassium at 4.2 mmol/L and Sodium at 139 mmol/L are in the optimal cardiovascular stability zone. Fluid balance is maintained.`;
      } else if (selectedDoctorId === 'dr_iyer') {
        reply = `From a Clinical Pharmacology standpoint: Regarding "${customQuestion}", your eGFR of 134 mL/min means your kidneys filter exceptionally well. You do not have renal clearance restrictions, but stay well-hydrated.`;
      } else {
        reply = `In Internal Medicine, our goal is overall systemic health regarding "${customQuestion}". This lab panel indicates healthy renal filtration. Bring the generated consultation prep sheet to your in-person visit.`;
      }

      setChatLog((prev) => [
        ...prev,
        { doctorId: selectedDoctorId, userQ: customQuestion, reply }
      ]);
      setCustomQuestion('');
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Board Header & Consensus Score */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Virtual Medical Boardroom (MDT Deliberation)
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Multi-Agent Consensus
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              5 Accredited AI Clinicians analyze lab findings through their degrees, debate discrepancies, and synthesize clinical consensus.
            </p>
          </div>
        </div>

        {/* Board Alignment Meter */}
        <div className="flex items-center space-x-4 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 shrink-0">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
              Board Alignment Score
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-emerald-600">{consensusScore}%</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                High Confidence
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-full border-4 border-emerald-200 border-t-emerald-600 flex items-center justify-center font-bold text-xs text-emerald-700">
            MDT
          </div>
        </div>
      </div>

      {/* The 5 Specialist Doctor Badges */}
      <div className="py-5 border-b border-slate-100">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Active Board Members (Click to Consult Directly):</span>
          <span className="text-blue-600 normal-case font-semibold text-xs">
            {selectedDoctorId ? 'Specialist Selected' : 'Tap any specialist to consult'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {VIRTUAL_DOCTORS.map((doc) => {
            const isSelected = selectedDoctorId === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDoctorId(isSelected ? null : doc.id)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-lg ${doc.avatarColor} flex items-center justify-center shadow-xs shrink-0`}>
                    {getIconForDoctor(doc.id)}
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 truncate">{doc.name}</div>
                    <div className="text-[10px] text-blue-600 font-semibold truncate">{doc.badge}</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 truncate">{doc.hospital}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialist Direct Chat Drawer */}
      {selectedDoctorId && (
        <div className="my-5 p-4 rounded-xl bg-slate-50 border border-blue-200 shadow-inner">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className={`w-7 h-7 rounded-lg ${getDoctor(selectedDoctorId).avatarColor} flex items-center justify-center`}>
                {getIconForDoctor(selectedDoctorId)}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Direct Q&A with {getDoctor(selectedDoctorId).name}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {getDoctor(selectedDoctorId).title}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedDoctorId(null)}
              className="text-xs text-slate-500 hover:text-slate-900 font-bold px-2 py-1"
            >
              Close
            </button>
          </div>

          {/* Chat history */}
          <div className="py-3 space-y-3 max-h-56 overflow-y-auto">
            {chatLog
              .filter((c) => c.doctorId === selectedDoctorId)
              .map((c, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="bg-white text-slate-800 p-2.5 rounded-lg max-w-[85%] ml-auto border border-slate-200 shadow-2xs">
                    <span className="font-bold text-slate-500 text-[10px] block">You asked:</span>
                    {c.userQ}
                  </div>
                  <div className="bg-blue-50 text-slate-900 p-2.5 rounded-lg max-w-[90%] border border-blue-200 shadow-2xs">
                    <span className="font-bold text-blue-700 text-[10px] block">
                      {getDoctor(selectedDoctorId).name}:
                    </span>
                    {c.reply}
                  </div>
                </div>
              ))}
            {isThinking && (
              <div className="text-xs text-blue-600 italic flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                {getDoctor(selectedDoctorId).name} is reviewing your question...
              </div>
            )}
          </div>

          {/* Question input */}
          <form onSubmit={handleAskDoctor} className="flex gap-2 mt-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder={`Ask ${getDoctor(selectedDoctorId).name} a question...`}
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isThinking || !customQuestion.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3 h-3" />
              Ask
            </button>
          </form>
        </div>
      )}

      {/* Deliberation Round Switcher */}
      <div className="flex items-center justify-between mt-5 mb-4">
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveRound('all')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              activeRound === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Speeches ({deliberations.length})
          </button>
          <button
            onClick={() => setActiveRound('round1_specialist')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              activeRound === 'round1_specialist'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Round 1: Initial Findings
          </button>
          <button
            onClick={() => setActiveRound('round2_debate')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              activeRound === 'round2_debate'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Round 2: Cross-Specialty Review ⚔️
          </button>
          <button
            onClick={() => setActiveRound('round3_consensus')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              activeRound === 'round3_consensus'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Round 3: Board Consensus 🎯
          </button>
        </div>
      </div>

      {/* Deliberation Transcript Stream */}
      <div className="space-y-3.5">
        {filteredDeliberations.map((msg) => {
          const doc = getDoctor(msg.doctorId);
          const isDebate = msg.round === 'round2_debate';
          const isConsensus = msg.round === 'round3_consensus';

          return (
            <div
              key={msg.id}
              className={`p-4 rounded-xl border transition-all ${
                isConsensus
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isDebate
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-lg ${doc.avatarColor} flex items-center justify-center shrink-0`}>
                    {getIconForDoctor(doc.id)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">{doc.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {doc.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-blue-600 font-medium">{doc.specialty}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isConsensus
                    ? 'bg-emerald-100 text-emerald-800'
                    : isDebate
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {msg.roundTitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mt-2 pl-0 sm:pl-10">
                "{msg.speech}"
              </p>

              {msg.keyConcern && (
                <div className="mt-2.5 sm:ml-10 p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">
                    <strong className="text-slate-900">Clinical Focus: </strong>
                    {msg.keyConcern}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
