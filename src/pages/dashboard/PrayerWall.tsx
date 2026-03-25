import { useState } from 'react';
import { Heart, Plus, X, User, Clock } from 'lucide-react';
import { usePrayerWallStore, useAuthStore } from '@/store';
import { toast } from 'sonner';

export default function PrayerWall() {
  const { prayers, addPrayer, prayFor } = usePrayerWallStore();
  const { user } = useAuthStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPrayer, setNewPrayer] = useState({
    content: '',
    isAnonymous: false,
  });

  const handleAddPrayer = () => {
    if (!newPrayer.content.trim()) {
      toast.error('Please enter your prayer request');
      return;
    }
    addPrayer({
      userId: user?.id || '1',
      userName: newPrayer.isAnonymous ? 'Anonymous' : (user?.name || 'User'),
      content: newPrayer.content,
      isAnonymous: newPrayer.isAnonymous,
    });
    setNewPrayer({ content: '', isAnonymous: false });
    setShowAddModal(false);
    toast.success('Prayer request shared');
  };

  const handlePrayFor = (id: string) => {
    prayFor(id);
    toast.success('You prayed for this request');
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prayer Wall</h1>
          <p className="text-slate-500">Share requests and pray for others</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Share Request
        </button>
      </div>

      {/* Prayer Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayers.map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white rounded-2xl p-6 border border-[hsl(48,30%,88%)] card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{prayer.userName}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(prayer.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 mb-6 leading-relaxed">
                {prayer.content}
              </p>

              <button
                onClick={() => handlePrayFor(prayer.id)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[hsl(48,60%,98%)] hover:bg-[hsl(210,80%,95%)] text-slate-600 hover:text-[hsl(210,70%,50%)] transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>Pray for this ({prayer.prayerCount})</span>
              </button>
            </div>
          ))}
        </div>

        {prayers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[hsl(48,60%,96%)] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No prayers yet</h3>
            <p className="text-slate-500 mb-4">Be the first to share a prayer request</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
            >
              Share a Prayer
            </button>
          </div>
        )}
      </div>

      {/* Add Prayer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Share Prayer Request</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Prayer Request
                </label>
                <textarea
                  value={newPrayer.content}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share what you're praying for..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all resize-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPrayer.isAnonymous}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-[hsl(210,70%,60%)] focus:ring-[hsl(210,70%,60%)]"
                />
                <span className="text-sm text-slate-600">Post anonymously</span>
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
                Share Prayer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
