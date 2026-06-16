import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Maximize2, Minimize2, Radio } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useCurrencyStore } from '../store/currencyStore';
import { useThemeStore } from '../store/themeStore';

interface LogLine {
  id: string;
  timestamp: string;
  channel: 'SYS' | 'CORE' | 'VRAM' | 'CART';
  text: string;
}

export default function DevConsole() {
  const [isOpen, setIsOpen] = useState(true);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hook variables to track system metrics
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const currency = useCurrencyStore((state) => state.currency);
  const { activeTheme } = useThemeStore();

  // Helper utility to generate clean stream time stamps
  const getFormattedTime = () => {
    const d = new Date();
    return `${d.toLocaleTimeString().split(' ')[0]}.${String(d.getMilliseconds()).padStart(3, '0')}`;
  };

  // Helper utility to inject lines into the scrolling array
  const pushLogLine = (channel: LogLine['channel'], text: string) => {
    const line: LogLine = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: getFormattedTime(),
      channel,
      text
    };
    setLogs((prev) => [...prev, line].slice(-40)); // Keep buffer locked to last 40 rows
  };

  // 1. Initial boot log diagnostic broadcast sequencing
  useEffect(() => {
    pushLogLine('SYS', 'Initializing Berry Hardware Lab boot sequencing...');
    setTimeout(() => pushLogLine('CORE', 'Liquid Obsidian graphics driver linked: 60fps stable'), 200);
    setTimeout(() => pushLogLine('VRAM', 'Z-Axis Perspective Matrix configured: perspective cache loaded'), 400);
    setTimeout(() => pushLogLine('SYS', 'Ecosystem diagnostics clear. Sandbox pipeline active.'), 600);
  }, []);

  // 2. Observer: Log real-time color theme shifts on scroll
  useEffect(() => {
    pushLogLine('SYS', `Observer alert: viewport intersection boundary altered -> focus shifted to [${activeTheme.toUpperCase()}] matrix`);
  }, [activeTheme]);

  // 3. Observer: Log currency recalculation states
  useEffect(() => {
    pushLogLine('CORE', `Recalculating price tables: currency mapping changed to currency mode [${currency}]`);
  }, [currency]);

  // 4. Observer: Log e-commerce bag transaction injections
  useEffect(() => {
    if (totalCartItems > 0) {
      pushLogLine('CART', `Zustand synchronized: storage cache modified -> total item weight count [${totalCartItems}]`);
    }
  }, [totalCartItems]);

  // 5. Ambient tracker: Monitor mouse velocity loops
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    
    const sampleVelocity = (e: MouseEvent) => {
      const speedX = Math.abs(e.clientX - lastX);
      const speedY = Math.abs(e.clientY - lastY);
      const currentVelocity = Math.round(speedX + speedY);

      // Only broadcast log bursts if the movement velocity crosses a high tracking vector limit
      if (currentVelocity > 140) {
        pushLogLine('VRAM', `3D Canvas micro-tilt refreshed: mouse velocity tracking active [${currentVelocity} vectors/sec]`);
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('mousemove', sampleVelocity);
    return () => window.removeEventListener('mousemove', sampleVelocity);
  }, []);

  // Force auto-scrolling to snap view directly to the newest logs at the bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono text-[9px] select-none text-white/80 hidden lg:block">
      <AnimatePresence initial={false}>
        {isOpen ? (
          /* ==================== EXPANDED TERMINAL FRAME ==================== */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="w-[310px] h-[190px] rounded-2xl border border-white/5 bg-black/80 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col justify-between"
          >
            {/* Header Module Meta Bar */}
            <div className="flex items-center justify-between bg-white/2 border-b border-white/5 px-3 py-1.5 text-[8px] tracking-wider uppercase font-bold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Terminal size={10} className="text-accent" />
                <span>DevCore Log Monitor</span>
                <Radio size={8} className="text-emerald-400 animate-pulse" />
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                <Minimize2 size={10} />
              </button>
            </div>

            {/* Scrolling Logs Output Monitor Window */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-2.5 space-y-1.5 scrollbar-none max-h-[145px]"
            >
              {logs.map((log) => {
                const colorMap = {
                  SYS: 'text-purple-400',
                  CORE: 'text-blue-400',
                  VRAM: 'text-orange-400',
                  CART: 'text-emerald-400'
                };

                return (
                  <div key={log.id} className="leading-relaxed whitespace-normal break-all">
                    <span className="text-white/30">[{log.timestamp}]</span>{' '}
                    <span className={`font-black ${colorMap[log.channel]}`}>{log.channel}</span>{' '}
                    <span className="text-white/70">{log.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ==================== COLLAPSED ICON TRIGGER TILE ==================== */
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setIsOpen(true)}
            className="flex h-9 items-center gap-2 rounded-xl border border-white/5 bg-black/80 px-3 shadow-xl backdrop-blur-md text-[8px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-all hover:scale-105 cursor-pointer"
          >
            <Terminal size={12} className="text-accent" />
            <span>Open Core Log</span>
            <Maximize2 size={8} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}