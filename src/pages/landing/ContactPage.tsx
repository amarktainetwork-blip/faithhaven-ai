import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with questions, feedback, or prayer requests.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(48,30%,88%)]">
                <div className="w-12 h-12 rounded-xl bg-[hsl(210,80%,95%)] flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[hsl(210,70%,50%)]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Email Us</h3>
                <p className="text-slate-600 mb-3">For general inquiries and support</p>
                <a href="mailto:hello@faithhaven.ai" className="text-[hsl(210,70%,50%)] font-medium hover:underline">
                  hello@faithhaven.ai
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(48,30%,88%)]">
                <div className="w-12 h-12 rounded-xl bg-[hsl(48,90%,92%)] flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[hsl(48,80%,45%)]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Call Us</h3>
                <p className="text-slate-600 mb-3">Mon-Fri, 9am-5pm SAST</p>
                <a href="tel:+27211234567" className="text-[hsl(210,70%,50%)] font-medium hover:underline">
                  +27 (0) 21 123 4567
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(48,30%,88%)]">
                <div className="w-12 h-12 rounded-xl bg-[hsl(260,50%,95%)] flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[hsl(260,50%,55%)]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Visit Us</h3>
                <p className="text-slate-600 mb-3">Our headquarters</p>
                <p className="text-slate-800 font-medium">
                  123 Faith Street<br />
                  Cape Town, 8001<br />
                  South Africa
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[hsl(48,30%,88%)]">
                <div className="w-12 h-12 rounded-xl bg-[hsl(150,30%,95%)] flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[hsl(150,30%,45%)]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Response Time</h3>
                <p className="text-slate-600">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[hsl(48,30%,88%)]">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[hsl(150,30%,95%)] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[hsl(150,30%,45%)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Message Sent!</h2>
                    <p className="text-slate-600 mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-6 py-3 bg-[hsl(210,70%,60%)] text-white rounded-xl font-medium hover:bg-[hsl(210,60%,50%)] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">Send us a Message</h2>
                        <p className="text-slate-500">Fill out the form below</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all bg-white"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="prayer">Prayer Request</option>
                          <option value="feedback">Feedback</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all resize-none"
                          placeholder="How can we help you today?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-[hsl(210,70%,60%)] text-white rounded-xl font-semibold hover:bg-[hsl(210,60%,50%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
