import { motion } from 'framer-motion';
import { useThemeStore } from '../store/themeStore';

export default function AuroraBackground() {
  const { activeTheme } = useThemeStore();

  // Map out coordinates or colors that adapt live based on the theme state
  const orb1Color = 
    activeTheme === 'orange' ? 'radial-gradient(circle, rgba(249,115,22,0.14) 0%, transparent 70%)' :
    activeTheme === 'teal' ? 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)' :
    'radial-gradient(circle, hsl(275 60% 46% / 0.18) 0%, transparent 70%)';

  const orb2Color = 
    activeTheme === 'orange' ? 'radial-gradient(circle, rgba(234,88,12,0.10) 0%, transparent 70%)' :
    activeTheme === 'teal' ? 'radial-gradient(circle, rgba(14,116,144,0.08) 0%, transparent 70%)' :
    'radial-gradient(circle, hsl(292 96% 61% / 0.12) 0%, transparent 70%)';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
      {/* Aurora Glass Layer 1 */}
      <motion.div 
        animate={{ background: orb1Color }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full animate-aurora-1 mix-blend-screen"
      />

      {/* Aurora Glass Layer 2 */}
      <motion.div 
        animate={{ background: orb2Color }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full animate-aurora-2 mix-blend-screen"
      />

      {/* Deep Obsidian Radial Backdrop Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,hsl(240_50%_3%)_80%)] opacity-80" />
    </div>
  );
}