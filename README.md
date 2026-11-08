# 🩺 MediMind

> **Multi-Agent Clinical Swarm and Multimodal Diagnostic Triage Engine for Rapid Pre-Consultation Synthesis**  
> *Developed for IDEAVYA 2026 Innovation Challenge*

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Overview

The average doctor consultation in India lasts **under 3 minutes**. Patients receive lab reports with 30+ cryptic biomarkers (e.g., *“Creatinine 0.69 mg/dL”*, *“eGFR 134”*, *“SGPT 74 U/L”*), panic on Google, and forget what to ask during their appointment.

**MediMind** acts as an OPD consultation accelerator:
1. **Multimodal Report Ingestion:** Parses physical blood test sheets and PDFs via vision OCR.
2. **Visual Biomarker Gauges:** Replaces clinical jargon with intuitive color-coded range sliders (Green/Yellow/Red) and patient pins.
3. **MiroFish-Inspired Multi-Agent MDT Swarm:** 5 specialized virtual physician agents (Internal Med, Cardiology, Endocrinology, Pathology, Pharmacology) deliberate across an interactive force-directed knowledge graph with real-time edge recalculation.
4. **Vernacular Audio ("Explain Like I'm 10"):** Speaks simple analogies aloud in **Telugu (తెలుగు)**, **Hindi (हिंदी)**, and **English** using native browser speech synthesis.
5. **"Ask My Doctor" Consultation Prep Sheet:** Synthesizes a targeted 4-question checklist for the patient.
6. **1-Page Physical Doctor Brief:** Prints a 30-second pre-consultation summary sheet for the physician.
7. **Longitudinal Trajectory Tracker:** Tracks 6-month historical deltas (*HbA1c 6.9% → 7.8%*) to catch chronic disease progression early.
8. **Deterministic Safety Sentinel:** Flags critical life-threatening values (Troponin, Potassium > 6.0) with an immediate emergency ER / 108 ambulance protocol.

---

## 🏛️ The Virtual Multi-Disciplinary Team (MDT Swarm)

| Specialist | Persona | Clinical Role |
| :--- | :--- | :--- |
| **Dr. Radhika Sen** | MD Internal Medicine (AIIMS) | Triage Lead & Board Moderator |
| **Dr. Arvind Kumar** | DM Cardiology (FACC) | Cardiovascular Hemodynamics & Electrolytes |
| **Dr. Sneha Reddy** | DM Endocrinology & Metabolism | Glycemic Variability & Insulin Resistance |
| **Dr. Farooq Ali** | MD Pathology & Biochemistry | Assay Validation, Reference Intervals & Ratios |
| **Dr. Ananya Iyer** | PharmD, BCPS | Hepato-Renal Drug Clearance & Nutrition |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/imran-prog-hub/medimind.git

# Navigate into project directory
cd medimind

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧩 Project Structure

```
medimind/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx                # Clinical navigation & benchmark preset selector
│   │   ├── PatientOverview.tsx       # Step 1: Extracted patient details & normalized biomarkers
│   │   ├── BiomarkerGauges.tsx       # Step 2: Visual color-coded range sliders & ELI10 analogies
│   │   ├── VernacularVoice.tsx       # Step 2: Web Speech regional voice (Telugu, Hindi, English)
│   │   ├── MiroFishGraph.tsx         # Step 3: Interactive force-directed knowledge graph
│   │   ├── MiroFishOrchestrator.tsx  # Step 3: Swarm orchestration stream & live debate audio
│   │   ├── VirtualBoardroom.tsx      # Step 4: Full clinical grand round & doctor direct Q&A
│   │   ├── AskDoctorSheet.tsx        # Step 5: Prioritized 4-question checklist
│   │   ├── DoctorBriefModal.tsx      # Step 5: 1-Page print-to-PDF physical doctor brief
│   │   ├── LongitudinalTrend.tsx     # Step 6: Past vs Now trajectory chart (Recharts)
│   │   ├── EmergencyBanner.tsx       # Critical care triage alert banner
│   │   ├── ReportUpload.tsx          # Multimodal ingestion zone with camera simulation
│   │   ├── ApiKeyModal.tsx           # Multi-provider switcher (Gemini, Qwen, Zap AI)
│   │   └── JudgePitchGuide.tsx       # 5-minute hackathon pitch companion teleprompter
│   ├── data/
│   │   ├── graphData.ts              # Knowledge graph generator for MiroFish
│   │   └── sampleReports.ts          # Verified clinical benchmark datasets (KFT, Metabolic, Cardiac)
│   ├── services/
│   │   ├── geminiService.ts          # Multimodal Vision OCR extraction service
│   │   └── ttsService.ts             # Web Speech API regional voice synthesizer
│   ├── types/
│   │   ├── graph.ts                  # Graph node and edge interfaces
│   │   └── medical.ts                # Strict typed medical schema
│   ├── App.tsx                       # Master clinical stepper workflow
│   ├── main.tsx                      # App entry point
│   └── index.css                     # Tailwind CSS v4 styling & print styles
├── public/                           # Static assets
├── index.html                        # HTML template with Google Fonts
├── vite.config.ts                    # Vite & Tailwind configuration
└── package.json                      # Dependencies and scripts
```

---

## 🎯 Clinical Workflow for Demonstrations

1. **Step 1 — Patient Overview:** Inspect normalized lab values (e.g., *Mr. Sample Report, 22y, KFT Panel*).
2. **Step 2 — Visual Gauges & Voice:** View color-coded range bars and listen to audio in Telugu or Hindi.
3. **Step 3 — MiroFish Graph:** Interact with draggable physician and biomarker nodes with real-time edge recalculation.
4. **Step 4 — Doctor Boardroom:** Follow the multi-doctor debate and consult any specialist directly.
5. **Step 5 — Doctor Prep Sheet:** Review prioritized questions and click **"Print 1-Page Doctor Brief"**.
6. **Step 6 — Longitudinal Trends:** Inspect 6-month historical deltas.

---

## 🔒 Safety & Ethical Guardrails

- **Non-Diagnostic Positioning:** MediMind serves as an educational pre-consultation intelligence tool. Full clinical decision-making remains with the treating physician.
- **Deterministic Red-Flag Override:** Critical markers (e.g. Troponin > 0.04 ng/mL, Potassium > 6.0 mEq/L) immediately bypass educational chat and trigger a high-contrast Emergency Room / 108 ambulance warning.
- **Zero-Storage Audio:** Web Speech synthesis executes entirely on the client's browser hardware.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
