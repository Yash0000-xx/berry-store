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
    alert("🔒 Secure access verified.\nUser profile portal is currently restricted within sandbox runtime.");
  };

  const currencies: ('INR' | 'USD' | 'AED')[] = ['INR', 'USD', 'AED'];

  return (
    <div className="fixed top-12 left-0 right-0 z-40 mx-auto w-[92%] max-w-[900px] flex flex-col items-center gap-2.5 transition-all duration-300">
      
      {/* ==================== HIGH-KEY MINIMALIST NAV PILL ==================== */}
      <nav className="w-full">
        <div className={`flex items-center justify-between rounded-full border px-6 py-3 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-zinc-200' 
            : 'bg-white/40 backdrop-blur-md border-transparent'
        }`}>
          
          {/* Left: Brand Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { audio.playClick(); setLocation('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="scale-75 transition-transform group-hover:rotate-12">
              <BerryLogo />
            </div>
            <span className="font-heading font-black tracking-wider text-sm text-zinc-900">
              BERRY
            </span>
          </div>

          {/* Center: Links Layout */}
          <div className="hidden md:flex items-center gap-7 text-[11px] font-bold tracking-widest uppercase text-zinc-500">
            <a href="#phone-section" onClick={(e) => handleNavigation(e, 'phone-section')} className="transition-colors hover:text-zinc-900">Phone</a>
            <a href="#watch-section" onClick={(e) => handleNavigation(e, 'watch-section')} className="transition-colors hover:text-zinc-900">Watch</a>
            <a href="#buds-section" onClick={(e) => handleNavigation(e, 'buds-section')} className="transition-colors hover:text-zinc-900">Buds</a>
            <a href="#products" onClick={(e) => handleNavigation(e, 'products')} className="transition-colors hover:text-zinc-900">Ecosystem</a>
            
            <button 
              onClick={() => setLocation('/sandbox')} 
              className={`transition-colors font-bold cursor-pointer uppercase tracking-widest ${location === '/sandbox' ? 'text-zinc-900' : 'hover:text-zinc-900'}`}
            >
              Sandbox
            </button>

            <button 
              onClick={() => { audio.playOpen(); setGeniusOpen(true); }} 
              className="transition-colors hover:text-zinc-900 cursor-pointer font-bold uppercase tracking-widest"
            >
              Support
            </button>
          </div>

          {/* Right: Actions Block Panel */}
          <div className="flex items-center gap-4 text-zinc-500 relative">
            <Search 
              size={16} 
              onClick={() => { audio.playClick(); setIsSearchOpen(!isSearchOpen); }} 
              className={`cursor-pointer transition-colors hover:text-zinc-900 ${isSearchOpen && 'text-zinc-900'}`} 
            />
            
            <User 
              size={16} 
              onClick={handleProfileClick} 
              className="cursor-pointer transition-colors hover:text-zinc-900" 
            />
            
            <div className="relative">
              <Globe 
                size={16} 
                className={`cursor-pointer transition-colors hover:text-zinc-900 ${showCurrencyDropdown && 'text-zinc-900'}`} 
                onClick={() => { audio.playClick(); setShowCurrencyDropdown(!showCurrencyDropdown); }}
              />
              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-4 w-28 rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl">
                  {currencies.map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        audio.playClick();
                        setCurrency(cur);
                        setShowCurrencyDropdown(false);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-xs font-bold tracking-wider transition-colors hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div 
              onClick={() => { audio.playOpen(); setCartOpen(true); }} 
              className="relative cursor-pointer transition-colors hover:text-zinc-900"
            >
              <ShoppingBag size={16} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white shadow-sm">
                  {totalCartItems}
                </span>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Expandable Drop-down Search Bar */}
      {isSearchOpen && (
        <div className="w-full rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-300">
          <Search size={14} className="text-zinc-400 ml-2" />
          <input 
            type="text" 
            placeholder="Search ecosystem models..." 
            className="flex-1 bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                audio.playSuccess();
                alert(`Searching network for "${e.currentTarget.value}"...`);
                setIsSearchOpen(false);
              }
            }}
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="rounded-full p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

    </div>
  );
}