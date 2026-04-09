import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageCircle, BookOpen, Video, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const helpCategories = [
  { icon: BookOpen, title: 'Getting Started', description: 'Learn the basics of FaithHaven AI' },
  { icon: MessageCircle, title: 'Account & Billing', description: 'Manage your subscription and account' },
  { icon: Video, title: 'Tutorials', description: 'Video guides for all features' },
];

const faqItems = [
  { id: '1', question: 'Is FaithHaven AI free?', answer: 'Yes, we have a free tier. Paid plans start at R19/month for individuals.', category: 'Getting Started' },
  { id: '2', question: 'How do I cancel my subscription?', answer: 'Go to Settings → Security and manage your subscription from there.', category: 'Account & Billing' },
  { id: '3', question: 'Which denominations are supported?', answer: 'We support Catholic, Orthodox, Anglican, Lutheran, Methodist, Presbyterian, Baptist, Pentecostal, Charismatic, Reformed, and Non-denominational traditions.', category: 'Getting Started' },
  { id: '4', question: 'Is my data private?', answer: 'Yes, your prayer journals and conversations are private and encrypted.', category: 'Account & Billing' },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            How Can We{' '}
            <span className="text-gradient">Help?</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to common questions and learn how to make the most of FaithHaven AI.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-[hsl(48,30%,88%)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  selectedCategory === category.title
                    ? 'border-[hsl(210,70%,60%)] bg-[hsl(210,80%,95%)]'
                    : 'border-[hsl(48,30%,88%)] bg-white hover:border-[hsl(210,70%,60%)]/50'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{category.title}</h3>
                <p className="text-slate-600 text-sm">{category.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-[hsl(48,30%,88%)] overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-[hsl(48,60%,98%)] transition-colors"
                >
                  <span className="font-medium text-slate-800 pr-4">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-[hsl(48,30%,88%)] pt-4">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">No results found</h3>
              <p className="text-slate-600">Try a different search term or browse all categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] rounded-3xl p-12 text-white">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-white/90 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[hsl(210,70%,50%)] rounded-xl font-semibold hover:bg-[hsl(48,90%,92%)] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
