import React, { useState } from 'react';
import { Sparkles, Trophy, Clock, X, ChevronRight, CheckCircle2 } from 'lucide-react';

export const JudgePitchGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
        title="Open 5-Minute Hackathon Pitch Guide"
      >
        <Trophy className="w-4 h-4 text-amber-300" />
        <span>Judge Pitch Guide</span>
      </button>

      {/* Slide-out Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl p-6 text-slate-800 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  IDEAVYA 2026 • 5-Minute Winning Pitch Guide
                </h3>
                <p className="text-xs text-slate-500">
                  Follow this exact step-by-step formula while demoing MediMind to the judges.
                </p>
              </div>
            </div>

            {/* Pitch Script Steps */}
            <div className="mt-4 space-y-4 text-xs leading-relaxed">
              {/* Minute 1: The Hook */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200">
                <div className="flex items-center justify-between font-bold text-blue-900 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Minute 1: The Indian Healthcare Reality (The Hook)
                  </span>
                  <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded text-blue-800">0:00 - 1:00</span>
                </div>
                <p className="text-slate-700">
                  "Respected judges, in India the average doctor consultation time is <strong>under 3 minutes</strong>. Over 80% of patients who receive a blood test report cannot decipher jargon like <em>'Creatinine 0.69 mg/dL'</em> or <em>'eGFR 134'</em>. They panic on Google and freeze when they sit in front of the doctor. MediMind acts as the clinical bridge: empowering the patient in their native language and saving the doctor 10 minutes of manual review."
                </p>
              </div>

              {/* Minute 2-3: The Live Demo */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Minutes 2 to 3: The 4-Step Interactive Demo
                  </span>
                  <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700">1:00 - 3:30</span>
                </div>
                <ul className="space-y-2 text-slate-600 mt-2">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Show Step 1 (Patient Overview):</strong> Show the uploaded KFT report for <em>Mr. Sample Report, 22y</em> with instant OCR extraction.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Show Step 2 (Visual Gauges & Voice):</strong> Show color-coded range sliders (Green/Yellow/Red). Click the <strong>Telugu (తెలుగు)</strong> or <strong>Hindi</strong> button to play the vernacular audio aloud.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Show Step 3 (MiroFish Graph):</strong> Show the 5-doctor knowledge graph. <em>Drag a doctor node with your mouse</em> to demonstrate live interactive edge recalculation.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Show Step 4 (Boardroom) & Step 5 (Prep Sheet):</strong> Play the live debate and click <strong>"Print 1-Page Doctor Brief"</strong> to show the physical handout designed for the doctor.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Minute 4-5: Impact & Ethics */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                <div className="flex items-center justify-between font-bold text-emerald-900 mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Minute 4 to 5: Impact, Safety & Ethics
                  </span>
                  <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">3:30 - 5:00</span>
                </div>
                <p className="text-slate-700">
                  "MediMind does NOT replace the physician — it accelerates them. We have built-in emergency triage guardrails (instant ER flags for Troponin/Potassium), zero-cost browser regional speech synthesis, and multi-agent peer review to eliminate hallucinations."
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Ready to win IDEAVYA 2026?</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Close & Return to App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

