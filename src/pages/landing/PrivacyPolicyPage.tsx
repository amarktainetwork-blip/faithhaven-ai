import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xl text-slate-600">
            Last updated: March 9, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="bg-[hsl(48,60%,98%)] rounded-2xl p-8 mb-12">
              <p className="text-slate-700 leading-relaxed m-0">
                At FaithHaven AI, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our service. Please read this 
                privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                please do not access the application.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <Database className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Information We Collect
            </h2>
            <p className="text-slate-700">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (denomination, language preference)</li>
              <li>Prayer journal entries and devotional notes</li>
              <li>Chat messages with our AI mentor</li>
              <li>Payment information (processed securely by our payment providers)</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Eye className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              How We Use Your Information
            </h2>
            <p className="text-slate-700">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and deliver content relevant to your denomination</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Lock className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Data Security
            </h2>
            <p className="text-slate-700">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. 
              This includes:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Strict access controls for our staff</li>
              <li>Secure data backup procedures</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Shield className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Your Rights
            </h2>
            <p className="text-slate-700">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to request deletion of your data</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Mail className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Contact Us
            </h2>
            <p className="text-slate-700">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-slate-700">
              <a href="mailto:privacy@faithhaven.ai" className="text-[hsl(210,70%,50%)] hover:underline">
                privacy@faithhaven.ai
              </a>
            </p>
          </div>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t border-[hsl(48,30%,88%)]">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Related Documents</h3>
            <div className="flex flex-wrap gap-4">
              <Link to="/terms" className="text-[hsl(210,70%,50%)] hover:underline">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-[hsl(210,70%,50%)] hover:underline">
                Cookie Policy
              </Link>
              <Link to="/gdpr" className="text-[hsl(210,70%,50%)] hover:underline">
                GDPR Compliance
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
