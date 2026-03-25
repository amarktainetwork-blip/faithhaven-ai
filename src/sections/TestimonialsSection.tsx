import { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: 'Pastor Michael Johnson',
    role: 'Senior Pastor',
    denomination: 'Baptist',
    location: 'Atlanta, USA',
    content: 'FaithHaven AI has been a game-changer for our church. The sermon creator tool saves me hours of preparation time, and the liturgy builder helps us create meaningful worship experiences.',
    rating: 5,
  },
  {
    name: 'Sarah Williams',
    role: 'Youth Leader',
    denomination: 'Methodist',
    location: 'London, UK',
    content: 'The Youth Hub feature is incredible! My teenagers actually engage with the content, and the discussion guides make my job so much easier. Highly recommend for any youth ministry.',
    rating: 5,
  },
  {
    name: 'David and Maria Chen',
    role: 'Parents',
    denomination: 'Catholic',
    location: 'Sydney, Australia',
    content: 'Little Lambs has transformed our family devotional time. Our kids love the interactive stories, and we love that they\'re learning biblical values in an engaging way.',
    rating: 5,
  },
  {
    name: 'Rev. Thabo Mokoena',
    role: 'Congregation Leader',
    denomination: 'Anglican',
    location: 'Johannesburg, SA',
    content: 'The multi-language support is a blessing for our diverse congregation. Being able to access content in isiZulu has made FaithHaven accessible to so many more people.',
    rating: 5,
  },
  {
    name: 'Emily Patterson',
    role: 'Individual User',
    denomination: 'Non-denominational',
    location: 'Toronto, Canada',
    content: 'The AI Faith Mentor feels like having a spiritual director available 24/7. It\'s helped me through difficult times and deepened my prayer life in ways I never expected.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[hsl(48,60%,98%)]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Loved by Christians{' '}
            <span className="text-gradient">Worldwide</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how FaithHaven AI is helping believers grow in their faith across the globe.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="relative bg-white rounded-3xl shadow-lg border border-[hsl(48,30%,88%)] p-8 lg:p-12 mb-12">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-[hsl(210,70%,60%)]/10" />
          
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[hsl(48,90%,55%)] fill-[hsl(48,90%,55%)]" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">{testimonials[currentIndex].name}</p>
                  <p className="text-slate-500">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].denomination}
                  </p>
                  <p className="text-slate-400 text-sm">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex lg:flex-col items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-[hsl(48,60%,96%)] flex items-center justify-center hover:bg-[hsl(210,80%,95%)] transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-slate-600" />
              </button>
              <div className="flex lg:flex-col gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 lg:w-2 lg:h-8 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'bg-[hsl(210,70%,60%)]'
                        : 'bg-[hsl(48,30%,88%)] hover:bg-[hsl(210,70%,60%)]/50'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-[hsl(48,60%,96%)] flex items-center justify-center hover:bg-[hsl(210,80%,95%)] transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '25+', label: 'Countries' },
            { value: '12', label: 'Denominations' },
            { value: '4.9/5', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[hsl(48,30%,88%)]">
              <p className="text-3xl font-bold text-[hsl(210,70%,50%)] mb-1">{stat.value}</p>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
