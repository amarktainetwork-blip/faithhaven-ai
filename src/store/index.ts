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

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, denomination: Denomination) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, _password) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser: User = {
          id: '1',
          email,
          name: 'Faith Traveler',
          denomination: 'nondenominational',
          language: 'en',
          role: email.includes('admin') ? 'admin' : 'user',
          subscriptionPlan: 'individual',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
        return true;
      },
      register: async (email, _password, name, denomination) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockUser: User = {
          id: '1',
          email,
          name,
          denomination,
          language: 'en',
          role: 'user',
          subscriptionPlan: 'free',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
        return true;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates, updatedAt: new Date() } });
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
  adminPassword: string;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setIsTyping: (isTyping: boolean) => void;
  setShowAdminPrompt: (show: boolean) => void;
  unlockAdmin: (password: string) => boolean;
  lockAdmin: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
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
      adminPassword: 'FaithHavenAdmin2026!', 
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
      unlockAdmin: (password) => {
        if (password === get().adminPassword) {
          set({ adminUnlocked: true, showAdminPrompt: false });
          return true;
        }
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
    } catch (error) {
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
  subscribers: any[];
  apiConfig: APIConfig;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
  fetchSubscribers: () => Promise<void>;
  updateAPIConfig: (config: Partial<APIConfig>) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
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
        openaiApiKey: '',
        elevenLabsApiKey: '',
        supabaseUrl: '',
        supabaseAnonKey: '',
        payfastMerchantId: '',
        payfastMerchantKey: '',
        stripePublishableKey: '',
        stripeSecretKey: '',
      },
      isLoading: false,
      fetchStats: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ isLoading: false });
      },
      fetchSubscribers: async () => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ isLoading: false });
      },
      updateAPIConfig: (config) => set((state) => ({
        apiConfig: { ...state.apiConfig, ...config }
      })),
    }),
    {
      name: 'admin-storage',
    }
  )
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
      category: 'Spiritual Growth',
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
  addPrayer: (prayer: Omit<PrayerWallItem, 'id' | 'prayerCount' | 'createdAt'>) => void;
  prayFor: (id: string) => void;
}

export const usePrayerWallStore = create<PrayerWallState>()((set) => ({
  prayers: [
    {
      id: '1',
      userId: '1',
      userName: 'Faith Traveler',
      content: 'Praying for all our users today.',
      prayerCount: 5,
      isAnonymous: false,
      createdAt: new Date(),
    }
  ],
  isLoading: false,
  fetchWallItems: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
  addPrayer: (prayer) => set((state) => ({
    prayers: [{
      ...prayer,
      id: Date.now().toString(),
      prayerCount: 0,
      createdAt: new Date()
    }, ...state.prayers]
  })),
  prayFor: (id) => set((state) => ({
    prayers: state.prayers.map(p => p.id === id ? { ...p, prayerCount: p.prayerCount + 1 } : p)
  }))
}));

// Calendar Store
interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
}

export const useCalendarStore = create<CalendarState>()((set) => ({
  events: [
    {
      id: '1',
      title: 'Easter Sunday',
      date: new Date('2026-04-05'),
      type: 'feast',
      description: 'Celebrating the resurrection of Jesus Christ.',
    }
  ],
  isLoading: false,
  fetchEvents: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
  addEvent: (event) => set((state) => ({
    events: [...state.events, { ...event, id: Date.now().toString() }]
  })),
}));

// Devotional Store
interface DevotionalState {
  devotionals: Devotional[];
  isLoading: boolean;
  fetchDevotionals: () => Promise<void>;
  getTodaysDevotional: () => Devotional | undefined;
}

export const useDevotionalStore = create<DevotionalState>()((set, get) => ({
  devotionals: [
    {
      id: '1',
      title: 'Walking in Faith',
      verse: 'Hebrews 11:1',
      scripture: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
      reflection: 'Faith is the foundation of our spiritual life.',
      prayer: 'Lord, strengthen my faith today.',
      date: new Date(),
    }
  ],
  isLoading: false,
  fetchDevotionals: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
  getTodaysDevotional: () => {
    const { devotionals } = get();
    return devotionals[0]; // Simple mock for now
  },
}));

// Worship Store
interface WorshipState {
  songs: WorshipSong[];
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
    }
  ],
  isLoading: false,
  fetchSongs: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ isLoading: false });
  },
}));
