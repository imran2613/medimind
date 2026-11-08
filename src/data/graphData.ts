import type { LabReportData } from '../types/medical';
import type { MiroFishGraphData, GraphNode, GraphEdge } from '../types/graph';

export function generateMiroFishGraph(report: LabReportData): MiroFishGraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // 1. Doctor Agent Nodes
  const doctorNodes: GraphNode[] = [
    {
      id: 'dr_sen',
      label: 'Dr. Radhika Sen',
      type: 'doctor',
      subType: 'Lead Internal Med',
      degree: 'MD Internal Med (AIIMS)',
      color: '#10b981', // Emerald
      radius: 24,
      x: 350,
      y: 220,
      description: 'MDT Board Lead. Evaluates multi-system chronic disease coordination and triage.',
      details: {
        Affiliation: 'AIIMS New Delhi',
        Specialty: 'Internal Medicine & Polypharmacy',
        Role: 'Board Moderator & Synthesis Lead'
      }
    },
    {
      id: 'dr_kumar',
      label: 'Dr. Arvind Kumar',
      type: 'doctor',
      subType: 'Cardiologist',
      degree: 'DM Cardiology (FACC)',
      color: '#f43f5e', // Rose
      radius: 22,
      x: 200,
      y: 150,
      description: 'Focuses on atherogenic dyslipidemia, coronary risk scoring, and hemodynamics.',
      details: {
        Affiliation: 'Fortis Escorts Heart Institute',
        Specialty: 'Interventional & Preventive Cardiology',
        KeyConcern: 'Atherosclerotic cardiovascular disease (ASCVD) risk'
      }
    },
    {
      id: 'dr_reddy',
      label: 'Dr. Sneha Reddy',
      type: 'doctor',
      subType: 'Endocrinologist',
      degree: 'DM Endocrinology',
      color: '#8b5cf6', // Violet
      radius: 22,
      x: 500,
      y: 140,
      description: 'Expert in glycemic regulation, insulin resistance, and metabolic syndrome.',
      details: {
        Affiliation: 'Apollo Health City',
        Specialty: 'Endocrinology & Diabetology',
        KeyConcern: 'Persistent glucotoxicity & glycemic variability'
      }
    },
    {
      id: 'dr_ali',
      label: 'Dr. Farooq Ali',
      type: 'doctor',
      subType: 'Pathologist',
      degree: 'MD Pathology',
      color: '#f59e0b', // Amber
      radius: 20,
      x: 180,
      y: 330,
      description: 'Interprets reference range variance, specimen hemolysis, and cell indices.',
      details: {
        Affiliation: 'Tata Memorial Centre',
        Specialty: 'Biochemistry & Laboratory Medicine',
        KeyConcern: 'Sample integrity & De Ritis AST/ALT ratio'
      }
    },
    {
      id: 'dr_iyer',
      label: 'Dr. Ananya Iyer',
      type: 'doctor',
      subType: 'Pharmacologist',
      degree: 'PharmD, BCPS',
      color: '#14b8a6', // Teal
      radius: 20,
      x: 520,
      y: 320,
      description: 'Clinical pharmacologist analyzing drug metabolism, liver clearance, and drug safety.',
      details: {
        Affiliation: 'Manipal Hospital Institute of Medical Sciences',
        Specialty: 'Clinical Pharmacology & Nutrition',
        KeyConcern: 'Hepatic-renal drug clearance and NSAID toxicity'
      }
    }
  ];

  nodes.push(...doctorNodes);

  // 2. Biomarker Nodes (Derived from Report)
  const biomarkerPositions = [
    { x: 450, y: 70 },
    { x: 570, y: 190 },
    { x: 350, y: 390 },
    { x: 120, y: 220 },
    { x: 140, y: 100 },
    { x: 350, y: 80 }
  ];

  report.biomarkers.forEach((b, idx) => {
    const pos = biomarkerPositions[idx % biomarkerPositions.length];
    const isCritical = b.status === 'critical_high' || b.status === 'critical_low';
    const isBorderline = b.status === 'borderline';

    nodes.push({
      id: `bio_${b.id}`,
      label: `${b.name} (${b.value} ${b.unit})`,
      type: 'biomarker',
      subType: b.category,
      value: `${b.value} ${b.unit}`,
      status: b.status,
      color: isCritical ? '#ef4444' : isBorderline ? '#f59e0b' : '#3b82f6',
      radius: isCritical ? 18 : 14,
      x: pos.x + (idx % 2 === 0 ? 30 : -30),
      y: pos.y + (idx % 3 === 0 ? 20 : -20),
      description: `${b.plainEnglish} Normal range: ${b.minNormal} - ${b.maxNormal} ${b.unit}`,
      details: {
        PatientValue: `${b.value} ${b.unit}`,
        ReferenceRange: `${b.minNormal} - ${b.maxNormal} ${b.unit}`,
        Status: b.status.toUpperCase(),
        Analogy: b.analogy
      }
    });

    // Connect appropriate doctors to biomarkers
    if (b.category === 'Glycemic') {
      edges.push({
        id: `e_dr_reddy_bio_${b.id}`,
        source: 'dr_reddy',
        target: `bio_${b.id}`,
        label: 'ANALYZES_GLYCEMIA',
        type: 'evaluates',
        color: '#8b5cf6',
        fact: `Dr. Reddy evaluates ${b.name} at ${b.value} ${b.unit} for insulin resistance and pancreatic exhaustion.`,
        confidence: 0.98,
        timestamp: 'Round 1: 00:12s'
      });
    } else if (b.category === 'Lipid' || b.category === 'Cardiac') {
      edges.push({
        id: `e_dr_kumar_bio_${b.id}`,
        source: 'dr_kumar',
        target: `bio_${b.id}`,
        label: 'ASSESSES_CARDIAC_RISK',
        type: 'evaluates',
        color: '#f43f5e',
        fact: `Dr. Kumar maps ${b.name} (${b.value} ${b.unit}) to calculate 10-year ASCVD atheroma risk.`,
        confidence: 0.95,
        timestamp: 'Round 1: 00:18s'
      });
    } else if (b.category === 'Hepatic') {
      edges.push({
        id: `e_dr_iyer_bio_${b.id}`,
        source: 'dr_iyer',
        target: `bio_${b.id}`,
        label: 'CHECKS_HEPATIC_LOAD',
        type: 'warns',
        color: '#14b8a6',
        fact: `Dr. Iyer verifies liver enzyme ${b.name} at ${b.value} ${b.unit} to prevent toxic drug accumulation.`,
        confidence: 0.96,
        timestamp: 'Round 1: 00:24s'
      });
      edges.push({
        id: `e_dr_ali_bio_${b.id}`,
        source: 'dr_ali',
        target: `bio_${b.id}`,
        label: 'VALIDATES_ASSAY',
        type: 'evaluates',
        color: '#f59e0b',
        fact: `Dr. Ali confirms specimen was non-hemolyzed and ALT assay calibration is valid.`,
        confidence: 0.99,
        timestamp: 'Round 1: 00:08s'
      });
    } else {
      edges.push({
        id: `e_dr_sen_bio_${b.id}`,
        source: 'dr_sen',
        target: `bio_${b.id}`,
        label: 'SYSTEMIC_SURVEILLANCE',
        type: 'evaluates',
        color: '#10b981',
        fact: `Dr. Sen evaluates baseline metabolic stability for ${b.name}.`,
        confidence: 0.94,
        timestamp: 'Round 1: 00:30s'
      });
    }
  });

  // 3. Clinical Diagnosis & Condition Nodes (Synthesized by the MDT)
  const conditionNodes: GraphNode[] = [
    {
      id: 'diag_metabolic',
      label: report.id.includes('cardiac')
        ? 'Acute Myocardial Distress'
        : report.id.includes('anemia')
        ? 'Microcytic Iron Deficiency'
        : 'Metabolic Syndrome / NAFLD',
      type: 'diagnosis',
      color: '#e11d48',
      radius: 17,
      x: 350,
      y: 300,
      description: 'Synergistic diagnosis synthesized from multi-biomarker convergence.',
      details: {
        Severity: report.consensusSummary.overallRisk,
        BoardConsensus: `${report.consensusSummary.consensusScore}%`,
        DiagnosticCategory: 'Primary Clinical Impression'
      }
    },
    {
      id: 'treat_action_plan',
      label: 'Specialist Action Protocol',
      type: 'treatment',
      color: '#06b6d4',
      radius: 16,
      x: 460,
      y: 240,
      description: 'Prioritized pharmacological, diagnostic and lifestyle action sheet.',
      details: {
        PrimaryStep: report.consensusSummary.multidisciplinaryActionPlan[0] || 'Clinical Review',
        NextReview: '4 - 6 Weeks'
      }
    }
  ];
  nodes.push(...conditionNodes);

  // 4. Cross-Specialty Doctor Debate Edges (The MiroFish Agent Deliberation Edges!)
  edges.push(
    {
      id: 'e_debate_kumar_reddy',
      source: 'dr_kumar',
      target: 'dr_reddy',
      label: 'CHALLENGES_PRIORITY',
      type: 'challenges',
      color: '#ec4899',
      fact: 'Dr. Kumar argues: "Atherogenic dyslipidemia poses higher immediate mortality than isolated mild hyperglycemia. Cardioprotective therapy must precede glycemic titration."',
      confidence: 0.92,
      timestamp: 'Round 2: 01:14s'
    },
    {
      id: 'e_debate_iyer_kumar',
      source: 'dr_iyer',
      target: 'dr_kumar',
      label: 'WARNS_LIVER_LIMIT',
      type: 'warns',
      color: '#f97316',
      fact: 'Dr. Iyer intervenes: "Elevated SGPT indicates ongoing hepatocellular irritation. High-dose lipophilic statins carry risk of drug-induced transaminitis; recommend moderate dose + LFT monitoring."',
      confidence: 0.97,
      timestamp: 'Round 2: 01:45s'
    },
    {
      id: 'e_debate_sen_consensus',
      source: 'dr_sen',
      target: 'diag_metabolic',
      label: 'SYNTHESIZES_CONSENSUS',
      type: 'diagnoses',
      color: '#10b981',
      fact: `Dr. Sen unifies the board: "Confirmed multi-organ interaction. Primary action protocol formulated with ${report.consensusSummary.consensusScore}% consensus."`,
      confidence: 0.98,
      timestamp: 'Round 3: 02:10s'
    },
    {
      id: 'e_diag_to_treat',
      source: 'diag_metabolic',
      target: 'treat_action_plan',
      label: 'INITIATES_PROTOCOL',
      type: 'prescribes',
      color: '#06b6d4',
      fact: 'Direct linkage from unified clinical impression to the 1-Page Pre-Consultation Doctor Brief.',
      confidence: 0.99,
      timestamp: 'Round 3: 02:30s'
    }
  );

  return { nodes, edges };
}
