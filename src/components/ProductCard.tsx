import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react'; // ✨ FIXED: Removed unused 'Layers' import
import { useCartStore } from '../store/cartStore';
import { useCurrencyStore } from '../store/currencyStore';
import { audio } from '../utils/audioEngine';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  storage?: string[]; // Optional storage tiers
  tagline: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onView: () => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { currency } = useCurrencyStore();

  // ==================== ✨ CONFIGURATOR DYNAMIC STATES ====================
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);

  // Mock storage values if the product data model doesn't explicitly define them
  const storageTiers = product.storage && product.storage.length > 0 
    ? product.storage 
    : ['128GB', '256GB', '512GB'];

  // Calculate automated hardware pricing bumps (e.g., +₹10,000 or +$150 per higher memory tier)
  const baseCurrencyMultiplier = currency === 'USD' ? 1 : currency === 'AED' ? 3.67 : 83;
  const storagePriceBump = selectedStorageIdx * (currency === 'INR' ? 10000 : currency === 'USD' ? 120 : 450);
  const finalPrice = Math.round(product.price * (baseCurrencyMultiplier / 83)) + storagePriceBump;

  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid firing modal view bounds on trigger
    audio.playSuccess(); // Major-third musical click chord feedback

    // Convert active hex indices into string variables to pass down
    const configuredColorString = product.colors[selectedColorIdx] || '#e040fb';
    const configuredStorageString = storageTiers[selectedStorageIdx];

    // 1. Build the base item payload object (Argument 1)
    const cartPayload = {
      id: `${product.id}-${configuredStorageString}-${selectedColorIdx}`,
      name: `${product.name} (${configuredStorageString})`,
      price: finalPrice / baseCurrencyMultiplier, // Store normalized price baseline
      image: product.image,
      quantity: 1
    };

    // ✨ FIXED: Pass exactly 3 distinct arguments to satisfy cartStore.ts
    // addItem( Argument 1: Object, Argument 2: String, Argument 3: String )
    addItem(cartPayload, configuredColorString, configuredStorageString);
  };
  return (
    <div 
      className="group relative rounded-[32px] border border-white/5 bg-card/40 p-5 shadow-xl backdrop-blur-2xl transition-all duration-500 hover:border-white/10 hover:bg-card/60 flex flex-col justify-between h-[420px] text-left overflow-hidden [transform-style:preserve-3d]"
    >
      {/* Subtle dynamic backdrop glow matching your actively selected color chip state */}
      <div 
        className="absolute -inset-20 opacity-10 pointer-events-none transition-all duration-700 blur-[80px] group-hover:opacity-15"
        style={{ backgroundColor: product.colors[selectedColorIdx] || '#e040fb' }}
      />

      <div>
        {/* Upper Header Card Segment Meta Panel */}
        <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-widest text-muted-foreground uppercase">
          <span>{product.category}</span>
          <span className="text-white/30">ID: Core_0{product.id}</span>
        </div>

        {/* Scaled Product Preview Image Matrix */}
        <div className="relative my-4 h-36 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/20 border border-white/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-108 group-hover:rotate-2 select-none pointer-events-none"
          />
        </div>

        {/* Headline & Dynamic Tagline Information Blocks */}
        <h3 className="font-heading text-lg font-black tracking-tight text-white">{product.name}</h3>
        <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5 leading-relaxed">{product.tagline}</p>

        {/* ==================== ✨ SWAP MATRIX 1: HARDWARE LAYER INTERACTIVE SWITCHES ==================== */}
        <div className="mt-4 flex flex-col gap-2.5">
          
          {/* Storage capacity node chips layout track */}
          <div className="flex items-center gap-1.5">
            {storageTiers.map((tier, idx) => (
              <button
                key={tier}
                onClick={(e) => { e.stopPropagation(); audio.playClick(); setSelectedStorageIdx(idx); }}
                className={`rounded-md px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedStorageIdx === idx 
                    ? 'border-primary bg-primary/10 text-white shadow-sm scale-102' 
                    : 'border-white/5 bg-white/2 text-muted-foreground hover:text-white/80'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Luxury Color custom swatch arrays selectors layout */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[7px] font-mono uppercase tracking-widest text-white/30">Color node:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((hex, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); audio.playClick(); setSelectedColorIdx(idx); }}
                  className={`h-3 w-3 rounded-full border transition-all cursor-pointer transform hover:scale-115 relative flex items-center justify-center ${
                    selectedColorIdx === idx ? 'border-white scale-110 shadow-md' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: hex }}
                >
                  {selectedColorIdx === idx && (
                    <span className="absolute h-0.5 w-0.5 rounded-full bg-black" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==================== BOTTOM INTERACTIVE ACTION CORE BLOCK ==================== */}
      <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between relative z-10">
        
        {/* Dynamic Framer-Motion Animated Price Display Anchor */}
        <div className="flex flex-col">
          <span className="text-[7px] font-mono uppercase tracking-widest text-muted-foreground">Configured Price</span>
          <div className="text-sm font-black text-white font-mono tracking-tight mt-0.5 flex overflow-hidden h-5">
            <AnimatePresence mode="wait">
              <motion.span
                key={finalPrice}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="inline-block"
              >
                {currencySymbols[currency as keyof typeof currencySymbols]}{finalPrice.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* View Specs & Purchase Action Grid Layout Button Groups */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); audio.playOpen(); onView(); }}
            className="rounded-full bg-white/2 border border-white/5 p-2 text-muted-foreground hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Inspect Architectural Parameters"
          >
            <Eye size={12} />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-linear-to-r from-primary to-accent p-2 text-white shadow-md shadow-purple-900/30 hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-bold text-[10px] px-3.5 tracking-wider uppercase"
          >
            <ShoppingBag size={11} />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
}