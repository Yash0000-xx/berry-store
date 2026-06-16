import { Sparkles, Shield, Cpu, RefreshCw } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-black/40 backdrop-blur-md text-muted-foreground mt-12">
      
      {/* ==================== UPPER SECTION: SYSTEM STATUS STRIP ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex items-center gap-2.5 hover:text-white transition-colors">
          <Cpu size={14} className="text-accent animate-pulse" />
          <span>Core Matrix: Optimal</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-white transition-colors">
          <Shield size={14} className="text-primary" />
          <span>AES-256 Encrypted</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-white transition-colors">
          <RefreshCw size={14} className="text-orange-400 animate-spin [animation-duration:8s]" />
          <span>Ecosystem Sync: Live</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-white transition-colors">
          <Sparkles size={14} className="text-magenta-400" />
          <span>Aura Engine Active</span>
        </div>
      </div>

      {/* ==================== MIDDLE SECTION: APPLE-STYLE DIRECTORY LINKS ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        
        {/* Column 1 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-white tracking-wider uppercase text-[10px]">Explore Lineup</h4>
          <ul className="space-y-2">
            <li><a href="#phone" className="hover:text-white transition-colors">Berry Phone 17 Pro</a></li>
            <li><a href="#watch" className="hover:text-white transition-colors">Berry Watch Ultra</a></li>
            <li><a href="#buds" className="hover:text-white transition-colors">Berry Buds Pro</a></li>
            <li><a href="#products" className="hover:text-white transition-colors">Spatial Vision Pro</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-white tracking-wider uppercase text-[10px]">Ecosystem Services</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Berry OS 17 Matrix</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Neural Core ID</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Cloud Obsidian Storage</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Liquid Pay Terminal</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-white tracking-wider uppercase text-[10px]">Account & Bag</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Manage Neural ID</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Berry Bag Orders</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Ecosystem Preferences</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Developer Portal Sandbox</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-white tracking-wider uppercase text-[10px]">Corporate Values</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition-colors">Aesthetic Engineering Lab</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Carbon Neutral Logistics</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Privacy Charter Core</a></li>
            <li><a href="/" className="hover:text-white transition-colors">Investor Analytics</a></li>
          </ul>
        </div>

      </div>

      {/* ==================== LOWER SECTION: LEGAL & BRANDING SIGNATURE ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-wide font-medium">
        <div>
          <span>Copyright © {currentYear} </span>
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent font-black">BERRY Inc.</span>
          <span> All rights reserved across the liquid space.</span>
        </div>
        
        <div className="flex gap-4 opacity-75">
          <a href="/" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="/" className="hover:text-white transition-colors">Terms of Sale</a>
          <span>•</span>
          <a href="/" className="hover:text-white transition-colors">Site Map Matrix</a>
        </div>
      </div>

    </footer>
  );
}