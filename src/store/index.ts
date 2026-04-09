import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  User,
  ChatMessage,
  PrayerRequest,
  Denomination,
  Language,
  SubscriptionPlan,
  BillingCycle,
  CalendarEvent,
  PrayerWallItem,
  Devotional,
  WorshipSong,
} from '@/types';
import { apiRequest } from '@/lib/api';

/* ─── Auth Store ─── */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, denomination: Denomination) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  fetchCurrentUser: () => Promise<void>;
}

type UserDTO = Omit<User, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string };
const parseUser = (u: UserDTO): User => ({ ...u, createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt) });

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const data = await apiRequest<{ user: UserDTO }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });
          set({ user: parseUser(data.user), isAuthenticated: true, isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      register: async (email, password, name, denomination) => {
        set({ isLoading: true });
        try {
          const data = await apiRequest<{ user: UserDTO }>('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, denomination }),
          });
          set({ user: parseUser(data.user), isAuthenticated: true, isLoading: false });
          return true;
        } catch {
          set({ isLoading: false });
          return false;
        }
      },
      logout: async () => {
        try { await apiRequest('/api/auth/logout', { method: 'POST' }); } catch { /* best effort */ }
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: async (updates) => {
        try {
          const data = await apiRequest<{ user: UserDTO }>('/api/user/profile', {
            method: 'PUT',
            body: JSON.stringify(updates),
          });
          set({ user: parseUser(data.user) });
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
      fetchCurrentUser: async () => {
        try {
          const data = await apiRequest<{ user: UserDTO }>('/api/auth/me');
          set({ user: parseUser(data.user), isAuthenticated: true });
        } catch {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

/* ─── Chat Store ─── */
interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  setIsTyping: (isTyping: boolean) => void;
}

const WELCOME_MSG: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Welcome to FaithHaven AI. I am here to support your spiritual journey with biblical wisdom and prayerful guidance. How can I serve you today?',
  timestamp: new Date(),
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [WELCOME_MSG],
      isTyping: false,
      addMessage: (message) => {
        const newMessage: ChatMessage = { ...message, id: Date.now().toString(), timestamp: new Date() };
        set((state) => ({ messages: [...state.messages, newMessage] }));
      },
      clearChat: () => set({ messages: [WELCOME_MSG] }),
      setIsTyping: (isTyping) => set({ isTyping }),
    }),
    { name: 'chat-storage' }
  )
);

/* ─── Prayer Journal Store ─── */
interface PrayerState {
  prayers: PrayerRequest[];
  addPrayer: (prayer: Omit<PrayerRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deletePrayer: (id: string) => void;
  markAnswered: (id: string) => void;
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set) => ({
      prayers: [],
      addPrayer: (prayer) => {
        set((state) => ({
          prayers: [...state.prayers, { ...prayer, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() }],
        }));
      },
      deletePrayer: (id) => set((state) => ({ prayers: state.prayers.filter((p) => p.id !== id) })),
      markAnswered: (id) => set((state) => ({
        prayers: state.prayers.map((p) =>
          p.id === id ? { ...p, isAnswered: true, answeredDate: new Date(), updatedAt: new Date() } : p
        ),
      })),
    }),
    { name: 'prayer-storage' }
  )
);

/* ─── UI Store ─── */
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
    { name: 'ui-storage' }
  )
);

/* ─── Pricing Store ─── */
interface PricingState {
  selectedPlan: SubscriptionPlan;
  selectedPeriod: BillingCycle;
  setSelectedPlan: (plan: SubscriptionPlan) => void;
  setSelectedPeriod: (period: BillingCycle) => void;
}

export const usePricingStore = create<PricingState>()((set) => ({
  selectedPlan: 'individual',
  selectedPeriod: 'monthly',
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
}));

/* ─── Admin Store ─── */
interface AdminStats {
  totalUsers: number;
  activeSubscribers: number;
  monthlyRevenue: number;
  totalRevenue: number;
  owingAmount: number;
  chatMessages: number;
  prayers: number;
  devotionals: number;
}

interface AdminState {
  stats: AdminStats;
  subscribers: Array<{ id: string; name: string; email: string; status: 'active' | 'inactive'; plan: string }>;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
  fetchSubscribers: () => Promise<void>;
}

export const useAdminStore = create<AdminState>()((set) => ({
  stats: { totalUsers: 0, activeSubscribers: 0, monthlyRevenue: 0, totalRevenue: 0, owingAmount: 0, chatMessages: 0, prayers: 0, devotionals: 0 },
  subscribers: [],
  isLoading: false,
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ stats: AdminStats }>('/api/admin/stats');
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
}));

/* ─── Prayer Wall Store ─── */
interface PrayerWallState {
  prayers: PrayerWallItem[];
  isLoading: boolean;
  fetchWallItems: () => Promise<void>;
  addPrayer: (prayer: Omit<PrayerWallItem, 'id' | 'prayerCount' | 'createdAt'>) => Promise<void>;
  prayFor: (id: string) => Promise<void>;
}

type PrayerWallDTO = Omit<PrayerWallItem, 'createdAt'> & { createdAt: string };

export const usePrayerWallStore = create<PrayerWallState>()((set) => ({
  prayers: [],
  isLoading: false,
  fetchWallItems: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ prayers: PrayerWallDTO[] }>('/api/content/prayer-wall');
      set({ prayers: data.prayers.map((p) => ({ ...p, createdAt: new Date(p.createdAt) })), isLoading: false });
    } catch { set({ isLoading: false }); }
  },
  addPrayer: async (prayer) => {
    try {
      const data = await apiRequest<{ prayer: PrayerWallDTO }>('/api/content/prayer-wall', {
        method: 'POST',
        body: JSON.stringify({ content: prayer.content, isAnonymous: prayer.isAnonymous }),
      });
      set((state) => ({ prayers: [{ ...data.prayer, createdAt: new Date(data.prayer.createdAt) }, ...state.prayers] }));
    } catch { /* noop */ }
  },
  prayFor: async (id) => {
    try {
      const data = await apiRequest<{ prayer: PrayerWallDTO }>(`/api/content/prayer-wall/${id}/pray`, { method: 'POST' });
      set((state) => ({ prayers: state.prayers.map((p) => (p.id === id ? { ...data.prayer, createdAt: new Date(data.prayer.createdAt) } : p)) }));
    } catch { /* noop */ }
  },
}));

/* ─── Calendar Store ─── */
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
      set({ events: data.events.map((e) => ({ ...e, date: new Date(e.date) })), isLoading: false });
    } catch { set({ isLoading: false }); }
  },
  addEvent: async (event) => {
    try {
      const data = await apiRequest<{ event: Omit<CalendarEvent, 'date'> & { date: string } }>('/api/content/calendar', {
        method: 'POST',
        body: JSON.stringify({ ...event, date: event.date.toISOString() }),
      });
      set((state) => ({ events: [...state.events, { ...data.event, date: new Date(data.event.date) }] }));
    } catch { /* noop */ }
  },
}));

/* ─── Devotional Store ─── */
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
      set({ devotionals: data.devotionals.map((d) => ({ ...d, date: new Date(d.date) })), isLoading: false });
    } catch { set({ isLoading: false }); }
  },
  getTodaysDevotional: () => get().devotionals[0],
}));

/* ─── Worship Store ─── */
interface WorshipState {
  songs: WorshipSong[];
  playlists: Array<{ id: string; name: string; songs: number; color: string }>;
  isLoading: boolean;
  fetchSongs: () => Promise<void>;
}

export const useWorshipStore = create<WorshipState>()((set) => ({
  songs: [],
  playlists: [],
  isLoading: false,
  fetchSongs: async () => {
    set({ isLoading: true });
    try {
      const data = await apiRequest<{ songs: WorshipSong[]; playlists: WorshipState['playlists'] }>('/api/content/worship');
      set({ songs: data.songs, playlists: data.playlists, isLoading: false });
    } catch { set({ isLoading: false }); }
  },
}));
