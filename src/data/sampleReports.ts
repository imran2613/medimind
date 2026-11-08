import type { DoctorAgent, LabReportData } from '../types/medical';

export const VIRTUAL_DOCTORS: DoctorAgent[] = [
  {
    id: 'dr_sen',
    name: 'Dr. Radhika Sen',
    title: 'MD, Internal Medicine (AIIMS)',
    specialty: 'Board Lead & Clinical Triage',
    hospital: 'All India Institute of Medical Sciences (AIIMS)',
    avatarColor: 'bg-emerald-600',
    avatarIcon: 'Stethoscope',
    badge: 'Triage Lead',
    bio: 'Specializes in multi-system chronic disease coordination, renal clearance evaluation, and clinical triage.'
  },
  {
    id: 'dr_kumar',
    name: 'Dr. Arvind Kumar',
    title: 'DM, Cardiology (FACC)',
    specialty: 'Cardiovascular Hemodynamics & Electrolytes',
    hospital: 'Fortis Escorts Heart Institute',
    avatarColor: 'bg-rose-600',
    avatarIcon: 'HeartPulse',
    badge: 'Cardiology',
    bio: 'Evaluates fluid balance, serum sodium/potassium arrhythmias, and cardiovascular load.'
  },
  {
    id: 'dr_reddy',
    name: 'Dr. Sneha Reddy',
    title: 'DM, Endocrinology & Metabolism',
    specialty: 'Metabolic & Electrolyte Homeostasis',
    hospital: 'Apollo Hospitals Health City',
    avatarColor: 'bg-indigo-600',
    avatarIcon: 'Activity',
    badge: 'Endocrinology',
    bio: 'Focuses on hormonal fluid regulation, bone-mineral calcium balance, and metabolic turnover.'
  },
  {
    id: 'dr_ali',
    name: 'Dr. Farooq Ali',
    title: 'MD, Pathology & Biochemistry',
    specialty: 'Laboratory Medicine & Renal Indices',
    hospital: 'Tata Memorial Centre',
    avatarColor: 'bg-amber-600',
    avatarIcon: 'FlaskConical',
    badge: 'Pathology',
    bio: 'Interprets BUN/Creatinine ratios, eGFR equations, and laboratory reference interval variations.'
  },
  {
    id: 'dr_iyer',
    name: 'Dr. Ananya Iyer',
    title: 'PharmD, BCPS (Clinical Pharmacology)',
    specialty: 'Nephrotoxic Drug Review & Hydration',
    hospital: 'Manipal Hospital Institute of Medical Sciences',
    avatarColor: 'bg-teal-600',
    avatarIcon: 'Pill',
    badge: 'Pharmacology',
    bio: 'Reviews medication dosages against renal filtration rates and advises on hydration/muscle mass factors.'
  }
];

export const SAMPLE_REPORTS: Record<string, LabReportData> = {
  kft_sample: {
    id: 'rep_kft_1001',
    patientName: 'Mr. Sample Report',
    age: 22,
    gender: 'Male',
    reportDate: '11 Mar 2026',
    labName: 'Labsmart Software Pathology Lab (Reg. 1001)',
    sampleType: 'Serum / Venous Blood (KFT)',
    biomarkers: [
      {
        id: 'serum_urea',
        name: 'Serum Urea',
        category: 'Renal',
        value: 17,
        unit: 'mg/dL',
        minNormal: 19,
        maxNormal: 45,
        status: 'borderline',
        plainEnglish: 'A waste product from protein breakdown cleared by kidneys.',
        analogy: 'Urea is slightly low. In a young 22-year-old male, this is very common with low dietary protein intake or drinking lots of water.'
      },
      {
        id: 'serum_creatinine',
        name: 'Serum Creatinine',
        category: 'Renal',
        value: 0.69,
        unit: 'mg/dL',
        minNormal: 0.72,
        maxNormal: 1.18,
        status: 'borderline',
        plainEnglish: 'Waste formed from normal muscle breakdown and filtered by kidneys.',
        analogy: 'Low creatinine (0.69) indicates your kidneys are clearing waste easily, or your lean muscle mass/protein diet is modest.'
      },
      {
        id: 'egfr',
        name: 'eGFR (Glomerular Filtration Rate)',
        category: 'Renal',
        value: 134.19,
        unit: 'mL/min/1.73m²',
        minNormal: 90,
        maxNormal: 160,
        status: 'normal',
        plainEnglish: 'The master speedometer of your kidney filtering capacity.',
        analogy: 'Your kidney water filters are running at full 100% capacity (Category G1 - Optimal Health).'
      },
      {
        id: 'bun',
        name: 'BUN (Blood Urea Nitrogen)',
        category: 'Renal',
        value: 7.94,
        unit: 'mg/dL',
        minNormal: 7.9,
        maxNormal: 20.0,
        status: 'normal',
        plainEnglish: 'Measures nitrogen in blood from urea.',
        analogy: 'Safely at the baseline of healthy reference values.'
      },
      {
        id: 'serum_potassium',
        name: 'Serum Potassium (K+)',
        category: 'Electrolyte',
        value: 4.2,
        unit: 'mmol/L',
        minNormal: 3.5,
        maxNormal: 5.1,
        status: 'normal',
        plainEnglish: 'Vital mineral regulating heartbeat rhythm and nerve impulses.',
        analogy: 'Your heart electrical electrolyte is in the perfect sweet spot.'
      },
      {
        id: 'serum_sodium',
        name: 'Serum Sodium (Na+)',
        category: 'Electrolyte',
        value: 139,
        unit: 'mmol/L',
        minNormal: 136,
        maxNormal: 146,
        status: 'normal',
        plainEnglish: 'Governs bodily water balance and cellular hydration.',
        analogy: 'Hydration and salt levels are balanced.'
      },
      {
        id: 'serum_calcium',
        name: 'Serum Calcium',
        category: 'Electrolyte',
        value: 8.9,
        unit: 'mg/dL',
        minNormal: 8.8,
        maxNormal: 10.6,
        status: 'normal',
        plainEnglish: 'Essential for bones, muscles, and cellular signaling.',
        analogy: 'Normal circulating calcium level.'
      },
      {
        id: 'serum_uric_acid',
        name: 'Serum Uric Acid',
        category: 'Renal',
        value: 5.5,
        unit: 'mg/dL',
        minNormal: 3.5,
        maxNormal: 7.2,
        status: 'normal',
        plainEnglish: 'Byproduct of purines; elevated levels cause gout.',
        analogy: 'Completely normal, zero risk of gout or uric acid crystal formation.'
      }
    ],
    boardDeliberations: [
      {
        id: 'k_delib_1',
        doctorId: 'dr_sen',
        round: 'round1_specialist',
        roundTitle: 'Round 1: Triage Assessment',
        speech: 'Reviewing Mr. Sample Report, 22-year-old male: Renal filtration is hyper-efficient with an eGFR of 134.19 mL/min (Category G1). Serum Urea (17 mg/dL) and Creatinine (0.69 mg/dL) are slightly below the lower reference limit, which is clinically benign.',
        tone: 'objective',
        keyConcern: 'Excellent renal function; rule out low protein intake vs high hydration.'
      },
      {
        id: 'k_delib_2',
        doctorId: 'dr_ali',
        round: 'round1_specialist',
        roundTitle: 'Round 1: Pathology & Index Review',
        speech: 'The Urea/Creatinine ratio is 24.64 and BUN/Creatinine ratio is 11.51. In a 22-year-old, low creatinine of 0.69 mg/dL generally correlates with lower muscle bulk or a strictly vegetarian diet. No signs of glomerulonephritis or tubular dysfunction.',
        tone: 'objective',
        keyConcern: 'Urea and creatinine lower boundary represents dietary or muscle mass factors.'
      },
      {
        id: 'k_delib_3',
        doctorId: 'dr_kumar',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Review',
        speech: 'From a cardiovascular perspective, the electrolyte panel is immaculate: Potassium is 4.2 mmol/L (optimal range 3.5-5.1) and Sodium is 139 mmol/L. There is zero risk of arrhythmia or fluid overload.',
        tone: 'consensus',
        keyConcern: 'Electrolyte homeostasis is intact and stable.'
      },
      {
        id: 'k_delib_4',
        doctorId: 'dr_iyer',
        round: 'round2_debate',
        roundTitle: 'Round 2: Pharmacology & Nutrition',
        speech: 'Agree with Dr. Ali. Low urea and creatinine are common in healthy young adults who drink ample fluids or consume lower dietary meat/protein. No nephrotoxic drug restrictions are required. We should reassure the patient that "Low" here is not dangerous.',
        tone: 'consensus',
        keyConcern: 'Reassurance: Low creatinine is not kidney damage; high creatinine would be concerning.'
      },
      {
        id: 'k_delib_5',
        doctorId: 'dr_sen',
        round: 'round3_consensus',
        roundTitle: 'Round 3: Board Consensus Plan',
        speech: 'Board Verdict: Optimal Kidney Health (98% Consensus). The patient does not require any medications. Advise maintaining balanced dietary protein and hydration.',
        tone: 'consensus',
        keyConcern: 'Reassure patient; healthy renal status confirmed.'
      }
    ],
    consensusSummary: {
      overallRisk: 'LOW',
      consensusScore: 98,
      primaryFindings: [
        'Optimal kidney filtration capacity (eGFR 134.19 mL/min - G1 category).',
        'Slightly low Serum Urea (17 mg/dL) and Creatinine (0.69 mg/dL), typical for young healthy individuals with lean build or good hydration.',
        'Normal electrolyte balance (Sodium 139 mmol/L, Potassium 4.2 mmol/L).'
      ],
      multidisciplinaryActionPlan: [
        'Reassure patient: Unlike high creatinine (which signals kidney strain), low creatinine is medically safe.',
        'Maintain balanced daily hydration (2.5 to 3 liters water).',
        'Ensure adequate dietary protein intake (lentils, paneer, eggs, dairy) if feeling fatigued.',
        'Routine health checkup after 12 months.'
      ]
    },
    doctorQuestions: [
      {
        id: 'kq1',
        specialistId: 'dr_sen',
        specialistTitle: 'Internal Medicine',
        category: 'Diagnostics',
        priority: 'MEDIUM',
        question: 'My Serum Creatinine is 0.69 mg/dL (marked Low). Does this mean my kidneys are working fine, and is this related to my diet or muscle mass?',
        rationale: 'Reassures patient that low creatinine is harmless, unlike high creatinine.'
      },
      {
        id: 'kq2',
        specialistId: 'dr_iyer',
        specialistTitle: 'Nutrition',
        category: 'Lifestyle',
        priority: 'MEDIUM',
        question: 'My Serum Urea is 17 mg/dL. Should I increase my daily protein intake (lentils, eggs, sprouts, dairy)?',
        rationale: 'Helps young adults balance nutritional protein.'
      },
      {
        id: 'kq3',
        specialistId: 'dr_kumar',
        specialistTitle: 'Cardiology',
        category: 'Diagnostics',
        priority: 'MEDIUM',
        question: 'Are my Potassium (4.2 mmol/L) and Sodium (139 mmol/L) within healthy ranges for my age?',
        rationale: 'Confirms electrolyte and hydration balance.'
      }
    ],
    vernacular: {
      en: {
        text: 'Your Kidney Function Test (KFT) shows excellent kidney health with an eGFR of 134. Urea and Creatinine are slightly low, which is completely safe and common in healthy young adults.',
        simple: 'Great news! Your kidneys are filtering water and waste easily. The test marked "Low" on Urea and Creatinine simply means you have very little waste in your blood and are well-hydrated. There is zero reason to worry.'
      },
      hi: {
        title: 'आपकी किडनी फंक्शन टेस्ट (KFT) रिपोर्ट',
        text: 'आपकी किडनी फंक्शन टेस्ट रिपोर्ट बहुत अच्छी है। eGFR 134 है। यूरिया (17) और क्रिएटिनिन (0.69) थोड़े कम हैं, जो 22 वर्ष के स्वस्थ युवाओं में बिल्कुल सामान्य और सुरक्षित है।',
        simple: 'अच्छी खबर! आपकी किडनी बेहतरीन तरीके से काम कर रही है। रिपोर्ट में यूरिया और क्रिएटिनिन का कम होना किसी बीमारी का संकेत नहीं है, बल्कि यह दिखाता है कि आप पर्याप्त पानी पी रहे हैं। चिंता की कोई बात नहीं है।'
      },
      te: {
        title: 'మీ కిడ్నీ పనితీరు పరీక్ష (KFT) ఫలితం',
        text: 'మీ కిడ్నీ ఫంక్షన్ టెస్ట్ రిపోర్ట్ చాలా బాగుంది. eGFR 134 తో కిడ్నీలు అత్యుత్తమంగా పనిచేస్తున్నాయి. యూరియా మరియు క్రియాటినిన్ కొద్దిగా తక్కువగా ఉండటం పూర్తిగా సురక్షితం.',
        simple: 'మంచి వార్త! మీ కిడ్నీల వడపోత సామర్థ్యం అద్భుతంగా ఉంది. యూరియా మరియు క్రియాటినిన్ తక్కువగా ఉన్నాయని భయపడాల్సిన అవసరం లేదు. మీరు బాగా నీరు తాగుతున్నారని మరియు కిడ్నీలపై ఎటువంటి ఒత్తిడి లేదని ఇది సూచిస్తుంది.'
      }
    },
    trendData: [
      { date: 'Sep 2025', label: '6 Months Ago', sgpt: 18, hba1c: 5.1 },
      { date: 'Dec 2025', label: '3 Months Ago', sgpt: 19, hba1c: 5.1 },
      { date: 'Mar 2026', label: 'Current KFT', sgpt: 20, hba1c: 5.2 }
    ]
  },

  metabolic: {
    id: 'rep_metabolic_01',
    patientName: 'Rajesh Sharma',
    age: 48,
    gender: 'Male',
    reportDate: '08 Nov 2026',
    labName: 'Dr. Lal PathLabs, Hyderabad',
    sampleType: 'Fasting Venous Blood & Plasma',
    biomarkers: [
      {
        id: 'hba1c',
        name: 'HbA1c (Glycated Hemoglobin)',
        category: 'Glycemic',
        value: 7.8,
        unit: '%',
        minNormal: 4.0,
        maxNormal: 5.6,
        status: 'critical_high',
        plainEnglish: 'Measures your average blood sugar over the last 3 months.',
        analogy: 'Imagine your red blood cells as glazed donuts. Right now, there is too much sticky sugar coating on them.'
      },
      {
        id: 'fbs',
        name: 'Fasting Blood Sugar (Glucose)',
        category: 'Glycemic',
        value: 164,
        unit: 'mg/dL',
        minNormal: 70,
        maxNormal: 99,
        status: 'critical_high',
        plainEnglish: 'Blood sugar after an overnight fast (minimum 8-10 hours).',
        analogy: 'Like traffic backing up before a toll gate; your cells are not opening their gates to take in sugar.'
      },
      {
        id: 'sgpt',
        name: 'SGPT / ALT (Alanine Aminotransferase)',
        category: 'Hepatic',
        value: 74,
        unit: 'U/L',
        minNormal: 10,
        maxNormal: 45,
        status: 'borderline',
        plainEnglish: 'An enzyme produced inside liver cells. High levels indicate liver inflammation.',
        analogy: 'Smoke alarms inside your liver factory showing that fat deposits are causing slight irritation.'
      },
      {
        id: 'triglycerides',
        name: 'Serum Triglycerides',
        category: 'Lipid',
        value: 242,
        unit: 'mg/dL',
        minNormal: 50,
        maxNormal: 150,
        status: 'critical_high',
        plainEnglish: 'The most common type of fat stored in your bloodstream after meals.',
        analogy: 'Excess cooking oil floating in your blood vessels that needs to be cleared.'
      },
      {
        id: 'hdl',
        name: 'HDL Cholesterol (Good Cholesterol)',
        category: 'Lipid',
        value: 36,
        unit: 'mg/dL',
        minNormal: 40,
        maxNormal: 60,
        status: 'borderline',
        plainEnglish: 'Scavenger cholesterol that sweeps away fatty plaque from artery walls.',
        analogy: 'Your bloodstream garbage trucks are understaffed and need to be boosted by exercise and healthy fats.'
      },
      {
        id: 'creatinine',
        name: 'Serum Creatinine',
        category: 'Renal',
        value: 0.95,
        unit: 'mg/dL',
        minNormal: 0.7,
        maxNormal: 1.3,
        status: 'normal',
        plainEnglish: 'Waste product filtered out completely by healthy kidneys.',
        analogy: 'Your kidney water filters are functioning cleanly with zero clogs.'
      }
    ],
    boardDeliberations: [
      {
        id: 'delib_1',
        doctorId: 'dr_sen',
        round: 'round1_specialist',
        roundTitle: 'Round 1: Initial Clinical Impressions',
        speech: 'Colleagues, Rajesh presents with classic features of uncontrolled Type-2 Diabetes co-existing with Grade 1 Hepatic Steatosis (Fatty Liver). Renal function is happily intact (Creatinine 0.95 mg/dL), but his cardiovascular atherogenic risk is escalating.',
        tone: 'objective',
        keyConcern: 'Uncontrolled glycemic load combined with hepatic enzyme leakage.'
      },
      {
        id: 'delib_2',
        doctorId: 'dr_reddy',
        round: 'round1_specialist',
        roundTitle: 'Round 1: Initial Clinical Impressions',
        speech: 'Looking closely at HbA1c 7.8% and Fasting 164 mg/dL: this is not acute stress hyperglycemia; it represents continuous glucotoxicity over 90+ days. Insulin resistance is high, compounded by visceral adiposity.',
        tone: 'warning',
        keyConcern: 'Continuous glucotoxicity requiring pharmacotherapy review.'
      },
      {
        id: 'delib_3',
        doctorId: 'dr_kumar',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Debate & Friction',
        speech: 'Dr. Reddy, while glycemic control is urgent, look at his lipid ratio: Triglycerides at 242 mg/dL paired with an HDL of 36 mg/dL produces high small dense LDL (sdLDL) particles. In an Indian male aged 48, his 10-year ASCVD risk is sharply elevated. We must discuss starting statin therapy, not just an oral hypoglycemic.',
        tone: 'challenging',
        keyConcern: 'High risk of microvascular disease and coronary plaque formation.',
        disagreesWith: ['Focusing purely on blood sugar without lipid cardioprotection']
      },
      {
        id: 'delib_4',
        doctorId: 'dr_iyer',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Debate & Friction',
        speech: 'Hold on, Dr. Kumar and Dr. Reddy! Before we load him with high-dose Atorvastatin and Metformin, note SGPT is 74 U/L. The liver is already inflamed. We need liver-safe dosing, and the patient must be warned against self-medicating with over-the-counter paracetamol or NSAIDs for fatigue.',
        tone: 'warning',
        keyConcern: 'Hepatic enzyme elevation limits aggressive drug metabolism without monitoring.',
        agreesWith: ['Dr. Sen']
      },
      {
        id: 'delib_5',
        doctorId: 'dr_ali',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Debate & Friction',
        speech: 'From the laboratory diagnostic standpoint: The sample shows no hemolysis. Fasting was verified at 10 hours. The De Ritis ratio (AST/ALT) suggests metabolic fatty liver rather than alcoholic or toxic injury. A baseline Ultrasound Abdomen will corroborate fatty liver grading.',
        tone: 'objective',
        keyConcern: 'Recommend abdominal sonogram to stage non-alcoholic fatty liver.'
      },
      {
        id: 'delib_6',
        doctorId: 'dr_sen',
        round: 'round3_consensus',
        roundTitle: 'Round 3: Multi-Specialist Consensus Plan',
        speech: 'We have board consensus: 1) Initiate dual metabolic-cardiovascular protection with his primary physician; 2) Monitor SGPT at the 6-week mark before escalating statins; 3) Prioritize high-fiber low-glycemic dietary modifications; 4) Arm the patient with 4 specific questions for his 3-minute in-person consultation.',
        tone: 'consensus',
        keyConcern: 'Consensus reached at 96% board alignment.'
      }
    ],
    consensusSummary: {
      overallRisk: 'HIGH',
      consensusScore: 96,
      primaryFindings: [
        'Persistent hyperglycemia (HbA1c 7.8%) indicating Type-2 Diabetes needing therapy adjustment.',
        'Metabolic-associated fatty liver pattern evidenced by elevated SGPT (74 U/L).',
        'Dyslipidemia with high Triglycerides (242 mg/dL) elevating cardiovascular risk.'
      ],
      multidisciplinaryActionPlan: [
        'Consult primary physician for oral anti-diabetic medication adjustment.',
        'Schedule Abdominal Ultrasound to evaluate grade of fatty liver infiltration.',
        'Incorporate 30 minutes of brisk walking daily and reduce refined carbohydrates (white rice, sugar, maida).',
        'Avoid self-administered painkillers without physician clearance due to elevated liver enzymes.'
      ]
    },
    doctorQuestions: [
      {
        id: 'q1',
        specialistId: 'dr_reddy',
        specialistTitle: 'Endocrinology',
        category: 'Medication',
        priority: 'CRITICAL',
        question: 'My HbA1c is 7.8% and Fasting Sugar is 164 mg/dL. Should we adjust my current dosage or add an SGLT-2 inhibitor / Metformin?',
        rationale: 'Directly addresses glycemic escalation so the doctor can make immediate prescription decisions.'
      },
      {
        id: 'q2',
        specialistId: 'dr_kumar',
        specialistTitle: 'Cardiology',
        category: 'Diagnostics',
        priority: 'HIGH',
        question: 'My Triglycerides are 242 mg/dL with low HDL (36 mg/dL). Do you recommend starting a mild statin or doing an ECG/echo screening?',
        rationale: 'Triggers cardiovascular risk mitigation early before arterial calcification.'
      },
      {
        id: 'q3',
        specialistId: 'dr_iyer',
        specialistTitle: 'Pharmacology',
        category: 'Warning Signs',
        priority: 'HIGH',
        question: 'With my SGPT at 74 U/L, are there any common headache or pain relief medicines (like Paracetamol or Diclofenac) that I should avoid?',
        rationale: 'Prevents drug-induced acute-on-chronic liver injury.'
      },
      {
        id: 'q4',
        specialistId: 'dr_ali',
        specialistTitle: 'Pathology',
        category: 'Diagnostics',
        priority: 'MEDIUM',
        question: 'Should I get an Ultrasound of the abdomen done to check the stage of fatty liver, and when should we repeat these blood tests?',
        rationale: 'Establishes clear follow-up timeline (typically 6-8 weeks).'
      }
    ],
    vernacular: {
      en: {
        text: 'Your blood test indicates elevated blood sugar (HbA1c 7.8%) and mild liver irritation with high blood fats. Your kidneys are functioning normally.',
        simple: 'Think of sugar and fats like grease in water pipes. Currently, there is too much sugar and fat floating in your blood, and your liver is working overtime. The doctors recommend a medicine checkup, cutting back sweets and deep-fried snacks, and daily 30-minute walks.'
      },
      hi: {
        title: 'आसान शब्दों में आपकी रिपोर्ट का मतलब',
        text: 'आपकी रिपोर्ट में ब्लड शुगर (HbA1c 7.8%) और लिवर एंजाइम (SGPT 74) बढ़े हुए हैं। ट्राइग्लिसराइड्स (खून में वसा) भी अधिक है। आपकी किडनी बिल्कुल सुरक्षित है।',
        simple: 'सरल भाषा में समझिए: आपके खून में चीनी और चिकनाई की मात्रा सामान्य से ज्यादा है, जिससे लिवर पर हल्का दबाव पड़ रहा है। डॉक्टरों की सलाह है कि डॉक्टर से मिलकर दवा एडजस्ट करवाएं, मीठा और तला-भुना कम करें, और रोज 30 मिनट तेज चलें।'
      },
      te: {
        title: 'సులభమైన మాటల్లో మీ రక్త పరీక్ష ఫలితం',
        text: 'మీ రక్త పరీక్షలో చక్కెర స్థాయి (HbA1c 7.8%) మరియు కాలేయ ఎంజైమ్ (SGPT 74) పెరిగాయి. రక్తంలో కొవ్వు (ట్రైగ్లిజరైడ్స్) కూడా ఎక్కువగా ఉంది. కిడ్నీల పనితీరు పూర్తిగా బాగుంది.',
        simple: 'సులభంగా చెప్పాలంటే: మీ రక్తంలో చక్కెర, కొవ్వు పరిమాణం ఎక్కువై కాలేయంపై ఒత్తిడి పడుతోంది. వెంటనే వైద్యుడిని సంప్రదించి మందుల మోతాదును సరిచేయించుకోండి, తీపి పదార్థాలు మరియు నూనె వస్తువులు తగ్గించి, రోజుకు 30 నిమిషాలు నడవండి.'
      }
    },
    trendData: [
      { date: 'May 2026', label: '6 Months Ago', hba1c: 6.9, sgpt: 52, cholesterol: 210 },
      { date: 'Aug 2026', label: '3 Months Ago', hba1c: 7.3, sgpt: 61, cholesterol: 228 },
      { date: 'Nov 2026', label: 'Current Report', hba1c: 7.8, sgpt: 74, cholesterol: 242 }
    ]
  },

  critical_cardiac: {
    id: 'rep_cardiac_02',
    patientName: 'Kameshwar Rao',
    age: 62,
    gender: 'Male',
    reportDate: '08 Nov 2026',
    labName: 'Emergency Biochemistry Lab, Apollo Jubilee Hills',
    sampleType: 'STAT Whole Blood (Emergency)',
    emergencyAlert: {
      isCritical: true,
      title: '🚨 CRITICAL ALERT: Immediate Emergency Medical Attention Required',
      description: 'Significantly elevated cardiac necrosis marker (Troponin-I: 0.52 ng/mL) and high Potassium (6.2 mEq/L) detected. This pattern indicates acute myocardial injury / impending cardiac event and dangerous cardiac arrhythmia risk.',
      triggerBiomarkers: ['Troponin-I: 0.52 ng/mL (Normal < 0.04)', 'Serum Potassium: 6.2 mEq/L (Normal 3.5 - 5.0)'],
      actionRequired: 'Do NOT wait for a routine clinic appointment. Proceed to the nearest hospital Emergency Room (ER/ICU) immediately. Call 108 or have an escort drive you.'
    },
    biomarkers: [
      {
        id: 'troponin',
        name: 'High Sensitivity Troponin-I',
        category: 'Cardiac',
        value: 0.52,
        unit: 'ng/mL',
        minNormal: 0.0,
        maxNormal: 0.04,
        minCritical: 0.1,
        status: 'critical_high',
        plainEnglish: 'A protein released into the blood ONLY when heart muscle cells suffer acute damage.',
        analogy: 'The SOS alarm of your heart muscle. Its presence in blood means heart cells are under extreme stress or oxygen starvation.'
      },
      {
        id: 'potassium',
        name: 'Serum Potassium (K+)',
        category: 'Electrolyte',
        value: 6.2,
        unit: 'mEq/L',
        minNormal: 3.5,
        maxNormal: 5.0,
        minCritical: 6.0,
        status: 'critical_high',
        plainEnglish: 'Crucial mineral that regulates the electrical heartbeat rhythm.',
        analogy: 'High potassium is like a power surge to your heart rhythm electrical circuit, requiring urgent hospital stabilization.'
      },
      {
        id: 'creatinine',
        name: 'Serum Creatinine',
        category: 'Renal',
        value: 2.1,
        unit: 'mg/dL',
        minNormal: 0.7,
        maxNormal: 1.3,
        status: 'critical_high',
        plainEnglish: 'Kidney filtration efficiency marker.',
        analogy: 'The kidney filter is sluggish, causing waste and potassium to accumulate in blood.'
      },
      {
        id: 'hemoglobin',
        name: 'Hemoglobin',
        category: 'Hematology',
        value: 12.1,
        unit: 'g/dL',
        minNormal: 13.0,
        maxNormal: 17.0,
        status: 'borderline',
        plainEnglish: 'Oxygen-carrying protein in red blood cells.',
        analogy: 'Oxygen delivery vehicles are slightly lower than optimal.'
      }
    ],
    boardDeliberations: [
      {
        id: 'c_delib_1',
        doctorId: 'dr_kumar',
        round: 'round1_specialist',
        roundTitle: 'Round 1: EMERGENCY TRIAGE INTERVENTION',
        speech: 'EMERGENCY PROTOCOL ACTIVATION. Troponin-I is 0.52 ng/mL (>10x upper limit of normal). In an adult male with simultaneous Potassium of 6.2 mEq/L, this is Non-ST Elevation Myocardial Infarction (NSTEMI) or Acute Coronary Syndrome until proven otherwise.',
        tone: 'warning',
        keyConcern: 'Acute myocardial injury with lethal arrhythmia risk due to hyperkalemia.'
      },
      {
        id: 'c_delib_2',
        doctorId: 'dr_sen',
        round: 'round1_specialist',
        roundTitle: 'Round 1: EMERGENCY TRIAGE INTERVENTION',
        speech: 'Agreed Dr. Kumar. The platform must immediately override standard educational workflows and display a flashing Red Emergency Triage Directive. The patient must not be reading articles; they must be transported to an ER.',
        tone: 'warning',
        keyConcern: 'Zero delay acceptable. Immediate ECG and IV Calcium Gluconate required for cardiac membrane stabilization.'
      },
      {
        id: 'c_delib_3',
        doctorId: 'dr_iyer',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Debate',
        speech: 'Notice the acute rise in Creatinine to 2.1 mg/dL. This hyperkalemia is cardiogenic + renal clearance failure (Cardio-Renal Syndrome). If the patient is taking ACE inhibitors, ARBs, or Spironolactone, these must be stopped immediately by the ER physician.',
        tone: 'warning',
        keyConcern: 'Contraindicated potassium-sparing anti-hypertensives must be withheld.'
      },
      {
        id: 'c_delib_4',
        doctorId: 'dr_sen',
        round: 'round3_consensus',
        roundTitle: 'Round 3: Emergency Consensus Directive',
        speech: 'Unanimous board verdict: 100% Emergency Escalation. Platform emits audible audio alert in English, Hindi, and Telugu instructing the family to dial 108 or move to nearest ICU.',
        tone: 'consensus',
        keyConcern: 'Unanimous immediate emergency triage.'
      }
    ],
    consensusSummary: {
      overallRisk: 'CRITICAL',
      consensusScore: 100,
      primaryFindings: [
        'Acute cardiac marker release (Troponin-I 0.52 ng/mL) indicating heart muscle injury.',
        'Severe Hyperkalemia (Potassium 6.2 mEq/L) posing immediate heart rhythm disruption risk.',
        'Acute renal impairment (Creatinine 2.1 mg/dL) worsening electrolyte retention.'
      ],
      multidisciplinaryActionPlan: [
        'IMMEDIATE: Proceed to the nearest hospital emergency department.',
        'Obtain STAT 12-lead Electrocardiogram (ECG) and continuous telemetry monitoring.',
        'Urgent hyperkalemia stabilization (Calcium Gluconate + Insulin-Dextrose protocol).',
        'Emergency cardiology consult for bedside echocardiography and coronary angiography.'
      ]
    },
    doctorQuestions: [
      {
        id: 'cq1',
        specialistId: 'dr_kumar',
        specialistTitle: 'Cardiology',
        category: 'Medication',
        priority: 'CRITICAL',
        question: 'Doctor, my Troponin is 0.52 ng/mL and Potassium is 6.2 mEq/L. Do I need an immediate ECG and cardiac ICU bed right now?',
        rationale: 'Alerts the ER receiving physician to triage directly to the resuscitation bay.'
      },
      {
        id: 'cq2',
        specialistId: 'dr_iyer',
        specialistTitle: 'Pharmacology',
        category: 'Warning Signs',
        priority: 'CRITICAL',
        question: 'I am taking blood pressure medicines. Could any of my tablets (like Telmisartan or Spironolactone) be causing this high potassium?',
        rationale: 'Allows emergency doctors to immediately review the home drug list.'
      }
    ],
    vernacular: {
      en: {
        text: 'EMERGENCY: Your heart protein (Troponin) and Potassium are at dangerous critical levels. Go to the nearest Hospital Emergency Room immediately.',
        simple: '🚨 PLEASE DO NOT WAIT. Your heart muscle is signaling severe distress, and your blood potassium is dangerously high. Have someone drive you to the nearest hospital Emergency Room immediately.'
      },
      hi: {
        title: '🚨 अति आवश्यक आपातकालीन चेतावनी',
        text: 'इमरजेंसी: आपकी रिपोर्ट में ट्रोपोनिन और पोटैशियम का स्तर बेहद खतरनाक सीमा पर है। तुरंत नजदीकी अस्पताल के इमरजेंसी वार्ड में जाएं।',
        simple: '🚨 कृपया बिल्कुल देर न करें! आपके दिल पर भारी तनाव का संकेत मिला है और पोटैशियम का स्तर 6.2 हो गया है। तुरंत किसी परिजन के साथ पास के अस्पताल के इमरजेंसी (ICU) में जाएं। यह जानलेवा हो सकता है।'
      },
      te: {
        title: '🚨 అత్యవసర ప్రమాద హెచ్చరిక',
        text: 'అత్యవసరం: మీ నివేదికలో ట్రోపోనిన్ మరియు పొటాషియం ప్రమాదకర స్థాయిలో ఉన్నాయి. వెంటనే దగ్గరలోని ఆసుపత్రి అత్యవసర విభాగానికి (Emergency/ICU) వెళ్లండి.',
        simple: '🚨 దయచేసి క్షణం కూడా ఆలస్యం చేయవద్దు! మీ గుండె కండరాలపై తీవ్రమైన ఒత్తిడి ఏర్పడింది మరియు పొటాషియం స్థాయి ప్రమాదకరంగా పెరిగింది. వెంటనే దగ్గరలోని ఎమర్జెన్సీ విభాగానికి చేరుకోండి.'
      }
    }
  },

  anemia_deficiency: {
    id: 'rep_anemia_03',
    patientName: 'Priya Iyer',
    age: 29,
    gender: 'Female',
    reportDate: '08 Nov 2026',
    labName: 'Vijaya Diagnostic Centre, Bengaluru',
    sampleType: 'Whole Blood EDTA & Serum',
    biomarkers: [
      {
        id: 'hb',
        name: 'Hemoglobin',
        category: 'Hematology',
        value: 9.1,
        unit: 'g/dL',
        minNormal: 12.0,
        maxNormal: 15.5,
        status: 'critical_low',
        plainEnglish: 'The protein in red blood cells that transports oxygen to your brain and muscles.',
        analogy: 'Your internal oxygen delivery courier fleet is operating at only 65% capacity, causing fatigue, cold hands, and brain fog.'
      },
      {
        id: 'ferritin',
        name: 'Serum Ferritin',
        category: 'Hematology',
        value: 7.5,
        unit: 'ng/mL',
        minNormal: 15.0,
        maxNormal: 150.0,
        status: 'critical_low',
        plainEnglish: 'Your body’s long-term iron reserve bank.',
        analogy: 'Your body’s iron storage battery is running on empty (< 8%). You are using emergency reserves.'
      },
      {
        id: 'vit_d',
        name: '25-Hydroxy Vitamin D',
        category: 'Hematology',
        value: 12.8,
        unit: 'ng/mL',
        minNormal: 30.0,
        maxNormal: 100.0,
        status: 'critical_low',
        plainEnglish: 'Essential for bone density, mood, and immune system resilience.',
        analogy: 'Your sunshine vitamin gauge is in the red reserve zone, contributing to bone aches and low stamina.'
      },
      {
        id: 'vit_b12',
        name: 'Vitamin B12 (Cyanocobalamin)',
        category: 'Hematology',
        value: 175,
        unit: 'pg/mL',
        minNormal: 211,
        maxNormal: 911,
        status: 'critical_low',
        plainEnglish: 'Vital for nerve sheath health and red blood cell maturation.',
        analogy: 'Nerve wire insulation needs replenishing to prevent pins-and-needles tingling in fingers or feet.'
      },
      {
        id: 'tsh',
        name: 'TSH (Thyroid Stimulating Hormone)',
        category: 'Glycemic',
        value: 2.4,
        unit: 'uIU/mL',
        minNormal: 0.4,
        maxNormal: 4.2,
        status: 'normal',
        plainEnglish: 'Checks whether your thyroid gland is balanced.',
        analogy: 'Your thyroid metabolic thermostat is perfectly calibrated.'
      }
    ],
    boardDeliberations: [
      {
        id: 'a_delib_1',
        doctorId: 'dr_ali',
        round: 'round1_specialist',
        roundTitle: 'Round 1: Initial Clinical Impressions',
        speech: 'Priya shows microcytic hypochromic iron deficiency anemia. Hemoglobin at 9.1 g/dL with severe Ferritin depletion (7.5 ng/mL). The red blood cells are small and pale under microscopic examination.',
        tone: 'objective',
        keyConcern: 'Severe depleted iron stores requiring therapeutic replenishment rather than dietary fixes alone.'
      },
      {
        id: 'a_delib_2',
        doctorId: 'dr_iyer',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Debate',
        speech: 'Notice the co-existing nutritional triple-hit: Iron + Vitamin D (12.8 ng/mL) + Vitamin B12 (175 pg/mL). In young urban Indian women, this combination produces severe lethargy, hair shedding, and sleep disturbances. Oral iron often causes gastric constipation, so we must suggest Liposomal or bisglycinate iron forms.',
        tone: 'consensus',
        keyConcern: 'Tolerability of iron supplements and necessity of high-dose weekly Vitamin D3 (60,000 IU).'
      },
      {
        id: 'a_delib_3',
        doctorId: 'dr_sen',
        round: 'round2_debate',
        roundTitle: 'Round 2: Cross-Specialty Debate',
        speech: 'Important clinical reminder: In a 29-year-old female, we must establish the underlying etiology of iron depletion. The physician should inquire about menstrual blood volume (menorrhagia) and rule out celiac malabsorption before assuming purely dietary deficit.',
        tone: 'challenging',
        keyConcern: 'Identify the root cause of iron loss (menorrhagia vs malabsorption).'
      },
      {
        id: 'a_delib_4',
        doctorId: 'dr_sen',
        round: 'round3_consensus',
        roundTitle: 'Round 3: Board Consensus Plan',
        speech: 'Board Consensus: 1) Initiate therapeutic iron replenishment with Vitamin C for absorption; 2) Weekly 60,000 IU Vitamin D3 for 8 weeks; 3) Re-check Ferritin and Complete Blood Count after 8 weeks.',
        tone: 'consensus',
        keyConcern: 'Targeted replenishment protocol established.'
      }
    ],
    consensusSummary: {
      overallRisk: 'MODERATE',
      consensusScore: 98,
      primaryFindings: [
        'Significant Iron Deficiency Anemia (Hemoglobin 9.1 g/dL, Ferritin 7.5 ng/mL).',
        'Severe Vitamin D3 deficiency (12.8 ng/mL) and subnormal Vitamin B12 (175 pg/mL).',
        'Thyroid function is completely normal, ruling out hypothyroidism as the cause of fatigue.'
      ],
      multidisciplinaryActionPlan: [
        'Consult physician for prescription-grade elemental iron (100mg with Vitamin C).',
        'Start 8-week course of 60,000 IU Vitamin D3 cholecalciferol capsules.',
        'Inquire about heavy menstrual bleeding to identify the source of chronic iron drain.',
        'Repeat CBC and Ferritin in 60 days to evaluate marrow response.'
      ]
    },
    doctorQuestions: [
      {
        id: 'aq1',
        specialistId: 'dr_sen',
        specialistTitle: 'Internal Medicine',
        category: 'Diagnostics',
        priority: 'HIGH',
        question: 'My Ferritin is 7.5 ng/mL and Hemoglobin is 9.1 g/dL. Should we investigate if heavy menstrual bleeding or malabsorption is the root cause?',
        rationale: 'Moves the conversation from symptomatic pills to root-cause diagnosis.'
      },
      {
        id: 'aq2',
        specialistId: 'dr_iyer',
        specialistTitle: 'Pharmacology',
        category: 'Medication',
        priority: 'HIGH',
        question: 'Can you prescribe a gentle iron supplement (such as iron bisglycinate or liposomal iron) that avoids stomach upset and constipation?',
        rationale: 'Improves adherence by preempting common iron gastrointestinal side effects.'
      },
      {
        id: 'aq3',
        specialistId: 'dr_iyer',
        specialistTitle: 'Medication',
        category: 'Medication',
        priority: 'MEDIUM',
        question: 'For my Vitamin D at 12.8 ng/mL, what is the recommended weekly booster dosage and duration?',
        rationale: 'Clarifies high-dose loading phase vs maintenance.'
      }
    ],
    vernacular: {
      en: {
        text: 'You have iron-deficiency anemia along with low Vitamin D and B12. Your thyroid gland is working perfectly.',
        simple: 'Your body’s iron storage battery is nearly empty, which is why you may feel exhausted or weak. Your bones and nerves also need a vitamin booster. Doctors recommend prescription iron supplements taken with citrus juice and weekly Vitamin D pills.'
      },
      hi: {
        title: 'सरल भाषा में आपकी रिपोर्ट',
        text: 'आपकी रिपोर्ट में हीमोग्लोबिन (9.1) और आयरन स्टोर (फेरिटिन 7.5) काफी कम हैं। विटामिन डी और बी12 की भी कमी है। थायरॉइड बिल्कुल सामान्य है।',
        simple: 'सरल शब्दों में: आपके शरीर में खून और आयरन की भारी कमी है, जिसकी वजह से कमजोरी और थकान हो रही है। डॉक्टर की सलाह है कि आयरन और विटामिन की गोलियां शुरू करें, हरी पत्तेदार सब्जियां खाएं और चाय/कॉफी के साथ दवा न लें।'
      },
      te: {
        title: 'సులభమైన మాటల్లో మీ రక్త పరీక్ష',
        text: 'మీ రక్తంలో హిమోగ్లోబిన్ (9.1) మరియు ఐరన్ నిల్వలు (ఫెర్రిటిన్ 7.5) చాలా తక్కువగా ఉన్నాయి. విటమిన్ డి మరియు బి12 కూడా తగ్గాయి. థైరాయిడ్ సాధారణంగా ఉంది.',
        simple: 'సులభంగా చెప్పాలంటే: మీ శరీరంలో ఐరన్ మరియు రక్త నిల్వలు బాగా తగ్గిపోయాయి, అందుకే నీరసం మరియు అలసట కలుగుతున్నాయి. డాక్టరు సలహాతో ఐరన్ మరియు విటమిన్ డి మాత్రలు తీసుకోవాలని బోర్డు సూచిస్తోంది.'
      }
    },
    trendData: [
      { date: 'Jan 2026', label: '10 Months Ago', platelets: 280, sgpt: 22, hba1c: 5.2 },
      { date: 'Jun 2026', label: '5 Months Ago', platelets: 240, sgpt: 20, hba1c: 5.3 },
      { date: 'Nov 2026', label: 'Current Report', platelets: 210, sgpt: 24, hba1c: 5.3 }
    ]
  }
};
