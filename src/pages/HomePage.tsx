import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRightLeft, ArrowRight } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { useThemeStore, type ProductTheme } from '../store/themeStore';
import PhoneModel from '../components/PhoneModel';
import WatchModel from '../components/WatchModel';
import BudsModel from '../components/BudsModel';
import ProductDetailModal from '../components/ProductDetailModal';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { audio } from '../utils/audioEngine';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  storage: string[];
  tagline: string;
  image: string;
}

export default function HomePage() {
  const [activeConfigProduct, setActiveConfigProduct] = useState<Product | null>(null);
  const setCompareOpen = useUIStore((state) => state.setCompareOpen);
  
  const { setTheme, getThemeColors } = useThemeStore();
  const themeColors = getThemeColors();

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // 🎡 Pure Framer Motion Drag Constraint Configuration
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (dragTargetRef.current && constraintsRef.current) {
      // Calculate exactly how much space the cards take up beyond the screen boundaries
      setDragWidth(dragTargetRef.current.scrollWidth - constraintsRef.current.offsetWidth);
    }
  }, [products]);

  // Track the absolute layout positioning of the drag layer to update the indicator bar
  const handleDragAnimation = () => {
    if (!dragTargetRef.current || !constraintsRef.current) return;
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(dragTargetRef.current).transform);
    const currentX = Math.abs(matrix.m41); // Extract current pixel shift offset
    const totalScrollable = dragTargetRef.current.scrollWidth - constraintsRef.current.offsetWidth;
    setScrollProgress(currentX / totalScrollable || 0);
  };

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      document.documentElement.style.setProperty('--scroll-progress', latest.toFixed(4));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', themeColors.textClass.includes('purple') ? '#7B2FBE' : themeColors.textClass.includes('orange') ? '#f97316' : '#06b6d4');
  }, [themeColors]);

  useEffect(() => {
    const sections = [
      { id: 'phone-section', theme: 'purple' as ProductTheme },
      { id: 'watch-section', theme: 'orange' as ProductTheme },
      { id: 'buds-section', theme: 'teal' as ProductTheme }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sections.find(s => s.id === entry.target.id);
          if (matched) setTheme(matched.theme);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setTheme]);

  return (
    <main ref={pageRef} className="relative z-10 w-full">
      <ProductDetailModal 
        product={activeConfigProduct as any} 
        isOpen={activeConfigProduct !== null} 
        onClose={() => setActiveConfigProduct(null)} 
      />

      {/* ==================== FLAGSHIP HERO 1: PHONE ==================== */}
      <section id="phone-section" className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-32 pb-12 border-b border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'paint(circuit-board-traces)' }} />
        
        <motion.div 
          className={`mb-4 inline-flex items-center gap-2 rounded-full border bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-500 relative z-10 ${themeColors.borderClass} ${themeColors.textClass}`}
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${themeColors.accentClass}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${themeColors.accentClass}`}></span>
          </span>
          THE NEW BERRY 17 PRO CHASSIS IS HERE
        </motion.div>

        <h1 className="relative z-10 bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl">
          Titanium. <br />
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Liquid Obsidian.</span>
        </h1>
        <p className="relative z-10 mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed md:text-base">
          Meet the absolute pinnacle of aesthetic engineering. A fully gesture-driven dark workspace wrapped completely around a hardware-accelerated 3D core.
        </p>
        <div className="relative z-10 mt-6 w-full max-w-lg"><PhoneModel /></div>
      </section>

      {/* ==================== FLAGSHIP HERO 2: WATCH ==================== */}
      <section id="watch-section" className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-20 bg-black/10 border-b border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'paint(circuit-board-traces)' }} />
        <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/10 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-orange-400 backdrop-blur-md">
          SCULPTED FOR EXTREMES
        </div>
        <h2 className="relative z-10 bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl">
          Berry Watch <br /><span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Ultra Edition.</span>
        </h2>
        <p className="relative z-10 mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed md:text-base">
          Forged in aerospace titanium. Engineered to survive the harshest depths and the highest peaks with custom multi-band tracking node sync.
        </p>
        <div className="relative z-10 mt-6 w-full max-w-lg">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}><WatchModel /></motion.div>
        </div>
      </section>

      {/* ==================== FLAGSHIP HERO 3: BUDS ==================== */}
      <section id="buds-section" className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-20 bg-black/20 border-b border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'paint(circuit-board-traces)' }} />
        <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/10 bg-cyan-500/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-400 backdrop-blur-md">
          ACOUSTIC ALCHEMY
        </div>
        <h2 className="relative z-10 bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-7xl">
          Berry Buds <br /><span className="bg-linear-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">Pro Audio Core.</span>
        </h2>
        <p className="relative z-10 mt-6 max-w-xl text-sm text-muted-foreground leading-relaxed md:text-base">
          A real-time adaptive sound stage driven entirely by neural noise cancellation. Sound architecture completely reinvented.
        </p>
        <div className="relative z-10 mt-6 w-full max-w-lg">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}><BudsModel /></motion.div>
        </div>
      </section>

      {/* ==================== 🛠️ MASTER FRAMER MOTION DRAG CAROUSEL ==================== */}
      <section id="products" className="w-full py-24 bg-black/30 overflow-hidden border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl flex items-center gap-2">
              Select Your Hardware. <span className="text-muted-foreground text-xs font-mono font-medium tracking-widest uppercase hidden sm:inline-block">Click & Drag Track</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A premium selection of hardware ecosystem cards engineered with fluent liquid custom primitives.
            </p>
          </div>

          <button
            onClick={() => { audio.playOpen(); setCompareOpen(true); }}
            className={`inline-flex items-center justify-center gap-2 rounded-full border bg-white/5 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-white/10 cursor-pointer self-center md:self-auto ${themeColors.borderClass}`}
          >
            <ArrowRightLeft size={14} className={themeColors.textClass} />
            Compare Ecosystem Models
          </button>
        </div>

        {/* 1. Outer Frame Window bounds wrapper */}
        <div ref={constraintsRef} className="w-full overflow-hidden px-6 md:px-[calc((100vw-1200px)/2)] select-none">
          
          {/* 2. Hardware-Accelerated Dynamic Dragging Rail */}
          <motion.div
            ref={dragTargetRef}
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            onDrag={handleDragAnimation}
            className="flex gap-6 w-max cursor-grab active:cursor-grabbing pb-4"
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            {products.map((item) => (
              <div key={item.id} className="w-[290px] sm:w-[340px] pointer-events-auto">
                <ProductCard 
                  product={item} 
                  onView={() => setActiveConfigProduct(item)}
                />
              </div>
            ))}
            
            {/* Futuristic Coming Soon Card Holder */}
            <div className="w-[280px] rounded-[32px] border border-dashed border-white/10 bg-white/2 p-6 flex flex-col justify-between items-start text-left text-muted-foreground">
              <div className="text-[9px] font-mono tracking-widest uppercase text-accent font-black">Lab Pipeline</div>
              <div className="space-y-2">
                <h3 className="text-white text-base font-black tracking-tight">More reveals coming soon.</h3>
                <p className="text-[10px] leading-relaxed">Our laboratory arrays are currently processing secondary custom configurations.</p>
              </div>
              <ArrowRight size={16} className={themeColors.textClass} />
            </div>
          </motion.div>
        </div>

     {/* Apple-style Progress Bar */}
<div className="max-w-xs mx-auto h-[2px] bg-white/5 rounded-full overflow-hidden mt-4 relative">
  <motion.div 
    className="h-full bg-linear-to-r from-primary to-accent shadow-[0_0_8px_#e040fb]"
    style={{ width: `${Math.max(15, scrollProgress * 100)}%` }} // ✨ CHANGED: Move progress calculation directly to style for instant, smooth rendering
    transition={{ type: 'tween', ease: 'linear', duration: 0.1 }} // ✨ CHANGED: Replaced 'just' with a proper 'tween' type config
  />
</div>
      </section>
    </main>
  );
}