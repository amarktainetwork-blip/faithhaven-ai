import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, BookOpen } from 'lucide-react';

const books = [
  { name: 'Genesis', chapters: 50 },
  { name: 'Psalms', chapters: 150 },
  { name: 'Proverbs', chapters: 31 },
  { name: 'Matthew', chapters: 28 },
  { name: 'John', chapters: 21 },
  { name: 'Romans', chapters: 16 },
];

export default function BibleAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBook, setCurrentBook] = useState('John');
  const [progress] = useState(35);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Bible Audio</h1>
        <p className="text-slate-500">Listen to Scripture on the go</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        {/* Player */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] rounded-2xl p-8 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                <BookOpen className="w-10 h-10" />
              </div>
              <div>
                <p className="text-white/70">Now Playing</p>
                <h2 className="text-2xl font-bold">{currentBook} 3:16</h2>
                <p className="text-white/70">NIV Audio Bible</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/70 mt-2">
                <span>2:34</span>
                <span>5:12</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[hsl(210,70%,50%)] hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Volume */}
          <div className="mt-6 bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
            <div className="flex items-center gap-4">
              <Volume2 className="w-5 h-5 text-slate-400" />
              <div className="flex-1 h-2 bg-[hsl(48,30%,88%)] rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[hsl(210,70%,60%)] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6 overflow-y-auto">
          <h3 className="font-bold text-slate-800 mb-4">Books</h3>
          <div className="space-y-2">
            {books.map((book) => (
              <button
                key={book.name}
                onClick={() => setCurrentBook(book.name)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                  currentBook === book.name
                    ? 'bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)]'
                    : 'hover:bg-[hsl(48,60%,98%)] text-slate-600'
                }`}
              >
                <span className="font-medium">{book.name}</span>
                <span className="text-sm text-slate-400">{book.chapters} ch</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
