import { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Globe, X } from 'lucide-react';
import { useLocation } from 'wouter';
import BerryLogo from './BerryLogo';
import { useCartStore } from '../store/cartStore';
import { useCurrencyStore } from '../store/currencyStore';
import { useUIStore } from '../store/uiStore';
import { audio } from '../utils/audioEngine';

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const totalCartItems = useCartStore((state) => state.getTotalItems());
 const { setCurrency } = useCurrencyStore();
  const { 
    isCartOpen, 
    setCartOpen, 
    isCompareOpen, 
    isGeniusOpen, 
    setGeniusOpen 
  } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      // Toggle state the moment user moves slightly down
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldHideNavbar = isCartOpen || isCompareOpen || isGeniusOpen;
  if (shouldHideNavbar) return null;

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    audio.playClick();
    if (location !== '/') {
      e.preventDefault();
      setLocation('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleProfileClick = () => {
    audio.playClick();
    alert("🔒 Neural Core ID verified.\nUser profile access restricted within sandbox runtime.");
  };

  const currencies: ('INR' | 'USD' | 'AED')[] = ['INR', 'USD', 'AED'];

  return (
    // ✨ FIXED OVERLAP NAVIGATION CAPSULE WRAPPER:
    // Anchored at a static top positioning, dropping down just beneath the announcement marquee line
    <div className="fixed top-12 left-0 right-0 z-40 mx-auto w-[92%] max-w-[900px] flex flex-col items-center gap-2.5 transition-all duration-300">
      
      {/* ==================== CORE FLOATING NAV PILL ==================== */}
      {/* ✨ Removed scale transformations on scroll to prevent the element from sagging down into the catalog area */}
      <nav className="w-full">
        <div className={`flex items-center justify-between rounded-full border border-white/5 px-6 py-3 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/75 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-white/10' 
            : 'bg-white/5 backdrop-blur-md'
        }`}>
          
          {/* Left: Brand Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { audio.playClick(); setLocation('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="scale-75 transition-transform group-hover:rotate-12">
              <BerryLogo />
            </div>
            <span className="font-heading font-extrabold tracking-wider text-sm bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
              BERRY
            </span>
          </div>

          {/* Center: Links Layout */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide text-muted-foreground">
            <a href="#phone-section" onClick={(e) => handleNavigation(e, 'phone-section')} className="transition-colors hover:text-foreground">Phone</a>
            <a href="#watch-section" onClick={(e) => handleNavigation(e, 'watch-section')} className="transition-colors hover:text-foreground">Watch</a>
            <a href="#buds-section" onClick={(e) => handleNavigation(e, 'buds-section')} className="transition-colors hover:text-foreground">Buds</a>
            <a href="#products" onClick={(e) => handleNavigation(e, 'products')} className="transition-colors hover:text-foreground">Ecosystem</a>
            
            <button 
              onClick={() => setLocation('/sandbox')} 
              className={`transition-colors font-medium cursor-pointer ${location === '/sandbox' ? 'text-accent font-bold' : 'hover:text-foreground'}`}
            >
              Sandbox
            </button>

            <button 
              onClick={() => { audio.playOpen(); setGeniusOpen(true); }} 
              className="transition-colors hover:text-foreground cursor-pointer font-medium"
            >
              Support
            </button>
          </div>

          {/* Right: Actions Block Panel */}
          <div className="flex items-center gap-4 text-foreground/80 relative">
            <Search 
              size={16} 
              onClick={() => { audio.playClick(); setIsSearchOpen(!isSearchOpen); }} 
              className={`cursor-pointer transition-colors ${isSearchOpen ? 'text-accent' : 'hover:text-accent'}`} 
            />
            
            <User 
              size={16} 
              onClick={handleProfileClick} 
              className="cursor-pointer hover:text-accent transition-colors" 
            />
            
            <div className="relative">
              <Globe 
                size={16} 
                className="cursor-pointer hover:text-accent transition-colors" 
                onClick={() => { audio.playClick(); setShowCurrencyDropdown(!showCurrencyDropdown); }}
              />
              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-3 w-24 rounded-2xl border border-white/5 bg-card p-1 shadow-2xl backdrop-blur-xl">
                  {currencies.map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        audio.playClick();
                        setCurrency(cur);
                        setShowCurrencyDropdown(false);
                      }}
                      className="w-full rounded-xl px-3 py-1.5 text-left text-xs font-semibold tracking-wide transition-colors hover:bg-white/5 text-muted-foreground"
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div 
              onClick={() => { audio.playOpen(); setCartOpen(true); }} 
              className="relative cursor-pointer hover:text-accent transition-colors"
            >
              <ShoppingBag size={16} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white shadow-[0_0_10px_rgba(224,64,251,0.6)]">
                  {totalCartItems}
                </span>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Expandable Drop-down Search Bar */}
      {isSearchOpen && (
        <div className="w-full rounded-2xl border border-white/5 bg-black/80 p-2.5 shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-300">
          <Search size={14} className="text-muted-foreground ml-2" />
          <input 
            type="text" 
            placeholder="Search ecosystem nodes (e.g. Phone, Ultra, Vision)..." 
            className="flex-1 bg-transparent text-xs font-medium text-white outline-none placeholder:text-white/30"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                audio.playSuccess();
                alert(`Searching network threads for "${e.currentTarget.value}"...`);
                setIsSearchOpen(false);
              }
            }}
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="rounded-full p-1 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors cursor-pointer"
          >
            <X size={12} />
          </button>
        </div>
      )}

    </div>
  );
}