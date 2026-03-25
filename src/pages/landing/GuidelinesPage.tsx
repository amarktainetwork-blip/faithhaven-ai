import { Link } from 'react-router-dom';
import { Shield, Heart, MessageCircle, BookOpen, Users, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const guidelines = [
  {
    icon: Heart,
    title: 'Love First',
    description: 'Treat everyone with kindness, respect, and love. Remember that behind every screen is a real person with real struggles.',
  },
  {
    icon: BookOpen,
    title: 'Stay Biblical',
    description: 'Base your discussions and advice on Scripture. Avoid promoting teachings that contradict the Bible.',
  },
  {
    icon: MessageCircle,
    title: 'Constructive Communication',
    description: 'Engage in healthy, constructive dialogue. Disagree respectfully and avoid personal attacks.',
  },
  {
    icon: Users,
    title: 'Inclusive Community',
    description: 'Welcome believers from all denominations. Avoid divisive arguments about non-essential doctrines.',
  },
];

const prohibited = [
  'Hate speech, discrimination, or harassment of any kind',
  'Spam, scams, or promotional content without permission',
  'Explicit, violent, or inappropriate content',
  'Personal attacks or bullying',
  'Spreading false information or conspiracy theories',
  'Promoting non-Christian religions or beliefs',
];

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Community Guidelines
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Building a Safe &{' '}
            <span className="text-gradient">Welcoming Space</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our community guidelines help ensure FaithHaven remains a place where everyone 
            can grow in faith, find support, and feel welcomed.
          </p>
        </div>
      </section>

      {/* Core Guidelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Our Core Guidelines
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These principles guide how we interact and build community together.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {guidelines.map((guideline) => (
              <div key={guideline.title} className="bg-[hsl(48,60%,98%)] rounded-2xl p-8 card-hover">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center mb-6">
                  <guideline.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{guideline.title}</h3>
                <p className="text-slate-600">{guideline.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[hsl(48,30%,88%)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[hsl(0,70%,95%)] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[hsl(0,70%,55%)]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Prohibited Content</h2>
                <p className="text-slate-500">The following is not allowed on FaithHaven</p>
              </div>
            </div>
            <ul className="space-y-4">
              {prohibited.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[hsl(0,70%,55%)] mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Enforcement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              How We Enforce Guidelines
            </h2>
            <p className="text-lg text-slate-600">
              Our approach to maintaining a healthy community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(210,80%,95%)] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[hsl(210,70%,50%)]">1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Warning</h3>
              <p className="text-slate-600 text-sm">First-time violations typically receive a warning and educational message.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(48,90%,92%)] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[hsl(48,80%,45%)]">2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Temporary Ban</h3>
              <p className="text-slate-600 text-sm">Repeated violations may result in a temporary suspension.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(0,70%,95%)] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[hsl(0,70%,55%)]">3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Permanent Ban</h3>
              <p className="text-slate-600 text-sm">Severe or repeated violations may result in permanent account termination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,55%)] rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              See Something Concerning?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              If you encounter content that violates our guidelines, please report it. 
              Our team reviews all reports within 24 hours.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[hsl(210,70%,50%)] rounded-xl font-semibold hover:bg-[hsl(48,90%,92%)] transition-colors"
            >
              <Shield className="w-5 h-5" />
              Report an Issue
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
