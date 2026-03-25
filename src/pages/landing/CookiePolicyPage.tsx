import { Link } from 'react-router-dom';
import { Cookie, Info, Settings, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cookieTypes = [
  {
    name: 'Essential Cookies',
    description: 'Required for the website to function properly. Cannot be disabled.',
    examples: ['Session cookies', 'Authentication cookies', 'Security cookies'],
  },
  {
    name: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
    examples: ['Language preferences', 'Theme settings', 'User preferences'],
  },
  {
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with our website.',
    examples: ['Google Analytics', 'Usage statistics', 'Performance metrics'],
  },
  {
    name: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements and track their performance.',
    examples: ['Ad targeting', 'Conversion tracking', 'Retargeting'],
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Cookie className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Cookie <span className="text-gradient">Policy</span>
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
                This Cookie Policy explains how FaithHaven AI uses cookies and similar technologies 
                to recognize you when you visit our website. It explains what these technologies are 
                and why we use them, as well as your rights to control our use of them.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <Info className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              What Are Cookies?
            </h2>
            <p className="text-slate-700">
              Cookies are small data files that are placed on your computer or mobile device when you visit 
              a website. Cookies are widely used by website owners to make their websites work, or to work 
              more efficiently, as well as to provide reporting information.
            </p>
            <p className="text-slate-700">
              Cookies set by the website owner (in this case, FaithHaven AI) are called "first-party cookies." 
              Cookies set by parties other than the website owner are called "third-party cookies." 
              Third-party cookies enable third-party features or functionality to be provided on or 
              through the website.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Settings className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Types of Cookies We Use
            </h2>
          </div>

          <div className="grid gap-6 mt-8">
            {cookieTypes.map((type) => (
              <div key={type.name} className="bg-[hsl(48,60%,98%)] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{type.name}</h3>
                <p className="text-slate-600 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example) => (
                    <span key={example} className="px-3 py-1 rounded-full bg-white text-slate-600 text-sm">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-lg max-w-none mt-12">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              How to Control Cookies
            </h2>
            <p className="text-slate-700">
              You have the right to decide whether to accept or reject cookies. You can exercise your 
              cookie preferences by clicking on the appropriate opt-out links provided in the cookie 
              banner or settings.
            </p>
            <p className="text-slate-700">
              You can also set or amend your web browser controls to accept or refuse cookies. 
              If you choose to reject cookies, you may still use our website though your access 
              to some functionality and areas may be restricted.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <Info className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              How Often Will We Update This Cookie Policy?
            </h2>
            <p className="text-slate-700">
              We may update this Cookie Policy from time to time to reflect changes to the cookies 
              we use or for other operational, legal, or regulatory reasons. Please revisit this 
              Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mt-12">
              <CheckCircle className="w-6 h-6 text-[hsl(210,70%,50%)]" />
              Where Can You Get More Information?
            </h2>
            <p className="text-slate-700">
              If you have any questions about our use of cookies or other technologies, please contact us at:
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
              <Link to="/privacy" className="text-[hsl(210,70%,50%)] hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[hsl(210,70%,50%)] hover:underline">
                Terms of Service
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
