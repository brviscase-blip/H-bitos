import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  getDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  allowedDays: number[]; // 0-6 (Sun-Sat)
}

export function CustomCalendar({ selectedDate, onDateSelect, allowedDays }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl py-4 px-4 w-full shadow-xl">
      <div className="flex items-center justify-between mb-4 px-1">
        <button 
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <ChevronLeft size={16} />
        </button>
        <h3 className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <button 
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all border border-white/5"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-[9px] font-bold text-gray-600 text-center uppercase tracking-widest">
            {day.charAt(0)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => {
          const isAllowed = allowedDays.includes(getDay(day));
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          
          return (
            <button
              key={i}
              type="button"
              disabled={!isAllowed}
              onClick={() => onDateSelect(day)}
              className={`
                h-9 w-full text-[11px] rounded-xl flex flex-col items-center justify-center transition-all relative border font-bold
                ${!isCurrentMonth ? 'opacity-20' : ''}
                ${isSelected 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20 z-10' 
                  : isAllowed 
                    ? 'bg-white/5 border-white/5 hover:border-blue-500/50 text-gray-300 cursor-pointer' 
                    : 'bg-transparent border-transparent text-gray-800 cursor-not-allowed'}
              `}
            >
              <span>{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
