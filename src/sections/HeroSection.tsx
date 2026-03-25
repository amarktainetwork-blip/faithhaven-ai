import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, BookOpen, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Spiritual Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(48,60%,98%)]/80 via-transparent to-[hsl(48,60%,98%)]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Spiritual Growth
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Your Personal{' '}
              <span className="text-gradient">AI Faith Mentor</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Deepen your Christian walk with AI-powered devotionals, prayer guidance, 
              and biblical wisdom tailored to your denomination and spiritual needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(210,70%,60%)] text-white rounded-xl font-semibold hover:bg-[hsl(210,60%,50%)] transition-colors shadow-lg shadow-[hsl(210,70%,60%)]/20"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[hsl(48,30%,88%)] text-slate-700 rounded-xl font-semibold hover:border-[hsl(210,70%,60%)] hover:text-[hsl(210,70%,50%)] transition-colors bg-white/50 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(150,30%,55%)]" />
                Free to start
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(150,30%,55%)]" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(150,30%,55%)]" />
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8">
              {/* Chat Interface Mock */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-[hsl(48,60%,96%)] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                    <p className="text-slate-700 text-sm">
                      Hello! I'm your FaithHaven AI mentor. How can I help you grow in your faith today?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">You</span>
                  </div>
                  <div className="bg-[hsl(210,70%,60%)] rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%] shadow-md">
                    <p className="text-white text-sm">
                      I'm struggling with anxiety. Can you help me find peace?
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-[hsl(48,60%,96%)] rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] shadow-sm">
                    <p className="text-slate-700 text-sm">
                      I understand. The Bible tells us in Philippians 4:6-7: "Do not be anxious about anything..."
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-200/50 flex gap-2">
                      <span className="px-2 py-1 bg-white rounded text-xs text-slate-500">Scripture</span>
                      <span className="px-2 py-1 bg-white rounded text-xs text-slate-500">Prayer</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Mock */}
              <div className="mt-6 pt-4 border-t border-[hsl(48,30%,88%)]">
                <div className="flex gap-3">
                  <div className="flex-1 h-12 bg-[hsl(48,60%,98%)] rounded-xl flex items-center px-4 border border-[hsl(48,30%,88%)]">
                    <span className="text-slate-400 text-sm">Type your message...</span>
                  </div>
                  <div className="w-12 h-12 bg-[hsl(210,70%,60%)] rounded-xl flex items-center justify-center shadow-lg shadow-[hsl(210,70%,60%)]/20">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-[hsl(48,30%,88%)] animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(150,30%,95%)] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[hsl(150,30%,45%)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">10,000+</p>
                  <p className="text-xs text-slate-500">Prayers Answered</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-[hsl(48,30%,88%)] animate-pulse-slow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[hsl(210,80%,95%)] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[hsl(210,70%,50%)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">AI-Powered</p>
                  <p className="text-xs text-slate-500">24/7 Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
