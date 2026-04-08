import { Users, CreditCard, MessageSquare, Heart, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { useAdminStore } from '@/store';

export default function AdminPanel() {
  const { stats, subscribers, apiConfig, isLoading, fetchStats, fetchSubscribers } = useAdminStore();

  useEffect(() => {
    fetchStats();
    fetchSubscribers();
  }, [fetchStats, fetchSubscribers]);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' },
    { label: 'Active Subscribers', value: stats.activeSubscribers.toLocaleString(), icon: CreditCard, color: 'from-[hsl(150,30%,55%)] to-[hsl(180,40%,50%)]' },
    { label: 'Chat Messages', value: stats.chatMessages.toLocaleString(), icon: MessageSquare, color: 'from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]' },
    { label: 'Total Prayers', value: stats.prayers.toLocaleString(), icon: Heart, color: 'from-[hsl(340,60%,65%)] to-[hsl(0,60%,65%)]' },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] flex items-center justify-center">
          <Lock className="w-5 h-5 text-slate-800" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-slate-500">Operational overview (server-managed secrets are not exposed in the browser)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading && <p className="text-slate-500 text-sm col-span-full">Loading admin metrics…</p>}
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[hsl(48,30%,88%)]">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
            <p className="text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Billing Integration</h2>
          <p className="text-slate-600 mb-4">Provider: <strong>{apiConfig.provider}</strong></p>
          <p className="text-slate-600 mb-4">Mode: <strong>{apiConfig.environment}</strong></p>
          <p className="text-slate-500 text-sm">Secret API keys are intentionally not stored in client state. Configure them only on the backend/VPS environment.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Subscribers</h2>
          <div className="space-y-4">
            {subscribers.length === 0 ? (
              <p className="text-slate-500 text-sm">No subscriber records available from backend yet.</p>
            ) : subscribers.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 bg-[hsl(48,60%,98%)] rounded-xl">
                <div>
                  <p className="font-medium text-slate-800">{sub.name}</p>
                  <p className="text-sm text-slate-500">{sub.email}</p>
                </div>
                <span className="text-xs text-slate-600">{sub.plan}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
