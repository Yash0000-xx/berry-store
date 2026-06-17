import { Sparkles, Shield, Cpu, RefreshCw } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // ✨ HIGH-KEY MINIMALIST FOOTER WRAPPER
    <footer className="relative z-10 w-full border-t border-zinc-200 bg-[#fafafa] text-zinc-500 transition-colors duration-700">
      
      {/* ==================== UPPER SECTION: SYSTEM STATUS STRIP ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-b border-zinc-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex items-center gap-2.5 hover:text-zinc-900 transition-colors cursor-default">
          <Cpu size={14} className="text-zinc-900 animate-pulse" />
          <span>Core Matrix: Optimal</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-zinc-900 transition-colors cursor-default">
          <Shield size={14} className="text-zinc-700" />
          <span>AES-256 Encrypted</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-zinc-900 transition-colors cursor-default">
          <RefreshCw size={14} className="text-zinc-500 animate-spin [animation-duration:8s]" />
          <span>Ecosystem Sync: Live</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-zinc-900 transition-colors cursor-default">
          <Sparkles size={14} className="text-zinc-400" />
          <span>Structural Core Active</span>
        </div>
      </div>

      {/* ==================== MIDDLE SECTION: APPLE-STYLE DIRECTORY LINKS ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-medium">
        
        {/* Column 1 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-zinc-900 tracking-wider uppercase text-[10px]">Explore Lineup</h4>
          <ul className="space-y-2">
            <li><a href="#phone" className="hover:text-zinc-900 transition-colors">Berry Phone 17 Pro</a></li>
            <li><a href="#watch" className="hover:text-zinc-900 transition-colors">Berry Watch Ultra</a></li>
            <li><a href="#buds" className="hover:text-zinc-900 transition-colors">Berry Buds Pro</a></li>
            <li><a href="#products" className="hover:text-zinc-900 transition-colors">Spatial Vision Pro</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-zinc-900 tracking-wider uppercase text-[10px]">Ecosystem Services</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Berry OS 17 Matrix</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Neural Core ID</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Cloud Obsidian Storage</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Liquid Pay Terminal</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-zinc-900 tracking-wider uppercase text-[10px]">Account & Bag</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Manage Neural ID</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Berry Bag Orders</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Ecosystem Preferences</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Developer Portal Sandbox</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="space-y-3.5">
          <h4 className="font-heading font-black text-zinc-900 tracking-wider uppercase text-[10px]">Corporate Values</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Aesthetic Engineering Lab</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Carbon Neutral Logistics</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Privacy Charter Core</a></li>
            <li><a href="/" className="hover:text-zinc-900 transition-colors">Investor Analytics</a></li>
          </ul>
        </div>

      </div>

      {/* ==================== LOWER SECTION: LEGAL & BRANDING SIGNATURE ==================== */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-wide font-medium">
        <div>
          <span>Copyright © {currentYear} </span>
          <span className="text-zinc-900 font-black tracking-wider">BERRY Inc.</span>
          <span> All rights reserved across the liquid space.</span>
        </div>
        
        <div className="flex gap-4 opacity-75">
          <a href="/" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="/" className="hover:text-zinc-900 transition-colors">Terms of Sale</a>
          <span>•</span>
          <a href="/" className="hover:text-zinc-900 transition-colors">Site Map Matrix</a>
        </div>
      </div>

    </footer>
  );
}