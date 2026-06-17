import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

interface BookingDate {
  dayLabel: string;
  dateLabel: string;
  fullString: string;
}

export default function GeniusBarModal() {
  const { isGeniusOpen, setGeniusOpen } = useUIStore();
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  // Calculate an absolute dynamic rolling window grid pool of 14 calendar days starting from today
  const generateRollingDaysMatrix = (): BookingDate[] => {
    const daysMatrix: BookingDate[] = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 14; i++) {
      const current = new Date();
      current.setDate(current.getDate() + i);

      daysMatrix.push({
        dayLabel: weekdays[current.getDay()],
        dateLabel: `${current.getDate()} ${months[current.getMonth()]}`,
        fullString: current.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
    return daysMatrix;
  };

  const calendarDays = generateRollingDaysMatrix();

  const timeSlots = [
    '10:00 AM', '11:15 AM', '12:30 PM', '02:00 PM', '03:15 PM', '04:30 PM', '05:45 PM', '07:00 PM'
  ];

  const handleSlotSelection = (time: string) => {
    const targetDay = calendarDays[selectedDayIdx];
    alert(`Appointment Confirmed!\n\n📍 Node Location: BERRY Genius Lounge\n📅 Schedule: ${targetDay.fullString}\n⏰ Configuration window: ${time}`);
    setGeniusOpen(false);
  };

  return (
    <AnimatePresence>
      {isGeniusOpen && (
        <>
          {/* ✨ HIGH-KEY MINIMALIST: Ambient Sheet Overlay Shield */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGeniusOpen(false)}
            className="fixed inset-0 z-50 bg-white/40 backdrop-blur-md"
          />

          {/* ✨ HIGH-KEY MINIMALIST: Core Central Modal Window Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="fixed inset-4 z-50 m-auto h-[85vh] max-h-[680px] w-full max-w-[850px] overflow-y-auto rounded-[32px] border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header Module Rows */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-xl bg-zinc-900 p-2 shadow-sm">
                    <Calendar size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-black tracking-tight text-zinc-900">Genius Bar Concierge</h2>
                    <p className="text-[11px] text-zinc-500 font-medium mt-0.5">Secure an immersive expert configuration window session.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setGeniusOpen(false)}
                  className="rounded-full bg-zinc-50 border border-zinc-200 p-2 transition-colors hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ==================== 14-DAY HORIZONTAL SLIDER ROW ==================== */}
              <div className="mt-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-2.5">1. Select Target Date Node</span>
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none snap-x">
                  {calendarDays.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDayIdx(idx)}
                      className={`min-w-[85px] flex-shrink-0 rounded-2xl border px-3 py-3.5 text-center transition-all snap-center cursor-pointer ${
                        selectedDayIdx === idx 
                          ? 'border-zinc-900 bg-zinc-900 shadow-md text-white' 
                          : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:text-zinc-900'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">{day.dayLabel}</span>
                      <span className="text-xs font-heading font-black block mt-1 tracking-tight">{day.dateLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ==================== THE AVAILABLE TIME SLOTS GRID ==================== */}
              <div className="mt-6 pt-6 border-t border-zinc-100">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 block mb-3.5 flex items-center gap-1.5">
                  <Clock size={10} className="text-zinc-900" />
                  2. Allocate Available Session Window ({calendarDays[selectedDayIdx].fullString})
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelection(slot)}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-xs font-bold tracking-wide text-zinc-600 transition-all hover:bg-zinc-900 hover:border-zinc-900 hover:text-white cursor-pointer hover:shadow-md"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Footer Guidelines Informative Strip */}
            <div className="border-t border-zinc-100 pt-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-[10px] text-zinc-500 mt-4">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={12} className="text-zinc-900" />
                <span>Sessions are complementary and include hardware profiling and transfer setup help.</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">BERRY Logistics Stack v4</span>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}