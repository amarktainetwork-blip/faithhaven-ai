import { Link } from 'react-router-dom';
import { Users, Heart, MessageCircle, Globe, Calendar, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const features = [
  {
    icon: MessageCircle,
    title: 'Prayer Wall',
    description: 'Share prayer requests and pray for others in our global community.',
    link: '/dashboard/prayer-wall',
  },
  {
    icon: Users,
    title: 'Discussion Groups',
    description: 'Join conversations about faith, Scripture, and Christian living.',
    link: '#',
  },
  {
    icon: Calendar,
    title: 'Virtual Events',
    description: 'Participate in online Bible studies, worship nights, and more.',
    link: '#',
  },
  {
    icon: Heart,
    title: 'Support Network',
    description: 'Connect with believers who can encourage and support you.',
    link: '#',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Johannesburg, SA',
    content: 'The FaithHaven community has been such a blessing. I\'ve found prayer partners and friends who truly understand my faith journey.',
  },
  {
    name: 'David K.',
    location: 'London, UK',
    content: 'Being part of this community has strengthened my faith in ways I never expected. The support here is incredible.',
  },
  {
    name: 'Grace T.',
    location: 'Sydney, AU',
    content: 'I was looking for a Christian community online and found FaithHaven. It\'s been a game-changer for my spiritual life.',
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Join the Family
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            A Global Community of{' '}
            <span className="text-gradient">Believers</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Connect with Christians from around the world. Share prayers, encourage one another, 
            and grow together in faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-[hsl(210,70%,60%)] text-white rounded-xl font-semibold hover:bg-[hsl(210,60%,50%)] transition-colors"
            >
              Join the Community
            </Link>
            <Link
              to="/dashboard/prayer-wall"
              className="px-8 py-4 border-2 border-[hsl(210,70%,60%)] text-[hsl(210,70%,50%)] rounded-xl font-semibold hover:bg-[hsl(210,80%,95%)] transition-colors"
            >
              Visit Prayer Wall
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-[hsl(210,70%,50%)] mb-2">10K+</p>
              <p className="text-slate-600">Members</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[hsl(48,80%,45%)] mb-2">25+</p>
              <p className="text-slate-600">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[hsl(260,50%,55%)] mb-2">50K+</p>
              <p className="text-slate-600">Prayers Shared</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[hsl(150,30%,45%)] mb-2">12</p>
              <p className="text-slate-600">Denominations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Community Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to connect, grow, and thrive in your faith journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.link}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[hsl(48,30%,88%)] card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-slate-600">
              Real stories from real members of our global family.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-[hsl(48,60%,98%)] rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[hsl(48,90%,55%)] fill-[hsl(48,90%,55%)]" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)] rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Ready to Join?
            </h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Become part of a global community of believers supporting and encouraging one another.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-colors"
            >
              <Users className="w-5 h-5" />
              Join Free Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
