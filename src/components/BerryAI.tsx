import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCurrencyStore } from '../store/currencyStore';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isOptions?: boolean;
  optionsType?: 'category' | 'budget';
  recommendations?: typeof products;
}

export default function BerryAI() {
  const [isOpen, setIsOpen] = useState(false);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);

  // Core Chat Conversation State History
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      sender: 'bot',
      text: "Welcome to BERRY Lab space. I am your automated product coordinator. What ecosystem device tier are you looking to configure today?",
      isOptions: true,
      optionsType: 'category'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Step Handler Tree
  const handleCategorySelect = (cat: string) => {
    const userMsgId = `cat-user-${Date.now()}`;
    const botMsgId = `cat-bot-${Date.now()}`;

    // Add user message selection bubble
    const updatedMessages: Message[] = [
      ...messages.map(m => m.isOptions ? { ...m, isOptions: false } : m),
      { id: userMsgId, sender: 'user', text: `I am looking for a ${cat.toUpperCase()}.` }
    ];

    setSelectedCategory(cat);
    setMessages(updatedMessages);

    // Trigger sequential bot reply loop after a short artificial thinking pause
    setTimeout(() => {
      setMessages([
        ...updatedMessages,
        {
          id: botMsgId,
          sender: 'bot',
          text: `A fine choice. What allocation parameters or price matrix limits are we optimizing for?`,
          isOptions: true,
          optionsType: 'budget'
        }
      ]);
    }, 600);
  };

  const handleBudgetSelect = (budgetTier: 'all' | 'premium' | 'entry') => {
    const userMsgId = `bud-user-${Date.now()}`;
    const botMsgId = `bud-bot-${Date.now()}`;

    const labelMap = {
      all: "Unrestricted Tier Allocation",
      premium: "Elite Enterprise Configuration",
      entry: "Standard Core Value Ecosystem"
    };

    const updatedMessages: Message[] = [
      ...messages.map(m => m.isOptions ? { ...m, isOptions: false } : m),
      { id: userMsgId, sender: 'user', text: labelMap[budgetTier] }
    ];

    setMessages(updatedMessages);

    // Calculate live filter query recommendations based on arrays
    let filtered = products.filter(p => p.category === selectedCategory);
    if (budgetTier === 'premium') {
      filtered = filtered.filter(p => p.price >= 100000);
    } else if (budgetTier === 'entry') {
      filtered = filtered.filter(p => p.price < 100000);
    }

    // Fallback recommendation array lookahead safety filter match
    if (filtered.length === 0) {
      filtered = products.filter(p => p.category === selectedCategory).slice(0, 1);
    }

    setTimeout(() => {
      setMessages([
        ...updatedMessages,
        {
          id: botMsgId,
          sender: 'bot',
          text: `Compiling neural query... Core results absolute. I found matching nodes that suit your operational profile parameters perfectly:`,
          recommendations: filtered
        }
      ]);
    }, 700);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'init',
        sender: 'bot',
        text: "Ecosystem matrix reset. What device tier are you looking to configure today?",
        isOptions: true,
        optionsType: 'category'
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="mb-4 h-[460px] w-[330px] overflow-hidden rounded-3xl border border-white/5 bg-card/90 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl flex flex-col justify-between"
          >
            {/* Header Module Area */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/2 p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-linear-to-r from-primary to-accent p-1.5 shadow-[0_0_12px_rgba(224,64,251,0.4)]">
                  <Sparkles size={14} className="text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-tight">BERRY Neural Core</h3>
                  <p className="text-[9px] text-accent font-semibold tracking-widest uppercase">AI Coordinator</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/5 p-1.5 transition-colors hover:bg-white/10"
              >
                <X size={12} />
              </button>
            </div>

            {/* Conversation Flow Scroller Block */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-none text-[11px] leading-relaxed">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Chat Bubbles */}
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm border ${
                    msg.sender === 'user' 
                      ? 'bg-linear-to-r from-primary/80 to-accent/80 border-accent/20 rounded-tr-none text-white font-medium' 
                      : 'bg-white/5 border-white/5 rounded-tl-none text-white/90'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Guided Tree Selection Option Controllers */}
                  {msg.isOptions && msg.optionsType === 'category' && (
                    <div className="mt-2.5 grid grid-cols-2 gap-1.5 w-full">
                      {[
                        { id: 'phone', label: '📱 Phone Lineup' },
                        { id: 'mac', label: '💻 MacBook Pro' },
                        { id: 'watch', label: '⌚ Berry Watch' },
                        { id: 'vision', label: '🥽 Spatial Vision' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleCategorySelect(opt.id)}
                          className="rounded-xl border border-white/5 bg-white/2 px-2.5 py-1.5 text-left font-semibold text-[10px] tracking-wide transition-all hover:bg-primary hover:border-accent/40 text-white/80 hover:text-white"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.isOptions && msg.optionsType === 'budget' && (
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                      {[
                        { id: 'all', label: '🚀 Unrestricted (View All)' },
                        { id: 'premium', label: '💎 Elite Enterprise Tier (>= ₹1,000,000)' },
                        { id: 'entry', label: '⚡ Standard Core Layer (< ₹1,000,000)' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleBudgetSelect(opt.id as any)}
                          className="rounded-xl border border-white/5 bg-white/2 px-3 py-1.5 text-left font-semibold text-[10px] tracking-wide transition-all hover:bg-accent hover:border-white/20 text-white/80 hover:text-white"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Inline Horizontal Matching Product Recommendation Cards */}
                  {msg.recommendations && (
                    <div className="mt-2.5 flex gap-2 w-full overflow-x-auto pb-1 scrollbar-none">
                      {msg.recommendations.map((prod) => (
                        <div 
                          key={prod.id}
                          className="min-w-[150px] max-w-[150px] flex-shrink-0 rounded-xl border border-white/5 bg-white/2 p-2 flex flex-col justify-between"
                        >
                          <img src={prod.image} className="h-16 w-full object-cover rounded-lg bg-black/40" />
                          <div className="mt-1.5">
                            <h4 className="font-bold text-[10px] text-white/90 line-clamp-1">{prod.name}</h4>
                            <span className="text-[9px] font-black text-accent block mt-0.5">{formatPrice(prod.price)}</span>
                          </div>
                          <a 
                            href={`#products`}
                            onClick={() => setIsOpen(false)}
                            className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-white/5 py-1 text-[8px] font-bold tracking-wider text-muted-foreground hover:text-white hover:bg-white/10 uppercase transition-colors"
                          >
                            Configure <ArrowRight size={8} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Footer Operational Trigger Buttons */}
            <div className="border-t border-white/5 p-3 bg-black/20 flex justify-end">
              <button
                onClick={handleReset}
                className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
              >
                Clear Node Log
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Global Fixed Trigger Action Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-primary to-accent text-white shadow-[0_0_20px_rgba(123,47,190,0.4)] transition-all duration-300 hover:scale-108 hover:shadow-[0_0_32px_rgba(224,64,251,0.6)] active:scale-95 cursor-pointer"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
    </div>
  );
}