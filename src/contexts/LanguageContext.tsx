import { useState, useEffect, type ReactNode } from 'react';
import { LanguageContext } from './LanguageContextValue';

export type Language = 'en' | 'sr' | 'ru';

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'E-commerce Websites\nThat Help You\nSell More',
    'hero.subtitle': 'We build online shops designed to bring you\nmore customers and more revenue.',
    'hero.cta.services': 'Explore services',
    'hero.cta.contact': 'Contact us',
    
    // Services
    'services.title': 'What We Do',
    'services.title.prefix': '',
    'services.ecommerce-development.title': 'E-commerce\nDevelopment',
    'services.ecommerce-development.description': 'We create your online shop on WordPress or Shopify, tailored to your business',
    'services.custom-wordpress-development.title': 'Custom\nDevelopment',
    'services.custom-wordpress-development.description': 'Custom design, features, and integrations built specifically for your business needs',
    'services.ai-integration.title': 'AI Integration',
    'services.ai-integration.description': 'Customer support chatbots, process automation and AI-powered content creation for marketing',
    'services.seo-geo-optimization.title': 'SEO & GEO\nOptimization',
    'services.seo-geo-optimization.description': 'We optimize your shop\'s visibility on Google and AI search engines so new customers can easily find you',
    'services.plugin-integration.title': 'Integrations &\nExtensions',
    'services.plugin-integration.description': 'We connect payment systems, shipping tools, and other services to help your business scale and grow',
    'services.maintenance-support.title': 'Maintenance &\nSupport',
    'services.maintenance-support.description': 'We keep your shop updated, secure, and running without you having to worry about technical details',
    'services.pricing': 'Starting from €1,000',
    
    // Process
    'process.title': 'How We Work',
    'process.title.prefix': '',
    'process.step.1.title': 'Discovery',
    'process.step.1.description': 'We learn about your business, products, and what you want your online shop to achieve.',
    'process.step.2.title': 'Planning',
    'process.step.2.description': 'We design your shop structure, pages, and the features you need.',
    'process.step.3.title': 'Development',
    'process.step.3.description': 'We build your shop with your feedback, making adjustments as we go.',
    'process.step.4.title': 'Launch',
    'process.step.4.description': 'We test everything thoroughly and launch your shop',
    'process.step.5.title': 'Support',
    'process.step.5.description': 'Post-launch maintenance and support to keep your shop running smoothly',
    
    // Blog
    'blog.title': 'Blog',
    'blog.cta.desktop': 'View All Posts',
    'blog.cta.mobile': 'Read Blog',
    'blog.readMore': 'Read More',
    'blog.emptyState': 'No posts in this category yet.',
    
    // CTA
    'cta.title': 'Ready to Start Selling Online?',
    'cta.description': 'Let\'s talk about your business and how an online shop can help you grow.',
    'cta.button.contact': 'Contact us',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.title.prefix': '',
    'contact.form.title': 'Send us a Message',
    'contact.form.title.highlight': 'Message',
    'contact.schedule.title': 'Book a Call',
    'contact.schedule.title.highlight': 'Call',
    'contact.schedule.description': 'Prefer to discuss your project in a call?\nBook a time that works for you.',
    'contact.schedule.button': 'Schedule a Call',
    'contact.form.service.ecommerce': 'E-commerce Development',
    'contact.form.service.custom': 'Custom Development',
    'contact.form.service.ai': 'AI Integration',
    'contact.form.service.seo': 'SEO & GEO Optimization',
    'contact.form.service.integrations': 'Integrations & Extensions',
    'contact.form.service.maintenance': 'Maintenance & Support',
    'contact.form.service.other': 'Other / Not Sure',
    
    // Footer
    'footer.description': 'E-commerce websites designed to help your business sell online.',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect',
    'footer.copyright': '© {year} NeoPress',
    
    // About
    'about.title': 'About NeoPress',
    'about.content': 'We\'re an e-commerce development agency focused on helping businesses sell online.\n\nOur team has extensive experience with the platforms and technologies we use - WordPress, Shopify, WooCommerce, and the tools that make online shops work.\n\nWe work with businesses at any stage: whether you\'re selling your first product online or growing an established shop. Our focus is simple: build shops that work well and help you make more sales.\n\nWe\'re based in Serbia and work with clients locally and internationally.',
    
    // FAQ
    'faq.title': 'Common Questions',
    'faq.q1.question': 'How long does it take to build an online shop?',
    'faq.q1.answer': 'It depends on what you need. Simple shops can be ready in as fast as 1 week. Most projects take anywhere from 1 week to 2 months depending on complexity.',
    'faq.q2.question': 'How much does it cost?',
    'faq.q2.answer': 'Projects start from €1,000. Final pricing depends on your specific requirements, features, and the platform we use.',
    'faq.q3.question': 'Do you work with Shopify and WooCommerce?',
    'faq.q3.answer': 'Yes. We work with both platforms and help you choose which one makes the most sense for your business.',
    'faq.q4.question': 'What if I already have a website?',
    'faq.q4.answer': 'We can work with existing sites - whether you need updates, improvements, or a complete rebuild.',
    'faq.q5.question': 'What happens after my shop launches?',
    'faq.q5.answer': 'We provide support after launch to help you with any questions or adjustments. Ongoing maintenance and updates are available as a separate service.',
    
    // Contact Form
    'contact.form.placeholder.name': 'Your name',
    'contact.form.placeholder.email': 'your@email.com',
    'contact.form.placeholder.service': 'Select a service...',
    'contact.form.placeholder.message': 'Tell us about your business and what you need...',
    'contact.form.validation.name': 'Name is required',
    'contact.form.validation.email': 'Email is required',
    'contact.form.validation.emailInvalid': 'Please enter a valid email',
    'contact.form.validation.service': 'Please select a service',
    'contact.form.validation.message': 'Message is required',
    'contact.form.validation.messageLength': 'Please provide more details (at least 20 characters)',
    'contact.form.success.title': 'Message Sent',
    'contact.form.success.message': 'Thank you for reaching out. We\'ll respond within 24 hours.',
    'contact.form.error.title': 'Something went wrong',
    'contact.form.error.message': 'Please try again or email us at hello@neopress.dev',
    'contact.form.submit': 'Contact us',
    'contact.form.submitting': 'Sending...',
    'contact.form.emailAlternative': 'Or email us at hello@neopress.dev',
    'contact.form.label.name': 'Name',
    'contact.form.label.email': 'Email',
    'contact.form.label.service': 'Service Interested In',
    'contact.form.label.message': 'Message',
    'contact.form.success.sendAnother': 'Send another message',
    '404.title': 'Page Not Found',
    '404.description': 'The page you\'re looking for doesn\'t exist or has been moved. Let\'s get you back on track.',
    '404.goHome': 'Go Home',
    '404.goBack': 'Go Back',
    '404.helpText': 'Looking for something specific?',
    'blogPost.share': 'Share:',
    'blogPost.featuredImage': 'Featured Image',
    'blogPost.relatedArticles': 'Related Articles',
    'blogPost.cta.title': 'Need WordPress Help?',
    'blogPost.cta.description': 'We can help you implement these strategies and more. Let\'s discuss your project.',
  },
  sr: {
    // Navigation
    'nav.home': 'Početna',
    'nav.services': 'Usluge',
    'nav.about': 'O nama',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.title': 'E-commerce Sajt\nVam Pomaže da\nZaradite Više',
    'hero.subtitle': 'Kreiramo online prodavnice dizajnirane da Vam\ndovedu više kupaca i veći prihod.',
    'hero.cta.services': 'Pogledajte usluge',
    'hero.cta.contact': 'Kontaktirajte nas',
    
    // Services
    'services.title': 'Šta Radimo',
    'services.title.prefix': '',
    'services.ecommerce-development.title': 'E-commerce\nDevelopment',
    'services.ecommerce-development.description': 'Kreiramo Vašu online prodavnicu na Wordpress ili Shopify platformi, prilagođenu Vašem biznisu',
    'services.custom-wordpress-development.title': 'Custom\nDevelopment',
    'services.custom-wordpress-development.description': 'Jedinstveni dizajn, funkcionalnosti i integracije dizajnirane posebno za potrebe Vašeg poslovanja',
    'services.ai-integration.title': 'AI Integracija',
    'services.ai-integration.description': 'Chatbot korisnička podrška, automatizovani procesi i AI kreiranje sadržaja za marketing',
    'services.seo-geo-optimization.title': 'SEO & GEO\nOptimizacija',
    'services.seo-geo-optimization.description': 'Optimizujemo vidljivost Vaše prodavnice na Google-u i AI pretraživačima kako bi Vas novi kupci lako pronašli',
    'services.plugin-integration.title': 'Integracije i\nDodaci',
    'services.plugin-integration.description': 'Povezujemo sisteme za plaćanje, alate za dostavu i druge servise kako bismo pomogli Vašem biznisu da raste',
    'services.maintenance-support.title': 'Održavanje i\nPodrška',
    'services.maintenance-support.description': 'Održavamo Vašu prodavnicu ažurnom, bezbednom i funkcionalnom bez da Vi morate da brinete o tehničkim detaljima',
    'services.pricing': 'Cene od €500',
    
    // Process
    'process.title': 'Kako Radimo',
    'process.title.prefix': '',
    'process.step.1.title': 'Upoznavanje',
    'process.step.1.description': 'Učimo o Vašem poslovanju, proizvodima i šta želite da Vaša online prodavnica postigne.',
    'process.step.2.title': 'Planiranje',
    'process.step.2.description': 'Dizajniramo strukturu Vaše prodavnice, stranice i funkcionalnosti koje Vam trebaju.',
    'process.step.3.title': 'Razvoj',
    'process.step.3.description': 'Kreiramo sajt uz Vaše povratne informacije, prilagođavajući ga tokom celog procesa.',
    'process.step.4.title': 'Pokretanje',
    'process.step.4.description': 'Temeljno testiramo sve i pustimo sajt u rad.',
    'process.step.5.title': 'Podrška',
    'process.step.5.description': 'Održavanje i podrška nakon pokretanja osiguravajući da Vaša prodavnica radi nesmetano',
    
    // Blog
    'blog.title': 'Blog',
    'blog.cta.desktop': 'Pogledajte Sve Članke',
    'blog.cta.mobile': 'Blog',
    'blog.readMore': 'Pročitajte Više',
    'blog.emptyState': 'Još nema članaka u ovoj kategoriji.',
    
    // CTA
    'cta.title': 'Spremni da Počnete da Prodajete Online?',
    'cta.description': 'Razgovarajmo o Vašem poslovanju i kako online prodavnica može da Vam pomogne da rastete.',
    'cta.button.contact': 'Kontaktirajte nas',
    
    // Contact
    'contact.title': 'Kontaktirajte Nas',
    'contact.title.prefix': '',
    'contact.form.title': 'Pošaljite nam Poruku',
    'contact.form.title.highlight': 'Poruku',
    'contact.schedule.title': 'Zakažite Poziv',
    'contact.schedule.title.highlight': 'Poziv',
    'contact.schedule.description': 'Želite li da razgovarate o projektu putem poziva?\nZakažite vreme koje Vama odgovara.',
    'contact.schedule.button': 'Zakažite Poziv',
    'contact.form.service.ecommerce': 'E-commerce Development',
    'contact.form.service.custom': 'Custom Development',
    'contact.form.service.ai': 'AI Integracija',
    'contact.form.service.seo': 'SEO & GEO Optimizacija',
    'contact.form.service.integrations': 'Integracije i Dodaci',
    'contact.form.service.maintenance': 'Održavanje i Podrška',
    'contact.form.service.other': 'Drugo / Nisam Siguran',
    
    // Footer
    'footer.description': 'E-commerce sajtovi dizajnirani da pomognu Vašem poslovanju da prodaje online.',
    'footer.quickLinks': 'Brzi linkovi',
    'footer.connect': 'Povežite se',
    'footer.copyright': '© {year} NeoPress',
    
    // About
    'about.title': 'O NeoPress-u',
    'about.content': 'Mi smo agencija za razvoj e-commerce sajtova fokusirana na pomoć preduzećima da prodaju online.\n\nNaš tim ima obimno iskustvo sa platformama i tehnologijama koje koristimo - WordPress, Shopify, WooCommerce i alati koji čine da online prodavnice funkcionišu.\n\nRadimo sa preduzećima u bilo kojoj fazi: bilo da prodajete prvi proizvod online ili razvijate već uspostavljenu prodavnicu. Naš fokus je jednostavan: gradimo prodavnice koje dobro funkcionišu i pomažu Vam da ostvarite više prodaje.\n\nBazirani smo u Srbiji i radimo sa klijentima lokalno i internacionalno.',
    
    // FAQ
    'faq.title': 'Česta Pitanja',
    'faq.q1.question': 'Koliko dugo traje izgradnja online prodavnice?',
    'faq.q1.answer': 'Zavisi od toga šta Vam je potrebno. Jednostavne prodavnice mogu biti spremne za čak 1 nedelju. Većina projekata traje od 1 nedelje do 2 meseca u zavisnosti od složenosti.',
    'faq.q2.question': 'Koliko košta?',
    'faq.q2.answer': 'Projekti počinju od €500. Konačna cena zavisi od Vaših specifičnih zahteva, funkcionalnosti i platforme koju koristimo.',
    'faq.q3.question': 'Da li radite sa Shopify i WooCommerce platformama?',
    'faq.q3.answer': 'Da. Radimo sa obe platforme i pomažemo Vam da odaberete koja ima najviše smisla za Vaše poslovanje.',
    'faq.q4.question': 'Šta ako već imam sajt?',
    'faq.q4.answer': 'Možemo raditi sa postojećim sajtovima - bilo da Vam trebaju izmene, unapređenja ili potpuna rekonstrukcija.',
    'faq.q5.question': 'Šta se dešava nakon što moja prodavnica krene?',
    'faq.q5.answer': 'Pružamo podršku nakon pokretanja da Vam pomognemo sa svim pitanjima ili prilagodbama. Tekuće održavanje i ažuriranja su dostupni kao zaseban servis.',
    
    // Contact Form
    'contact.form.placeholder.name': 'Vaše ime',
    'contact.form.placeholder.email': 'Vas@email.com',
    'contact.form.placeholder.service': 'Izaberite uslugu...',
    'contact.form.placeholder.message': 'Recite nam o Vašem poslovanju i šta Vam je potrebno...',
    'contact.form.validation.name': 'Ime je obavezno',
    'contact.form.validation.email': 'Email je obavezan',
    'contact.form.validation.emailInvalid': 'Molimo unesite važeći email',
    'contact.form.validation.service': 'Molimo izaberite uslugu',
    'contact.form.validation.message': 'Poruka je obavezna',
    'contact.form.validation.messageLength': 'Molimo navedite više detalja (najmanje 20 karaktera)',
    'contact.form.success.title': 'Poruka Poslata',
    'contact.form.success.message': 'Hvala što ste nas kontaktirali. Odgovorićemo u roku od 24 sata.',
    'contact.form.error.title': 'Nešto nije u redu',
    'contact.form.error.message': 'Molimo pokušajte ponovo ili nam pošaljite email na hello@neopress.dev',
    'contact.form.submit': 'Kontaktirajte nas',
    'contact.form.submitting': 'Šalje se...',
    'contact.form.emailAlternative': 'Ili nam pošaljite email na hello@neopress.dev',
    'contact.form.label.name': 'Ime',
    'contact.form.label.email': 'Email',
    'contact.form.label.service': 'Zainteresovani ste za',
    'contact.form.label.message': 'Poruka',
    'contact.form.success.sendAnother': 'Pošaljite novu poruku',
    '404.title': 'Stranica nije pronađena',
    '404.description': 'Stranica koju tražite ne postoji ili je premestena. Hajde da Vas vratimo na pravi put.',
    '404.goHome': 'Početna',
    '404.goBack': 'Nazad',
    '404.helpText': 'Tražite nešto specifično?',
    'blogPost.share': 'Podeli:',
    'blogPost.featuredImage': 'Istaknuta slika',
    'blogPost.relatedArticles': 'Srodni članci',
    'blogPost.cta.title': 'Treba Vam pomoć?',
    'blogPost.cta.description': 'Možemo Vam pomoći da implementirate ove strategije i više. Razgovarajmo o Vašem projektu.',
  },
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.services': 'Услуги',
    'nav.about': 'О нас',
    'nav.blog': 'Блог',
    'nav.contact': 'Контакты',
    
    // Hero
    'hero.title': 'Интернет-магазины,\nКоторые Помогают Вам\nПродавать Больше',
    'hero.subtitle': 'Мы создаем интернет-магазины, разработанные для привлечения\nбольшего количества клиентов и увеличения дохода.',
    'hero.cta.services': 'Посмотреть услуги',
    'hero.cta.contact': 'Свяжитесь с нами',
    
    // Services
    'services.title': 'Что Мы Делаем',
    'services.title.prefix': '',
    'services.ecommerce-development.title': 'Разработка\nE-commerce',
    'services.ecommerce-development.description': 'Мы создаем ваш интернет-магазин на WordPress или Shopify, адаптированный под ваш бизнес',
    'services.custom-wordpress-development.title': 'Индивидуальная\nРазработка',
    'services.custom-wordpress-development.description': 'Индивидуальный дизайн, функции и интеграции, созданные специально для потребностей вашего бизнеса',
    'services.ai-integration.title': 'Интеграция ИИ',
    'services.ai-integration.description': 'Чатботы поддержки клиентов, автоматизированные рабочие процессы и создание контента с помощью ИИ для маркетинга',
    'services.seo-geo-optimization.title': 'SEO и GEO\nОптимизация',
    'services.seo-geo-optimization.description': 'Мы оптимизируем видимость вашего магазина в Google и поисковых системах ИИ, чтобы новые клиенты могли легко вас найти',
    'services.plugin-integration.title': 'Интеграции и\nРасширения',
    'services.plugin-integration.description': 'Мы подключаем платежные системы, инструменты доставки и другие сервисы, чтобы помочь вашему бизнесу расти',
    'services.maintenance-support.title': 'Обслуживание и\nПоддержка',
    'services.maintenance-support.description': 'Мы поддерживаем ваш магазин обновленным, безопасным и работающим без необходимости беспокоиться о технических деталях',
    'services.pricing': 'От €1,000',
    
    // Process
    'process.title': 'Как Мы Работаем',
    'process.title.prefix': '',
    'process.step.1.title': 'Изучение',
    'process.step.1.description': 'Мы узнаем о вашем бизнесе, продуктах и о том, чего вы хотите достичь с помощью вашего интернет-магазина.',
    'process.step.2.title': 'Планирование',
    'process.step.2.description': 'Мы проектируем структуру вашего магазина, страницы и необходимые функции.',
    'process.step.3.title': 'Разработка',
    'process.step.3.description': 'Мы создаем ваш магазин с учетом ваших отзывов, внося корректировки по ходу работы',
    'process.step.4.title': 'Запуск',
    'process.step.4.description': 'Мы тщательно тестируем все и запускаем ваш магазин',
    'process.step.5.title': 'Поддержка',
    'process.step.5.description': 'Обслуживание и поддержка после запуска, чтобы ваш магазин работал бесперебойно',
    
    // Blog
    'blog.title': 'Блог',
    'blog.cta.desktop': 'Посмотреть Все Статьи',
    'blog.cta.mobile': 'Блог',
    'blog.readMore': 'Читать Далее',
    'blog.emptyState': 'В этой категории пока нет статей.',
    
    // CTA
    'cta.title': 'Готовы Начать Продавать Онлайн?',
    'cta.description': 'Давайте поговорим о вашем бизнесе и о том, как интернет-магазин может помочь вам расти.',
    'cta.button.contact': 'Свяжитесь с нами',
    
    // Contact
    'contact.title': 'Свяжитесь с Нами',
    'contact.title.prefix': '',
    'contact.form.title': 'Отправьте Нам Сообщение',
    'contact.form.title.highlight': 'Сообщение',
    'contact.schedule.title': 'Забронировать Звонок',
    'contact.schedule.title.highlight': 'Звонок',
    'contact.schedule.description': 'Предпочитаете обсудить ваш проект по телефону?\nЗабронируйте удобное для вас время.',
    'contact.schedule.button': 'Забронировать Звонок',
    'contact.form.service.ecommerce': 'Разработка E-commerce',
    'contact.form.service.custom': 'Индивидуальная Разработка',
    'contact.form.service.ai': 'Интеграция ИИ',
    'contact.form.service.seo': 'SEO и GEO Оптимизация',
    'contact.form.service.integrations': 'Интеграции и Расширения',
    'contact.form.service.maintenance': 'Обслуживание и Поддержка',
    'contact.form.service.other': 'Другое / Не Уверен',
    
    // Footer
    'footer.description': 'Интернет-магазины, разработанные для помощи вашему бизнесу в продажах онлайн.',
    'footer.quickLinks': 'Быстрые Ссылки',
    'footer.connect': 'Связаться',
    'footer.copyright': '© {year} NeoPress',
    
    // About
    'about.title': 'О NeoPress',
    'about.content': 'Мы — агентство по разработке электронной коммерции, ориентированное на помощь бизнесу в продажах онлайн.\n\nНаша команда имеет обширный опыт работы с платформами и технологиями, которые мы используем — WordPress, Shopify, WooCommerce и инструменты, которые заставляют интернет-магазины работать.\n\nМы работаем с бизнесом на любом этапе: продаете ли вы свой первый продукт онлайн или развиваете уже существующий магазин. Наш фокус прост: создавать магазины, которые хорошо работают и помогают вам делать больше продаж.\n\nМы базируемся в Сербии и работаем с клиентами локально и международно.',
    'contact.form.label.name': 'Имя',
    'contact.form.label.email': 'Эл. почта',
    'contact.form.label.service': 'Интересующая услуга',
    'contact.form.label.message': 'Сообщение',
    'contact.form.success.sendAnother': 'Отправить ещё сообщение',
    '404.title': 'Страница не найдена',
    '404.description': 'Страница, которую вы ищете, не существует или была перемещена. Давайте вернем вас на правильный путь.',
    '404.goHome': 'На главную',
    '404.goBack': 'Назад',
    '404.helpText': 'Ищете что-то конкретное?',
    'blogPost.share': 'Поделиться:',
    'blogPost.featuredImage': 'Изображение',
    'blogPost.relatedArticles': 'Похожие статьи',
    'blogPost.cta.title': 'Нужна помощь?',
    'blogPost.cta.description': 'Мы можем помочь вам реализовать эти стратегии и многое другое. Давайте обсудим ваш проект.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get from localStorage or default to 'en'
    const saved = localStorage.getItem('language') as Language;
    return (saved && ['en', 'sr', 'ru'].includes(saved)) ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string): string => {
    const translation = translations[language]?.[key];
    if (translation) {
      // Replace placeholders like {year}
      return translation.replace(/\{(\w+)\}/g, (match, placeholder) => {
        if (placeholder === 'year') {
          return new Date().getFullYear().toString();
        }
        return match;
      });
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

