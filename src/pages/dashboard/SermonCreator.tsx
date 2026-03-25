import { useState } from 'react';
import { Mic, Sparkles, Copy, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function SermonCreator() {
  const [topic, setTopic] = useState('');
  const [scripture, setScripture] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sermon, setSermon] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic || !scripture) {
      toast.error('Please enter both topic and scripture');
      return;
    }
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSermon({
      title: `The Power of ${topic}`,
      scripture: scripture,
      introduction: `Good morning, church. Today we're going to explore the profound truth found in ${scripture} about ${topic}. This passage has transformed countless lives throughout history, and I believe God has a word for us today.`,
      mainPoints: [
        `Understanding ${topic} in its biblical context`,
        `How ${topic} applies to our daily lives`,
        `Practical steps to grow in ${topic}`,
      ],
      conclusion: `As we conclude, remember that ${topic} is not just a concept—it's a calling. May we go forth today embodying the truth of ${scripture} in everything we do.`,
      illustrations: [
        `The story of someone who exemplified ${topic}`,
        `A modern-day example of ${topic} in action`,
      ],
    });
    setIsGenerating(false);
    toast.success('Sermon outline generated!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(sermon, null, 2));
    toast.success('Sermon copied to clipboard');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Sermon Creator</h1>
        <p className="text-slate-500">AI-assisted sermon preparation</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 flex-1">
        {/* Input Section */}
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Sermon Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sermon Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Faith, Love, Forgiveness"
                className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Key Scripture</label>
              <input
                type="text"
                value={scripture}
                onChange={(e) => setScripture(e.target.value)}
                placeholder="e.g., John 3:16"
                className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-12 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Sermon
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Generated Sermon</h2>
            {sermon && (
              <div className="flex gap-2">
                <button onClick={handleCopy} className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-lg transition-colors">
                  <Copy className="w-5 h-5 text-slate-500" />
                </button>
                <button className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            )}
          </div>

          {sermon ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">{sermon.title}</h3>
                <p className="text-[hsl(210,70%,50%)]">{sermon.scripture}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Introduction</h4>
                <p className="text-slate-600 leading-relaxed">{sermon.introduction}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Main Points</h4>
                <ol className="space-y-2">
                  {sermon.mainPoints.map((point: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[hsl(210,70%,60%)] text-white text-sm flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Illustrations</h4>
                <ul className="space-y-2">
                  {sermon.illustrations.map((illus: string, i: number) => (
                    <li key={i} className="flex gap-2 text-slate-600">
                      <span className="text-[hsl(48,90%,55%)]">•</span>
                      {illus}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Conclusion</h4>
                <p className="text-slate-600 leading-relaxed">{sermon.conclusion}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Mic className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500">Enter sermon details to generate an outline</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
