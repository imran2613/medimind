import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { MiroFishGraphData, GraphNode, GraphEdge } from '../types/graph';
import type { LabReportData } from '../types/medical';
import {
  RotateCcw,
  X,
  Search,
  Share2,
  Play,
  Pause,
  Zap
} from 'lucide-react';

interface MiroFishGraphProps {
  graphData: MiroFishGraphData;
  report: LabReportData;
  onSelectNode?: (nodeId: string) => void;
}

export const MiroFishGraph: React.FC<MiroFishGraphProps> = ({
  graphData,
  report,
  onSelectNode
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>(graphData.nodes);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Dragging states
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  // Live Swarm Playback Simulation
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeSpeechIndex, setActiveSpeechIndex] = useState(0);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    setNodes(graphData.nodes);
    if (graphData.edges.length > 0) {
      setSelectedEdge(graphData.edges[0]);
    }
  }, [graphData]);

  // Simulation timer: loops through doctor deliberations
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isSimulating) {
      interval = setInterval(() => {
        setActiveSpeechIndex((prev) => {
          const next = (prev + 1) % report.boardDeliberations.length;
          const currentDelib = report.boardDeliberations[next];
          const matchedDocNode = nodes.find((n) => n.id === currentDelib.doctorId);
          if (matchedDocNode) {
            setSelectedNode(matchedDocNode);
          }
          const matchedEdge = graphData.edges.find((e) => e.source === currentDelib.doctorId);
          if (matchedEdge) {
            setSelectedEdge(matchedEdge);
          }
          return next;
        });
      }, 2600);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, report.boardDeliberations, nodes, graphData.edges]);

  // Transform screen client coords to SVG canvas coordinate space
  const getSVGPoint = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgP = pt.matrixTransform(ctm.inverse());
    return {
      x: (svgP.x - pan.x) / zoomLevel,
      y: (svgP.y - pan.y) / zoomLevel
    };
  }, [pan, zoomLevel]);

  // Pointer Down on Node
  const handleNodePointerDown = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const pt = getSVGPoint(e.clientX, e.clientY);
    dragOffsetRef.current = {
      x: pt.x - node.x,
      y: pt.y - node.y
    };

    setDraggedNodeId(nodeId);
    setSelectedNode(node);
    setSelectedEdge(null);
    if (onSelectNode) onSelectNode(nodeId);
  };

  // Pointer Move (Handles both node dragging and canvas panning)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggedNodeId) {
      const pt = getSVGPoint(e.clientX, e.clientY);
      const newX = pt.x - dragOffsetRef.current.x;
      const newY = pt.y - dragOffsetRef.current.y;

      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggedNodeId
            ? { ...n, x: Math.round(newX), y: Math.round(newY) }
            : n
        )
      );
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
    }
  };

  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsPanning(true);
    panStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };

  const handlePointerUp = () => {
    setDraggedNodeId(null);
    setIsPanning(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    setNodes(graphData.nodes);
    setSelectedNode(null);
    setSelectedEdge(graphData.edges[0] || null);
    setIsSimulating(false);
  };

  const getNode = (id: string): GraphNode | undefined => {
    return nodes.find((n) => n.id === id);
  };

  const filteredNodes = searchQuery
    ? nodes.filter(
        (n) =>
          n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : nodes;

  const currentSimulationSpeech = report.boardDeliberations[activeSpeechIndex];

  return (
    <div className="relative w-full h-[620px] bg-slate-900 rounded-2xl border border-slate-300 overflow-hidden flex flex-col shadow-md select-none">
      {/* Top Controls Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <h3 className="text-sm font-extrabold text-slate-900 tracking-wide flex items-center gap-1.5">
              <span>MiroFish Clinical Graph</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                Drag Any Entity
              </span>
            </h3>
          </div>
        </div>

        {/* Action Tools */}
        <div className="flex items-center space-x-2">
          {/* Play / Pause Live Swarm Button */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
              isSimulating
                ? 'bg-rose-600 border-rose-500 text-white shadow-sm animate-pulse'
                : 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white shadow-xs'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Swarm</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Debate</span>
              </>
            )}
          </button>

          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entity..."
              className="pl-8 pr-3 py-1 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-32"
            />
          </div>

          <button
            onClick={resetView}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
            title="Recenter and Reset Graph"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
            className="p-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 text-xs font-bold"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.2))}
            className="p-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 text-xs font-bold"
            title="Zoom Out"
          >
            -
          </button>
        </div>
      </div>

      {/* Live Simulation Banner */}
      {isSimulating && currentSimulationSpeech && (
        <div className="absolute top-14 left-4 right-4 z-20 bg-white/95 backdrop-blur-md border border-blue-400 rounded-xl p-2.5 flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center space-x-2.5 text-xs truncate">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
              <Zap className="w-4 h-4 animate-bounce" />
            </span>
            <div className="truncate">
              <span className="font-bold text-slate-900">
                Swarm Deliberation [{activeSpeechIndex + 1}/{report.boardDeliberations.length}]:{' '}
              </span>
              <span className="text-blue-700 italic font-medium">
                "{currentSimulationSpeech.speech.slice(0, 95)}..."
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0 ml-2 font-bold">
            {currentSimulationSpeech.roundTitle}
          </span>
        </div>
      )}

      {/* SVG Interactive Canvas */}
      <div
        className="w-full h-full pt-12 cursor-grab active:cursor-grabbing bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] touch-none"
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 720 520"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#94a3b8" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Canvas Pan & Zoom Group */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoomLevel})`}>
            {/* Render Relationship Edges */}
            {graphData.edges.map((edge) => {
              const sourceNode = getNode(edge.source);
              const targetNode = getNode(edge.target);
              if (!sourceNode || !targetNode) return null;

              const isSelected = selectedEdge?.id === edge.id;
              const isHovered =
                hoveredNodeId === edge.source || hoveredNodeId === edge.target;

              const dx = targetNode.x - sourceNode.x;
              const dy = targetNode.y - sourceNode.y;
              const cx = (sourceNode.x + targetNode.x) / 2 - dy * 0.12;
              const cy = (sourceNode.y + targetNode.y) / 2 + dx * 0.12;
              const pathD = `M ${sourceNode.x} ${sourceNode.y} Q ${cx} ${cy} ${targetNode.x} ${targetNode.y}`;

              return (
                <g
                  key={edge.id}
                  className="cursor-pointer transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEdge(edge);
                    setSelectedNode(null);
                  }}
                >
                  <path
                    d={pathD}
                    stroke="transparent"
                    strokeWidth="16"
                    fill="none"
                  />
                  <path
                    d={pathD}
                    stroke={isSelected ? '#38bdf8' : isHovered ? '#cbd5e1' : edge.color}
                    strokeWidth={isSelected ? 3 : 1.8}
                    strokeDasharray={edge.type === 'challenges' ? '4 3' : 'none'}
                    strokeOpacity={isSelected ? 1 : 0.75}
                    fill="none"
                    markerEnd={isSelected ? 'url(#arrow-active)' : 'url(#arrow)'}
                  />
                  <text
                    x={cx}
                    y={cy}
                    fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                    fontSize="8.5"
                    fontWeight="700"
                    textAnchor="middle"
                    className="pointer-events-none select-none font-mono"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.95)' }}
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes with Real-Time Dragging */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isDragged = draggedNodeId === node.id;
              const isSimActive =
                isSimulating && currentSimulationSpeech?.doctorId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-grab active:cursor-grabbing touch-none select-none"
                  onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  {(isSelected || isDragged || isSimActive || node.type === 'diagnosis' || node.status === 'critical_high') && (
                    <circle
                      r={node.radius + 8}
                      fill="none"
                      stroke={isSimActive ? '#38bdf8' : isDragged ? '#ffffff' : node.color}
                      strokeWidth={isDragged ? '3' : '2'}
                      strokeOpacity={isDragged ? 0.9 : 0.6}
                      className={isDragged ? '' : 'animate-pulse'}
                    />
                  )}

                  <circle
                    r={node.radius}
                    fill={node.color}
                    stroke={isSelected || isDragged || isSimActive ? '#ffffff' : '#0f172a'}
                    strokeWidth={isSelected || isDragged || isSimActive ? 3.5 : 1.5}
                    style={{
                      filter: `drop-shadow(0 0 10px ${node.color}${isDragged ? 'cc' : '88'})`
                    }}
                  />

                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fill="#ffffff"
                    fontSize={node.radius > 20 ? '11' : '9'}
                    fontWeight="bold"
                    className="pointer-events-none select-none font-sans"
                  >
                    {node.type === 'doctor'
                      ? 'Dr'
                      : node.type === 'biomarker'
                      ? '🩸'
                      : node.type === 'diagnosis'
                      ? 'Dx'
                      : 'Rx'}
                  </text>

                  <text
                    y={node.radius + 12}
                    textAnchor="middle"
                    fill={isSelected || isDragged ? '#ffffff' : '#f1f5f9'}
                    fontSize="9.5"
                    fontWeight="700"
                    className="pointer-events-none select-none"
                    style={{ textShadow: '0 2px 5px rgba(0,0,0,0.95)' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Floating Relationship Inspector Card (Matches MiroFish Screenshot) */}
      {(selectedEdge || selectedNode) && (
        <div className="absolute top-16 right-4 z-30 w-80 max-w-[92vw] bg-white/95 backdrop-blur-md rounded-xl border border-slate-300 shadow-xl p-4 text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              {selectedEdge ? 'Relationship Inspector' : 'Entity Node Inspector'}
            </span>
            <button
              onClick={() => {
                setSelectedEdge(null);
                setSelectedNode(null);
              }}
              className="text-slate-400 hover:text-slate-900 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {selectedEdge && (
            <div className="mt-3 space-y-2 font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between text-blue-700 font-bold">
                <span>{getNode(selectedEdge.source)?.label.split(' ')[0] || selectedEdge.source}</span>
                <span className="text-[10px] text-amber-600">→ {selectedEdge.label} →</span>
                <span>{getNode(selectedEdge.target)?.label.split(' ')[0] || selectedEdge.target}</span>
              </div>

              <div className="text-slate-600 space-y-1 pt-1 font-sans">
                <div>
                  <span className="text-slate-400 font-mono text-[10px]">UUID: </span>
                  <span className="text-slate-800 font-mono text-[10px] font-bold">{selectedEdge.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px]">Type: </span>
                  <span className="text-emerald-700 font-bold uppercase">{selectedEdge.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-mono text-[10px]">Clinical Fact: </span>
                  <p className="text-slate-800 mt-0.5 text-xs font-medium leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-200">
                    "{selectedEdge.fact}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="text-slate-400 font-mono">Confidence: </span>
                  <span className="text-blue-700 font-bold font-mono">{(selectedEdge.confidence * 100).toFixed(0)}% Validated</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono">Timestamp: </span>
                  <span className="text-slate-600 font-mono">{selectedEdge.timestamp}</span>
                </div>
              </div>
            </div>
          )}

          {selectedNode && (
            <div className="mt-3 space-y-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{selectedNode.label}</span>
                <span
                  className="px-2 py-0.5 text-[9px] font-bold uppercase rounded"
                  style={{ backgroundColor: `${selectedNode.color}25`, color: selectedNode.color }}
                >
                  {selectedNode.type}
                </span>
              </div>

              <p className="text-slate-700 leading-relaxed font-sans text-xs">
                {selectedNode.description}
              </p>

              {selectedNode.details && (
                <div className="space-y-1 pt-1 border-t border-slate-200">
                  {Object.entries(selectedNode.details).map(([key, val]) => (
                    <div key={key} className="flex items-start justify-between gap-2 text-[10px]">
                      <span className="text-slate-500 font-mono">{key}:</span>
                      <span className="text-slate-900 text-right font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MiroFish Bottom Entity Legend & Drag Hint */}
      <div className="absolute bottom-3 left-4 z-20 flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-300 text-[10px] text-slate-700 shadow-sm">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Legend:</span>
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Doctor Specialist</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Biomarker Lab</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>Condition / High Risk</span>
        </div>
        <div className="flex items-center gap-1 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Pathology Alert</span>
        </div>
        <div className="text-blue-700 font-bold border-l border-slate-200 pl-2 hidden sm:inline">
          ✨ Click and drag any node anywhere on the canvas!
        </div>
      </div>
    </div>
  );
};
