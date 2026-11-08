import React, { useState, useEffect } from 'react';
import type { LabReportData } from '../types/medical';
import { VIRTUAL_DOCTORS } from '../data/sampleReports';
import { Terminal, Tag, Volume2, Square } from 'lucide-react';
import { ttsService } from '../services/ttsService';

interface MiroFishOrchestratorProps {
  report: LabReportData;
  onSelectDoctor?: (doctorId: string) => void;
}

export const MiroFishOrchestrator: React.FC<MiroFishOrchestratorProps> = ({
  report,
  onSelectDoctor
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  const getDoctor = (id: string) => {
    return VIRTUAL_DOCTORS.find((d) => d.id === id) || VIRTUAL_DOCTORS[0];
  };

  const handleTogglePlayAll = () => {
    if (isPlayingAudio) {
      ttsService.stop();
      setIsPlayingAudio(false);
      setCurrentPlayingIndex(null);
      return;
    }

    setIsPlayingAudio(true);
    playSpeechAt(0);
  };

  const playSpeechAt = (idx: number) => {
    if (idx >= report.boardDeliberations.length) {
      setIsPlayingAudio(false);
      setCurrentPlayingIndex(null);
      return;
    }

    setCurrentPlayingIndex(idx);
    const delib = report.boardDeliberations[idx];
    const doc = getDoctor(delib.doctorId);
    const textToSpeak = `${doc.name}, ${doc.badge}: ${delib.speech}`;

    ttsService.speak(
      textToSpeak,
      'en',
      () => {},
      () => {
        setTimeout(() => {
          playSpeechAt(idx + 1);
        }, 400);
      },
      () => {
        setIsPlayingAudio(false);
        setCurrentPlayingIndex(null);
      }
    );
  };

  const hashtags = [
    `#${report.id.replace('rep_', '').toUpperCase()}`,
    '#MDT_Swarm_Simulation',
    '#Qwen_Clinical_Persona',
    '#Cross_Specialty_Debate',
    '#Polypharmacy_Check',
    '#Zero_Hallucination_Consensus'
  ];

  return (
    <div className="w-full h-[620px] bg-white rounded-2xl border border-slate-200 p-5 flex flex-col shadow-sm overflow-hidden">
      {/* MiroFish Step Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-black tracking-wider text-blue-600 font-mono">
            04 MDT MULTI-AGENT ORCHESTRATION
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
            Step 3/5 Swarm Consensus
          </span>
        </div>

        {/* Audio Debate Button */}
        <button
          onClick={handleTogglePlayAll}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            isPlayingAudio
              ? 'bg-rose-600 text-white animate-pulse shadow-xs'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <Square className="w-3.5 h-3.5" />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>Play Live Debate</span>
            </>
          )}
        </button>
      </div>

      {/* API Endpoint & Protocol Info */}
      <div className="pt-3 pb-2 text-[11px] font-mono text-slate-500 flex items-center justify-between shrink-0">
        <span>POST /api/simulation/consultation</span>
        <span className="text-slate-500 text-[10px]">
          Engine: Qwen-2.5-Medical / Gemini Vision
        </span>
      </div>

      {/* Clinical Guidance Box */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shrink-0 space-y-1">
        <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-blue-600" />
          <span>Swarm Clinical Guidance Directive:</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          5 Verified physician agents analyze findings through their specialty degrees, review drug safety, and construct a unified consensus brief.
        </p>
      </div>

      {/* Trigger Hashtags */}
      <div className="py-2.5 flex flex-wrap gap-1.5 shrink-0 border-b border-slate-100">
        {hashtags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold"
          >
            <Tag className="w-2.5 h-2.5 text-amber-600" />
            {tag}
          </span>
        ))}
      </div>

      {/* Agent Deliberation Speeches List */}
      <div className="flex-1 overflow-y-auto pt-3 space-y-3 pr-1">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
          <span>Agent Deliberation Sequence ({report.boardDeliberations.length}):</span>
          <span className="text-emerald-700 font-bold">{report.consensusSummary.consensusScore}% Agreement</span>
        </div>

        {report.boardDeliberations.map((delib, idx) => {
          const doc = getDoctor(delib.doctorId);
          const isDebate = delib.round === 'round2_debate';
          const isConsensus = delib.round === 'round3_consensus';
          const isCurrentlySpeaking = currentPlayingIndex === idx;

          return (
            <div
              key={delib.id}
              onClick={() => onSelectDoctor && onSelectDoctor(delib.doctorId)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                isCurrentlySpeaking
                  ? 'bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.01]'
                  : isConsensus
                  ? 'bg-emerald-50/40 border-emerald-200'
                  : isDebate
                  ? 'bg-amber-50/30 border-amber-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isCurrentlySpeaking
                      ? 'bg-blue-600 animate-ping'
                      : isConsensus
                      ? 'bg-emerald-500'
                      : isDebate
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`} />
                  <span className="font-mono text-[11px] font-bold text-slate-900">
                    {doc.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-blue-700 font-semibold border border-slate-200">
                    @{doc.badge.toLowerCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isCurrentlySpeaking && (
                    <span className="text-[9px] font-mono text-blue-700 flex items-center gap-1 font-bold">
                      <Volume2 className="w-3 h-3 animate-pulse" />
                      SPEAKING
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-slate-400">
                    Seq #{idx + 1}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed font-sans">
                "{delib.speech}"
              </p>

              {delib.keyConcern && (
                <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-1">
                  <span className="font-bold text-blue-700">Clinical Focus:</span>
                  <span className="truncate">{delib.keyConcern}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
