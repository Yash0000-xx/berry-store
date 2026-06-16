import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Navigation, Radio, Activity } from 'lucide-react';

export default function WatchModel() {
  const [isHovered, setIsHovered] = useState(false);
  const [simulatedHeartRate, setSimulatedHeartRate] = useState(72);
  const [compassHeading, setCompassHeading] = useState(0);

  // 1. Hardware mouse-tracking coordinate springs for 3D tilting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // 2. Active Demo Simulator: Updates biometrics and telemetry live on hover
  useEffect(() => {
    if (!isHovered) return;

    const simulationTicker = setInterval(() => {
      setSimulatedHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(130, Math.min(145, prev + delta));
      });

      setCompassHeading((prev) => (prev + 3) % 360);
    }, 200);

    setSimulatedHeartRate(134);

    return () => clearInterval(simulationTicker);
  }, [isHovered]);

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-visible select-none py-8">
      
      {/* Dynamic Mode Notification Chip */}
      <div className="absolute top-0 right-12 bg-black/40 border border-white/5 px-3 py-1 rounded-full text-[8px] font-mono tracking-widest uppercase font-bold text-muted-foreground flex items-center gap-1.5 backdrop-blur-md">
        <Activity size={10} className={isHovered ? 'text-orange-500 animate-pulse' : ''} />
        <span>Watch Engine Status: {isHovered ? 'Telemetry Active' : 'Standby Matrix'}</span>
      </div>

      <div
        className="relative h-[380px] w-[240px] cursor-pointer [perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-full w-full flex flex-col items-center justify-center transition-shadow duration-300"
        >
          {/* ==================== WATCH STRAPS MECHANICAL BASE LAYERS ==================== */}
          <div className="absolute top-[-30px] w-24 h-[80px] rounded-t-3xl bg-linear-to-b from-orange-600 to-orange-500 border border-white/10 opacity-90 shadow-inner" />
          <div className="absolute bottom-[-30px] w-24 h-[80px] rounded-b-3xl bg-linear-to-b from-orange-500 to-orange-600 border border-white/10 opacity-90 shadow-inner" />

          {/* ==================== HARDWARE TITANIUM CHASSIS FRAME CONTAINER ==================== */}
          <div className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 border-[6px] border-zinc-600/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-2.5 flex items-center justify-center z-10">
            
            {/* Crown Dial Button Vectors */}
            <div className="absolute right-[-11px] top-1/3 h-14 w-[6px] rounded-r-md bg-linear-to-b from-zinc-500 via-zinc-600 to-zinc-700 border border-zinc-500" />
            <div className="absolute left-[-9px] top-1/2 -translate-y-1/2 h-10 w-[4px] rounded-l-xs bg-orange-500 shadow-lg" />

            {/* ==================== ACTIVE AMOLED SAPPHIRE DISPLAY SCREEN ==================== */}
            <div className="h-full w-full rounded-[34px] bg-[#050308] border border-black overflow-hidden relative p-4 flex flex-col justify-between">
              
              {/* ✨ NEW WATCH WALLPAPER NODE: Implements an authentic procedural topographical vector grid background texture */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:12px_12px]" />
              <div 
                className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q 25 35, 50 50 T 100 50 M0 20 Q 25 5, 50 20 T 100 20 M0 80 Q 25 65, 50 80 T 100 80' fill='none' stroke='%23f97316' stroke-width='1'/%3E%3C/svg%3E")`,
                  filter: isHovered ? 'brightness(1.5) hue-rotate(15deg)' : 'brightness(1)'
                }}
              />

              {/* ==================== SCREEN MODE 1: DEFAULT STANDBY SCREEN CLOCK ==================== */}
              {!isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="h-full w-full flex flex-col justify-between animate-in fade-in duration-300 relative z-10"
                >
                  <div className="flex justify-between items-center text-[9px] font-mono font-black text-orange-400 tracking-widest uppercase">
                    <span>Ultra Node</span>
                    <Radio size={10} className="animate-pulse" />
                  </div>

                  <div className="text-center font-mono my-auto">
                    <h1 className="text-5xl font-black tracking-tight text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">10:09</h1>
                    <div className="text-[9px] font-bold tracking-widest uppercase text-muted-foreground mt-1">Ecosystem Synced</div>
                  </div>

                  <div className="border-t border-white/5 pt-2 flex items-center justify-between font-mono text-[8px] font-bold text-muted-foreground uppercase tracking-wider">
                    <span>Altitude</span>
                    <span className="text-white font-black">2,414 M</span>
                  </div>
                </motion.div>
              )}

              {/* ==================== SCREEN MODE 2: ACTIVE RE-ACTIVE DEMO WORKOUT ==================== */}
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full w-full flex flex-col justify-between font-mono text-[9px] relative z-10"
                >
                  {/* Top Header Row Panel */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-1.5 bg-black/40 backdrop-blur-xs rounded-t-xl px-1">
                    <span className="font-black tracking-wider text-orange-400 uppercase flex items-center gap-1">
                      <Activity size={10} className="animate-bounce" /> Workout Live
                    </span>
                    <span className="text-[8px] text-white/40 font-bold">GPS-L5 LINK</span>
                  </div>

                  {/* Central Core Telemetry Readout Grid Module */}
                  <div className="space-y-4 my-auto bg-black/20 p-2 rounded-2xl backdrop-blur-xs border border-white/5">
                    
                    {/* Live Heart Rate Simulator Row */}
                    <div className="flex items-center gap-3">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ repeat: Infinity, duration: 60 / simulatedHeartRate }}
                        className="h-8 w-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                      >
                        <Heart size={14} fill="currentColor" />
                      </motion.div>
                      <div>
                        <span className="text-[7px] font-black uppercase text-muted-foreground block tracking-wider">Heart Rate Monitor</span>
                        <span className="text-xl font-black text-white leading-none">{simulatedHeartRate} <span className="text-[8px] font-bold text-red-400">BPM</span></span>
                      </div>
                    </div>

                    {/* Live Compass Ring Heading Simulator Row */}
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <motion.div style={{ rotate: compassHeading }}>
                          <Navigation size={12} fill="currentColor" />
                        </motion.div>
                      </div>
                      <div>
                        <span className="text-[7px] font-black uppercase text-muted-foreground block tracking-wider">Compass Orientation Vector</span>
                        <span className="text-sm font-black text-white leading-none">NW • {compassHeading}° <span className="text-[8px] font-bold text-cyan-400">Bearing</span></span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Stats Footer Progress Line Strip */}
                  <div className="space-y-1 bg-black/40 p-2 rounded-b-xl border-t border-white/5 backdrop-blur-xs">
                    <div className="flex justify-between text-[7px] uppercase font-bold text-muted-foreground">
                      <span>Calorie Burn Pool</span>
                      <span className="text-white font-black">420 KCAL</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 border border-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: '65%' }} 
                        className="h-full bg-orange-500 shadow-[0_0_8px_#f97316]" 
                      />
                    </div>
                  </div>

                </motion.div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}