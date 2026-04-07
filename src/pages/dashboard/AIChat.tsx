import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  Loader2, 
  RotateCcw,
  Lock,
  Shield,
  X
} from 'lucide-react';
import { useChatStore, useAuthStore } from '@/store';
import { toast } from 'sonner';
import { apiRequest, getApiBaseUrl } from '@/lib/api';

const getAIResponse = async (message: string): Promise<{ content: string; sources?: string[] }> => {
  try {
    const response = await apiRequest<{ content: string; sources?: string[] }>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: message }),
    });
    return response;
  } catch {
    return {
      content: `I could not reach the AI backend at ${getApiBaseUrl()}. Please ensure the API is online and try again.`,
      sources: ['Local fallback'],
    };
  }
};

const quickPrompts = [
  { icon: BookOpen, label: 'Daily Verse', prompt: 'Share a Bible verse for today' },
  { icon: Sparkles, label: 'Prayer Help', prompt: 'Help me pray about something on my heart' },
  { icon: BookOpen, label: 'Faith Question', prompt: 'I have a question about my faith journey' },
];

export default function AIChat() {
  const { user } = useAuthStore();
  const { 
    messages, 
    isTyping, 
    addMessage, 
    setIsTyping, 
    clearChat,
    showAdminPrompt,
    setShowAdminPrompt,
    unlockAdmin,
    adminUnlocked,
  } = useChatStore();
  
  const [input, setInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');

    // Check for admin command
    if (userMessage.toLowerCase() === 'show admin') {
      addMessage({ role: 'user', content: userMessage });
      setShowAdminPrompt(true);
      return;
    }

    // Add user message
    addMessage({ role: 'user', content: userMessage });

    // Get AI response
    setIsTyping(true);
    const response = await getAIResponse(userMessage);
    addMessage({ 
      role: 'assistant', 
      content: response.content,
      sources: response.sources || ['FaithHaven API'],
    });
    setIsTyping(false);
  };

  const handlePasswordSubmit = () => {
    const success = unlockAdmin(passwordInput);
    if (success) {
      toast.success('Admin panel unlocked!');
      setPasswordInput('');
    } else {
      toast.error('Admin unlock is server-controlled in production.');
      setPasswordInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AI Faith Mentor</h1>
          <p className="text-slate-500">Your personal guide for spiritual growth</p>
        </div>
        <div className="flex items-center gap-3">
          {adminUnlocked && (
            <Badge className="bg-[hsl(48,90%,55%)]/20 text-[hsl(48,80%,45%)] border-[hsl(48,90%,55%)]/30">
              <Shield className="w-3 h-3 mr-1" />
              Admin Active
            </Badge>
          )}
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-[hsl(210,70%,50%)] hover:bg-[hsl(210,80%,95%)] rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Chat
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-[hsl(48,30%,88%)] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className={`w-10 h-10 flex-shrink-0 ${
                  message.role === 'assistant' 
                    ? 'bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' 
                    : 'bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]'
                }`}>
                  <AvatarFallback className="text-white text-sm">
                    {message.role === 'assistant' ? 'AI' : user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>

                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-left ${
                      message.role === 'user'
                        ? 'bg-[hsl(210,70%,60%)] text-white'
                        : 'bg-[hsl(48,60%,96%)] text-slate-700'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                    
                    {/* Sources */}
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap gap-2">
                        {message.sources.map((source, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-xs bg-white/50"
                          >
                            <BookOpen className="w-3 h-3 mr-1" />
                            {source}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]">
                  <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                </Avatar>
                <div className="bg-[hsl(48,60%,96%)] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[hsl(210,70%,60%)]" />
                    <span className="text-sm text-slate-500">FaithHaven is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Prompts */}
        {messages.length < 3 && (
          <div className="px-4 py-3 border-t border-[hsl(48,30%,88%)]">
            <p className="text-xs text-slate-500 mb-2">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(prompt.prompt)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(48,60%,96%)] hover:bg-[hsl(210,80%,95%)] text-sm text-slate-600 hover:text-[hsl(210,70%,50%)] transition-colors"
                >
                  <prompt.icon className="w-4 h-4" />
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-[hsl(48,30%,88%)] bg-white">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about faith, prayer, Scripture, or anything on your heart..."
              className="flex-1 h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="h-12 px-6 bg-[hsl(210,70%,60%)] text-white rounded-xl hover:bg-[hsl(210,60%,50%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">
            Type "show admin" to access admin panel (password required)
          </p>
        </div>
      </div>

      {/* Admin Password Dialog */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[hsl(48,80%,45%)]" />
                <h3 className="text-lg font-bold text-slate-800">Admin Access</h3>
              </div>
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-600 mb-4">
              Enter the admin password to unlock the admin panel.
            </p>
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="flex-1 h-12 border border-[hsl(48,30%,88%)] text-slate-700 rounded-xl font-medium hover:bg-[hsl(48,60%,96%)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 h-12 bg-[hsl(48,90%,55%)] text-slate-800 rounded-xl font-medium hover:bg-[hsl(48,90%,50%)] transition-colors"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
