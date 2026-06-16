import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Flame } from 'lucide-react';

interface GhostCursor {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

export default function PresenceHeatmap() {
  const [ghosts, setGhosts] = useState<GhostCursor[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mockNames = ['obsidian_core', 'quantum_flux', 'titanium_mesh', 'aura_hacker', 'liquid_pay', 'neural_node'];
  const colors = ['#e040fb', '#f97316', '#06b6d4', '#10b981'];

  useEffect(() => {
    const activeGhosts: GhostCursor[] = Array.from({ length: 3 }).map((_, i) => ({
      id: `ghost-${i}`,
      name: mockNames[i % mockNames.length],
      x: Math.random() * window.innerWidth,
      y: Math.random() * 600 + 200,
      color: colors[i % colors.length]
    }));
    
    setGhosts(activeGhosts);

    const movementLoop = setInterval(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          const nextX = Math.max(50, Math.min(window.innerWidth - 120, ghost.x + (Math.random() * 160 - 80)));
          const nextY = Math.max(100, Math.min(2200, ghost.y + (Math.random() * 140 - 70)));

          recordHeatPoint(nextX, nextY, ghost.color);

          return { ...ghost, x: nextX, y: nextY };
        })
      );
    }, 1200);

    return () => clearInterval(movementLoop);
  }, []);

  const recordHeatPoint = (x: number, y: number, color: string) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const relativeY = y % canvas.height;

    const gradient = ctx.createRadialGradient(x, relativeY, 0, x, relativeY, 35);
    gradient.addColorStop(0, `${color}22`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, relativeY, 35, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
      
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
        style={{ height: '100%', minHeight: '2500px' }}
      />

      {ghosts.map((ghost) => (
        <motion.div
          key={ghost.id}
          className="absolute z-30 flex flex-col gap-1 text-[8px] font-mono font-black tracking-widest text-white/40"
          animate={{ left: ghost.x, top: ghost.y }}
          transition={{ type: 'spring', damping: 30, stiffness: 60 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill={ghost.color} stroke="none" className="drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
            <path d="M4.5 3V17L9.5 12L14.5 17L16 15.5L11.5 11L16.5 6H4.5Z" />
          </svg>
          
          <div className="bg-black/60 backdrop-blur-xs border border-white/5 rounded-md px-1.5 py-0.5 whitespace-nowrap shadow-md">
            {ghost.name}
          </div>
        </motion.div>
      ))}

      {/* ==================== 🛠️ STRUCTURALLY RE-LOCATED STATUS INDICATOR HUD ==================== */}
      {/* ✨ CHANGED: Replaced 'fixed top-24 right-6' with bottom-alignment coordinates so it sits elegantly just above the log terminal */}
      <div className="fixed bottom-24 left-4 z-40 bg-black/75 border border-white/5 backdrop-blur-md rounded-2xl px-3.5 py-2 flex items-center gap-2.5 text-[8px] font-bold font-mono text-white/80 uppercase tracking-widest hidden md:flex shadow-2xl">
        <Users size={11} className="text-cyan-400 animate-pulse" />
        <span>Cluster: 4 Active</span>
        <span className="text-white/20">|</span>
        <Flame size={11} className="text-orange-400 animate-bounce" />
        <span>Heatmap Feed: Live</span>
      </div>

    </div>
  );
}