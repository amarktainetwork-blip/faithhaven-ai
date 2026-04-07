import { useState } from 'react';
import { Scroll, BookOpen, Music, Copy, Download, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

type LiturgySection = 'call' | 'prayer' | 'hymn1' | 'reading' | 'sermon' | 'hymn2' | 'offering' | 'benediction';

type LiturgyContent = Record<LiturgySection, string>;

const liturgyParts: Array<{ id: LiturgySection; label: string; icon: LucideIcon }> = [
  { id: 'call', label: 'Call to Worship', icon: BookOpen },
  { id: 'prayer', label: 'Opening Prayer', icon: Scroll },
  { id: 'hymn1', label: 'First Hymn', icon: Music },
  { id: 'reading', label: 'Scripture Reading', icon: BookOpen },
  { id: 'sermon', label: 'Sermon', icon: Scroll },
  { id: 'hymn2', label: 'Second Hymn', icon: Music },
  { id: 'offering', label: 'Offering', icon: Scroll },
  { id: 'benediction', label: 'Benediction', icon: BookOpen },
];

export default function LiturgyBuilder() {
  const [denomination, setDenomination] = useState('anglican');
  const [occasion, setOccasion] = useState('sunday');
  const [generatedLiturgy, setGeneratedLiturgy] = useState<LiturgyContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGeneratedLiturgy({
      call: `Welcome, brothers and sisters in Christ. Let us worship the Lord with gladness and come before Him with joyful songs.`,
      prayer: `Heavenly Father, we gather in Your name. Open our hearts to receive Your Word and fill us with Your Spirit.`,
      hymn1: `Amazing Grace - Verse 1, 2, and 4`,
      reading: `Psalm 100 - A psalm for giving grateful praise`,
      sermon: `Title: The Grace of God - Scripture: Ephesians 2:8-9`,
      hymn2: `How Great Thou Art - All verses`,
      offering: `Let us present our offerings to the Lord with grateful hearts.`,
      benediction: `May the grace of our Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with you all.`,
    });
    setIsGenerating(false);
    toast.success('Liturgy generated!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedLiturgy, null, 2));
    toast.success('Liturgy copied to clipboard');
  };
  const handleDownload = () => {
    if (!generatedLiturgy) return;
    const blob = new Blob([JSON.stringify(generatedLiturgy, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liturgy-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Liturgy Builder</h1>
        <p className="text-slate-500">Create beautiful worship services</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        {/* Settings */}
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Service Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Denomination</label>
              <select
                value={denomination}
                onChange={(e) => setDenomination(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all bg-white"
              >
                <option value="catholic">Catholic</option>
                <option value="anglican">Anglican</option>
                <option value="lutheran">Lutheran</option>
                <option value="methodist">Methodist</option>
                <option value="presbyterian">Presbyterian</option>
                <option value="baptist">Baptist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all bg-white"
              >
                <option value="sunday">Sunday Service</option>
                <option value="easter">Easter</option>
                <option value="christmas">Christmas</option>
                <option value="wedding">Wedding</option>
                <option value="funeral">Funeral</option>
                <option value="baptism">Baptism</option>
              </select>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-12 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate Liturgy'}
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Liturgy Structure</h3>
            <div className="space-y-2">
              {liturgyParts.map((part) => (
                <div key={part.id} className="flex items-center gap-3 p-3 bg-[hsl(48,60%,98%)] rounded-xl">
                  <part.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{part.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Liturgy Preview</h2>
            {generatedLiturgy && (
              <div className="flex gap-2">
                <button onClick={handleCopy} className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-lg transition-colors">
                  <Copy className="w-5 h-5 text-slate-500" />
                </button>
                <button onClick={handleDownload} className="p-2 hover:bg-[hsl(48,60%,96%)] rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            )}
          </div>

          {generatedLiturgy ? (
            <div className="space-y-8">
              {liturgyParts.map((part) => (
                <div key={part.id} className="border-l-4 border-[hsl(210,70%,60%)] pl-4">
                  <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <part.icon className="w-4 h-4 text-[hsl(210,70%,60%)]" />
                    {part.label}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{generatedLiturgy[part.id]}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Scroll className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500">Configure settings and generate a liturgy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
