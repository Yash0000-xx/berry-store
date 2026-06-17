import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Navigation, Radio, Activity } from 'lucide-react';

// ==========================================
// INLINED DEPENDENCIES
// ==========================================
const audio = {
  playClick: () => {
    // Optional placeholder
  }
};

const BerryLogo = () => (
  <svg width="24" height="28" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="watch-berry-left" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#71717a" />
        <stop offset="100%" stopColor="#18181b" />
      </radialGradient>
      <radialGradient id="watch-berry-right" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#52525b" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
      <radialGradient id="watch-berry-top" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#a1a1aa" />
        <stop offset="100%" stopColor="#27272a" />
      </radialGradient>
      <linearGradient id="watch-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#71717a" />
        <stop offset="100%" stopColor="#27272a" />
      </linearGradient>
    </defs>
    <path d="M22 14C22 8 26 4 32 3" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
    <path d="M22 14C14 10 6 13 4 18C4 24 14 22 22 14Z" fill="url(#watch-leaf)" />
    <path d="M22 14C28 8 36 9 39 14C41 20 31 20 22 14Z" fill="url(#watch-leaf)" />
    <circle cx="15" cy="37" r="11" fill="url(#watch-berry-left)" />
    <circle cx="29" cy="37" r="11" fill="url(#watch-berry-right)" />
    <circle cx="22" cy="25" r="12" fill="url(#watch-berry-top)" />
  </svg>
);

export default function WatchModel() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // New state for flipping
  const [simulatedHeartRate, setSimulatedHeartRate] = useState(72);
  const [compassHeading, setCompassHeading] = useState(0);

  // Hardware mouse-tracking coordinate springs for 3D tilting
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const baseRotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const baseRotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  // Add 180 degrees when clicked to flip
  const targetRotateY = useTransform(
    () => baseRotateY.get() + (isFlipped ? 180 : 0)
  );

  const rotateX = useSpring(baseRotateX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(targetRotateY, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
    setIsFlipped(false); // Auto-flip back when leaving
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    audio.playClick();
  };

  // Active Demo Simulator
  useEffect(() => {
    if (!isHovered || isFlipped) return;

    const simulationTicker = setInterval(() => {
      setSimulatedHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(130, Math.min(145, prev + delta));
      });
      setCompassHeading((prev) => (prev + 3) % 360);
    }, 200);

    setSimulatedHeartRate(134);
    return () => clearInterval(simulationTicker);
  }, [isHovered, isFlipped]);

  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-visible select-none py-8">
      
      {/* Dynamic Mode Notification Chip */}
      <div className="absolute top-4 right-12 bg-black/40 border border-white/5 px-3 py-1 rounded-full text-[8px] font-mono tracking-widest uppercase font-bold text-muted-foreground flex items-center gap-1.5 backdrop-blur-md z-50">
        <Activity size={10} className={isHovered && !isFlipped ? 'text-orange-500 animate-pulse' : ''} />
        <span>Watch Engine: {isHovered && !isFlipped ? 'Telemetry Active' : 'Standby Matrix'}</span>
      </div>

      {/* Floating Action Hint */}
      <div className="absolute bottom-4 text-[10px] font-mono font-bold text-orange-500/80 tracking-widest uppercase animate-pulse">
        {isFlipped ? "Click to view display" : "Click to inspect sensors"}
      </div>

      <div
        className="relative h-[280px] w-[230px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-full w-full flex flex-col items-center justify-center transition-shadow duration-300"
        >
          {/* ==================== STRAPS (Ocean Band Style) ==================== */}
          {/* Top Strap */}
          <div 
            className="absolute top-[-100px] w-[140px] h-[130px] rounded-t-3xl bg-orange-500 border-x-2 border-t-2 border-orange-600 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]"
            style={{ 
              transform: 'translateZ(-4px)',
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 12px, rgba(0,0,0,0.15) 12px, rgba(0,0,0,0.15) 16px)'
            }} 
          >
            {/* Strap Loop Hardware */}
            <div className="absolute top-[20px] left-[-4px] right-[-4px] h-[10px] rounded-full bg-zinc-400 border border-zinc-500 shadow-md" />
          </div>

          {/* Bottom Strap */}
          <div 
            className="absolute bottom-[-100px] w-[140px] h-[130px] rounded-b-3xl bg-orange-500 border-x-2 border-b-2 border-orange-600 shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            style={{ 
              transform: 'translateZ(-4px)',
              backgroundImage: 'repeating-linear-gradient(to top, transparent, transparent 12px, rgba(0,0,0,0.15) 12px, rgba(0,0,0,0.15) 16px)'
            }} 
          />


          {/* ==================== CHASSIS (Titanium Base) ==================== */}
          <div 
            className="absolute inset-0 rounded-[48px] border-[6px] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            style={{
              background: 'linear-gradient(135deg, #e4e4e7 0%, #a1a1aa 40%, #71717a 100%)',
              borderColor: '#d4d4d8',
              transform: 'translateZ(0px)',
            }}
          >
            {/* Left Action Button (International Orange) */}
            <div className="absolute left-[-9px] top-1/2 -translate-y-1/2 h-[60px] w-[4px] rounded-l-md bg-orange-500 shadow-[inset_-1px_0_2px_rgba(0,0,0,0.3)] border border-orange-600" />
            
            {/* Right Crown Guard (Titanium bump) */}
            <div className="absolute right-[-14px] top-[60px] h-[110px] w-[10px] rounded-r-[14px] bg-zinc-400 border-y border-r border-zinc-500 shadow-md flex flex-col items-center py-2 gap-4">
               {/* Digital Crown */}
               <div className="h-[36px] w-[6px] rounded-r-md bg-zinc-300 border border-zinc-400 relative overflow-hidden flex items-center justify-center shadow-sm">
                  {/* Crown Grooves */}
                  <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #000 0px, #000 1px, transparent 1px, transparent 3px)' }}/>
                  {/* Orange Ring */}
                  <div className="absolute left-[-2px] h-[24px] w-[4px] rounded-full border-[2px] border-orange-500 z-10" />
               </div>
               {/* Side Button */}
               <div className="h-[40px] w-[4px] rounded-r-sm bg-zinc-300 border border-zinc-400 shadow-inner" />
            </div>
          </div>


          {/* ==================== FRONT FACE (Screen UI) ==================== */}
          <div
            className="absolute inset-[4px] rounded-[42px] bg-[#050308] border-[4px] border-black overflow-hidden flex flex-col justify-between p-4"
            style={{
              transform: 'translateZ(1px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Topographical Wallpaper */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:12px_12px]" />
            <div 
              className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-screen bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q 25 35, 50 50 T 100 50 M0 20 Q 25 5, 50 20 T 100 20 M0 80 Q 25 65, 50 80 T 100 80' fill='none' stroke='%23f97316' stroke-width='1'/%3E%3C/svg%3E")`,
                filter: isHovered ? 'brightness(1.5) hue-rotate(15deg)' : 'brightness(1)'
              }}
            />

            {/* SCREEN MODE 1: STANDBY */}
            {!isHovered && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="h-full w-full flex flex-col justify-between animate-in fade-in duration-300 relative z-10"
              >
                <div className="flex justify-between items-center text-[10px] font-mono font-black text-orange-400 tracking-widest uppercase">
                  <span>Ultra Node</span>
                  <Radio size={12} className="animate-pulse" />
                </div>

                <div className="text-center font-mono my-auto">
                  <h1 className="text-[64px] font-black tracking-tight text-white/95 leading-[1.1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">10<br/>09</h1>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground mt-2">Ecosystem Synced</div>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-center justify-between font-mono text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                  <span>Altitude</span>
                  <span className="text-white font-black text-[11px]">2,414 M</span>
                </div>
              </motion.div>
            )}

            {/* SCREEN MODE 2: ACTIVE WORKOUT */}
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="h-full w-full flex flex-col justify-between font-mono text-[10px] relative z-10"
              >
                <div className="flex justify-between items-center border-b border-white/10 pb-2 bg-black/40 backdrop-blur-xs rounded-t-xl px-1">
                  <span className="font-black tracking-wider text-orange-400 uppercase flex items-center gap-1.5">
                    <Activity size={12} className="animate-bounce" /> Workout Live
                  </span>
                  <span className="text-[9px] text-white/40 font-bold">GPS-L5</span>
                </div>

                <div className="space-y-5 my-auto bg-black/30 p-3 rounded-[20px] backdrop-blur-md border border-white/10">
                  {/* Heart Rate */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 60 / simulatedHeartRate }}
                      className="h-10 w-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    >
                      <Heart size={18} fill="currentColor" />
                    </motion.div>
                    <div>
                      <span className="text-[8px] font-black uppercase text-muted-foreground block tracking-wider">Heart Rate Monitor</span>
                      <span className="text-2xl font-black text-white leading-none">{simulatedHeartRate} <span className="text-[10px] font-bold text-red-400">BPM</span></span>
                    </div>
                  </div>

                  {/* Compass */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <motion.div style={{ rotate: compassHeading }}>
                        <Navigation size={16} fill="currentColor" />
                      </motion.div>
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase text-muted-foreground block tracking-wider">Compass Vector</span>
                      <span className="text-lg font-black text-white leading-none">NW • {compassHeading}°</span>
                    </div>
                  </div>
                </div>

                {/* Footer Progress */}
                <div className="space-y-1.5 bg-black/50 p-3 rounded-b-2xl border-t border-white/10 backdrop-blur-md">
                  <div className="flex justify-between text-[8px] uppercase font-bold text-muted-foreground">
                    <span>Calorie Burn Pool</span>
                    <span className="text-white font-black">420 KCAL</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 border border-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: '65%' }} 
                      className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]" 
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>


          {/* ========================================================= */}
          {/* 3. BACK FACE (Sensors & Ceramic Back) */}
          {/* ========================================================= */}
          <div
            className="absolute inset-[4px] rounded-[42px] shadow-inner bg-zinc-900 border-[2px] border-zinc-800 flex flex-col items-center justify-center"
            style={{
              transform: 'rotateY(180deg) translateZ(1px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Ceramic Sheen */}
            <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/10 via-transparent to-black/60 pointer-events-none" />

            {/* Top Logo */}
            <div className="absolute top-[24px] opacity-40 mix-blend-screen drop-shadow-sm">
              <BerryLogo />
            </div>

            {/* Central Sensor Dome (Sapphire Crystal) */}
            <div className="h-[110px] w-[110px] rounded-full bg-black border-4 border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_5px_15px_rgba(255,255,255,0.1)] relative flex items-center justify-center overflow-hidden">
              
              {/* Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-full" />
              
              {/* Center Rx Sensor */}
              <div className="h-6 w-6 rounded-full bg-zinc-900 border border-zinc-700/50 shadow-inner flex items-center justify-center">
                 <div className="h-2 w-2 rounded-full bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>

              {/* Surrounding LEDs */}
              {/* Top Green LED */}
              <div className="absolute top-[18px] h-4 w-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
              </div>
              {/* Bottom Green LED */}
              <div className="absolute bottom-[18px] h-4 w-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
              {/* Left Red LED */}
              <div className="absolute left-[18px] h-4 w-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
              </div>
              {/* Right Red LED */}
              <div className="absolute right-[18px] h-4 w-4 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,1)]">
                <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
              </div>

              {/* Concentric Ring Details */}
              <div className="absolute inset-2 border border-zinc-800/50 rounded-full pointer-events-none" />
              <div className="absolute inset-6 border border-zinc-800/30 rounded-full pointer-events-none" />
            </div>

            {/* Bottom Regulatory Text Rings */}
            <div className="absolute bottom-[24px] text-[5px] font-mono font-bold text-zinc-500 tracking-widest uppercase text-center w-full px-8">
              BERRY WATCH ULTRA • 49MM TITANIUM<br/>
              <span className="text-zinc-600">CERAMIC BACK • DIVE 100M • GPS + LTE</span>
            </div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}