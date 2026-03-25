import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Heart, Users, Sparkles, Globe, Mail } from 'lucide-react';
import { useCareersStore } from '@/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const benefits = [
  {
    icon: Heart,
    title: 'Mission-Driven',
    description: 'Work that truly matters - helping people grow in their faith.',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Join a supportive community of believers passionate about technology.',
  },
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere in the world with flexible hours.',
  },
  {
    icon: Sparkles,
    title: 'Growth Opportunities',
    description: 'Continuous learning and career development support.',
  },
];

export default function CareersPage() {
  const { jobs } = useCareersStore();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const toggleJob = (id: string) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Join Our Team
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Build Technology that{' '}
            <span className="text-gradient">Matters</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join a team of passionate believers using technology to spread the Gospel 
            and strengthen the Church worldwide.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Why Work at FaithHaven?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We offer more than just a job - we offer a calling.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-[hsl(48,60%,98%)] rounded-2xl p-8 text-center card-hover">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-slate-600">
              Find your perfect role and join our mission.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-sm border border-[hsl(48,30%,88%)] overflow-hidden"
              >
                <button
                  onClick={() => toggleJob(job.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-[hsl(48,60%,98%)] transition-colors"
                >
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  {expandedJob === job.id ? (
                    <ChevronUp className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  )}
                </button>

                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-[hsl(48,30%,88%)] pt-6">
                    <p className="text-slate-600 mb-6">{job.description}</p>
                    
                    <h4 className="font-semibold text-slate-800 mb-3">Requirements:</h4>
                    <ul className="space-y-2 mb-6">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(210,70%,60%)] mt-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                      <Link
                        to="/contact"
                        className="px-6 py-3 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No open positions at the moment.</p>
              <p className="text-slate-400 text-sm mt-2">
                Check back later or send us your resume for future opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Don't See the Right Fit?
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              We're always looking for talented believers to join our team. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
