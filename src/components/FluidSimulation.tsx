import { useEffect, useRef } from 'react';
import { useThemeStore } from '../store/themeStore';

interface FluidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
}

export default function FluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { activeTheme } = useThemeStore();
  
  // Track global theme accents to tint particle structures live
  const themeAccentRef = useRef<string>('#7B2FBE');
  const particlesRef = useRef<FluidParticle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    switch (activeTheme) {
      case 'orange':
        themeAccentRef.current = '#f97316';
        break;
      case 'teal':
        themeAccentRef.current = '#06b6d4';
        break;
      case 'purple':
      default:
        themeAccentRef.current = '#7B2FBE';
        break;
    }
  }, [activeTheme]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    // Resize handler to match screen layout bounds completely
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize an array pool of 1,200 fluid loop particles
    const particleCount = 1200;
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() * 2 - 1) * 0.5,
      vy: (Math.random() * 2 - 1) * 0.5,
      alpha: Math.random() * 0.5 + 0.2
    }));

    // Mouse interactive listener configurations
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Core Frame Paint Loop Architecture (Mimicking high-end custom fragment buffers)
    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);

      // Create trailing fluid memory viscosity blend effect
      ctx.fillStyle = 'rgba(10, 5, 20, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const activeColor = themeAccentRef.current;

      ctx.fillStyle = activeColor;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply mouse drag proximity kinetic energy displacement force fields
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Create visceral surface tension ripple waves
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.8;
            p.vy += Math.sin(angle) * force * 0.8;
          }
        }

        // Apply ambient viscous resistance dragging dampening vectors
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Apply base drift flow speed thresholds
        p.x += p.vx + (Math.random() * 0.2 - 0.1);
        p.y += p.vy + (Math.random() * 0.2 - 0.1);

        // Frame perimeter loop wrap bounds checks
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Render individual liquid particles onto the hardware view map canvas layout
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0; // Reset alpha channels explicitly
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden w-full h-full"
    />
  );
}