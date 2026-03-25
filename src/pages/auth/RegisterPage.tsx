import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cross, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store';
import type { Denomination } from '@/types';
import { toast } from 'sonner';

const denominations: { value: Denomination; label: string }[] = [
  { value: 'catholic', label: 'Catholic' },
  { value: 'orthodox', label: 'Orthodox' },
  { value: 'anglican', label: 'Anglican' },
  { value: 'lutheran', label: 'Lutheran' },
  { value: 'methodist', label: 'Methodist' },
  { value: 'presbyterian', label: 'Presbyterian' },
  { value: 'baptist', label: 'Baptist' },
  { value: 'pentecostal', label: 'Pentecostal' },
  { value: 'charismatic', label: 'Charismatic' },
  { value: 'reformed', label: 'Reformed' },
  { value: 'nondenominational', label: 'Non-denominational' },
  { value: 'other', label: 'Other' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    denomination: '' as Denomination | '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }
      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return;
      }
      setStep(2);
      return;
    }

    if (!formData.denomination) {
      toast.error('Please select your denomination');
      return;
    }

    const success = await register(formData.email, formData.password, formData.name, formData.denomination);
    if (success) {
      toast.success('Welcome to FaithHaven!');
      navigate('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[hsl(48,60%,98%)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)] flex items-center justify-center">
              <Cross className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">FaithHaven</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {step === 1 ? 'Create Your Account' : 'Select Your Denomination'}
          </h1>
          <p className="text-slate-600">
            {step === 1 ? 'Start your faith journey today' : 'This helps us personalize your experience'}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-[hsl(210,70%,60%)] text-white' : 'bg-[hsl(48,30%,88%)] text-slate-500'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 rounded-full ${step >= 2 ? 'bg-[hsl(210,70%,60%)]' : 'bg-[hsl(48,30%,88%)]'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-[hsl(210,70%,60%)] text-white' : 'bg-[hsl(48,30%,88%)] text-slate-500'
          }`}>
            2
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-[hsl(48,30%,88%)] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password (min 8 chars)"
                      className="w-full h-12 pl-12 pr-12 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Denomination
                </label>
                <select
                  name="denomination"
                  value={formData.denomination}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-[hsl(48,30%,88%)] focus:border-[hsl(210,70%,60%)] focus:ring-2 focus:ring-[hsl(210,70%,60%)]/20 outline-none transition-all bg-white"
                  required
                >
                  <option value="">Select your denomination</option>
                  {denominations.map((denom) => (
                    <option key={denom.value} value={denom.value}>
                      {denom.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-500 mt-2">
                  This helps us provide denomination-specific content and liturgies.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 border-2 border-[hsl(48,30%,88%)] text-slate-700 rounded-xl font-medium hover:border-[hsl(210,70%,60%)] hover:text-[hsl(210,70%,50%)] transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 bg-[hsl(210,70%,60%)] text-white rounded-xl font-semibold hover:bg-[hsl(210,60%,50%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : step === 1 ? (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[hsl(210,70%,50%)] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-sm text-slate-500">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-[hsl(210,70%,50%)] hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-[hsl(210,70%,50%)] hover:underline">Privacy Policy</Link>
        </p>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link to="/" className="text-slate-500 hover:text-slate-700 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
