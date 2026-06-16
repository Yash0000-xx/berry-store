import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Terminal, Send, Cpu, Loader2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { audio } from '../utils/audioEngine';

interface Message {
  id: string;
  sender: 'system' | 'user';
  text: string;
  timestamp: Date;
}

export default function SupportTerminal() {
  const { isGeniusOpen, setGeniusOpen } = useUIStore();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initializing the chat with a welcome protocol
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'system', 
      text: 'Berry Neural Support initiated. How can I assist with your hardware ecosystem configuration today?', 
      timestamp: new Date() 
    }
  ]);

  // Auto-scroll to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle fake AI responses
  const handleSend = () => {
    if (!inputValue.trim()) return;
    audio.playClick();
    
    // Add user message
    const newUserMsg: Message = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: inputValue, 
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsTyping(false);
      audio.playSuccess();
      
      const sysMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        text: 'Diagnostic received. Our laboratory arrays confirm your requested parameters are fully compatible. Would you like me to push this configuration to your cart?',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, sysMsg]);
    }, 1800);
  };

  return (
    <>
      {/* ==================== FLOATING ACTION TRIGGER ==================== */}
      <AnimatePresence>
        {!isGeniusOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { audio.playOpen(); setGeniusOpen(true); }}
            className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full bg-accent shadow-[0_0_20px_rgba(224,64,251,0.5)] flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
          >
            <MessageSquare size={24} />
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-accent"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ==================== ACTIVE CHAT CONSOLE ==================== */}
      <AnimatePresence>
        {isGeniusOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[60] w-[340px] h-[520px] bg-black/85 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header Block */}
            <div className="bg-white/5 border-b border-white/5 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-xl border border-accent/30 shadow-[0_0_10px_rgba(224,64,251,0.2)]">
                  <Cpu size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Neural Specialist</h3>
                  <p className="text-[9px] text-accent font-mono font-bold flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    System Online • Ready
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { audio.playClick(); setGeniusOpen(false); }} 
                className="text-white/40 hover:text-white hover:bg-white/5 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px] scrollbar-none">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-md ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white rounded-br-sm' 
                      : 'bg-white/5 text-white/90 border border-white/10 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Fake Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="bg-white/5 text-accent border border-white/10 rounded-2xl rounded-bl-sm p-3.5 flex items-center gap-2 shadow-md">
                    <Loader2 size={12} className="animate-spin" />
                    <span className="tracking-widest uppercase font-bold text-[8px]">Processing vector...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* User Input Engine */}
            <div className="p-3 bg-black/40 border-t border-white/5">
              <div className="relative flex items-center">
                <Terminal size={14} className="absolute left-3 text-white/30" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initiate text query..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-9 pr-12 text-[10px] font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 transition-colors"
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-1.5 bg-accent rounded-lg text-white disabled:opacity-0 disabled:scale-75 transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(224,64,251,0.4)]"
                >
                  <Send size={12} className="ml-0.5" />
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}