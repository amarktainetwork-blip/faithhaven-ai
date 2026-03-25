import { Link } from 'react-router-dom';
import { Shield, UserX, FileDown, Edit, Mail, Globe } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const rights = [
  {
    icon: FileDown,
    title: 'Right to Access',
    description: 'You have the right to request copies of your personal data that we hold.',
  },
  {
    icon: Edit,
    title: 'Right to Rectification',
    description: 'You have the right to request that we correct any information you believe is inaccurate.',
  },
  {
    icon: UserX,
    title: 'Right to Erasure',
    description: 'You have the right to request that we erase your personal data, under certain conditions.',
  },
  {
    icon: Shield,
    title: 'Right to Restrict Processing',
    description: 'You have the right to request that we restrict the processing of your personal data.',
  },
  {
    icon: FileDown,
    title: 'Right to Data Portability',
    description: 'You have the right to request that we transfer your data to another organization.',
  },
  {
    icon: Shield,
    title: 'Right to Object',
    description: 'You have the right to object to our processing of your personal data.',
  },
];

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            GDPR <span className="text-gradient">Compliance</span>
          </h1>
          <p className="text-xl text-slate-600">
            Your data protection rights under the EU General Data Protection Regulation
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[hsl(48,60%,98%)] rounded-2xl p-8 mb-12">
              <p className="text-slate-700 leading-relaxed m-0">
                FaithHaven AI is committed to protecting your personal data and respecting your privacy rights 
                in accordance with the EU General Data Protection Regulation (GDPR). This page explains 
                your rights and how you can exercise them.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              What is GDPR?
            </h2>
            <p className="text-slate-700">
              The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection 
              and privacy for all individuals within the European Union. It also addresses the export of 
              personal data outside the EU. The GDPR aims primarily to give control to citizens and residents 
              over their personal data and to simplify the regulatory environment for international business.
            </p>
          </div>

          {/* Rights Grid */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Your GDPR Rights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rights.map((right) => (
                <div key={right.title} className="bg-[hsl(48,60%,98%)] rounded-2xl p-6 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(48,90%,65%)] flex items-center justify-center mb-4">
                    <right.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{right.title}</h3>
                  <p className="text-slate-600">{right.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="prose prose-lg max-w-none mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <Shield className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              How to Exercise Your Rights
            </h2>
            <p className="text-slate-700">
              To exercise any of your GDPR rights, please contact us using the information below. 
              We will respond to your request within 30 days. Please include:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Your full name and email address associated with your account</li>
              <li>Which right you wish to exercise</li>
              <li>Any specific details about your request</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Shield className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Data Controller Information
            </h2>
            <div className="bg-[hsl(48,60%,98%)] rounded-2xl p-6">
              <p className="text-slate-700 m-0">
                <strong>Data Controller:</strong> FaithHaven AI<br />
                <strong>Address:</strong> 123 Faith Street, Cape Town, 8001, South Africa<br />
                <strong>Email:</strong>{' '}
                <a href="mailto:dpo@faithhaven.ai" className="text-[hsl(210,70%,50%)] hover:underline">
                  dpo@faithhaven.ai
                </a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Shield className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Right to Complain
            </h2>
            <p className="text-slate-700">
              If you are not satisfied with our response to your request, you have the right to 
              lodge a complaint with a supervisory authority. In the EU, this would be the data 
              protection authority in your country of residence or place of work.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Mail className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Contact Our Data Protection Officer
            </h2>
            <p className="text-slate-700">
              For any questions or concerns about your data privacy rights, please contact our 
              Data Protection Officer:
            </p>
            <p className="text-slate-700">
              <a href="mailto:dpo@faithhaven.ai" className="text-[hsl(210,70%,50%)] hover:underline">
                dpo@faithhaven.ai
              </a>
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t border-[hsl(48,30%,88%)]">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy" className="text-[hsl(210,70%,50%)] hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[hsl(210,70%,50%)] hover:underline">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-[hsl(210,70%,50%)] hover:underline">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
