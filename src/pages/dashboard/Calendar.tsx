import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCalendarStore } from '@/store';
import { toast } from 'sonner';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, getDay } from 'date-fns';

const eventTypes = {
  feast: { label: 'Feast', color: 'bg-[hsl(48,90%,65%)]' },
  fast: { label: 'Fast', color: 'bg-[hsl(210,70%,60%)]' },
  holiday: { label: 'Holiday', color: 'bg-[hsl(150,30%,55%)]' },
  personal: { label: 'Personal', color: 'bg-[hsl(260,50%,65%)]' },
};

export default function Calendar() {
  const { events, addEvent } = useCalendarStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    type: keyof typeof eventTypes;
    description: string;
  }>({
    title: '',
    type: 'personal',
    description: '',
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) {
      toast.error('Please fill in all fields');
      return;
    }
    addEvent({
      title: newEvent.title,
      date: selectedDate,
      type: newEvent.type,
      description: newEvent.description,
    });
    setNewEvent({ title: '', type: 'personal', description: '' });
    setShowAddModal(false);
    toast.success('Event added');
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faith Calendar</h1>
          <p className="text-slate-500">Track religious holidays and personal events</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <span className="text-lg font-semibold text-slate-800 min-w-[140px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        {Object.entries(eventTypes).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-sm text-slate-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[hsl(48,30%,88%)] overflow-hidden">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-[hsl(48,30%,88%)]">
          {weekDays.map(day => (
            <div key={day} className="py-3 text-center text-sm font-medium text-slate-500">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 h-[calc(100%-3rem)]">
          {/* Empty cells for start of month */}
          {[...Array(startDay)].map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-[hsl(48,30%,88%)] bg-slate-50/50" />
          ))}

          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <div
                key={day.toISOString()}
                onClick={() => {
                  setSelectedDate(day);
                  setShowAddModal(true);
                }}
                className={`border-b border-r border-[hsl(48,30%,88%)] p-2 cursor-pointer hover:bg-[hsl(48,60%,98%)] transition-colors ${
                  isToday ? 'bg-[hsl(210,80%,95%)]' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-[hsl(210,70%,50%)]' : 'text-slate-700'}`}>
                  {format(day, 'd')}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${
                        eventTypes[event.type]?.color || 'bg-slate-400'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-slate-500">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">
                Add Event - {format(selectedDate, 'MMM d, yyyy')}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                  className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as keyof typeof eventTypes }))}
                  className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all bg-white"
                >
                  {Object.entries(eventTypes).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description (optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add details..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 h-12 border border-[hsl(48,30%,88%)] text-slate-700 rounded-xl font-medium hover:bg-[hsl(48,60%,96%)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="flex-1 h-12 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
