import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

export default function AuroraBackground() {
  const { activeTheme } = useThemeStore();

  // ✨ HIGH-KEY MINIMALIST STUDIO GLOWS
  const orb1Color = 
    activeTheme === 'orange' ? 'radial-gradient(circle, rgba(251,146,60,0.04) 0%, transparent 70%)' : // Warm Sand
    activeTheme === 'teal' ? 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' : // Cool Mist
    'radial-gradient(circle, rgba(161,161,170,0.08) 0%, transparent 70%)'; // Default Classic Silver

  const orb2Color = 
    activeTheme === 'orange' ? 'radial-gradient(circle, rgba(254,215,170,0.06) 0%, transparent 70%)' : 
    activeTheme === 'teal' ? 'radial-gradient(circle, rgba(165,243,252,0.06) 0%, transparent 70%)' : 
    'radial-gradient(circle, rgba(228,228,231,0.12) 0%, transparent 70%)';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white transition-colors duration-1000">
      
      {/* Ambient Studio Light 1 */}
      <motion.div 
        animate={{ 
          background: orb1Color,
          x: [0, 120, -60, 0],
          y: [0, 90, -40, 0],
          scale: [1, 1.1, 0.95, 1]
        }}
        transition={{ 
          background: { duration: 1.5, ease: "easeInOut" },
          default: { duration: 25, repeat: Infinity, ease: "easeInOut" } 
        }}
        className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full mix-blend-multiply"
      />

      {/* Ambient Studio Light 2 */}
      <motion.div 
        animate={{ 
          background: orb2Color,
          x: [0, -100, 80, 0],
          y: [0, -70, 50, 0],
          scale: [1.1, 0.9, 1.15, 1.1]
        }}
        transition={{ 
          background: { duration: 1.5, ease: "easeInOut" },
          default: { duration: 30, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-[20%] -right-[10%] h-[700px] w-[700px] rounded-full mix-blend-multiply"
      />

      {/* Clean White Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#ffffff_95%)] opacity-90" />
      
    </div>
  );
}