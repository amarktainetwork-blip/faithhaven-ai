import { Link } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Terms of <span className="text-gradient">Service</span>
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
                Please read these Terms of Service carefully before using the FaithHaven AI platform. 
                By accessing or using our service, you agree to be bound by these terms. If you disagree 
                with any part of the terms, you may not access the service.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Acceptance of Terms
            </h2>
            <p className="text-slate-700">
              By creating an account and using FaithHaven AI, you represent that you are at least 13 years old 
              and have the legal capacity to enter into these terms. If you are using the service on behalf 
              of an organization, you represent that you have authority to bind that organization to these terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Scale className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Use of Service
            </h2>
            <p className="text-slate-700">
              FaithHaven AI grants you a limited, non-exclusive, non-transferable license to use our platform 
              for personal, non-commercial purposes. You agree to:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Use the service in compliance with all applicable laws</li>
              <li>Not use the service for any illegal or unauthorized purpose</li>
              <li>Not attempt to disrupt or interfere with the service</li>
              <li>Not scrape, crawl, or otherwise access the service programmatically</li>
              <li>Respect the intellectual property rights of FaithHaven AI and others</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <AlertTriangle className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Account Responsibilities
            </h2>
            <p className="text-slate-700">
              You are responsible for:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your account information is accurate and up-to-date</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <XCircle className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Prohibited Activities
            </h2>
            <p className="text-slate-700">
              You may not:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Use the service to harass, abuse, or harm others</li>
              <li>Upload or transmit viruses, malware, or other harmful code</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Use the service to send unsolicited communications (spam)</li>
              <li>Impersonate any person or entity</li>
              <li>Share content that is illegal, harmful, or offensive</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Scale className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Subscription and Payments
            </h2>
            <p className="text-slate-700">
              Some features of FaithHaven AI require a paid subscription. By subscribing:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>You agree to pay all fees associated with your subscription plan</li>
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>You may cancel your subscription at any time</li>
              <li>Refunds are provided in accordance with our refund policy</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <FileText className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Termination
            </h2>
            <p className="text-slate-700">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms. 
              Upon termination, your right to use the service will immediately cease.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Scale className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Limitation of Liability
            </h2>
            <p className="text-slate-700">
              In no event shall FaithHaven AI, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses, resulting from your access to or use of or inability to access or use 
              the service.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <FileText className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Changes to Terms
            </h2>
            <p className="text-slate-700">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days' notice prior to any 
              new terms taking effect. What constitutes a material change will be determined at our sole 
              discretion.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <CheckCircle className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Contact Us
            </h2>
            <p className="text-slate-700">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-slate-700">
              <a href="mailto:legal@faithhaven.ai" className="text-[hsl(210,70%,50%)] hover:underline">
                legal@faithhaven.ai
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
