import { motion } from 'framer-motion';

export default function LiveTicker() {
  const tickerText = "🫐 BERRY AI NOW ACTIVE ACROSS ALL DEVICES • COMPLEMENTARY SHIPPING ON ORDERS OVER ₹50,000 • TRADE-IN YOUR OLD TECH FOR UP TO ₹15,000 CREDIT • ";

  return (
    <div className="fixed top-0 left-0 z-50 w-full overflow-hidden bg-white/[0.02] py-2 border-b border-white/[0.05] backdrop-blur-md">
      <div className="flex whitespace-nowrap">
        {/* We duplicate the text block twice to create a seamless infinite loop gapless look */}
        <motion.div 
          className="text-[10px] font-semibold uppercase tracking-widest text-accent flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </motion.div>
      </div>
    </div>
  );
}