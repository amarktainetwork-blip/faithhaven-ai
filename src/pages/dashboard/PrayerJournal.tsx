import { useState } from 'react';
import { Plus, Search, Check, Trash2, Tag, Lock, Globe } from 'lucide-react';
import { usePrayerStore } from '@/store';
import { toast } from 'sonner';

const prayerTags = ['Family', 'Health', 'Career', 'Finances', 'Relationships', 'Guidance', 'Healing', 'Thanksgiving'];

export default function PrayerJournal() {
  const { prayers, addPrayer, deletePrayer, markAnswered } = usePrayerStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newPrayer, setNewPrayer] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    isPublic: false,
  });

  const filteredPrayers = prayers.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPrayer = () => {
    if (!newPrayer.title || !newPrayer.content) {
      toast.error('Please fill in all fields');
      return;
    }
    addPrayer({
      userId: '1',
      title: newPrayer.title,
      content: newPrayer.content,
      tags: newPrayer.tags,
      isAnswered: false,
      isPublic: newPrayer.isPublic,
    });
    setNewPrayer({ title: '', content: '', tags: [], isPublic: false });
    setShowAddModal(false);
    toast.success('Prayer added to your journal');
  };

  const toggleTag = (tag: string) => {
    setNewPrayer(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prayer Journal</h1>
          <p className="text-slate-500">Record and track your prayers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Prayer
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search prayers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[hsl(48,30%,88%)]">
          <p className="text-2xl font-bold text-[hsl(210,70%,50%)]">{prayers.length}</p>
          <p className="text-sm text-slate-500">Total Prayers</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[hsl(48,30%,88%)]">
          <p className="text-2xl font-bold text-[hsl(150,30%,55%)]">
            {prayers.filter(p => p.isAnswered).length}
          </p>
          <p className="text-sm text-slate-500">Answered</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[hsl(48,30%,88%)]">
          <p className="text-2xl font-bold text-[hsl(48,80%,45%)]">
            {prayers.filter(p => !p.isAnswered).length}
          </p>
          <p className="text-sm text-slate-500">Active</p>
        </div>
      </div>

      {/* Prayer List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className={`bg-white rounded-2xl p-6 border transition-all ${
              prayer.isAnswered 
                ? 'border-[hsl(150,30%,55%)]/30 bg-[hsl(150,30%,95%)]' 
                : 'border-[hsl(48,30%,88%)]'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-bold ${prayer.isAnswered ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {prayer.title}
                  </h3>
                  {prayer.isPublic ? (
                    <Globe className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                  {prayer.isAnswered && (
                    <span className="px-2 py-0.5 bg-[hsl(150,30%,55%)]/20 text-[hsl(150,30%,45%)] text-xs rounded-full">
                      Answered
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-3 ${prayer.isAnswered ? 'text-slate-400' : 'text-slate-600'}`}>
                  {prayer.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {prayer.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-[hsl(48,60%,96%)] text-slate-600 text-xs rounded-full">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!prayer.isAnswered && (
                  <button
                    onClick={() => {
                      markAnswered(prayer.id);
                      toast.success('Prayer marked as answered!');
                    }}
                    className="p-2 text-[hsl(150,30%,55%)] hover:bg-[hsl(150,30%,95%)] rounded-lg transition-colors"
                    title="Mark as answered"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => {
                    deletePrayer(prayer.id);
                    toast.success('Prayer deleted');
                  }}
                  className="p-2 text-slate-400 hover:text-[hsl(0,70%,55%)] hover:bg-[hsl(0,70%,95%)] rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredPrayers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[hsl(48,60%,96%)] flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No prayers yet</h3>
            <p className="text-slate-500 mb-4">Start recording your prayers and see God work</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
            >
              Add Your First Prayer
            </button>
          </div>
        )}
      </div>

      {/* Add Prayer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4">New Prayer Request</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPrayer.title}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What are you praying for?"
                  className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Details</label>
                <textarea
                  value={newPrayer.content}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share more about your prayer request..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {prayerTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        newPrayer.tags.includes(tag)
                          ? 'bg-[hsl(210,70%,60%)] text-white'
                          : 'bg-[hsl(48,60%,96%)] text-slate-600 hover:bg-[hsl(210,80%,95%)]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPrayer.isPublic}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-[hsl(210,70%,60%)] focus:ring-[hsl(210,70%,60%)]"
                />
                <span className="text-sm text-slate-600">Share on Prayer Wall</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 h-12 border border-[hsl(48,30%,88%)] text-slate-700 rounded-xl font-medium hover:bg-[hsl(48,60%,96%)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPrayer}
                className="flex-1 h-12 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
              >
                Add Prayer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
