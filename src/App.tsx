import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { ReportUpload } from './components/ReportUpload';
import { PatientOverview } from './components/PatientOverview';
import { BiomarkerGauges } from './components/BiomarkerGauges';
import { VirtualBoardroom } from './components/VirtualBoardroom';
import { AskDoctorSheet } from './components/AskDoctorSheet';
import { VernacularVoice } from './components/VernacularVoice';
import { LongitudinalTrend } from './components/LongitudinalTrend';
import { DoctorBriefModal } from './components/DoctorBriefModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { JudgePitchGuide } from './components/JudgePitchGuide';
import { MiroFishGraph } from './components/MiroFishGraph';
import { MiroFishOrchestrator } from './components/MiroFishOrchestrator';
import { SAMPLE_REPORTS } from './data/sampleReports';
import { generateMiroFishGraph } from './data/graphData';
import { parseReportWithGemini } from './services/geminiService';
import type { LabReportData } from './types/medical';
import {
  FileText,
  Activity,
  Network,
  Users,
  Printer,
  TrendingUp,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  UploadCloud
} from 'lucide-react';

export function App() {
  // Default to the exact KFT report uploaded by user!
  const [activeSampleKey, setActiveSampleKey] = useState<string>('kft_sample');
  const [currentReport, setCurrentReport] = useState<LabReportData>(SAMPLE_REPORTS.kft_sample);
  const [activePage, setActivePage] = useState<string>('overview');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseStep, setParseStep] = useState<string>('');
  const [showDoctorBrief, setShowDoctorBrief] = useState<boolean>(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = useState<string>(
    () => localStorage.getItem('medimind_gemini_api_key') || ''
  );

  const graphData = generateMiroFishGraph(currentReport);

  const handleSelectSample = (sampleKey: string) => {
    setActiveSampleKey(sampleKey);
    setIsParsing(true);
    setParseStep('Switching Clinical Benchmark Dataset...');

    setTimeout(() => {
      setCurrentReport(SAMPLE_REPORTS[sampleKey] || SAMPLE_REPORTS.kft_sample);
      setIsParsing(false);
      setActivePage('overview');
    }, 400);
  };

  const handleFileUpload = async (file: File) => {
    setIsParsing(true);
    setParseStep(`Scanning "${file.name}" with Multimodal Vision OCR...`);

    try {
      setTimeout(() => setParseStep('Normalizing Biomarkers & Convening Virtual Medical Board...'), 700);
      const parsed = await parseReportWithGemini(file, customApiKey);
      setCurrentReport(parsed);
      setActiveSampleKey('custom_upload');
      setActivePage('overview');
    } catch (err: unknown) {
      console.error(err);
      setCurrentReport(SAMPLE_REPORTS.kft_sample);
      setActivePage('overview');
    } finally {
      setIsParsing(false);
      setShowUploadModal(false);
    }
  };

  const handleUpdatePatientInfo = (info: { name: string; age: number; gender: string; lab: string }) => {
    setCurrentReport((prev) => ({
      ...prev,
      patientName: info.name,
      age: info.age,
      gender: info.gender,
      labName: info.lab
    }));
  };

  const handleSaveApiKey = (key: string, provider: string) => {
    setCustomApiKey(key);
    localStorage.setItem('medimind_gemini_api_key', key);
    localStorage.setItem('medimind_ai_provider', provider);
  };

  // Helper for step progression
  const pageOrder = ['overview', 'gauges', 'graph', 'boardroom', 'prep_sheet', 'trends'];
  const currentIndex = pageOrder.indexOf(activePage);

  const goToNextPage = () => {
    if (currentIndex < pageOrder.length - 1) {
      setActivePage(pageOrder[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentIndex > 0) {
      setActivePage(pageOrder[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Crisp White Hospital-Grade Navbar */}
      <Navbar
        onSelectSample={handleSelectSample}
        activeSampleKey={activeSampleKey}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        hasCustomKey={!!customApiKey}
        activePage={activePage}
        onNavigate={(pageId) => {
          setActivePage(pageId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Emergency Triage Banner (Only flashes if critical biomarker present) */}
        <EmergencyBanner alert={currentReport.emergencyAlert} />

        {/* Top Quick Bar: Patient Badge + Upload New Report Trigger */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {currentReport.patientName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  {currentReport.age} Yrs / {currentReport.gender}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200 hidden md:inline">
                  {currentReport.labName}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Current View: <strong className="text-blue-600 uppercase font-bold">{activePage.replace('_', ' ')}</strong> • Report Date: {currentReport.reportDate}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowUploadModal(!showUploadModal)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors"
            >
              <UploadCloud className="w-4 h-4 text-blue-600" />
              <span>{showUploadModal ? 'Hide Upload Zone' : 'Upload Another Report'}</span>
            </button>

            <button
              onClick={() => setShowDoctorBrief(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>1-Page Doctor Brief</span>
            </button>
          </div>
        </div>

        {/* Optional Collapsible Upload Zone */}
        {showUploadModal && (
          <div className="mb-6 animate-fadeIn">
            <ReportUpload
              onFileUpload={handleFileUpload}
              onSelectSample={handleSelectSample}
              isParsing={isParsing}
              parseStep={parseStep}
            />
          </div>
        )}

        {/* ================= PAGE 1: PATIENT OVERVIEW & EXTRACTED BIOMARKERS ================= */}
        {activePage === 'overview' && (
          <div className="space-y-6">
            <PatientOverview
              report={currentReport}
              onUpdatePatientInfo={handleUpdatePatientInfo}
              onProceedNext={goToNextPage}
            />
          </div>
        )}

        {/* ================= PAGE 2: VISUAL GAUGES & VERNACULAR AUDIO ================= */}
        {activePage === 'gauges' && (
          <div className="space-y-6 animate-fadeIn">
            <BiomarkerGauges biomarkers={currentReport.biomarkers} />
            <VernacularVoice vernacular={currentReport.vernacular} />

            {/* Stepper Footer Buttons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <button
                onClick={goToPrevPage}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: Patient Overview</span>
              </button>
              <button
                onClick={goToNextPage}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs"
              >
                <span>Next: MiroFish Clinical Graph</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: MIROFISH DUAL-VIEW GRAPH ================= */}
        {activePage === 'graph' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Column: Interactive Knowledge Graph */}
              <div className="xl:col-span-7">
                <MiroFishGraph graphData={graphData} report={currentReport} />
              </div>

              {/* Right Column: MDT Agent Swarm Orchestrator */}
              <div className="xl:col-span-5">
                <MiroFishOrchestrator report={currentReport} />
              </div>
            </div>

            {/* Stepper Footer Buttons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <button
                onClick={goToPrevPage}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: Visual Gauges</span>
              </button>
              <button
                onClick={goToNextPage}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs"
              >
                <span>Next: Doctor Boardroom</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 4: VIRTUAL MEDICAL BOARDROOM ================= */}
        {activePage === 'boardroom' && (
          <div className="space-y-6 animate-fadeIn">
            <VirtualBoardroom
              deliberations={currentReport.boardDeliberations}
              consensusScore={currentReport.consensusSummary.consensusScore}
              overallRisk={currentReport.consensusSummary.overallRisk}
              primaryFindings={currentReport.consensusSummary.primaryFindings}
            />

            {/* Stepper Footer Buttons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <button
                onClick={goToPrevPage}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: MiroFish Graph</span>
              </button>
              <button
                onClick={goToNextPage}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs"
              >
                <span>Next: Doctor Consultation Prep Sheet</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 5: "ASK MY DOCTOR" PREP SHEET ================= */}
        {activePage === 'prep_sheet' && (
          <div className="space-y-6 animate-fadeIn">
            <AskDoctorSheet
              questions={currentReport.doctorQuestions}
              onOpenDoctorBrief={() => setShowDoctorBrief(true)}
            />

            {/* Stepper Footer Buttons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <button
                onClick={goToPrevPage}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: Doctor Boardroom</span>
              </button>
              <button
                onClick={goToNextPage}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs"
              >
                <span>Next: Longitudinal Trends</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 6: LONGITUDINAL TRENDS ================= */}
        {activePage === 'trends' && (
          <div className="space-y-6 animate-fadeIn">
            <LongitudinalTrend trendData={currentReport.trendData} />

            {/* Stepper Footer Buttons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
              <button
                onClick={goToPrevPage}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: Prep Sheet</span>
              </button>
              <button
                onClick={() => {
                  setActivePage('overview');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs"
              >
                <span>Back to Patient Overview (Step 1)</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Clean White Clinical Footer */}
      <footer className="no-print mt-12 border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900">MediMind Medical Intelligence</span>
            <span>•</span>
            <span className="font-medium text-slate-600">IDEAVYA 2026 Presentation</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AI Patient Education Platform • Always consult a registered physician</span>
          </div>
        </div>
      </footer>

      {/* 1-Page Pre-Consultation Doctor Brief Modal (Printable) */}
      {showDoctorBrief && (
        <DoctorBriefModal
          report={currentReport}
          onClose={() => setShowDoctorBrief(false)}
        />
      )}

      {/* API Key Configuration Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSaveKey={handleSaveApiKey}
        initialKey={customApiKey}
      />

      {/* Floating 5-Minute Pitch Companion for Speakers */}
      <JudgePitchGuide />
    </div>
  );
}

export default App;
