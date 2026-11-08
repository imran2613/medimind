import React, { useState } from 'react';
import { Upload, Camera, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ReportUploadProps {
  onFileUpload: (file: File) => void;
  onSelectSample: (sampleKey: string) => void;
  isParsing: boolean;
  parseStep: string;
}

export const ReportUpload: React.FC<ReportUploadProps> = ({
  onFileUpload,
  onSelectSample,
  isParsing,
  parseStep
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
      {/* Parsing Overlay State */}
      {isParsing ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
            <Sparkles className="w-6 h-6 text-blue-600 absolute inset-0 m-auto" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-wide">
              {parseStep || 'Analyzing Medical Lab Document...'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Multimodal Vision engine reading patient biomarkers • Convening MDT Specialist Boardroom • Generating MiroFish Knowledge Graph
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Qwen / Gemini Vision Pipeline Active</span>
          </div>
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Multimodal Lab Report Ingestion
                <span className="text-xs font-normal text-slate-500">
                  (PDF / Phone Photo)
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Upload any blood test sheet, take a photo with your mobile camera, or choose a benchmark case.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Supports: JPG, PNG, PDF
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`lg:col-span-2 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                dragOver
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
              onClick={() => document.getElementById('report-file-input')?.click()}
            >
              <input
                id="report-file-input"
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                Drag & drop your lab report here, or <span className="text-blue-600 underline">browse file</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Reads physical lab sheets, hospital printouts, and digital PDFs.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <Camera className="w-3.5 h-3.5 text-blue-600" />
                <span>Mobile camera shots automatically enhanced</span>
              </div>
            </div>

            {/* Quick Pitch Presets Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Instant Benchmark Cases
                </span>
                <p className="text-[11px] text-slate-500 mb-3">
                  Click to test pre-extracted reports instantly without uploading:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => onSelectSample('kft_sample')}
                    className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all text-xs shadow-2xs"
                  >
                    <div className="font-bold text-slate-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      1. KFT (Mr. Sample Report, 22y)
                    </div>
                    <div className="text-[10px] text-slate-500">Urea 17 • Creatinine 0.69 • eGFR 134</div>
                  </button>

                  <button
                    onClick={() => onSelectSample('metabolic')}
                    className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all text-xs shadow-2xs"
                  >
                    <div className="font-bold text-slate-900">2. Diabetic & Fatty Liver</div>
                    <div className="text-[10px] text-slate-500">HbA1c 7.8% • SGPT 74 • Triglycerides 242</div>
                  </button>

                  <button
                    onClick={() => onSelectSample('critical_cardiac')}
                    className="w-full text-left p-2.5 rounded-lg bg-rose-50/60 hover:bg-rose-50 border border-rose-200 hover:border-rose-400 transition-all text-xs shadow-2xs"
                  >
                    <div className="font-bold text-rose-700 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                      3. Emergency Cardiac Triage
                    </div>
                    <div className="text-[10px] text-rose-600">Troponin 0.52 • Potassium 6.2 (ER Alert)</div>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 text-center font-medium">
                Built for IDEAVYA 2026 Innovation Challenge
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
