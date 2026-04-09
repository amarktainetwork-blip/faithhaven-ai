import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Sparkles, BookOpen, Loader2, RotateCcw } from 'lucide-react';
import { useChatStore, useAuthStore } from '@/store';
import { apiRequest, getApiBaseUrl } from '@/lib/api';
import { useI18n } from '@/i18n/I18nProvider';

const getAIResponse = async (message: string): Promise<{ content: string; sources?: string[] }> => {
  try {
    return await apiRequest<{ content: string; sources?: string[] }>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: message }),
    });
  } catch {
    return {
      content: `I could not reach the AI backend at ${getApiBaseUrl()}. Please ensure the API is online and try again.`,
      sources: ['Local fallback'],
    };
  }
};

export default function AIChat() {
  const { user } = useAuthStore();
  const { messages, isTyping, addMessage, setIsTyping, clearChat } = useChatStore();
  const { t } = useI18n();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setIsTyping(true);
    const response = await getAIResponse(userMessage);
    addMessage({ role: 'assistant', content: response.content, sources: response.sources || ['FaithHaven API'] });
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const quickPrompts = [
    { icon: BookOpen, label: t('chat.quickPrompt.dailyVerse'), prompt: 'Share a Bible verse for today' },
    { icon: Sparkles, label: t('chat.quickPrompt.prayerHelp'), prompt: 'Help me pray about something on my heart' },
    { icon: BookOpen, label: t('chat.quickPrompt.faithQuestion'), prompt: 'I have a question about my faith journey' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{t('chat.title')}</h1>
          <p className="text-slate-500">{t('chat.subtitle')}</p>
        </div>
        <button onClick={clearChat} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-[hsl(210,70%,50%)] hover:bg-[hsl(210,80%,95%)] rounded-lg transition-colors">
          <RotateCcw className="w-4 h-4" />{t('chat.newChat')}
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-[hsl(48,30%,88%)] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4" ref={scrollRef}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className={`w-10 h-10 flex-shrink-0 ${message.role === 'assistant' ? 'bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' : 'bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]'}`}>
                  <AvatarFallback className="text-white text-sm">{message.role === 'assistant' ? 'AI' : user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-left ${message.role === 'user' ? 'bg-[hsl(210,70%,60%)] text-white' : 'bg-[hsl(48,60%,96%)] text-slate-700'}`}>
                    <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap gap-2">
                        {message.sources.map((source, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-white/50">
                            <BookOpen className="w-3 h-3 mr-1" />{source}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]">
                  <AvatarFallback className="text-white text-sm">AI</AvatarFallback>
                </Avatar>
                <div className="bg-[hsl(48,60%,96%)] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[hsl(210,70%,60%)]" />
                    <span className="text-sm text-slate-500">{t('chat.thinking')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {messages.length < 3 && (
          <div className="px-4 py-3 border-t border-[hsl(48,30%,88%)]">
            <p className="text-xs text-slate-500 mb-2">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button key={idx} onClick={() => setInput(prompt.prompt)} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(48,60%,96%)] hover:bg-[hsl(210,80%,95%)] text-sm text-slate-600 hover:text-[hsl(210,70%,50%)] transition-colors">
                  <prompt.icon className="w-4 h-4" />{prompt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-[hsl(48,30%,88%)] bg-white">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} placeholder={t('chat.inputPlaceholder')} className="flex-1 h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all" disabled={isTyping} />
            <button onClick={handleSend} disabled={!input.trim() || isTyping} className="h-12 px-6 bg-[hsl(210,70%,60%)] text-white rounded-xl hover:bg-[hsl(210,60%,50%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
