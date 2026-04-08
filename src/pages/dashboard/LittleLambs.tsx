import { useState } from 'react';
import { Baby, BookOpen, Palette, Music, Star } from 'lucide-react';

const stories = [
  { id: 1, title: 'David and Goliath', ageRange: '5-8', theme: 'Courage', icon: Star },
  { id: 2, title: 'Noah\'s Ark', ageRange: '3-7', theme: 'Obedience', icon: BookOpen },
  { id: 3, title: 'Daniel in the Lions\' Den', ageRange: '6-9', theme: 'Faith', icon: Star },
  { id: 4, title: 'The Good Samaritan', ageRange: '5-8', theme: 'Kindness', icon: Palette },
];

const activities = [
  { title: 'Coloring Pages', icon: Palette, count: 24 },
  { title: 'Bible Songs', icon: Music, count: 12 },
  { title: 'Story Videos', icon: BookOpen, count: 18 },
];

export default function LittleLambs() {
  const [selectedAge, setSelectedAge] = useState('all');
  const filteredStories = stories.filter((story) => selectedAge === 'all' || story.ageRange.includes(selectedAge.split('-')[0]));

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Little Lambs</h1>
        <p className="text-slate-500">Bible stories and activities for children</p>
      </div>

      {/* Age Filter */}
      <div className="flex gap-2 mb-6">
        {['all', '3-5', '6-8', '9-12'].map((age) => (
          <button
            key={age}
            onClick={() => setSelectedAge(age)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              selectedAge === age
                ? 'bg-[hsl(210,70%,60%)] text-white'
                : 'bg-white border border-[hsl(48,30%,88%)] text-slate-600 hover:border-[hsl(210,70%,60%)]'
            }`}
          >
            {age === 'all' ? 'All Ages' : `Ages ${age}`}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {/* Stories */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Bible Stories</h2>
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl p-6 border border-[hsl(48,30%,88%)] card-hover cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] flex items-center justify-center">
                  <story.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[hsl(48,90%,55%)]/20 text-[hsl(48,80%,45%)] text-xs rounded-full">
                      Ages {story.ageRange}
                    </span>
                    <span className="px-2 py-0.5 bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-xs rounded-full">
                      {story.theme}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{story.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Interactive story with activities and discussion questions
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] rounded-2xl p-6 text-white">
            <Baby className="w-10 h-10 mb-4" />
            <h3 className="text-lg font-bold mb-2">Parent Resources</h3>
            <p className="text-white/80 text-sm mb-4">
              Tips for teaching your children about faith at home.
            </p>
            <button className="w-full py-2.5 bg-white text-[hsl(48,80%,45%)] rounded-xl font-medium text-sm">
              View Guide
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
            <h3 className="font-bold text-slate-800 mb-4">Activities</h3>
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.title} className="flex items-center gap-3 p-3 bg-[hsl(48,60%,98%)] rounded-xl">
                  <activity.icon className="w-5 h-5 text-[hsl(210,70%,60%)]" />
                  <span className="text-slate-700 flex-1">{activity.title}</span>
                  <span className="text-sm text-slate-400">{activity.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
