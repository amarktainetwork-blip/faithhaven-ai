import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  ChatMessage, 
  PrayerRequest, 
  Denomination, 
  Language, 
  SubscriptionPlan,
  GeoIPData,
  APIConfig,
  CalendarEvent,
  PrayerWallItem,
  Devotional,
  WorshipSong,
  BlogPost,
  JobListing,
  PressRelease,
  FAQItem
} from '@/types';
import { apiRequest } from '@/lib/api';

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, denomination: Denomination) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const data = await apiRequest<{ token: string; user: Omit<User, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string } }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });
          localStorage.setItem('faithhaven-token', data.token);
          set({
            user: {
              ...data.user,
              createdAt: new Date(data.user.createdAt),
              updatedAt: new Date(data.user.updatedAt),
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      register: async (email, password, name, denomination) => {
        set({ isLoading: true });
        try {
          const data = await apiRequest<{ token: string; user: Omit<User, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string } }>('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, denomination }),
          });
          localStorage.setItem('faithhaven-token', data.token);
          set({
            user: {
              ...data.user,
              createdAt: new Date(data.user.createdAt),
              updatedAt: new Date(data.user.updatedAt),
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      logout: () => {
        localStorage.removeItem('faithhaven-token');
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return false;
        try {
          const data = await apiRequest<{ user: Omit<User, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string } }>('/api/user/profile', {
            method: 'PUT',
            body: JSON.stringify(updates),
          });
          set({
            user: {
              ...data.user,
              createdAt: new Date(data.user.createdAt),
              updatedAt: new Date(data.user.updatedAt),
            },
          });
          return true;
        } catch {
          return false;
        }
      },
      changePassword: async (currentPassword, newPassword) => {
        try {
          await apiRequest<{ ok: true }>('/api/user/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword }),
          });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Chat Store
interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  showAdminPrompt: boolean;
  adminUnlocked: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setIsTyping: (isTyping: boolean) => void;
  setShowAdminPrompt: (show: boolean) => void;
  unlockAdmin: (password: string) => boolean;
  lockAdmin: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Welcome to FaithHaven AI. I am here to support your spiritual journey with biblical wisdom and prayerful guidance. How can I serve you today?',
          timestamp: new Date(),
        },
      ],
      isTyping: false,
      showAdminPrompt: false,
      adminUnlocked: false,
      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        set((state) => ({ messages: [...state.messages, newMessage] }));
      },
      clearChat: () => set({ 
        messages: [{
          id: 'welcome',
          role: 'assistant',
          content: 'Welcome to FaithHaven AI. I am here to support your spiritual journey with biblical wisdom and prayerful guidance. How can I serve you today?',
          timestamp: new Date(),
        }]
      }),
      setIsTyping: (isTyping) => set({ isTyping }),
      setShowAdminPrompt: (show) => set({ showAdminPrompt: show }),
      unlockAdmin: () => {
        return false;
      },
      lockAdmin: () => set({ adminUnlocked: false }),
    }),
    {
      name: 'chat-storage',
    }
  )
);

// Prayer Store
interface PrayerState {
  prayers: PrayerRequest[];
  addPrayer: (prayer: Omit<PrayerRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePrayer: (id: string) => void;
  markAnswered: (id: string) => void;
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set) => ({
      prayers: [
        {
          id: '1',
          userId: '1',
          title: 'Spiritual Growth',
          content: 'Praying for a deeper understanding of God\'s Word and a more consistent prayer life.',
          tags: ['Faith', 'Growth'],
          isAnswered: false,
          isPublic: false,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        }
      ],
      addPrayer: (prayer) => {
        const newPrayer: PrayerRequest = {
          ...prayer,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({ prayers: [...state.prayers, newPrayer] }));
      },
      deletePrayer: (id) => {
        set((state) => ({
          prayers: state.prayers.filter((p) => p.id !== id),
        }));
      },
      markAnswered: (id) => {
        set((state) => ({
          prayers: state.prayers.map((p) =>
            p.id === id
              ? { ...p, isAnswered: true, answeredDate: new Date(), updatedAt: new Date() }
              : p
          ),
        }));
      },
    }),
    {
      name: 'prayer-storage',
    }
  )
);

// UI Store
interface UIState {
  sidebarOpen: boolean;
  currentLanguage: Language;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      currentLanguage: 'en',
      theme: 'light',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setLanguage: (lang) => set({ currentLanguage: lang }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'ui-storage',
    }
  )
);

// Pricing Store
interface PricingState {
  geoData: GeoIPData | null;
  selectedPlan: SubscriptionPlan;
  selectedPeriod: 'monthly' | 'yearly';
  isLoading: boolean;
  fetchGeoData: () => Promise<void>;
  setSelectedPlan: (plan: SubscriptionPlan) => void;
  setSelectedPeriod: (period: 'monthly' | 'yearly') => void;
  convertPrice: (zarAmount: number) => number;
  getCurrencySymbol: () => string;
}

export const usePricingStore = create<PricingState>()((set, get) => ({
  geoData: null,
  selectedPlan: 'individual',
  selectedPeriod: 'monthly',
  isLoading: false,
  fetchGeoData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const currencyMap: Record<string, { symbol: string; rate: number }> = {
        'ZA': { symbol: 'R', rate: 1 },
        'US': { symbol: '$', rate: 0.054 },
        'GB': { symbol: '£', rate: 0.043 },
        'EU': { symbol: '€', rate: 0.050 },
        'AU': { symbol: 'A$', rate: 0.082 },
        'CA': { symbol: 'C$', rate: 0.073 },
      };
      
      const currency = currencyMap[data.country_code] || { symbol: '$', rate: 0.054 };
      
      set({
        geoData: {
          country: data.country_name,
          countryCode: data.country_code,
          currency: data.currency,
          currencySymbol: currency.symbol,
          exchangeRate: currency.rate,
        },
        isLoading: false,
      });
    } catch {
      set({
        geoData: {
          country: 'South Africa',
          countryCode: 'ZA',
          currency: 'ZAR',
          currencySymbol: 'R',
          exchangeRate: 1,
        },
        isLoading: false,
      });
    }
  },
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
  convertPrice: (zarAmount) => {
    const { geoData } = get();
    if (!geoData) return zarAmount;
    return Math.round(zarAmount * geoData.exchangeRate);
  },
  getCurrencySymbol: () => {
    const { geoData } = get();
    return geoData?.currencySymbol || 'R';
  },
}));

// Admin Store
interface AdminState {
  stats: {
    totalUsers: number;
    activeSubscribers: number;
    monthlyRevenue: number;
    totalRevenue: number;
    owingAmount: number;
    chatMessages: number;
    prayers: number;
    devotionals: number;
  };
  subscribers: Array<{ id: string; name: string; email: string; status: 'active' | 'inactive'; plan: string }>;
  apiConfig: APIConfig;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
  fetchSubscribers: () => Promise<void>;
  updateAPIConfig: (config: Partial<APIConfig>) => void;
}

export const useAdminStore = create<AdminState>()((set) => ({
      stats: {
        totalUsers: 1240,
        activeSubscribers: 850,
        monthlyRevenue: 45000,
        totalRevenue: 280000,
        owingAmount: 1200,
        chatMessages: 15400,
        prayers: 3200,
        devotionals: 8500,
      },
      subscribers: [],
      apiConfig: {
        provider: 'payfast',
        environment: 'sandbox',
        callbackUrl: '',
      },
      isLoading: false,
      fetchStats: async () => {
        set({ isLoading: true });
        try {
          const data = await apiRequest<{ stats: AdminState['stats'] }>('/api/admin/stats');
          set({ stats: data.stats, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },
      fetchSubscribers: async () => {
        set({ isLoading: true });
        try {
          const data = await apiRequest<{ subscribers: AdminState['subscribers'] }>('/api/admin/subscribers');
          set({ subscribers: data.subscribers, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },
      updateAPIConfig: (config) => set((state) => ({
        apiConfig: { ...state.apiConfig, ...config }
      })),
    })
);

// Blog Store
interface BlogState {
  posts: BlogPost[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
}

export const useBlogStore = create<BlogState>()((set) => ({
  posts: [
    {
      id: '1',
      title: 'The Power of Prayer in the Digital Age',
      excerpt: 'How technology can enhance our spiritual connection.',
      content: 'Full content here...',
      author: 'FaithHaven Team',
      date: new Date(),
      category: 'Faith',
      tags: ['Prayer', 'Technology'],
    }
  ],
  isLoading: false,
  fetchPosts: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
}));

// Careers Store
interface CareersState {
  jobs: JobListing[];
  isLoading: boolean;
  fetchJobs: () => Promise<void>;
}

export const useCareersStore = create<CareersState>()((set) => ({
  jobs: [
    {
      id: '1',
      title: 'AI Ethics Researcher',
      department: 'Research',
      location: 'Remote',
      type: 'full-time',
      description: 'Ensuring our AI aligns with Christian values.',
      requirements: ['Theology degree', 'AI experience'],
      postedAt: new Date(),
    }
  ],
  isLoading: false,
  fetchJobs: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
}));

// FAQ Store
interface FAQState {
  items: FAQItem[];
  isLoading: boolean;
  fetchItems: () => Promise<void>;
}

export const useFAQStore = create<FAQState>()((set) => ({
  items: [
    {
      id: '1',
      question: 'Is FaithHaven AI free?',
      answer: 'Yes, we have a free tier for individuals.',
      category: 'General',
    }
  ],
  isLoading: false,
  fetchItems: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
}));

// Press Store
interface PressState {
  releases: PressRelease[];
  isLoading: boolean;
  fetchReleases: () => Promise<void>;
}

export const usePressStore = create<PressState>()((set) => ({
  releases: [
    {
      id: '1',
      title: 'FaithHaven AI Launches Globally',
      date: new Date(),
      excerpt: 'A new era of spiritual growth begins.',
      content: 'Full press release content...',
    }
  ],
  isLoading: false,
  fetchReleases: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
}));

// Prayer Wall Store
interface PrayerWallState {
  prayers: PrayerWallItem[];
  isLoading: boolean;
  fetchWallItems: () => Promise<void>;
  addPrayer: (prayer: Omit<PrayerWallItem, 'id' | 'prayerCount' | 'createdAt'>) => Promise<void>;
  prayFor: (id: string) => Promise<void>;
}

export const usePrayerWallStore = create<PrayerWallState>()((set) => ({
  prayers: [],
  isLoading: false,
  fetchWallItems: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ prayers: Array<Omit<PrayerWallItem, 'createdAt'> & { createdAt: string }> }>('/api/content/prayer-wall');
      set({
        prayers: data.prayers.map((p) => ({ ...p, createdAt: new Date(p.createdAt) })),
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
  addPrayer: async (prayer) => {
    try {
      const data = await apiRequest<{ prayer: Omit<PrayerWallItem, 'createdAt'> & { createdAt: string } }>('/api/content/prayer-wall', {
        method: 'POST',
        body: JSON.stringify({ content: prayer.content, isAnonymous: prayer.isAnonymous }),
      });
      set((state) => ({
        prayers: [{ ...data.prayer, createdAt: new Date(data.prayer.createdAt) }, ...state.prayers],
      }));
    } catch {
      // noop
    }
  },
  prayFor: async (id) => {
    try {
      const data = await apiRequest<{ prayer: Omit<PrayerWallItem, 'createdAt'> & { createdAt: string } }>(`/api/content/prayer-wall/${id}/pray`, {
        method: 'POST',
      });
      set((state) => ({
        prayers: state.prayers.map((p) => (p.id === id ? { ...data.prayer, createdAt: new Date(data.prayer.createdAt) } : p)),
      }));
    } catch {
      // noop
    }
  }
}));

// Calendar Store
interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
}

export const useCalendarStore = create<CalendarState>()((set) => ({
  events: [],
  isLoading: false,
  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ events: Array<Omit<CalendarEvent, 'date'> & { date: string }> }>('/api/content/calendar');
      set({
        events: data.events.map((e) => ({ ...e, date: new Date(e.date) })),
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
  addEvent: async (event) => {
    try {
      const data = await apiRequest<{ event: Omit<CalendarEvent, 'date'> & { date: string } }>('/api/content/calendar', {
        method: 'POST',
        body: JSON.stringify({ ...event, date: event.date.toISOString() }),
      });
      set((state) => ({
        events: [...state.events, { ...data.event, date: new Date(data.event.date) }],
      }));
    } catch {
      // noop
    }
  },
}));

// Devotional Store
interface DevotionalState {
  devotionals: Devotional[];
  isLoading: boolean;
  fetchDevotionals: () => Promise<void>;
  getTodaysDevotional: () => Devotional | undefined;
}

export const useDevotionalStore = create<DevotionalState>()((set, get) => ({
  devotionals: [],
  isLoading: false,
  fetchDevotionals: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ devotionals: Array<Omit<Devotional, 'date'> & { date: string }> }>('/api/content/devotionals');
      set({
        devotionals: data.devotionals.map((d) => ({ ...d, date: new Date(d.date) })),
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },
  getTodaysDevotional: () => {
    const { devotionals } = get();
    return devotionals[0];
  },
}));

// Worship Store
interface WorshipState {
  songs: WorshipSong[];
  playlists: Array<{ id: string; name: string; songs: number; color: string }>;
  isLoading: boolean;
  fetchSongs: () => Promise<void>;
}

export const useWorshipStore = create<WorshipState>()((set) => ({
  songs: [
    {
      id: '1',
      title: 'Amazing Grace',
      artist: 'Traditional',
      category: 'Hymn',
      duration: '3:45',
    }
  ],
  playlists: [],
  isLoading: false,
  fetchSongs: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ songs: WorshipSong[]; playlists: WorshipState['playlists'] }>('/api/content/worship');
      set({ songs: data.songs, playlists: data.playlists, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
