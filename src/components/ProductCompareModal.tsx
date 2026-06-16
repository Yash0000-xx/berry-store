import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, ArrowRightLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCurrencyStore } from '../store/currencyStore';
import { useUIStore } from '../store/uiStore';

type ProductType = typeof products[0];

export default function ProductCompareModal() {
  const { isCompareOpen, setCompareOpen } = useUIStore();
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  // Pillar slots tracking state (Supports checking up to 3 models simultaneously)
  const [slot1, setSlot1] = useState<ProductType | null>(products[0] || null);
  const [slot2, setSlot2] = useState<ProductType | null>(products[1] || null);
  const [slot3, setSlot3] = useState<ProductType | null>(null);

  return (
    <AnimatePresence>
      {isCompareOpen && (
        <>
          {/* Ambient Backdrop Overlay Shield */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCompareOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          />

          {/* Matrix Window Panel Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="fixed inset-4 z-50 m-auto h-[85vh] max-h-[700px] w-full max-w-[1000px] overflow-y-auto rounded-[32px] border border-white/5 bg-card/95 p-6 text-white shadow-2xl backdrop-blur-3xl flex flex-col justify-between"
          >
            {/* Header Column Block */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-white/5 p-2 border border-white/5 text-accent">
                    <ArrowRightLeft size={16} />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-black tracking-tight">Ecosystem Comparison Matrix</h2>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Analyze hardware models and hardware tiers side-by-side.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCompareOpen(false)}
                  className="rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ==================== SELECTION INLINE DROPDOWN ROW ==================== */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-b border-white/5 pb-6">
                {[
                  { selected: slot1, setter: setSlot1, label: "Primary Device Node" },
                  { selected: slot2, setter: setSlot2, label: "Secondary Compare Node" },
                  { selected: slot3, setter: setSlot3, label: "Tertiary Lookahead Slot" }
                ].map((slot, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{slot.label}</span>
                    <select
                      value={slot.selected?.id || ''}
                      onChange={(e) => {
                        const matched = products.find(p => p.id === e.target.value);
                        slot.setter(matched || null);
                      }}
                      className="w-full rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs font-semibold text-white/90 shadow-md backdrop-blur-md outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="" className="bg-card text-muted-foreground">-- Empty Slot Allocation --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id} className="bg-card text-white">{p.name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* ==================== INTERACTIVE CROSS COMPARISON ROWS ==================== */}
              <div className="space-y-6 mt-6 max-h-[380px] overflow-y-auto pr-1 scrollbar-none">
                
                {/* ROW GROUP 1: CARD VISUAL & PRICING PREVIEW */}
                <div className="grid grid-cols-3 gap-4 items-start">
                  {[slot1, slot2, slot3].map((slot, idx) => (
                    <div key={idx} className="text-center">
                      {slot ? (
                        <div className="rounded-2xl bg-white/2 border border-white/5 p-3 flex flex-col items-center">
                          <img src={slot.image} className="h-20 w-20 object-cover rounded-xl bg-black/40 shadow-inner" />
                          <h4 className="font-heading font-extrabold text-xs tracking-tight mt-2.5 text-white/90">{slot.name}</h4>
                          <span className="text-xs font-black text-accent mt-1 block">{formatPrice(slot.price)}</span>
                        </div>
                      ) : (
                        <div className="rounded-2xl border border-dashed border-white/5 py-10 text-[10px] text-muted-foreground uppercase font-semibold tracking-wider bg-black/10">
                          Empty
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* ROW GROUP 2: CATEGORY MATRIX SPEC */}
                <div className="border-t border-white/5 pt-4">
                  <div className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mb-2">Ecosystem Classification</div>
                  <div className="grid grid-cols-3 gap-4 text-xs font-bold tracking-tight">
                    {[slot1, slot2, slot3].map((slot, idx) => (
                      <div key={idx} className="px-1 text-white/85">
                        {slot ? `Core Tier: ${slot.category.toUpperCase()}` : '—'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROW GROUP 3: ARCHITECTURE TAGLINES */}
                <div className="border-t border-white/5 pt-4">
                  <div className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mb-2">Design Engineering Profile</div>
                  <div className="grid grid-cols-3 gap-4 text-[11px] leading-relaxed text-muted-foreground">
                    {[slot1, slot2, slot3].map((slot, idx) => (
                      <div key={idx} className="px-1 italic">
                        {slot ? `"${slot.tagline}"` : '—'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROW GROUP 4: FINISH OPTIONS */}
                <div className="border-t border-white/5 pt-4">
                  <div className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mb-2">Available Chassis Finishes</div>
                  <div className="grid grid-cols-3 gap-4">
                    {[slot1, slot2, slot3].map((slot, idx) => (
                      <div key={idx} className="flex gap-1 px-1">
                        {slot ? slot.colors.map((c, i) => (
                          <span key={i} className="h-3 w-3 rounded-full border border-black/50 shadow-sm" style={{ backgroundColor: c }} />
                        )) : '—'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROW GROUP 5: MEMORY STORAGE ARRAY */}
                <div className="border-t border-white/5 pt-4 mb-2">
                  <div className="text-[9px] font-black tracking-widest text-muted-foreground uppercase mb-2">Memory Grid Options</div>
                  <div className="grid grid-cols-3 gap-4 text-xs font-medium text-white/80">
                    {[slot1, slot2, slot3].map((slot, idx) => (
                      <div key={idx} className="px-1">
                        {slot ? (slot.storage.length > 0 ? slot.storage.join(' | ') : 'Integrated Non-upgradable') : '—'}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Footer Lock Block */}
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Sliders size={12} className="text-accent" />
                <span>Adjust inputs above to alter cross-comparison vectors.</span>
              </div>
              <button 
                onClick={() => setCompareOpen(false)}
                className="rounded-full bg-white/5 px-4 py-1.5 text-white/80 font-bold transition-colors hover:bg-white/10 uppercase cursor-pointer"
              >
                Close Engine Matrix
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}