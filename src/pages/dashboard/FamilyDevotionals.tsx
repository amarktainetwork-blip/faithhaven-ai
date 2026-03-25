import { useState } from 'react';
import { Users, BookOpen, Heart, Calendar } from 'lucide-react';

const devotionals = [
  {
    id: 1,
    title: 'Love One Another',
    scripture: 'John 13:34-35',
    theme: 'Love',
    duration: '15 min',
    ages: 'All ages',
  },
  {
    id: 2,
    title: 'Trust in the Lord',
    scripture: 'Proverbs 3:5-6',
    theme: 'Trust',
    duration: '10 min',
    ages: 'All ages',
  },
  {
    id: 3,
    title: 'Be Kind',
    scripture: 'Ephesians 4:32',
    theme: 'Kindness',
    duration: '12 min',
    ages: 'All ages',
  },
];

export default function FamilyDevotionals() {
  const [selectedDevotional, setSelectedDevotional] = useState(devotionals[0]);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Family Devotionals</h1>
        <p className="text-slate-500">Grow together in faith as a family</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {/* Devotional List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">This Week</h2>
          {devotionals.map((devotional) => (
            <div
              key={devotional.id}
              onClick={() => setSelectedDevotional(devotional)}
              className={`bg-white rounded-2xl p-4 border cursor-pointer transition-all ${
                selectedDevotional.id === devotional.id
                  ? 'border-[hsl(210,70%,60%)] shadow-md'
                  : 'border-[hsl(48,30%,88%)] hover:border-[hsl(210,70%,60%)]/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-xs rounded-full">
                  {devotional.theme}
                </span>
                <span className="text-xs text-slate-400">{devotional.duration}</span>
              </div>
              <h3 className="font-bold text-slate-800">{devotional.title}</h3>
              <p className="text-sm text-slate-500">{devotional.scripture}</p>
            </div>
          ))}
        </div>

        {/* Current Devotional */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm rounded-full">
                {selectedDevotional.theme}
              </span>
              <span className="flex items-center gap-1 text-sm text-slate-400">
                <Users className="w-4 h-4" />
                {selectedDevotional.ages}
              </span>
              <span className="flex items-center gap-1 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                {selectedDevotional.duration}
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">{selectedDevotional.title}</h2>
            <p className="text-[hsl(210,70%,50%)] mb-8">{selectedDevotional.scripture}</p>

            <div className="space-y-6">
              <div className="bg-[hsl(48,60%,98%)] rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[hsl(210,70%,60%)]" />
                  Scripture Reading
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  "A new command I give you: Love one another. As I have loved you, 
                  so you must love one another. By this everyone will know that you 
                  are my disciples, if you love one another."
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-3">Discussion Questions</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[hsl(210,70%,60%)] text-white text-sm flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span className="text-slate-600">What does it mean to love one another?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[hsl(210,70%,60%)] text-white text-sm flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span className="text-slate-600">How did Jesus show His love for us?</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-[hsl(210,70%,60%)] text-white text-sm flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span className="text-slate-600">How can we show love to our family this week?</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Family Prayer
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Dear God, thank You for our family. Help us to love one another 
                  as You have loved us. Show us ways to be kind and caring to each 
                  other every day. In Jesus' name, Amen.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-3">Activity Idea</h3>
                <div className="p-4 bg-[hsl(150,30%,95%)] rounded-xl">
                  <p className="text-slate-600">
                    Create "Love Coupons" for family members. Each person writes 
                    kind things they will do for others this week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
