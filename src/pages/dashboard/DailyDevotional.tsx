import { useState } from 'react';
import { BookOpen, Heart, Share2, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { useDevotionalStore } from '@/store';
import { toast } from 'sonner';

export default function DailyDevotional() {
  const { devotionals, getTodaysDevotional } = useDevotionalStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const currentDevotional = devotionals[currentIndex] || getTodaysDevotional();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const nextDevotional = () => {
    setCurrentIndex((prev) => (prev + 1) % devotionals.length);
  };

  const prevDevotional = () => {
    setCurrentIndex((prev) => (prev - 1 + devotionals.length) % devotionals.length);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Daily Devotional</h1>
          <p className="text-slate-500">Start your day with God's Word</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              isBookmarked 
                ? 'bg-[hsl(48,90%,55%)]/20 text-[hsl(48,80%,45%)]' 
                : 'hover:bg-[hsl(48,60%,96%)] text-slate-400'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-[hsl(48,60%,96%)] text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Devotional Card */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[hsl(48,30%,88%)] p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Date */}
          <div className="text-center mb-8">
            <p className="text-sm text-slate-500 uppercase tracking-wide">
              {currentDevotional.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Scripture */}
          <div className="bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] rounded-2xl p-8 text-white mb-8">
            <BookOpen className="w-8 h-8 mb-4 opacity-80" />
            <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-4">
              "{currentDevotional.scripture}"
            </blockquote>
            <cite className="text-white/80 not-italic">— {currentDevotional.verse}</cite>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            {currentDevotional.title}
          </h2>

          {/* Reflection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Reflection</h3>
            <p className="text-slate-600 leading-relaxed">
              {currentDevotional.reflection}
            </p>
          </div>

          {/* Prayer */}
          <div className="bg-[hsl(48,60%,98%)] rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[hsl(340,60%,65%)]" />
              Prayer
            </h3>
            <p className="text-slate-600 leading-relaxed italic">
              {currentDevotional.prayer}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevDevotional}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[hsl(210,70%,50%)] hover:bg-[hsl(210,80%,95%)] rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <div className="flex gap-2">
          {devotionals.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-[hsl(210,70%,60%)] w-6' : 'bg-[hsl(48,30%,88%)]'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextDevotional}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-[hsl(210,70%,50%)] hover:bg-[hsl(210,80%,95%)] rounded-xl transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
