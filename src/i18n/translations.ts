import type { Language } from '@/types';

export type I18nKey =
  | 'nav.features'
  | 'nav.pricing'
  | 'nav.about'
  | 'nav.blog'
  | 'nav.contact'
  | 'nav.dashboard'
  | 'nav.signIn'
  | 'nav.getStarted'
  | 'footer.product'
  | 'footer.company'
  | 'footer.resources'
  | 'footer.legal'
  | 'footer.supportedDenominations'
  | 'footer.availableIn'
  | 'footer.tagline';

export const translations: Record<Language, Record<I18nKey, string>> = {
  en: {
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.supportedDenominations': 'Supported Denominations',
    'footer.availableIn': 'Available in: English, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Your personal AI mentor for a deeper Christian life. Tailored to your tradition, available 24/7.',
  },
  af: {
    'nav.features': 'Kenmerke',
    'nav.pricing': 'Pryse',
    'nav.about': 'Oor ons',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontak',
    'nav.dashboard': 'Paneel',
    'nav.signIn': 'Teken In',
    'nav.getStarted': 'Begin Nou',
    'footer.product': 'Produk',
    'footer.company': 'Maatskappy',
    'footer.resources': 'Hulpbronne',
    'footer.legal': 'Regs',
    'footer.supportedDenominations': 'Ondersteunde Denominasies',
    'footer.availableIn': 'Beskikbaar in: Engels, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Jou persoonlike KI-mentor vir ’n dieper Christelike lewe. Aangepas vir jou tradisie, 24/7 beskikbaar.',
  },
  zu: {
    'nav.features': 'Izici',
    'nav.pricing': 'Amanani',
    'nav.about': 'Mayelana',
    'nav.blog': 'Ibhulogi',
    'nav.contact': 'Xhumana',
    'nav.dashboard': 'Ideshibhodi',
    'nav.signIn': 'Ngena',
    'nav.getStarted': 'Qala Manje',
    'footer.product': 'Umkhiqizo',
    'footer.company': 'Inkampani',
    'footer.resources': 'Izinsiza',
    'footer.legal': 'Ezomthetho',
    'footer.supportedDenominations': 'Amahlelo Asekelwayo',
    'footer.availableIn': 'Kutholakala nge: English, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Umeluleki wakho we-AI wokholo olujulile lobuKristu, olulungiselelwe isiko lakho, lutholakala 24/7.',
  },
  xh: {
    'nav.features': 'Iimpawu',
    'nav.pricing': 'Amaxabiso',
    'nav.about': 'Malunga',
    'nav.blog': 'Ibhlog',
    'nav.contact': 'Qhagamshelana',
    'nav.dashboard': 'Ideshibhodi',
    'nav.signIn': 'Ngena',
    'nav.getStarted': 'Qalisa',
    'footer.product': 'Imveliso',
    'footer.company': 'Inkampani',
    'footer.resources': 'Izixhobo',
    'footer.legal': 'Ezomthetho',
    'footer.supportedDenominations': 'Iinkonzo Ezixhaswayo',
    'footer.availableIn': 'Ifumaneka nge: English, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Umcebisi wakho we-AI wobomi bobuKristu obunzulu, olungelelaniswe nesithethe sakho, ufumaneka 24/7.',
  },
};
