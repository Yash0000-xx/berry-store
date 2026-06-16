import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Phone, PhoneOff, Wifi, Battery, ShieldAlert } from 'lucide-react';
import { audio } from '../utils/audioEngine';

export default function PhoneModel() {
  const [isHovered, setIsHovered] = useState(false);
  const [signalStrength, setSignalStrength] = useState(4);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

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

  useEffect(() => {
    if (!isHovered) return;
    const signalTicker = setInterval(() => {
      setSignalStrength(() => Math.floor(Math.random() * 2) + 3);
    }, 800);
    return () => clearInterval(signalTicker);
  }, [isHovered]);

  return (
    <div className="relative flex h-[540px] w-full items-center justify-center overflow-visible select-none py-6">
      <div
        className="relative h-[440px] w-[220px] cursor-pointer [perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { setIsHovered(true); audio.playClick(); }}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-full w-full flex flex-col items-center justify-center"
        >
          {/* Hardware Obsidian Frame */}
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border-[4px] border-zinc-700/70 shadow-[0_30px_70px_rgba(0,0,0,0.85)] p-2 flex items-center justify-center">
            
            {/* Volume Buttons & Power Keys */}
            <div className="absolute left-[-6px] top-24 h-10 w-[3px] rounded-l-xs bg-zinc-800" />
            <div className="absolute left-[-6px] top-36 h-10 w-[3px] rounded-l-xs bg-zinc-800" />
            <div className="absolute right-[-6px] top-28 h-14 w-[3px] rounded-r-xs bg-zinc-800" />

            {/* AMOLED Screen Panel */}
            <div className="h-full w-full rounded-[32px] bg-black border border-black overflow-hidden relative p-3 flex flex-col justify-between">
              
              {/* LIVE EXTERNAL WALLPAPER LINK NODE */}
              <div className="absolute inset-0 z-0 bg-neutral-950">
                <img 
                  src="https://bzimg.ipl.com/uploads/thumbnail/virat-kohli-hd-phone-wallpaper-4659317733660632t1kvlw03h.jpg" 
                  alt="King Kohli Wallpaper" 
                  className="w-full h-full object-cover select-none pointer-events-none transition-all duration-500"
                  style={{ 
                    filter: isHovered ? 'brightness(0.7) contrast(1.05)' : 'brightness(0.45)',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
              </div>

              {/* Dynamic Island Capsule Node */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-4 w-16 bg-black rounded-full z-30 border border-white/5 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-900 ml-auto mr-1.5 border border-indigo-500/20" />
              </div>

              {/* ==================== SCREEN MODE 1: STANDBY CLOCK ==================== */}
              {!isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="h-full w-full flex flex-col justify-between pt-4 font-mono text-[8px] relative z-10 animate-in fade-in duration-200"
                >
                  {/* Top Status Bar Row */}
                  <div className="flex justify-between items-center text-white/80 px-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] font-bold">
                    <span>BERRY OS</span>
                    <div className="flex items-center gap-1">
                      <Wifi size={8} />
                      <Battery size={8} />
                    </div>
                  </div>

                  {/* ✨ FIXED: Time and Date display pushed cleanly to the top third block, clear of the central portrait */}
                  <div className="text-center w-full mt-3 px-2 space-y-0.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    <div className="text-[7px] font-bold tracking-widest text-white/70 uppercase">Tuesday, June 16</div>
                    <div className="text-4xl font-black tracking-tight text-white leading-none">10:09</div>
                    <div className="text-[6px] font-black tracking-widest text-cyan-400 uppercase mt-1">System Linked</div>
                  </div>

                  {/* Flexible Layout Spacer */}
                  <div className="flex-1" />

                  {/* Bottom Operational Action Prompt */}
                  <div className="rounded-2xl bg-black/50 border border-white/10 p-2 text-center text-white/90 text-[7px] tracking-widest uppercase font-bold backdrop-blur-xs shadow-md">
                    Hover to Awaken Node
                  </div>
                </motion.div>
              )}

              {/* ==================== SCREEN MODE 2: ACTIVE RE-ACTIVE TELEMETRY ==================== */}
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full w-full flex flex-col justify-between pt-4 font-mono text-[8px] relative z-10"
                >
                  <div className="flex justify-between items-center text-cyan-400 px-1 font-black drop-shadow-md">
                    <span className="animate-pulse flex items-center gap-1">
                      <Wifi size={8} /> NET_{signalStrength}G
                    </span>
                    <span className="text-white">98%</span>
                  </div>

                  {/* Incoming Call Simulated Component Panel */}
                  <div className="text-center my-auto space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="relative mx-auto h-11 w-11 rounded-full border border-cyan-400/30 bg-black/60 flex items-center justify-center text-cyan-400 backdrop-blur-xs">
                      <ShieldAlert size={18} className="animate-pulse" />
                      <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-20" />
                    </div>
                    
                    <div className="bg-black/60 p-2 rounded-xl border border-white/10 backdrop-blur-xs max-w-[160px] mx-auto shadow-xl">
                      <h3 className="text-[9px] font-black text-white tracking-wider uppercase">Neural Core Alpha</h3>
                      <p className="text-[6px] text-cyan-400 mt-0.5 tracking-widest uppercase font-bold">Secure Connection Vector</p>
                    </div>

                    <div className="flex justify-center gap-5 pt-1">
                      <div className="h-8 w-8 rounded-full bg-red-500/90 border border-red-600 flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform">
                        <PhoneOff size={11} />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-emerald-500/90 border border-emerald-600 flex items-center justify-center text-white shadow-lg animate-bounce transform hover:scale-105 transition-transform">
                        <Phone size={11} />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 bg-black/60 py-1 rounded-t-xl text-[7px] text-center text-cyan-400 font-black tracking-widest uppercase backdrop-blur-xs">
                    Quantum Stream Active
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