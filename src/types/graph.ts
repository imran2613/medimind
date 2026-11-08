export interface GraphNode {
  id: string;
  label: string;
  type: 'doctor' | 'biomarker' | 'diagnosis' | 'treatment' | 'alert';
  subType?: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  radius: number;
  color: string;
  degree?: string;
  value?: string | number;
  status?: string;
  description: string;
  details?: Record<string, string>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string; // e.g. "EVALUATES", "DIAGNOSES", "CHALLENGES", "PRESCRIBES", "WARNS_AGAINST"
  type: 'evaluates' | 'diagnoses' | 'challenges' | 'warns' | 'prescribes' | 'correlates';
  color: string;
  fact: string;
  confidence: number;
  timestamp: string;
}

export interface MiroFishGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

