import { useState } from 'react';
import { GraduationCap, BookOpen, MessageCircle, Video, Gamepad2 } from 'lucide-react';

const topics = [
  { id: 1, title: 'Finding Your Identity in Christ', category: 'Identity', icon: BookOpen },
  { id: 2, title: 'Dealing with Peer Pressure', category: 'Life Skills', icon: MessageCircle },
  { id: 3, title: 'Faith & Social Media', category: 'Digital Life', icon: Video },
  { id: 4, title: 'Bible Study Basics', category: 'Study', icon: BookOpen },
  { id: 5, title: 'Building Healthy Friendships', category: 'Relationships', icon: Gamepad2 },
];

const discussionQuestions = [
  'What does it mean to be a Christian teenager today?',
  'How do you handle doubts about your faith?',
  'What are practical ways to share your faith at school?',
];

export default function YouthHub() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Youth Hub</h1>
        <p className="text-slate-500">Resources for teenagers and young adults</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-y-auto">
        {/* Topics */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">Study Topics</h2>
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`bg-white rounded-2xl p-6 border cursor-pointer transition-all ${
                selectedTopic === topic.id
                  ? 'border-[hsl(210,70%,60%)] shadow-md'
                  : 'border-[hsl(48,30%,88%)] hover:border-[hsl(210,70%,60%)]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center">
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs text-[hsl(210,70%,50%)] font-medium">{topic.category}</span>
                  <h3 className="font-bold text-slate-800">{topic.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] rounded-2xl p-6 text-white">
            <GraduationCap className="w-10 h-10 mb-4" />
            <h3 className="text-lg font-bold mb-2">Youth Group Leader?</h3>
            <p className="text-white/80 text-sm mb-4">
              Access discussion guides and activity ideas for your youth group.
            </p>
            <button className="w-full py-2.5 bg-white text-[hsl(210,70%,50%)] rounded-xl font-medium text-sm">
              View Resources
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
            <h3 className="font-bold text-slate-800 mb-4">Discussion Starters</h3>
            <div className="space-y-3">
              {discussionQuestions.map((q, i) => (
                <div key={i} className="p-3 bg-[hsl(48,60%,98%)] rounded-xl text-sm text-slate-600">
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
