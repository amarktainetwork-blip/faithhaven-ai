import { Link } from 'react-router-dom';
import { Newspaper, Calendar, Download, ExternalLink, Users, Globe, TrendingUp, Mail } from 'lucide-react';
import { usePressStore } from '@/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const stats = [
  { label: 'Active Users', value: '10,000+', icon: Users },
  { label: 'Countries', value: '25+', icon: Globe },
  { label: 'Growth Rate', value: '150%', icon: TrendingUp },
];

export default function PressPage() {
  const { releases } = usePressStore();

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Newspaper className="w-4 h-4" />
            Press & Media
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            FaithHaven in the{' '}
            <span className="text-gradient">News</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Latest updates, press releases, and media resources about FaithHaven AI.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-slate-800 mb-2">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Press Releases
            </h2>
            <p className="text-lg text-slate-600">
              Official announcements and news from FaithHaven AI.
            </p>
          </div>

          <div className="space-y-6">
            {releases.map((release) => (
              <article
                key={release.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[hsl(48,30%,88%)] card-hover"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(release.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{release.title}</h3>
                <p className="text-slate-600 mb-6">{release.excerpt}</p>
                <button className="inline-flex items-center gap-2 text-[hsl(210,70%,50%)] font-medium hover:underline">
                  Read More
                  <ExternalLink className="w-4 h-4" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
                <p className="text-white/90 mb-6">
                  Download our official brand assets, logos, and press materials 
                  for use in articles and publications.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[hsl(210,70%,50%)] rounded-xl font-semibold hover:bg-[hsl(48,90%,92%)] transition-colors">
                  <Download className="w-5 h-5" />
                  Download Media Kit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1">Logo</p>
                  <p className="text-white/70 text-sm">PNG, SVG, EPS</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1">Colors</p>
                  <p className="text-white/70 text-sm">Brand Guidelines</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1">Photos</p>
                  <p className="text-white/70 text-sm">Team & Product</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold mb-1">Fact Sheet</p>
                  <p className="text-white/70 text-sm">Company Info</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Media Inquiries
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            For press inquiries, interview requests, or additional information, 
            please contact our communications team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:press@faithhaven.ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[hsl(210,70%,60%)] text-white rounded-xl font-semibold hover:bg-[hsl(210,60%,50%)] transition-colors"
            >
              <Mail className="w-5 h-5" />
              press@faithhaven.ai
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[hsl(210,70%,60%)] text-[hsl(210,70%,50%)] rounded-xl font-semibold hover:bg-[hsl(210,80%,95%)] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
