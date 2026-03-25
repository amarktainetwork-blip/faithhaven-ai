import { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  Heart, 
  Eye, 
  EyeOff,
  Save,
  Lock
} from 'lucide-react';
import { useAdminStore } from '@/store';
import { toast } from 'sonner';

export default function AdminPanel() {
  const { stats, subscribers, apiConfig, updateAPIConfig } = useAdminStore();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [localConfig, setLocalConfig] = useState(apiConfig);

  const handleSaveAPIConfig = () => {
    updateAPIConfig(localConfig);
    toast.success('API configuration saved');
  };

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' },
    { label: 'Active Subscribers', value: stats.activeSubscribers.toLocaleString(), icon: CreditCard, color: 'from-[hsl(150,30%,55%)] to-[hsl(180,40%,50%)]' },
    { label: 'Chat Messages', value: stats.chatMessages.toLocaleString(), icon: MessageSquare, color: 'from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]' },
    { label: 'Total Prayers', value: stats.prayers.toLocaleString(), icon: Heart, color: 'from-[hsl(340,60%,65%)] to-[hsl(0,60%,65%)]' },
  ];

  const apiFields = [
    { key: 'openaiApiKey', label: 'OpenAI API Key', placeholder: 'sk-...' },
    { key: 'elevenLabsApiKey', label: 'ElevenLabs API Key', placeholder: 'Enter API key' },
    { key: 'supabaseUrl', label: 'Supabase URL', placeholder: 'https://...' },
    { key: 'supabaseAnonKey', label: 'Supabase Anon Key', placeholder: 'Enter anon key' },
    { key: 'payfastMerchantId', label: 'PayFast Merchant ID', placeholder: 'Enter merchant ID' },
    { key: 'payfastMerchantKey', label: 'PayFast Merchant Key', placeholder: 'Enter merchant key' },
    { key: 'stripePublishableKey', label: 'Stripe Publishable Key', placeholder: 'pk_...' },
    { key: 'stripeSecretKey', label: 'Stripe Secret Key', placeholder: 'sk_...' },
  ];

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] flex items-center justify-center">
          <Lock className="w-5 h-5 text-slate-800" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
          <p className="text-slate-500">Manage API keys and view platform statistics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        {/* API Configuration */}
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">API Configuration</h2>
          <div className="space-y-4">
            {apiFields.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                <div className="relative">
                  <input
                    type={showKeys[key] ? 'text' : 'password'}
                    value={localConfig[key as keyof typeof localConfig]}
                    onChange={(e) => setLocalConfig(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                  />
                  <button
                    onClick={() => toggleKeyVisibility(key)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys[key] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleSaveAPIConfig}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>

        {/* Recent Subscribers */}
        <div className="bg-white rounded-2xl border border-[hsl(48,30%,88%)] p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Subscribers</h2>
          <div className="space-y-4">
            {subscribers.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between p-4 bg-[hsl(48,60%,98%)] rounded-xl">
                <div>
                  <p className="font-medium text-slate-800">{sub.name}</p>
                  <p className="text-sm text-slate-500">{sub.email}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    sub.status === 'active' 
                      ? 'bg-[hsl(150,30%,55%)]/20 text-[hsl(150,30%,45%)]' 
                      : 'bg-[hsl(0,70%,55%)]/20 text-[hsl(0,70%,45%)]'
                  }`}>
                    {sub.status}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{sub.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="mt-8 bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/70 mb-1">Monthly Revenue</p>
            <p className="text-3xl font-bold">R{stats.monthlyRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/70 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">R{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white/70 mb-1">Amount Owing</p>
            <p className="text-3xl font-bold">R{stats.owingAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
