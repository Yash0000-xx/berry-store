import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useCurrencyStore } from '../store/currencyStore';
import { useUIStore } from '../store/uiStore';

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

export default function CartDrawer() {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  const subtotal = getSubtotal();
  const gst = subtotal * 0.18; // 18% GST calculation
  const total = subtotal + gst;

  const handleCheckout = () => {
    alert("🫐 Order Processed Successfully! Thank you for shopping with BERRY.");
    clearCart();
    setCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Fog Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Premium Right Side Panel Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
            className="fixed top-0 right-0 z-50 h-screen w-full max-w-105 border-l border-white/5 bg-card/95 p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between text-white"
          >
            {/* Header Module Area */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-accent" />
                  <h2 className="font-heading text-lg font-bold tracking-tight">Your Berry Bag</h2>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="rounded-full bg-white/5 p-1.5 transition-colors hover:bg-white/10"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Middle Dynamic Interactive Item List Scroller */}
              <div className="mt-4 max-h-[calc(100vh-320px)] overflow-y-auto space-y-4 pr-1 scrollbar-none">
                {items.length === 0 ? (
                  <div className="py-20 text-center text-muted-foreground">
                    <p className="text-sm">Your shopping bag is completely empty.</p>
                  </div>
                ) : (
                  items.map((item) => {
                    // Safe explicit downcast to map 'unknown' fields back to clean string props
                    const prod = item.product as unknown as Product;

                    return (
                      <div 
                        key={item.id} 
                        className="flex gap-4 rounded-2xl border border-white/5 bg-white/2 p-3 backdrop-blur-sm"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="h-16 w-16 rounded-xl object-cover bg-black/40"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-bold tracking-tight line-clamp-1">{prod.name}</h4>
                              <span className="font-heading text-xs font-bold text-accent">
                                {formatPrice(prod.price * item.quantity)}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              Tier: {item.selectedStorage || 'Standard'} • Color: 
                              <span 
                                className="inline-block h-2 w-2 rounded-full ml-1 border border-black/30 align-middle"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </p>
                          </div>

                          {/* Interactive Quantity Stepper Grid Controls */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 border border-white/5">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="rounded-full p-1 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-bold px-1 min-w-3.5 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="rounded-full p-1 hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-rose-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Total Math Costing Calculation Module Footer */}
            <div className="border-t border-white/5 pt-4 space-y-2.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>GST (18%)</span>
                <span>{formatPrice(gst)}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2.5 text-sm font-bold">
                <span className="font-heading">Total Bill</span>
                <span className="text-accent font-heading">{formatPrice(total)}</span>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full mt-2 rounded-full bg-linear-to-r from-primary to-accent py-3 font-semibold text-sm tracking-wide shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-[0_0_25px_rgba(224,64,251,0.4)] disabled:opacity-40 disabled:pointer-events-none"
              >
                Proceed to Checkout
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}