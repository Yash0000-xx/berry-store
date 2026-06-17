import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { audio } from '../utils/audioEngine'; 

export default function BudsModel() {
  const [isOpen, setIsOpen] = useState(false);

  // Mouse coordinates tracking for global 3D interactive perspective
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for custom fluid responsive layouts
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 22 });

  // Separate parallax parameters to let the earbuds float independently of the case when opened
  const baseLeftBudY = useTransform(mouseY, [-0.5, 0.5], [-25, -55]);
  const baseRightBudY = useTransform(mouseY, [-0.5, 0.5], [-55, -25]);
  const baseBudsRotate = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // ✨ CONDITION: If closed, override positions to slide perfectly inside the case chassis slots
  const leftBudY = useSpring(useTransform(() => isOpen ? baseLeftBudY.get() : 10), { stiffness: 100, damping: 18 });
  const rightBudY = useSpring(useTransform(() => isOpen ? baseRightBudY.get() : 10), { stiffness: 100, damping: 18 });
  const budsRotate = useSpring(useTransform(() => isOpen ? baseBudsRotate.get() : 0), { stiffness: 100, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleToggleCase = () => {
    audio.playOpen(); // Fire programmatic click chime
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex h-[460px] w-full items-center justify-center overflow-visible py-12 select-none">
      
      {/* 3D Viewport Box Wrapper */}
      <div 
        className="relative h-[300px] w-[300px] cursor-pointer [perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleToggleCase}
      >
        <motion.div
          className="relative h-full w-full flex items-center justify-center [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          
          {/* ✨ HIGH-KEY MINIMALIST: Ambient Floor Shadow Added Here */}
          <div className="absolute -bottom-14 h-12 w-56 rounded-[100%] bg-zinc-900/15 blur-xl [transform:translateZ(-30px)] pointer-events-none mix-blend-multiply" />

          {/* ==================== HIGH-KEY MINIMALIST CASE (BACK ENGINE LAYER) ==================== */}
          <div className="absolute h-48 w-60 rounded-[56px] bg-gradient-to-b from-white to-zinc-50 border-[5px] border-zinc-200 shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between p-4 [transform:translateZ(0px)] z-10 transition-colors">
            {/* Soft Metallic Lid Line Crevice split */}
            <div className="w-full h-[3px] bg-zinc-200 mt-12 rounded-full border-b border-white" />
            
            {/* Mini HUD Status Indicator Text */}
            <div className="text-[7px] font-mono font-black tracking-widest text-zinc-400 uppercase text-center mt-4">
              {isOpen ? "Ecosystem Unlocked" : "Click to Deploy Buds"}
            </div>

            {/* Glowing LED Core Battery Status Indicator Node */}
            <div className={`h-2 w-2 rounded-full transition-all duration-300 mb-4 ${
              isOpen 
                ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' 
                : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)] animate-pulse'
            }`} />
          </div>

          {/* ==================== LEFT FLOATING EARBUD ==================== */}
          <motion.div 
            className="absolute h-24 w-16 [transform-style:preserve-3d]"
            animate={{ 
              left: isOpen ? '24px' : '75px', 
              scale: isOpen ? 1 : 0.82,       
              opacity: isOpen ? 1 : 0.25,      
              z: isOpen ? 80 : -10            
            }}
            style={{ y: leftBudY, rotateZ: budsRotate }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            {/* Bud Tip Head Shape - White Ceramic */}
            <div className="absolute top-0 right-0 h-14 w-14 rounded-full bg-gradient-to-br from-white to-zinc-100 border border-zinc-200 shadow-xl flex items-center justify-center">
              {/* Silicone Tip & Acoustic Mesh */}
              <div className="h-8 w-8 rounded-full bg-zinc-50 border border-zinc-200 shadow-inner flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-zinc-800" />
              </div>
            </div>
            {/* Structural Downward Facing Mic Stem Handle */}
            <div className="absolute bottom-2 right-2 h-14 w-5 rounded-full bg-gradient-to-b from-white to-zinc-100 border-x border-b border-zinc-200 shadow-sm flex flex-col justify-end p-1">
              <div className="h-1.5 w-full rounded-full bg-zinc-300" />
            </div>
          </motion.div>


          {/* ==================== RIGHT FLOATING EARBUD ==================== */}
          <motion.div 
            className="absolute h-24 w-16 [transform-style:preserve-3d]"
            animate={{ 
              right: isOpen ? '24px' : '75px', 
              scale: isOpen ? 1 : 0.82,
              opacity: isOpen ? 1 : 0.25,
              z: isOpen ? 80 : -10
            }}
            style={{ y: rightBudY, rotateZ: budsRotate, scaleX: -1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            {/* Bud Tip Head Shape - White Ceramic */}
            <div className="absolute top-0 right-0 h-14 w-14 rounded-full bg-gradient-to-br from-white to-zinc-100 border border-zinc-200 shadow-xl flex items-center justify-center">
              {/* Silicone Tip & Acoustic Mesh */}
              <div className="h-8 w-8 rounded-full bg-zinc-50 border border-zinc-200 shadow-inner flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-zinc-800" />
              </div>
            </div>
            {/* Downward Facing Mic Stem Handle */}
            <div className="absolute bottom-2 right-2 h-14 w-5 rounded-full bg-gradient-to-b from-white to-zinc-100 border-x border-b border-zinc-200 shadow-sm flex flex-col justify-end p-1">
              <div className="h-1.5 w-full rounded-full bg-zinc-300" />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}