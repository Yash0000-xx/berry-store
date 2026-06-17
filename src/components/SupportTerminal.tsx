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
      {/* ==================== HIGH-KEY MINIMALIST FLOATING ACTION TRIGGER ==================== */}
      <AnimatePresence>
        {!isGeniusOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { audio.playOpen(); setGeniusOpen(true); }}
            className="fixed bottom-6 right-6 z-[60] h-14 w-14 rounded-full bg-zinc-900 shadow-lg shadow-black/10 flex items-center justify-center text-white hover:scale-105 hover:bg-zinc-800 transition-all cursor-pointer active:scale-95"
          >
            <MessageSquare size={24} />
            {/* Minimalist Notification Dot */}
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-[3px] border-zinc-900"></span>
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
            className="fixed bottom-6 right-6 z-[60] w-[340px] h-[520px] bg-white border border-zinc-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Block */}
            <div className="bg-[#fafafa] border-b border-zinc-100 p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-zinc-900 p-2 rounded-xl shadow-sm">
                  <Cpu size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-zinc-900 uppercase tracking-widest">Neural Specialist</h3>
                  <p className="text-[9px] text-zinc-500 font-mono font-bold flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 animate-pulse" />
                    System Online • Ready
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { audio.playClick(); setGeniusOpen(false); }} 
                className="text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 bg-white border border-zinc-200 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px] scrollbar-none bg-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white rounded-br-sm font-medium' 
                      : 'bg-[#fafafa] text-zinc-700 border border-zinc-100 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Minimalist Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="bg-[#fafafa] text-zinc-900 border border-zinc-100 rounded-2xl rounded-bl-sm p-3.5 flex items-center gap-2 shadow-sm">
                    <Loader2 size={12} className="animate-spin text-zinc-500" />
                    <span className="tracking-widest uppercase font-bold text-[8px] text-zinc-500">Processing vector...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* User Input Engine */}
            <div className="p-3 bg-[#fafafa] border-t border-zinc-100">
              <div className="relative flex items-center">
                <Terminal size={14} className="absolute left-3 text-zinc-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Initiate text query..."
                  className="w-full bg-white border border-zinc-200 rounded-xl py-3 pl-9 pr-12 text-[10px] font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors shadow-sm"
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-1.5 bg-zinc-900 rounded-lg text-white disabled:opacity-0 disabled:scale-75 transition-all duration-300 cursor-pointer shadow-sm hover:bg-zinc-800"
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