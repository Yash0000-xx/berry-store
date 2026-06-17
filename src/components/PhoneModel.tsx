import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Wifi, Battery } from 'lucide-react';

// ==========================================
// INLINED DEPENDENCIES (To guarantee no compile errors)
// ==========================================
const audio = {
  playClick: () => {
    // Optional placeholder if audio engine isn't ready
  }
};

const BerryLogo = () => (
  <svg width="38" height="44" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="berry-left" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#52525b" />
        <stop offset="70%" stopColor="#18181b" />
        <stop offset="100%" stopColor="#09090b" />
      </radialGradient>
      <radialGradient id="berry-right" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#3f3f46" />
        <stop offset="75%" stopColor="#09090b" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
      <radialGradient id="berry-top" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#71717a" />
        <stop offset="70%" stopColor="#27272a" />
        <stop offset="100%" stopColor="#18181b" />
      </radialGradient>
      <linearGradient id="leaf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3f3f46" />
        <stop offset="100%" stopColor="#18181b" />
      </linearGradient>
      <linearGradient id="leaf-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#52525b" />
        <stop offset="100%" stopColor="#09090b" />
      </linearGradient>
    </defs>
    <path d="M22 14C22 8 26 4 32 3" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
    <path d="M22 14C14 10 6 13 4 18C4 24 14 22 22 14Z" fill="url(#leaf-grad-1)" />
    <path d="M22 14C28 8 36 9 39 14C41 20 31 20 22 14Z" fill="url(#leaf-grad-2)" />
    <circle cx="15" cy="37" r="11" fill="url(#berry-left)" />
    <circle cx="15" cy="37" r="11" fill="black" fillOpacity="0.2" />
    <ellipse cx="12.5" cy="32.5" rx="3" ry="1.5" transform="rotate(-30 12.5 32.5)" fill="white" fillOpacity="0.3" />
    <circle cx="10" cy="35" r="0.75" fill="white" fillOpacity="0.5" />
    <circle cx="29" cy="37" r="11" fill="url(#berry-right)" />
    <circle cx="29" cy="37" r="11" fill="black" fillOpacity="0.2" />
    <ellipse cx="26.5" cy="32.5" rx="3" ry="1.5" transform="rotate(-30 26.5 32.5)" fill="white" fillOpacity="0.3" />
    <circle cx="24" cy="35" r="0.75" fill="white" fillOpacity="0.5" />
    <circle cx="22" cy="25" r="12" fill="url(#berry-top)" />
    <ellipse cx="19.5" cy="20.5" rx="3.5" ry="1.8" transform="rotate(-30 19.5 20.5)" fill="white" fillOpacity="0.4" />
    <circle cx="16.5" cy="23" r="0.8" fill="white" fillOpacity="0.6" />
  </svg>
);


// ==========================================
// MAIN COMPONENT
// ==========================================
export default function PhoneModel() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [, setSignalStrength] = useState(4);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax constraints
  const baseRotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const baseRotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  // Flip logic: Add 180 degrees smoothly when hovered
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
    setIsFlipped(false);
  };

  const handleMouseEnter = () => {
    setIsFlipped(true);
    audio.playClick();
  };

  useEffect(() => {
    if (isFlipped) return;
    const signalTicker = setInterval(() => {
      setSignalStrength(() => Math.floor(Math.random() * 2) + 3);
    }, 800);
    return () => clearInterval(signalTicker);
  }, [isFlipped]);

  return (
    <div className="relative flex h-[540px] w-full items-center justify-center select-none py-6">
      
      {/* Floor Shadow */}
      <div className="absolute -bottom-8 h-12 w-64 rounded-[100%] bg-orange-900/15 blur-2xl pointer-events-none mix-blend-multiply" />

      {/* Perspective Container */}
      <div
        className="relative h-[440px] w-[220px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 3D Rotating Wrapper */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="relative h-full w-full transition-shadow duration-500 hover:shadow-2xl rounded-[40px]"
        >
          
          {/* ========================================================= */}
          {/* 1. CHASSIS (The edge/thickness of the phone) */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 rounded-[40px] border-[4px] shadow-[0_30px_70px_rgba(120,50,10,0.25)]"
            style={{
              // Refined chassis gradient to match the smoother Cosmic Orange
              background: 'linear-gradient(155deg, #ed8239 0%, #cf631b 18%, #ad4c10 38%, #8f3b07 52%, #ba5513 68%, #d1661c 84%, #e87e35 100%)',
              borderColor: '#b55a22',
              transform: 'translateZ(0px)', // Neutral center
            }}
          >
            {/* Brushed metal grain texture overlay */}
            <div
              className="absolute inset-0 rounded-[36px] opacity-40 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: 'repeating-linear-gradient(95deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)',
              }}
            />
            {/* Chamfer highlight edge — simulates polished bevel catching light */}
            <div className="absolute inset-0 rounded-[40px] pointer-events-none" style={{ boxShadow: 'inset 0 1px 1px rgba(255,220,190,0.5), inset 0 -2px 4px rgba(60,20,0,0.35)' }} />

            {/* Physical Titanium Buttons */}
            <div className="absolute left-[-6px] top-[78px] h-7 w-[3px] rounded-l-xs shadow-inner" style={{ background: 'linear-gradient(90deg, #8f3b07, #d1661c)' }} />
            <div className="absolute left-[-6px] top-28 h-10 w-[3px] rounded-l-xs shadow-inner" style={{ background: 'linear-gradient(90deg, #8f3b07, #d1661c)' }} />
            <div className="absolute left-[-6px] top-[154px] h-10 w-[3px] rounded-l-xs shadow-inner" style={{ background: 'linear-gradient(90deg, #8f3b07, #d1661c)' }} />
            <div className="absolute right-[-6px] top-28 h-16 w-[3px] rounded-r-xs shadow-inner" style={{ background: 'linear-gradient(90deg, #d1661c, #8f3b07)' }} />
          </div>


          {/* ========================================================= */}
          {/* 2. FRONT FACE (The Screen) */}
          {/* ========================================================= */}
          <div
            className="absolute inset-[2px] rounded-[34px] bg-black border-[3px] border-black overflow-hidden flex flex-col justify-between p-3"
            style={{
              transform: 'translateZ(1px)', // Pushed slightly to the front
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Wallpaper */}
            <div className="absolute inset-0 z-0 bg-neutral-950">
              <div
                className="w-full h-full select-none pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, #ff8a3d 0%, #d4541a 30%, #5c2410 60%, #0a0604 100%)' }}
              />
              <div className="absolute top-1/4 left-1/3 h-24 w-24 rounded-full bg-orange-400/30 blur-2xl" />
              <div className="absolute bottom-1/4 right-1/4 h-20 w-20 rounded-full bg-amber-600/20 blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-[18px] w-[68px] bg-black rounded-full z-30 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.5)] border border-zinc-900">
              <div className="h-2 w-2 rounded-full bg-[#111] ml-auto mr-2 border border-white/5" />
            </div>

            {/* Lock Screen UI */}
            <div className="h-full w-full flex flex-col justify-between pt-4 font-mono text-[8px] relative z-10">
              <div className="flex justify-between items-center text-white/90 px-1 drop-shadow-md font-bold">
                <span>BERRY OS</span>
                <div className="flex items-center gap-1">
                  <Wifi size={8} />
                  <Battery size={8} />
                </div>
              </div>

              <div className="text-center w-full mt-3 px-2 space-y-0.5 drop-shadow-lg">
                <div className="text-[7px] font-bold tracking-widest text-white/80 uppercase">Tuesday, June 16</div>
                <div className="text-4xl font-black tracking-tight text-white leading-none">10:09</div>
                <div className="text-[6px] font-black tracking-widest text-zinc-300 uppercase mt-1">Hover to Inspect Chassis</div>
              </div>

              <div className="flex-1" />
            </div>
          </div>


          {/* ========================================================= */}
          {/* 3. BACK FACE (Camera & Logo) */}
          {/* ========================================================= */}
          <div
            className="absolute inset-[2px] rounded-[34px] shadow-inner"
            style={{
              transform: 'rotateY(180deg) translateZ(1px)', // Flipped 180deg and pushed slightly to the back
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Refined back glass color to match the vibrant solid orange in the reference
              background: 'linear-gradient(160deg, #ed8239 0%, #db6e22 40%, #c45c15 100%)',
            }}
          >
            {/* 3A. Isolated Background Textures */}
            <div className="absolute inset-0 rounded-[34px] overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
                style={{
                  backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0px, transparent 1px, transparent 2px)',
                  backgroundSize: '3px 3px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-amber-950/20" />
              <div className="absolute -inset-10 bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-12" />
            </div>

            {/* 3B. The Hardware Features (Safely layered on top using standard z-index) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              
              {/* ✨ WIDE HORIZONTAL CAMERA PLATEAU (iPhone 17 Pro Style) */}
              <div
                className="absolute top-[14px] left-[12px] right-[12px] h-[96px] rounded-[28px] shadow-[0_8px_20px_rgba(150,50,0,0.3),inset_0_1.5px_3px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden"
                style={{ background: 'linear-gradient(145deg, #f7904b 0%, #e37426 50%, #cd6015 100%)' }}
              >
                {/* Plateau texture sheen to make it look like raised frosted glass */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 mix-blend-overlay pointer-events-none" />

                {/* Lens 1: Top Left */}
                <div className="absolute top-[8px] left-[12px] h-[38px] w-[38px] rounded-full bg-zinc-950 border-[2px] border-zinc-700/60 shadow-[inset_0_3px_10px_rgba(0,0,0,1),0_2px_5px_rgba(0,0,0,0.25)] flex items-center justify-center">
                  <div className="h-[16px] w-[16px] rounded-full bg-[#050505] shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)] flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-800/40 blur-[0.5px]" />
                  </div>
                </div>

                {/* Lens 2: Bottom Left */}
                <div className="absolute bottom-[8px] left-[12px] h-[38px] w-[38px] rounded-full bg-zinc-950 border-[2px] border-zinc-700/60 shadow-[inset_0_3px_10px_rgba(0,0,0,1),0_2px_5px_rgba(0,0,0,0.25)] flex items-center justify-center">
                  <div className="h-[16px] w-[16px] rounded-full bg-[#050505] shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)] flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-purple-800/40 blur-[0.5px]" />
                  </div>
                </div>

                {/* Lens 3: Center (Nestled between the top and bottom lenses) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[54px] h-[38px] w-[38px] rounded-full bg-zinc-950 border-[2px] border-zinc-700/60 shadow-[inset_0_3px_10px_rgba(0,0,0,1),0_2px_5px_rgba(0,0,0,0.25)] flex items-center justify-center">
                  <div className="h-[16px] w-[16px] rounded-full bg-[#050505] shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)] flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-sm bg-zinc-800 border border-zinc-900/80" />
                  </div>
                </div>

                {/* Flash (Top Right) */}
                <div className="absolute top-[16px] right-[20px] h-[18px] w-[18px] rounded-full bg-zinc-100/95 border border-zinc-300/50 shadow-[inset_0_1px_3px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
                   <div className="w-full h-1/2 bg-yellow-100/90 absolute top-0" />
                   <div className="w-full h-1/2 bg-amber-200/90 absolute bottom-0" />
                </div>

                {/* LiDAR Scanner (Bottom Right) */}
                <div className="absolute bottom-[16px] right-[20px] h-[18px] w-[18px] rounded-full bg-zinc-900 border border-zinc-700/80 shadow-inner flex items-center justify-center">
                  <div className="h-[7px] w-[7px] rounded-full bg-[#0a0a0a]" />
                </div>

                {/* Microphone pinhole */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[44px] h-[5px] w-[5px] rounded-full bg-zinc-950/90 shadow-inner border border-white/10" />
              </div>

              {/* Logo - Adjusted to mimic the embedded, etched Apple logo look */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 opacity-[0.25] mix-blend-multiply">
                <BerryLogo />
              </div>

              {/* Regulatory Markings */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-[5px] font-mono font-bold text-orange-950/50 tracking-widest uppercase text-center opacity-70">
                Berry Inc. Assembled in the Lab.<br/>Model B17-PRO · Cosmic Orange
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}