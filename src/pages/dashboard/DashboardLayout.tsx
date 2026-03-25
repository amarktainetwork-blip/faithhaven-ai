import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  BookOpen, 
  Heart, 
  Calendar, 
  Mic, 
  GraduationCap, 
  Baby, 
  Music, 
  Users, 
  Scroll,
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  Cross,
  Shield,
  Headphones
} from 'lucide-react';
import { useAuthStore, useUIStore, useChatStore } from '@/store';
import { toast } from 'sonner';

const mainNavItems = [
  { icon: MessageCircle, label: 'AI Faith Mentor', path: '/dashboard/chat' },
  { icon: Scroll, label: 'Liturgy Builder', path: '/dashboard/liturgy' },
  { icon: Mic, label: 'Sermon Creator', path: '/dashboard/sermon-creator' },
];

const personalNavItems = [
  { icon: BookOpen, label: 'Daily Devotional', path: '/dashboard/devotional' },
  { icon: Heart, label: 'Prayer Journal', path: '/dashboard/prayer-journal' },
  { icon: Calendar, label: 'Faith Calendar', path: '/dashboard/calendar' },
];

const familyNavItems = [
  { icon: Baby, label: 'Little Lambs', path: '/dashboard/little-lambs' },
  { icon: Home, label: 'Family Devotionals', path: '/dashboard/family-devotionals' },
  { icon: GraduationCap, label: 'Youth Hub', path: '/dashboard/youth-hub' },
];

const communityNavItems = [
  { icon: Users, label: 'Prayer Wall', path: '/dashboard/prayer-wall' },
  { icon: Music, label: 'Worship Music', path: '/dashboard/worship-music' },
  { icon: Headphones, label: 'Bible Audio', path: '/dashboard/bible-audio' },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { adminUnlocked } = useChatStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const NavSection = ({ title, items }: { title: string; items: typeof mainNavItems }) => (
    <div className="space-y-1">
      <h4 className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {title}
      </h4>
      {items.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive(item.path)
              ? 'bg-[hsl(210,70%,60%)] text-white'
              : 'text-slate-600 hover:bg-[hsl(210,80%,95%)] hover:text-[hsl(210,70%,50%)]'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center flex-shrink-0">
            <Cross className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">FaithHaven</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4 px-3">
        <div className="space-y-6">
          <NavSection title="Main" items={mainNavItems} />
          <NavSection title="Personal" items={personalNavItems} />
          <NavSection title="Family" items={familyNavItems} />
          <NavSection title="Community" items={communityNavItems} />
          
          {/* Admin Panel (only if unlocked) */}
          {adminUnlocked && (
            <div className="space-y-1">
              <h4 className="px-4 py-2 text-xs font-semibold text-[hsl(48,80%,45%)] uppercase tracking-wider">
                Admin
              </h4>
              <Link
                to="/dashboard/admin"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive('/dashboard/admin')
                    ? 'bg-[hsl(48,90%,55%)] text-slate-800'
                    : 'text-[hsl(48,80%,45%)] hover:bg-[hsl(48,90%,92%)]'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Admin Panel</span>
              </Link>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* User Section */}
      <div className="p-4 border-t border-[hsl(48,30%,88%)] space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-1">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-[hsl(48,60%,96%)] transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-[hsl(48,60%,96%)] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-full bg-white border-r border-[hsl(48,30%,88%)] z-40 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-[hsl(48,30%,88%)] z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Toggle Sidebar Button (Desktop) */}
      <button
        onClick={toggleSidebar}
        className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 w-6 h-12 bg-white border border-[hsl(48,30%,88%)] rounded-r-lg items-center justify-center shadow-sm hover:bg-[hsl(48,60%,96%)] transition-colors"
        style={{ left: sidebarOpen ? '16rem' : '0' }}
      >
        <Menu className="w-4 h-4 text-slate-400" />
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-[hsl(48,30%,88%)] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center">
              <Cross className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">FaithHaven</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
