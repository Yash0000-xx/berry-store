import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Music, Play, Square, Eye, Layers, Grid, Cpu, Terminal, Sparkles } from 'lucide-react';

type WaveType = 'sine' | 'square' | 'triangle' | 'sawtooth';

// Pre-compiled technical mythology streams matching our product architectures
const SPEC_DATA_STREAMS = {
  phone: [
    "--- BERRY 17 PRO CHASSIS SPEC SHEET ---\n",
    "[sys/init] Initializing liquid obsidian hardware profiling...\n",
    "[sys/core] Processing A17 Neural Core layout vector metrics:\n",
    "  -> Architecture: 3nm Spatial Mesh Topology\n",
    "  -> Transistor Weight: 14.2 Billion Unified Nodes\n",
    "  -> VRAM Bandwidth: 420 GB/s Liquid Bus Interconnect\n\n",
    "[analysis] The Titanium exterior shell features a specialized radar-reflective coating designed to bounce micro-vibrations, yielding a completely static audio isolation chamber for the internal microphones.\n\n",
    "[benchmarks] Ray-Tracing Core execution shows a stable 42% delta efficiency spike above standard reference architectures. Fluid simulation processing runs entirely in hardware cache grids.\n",
    "--- CONFIGURATION ANALYSIS TERMINATED ---"
  ],
  watch: [
    "--- BERRY WATCH ULTRA SPEC SHEET ---\n",
    "[sys/init] Initializing safety-orange extreme environment telemetry...\n",
    "[sys/core] Processing Aerospace Grade Titanium casing metrics:\n",
    "  -> Pressure Limit: 10 ATM Spatial Displacement\n",
    "  -> GPS Interface: Multi-Band L1/L5 Neural Tracking Arrays\n",
    "  -> Thermal Window: -20C to +55C Non-Degradation Buffer\n\n",
    "[analysis] Casing is laser-welded with an explicit focus on impact deflection. The dual-side haptic rotors operate on a continuous variable phase frequency loop, matching skin conductivity values.\n\n",
    "[benchmarks] Tracking lock acquisition speed measured at less than 40ms from absolute zero-state wake vectors. Emergency pulse signal broadcasts via localized mesh network relays.\n",
    "--- CONFIGURATION ANALYSIS TERMINATED ---"
  ]
};

export default function SandboxPage() {
  // ==================== ENGINE 1: AUDIO SYNTH DATA STATES ====================
  const [waveType, setWaveType] = useState<WaveType>('sine');
  const [frequency, setFrequency] = useState<number>(440);
  const [detune, setDetune] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // ==================== ENGINE 2: SPATIAL LENS SIMULATOR STATES ====================
  const [passThroughOpacity, setPassThroughOpacity] = useState<number>(40);
  const [eyeTrackingRadius, setEyeTrackingRadius] = useState<number>(30);
  const [gridDistortion, setGridDistortion] = useState<number>(10);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const viewFrameRef = useRef<HTMLDivElement>(null);

  // ==================== ✨ ENGINE 3: FEATURE 03 GENERATIVE AI SPEC STATES ====================
  const [selectedTarget, setSelectedTarget] = useState<'phone' | 'watch'>('phone');
  const [aiTextOutput, setAiTextOutput] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [tokenVelocity, setTokenVelocity] = useState<number>(0);
  
  const tokenCanvasRef = useRef<HTMLCanvasElement>(null);
  const tokenHistoryRef = useRef<number[]>(new Array(50).fill(0));

  // --- Synth Core Handlers ---
  const startSynthesizer = () => {
    if (isPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();

      osc.type = waveType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.detune.setValueAtTime(detune, ctx.currentTime);

      analyser.fftSize = 2048;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(analyser);
      analyser.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      analyserRef.current = analyser;
      setIsPlaying(true);

      drawWaveformVisualizer();
    } catch (e) {
      console.warn("Audio Context block matched:", e);
    }
  };

  const stopSynthesizer = () => {
    if (oscRef.current) {
      try { oscRef.current.stop(); oscRef.current.disconnect(); } catch (e) {}
    }
    if (audioCtxRef.current) { audioCtxRef.current.close(); }
    oscRef.current = null;
    audioCtxRef.current = null;
    setIsPlaying(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  useEffect(() => {
    if (isPlaying && oscRef.current) {
      oscRef.current.type = waveType;
      oscRef.current.frequency.setValueAtTime(frequency, audioCtxRef.current!.currentTime);
      oscRef.current.detune.setValueAtTime(detune, audioCtxRef.current!.currentTime);
    }
  }, [waveType, frequency, detune, isPlaying]);

  const drawWaveformVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteTimeDomainData(dataArray);

      // ✨ UPDATED: High-Key clinical background for the oscilloscope
      ctx.fillStyle = '#fafafa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2.5;
      // ✨ UPDATED: Dark, crisp stroke colors for the waveforms
      ctx.strokeStyle = waveType === 'square' ? '#18181b' : waveType === 'triangle' ? '#52525b' : '#09090b';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    renderFrame();
  };

  // --- Spatial Lens Handler ---
  const handleMouseMoveViewport = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewFrameRef.current) return;
    const rect = viewFrameRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // --- ✨ AI Spec Stream Handler (Feature 03) ---
  const runAiSpecAnalysis = () => {
    if (isStreaming) return;
    
    setIsStreaming(true);
    setAiTextOutput('');
    const fullSourceLines = SPEC_DATA_STREAMS[selectedTarget];
    
    let currentLineIdx = 0;
    let currentCharIdx = 0;
    let buildBuffer = '';

    const streamTicker = setInterval(() => {
      if (currentLineIdx >= fullSourceLines.length) {
        clearInterval(streamTicker);
        setIsStreaming(false);
        setTokenVelocity(0);
        return;
      }

      const targetLine = fullSourceLines[currentLineIdx];
      buildBuffer += targetLine[currentCharIdx];
      setAiTextOutput(buildBuffer);

      const burstSpeed = Math.floor(Math.random() * 45) + 25;
      setTokenVelocity(burstSpeed);
      
      tokenHistoryRef.current.push(burstSpeed);
      tokenHistoryRef.current.shift();
      drawTokenOscilloscope();

      currentCharIdx++;
      if (currentCharIdx >= targetLine.length) {
        currentCharIdx = 0;
        currentLineIdx++;
      }
    }, 15);
  };

  const drawTokenOscilloscope = () => {
    if (!tokenCanvasRef.current) return;
    const canvas = tokenCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ✨ UPDATED: Dark stroke for clinical token graph
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    const sliceWidth = canvas.width / (tokenHistoryRef.current.length - 1);
    
    tokenHistoryRef.current.forEach((val, index) => {
      const x = index * sliceWidth;
      const y = canvas.height - (val / 80) * canvas.height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
  };

  return (
    // ✨ HIGH-KEY MINIMALIST WRAPPER
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-zinc-900 px-4 pt-32 pb-24 relative z-10 space-y-12 transition-colors duration-700">
      
      {/* ==================== MODULE 1: AUDIO SYNTHESIZER ==================== */}
      <div className="w-full max-w-3xl rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-zinc-100 p-2 text-zinc-900 border border-zinc-200"><Music size={16} /></div>
              <div>
                <h2 className="font-heading text-lg font-black tracking-tight text-zinc-900">Audio Synth Lab</h2>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Program raw signal modulation live grids.</p>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">1. Oscillator Waveform</span>
              <div className="grid grid-cols-2 gap-1.5">
                {(['sine', 'square', 'triangle', 'sawtooth'] as WaveType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveType(type)}
                    className={`rounded-xl border px-3 py-2 text-left text-[10px] font-black uppercase tracking-wide transition-all cursor-pointer ${
                      waveType === type ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm' : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                <span>2. Core Frequency</span>
                <span className="text-zinc-900 font-mono">{frequency} Hz</span>
              </div>
              <input type="range" min="110" max="880" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                <span>3. Detune Phasing</span>
                <span className="text-zinc-900 font-mono">{detune} cents</span>
              </div>
              <input type="range" min="-100" max="100" value={detune} onChange={(e) => setDetune(Number(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100">
            {isPlaying ? (
              <button onClick={stopSynthesizer} className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-100 border border-zinc-300 text-zinc-900 py-3 text-xs font-bold uppercase tracking-wider transition-all hover:bg-zinc-200 shadow-sm cursor-pointer"><Square size={12} fill="currentColor" /> Terminate Signal</button>
            ) : (
              <button onClick={startSynthesizer} className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-transform duration-200 hover:scale-102 cursor-pointer"><Play size={12} fill="currentColor" /> Initialize Synth Node</button>
            )}
          </div>
        </div>
        
        {/* LIGHT THEME OSCILLOSCOPE */}
        <div className="md:col-span-3 rounded-2xl border border-zinc-200 bg-white shadow-inner relative flex flex-col justify-between overflow-hidden min-h-[260px] p-4">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 border border-zinc-200 shadow-sm"><Activity size={10} className="text-zinc-900" /><span>Oscilloscope Vector Grid</span></div>
          <canvas ref={canvasRef} width="400" height="260" className="w-full h-full block absolute inset-0 bg-[#fafafa]" />
          {!isPlaying && <div className="relative z-10 m-auto text-center max-w-[180px] space-y-2 pointer-events-none opacity-40"><div className="text-2xl animate-pulse grayscale">📡</div><p className="text-[10px] text-zinc-600 font-medium leading-relaxed">Signal pipeline flatlined. Tap the launch key parameter node matrix to pipe waveforms.</p></div>}
        </div>
      </div>

      {/* ==================== MODULE 2: SPATIAL OPTICS LENS SIMULATOR ==================== */}
      <div className="w-full max-w-3xl rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-zinc-100 p-2 text-zinc-900 border border-zinc-200"><Eye size={16} /></div>
              <div>
                <h2 className="font-heading text-lg font-black tracking-tight text-zinc-900">Spatial Optics Matrix</h2>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Calibrate eye tracking and focal plane metrics.</p>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2"><span className="flex items-center gap-1"><Layers size={10} /> Pass-Through Opacity</span><span className="text-zinc-900 font-mono">{passThroughOpacity}%</span></div>
              <input type="range" min="10" max="90" value={passThroughOpacity} onChange={(e) => setPassThroughOpacity(Number(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2"><span className="flex items-center gap-1"><Eye size={10} /> Eye Foveation Focus Area</span><span className="text-zinc-900 font-mono">{eyeTrackingRadius}px</span></div>
              <input type="range" min="15" max="60" value={eyeTrackingRadius} onChange={(e) => setEyeTrackingRadius(Number(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-2"><span className="flex items-center gap-1"><Grid size={10} /> 3D Depth Field Skew</span><span className="text-zinc-900 font-mono">1:{gridDistortion}x</span></div>
              <input type="range" min="2" max="25" value={gridDistortion} onChange={(e) => setGridDistortion(Number(e.target.value))} className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900" />
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-100 text-[9px] text-zinc-500 font-medium leading-relaxed">💡 <span className="text-zinc-900 font-bold">Simulation Mode Active:</span> Hover your mouse cursor inside the right-hand lens display viewfinder node to check the real-time foveated eye-tracking focus loop vector calculation.</div>
        </div>
        
        {/* LIGHT THEME OPTICS LENS */}
        <div ref={viewFrameRef} onMouseMove={handleMouseMoveViewport} className="md:col-span-3 rounded-2xl border border-zinc-200 bg-white relative overflow-hidden min-h-[260px] cursor-crosshair flex items-center justify-center [perspective:800px] shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 via-white to-zinc-50 transition-opacity duration-300" style={{ opacity: passThroughOpacity / 100 }} />
          <div className="absolute inset-[-50%] grid grid-cols-12 grid-rows-12 gap-0 pointer-events-none opacity-40 border border-zinc-300 [transform-style:preserve-3d]" style={{ transform: `rotateX(40deg) translateZ(-50px) scale(${1 + gridDistortion / 50})` }}>
            {[...Array(144)].map((_, idx) => <div key={idx} className="border-[0.5px] border-zinc-300 aspect-square" />)}
          </div>
          <motion.div className="absolute rounded-full border-2 border-zinc-900 pointer-events-none shadow-md bg-zinc-900/5 mix-blend-multiply flex items-center justify-center text-[7px] text-zinc-900 font-mono tracking-tighter" animate={{ left: mousePos.x - eyeTrackingRadius, top: mousePos.y - eyeTrackingRadius, width: eyeTrackingRadius * 2, height: eyeTrackingRadius * 2 }} transition={{ type: 'spring', damping: 25, stiffness: 220 }}><div className="h-1 w-1 bg-zinc-900 rounded-full" /><span className="absolute -top-4 font-bold uppercase tracking-widest text-[6px]">Target Lock</span></motion.div>
          <div className="relative text-center pointer-events-none z-10 scale-90 opacity-80"><div className="text-xs font-heading font-black tracking-widest uppercase text-zinc-900">Viewfinder Lens Core</div><div className="text-[8px] font-mono mt-1 text-zinc-500 tracking-wider font-bold">Coordinates: {Math.round(mousePos.x)}px • {Math.round(mousePos.y)}px</div></div>
        </div>
      </div>

      {/* ==================== ✨ MODULE 3: FEATURE 03 GENERATIVE SPEC-SHEET RENDERER ==================== */}
      <div className="w-full max-w-3xl rounded-[32px] border border-zinc-200 bg-white p-6 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Left Interactive Parameter Controls (2 Columns) */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="rounded-xl bg-zinc-100 p-2 text-zinc-900 border border-zinc-200">
                <Cpu size={16} />
              </div>
              <div>
                <h2 className="font-heading text-lg font-black tracking-tight text-zinc-900">Generative Spec Analyzer</h2>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Stream deep hardware architectural documents.</p>
              </div>
            </div>

            <div className="mt-8">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-2.5">1. Target Core Node</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'phone', label: 'Berry 17 Pro' },
                  { id: 'watch', label: 'Watch Ultra' }
                ].map((node) => (
                  <button
                    key={node.id}
                    disabled={isStreaming}
                    onClick={() => setSelectedTarget(node.id as any)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer disabled:opacity-40 ${
                      selectedTarget === node.id ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm' : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300'
                    }`}
                  >
                    {node.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#fafafa] border border-zinc-200 p-4 flex flex-col justify-between gap-3 min-h-[95px] shadow-inner">
              <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-1"><Terminal size={10} /> Stream Velocity</span>
                <span className="font-mono text-zinc-900 animate-pulse">{tokenVelocity} t/s</span>
              </div>
              
              <div className="h-8 w-full bg-white rounded-lg relative overflow-hidden border border-zinc-200 font-mono">
                <canvas ref={tokenCanvasRef} width="240" height="32" className="w-full h-full block absolute inset-0" />
              </div>
            </div>
          </div>

          <button
            disabled={isStreaming}
            onClick={runAiSpecAnalysis}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:scale-102 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Sparkles size={12} fill="currentColor" /> Generate Technical Brief
          </button>
        </div>

        {/* LIGHT THEME TYPEWRITER DOCUMENT CONSOLE */}
        <div className="md:col-span-3 rounded-2xl border border-zinc-200 bg-[#fafafa] p-6 font-mono text-[10px] leading-relaxed text-zinc-800 relative flex flex-col justify-between overflow-hidden min-h-[280px] shadow-inner">
          <div className="overflow-y-auto max-h-[260px] whitespace-pre-wrap pr-1 scrollbar-none select-text">
            {aiTextOutput}
            {isStreaming && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="inline-block h-3 w-1.5 bg-zinc-900 align-middle ml-0.5 shadow-sm"
              />
            )}
            {!isStreaming && aiTextOutput === '' && (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 opacity-60 select-none py-16 gap-2">
                <Terminal size={22} />
                <p className="text-[9px] uppercase tracking-widest font-bold max-w-[170px]">Terminal Standby. Awaiting generative brief initiation request stream...</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}