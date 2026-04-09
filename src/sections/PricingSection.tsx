import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Sparkles, Zap, Users } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

const plans = [
  {
    id: 'free' as const,
    icon: Sparkles,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'AI Faith Mentor (limited)',
      'Basic prayer journal',
      'Daily devotionals',
      'Faith calendar',
      'Community prayer wall',
    ],
    notIncluded: [
      'Sermon creator',
      'Liturgy builder',
      'Family features',
      'Priority support',
    ],
  },
  {
    id: 'individual' as const,
    icon: Zap,
    popular: true,
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: [
      'Unlimited AI Faith Mentor',
      'Advanced prayer journal',
      'Sermon creator',
      'Liturgy builder',
      'Bible audio player',
      'Worship music library',
      'Priority email support',
    ],
    notIncluded: [
      'Family accounts (up to 4)',
      'Youth hub access',
      'Little Lambs content',
    ],
  },
  {
    id: 'family' as const,
    icon: Users,
    monthlyPrice: 39,
    yearlyPrice: 390,
    features: [
      'Everything in Individual',
      'Up to 4 family accounts',
      'Little Lambs (ages 3-12)',
      'Youth Hub (ages 13-18)',
      'Family devotionals',
      'Parental controls',
      'Priority chat support',
    ],
    notIncluded: [],
  },
];

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { t } = useI18n();

  return (
    <section id="pricing" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(210,80%,95%)] text-[hsl(210,70%,50%)] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {t('pricing.title')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            {t('pricing.subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-[hsl(48,60%,96%)] rounded-xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('pricing.billingMonthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t('pricing.billingYearly')}
              <span className="px-2 py-0.5 bg-[hsl(150,30%,55%)]/20 text-[hsl(150,30%,45%)] text-xs rounded-full">
                {t('pricing.saveBadge')}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[hsl(48,60%,98%)] rounded-2xl p-8 border-2 transition-all card-hover ${
                plan.popular
                  ? 'border-[hsl(210,70%,60%)] shadow-lg'
                  : 'border-transparent hover:border-[hsl(48,30%,88%)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-[hsl(210,70%,60%)] text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                  plan.id === 'free' ? 'from-[hsl(48,90%,65%)] to-[hsl(35,80%,60%)]' :
                  plan.id === 'individual' ? 'from-[hsl(210,70%,60%)] to-[hsl(260,50%,65%)]' :
                  'from-[hsl(150,30%,55%)] to-[hsl(180,40%,50%)]'
                } flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {t(`pricing.${plan.id}.name` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-slate-500 text-sm">
                  {t(`pricing.${plan.id}.desc` as Parameters<typeof t>[0])}
                </p>
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-slate-800">
                  R{billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-slate-500">
                  /{billingPeriod === 'monthly' ? t('pricing.perMonth') : t('pricing.perYear')}
                </span>
              </div>

              <Link
                to="/register"
                className={`block w-full py-3 rounded-xl font-medium text-center transition-colors mb-8 ${
                  plan.popular
                    ? 'bg-[hsl(210,70%,60%)] text-white hover:bg-[hsl(210,60%,50%)]'
                    : 'bg-white border-2 border-[hsl(48,30%,88%)] text-slate-700 hover:border-[hsl(210,70%,60%)] hover:text-[hsl(210,70%,50%)]'
                }`}
              >
                {t(`pricing.${plan.id}.cta` as Parameters<typeof t>[0])}
              </Link>

              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">{t('pricing.featureIncluded')}</p>
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[hsl(150,30%,55%)] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.length > 0 && (
                  <>
                    <p className="text-sm font-medium text-slate-700 pt-4">{t('pricing.featureNotIncluded')}</p>
                    {plan.notIncluded.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-500">{t('pricing.trialNote')}</p>
        </div>
      </div>
    </section>
  );
}
