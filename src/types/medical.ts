export type BiomarkerStatus = 'normal' | 'borderline' | 'critical_high' | 'critical_low';

export interface Biomarker {
  id: string;
  name: string;
  category: 'Glycemic' | 'Lipid' | 'Hepatic' | 'Renal' | 'Hematology' | 'Cardiac' | 'Electrolyte';
  value: number;
  unit: string;
  minNormal: number;
  maxNormal: number;
  minCritical?: number;
  maxCritical?: number;
  status: BiomarkerStatus;
  plainEnglish: string;
  analogy: string;
}

export interface DoctorQuestion {
  id: string;
  specialistId: string;
  specialistTitle: string;
  category: 'Medication' | 'Lifestyle' | 'Diagnostics' | 'Warning Signs';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  question: string;
  rationale: string;
  selected?: boolean;
}

export interface DoctorAgent {
  id: string;
  name: string;
  title: string;
  specialty: string;
  hospital: string;
  avatarColor: string;
  avatarIcon: string;
  badge: string;
  bio: string;
}

export interface DeliberationMessage {
  id: string;
  doctorId: string;
  round: 'round1_specialist' | 'round2_debate' | 'round3_consensus';
  roundTitle: string;
  speech: string;
  tone: 'objective' | 'challenging' | 'warning' | 'consensus';
  keyConcern?: string;
  agreesWith?: string[];
  disagreesWith?: string[];
  recommendedAction?: string;
}

export interface LongitudinalPoint {
  date: string;
  label: string;
  hba1c?: number;
  sgpt?: number;
  cholesterol?: number;
  platelets?: number;
}

export interface LabReportData {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  reportDate: string;
  labName: string;
  sampleType: string;
  emergencyAlert?: {
    isCritical: boolean;
    title: string;
    description: string;
    triggerBiomarkers: string[];
    actionRequired: string;
  };
  biomarkers: Biomarker[];
  boardDeliberations: DeliberationMessage[];
  consensusSummary: {
    overallRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    consensusScore: number; // e.g. 96 (%)
    primaryFindings: string[];
    multidisciplinaryActionPlan: string[];
  };
  doctorQuestions: DoctorQuestion[];
  vernacular: {
    en: { text: string; simple: string };
    hi: { text: string; simple: string; title: string };
    te: { text: string; simple: string; title: string };
  };
  trendData?: LongitudinalPoint[];
}

