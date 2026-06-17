import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useCurrencyStore } from '../store/currencyStore';
import { audio } from '../utils/audioEngine';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  colors: string[];
  storage?: string[];
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

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);

  const storageTiers = product.storage && product.storage.length > 0 
    ? product.storage 
    : ['128GB', '256GB', '512GB'];

  const baseCurrencyMultiplier = currency === 'USD' ? 1 : currency === 'AED' ? 3.67 : 83;
  const storagePriceBump = selectedStorageIdx * (currency === 'INR' ? 10000 : currency === 'USD' ? 120 : 450);
  const finalPrice = Math.round(product.price * (baseCurrencyMultiplier / 83)) + storagePriceBump;

  const currencySymbols = { INR: '₹', USD: '$', AED: 'AED ' };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playSuccess();

    const configuredColorString = product.colors[selectedColorIdx] || '#e040fb';
    const configuredStorageString = storageTiers[selectedStorageIdx];

    const cartPayload = {
      id: `${product.id}-${configuredStorageString}-${selectedColorIdx}`,
      name: `${product.name} (${configuredStorageString})`,
      price: finalPrice / baseCurrencyMultiplier,
      image: product.image,
      quantity: 1
    };

    addItem(cartPayload, configuredColorString, configuredStorageString);
  };

  return (
    <div 
      // ✨ HIGH-KEY MINIMALIST CARD WRAPPER
      className="group relative rounded-[32px] border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-500 hover:border-zinc-300 hover:shadow-xl flex flex-col justify-between h-[420px] text-left overflow-hidden [transform-style:preserve-3d]"
    >
      {/* Dynamic ambient backdrop glow (subdued for light theme) */}
      <div 
        className="absolute -inset-20 opacity-5 pointer-events-none transition-all duration-700 blur-[60px] group-hover:opacity-10"
        style={{ backgroundColor: product.colors[selectedColorIdx] || '#e040fb' }}
      />

      <div>
        {/* Upper Header Card Segment Meta Panel */}
        <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
          <span>{product.category}</span>
          <span className="text-zinc-300">ID: Core_0{product.id}</span>
        </div>

        {/* ==================== ✨ UPDATED: EDGE-TO-EDGE IMAGE MATRIX ==================== */}
        <div className="relative my-4 h-40 w-full flex items-center justify-center overflow-hidden rounded-2xl border border-zinc-100 shadow-inner">
          <img 
            src={product.image} 
            alt={product.name} 
            // Switched to 'object-cover' and forced 100% height/width
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
          />
        </div>

        {/* Headline & Dynamic Tagline Information Blocks */}
        <h3 className="font-heading text-lg font-black tracking-tight text-zinc-900">{product.name}</h3>
        <p className="text-[10px] text-zinc-500 font-medium line-clamp-1 mt-0.5 leading-relaxed">{product.tagline}</p>

        {/* ==================== SWAP MATRIX 1: HARDWARE LAYER INTERACTIVE SWITCHES ==================== */}
        <div className="mt-4 flex flex-col gap-2.5">
          
          {/* Storage capacity node chips layout track */}
          <div className="flex items-center gap-1.5">
            {storageTiers.map((tier, idx) => (
              <button
                key={tier}
                onClick={(e) => { e.stopPropagation(); audio.playClick(); setSelectedStorageIdx(idx); }}
                className={`rounded-md px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  selectedStorageIdx === idx 
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm scale-102' 
                    : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Luxury Color custom swatch arrays selectors layout */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[7px] font-mono uppercase tracking-widest text-zinc-400">Color node:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((hex, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); audio.playClick(); setSelectedColorIdx(idx); }}
                  className={`h-3 w-3 rounded-full border transition-all cursor-pointer transform hover:scale-115 relative flex items-center justify-center ${
                    selectedColorIdx === idx ? 'border-zinc-400 scale-110 shadow-sm' : 'border-zinc-200'
                  }`}
                  style={{ backgroundColor: hex }}
                >
                  {selectedColorIdx === idx && (
                    <span className="absolute h-0.5 w-0.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ==================== BOTTOM INTERACTIVE ACTION CORE BLOCK ==================== */}
      <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between relative z-10">
        
        {/* Dynamic Framer-Motion Animated Price Display Anchor */}
        <div className="flex flex-col">
          <span className="text-[7px] font-mono uppercase tracking-widest text-zinc-400">Configured Price</span>
          <div className="text-sm font-black text-zinc-900 font-mono tracking-tight mt-0.5 flex overflow-hidden h-5">
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
            className="rounded-full bg-zinc-50 border border-zinc-200 p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
            title="Inspect Architectural Parameters"
          >
            <Eye size={12} />
          </button>
          
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-zinc-900 p-2 text-white shadow-md hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-bold text-[10px] px-3.5 tracking-wider uppercase"
          >
            <ShoppingBag size={11} />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
}