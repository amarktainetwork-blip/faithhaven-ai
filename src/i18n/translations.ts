import type { Language } from '@/types';

export type I18nKey =
  // Navigation
  | 'nav.features'
  | 'nav.pricing'
  | 'nav.about'
  | 'nav.contact'
  | 'nav.dashboard'
  | 'nav.signIn'
  | 'nav.getStarted'
  // Footer
  | 'footer.product'
  | 'footer.company'
  | 'footer.resources'
  | 'footer.legal'
  | 'footer.supportedDenominations'
  | 'footer.availableIn'
  | 'footer.tagline'
  | 'footer.copyright'
  // Hero
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'hero.ctaSecondary'
  | 'hero.trustedBy'
  // Features
  | 'features.title'
  | 'features.subtitle'
  | 'features.aiMentor.name'
  | 'features.aiMentor.desc'
  | 'features.prayerJournal.name'
  | 'features.prayerJournal.desc'
  | 'features.dailyDevotionals.name'
  | 'features.dailyDevotionals.desc'
  | 'features.faithCalendar.name'
  | 'features.faithCalendar.desc'
  | 'features.sermonCreator.name'
  | 'features.sermonCreator.desc'
  | 'features.liturgyBuilder.name'
  | 'features.liturgyBuilder.desc'
  | 'features.bibleAudio.name'
  | 'features.bibleAudio.desc'
  | 'features.worshipMusic.name'
  | 'features.worshipMusic.desc'
  | 'features.youthHub.name'
  | 'features.youthHub.desc'
  | 'features.littleLambs.name'
  | 'features.littleLambs.desc'
  | 'features.familyDevotionals.name'
  | 'features.familyDevotionals.desc'
  | 'features.prayerWall.name'
  | 'features.prayerWall.desc'
  // Pricing
  | 'pricing.title'
  | 'pricing.subtitle'
  | 'pricing.billingMonthly'
  | 'pricing.billingYearly'
  | 'pricing.saveBadge'
  | 'pricing.free.name'
  | 'pricing.free.desc'
  | 'pricing.free.cta'
  | 'pricing.individual.name'
  | 'pricing.individual.desc'
  | 'pricing.individual.cta'
  | 'pricing.family.name'
  | 'pricing.family.desc'
  | 'pricing.family.cta'
  | 'pricing.perMonth'
  | 'pricing.perYear'
  | 'pricing.featureIncluded'
  | 'pricing.featureNotIncluded'
  | 'pricing.trialNote'
  // Testimonials
  | 'testimonials.title'
  | 'testimonials.subtitle'
  // Auth — Login
  | 'auth.login.title'
  | 'auth.login.subtitle'
  | 'auth.login.emailLabel'
  | 'auth.login.passwordLabel'
  | 'auth.login.rememberMe'
  | 'auth.login.forgotPassword'
  | 'auth.login.submit'
  | 'auth.login.noAccount'
  | 'auth.login.signUp'
  // Auth — Register
  | 'auth.register.title'
  | 'auth.register.subtitle'
  | 'auth.register.step1'
  | 'auth.register.step2'
  | 'auth.register.namePlaceholder'
  | 'auth.register.emailPlaceholder'
  | 'auth.register.passwordPlaceholder'
  | 'auth.register.denominationLabel'
  | 'auth.register.selectDenomination'
  | 'auth.register.continue'
  | 'auth.register.createAccount'
  | 'auth.register.haveAccount'
  // Auth — Forgot Password
  | 'auth.forgotPassword.title'
  | 'auth.forgotPassword.desc'
  | 'auth.forgotPassword.submit'
  | 'auth.forgotPassword.backToLogin'
  // Dashboard
  | 'dashboard.sidebar.main'
  | 'dashboard.sidebar.personal'
  | 'dashboard.sidebar.family'
  | 'dashboard.sidebar.community'
  | 'dashboard.sidebar.admin'
  | 'dashboard.nav.home'
  | 'dashboard.nav.aiChat'
  | 'dashboard.nav.prayerJournal'
  | 'dashboard.nav.devotionals'
  | 'dashboard.nav.calendar'
  | 'dashboard.nav.sermonCreator'
  | 'dashboard.nav.liturgyBuilder'
  | 'dashboard.nav.bibleAudio'
  | 'dashboard.nav.worshipMusic'
  | 'dashboard.nav.youthHub'
  | 'dashboard.nav.littleLambs'
  | 'dashboard.nav.familyDevotionals'
  | 'dashboard.nav.prayerWall'
  | 'dashboard.nav.settings'
  | 'dashboard.nav.logout'
  // AI Chat
  | 'chat.title'
  | 'chat.subtitle'
  | 'chat.newChat'
  | 'chat.quickPrompt.dailyVerse'
  | 'chat.quickPrompt.prayerHelp'
  | 'chat.quickPrompt.faithQuestion'
  | 'chat.inputPlaceholder'
  | 'chat.thinking'
  | 'chat.adminAccess'
  | 'chat.enterPassword'
  | 'chat.unlock'
  | 'chat.cancel'
  // Settings
  | 'settings.title'
  | 'settings.subtitle'
  | 'settings.tabs.profile'
  | 'settings.tabs.notifications'
  | 'settings.tabs.security'
  | 'settings.profile.name'
  | 'settings.profile.email'
  | 'settings.profile.denomination'
  | 'settings.profile.language'
  | 'settings.notifications.email'
  | 'settings.notifications.push'
  | 'settings.notifications.devotionalReminder'
  | 'settings.security.currentPassword'
  | 'settings.security.newPassword'
  | 'settings.security.confirmPassword'
  | 'settings.save'
  | 'settings.themeDark'
  | 'settings.themeLight'
  // Common
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.cancel'
  | 'common.save'
  | 'common.delete'
  | 'common.back'
  | 'common.next'
  | 'common.submit'
  | 'common.close'
  // Offline
  | 'offline.title'
  | 'offline.message'
  | 'offline.retry';

export const translations: Record<Language, Record<I18nKey, string>> = {
  // ---------------------------------------------------------------------------
  // ENGLISH
  // ---------------------------------------------------------------------------
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    // Footer
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.supportedDenominations': 'Supported Denominations',
    'footer.availableIn': 'Available in: English, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Your personal AI mentor for a deeper Christian life. Tailored to your tradition, available 24/7.',
    'footer.copyright': '© {year} FaithHaven AI. All rights reserved.',
    // Hero
    'hero.title': 'Your Personal AI Faith Mentor',
    'hero.subtitle': 'Deepen your Christian walk with AI-powered guidance tailored to your denomination. Bible study, prayer journaling, devotionals, and more — all in one place.',
    'hero.cta': 'Start Your Journey',
    'hero.ctaSecondary': 'Learn More',
    'hero.trustedBy': 'Trusted by believers across all denominations',
    // Features
    'features.title': 'Everything You Need for Your Faith Journey',
    'features.subtitle': 'Powerful tools designed to help you grow spiritually, connect with your community, and deepen your relationship with God.',
    'features.aiMentor.name': 'AI Faith Mentor',
    'features.aiMentor.desc': 'Get personalised spiritual guidance grounded in Scripture and tailored to your denomination.',
    'features.prayerJournal.name': 'Prayer Journal',
    'features.prayerJournal.desc': 'Record your prayers, track answered prayers, and grow your prayer life with guided prompts.',
    'features.dailyDevotionals.name': 'Daily Devotionals',
    'features.dailyDevotionals.desc': 'Start each day with fresh devotionals generated from Scripture, matched to your tradition.',
    'features.faithCalendar.name': 'Faith Calendar',
    'features.faithCalendar.desc': 'Follow the liturgical calendar with feasts, fasts, and holy days for your denomination.',
    'features.sermonCreator.name': 'Sermon Creator',
    'features.sermonCreator.desc': 'Craft compelling sermons with AI assistance — outlines, illustrations, and Scripture references.',
    'features.liturgyBuilder.name': 'Liturgy Builder',
    'features.liturgyBuilder.desc': 'Build complete worship service orders aligned with your liturgical tradition.',
    'features.bibleAudio.name': 'Bible Audio',
    'features.bibleAudio.desc': 'Listen to Scripture in multiple translations and languages for study or meditation.',
    'features.worshipMusic.name': 'Worship Music',
    'features.worshipMusic.desc': 'Discover worship songs, hymns, and choruses suited to your church style.',
    'features.youthHub.name': 'Youth Hub',
    'features.youthHub.desc': 'Engaging faith-based content and activities designed for teenagers and young adults.',
    'features.littleLambs.name': 'Little Lambs',
    'features.littleLambs.desc': "Bible stories, activities, and prayers crafted for children to learn about God's love.",
    'features.familyDevotionals.name': 'Family Devotionals',
    'features.familyDevotionals.desc': 'Bring your family together with guided devotionals suitable for all ages.',
    'features.prayerWall.name': 'Prayer Wall',
    'features.prayerWall.desc': 'Share prayer requests and pray for others in a supportive faith community.',
    // Pricing
    'pricing.title': 'Simple, Transparent Pricing',
    'pricing.subtitle': 'Choose the plan that fits your faith journey. Start free, upgrade anytime.',
    'pricing.billingMonthly': 'Monthly',
    'pricing.billingYearly': 'Yearly',
    'pricing.saveBadge': 'Save 15%',
    'pricing.free.name': 'Free',
    'pricing.free.desc': 'Get started with essential faith tools at no cost.',
    'pricing.free.cta': 'Get Started Free',
    'pricing.individual.name': 'Individual',
    'pricing.individual.desc': 'Full access to all personal spiritual growth features.',
    'pricing.individual.cta': 'Start Free Trial',
    'pricing.family.name': 'Family',
    'pricing.family.desc': 'Share your faith journey with up to 6 family members.',
    'pricing.family.cta': 'Start Family Trial',
    'pricing.perMonth': '/month',
    'pricing.perYear': '/year',
    'pricing.featureIncluded': 'Included',
    'pricing.featureNotIncluded': 'Not included',
    'pricing.trialNote': 'All paid plans include a 14-day free trial. No credit card required.',
    // Testimonials
    'testimonials.title': 'What Believers Are Saying',
    'testimonials.subtitle': 'Hear from Christians across denominations who have deepened their faith with FaithHaven AI.',
    // Auth — Login
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to continue your faith journey',
    'auth.login.emailLabel': 'Email address',
    'auth.login.passwordLabel': 'Password',
    'auth.login.rememberMe': 'Remember me',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.submit': 'Sign In',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.signUp': 'Sign up',
    // Auth — Register
    'auth.register.title': 'Create Your Account',
    'auth.register.subtitle': 'Join thousands of believers growing in faith',
    'auth.register.step1': 'Your Details',
    'auth.register.step2': 'Your Faith',
    'auth.register.namePlaceholder': 'Full name',
    'auth.register.emailPlaceholder': 'Email address',
    'auth.register.passwordPlaceholder': 'Create a password',
    'auth.register.denominationLabel': 'Denomination',
    'auth.register.selectDenomination': 'Select your denomination',
    'auth.register.continue': 'Continue',
    'auth.register.createAccount': 'Create Account',
    'auth.register.haveAccount': 'Already have an account?',
    // Auth — Forgot Password
    'auth.forgotPassword.title': 'Reset Your Password',
    'auth.forgotPassword.desc': "Enter your email and we'll send you a link to reset your password.",
    'auth.forgotPassword.submit': 'Send Reset Link',
    'auth.forgotPassword.backToLogin': 'Back to sign in',
    // Dashboard
    'dashboard.sidebar.main': 'Main',
    'dashboard.sidebar.personal': 'Personal',
    'dashboard.sidebar.family': 'Family',
    'dashboard.sidebar.community': 'Community',
    'dashboard.sidebar.admin': 'Admin',
    'dashboard.nav.home': 'Home',
    'dashboard.nav.aiChat': 'AI Chat',
    'dashboard.nav.prayerJournal': 'Prayer Journal',
    'dashboard.nav.devotionals': 'Devotionals',
    'dashboard.nav.calendar': 'Faith Calendar',
    'dashboard.nav.sermonCreator': 'Sermon Creator',
    'dashboard.nav.liturgyBuilder': 'Liturgy Builder',
    'dashboard.nav.bibleAudio': 'Bible Audio',
    'dashboard.nav.worshipMusic': 'Worship Music',
    'dashboard.nav.youthHub': 'Youth Hub',
    'dashboard.nav.littleLambs': 'Little Lambs',
    'dashboard.nav.familyDevotionals': 'Family Devotionals',
    'dashboard.nav.prayerWall': 'Prayer Wall',
    'dashboard.nav.settings': 'Settings',
    'dashboard.nav.logout': 'Log Out',
    // AI Chat
    'chat.title': 'AI Faith Mentor',
    'chat.subtitle': 'Ask anything about faith, Scripture, prayer, or your spiritual walk.',
    'chat.newChat': 'New Chat',
    'chat.quickPrompt.dailyVerse': 'Daily Verse',
    'chat.quickPrompt.prayerHelp': 'Prayer Help',
    'chat.quickPrompt.faithQuestion': 'Faith Question',
    'chat.inputPlaceholder': 'Type your question…',
    'chat.thinking': 'Thinking…',
    'chat.adminAccess': 'Admin Access Required',
    'chat.enterPassword': 'Enter admin password',
    'chat.unlock': 'Unlock',
    'chat.cancel': 'Cancel',
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account preferences',
    'settings.tabs.profile': 'Profile',
    'settings.tabs.notifications': 'Notifications',
    'settings.tabs.security': 'Security',
    'settings.profile.name': 'Display name',
    'settings.profile.email': 'Email address',
    'settings.profile.denomination': 'Denomination',
    'settings.profile.language': 'Language',
    'settings.notifications.email': 'Email notifications',
    'settings.notifications.push': 'Push notifications',
    'settings.notifications.devotionalReminder': 'Daily devotional reminder',
    'settings.security.currentPassword': 'Current password',
    'settings.security.newPassword': 'New password',
    'settings.security.confirmPassword': 'Confirm new password',
    'settings.save': 'Save Changes',
    'settings.themeDark': 'Dark mode',
    'settings.themeLight': 'Light mode',
    // Common
    'common.loading': 'Loading…',
    'common.error': 'Something went wrong. Please try again.',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
    'common.close': 'Close',
    // Offline
    'offline.title': "You're Offline",
    'offline.message': 'Please check your internet connection and try again.',
    'offline.retry': 'Retry',
  },

  // ---------------------------------------------------------------------------
  // AFRIKAANS
  // ---------------------------------------------------------------------------
  af: {
    // Navigation
    'nav.features': 'Kenmerke',
    'nav.pricing': 'Pryse',
    'nav.about': 'Oor Ons',
    'nav.contact': 'Kontak',
    'nav.dashboard': 'Paneel',
    'nav.signIn': 'Teken In',
    'nav.getStarted': 'Begin Nou',
    // Footer
    'footer.product': 'Produk',
    'footer.company': 'Maatskappy',
    'footer.resources': 'Hulpbronne',
    'footer.legal': 'Regs',
    'footer.supportedDenominations': 'Ondersteunde Denominasies',
    'footer.availableIn': 'Beskikbaar in: Engels, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': "Jou persoonlike KI-mentor vir 'n dieper Christelike lewe. Aangepas vir jou tradisie, 24/7 beskikbaar.",
    'footer.copyright': '© {year} FaithHaven AI. Alle regte voorbehou.',
    // Hero
    'hero.title': 'Jou Persoonlike KI-Geloofsmentor',
    'hero.subtitle': "Verdiep jou Christelike wandel met KI-geleide begeleiding wat by jou denominasie pas. Bybelstudie, gebedjoernaal, dagstukkies en meer — alles op een plek.",
    'hero.cta': 'Begin Jou Reis',
    'hero.ctaSecondary': 'Leer Meer',
    'hero.trustedBy': 'Vertrou deur gelowiges oor alle denominasies heen',
    // Features
    'features.title': 'Alles Wat Jy Nodig Het vir Jou Geloofsreis',
    'features.subtitle': 'Kragtige gereedskap ontwerp om jou geestelik te laat groei, met jou gemeenskap te verbind, en jou verhouding met God te verdiep.',
    'features.aiMentor.name': 'KI-Geloofsmentor',
    'features.aiMentor.desc': 'Ontvang persoonlike geestelike leiding gegrond op die Skrif en aangepas vir jou denominasie.',
    'features.prayerJournal.name': 'Gebedjoernaal',
    'features.prayerJournal.desc': 'Teken jou gebede op, hou verhoorde gebede dop en groei jou gebedslewe met begeleide aanwysings.',
    'features.dailyDevotionals.name': 'Daaglikse Dagstukkies',
    'features.dailyDevotionals.desc': 'Begin elke dag met vars dagstukkies uit die Skrif gegenereer, afgestem op jou tradisie.',
    'features.faithCalendar.name': 'Geloofskalender',
    'features.faithCalendar.desc': 'Volg die liturgiese kalender met feeste, vaste en heilige dae vir jou denominasie.',
    'features.sermonCreator.name': 'Preekskepper',
    'features.sermonCreator.desc': 'Skep kragtige preke met KI-bystand — raamwerke, illustrasies en Skrifverwysings.',
    'features.liturgyBuilder.name': 'Liturgiebouer',
    'features.liturgyBuilder.desc': 'Bou volledige erediensprogramme wat by jou liturgiese tradisie pas.',
    'features.bibleAudio.name': 'Bybeloudio',
    'features.bibleAudio.desc': 'Luister na die Skrif in verskeie vertalings en tale vir studie of meditasie.',
    'features.worshipMusic.name': 'Aanbiddingsmusiek',
    'features.worshipMusic.desc': 'Ontdek aanbiddingsliedere, gesange en kore wat by jou kerkstyl pas.',
    'features.youthHub.name': 'Jeugsenter',
    'features.youthHub.desc': 'Betrokke geloofsgebaseerde inhoud en aktiwiteite ontwerp vir tieners en jong volwassenes.',
    'features.littleLambs.name': 'Klein Lammers',
    'features.littleLambs.desc': 'Bybelverhale, aktiwiteite en gebede vir kinders om van God se liefde te leer.',
    'features.familyDevotionals.name': 'Gesinsaandag',
    'features.familyDevotionals.desc': 'Bring jou gesin bymekaar met begeleide dagstukkies geskik vir alle ouderdomme.',
    'features.prayerWall.name': 'Gebedsmuur',
    'features.prayerWall.desc': "Deel gebedsversoeke en bid vir ander in 'n ondersteunende geloofsgemeenskap.",
    // Pricing
    'pricing.title': 'Eenvoudige, Deursigtige Pryse',
    'pricing.subtitle': 'Kies die plan wat by jou geloofsreis pas. Begin gratis, opgradeer enige tyd.',
    'pricing.billingMonthly': 'Maandeliks',
    'pricing.billingYearly': 'Jaarliks',
    'pricing.saveBadge': 'Spaar 15%',
    'pricing.free.name': 'Gratis',
    'pricing.free.desc': 'Begin met noodsaaklike geloofsgereedskap teen geen koste.',
    'pricing.free.cta': 'Begin Gratis',
    'pricing.individual.name': 'Individueel',
    'pricing.individual.desc': 'Volle toegang tot alle persoonlike geestelike groeikenmerke.',
    'pricing.individual.cta': 'Begin Gratis Proeftydperk',
    'pricing.family.name': 'Gesin',
    'pricing.family.desc': 'Deel jou geloofsreis met tot 6 gesinslede.',
    'pricing.family.cta': 'Begin Gesinproeftydperk',
    'pricing.perMonth': '/maand',
    'pricing.perYear': '/jaar',
    'pricing.featureIncluded': 'Ingesluit',
    'pricing.featureNotIncluded': 'Nie ingesluit',
    'pricing.trialNote': "Alle betaalde planne sluit 'n 14-dag gratis proeftydperk in. Geen kredietkaart nodig nie.",
    // Testimonials
    'testimonials.title': 'Wat Gelowiges Sê',
    'testimonials.subtitle': 'Hoor van Christene oor denominasies heen wat hul geloof met FaithHaven AI verdiep het.',
    // Auth — Login
    'auth.login.title': 'Welkom Terug',
    'auth.login.subtitle': 'Teken in om jou geloofsreis voort te sit',
    'auth.login.emailLabel': 'E-posadres',
    'auth.login.passwordLabel': 'Wagwoord',
    'auth.login.rememberMe': 'Onthou my',
    'auth.login.forgotPassword': 'Wagwoord vergeet?',
    'auth.login.submit': 'Teken In',
    'auth.login.noAccount': "Het jy nie 'n rekening nie?",
    'auth.login.signUp': 'Registreer',
    // Auth — Register
    'auth.register.title': 'Skep Jou Rekening',
    'auth.register.subtitle': 'Sluit aan by duisende gelowiges wat in geloof groei',
    'auth.register.step1': 'Jou Besonderhede',
    'auth.register.step2': 'Jou Geloof',
    'auth.register.namePlaceholder': 'Volle naam',
    'auth.register.emailPlaceholder': 'E-posadres',
    'auth.register.passwordPlaceholder': "Skep 'n wagwoord",
    'auth.register.denominationLabel': 'Denominasie',
    'auth.register.selectDenomination': 'Kies jou denominasie',
    'auth.register.continue': 'Gaan Voort',
    'auth.register.createAccount': 'Skep Rekening',
    'auth.register.haveAccount': "Het jy reeds 'n rekening?",
    // Auth — Forgot Password
    'auth.forgotPassword.title': 'Herstel Jou Wagwoord',
    'auth.forgotPassword.desc': "Voer jou e-posadres in en ons sal vir jou 'n skakel stuur om jou wagwoord te herstel.",
    'auth.forgotPassword.submit': 'Stuur Herstelskakel',
    'auth.forgotPassword.backToLogin': 'Terug na aanmelding',
    // Dashboard
    'dashboard.sidebar.main': 'Hoofkieslys',
    'dashboard.sidebar.personal': 'Persoonlik',
    'dashboard.sidebar.family': 'Gesin',
    'dashboard.sidebar.community': 'Gemeenskap',
    'dashboard.sidebar.admin': 'Admin',
    'dashboard.nav.home': 'Tuis',
    'dashboard.nav.aiChat': 'KI-Klets',
    'dashboard.nav.prayerJournal': 'Gebedjoernaal',
    'dashboard.nav.devotionals': 'Dagstukkies',
    'dashboard.nav.calendar': 'Geloofskalender',
    'dashboard.nav.sermonCreator': 'Preekskepper',
    'dashboard.nav.liturgyBuilder': 'Liturgiebouer',
    'dashboard.nav.bibleAudio': 'Bybeloudio',
    'dashboard.nav.worshipMusic': 'Aanbiddingsmusiek',
    'dashboard.nav.youthHub': 'Jeugsenter',
    'dashboard.nav.littleLambs': 'Klein Lammers',
    'dashboard.nav.familyDevotionals': 'Gesinsaandag',
    'dashboard.nav.prayerWall': 'Gebedsmuur',
    'dashboard.nav.settings': 'Instellings',
    'dashboard.nav.logout': 'Teken Uit',
    // AI Chat
    'chat.title': 'KI-Geloofsmentor',
    'chat.subtitle': 'Vra enigiets oor geloof, die Skrif, gebed of jou geestelike wandel.',
    'chat.newChat': 'Nuwe Klets',
    'chat.quickPrompt.dailyVerse': 'Daaglikse Vers',
    'chat.quickPrompt.prayerHelp': 'Gebedshulp',
    'chat.quickPrompt.faithQuestion': 'Geloofsvraag',
    'chat.inputPlaceholder': 'Tik jou vraag…',
    'chat.thinking': 'Dink na…',
    'chat.adminAccess': 'Admin-toegang Vereis',
    'chat.enterPassword': 'Voer admin-wagwoord in',
    'chat.unlock': 'Ontsluit',
    'chat.cancel': 'Kanselleer',
    // Settings
    'settings.title': 'Instellings',
    'settings.subtitle': 'Bestuur jou rekeningvoorkeure',
    'settings.tabs.profile': 'Profiel',
    'settings.tabs.notifications': 'Kennisgewings',
    'settings.tabs.security': 'Sekuriteit',
    'settings.profile.name': 'Vertoonnaam',
    'settings.profile.email': 'E-posadres',
    'settings.profile.denomination': 'Denominasie',
    'settings.profile.language': 'Taal',
    'settings.notifications.email': 'E-poskennisgewings',
    'settings.notifications.push': 'Stootkennisgewings',
    'settings.notifications.devotionalReminder': 'Daaglikse dagstukkie-herinnering',
    'settings.security.currentPassword': 'Huidige wagwoord',
    'settings.security.newPassword': 'Nuwe wagwoord',
    'settings.security.confirmPassword': 'Bevestig nuwe wagwoord',
    'settings.save': 'Stoor Veranderinge',
    'settings.themeDark': 'Donker modus',
    'settings.themeLight': 'Ligte modus',
    // Common
    'common.loading': 'Laai tans…',
    'common.error': 'Iets het fout gegaan. Probeer asseblief weer.',
    'common.success': 'Sukses!',
    'common.cancel': 'Kanselleer',
    'common.save': 'Stoor',
    'common.delete': 'Verwyder',
    'common.back': 'Terug',
    'common.next': 'Volgende',
    'common.submit': 'Dien In',
    'common.close': 'Sluit',
    // Offline
    'offline.title': 'Jy Is Vanlyn',
    'offline.message': 'Kontroleer asseblief jou internetverbinding en probeer weer.',
    'offline.retry': 'Probeer Weer',
  },

  // ---------------------------------------------------------------------------
  // ISIZULU
  // ---------------------------------------------------------------------------
  zu: {
    // Navigation
    'nav.features': 'Izici',
    'nav.pricing': 'Amanani',
    'nav.about': 'Mayelana',
    'nav.contact': 'Xhumana Nathi',
    'nav.dashboard': 'Ideshibhodi',
    'nav.signIn': 'Ngena',
    'nav.getStarted': 'Qala Manje',
    // Footer
    'footer.product': 'Umkhiqizo',
    'footer.company': 'Inkampani',
    'footer.resources': 'Izinsiza',
    'footer.legal': 'Ezomthetho',
    'footer.supportedDenominations': 'Amahlelo Asekelwayo',
    'footer.availableIn': 'Kutholakala nge: English, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Umeluleki wakho we-AI wokholo olujulile lobuKristu, olulungiselelwe isiko lakho, utholakala 24/7.',
    'footer.copyright': '© {year} FaithHaven AI. Onke amalungelo agodliwe.',
    // Hero
    'hero.title': 'Umeluleki Wakho We-AI Wokholo',
    'hero.subtitle': 'Jula ekuhambeni kwakho noKristu ngosizo lwe-AI olulungiselelwe ihlelo lakho. Ukufunda iBhayibheli, umkhuleko, izifundo zansuku zonke nokunye — konke endaweni eyodwa.',
    'hero.cta': 'Qala Uhambo Lwakho',
    'hero.ctaSecondary': 'Funda Kabanzi',
    'hero.trustedBy': 'Bathenjwa amakholwa kuwo wonke amahlelo',
    // Features
    'features.title': 'Konke Okudingayo Ohambeni Lwakho Lokholo',
    'features.subtitle': 'Amathuluzi anamandla enzelwe ukukusiza ukhule ngokomoya, uxhumane nebandla lakho, futhi ujulise ubudlelwano bakho noNkulunkulu.',
    'features.aiMentor.name': 'Umeluleki We-AI Wokholo',
    'features.aiMentor.desc': 'Thola isiqondiso sokomoya esisekelwe emiBhalweni futhi silungiselelwe ihlelo lakho.',
    'features.prayerJournal.name': 'Ibhuku Lomkhuleko',
    'features.prayerJournal.desc': 'Bhala imikhuleko yakho, ulandelele imikhuleko ephendulwe, futhi ukhulise impilo yakho yomkhuleko.',
    'features.dailyDevotionals.name': 'Izifundo Zansuku Zonke',
    'features.dailyDevotionals.desc': 'Qala usuku ngalunye ngezifundo ezintsha ezivela emiBhalweni, ezilungiselelwe isiko lakho.',
    'features.faithCalendar.name': 'Ikhalenda Lokholo',
    'features.faithCalendar.desc': 'Landela ikhalenda lebandla nemidlalo yamaholide, ukuzila nokudla kwezinsuku ezingcwele zehlelo lakho.',
    'features.sermonCreator.name': 'Umklami Wentshumayelo',
    'features.sermonCreator.desc': 'Klama izintshumayelo ezinamandla ngosizo lwe-AI — izinhlaka, imifanekiso nemiBhalo.',
    'features.liturgyBuilder.name': 'Umakhi Weliturji',
    'features.liturgyBuilder.desc': 'Yakha uhlelo oluphelele lwenkonzo yokukhonza oluhambisana nesiko lakho leliturji.',
    'features.bibleAudio.name': 'Ukulalela IBhayibheli',
    'features.bibleAudio.desc': 'Lalela imiBhalo ngezinguqulo nezilimi ezahlukene ukuze ufunde noma uzindle.',
    'features.worshipMusic.name': 'Umculo Wokukhonza',
    'features.worshipMusic.desc': 'Thola amaculo okukhonza, amahubo namakhorasi ahambisana nesitayela sebandla lakho.',
    'features.youthHub.name': 'Isikhungo Sentsha',
    'features.youthHub.desc': 'Okuqukethwe nobuhlakani bokholo okwenzelwe intsha nabasha abadala.',
    'features.littleLambs.name': 'Amawundlu Amancane',
    'features.littleLambs.desc': 'Izindaba zeBhayibheli, imisebenzi nemikhuleko eklanyelwe izingane ukufunda ngothando lukaNkulunkulu.',
    'features.familyDevotionals.name': 'Izifundo Zomndeni',
    'features.familyDevotionals.desc': 'Hlanganisa umndeni wakho ngezifundo eziholelwayo ezifanele yonke iminyaka yobudala.',
    'features.prayerWall.name': 'Udonga Lomkhuleko',
    'features.prayerWall.desc': 'Yabelana ngezicelo zomkhuleko futhi uthandazele abanye emphakathini wokholo oxhasayo.',
    // Pricing
    'pricing.title': 'Amanani Alula, Asobala',
    'pricing.subtitle': 'Khetha uhlelo olufanele uhambo lwakho lokholo. Qala mahhala, thuthukisa noma nini.',
    'pricing.billingMonthly': 'Ngenyanga',
    'pricing.billingYearly': 'Ngonyaka',
    'pricing.saveBadge': 'Onga 15%',
    'pricing.free.name': 'Mahhala',
    'pricing.free.desc': 'Qala ngamathuluzi okholo abalulekile ngaphandle kwezindleko.',
    'pricing.free.cta': 'Qala Mahhala',
    'pricing.individual.name': 'Umuntu Ngamunye',
    'pricing.individual.desc': 'Ukufinyelela okugcwele kuzo zonke izici zokukhula ngokomoya.',
    'pricing.individual.cta': 'Qala Isikhathi Sokuzama Mahhala',
    'pricing.family.name': 'Umndeni',
    'pricing.family.desc': 'Yabelana ngohambo lwakho lokholo namalungu omndeni angu-6.',
    'pricing.family.cta': 'Qala Isikhathi Sokuzama Somndeni',
    'pricing.perMonth': '/ngenyanga',
    'pricing.perYear': '/ngonyaka',
    'pricing.featureIncluded': 'Kufakiwe',
    'pricing.featureNotIncluded': 'Akufakiwe',
    'pricing.trialNote': 'Zonke izinhlelo ezikhokhwayo zifaka isikhathi sokuzama samahhala ezinsuku ezingu-14. Ayidingeki ikhadi lesikweletu.',
    // Testimonials
    'testimonials.title': 'Akushiwo Amakholwa',
    'testimonials.subtitle': 'Zwana kumaKristu kuwo wonke amahlelo ajulise ukholo lwawo nge-FaithHaven AI.',
    // Auth — Login
    'auth.login.title': 'Wamkelekile Futhi',
    'auth.login.subtitle': 'Ngena ukuze uqhubeke nohambo lwakho lokholo',
    'auth.login.emailLabel': 'Ikheli le-imeyili',
    'auth.login.passwordLabel': 'Iphasiwedi',
    'auth.login.rememberMe': 'Ngikhumbule',
    'auth.login.forgotPassword': 'Ukhohlwe iphasiwedi?',
    'auth.login.submit': 'Ngena',
    'auth.login.noAccount': 'Awunayo i-akhawunti?',
    'auth.login.signUp': 'Bhalisa',
    // Auth — Register
    'auth.register.title': 'Dala I-akhawunti Yakho',
    'auth.register.subtitle': 'Hlanganyela nezinkulungwane zamakholwa akhula ekholweni',
    'auth.register.step1': 'Imininingwane Yakho',
    'auth.register.step2': 'Ukholo Lwakho',
    'auth.register.namePlaceholder': 'Igama eligcwele',
    'auth.register.emailPlaceholder': 'Ikheli le-imeyili',
    'auth.register.passwordPlaceholder': 'Dala iphasiwedi',
    'auth.register.denominationLabel': 'Ihlelo',
    'auth.register.selectDenomination': 'Khetha ihlelo lakho',
    'auth.register.continue': 'Qhubeka',
    'auth.register.createAccount': 'Dala I-akhawunti',
    'auth.register.haveAccount': 'Usunayi i-akhawunti?',
    // Auth — Forgot Password
    'auth.forgotPassword.title': 'Setha Kabusha Iphasiwedi Yakho',
    'auth.forgotPassword.desc': 'Faka ikheli lakho le-imeyili sizokuthumelela isixhumanisi sokusetha kabusha iphasiwedi yakho.',
    'auth.forgotPassword.submit': 'Thumela Isixhumanisi Sokusetha Kabusha',
    'auth.forgotPassword.backToLogin': 'Buyela ekungeneni',
    // Dashboard
    'dashboard.sidebar.main': 'Okubalulekile',
    'dashboard.sidebar.personal': 'Okwakho',
    'dashboard.sidebar.family': 'Umndeni',
    'dashboard.sidebar.community': 'Umphakathi',
    'dashboard.sidebar.admin': 'Ukulawula',
    'dashboard.nav.home': 'Ikhaya',
    'dashboard.nav.aiChat': 'Ingxoxo ye-AI',
    'dashboard.nav.prayerJournal': 'Ibhuku Lomkhuleko',
    'dashboard.nav.devotionals': 'Izifundo Zansuku Zonke',
    'dashboard.nav.calendar': 'Ikhalenda Lokholo',
    'dashboard.nav.sermonCreator': 'Umklami Wentshumayelo',
    'dashboard.nav.liturgyBuilder': 'Umakhi Weliturji',
    'dashboard.nav.bibleAudio': 'Ukulalela IBhayibheli',
    'dashboard.nav.worshipMusic': 'Umculo Wokukhonza',
    'dashboard.nav.youthHub': 'Isikhungo Sentsha',
    'dashboard.nav.littleLambs': 'Amawundlu Amancane',
    'dashboard.nav.familyDevotionals': 'Izifundo Zomndeni',
    'dashboard.nav.prayerWall': 'Udonga Lomkhuleko',
    'dashboard.nav.settings': 'Izilungiselelo',
    'dashboard.nav.logout': 'Phuma',
    // AI Chat
    'chat.title': 'Umeluleki We-AI Wokholo',
    'chat.subtitle': 'Buza noma yini mayelana nokholo, imiBhalo, umkhuleko noma ukuhamba kwakho ngokomoya.',
    'chat.newChat': 'Ingxoxo Entsha',
    'chat.quickPrompt.dailyVerse': 'Ivesi Losuku',
    'chat.quickPrompt.prayerHelp': 'Usizo Lomkhuleko',
    'chat.quickPrompt.faithQuestion': 'Umbuzo Wokholo',
    'chat.inputPlaceholder': 'Bhala umbuzo wakho…',
    'chat.thinking': 'Kucabanga…',
    'chat.adminAccess': 'Kudingeka Ukufinyelela Komlawuli',
    'chat.enterPassword': 'Faka iphasiwedi yomlawuli',
    'chat.unlock': 'Vula',
    'chat.cancel': 'Khansela',
    // Settings
    'settings.title': 'Izilungiselelo',
    'settings.subtitle': 'Phatha izintandokazi ze-akhawunti yakho',
    'settings.tabs.profile': 'Iphrofayela',
    'settings.tabs.notifications': 'Izaziso',
    'settings.tabs.security': 'Ukuphepha',
    'settings.profile.name': 'Igama lokubonisa',
    'settings.profile.email': 'Ikheli le-imeyili',
    'settings.profile.denomination': 'Ihlelo',
    'settings.profile.language': 'Ulimi',
    'settings.notifications.email': 'Izaziso nge-imeyili',
    'settings.notifications.push': 'Izaziso zokuphusha',
    'settings.notifications.devotionalReminder': 'Isikhumbuzi sesifundo sansuku zonke',
    'settings.security.currentPassword': 'Iphasiwedi yamanje',
    'settings.security.newPassword': 'Iphasiwedi entsha',
    'settings.security.confirmPassword': 'Qinisekisa iphasiwedi entsha',
    'settings.save': 'Londoloza Izinguquko',
    'settings.themeDark': 'Imodi emnyama',
    'settings.themeLight': 'Imodi ekhanyayo',
    // Common
    'common.loading': 'Iyalayisha…',
    'common.error': 'Kukhona okungahambanga kahle. Sicela uzame futhi.',
    'common.success': 'Kuphumelele!',
    'common.cancel': 'Khansela',
    'common.save': 'Londoloza',
    'common.delete': 'Susa',
    'common.back': 'Emuva',
    'common.next': 'Okulandelayo',
    'common.submit': 'Thumela',
    'common.close': 'Vala',
    // Offline
    'offline.title': 'Awuxhunyiwe Ku-inthanethi',
    'offline.message': 'Sicela uhlole ukuxhumeka kwakho ku-inthanethi bese uzama futhi.',
    'offline.retry': 'Zama Futhi',
  },

  // ---------------------------------------------------------------------------
  // ISIXHOSA
  // ---------------------------------------------------------------------------
  xh: {
    // Navigation
    'nav.features': 'Iimpawu',
    'nav.pricing': 'Amaxabiso',
    'nav.about': 'Malunga Nathi',
    'nav.contact': 'Qhagamshelana',
    'nav.dashboard': 'Ideshibhodi',
    'nav.signIn': 'Ngena',
    'nav.getStarted': 'Qalisa Ngoku',
    // Footer
    'footer.product': 'Imveliso',
    'footer.company': 'Inkampani',
    'footer.resources': 'Izixhobo',
    'footer.legal': 'Ezomthetho',
    'footer.supportedDenominations': 'Iinkonzo Ezixhaswayo',
    'footer.availableIn': 'Ifumaneka nge: English, Afrikaans, isiZulu, isiXhosa',
    'footer.tagline': 'Umcebisi wakho we-AI wobomi bobuKristu obunzulu, olungelelaniswe nesithethe sakho, ufumaneka 24/7.',
    'footer.copyright': '© {year} FaithHaven AI. Onke amalungelo agciniwe.',
    // Hero
    'hero.title': 'Umcebisi Wakho We-AI Wokholo',
    'hero.subtitle': 'Nzulisa uhambo lwakho noKristu ngoncedo lwe-AI olulungelelaniswe nehlelo lakho. Ukufunda iBhayibhile, umthandazo, izifundo zemihla ngemihla nokunye — konke kwindawo enye.',
    'hero.cta': 'Qalisa Uhambo Lwakho',
    'hero.ctaSecondary': 'Funda Ngakumbi',
    'hero.trustedBy': 'Bathenjwa ngamakholwa kuzo zonke iinkonzo',
    // Features
    'features.title': 'Yonke Into Oyidingayo Koluhambo Lwakho Lokholo',
    'features.subtitle': 'Izixhobo ezinamandla ezenzelwe ukukunceda ukhule ngokomoya, uqhagamshelane nebandla lakho, kunye nokunzulisa ubudlelwane bakho noThixo.',
    'features.aiMentor.name': 'Umcebisi We-AI Wokholo',
    'features.aiMentor.desc': 'Fumana isikhokelo sokomoya esisekwe kwiziBhalo kunye nesilungelelaniswe nehlelo lakho.',
    'features.prayerJournal.name': 'Incwadi Yomthandazo',
    'features.prayerJournal.desc': 'Bhala imithandazo yakho, ulandelele imithandazo ephendulweyo, kwaye ukhulise ubomi bakho bomthandazo.',
    'features.dailyDevotionals.name': 'Izifundo Zemihla Ngemihla',
    'features.dailyDevotionals.desc': 'Qalisa usuku ngalunye ngezifundo ezintsha ezivela kwiziBhalo, ezilungelelaniswe nesithethe sakho.',
    'features.faithCalendar.name': 'Ikhalenda Lokholo',
    'features.faithCalendar.desc': 'Landela ikhalenda lecawa neentsuku zamaholide, ukuzila kunye neentsuku ezingcwele zehlelo lakho.',
    'features.sermonCreator.name': 'Umenzi Weentshumayelo',
    'features.sermonCreator.desc': 'Yila iintshumayelo ezinamandla ngoncedo lwe-AI — izakhelo, imizekelo kunye neziBhalo.',
    'features.liturgyBuilder.name': 'Umakhi Weliturji',
    'features.liturgyBuilder.desc': 'Yakha uhlelo olupheleleyo lwenkonzo yonqulo oluhambisana nesithethe sakho seliturji.',
    'features.bibleAudio.name': 'Ukumamela IBhayibhile',
    'features.bibleAudio.desc': 'Mamela iziBhalo ngeenguqulelo neelwimi ezahlukeneyo ukuze ufunde okanye ucamngce.',
    'features.worshipMusic.name': 'Umculo Wokunqula',
    'features.worshipMusic.desc': 'Fumana iingoma zokunqula, iihymni kunye neekhwayari ezilungele isimbo secawa yakho.',
    'features.youthHub.name': 'Iziko Lolutsha',
    'features.youthHub.desc': 'Umxholo wokholo othabathisayo nemisebenzi eyenzelwe ulutsha kunye nabadala abasebatsha.',
    'features.littleLambs.name': 'Amatakane Amancinane',
    'features.littleLambs.desc': 'Amabali eBhayibhile, imisebenzi nemithandazo eyenzelwe abantwana ukufunda ngothando lukaThixo.',
    'features.familyDevotionals.name': 'Izifundo Zosapho',
    'features.familyDevotionals.desc': 'Dibanisa usapho lwakho ngezifundo ezikhokelweyo ezifanelekileyo kuyo yonke iminyaka.',
    'features.prayerWall.name': 'Udonga Lomthandazo',
    'features.prayerWall.desc': 'Yabelana ngezicelo zomthandazo kwaye uthandazele abanye kuluntu lokholo oluxhasayo.',
    // Pricing
    'pricing.title': 'Amaxabiso Alula, Acacileyo',
    'pricing.subtitle': 'Khetha isicwangciso esifanele uhambo lwakho lokholo. Qalisa simahla, nyusa nanini na.',
    'pricing.billingMonthly': 'Ngenyanga',
    'pricing.billingYearly': 'Ngonyaka',
    'pricing.saveBadge': 'Gcina 15%',
    'pricing.free.name': 'Simahla',
    'pricing.free.desc': 'Qalisa ngezixhobo zokholo ezibalulekileyo ngaphandle kweendleko.',
    'pricing.free.cta': 'Qalisa Simahla',
    'pricing.individual.name': 'Umntu Ngamnye',
    'pricing.individual.desc': 'Ukufikelela okupheleleyo kuzo zonke iimpawu zokukhula ngokomoya.',
    'pricing.individual.cta': 'Qalisa Ixesha Lokuzama Simahla',
    'pricing.family.name': 'Usapho',
    'pricing.family.desc': 'Yabelana ngohambo lwakho lokholo namalungu osapho ayi-6.',
    'pricing.family.cta': 'Qalisa Ixesha Lokuzama Losapho',
    'pricing.perMonth': '/ngenyanga',
    'pricing.perYear': '/ngonyaka',
    'pricing.featureIncluded': 'Kubandakanyiwe',
    'pricing.featureNotIncluded': 'Akubandakanyiwe',
    'pricing.trialNote': 'Zonke izicwangciso ezihlawulelwayo zibandakanya ixesha lokuzama simahla leentsuku eziyi-14. Akufuneki ikhadi letyala.',
    // Testimonials
    'testimonials.title': 'Akuthethwa Ngamakholwa',
    'testimonials.subtitle': 'Yiva kumakholwa kuzo zonke iinkonzo anzulise ukholo lwawo nge-FaithHaven AI.',
    // Auth — Login
    'auth.login.title': 'Wamkelekile Kwakhona',
    'auth.login.subtitle': 'Ngena ukuze uqhubeke nohambo lwakho lokholo',
    'auth.login.emailLabel': 'Idilesi ye-imeyile',
    'auth.login.passwordLabel': 'Iphaswedi',
    'auth.login.rememberMe': 'Ndikhumbule',
    'auth.login.forgotPassword': 'Ulibele iphaswedi?',
    'auth.login.submit': 'Ngena',
    'auth.login.noAccount': 'Akunayo iakhawunti?',
    'auth.login.signUp': 'Bhalisa',
    // Auth — Register
    'auth.register.title': 'Yila Iakhawunti Yakho',
    'auth.register.subtitle': 'Joyina amawaka amakholwa akhula ekholweni',
    'auth.register.step1': 'Iinkcukacha Zakho',
    'auth.register.step2': 'Ukholo Lwakho',
    'auth.register.namePlaceholder': 'Igama elipheleleyo',
    'auth.register.emailPlaceholder': 'Idilesi ye-imeyile',
    'auth.register.passwordPlaceholder': 'Yila iphaswedi',
    'auth.register.denominationLabel': 'Ihlelo',
    'auth.register.selectDenomination': 'Khetha ihlelo lakho',
    'auth.register.continue': 'Qhubeka',
    'auth.register.createAccount': 'Yila Iakhawunti',
    'auth.register.haveAccount': 'Sele unayo iakhawunti?',
    // Auth — Forgot Password
    'auth.forgotPassword.title': 'Seta Kwakhona Iphaswedi Yakho',
    'auth.forgotPassword.desc': 'Faka idilesi yakho ye-imeyile kwaye siza kukuthumela ikhonkco lokuseta kwakhona iphaswedi yakho.',
    'auth.forgotPassword.submit': 'Thumela Ikhonkco Lokuseta Kwakhona',
    'auth.forgotPassword.backToLogin': 'Buyela ekungeneni',
    // Dashboard
    'dashboard.sidebar.main': 'Okubalulekileyo',
    'dashboard.sidebar.personal': 'Okwakho',
    'dashboard.sidebar.family': 'Usapho',
    'dashboard.sidebar.community': 'Uluntu',
    'dashboard.sidebar.admin': 'Ulawulo',
    'dashboard.nav.home': 'Ikhaya',
    'dashboard.nav.aiChat': 'Incoko ye-AI',
    'dashboard.nav.prayerJournal': 'Incwadi Yomthandazo',
    'dashboard.nav.devotionals': 'Izifundo Zemihla Ngemihla',
    'dashboard.nav.calendar': 'Ikhalenda Lokholo',
    'dashboard.nav.sermonCreator': 'Umenzi Weentshumayelo',
    'dashboard.nav.liturgyBuilder': 'Umakhi Weliturji',
    'dashboard.nav.bibleAudio': 'Ukumamela IBhayibhile',
    'dashboard.nav.worshipMusic': 'Umculo Wokunqula',
    'dashboard.nav.youthHub': 'Iziko Lolutsha',
    'dashboard.nav.littleLambs': 'Amatakane Amancinane',
    'dashboard.nav.familyDevotionals': 'Izifundo Zosapho',
    'dashboard.nav.prayerWall': 'Udonga Lomthandazo',
    'dashboard.nav.settings': 'Iisetingi',
    'dashboard.nav.logout': 'Phuma',
    // AI Chat
    'chat.title': 'Umcebisi We-AI Wokholo',
    'chat.subtitle': 'Buza nantoni na malunga nokholo, iziBhalo, umthandazo okanye uhambo lwakho ngokomoya.',
    'chat.newChat': 'Incoko Entsha',
    'chat.quickPrompt.dailyVerse': 'Ivesi Yosuku',
    'chat.quickPrompt.prayerHelp': 'Uncedo Lomthandazo',
    'chat.quickPrompt.faithQuestion': 'Umbuzo Wokholo',
    'chat.inputPlaceholder': 'Chwetheza umbuzo wakho…',
    'chat.thinking': 'Iyacinga…',
    'chat.adminAccess': 'Kufuneka Ukufikelela Komlawuli',
    'chat.enterPassword': 'Faka iphaswedi yomlawuli',
    'chat.unlock': 'Vula',
    'chat.cancel': 'Rhoxisa',
    // Settings
    'settings.title': 'Iisetingi',
    'settings.subtitle': 'Lawula iiprefrensi zeakhawunti yakho',
    'settings.tabs.profile': 'Iprofayile',
    'settings.tabs.notifications': 'Izaziso',
    'settings.tabs.security': 'Ukhuseleko',
    'settings.profile.name': 'Igama lokubonisa',
    'settings.profile.email': 'Idilesi ye-imeyile',
    'settings.profile.denomination': 'Ihlelo',
    'settings.profile.language': 'Ulwimi',
    'settings.notifications.email': 'Izaziso nge-imeyile',
    'settings.notifications.push': 'Izaziso zokutyhala',
    'settings.notifications.devotionalReminder': 'Isikhumbuzi sesifundo semihla ngemihla',
    'settings.security.currentPassword': 'Iphaswedi yangoku',
    'settings.security.newPassword': 'Iphaswedi entsha',
    'settings.security.confirmPassword': 'Qinisekisa iphaswedi entsha',
    'settings.save': 'Gcina Utshintsho',
    'settings.themeDark': 'Imowudi emnyama',
    'settings.themeLight': 'Imowudi ekhanyayo',
    // Common
    'common.loading': 'Iyalayisha…',
    'common.error': 'Kukho into engahambanga kakuhle. Nceda uzame kwakhona.',
    'common.success': 'Iphumelele!',
    'common.cancel': 'Rhoxisa',
    'common.save': 'Gcina',
    'common.delete': 'Cima',
    'common.back': 'Emva',
    'common.next': 'Okulandelayo',
    'common.submit': 'Thumela',
    'common.close': 'Vala',
    // Offline
    'offline.title': 'Awuqhagamshelwanga Kwi-intanethi',
    'offline.message': 'Nceda ujonge unxibelelwano lwakho lwe-intanethi kwaye uzame kwakhona.',
    'offline.retry': 'Zama Kwakhona',
  },
};
