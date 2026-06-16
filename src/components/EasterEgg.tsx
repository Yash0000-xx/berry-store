import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [keysTracked, setKeysTracked] = useState<string>('');

  // Audio Engine Hook: Synthesizes a raw frequency sweep
  const playSynthesizerTone = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Start at concert A (440Hz) and ramp up to octave high (880Hz)
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

      // Volume envelope configuration to prevent digital audio clipping
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    } catch (e) {
      console.warn("Audio Context blocked by browser permission matrix:", e);
    }
  };

  // Particle Cluster Generator
  const triggerExplosionMatrix = () => {
    const colors = ['#7B2FBE', '#E040FB', '#C084FC', '#D8B4FE', '#6B21A8'];
    const cluster = Array.from({ length: 50 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 250 + 100; // Force vector radius range
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6
      };
    });
    setParticles(cluster);
  };

  // Document Listener: Scans background keystroke queues
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive) return;

      // Append character token and clip window size to last 5 logs
      const updatedSequence = (keysTracked + e.key.toLowerCase()).slice(-5);
      setKeysTracked(updatedSequence);

      if (updatedSequence === 'berry') {
        setIsActive(true);
        playSynthesizerTone();
        triggerExplosionMatrix();
        setKeysTracked('');

        // Strict 3 second execution frame lifecycle reset
        setTimeout(() => {
          setIsActive(false);
          setParticles([]);
        }, 3000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keysTracked, isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-2xl overflow-hidden"
        >
          {/* Dynamic Exploding Vector Particle Field Container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full shadow-lg"
                style={{
                  backgroundColor: p.color,
                  width: p.size,
                  height: p.size,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x: p.x, 
                  y: p.y, 
                  opacity: 0,
                  scale: 0.2
                }}
                transition={{ 
                  duration: 2.2, 
                  ease: [0.1, 0.8, 0.3, 1] 
                }}
              />
            ))}
          </div>

          {/* Core Central Award Card Showcase */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative z-10 rounded-3xl border border-white/5 bg-white/5 p-8 text-center backdrop-blur-md shadow-[0_0_40px_rgba(224,64,251,0.3)] max-w-xs mx-4"
          >
            <div className="text-4xl mb-4 animate-bounce">🫐</div>
            <h2 className="font-heading text-xl font-black tracking-tight text-white">
              Matrix Verified!
            </h2>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              You found it! You are an authentic <span className="text-accent font-bold">BERRY</span> power user. System core diagnostics running optimal.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}