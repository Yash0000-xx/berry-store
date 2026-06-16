import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Truck, CreditCard, RefreshCw } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useCurrencyStore } from '../store/currencyStore';

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

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  const addItem = useCartStore((state) => state.addItem);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  // Default option selections fallback anchors
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '#7B2FBE');
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0] || '');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sync states instantly if a user closes one item and opens a completely different one
  useEffect(() => {
    setSelectedColor(product.colors[0] || '#7B2FBE');
    setSelectedStorage(product.storage[0] || '');
  }, [product]);

  const emiCalculated = Math.round(product.price / 12);

  const handleAddToBag = () => {
    addItem(product as any, selectedColor, selectedStorage);
    alert(`Custom configuration for ${product.name} locked into your Berry Bag!`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glass Backdrop Dimming Shield */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          {/* Core Multi-Column Showroom Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 z-50 m-auto h-[90vh] max-h-[750px] w-full max-w-[950px] overflow-y-auto rounded-[32px] border border-white/5 bg-card/95 text-white shadow-2xl backdrop-blur-3xl lg:overflow-hidden flex flex-col lg:flex-row"
          >
            
            {/* ==================== LEFT COLUMN: MEDIA VIEWPORT ==================== */}
            <div className="relative w-full lg:w-1/2 h-[350px] lg:h-full bg-black/30 p-8 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
              
              {/* ✨ BERRY AURA ENGINE: Background glow shifts directly based on chosen color option dot */}
              <motion.div 
                className="absolute inset-0 opacity-15 filter blur-[80px] pointer-events-none"
                animate={{ backgroundColor: selectedColor }}
                transition={{ duration: 0.6 }}
              />

              <motion.img 
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 max-h-[85%] max-w-[85%] object-contain rounded-2xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                src={product.image} 
                alt={product.name}
              />

              <span className="absolute top-6 left-6 rounded-full bg-white/5 px-3 py-1 text-[9px] font-black tracking-widest text-accent uppercase border border-white/5">
                {product.category}
              </span>
            </div>


            {/* ==================== RIGHT COLUMN: SPEC MATRIX PANEL ==================== */}
            <div className="w-full lg:w-1/2 h-full p-8 flex flex-col justify-between overflow-y-auto scrollbar-none">
              
              {/* Top Row Title Metadata */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-heading text-2xl font-black tracking-tight">{product.name}</h2>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{product.tagline}</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* OPTION INTERFACE 1: HEX CHASSIS COLOR PICKER */}
                <div className="mt-8">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">1. Finish Exterior</h4>
                  <div className="mt-3 flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`h-8 w-8 rounded-full border p-0.5 transition-all transform hover:scale-105 cursor-pointer ${
                          selectedColor === color ? 'border-accent ring-2 ring-accent/30 scale-105' : 'border-white/10'
                        }`}
                      >
                        <div className="h-full w-full rounded-full border border-black/20" style={{ backgroundColor: color }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* OPTION INTERFACE 2: FLASH MEMORY ARCHITECTURE STORAGE TIERS */}
                {product.storage.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">2. Memory Parameter Allocation</h4>
                    <div className="mt-3 grid grid-cols-2 gap-2.5">
                      {product.storage.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedStorage(size)}
                          className={`rounded-2xl border px-4 py-3 text-left transition-all cursor-pointer ${
                            selectedStorage === size 
                              ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(123,47,190,0.15)] text-white' 
                              : 'border-white/5 bg-white/2 text-muted-foreground hover:border-white/20'
                          }`}
                        >
                          <div className="text-xs font-bold tracking-tight">{size}</div>
                          <div className="text-[9px] mt-0.5 text-muted-foreground font-medium">Included Base Spec</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SYSTEM SPEC INFO SUMMARY STRIP */}
                <div className="mt-8 rounded-2xl border border-white/5 bg-white/2 p-4 space-y-3 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-2.5">
                    <CreditCard size={12} className="text-accent" />
                    <span>No-Cost Financing active: <strong className="text-white font-semibold">{formatPrice(emiCalculated)}/month</strong> for 12 months.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RefreshCw size={12} className="text-accent" />
                    <span>Berry Trade-In Node eligible. Save up to <strong className="text-white font-semibold">₹15,000</strong> on delivery.</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck size={12} className="text-accent" />
                    <span>Priority freight distribution. Express delivery completely free.</span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Core Pricing Matrix Action Footer */}
              <div className="mt-8 border-t border-white/5 pt-5 flex items-center gap-4">
                <div className="flex-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block">Total Config Value</span>
                  <span className="font-heading text-xl font-black text-white tracking-tight mt-0.5 block">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all cursor-pointer ${
                      isWishlisted ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-md' : 'border-white/5 bg-white/2 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  <button
                    onClick={handleAddToBag}
                    className="rounded-full bg-linear-to-r from-primary to-accent px-6 py-3 font-semibold text-xs tracking-wide text-white shadow-md transition-all duration-300 hover:scale-102 hover:shadow-[0_0_20px_rgba(224,64,251,0.4)] cursor-pointer"
                  >
                    Add to Berry Bag
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}