import { 
  Sparkles, 
  BookOpen, 
  PenTool, 
  Heart, 
  Calendar, 
  Users, 
  Music, 
  Baby,
  ScrollText
} from 'lucide-react';

const features = [
  {
    title: 'AI Faith Mentor',
    description: '24/7 biblical guidance and spiritual support tailored to your journey.',
    icon: Sparkles,
    color: 'hsl(210, 70%, 60%)',
  },
  {
    title: 'Liturgy Builder',
    description: 'Create meaningful worship services with AI-assisted liturgy planning.',
    icon: ScrollText,
    color: 'hsl(260, 50%, 65%)',
  },
  {
    title: 'Sermon Creator',
    description: 'Structure and refine your sermons with deep biblical insights.',
    icon: PenTool,
    color: 'hsl(35, 80%, 60%)',
  },
  {
    title: 'Daily Devotionals',
    description: 'Personalized daily readings to keep you grounded in the Word.',
    icon: BookOpen,
    color: 'hsl(150, 30%, 55%)',
  },
  {
    title: 'Prayer Journal',
    description: 'Track your prayer life and witness God\'s faithfulness over time.',
    icon: Heart,
    color: 'hsl(340, 60%, 65%)',
  },
  {
    title: 'Faith Calendar',
    description: 'Stay connected with church events and liturgical seasons.',
    icon: Calendar,
    color: 'hsl(200, 60%, 60%)',
  },
  {
    title: 'Little Lambs',
    description: 'Engaging, age-appropriate faith content for your children.',
    icon: Baby,
    color: 'hsl(48, 90%, 65%)',
  },
  {
    title: 'Youth Hub',
    description: 'A safe space for teenagers to explore faith and community.',
    icon: Users,
    color: 'hsl(180, 50%, 50%)',
  },
  {
    title: 'Worship Music',
    description: 'Curated playlists and resources for your personal worship time.',
    icon: Music,
    color: 'hsl(280, 50%, 60%)',
  },
];

const denominations = [
  'Anglican', 'Baptist', 'Catholic', 'Methodist', 'Pentecostal', 'Presbyterian', 'Nondenominational'
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[hsl(48,60%,98%)] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-[hsl(210,70%,50%)] tracking-wide uppercase mb-3">
            Comprehensive Tools
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Everything you need for a vibrant faith life
          </p>
          <p className="text-lg text-slate-600">
            FaithHaven AI combines ancient wisdom with modern technology to support 
            every aspect of your spiritual journey and church ministry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group p-8 rounded-2xl border border-slate-100 bg-white hover:border-[hsl(210,70%,60%)]/30 hover:shadow-xl hover:shadow-[hsl(210,70%,60%)]/5 transition-all duration-300"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Denomination Support */}
        <div className="mt-20 p-8 lg:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/images/bible-study.jpg" 
              alt="Bible Study" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Tailored to your tradition
              </h3>
              <p className="text-slate-300 text-lg mb-8">
                Our AI understands and respects the nuances of different Christian traditions, 
                providing guidance that aligns with your specific denominational beliefs.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {denominations.map((den) => (
                  <span 
                    key={den}
                    className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm"
                  >
                    {den}
                  </span>
                ))}
                <span className="px-4 py-2 rounded-full bg-[hsl(48,90%,65%)] text-slate-900 text-sm font-bold">
                  + Many More
                </span>
              </div>
            </div>
            <div className="w-full lg:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3">
              <img 
                src="/images/spiritual-growth.jpg" 
                alt="Spiritual Growth" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
