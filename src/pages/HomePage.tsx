import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
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
  
  // ==================== ✨ KINETIC SCROLL PARALLAX PHYSICS ====================
  const { scrollYProgress } = useScroll();
  
  // As the user scrolls down, the hero text smoothly scales down, fades out, and pushes back
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 50]);

  // ==================== ✨ MAGNETIC LIQUID PHYSICS (SILVER BLOOM) ====================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Generates a soft, premium silver gradient blob that perfectly tracks the cursor
  const bloomBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(228, 228, 231, 0.8), transparent 80%)`;

  // 🎡 Pure Framer Motion Drag Constraint Configuration
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (dragTargetRef.current && constraintsRef.current) {
      setDragWidth(dragTargetRef.current.scrollWidth - constraintsRef.current.offsetWidth);
    }
  }, [products]);

  const handleDragAnimation = () => {
    if (!dragTargetRef.current || !constraintsRef.current) return;
    const matrix = new WebKitCSSMatrix(window.getComputedStyle(dragTargetRef.current).transform);
    const currentX = Math.abs(matrix.m41);
    const totalScrollable = dragTargetRef.current.scrollWidth - constraintsRef.current.offsetWidth;
    setScrollProgress(currentX / totalScrollable || 0);
  };

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      document.documentElement.style.setProperty('--scroll-progress', latest.toFixed(4));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#18181b'); // Enforce strict dark accent for light theme
  }, [themeColors]);

  useEffect(() => {
    const sections = [
      { id: 'phone-section', theme: 'purple' as ProductTheme },
      { id: 'watch-section', theme: 'orange' as ProductTheme },
      { id: 'buds-section', theme: 'teal' as ProductTheme }
    ];

    const observerOptions = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };

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
    <main ref={pageRef} className="relative z-10 w-full bg-white text-zinc-900 transition-colors duration-700">
      <ProductDetailModal 
        product={activeConfigProduct as any} 
        isOpen={activeConfigProduct !== null} 
        onClose={() => setActiveConfigProduct(null)} 
      />

      {/* ==================== FLAGSHIP HERO 1: PHONE ==================== */}
      <section 
        id="phone-section" 
        onMouseMove={handleMouseMove}
        className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 pt-32 pb-12 relative overflow-hidden bg-[#fafafa]"
      >
        {/* ✨ Interactive Magnetic Bloom */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 mix-blend-multiply opacity-70 transition-opacity duration-300"
          style={{ background: bloomBackground }}
        />
        
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex flex-col items-center w-full"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-600 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-zinc-900"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
            </span>
            THE NEW BERRY 17 PRO CHASSIS IS HERE
          </div>

          <h1 className="bg-clip-text text-5xl font-black tracking-tighter text-zinc-900 sm:text-7xl lg:text-8xl">
            Titanium. <br />
            <span className="text-zinc-400">Liquid Obsidian.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm font-medium text-zinc-500 leading-relaxed md:text-base">
            Meet the absolute pinnacle of aesthetic engineering. A fully gesture-driven minimalist workspace wrapped completely around a hardware-accelerated 3D core.
          </p>
        </motion.div>

        <div className="relative z-20 mt-6 w-full max-w-lg drop-shadow-2xl"><PhoneModel /></div>
      </section>

      {/* ==================== FLAGSHIP HERO 2: WATCH ==================== */}
      <section id="watch-section" className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-20 bg-white relative">
        <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-500">
          SCULPTED FOR EXTREMES
        </div>
        <h2 className="relative z-10 text-5xl font-black tracking-tight text-zinc-900 sm:text-7xl">
          Berry Watch <br /><span className="text-zinc-400">Ultra Edition.</span>
        </h2>
        <p className="relative z-10 mt-6 max-w-xl text-sm font-medium text-zinc-500 leading-relaxed md:text-base">
          Forged in aerospace titanium. Engineered to survive the harshest depths and the highest peaks with custom multi-band tracking node sync.
        </p>
        <div className="relative z-10 mt-6 w-full max-w-lg drop-shadow-xl">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}><WatchModel /></motion.div>
        </div>
      </section>

      {/* ==================== FLAGSHIP HERO 3: BUDS ==================== */}
      <section id="buds-section" className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-20 bg-[#fafafa] border-t border-zinc-100 relative">
        <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-zinc-500 shadow-sm">
          ACOUSTIC ALCHEMY
        </div>
        <h2 className="relative z-10 text-5xl font-black tracking-tight text-zinc-900 sm:text-7xl">
          Berry Buds <br /><span className="text-zinc-400">Pro Audio Core.</span>
        </h2>
        <p className="relative z-10 mt-6 max-w-xl text-sm font-medium text-zinc-500 leading-relaxed md:text-base">
          A real-time adaptive sound stage driven entirely by neural noise cancellation. Sound architecture completely reinvented.
        </p>
        <div className="relative z-10 mt-6 w-full max-w-lg drop-shadow-xl">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}><BudsModel /></motion.div>
        </div>
      </section>

      {/* ==================== MASTER FRAMER MOTION DRAG CAROUSEL ==================== */}
      <section id="products" className="w-full py-24 bg-white overflow-hidden border-t border-zinc-200 relative">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-heading text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl flex items-center gap-2">
              Select Your Hardware. <span className="text-zinc-400 text-xs font-mono font-medium tracking-widest uppercase hidden sm:inline-block">Click & Drag Track</span>
            </h2>
            <p className="mt-2 text-sm font-medium text-zinc-500">
              A premium selection of hardware ecosystem cards engineered with fluent liquid custom primitives.
            </p>
          </div>

          <button
            onClick={() => { audio.playOpen(); setCompareOpen(true); }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-zinc-800 cursor-pointer self-center md:self-auto"
          >
            <ArrowRightLeft size={14} className="text-white" />
            Compare Ecosystem Models
          </button>
        </div>

        <div ref={constraintsRef} className="w-full overflow-hidden px-6 md:px-[calc((100vw-1200px)/2)] select-none">
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
                {/* ProductCard component remains here. We will update its theme next! */}
                <ProductCard 
                  product={item} 
                  onView={() => setActiveConfigProduct(item)}
                />
              </div>
            ))}
            
            <div className="w-[280px] rounded-[32px] border border-dashed border-zinc-300 bg-zinc-50 p-6 flex flex-col justify-between items-start text-left text-zinc-500">
              <div className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 font-black">Lab Pipeline</div>
              <div className="space-y-2">
                <h3 className="text-zinc-900 text-base font-black tracking-tight">More reveals coming soon.</h3>
                <p className="text-[10px] font-medium leading-relaxed">Our laboratory arrays are currently processing secondary custom configurations.</p>
              </div>
              <ArrowRight size={16} className="text-zinc-400" />
            </div>
          </motion.div>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="max-w-xs mx-auto h-[2px] bg-zinc-200 rounded-full overflow-hidden mt-4 relative">
          <motion.div 
            className="h-full bg-zinc-900"
            style={{ width: `${Math.max(15, scrollProgress * 100)}%` }} 
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          />
        </div>
      </section>
    </main>
  );
}