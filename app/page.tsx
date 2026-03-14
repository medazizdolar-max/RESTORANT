'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Star, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Clock,
  Menu as MenuIcon,
  X,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import { db, handleFirestoreError, OperationType } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { translations, Language } from '@/lib/translations';

// --- Components ---
// Trigger rebuild


const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang].nav;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ivory/80 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-bold tracking-tighter text-terracotta">THE OLD MILL</span>
          <span className="text-[10px] uppercase tracking-[0.2em] -mt-1 opacity-70">Restaurant & Café</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium">
          <a href="#about" className="hover:text-terracotta transition-colors">{t.about}</a>
          <a href="#menu" className="hover:text-terracotta transition-colors">{t.menu}</a>
          <a href="#gallery" className="hover:text-terracotta transition-colors">{t.atmosphere}</a>
          <a href="#visit" className="hover:text-terracotta transition-colors">{t.visit}</a>
          <a href="/admin" className="hover:text-terracotta transition-colors">{t.admin}</a>
          <a href="#reserve" className="px-5 py-2 bg-terracotta text-ivory rounded-full hover:bg-charcoal transition-all">{t.reserve}</a>
          
          <div className="flex items-center space-x-2 border-l border-charcoal/10 pl-6">
            <button onClick={() => setLang('en')} className={`hover:text-terracotta transition-colors ${lang === 'en' ? 'text-terracotta font-bold' : ''}`}>EN</button>
            <span className="opacity-20">|</span>
            <button onClick={() => setLang('fr')} className={`hover:text-terracotta transition-colors ${lang === 'fr' ? 'text-terracotta font-bold' : ''}`}>FR</button>
            <span className="opacity-20">|</span>
            <button onClick={() => setLang('ar')} className={`hover:text-terracotta transition-colors ${lang === 'ar' ? 'text-terracotta font-bold' : ''}`}>AR</button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
           <button onClick={() => setLang(lang === 'ar' ? 'en' : lang === 'en' ? 'fr' : 'ar')} className="p-2 bg-charcoal/5 rounded-full">
            <Globe size={18} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-ivory border-b border-charcoal/5 px-6 py-8 flex flex-col space-y-6 text-center uppercase tracking-widest"
        >
          <a href="#about" onClick={() => setIsOpen(false)}>{t.about}</a>
          <a href="#menu" onClick={() => setIsOpen(false)}>{t.menu}</a>
          <a href="#gallery" onClick={() => setIsOpen(false)}>{t.atmosphere}</a>
          <a href="#visit" onClick={() => setIsOpen(false)}>{t.visit}</a>
          <a href="/admin" onClick={() => setIsOpen(false)}>{t.admin}</a>
          <a href="#reserve" className="text-terracotta font-bold" onClick={() => setIsOpen(false)}>{t.reserve}</a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://picsum.photos/seed/fes-medina-sunset/1920/1080" 
          alt="Old Fès Sunset" 
          fill 
          className="object-cover scale-105"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-terracotta/20 to-charcoal/60" />
        <div className="absolute inset-0 bg-noise opacity-20" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block mb-4 text-ivory/80 uppercase tracking-[0.4em] text-xs md:text-sm font-medium">
            {t.location}
          </span>
          <h1 className="text-6xl md:text-9xl font-serif text-ivory leading-none mb-6 drop-shadow-2xl">
            {t.title}
          </h1>
          <p className="text-ivory/90 text-lg md:text-2xl font-serif italic mb-10 max-w-2xl mx-auto text-balance">
            &quot;{t.subtitle}&quot;
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="#reserve" 
              className="px-8 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-ivory transition-all transform hover:-translate-y-1"
            >
              {t.reserve}
            </a>
            <a 
              href="#menu" 
              className="px-8 py-4 border border-ivory text-ivory font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-ivory/10 transition-all"
            >
              {t.viewMenu}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory/50"
      >
        <div className="w-[1px] h-12 bg-ivory/30 mx-auto mb-2" />
        <span className="text-[10px] uppercase tracking-widest">{t.scroll}</span>
      </motion.div>
    </section>
  );
};

const About = ({ lang }: { lang: Language }) => {
  const t = translations[lang].about;
  return (
    <section id="about" className="py-24 px-6 bg-ivory relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="w-12 h-[1px] bg-terracotta mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-charcoal">
            {t.title} <br />
            <span className="text-xl italic text-terracotta">{t.subtitle}</span>
          </h2>
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-charcoal/80 mb-6 text-balance">
            {t.p1}
          </p>
          <p className="text-lg text-charcoal/70">
            {t.p2}
          </p>
        </motion.div>
      </div>
      
      {/* Decorative Zellige */}
      <div className="absolute top-0 left-0 w-32 h-32 zellige-pattern opacity-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 zellige-pattern opacity-10" />
    </section>
  );
};

const MenuHighlights = ({ lang }: { lang: Language }) => {
  const t = translations[lang].menu;
  const items = [
    { id: 'tajine', name: t.tajine, desc: t.tajineDesc, mention: `32 ${t.reviews}`, img: "/tajine_hero.webp" },
    { id: 'meat-tajine', name: t.meatTajine, desc: t.meatTajineDesc, mention: `45 ${t.reviews}`, img: "/meat_tajine.webp" },
    { id: 'pastilla', name: t.pastilla, desc: t.pastillaDesc, mention: `28 ${t.reviews}`, img: "/pastilla.webp" },
    { id: 'couscous', name: t.couscous, desc: t.couscousDesc, mention: `22 ${t.reviews}`, img: "/couscous.webp" },
  ];

  return (
    <section id="menu" className="py-24 px-6 bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-gold uppercase tracking-[0.3em] text-sm mb-2 block">{t.tagline}</span>
            <h2 className="text-5xl md:text-6xl font-serif">{t.title}</h2>
            <p className="text-ivory/50 italic">{t.subtitle}</p>
          </div>
          <div className={`${lang === 'ar' ? 'text-left' : 'text-right'}`}>
            <p className="text-sm uppercase tracking-widest opacity-60">{t.priceRange}</p>
            <p className="text-2xl font-serif text-gold">50 – 100 MAD</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <Link key={idx} href={`/menu/${item.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
              >
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="text-[10px] uppercase tracking-widest text-gold mb-1 block">{item.mention}</span>
                  <h3 className="text-2xl font-serif mb-1">{item.name}</h3>
                  <p className="text-sm text-ivory/60 line-clamp-2">{item.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-ivory/40 text-sm italic mb-4">{t.footer}</p>
          <div className="inline-flex items-center space-x-2 text-gold border-b border-gold/30 pb-1 cursor-pointer hover:text-ivory hover:border-ivory transition-all">
            <span className="uppercase tracking-widest text-xs font-bold">{t.download}</span>
            <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Atmosphere = ({ lang }: { lang: Language }) => {
  const t = translations[lang].atmosphere;
  return (
    <section id="gallery" className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">{t.title}</h2>
          <p className="text-terracotta italic">&quot;{t.quote}&quot;</p>
          <p className="text-charcoal/40 text-sm mt-2 uppercase tracking-widest">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-sm">
            <Image src="/tajine_hero.webp" alt={t.terrace} fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative overflow-hidden rounded-sm">
            <Image src="/meat_tajine.webp" alt={t.interior} fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="relative overflow-hidden rounded-sm">
            <Image src="/pastilla.webp" alt={t.detail} fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
          <div className="col-span-2 relative overflow-hidden rounded-sm">
            <Image src="/couscous.webp" alt={t.sunset} fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = ({ lang }: { lang: Language }) => {
  const t = translations[lang].reviews;
  const reviews = [
    { name: "Sarah J.", text: lang === 'ar' ? "أفضل طاجين تناولته في المغرب. منظر باب بوجلود عند الغروب ساحر." : lang === 'fr' ? "Le meilleur Tajine que j'ai mangé au Maroc. La vue sur la Porte Bleue au coucher du soleil est magique." : "The best Tajine I've had in Morocco. The view of the Blue Gate at sunset is magical.", rating: 5 },
    { name: "Marc D.", text: lang === 'ar' ? "خدمة ممتازة وأجواء دافئة. شاي النعناع مثالي." : lang === 'fr' ? "Excellent service et ambiance chaleureuse. Le thé à la menthe est parfait." : "Excellent service and warm atmosphere. The mint tea is perfect.", rating: 5 },
    { name: "Elena R.", text: lang === 'ar' ? "جوهرة خفية بالقرب من باب بوجلود. نكهات أصيلة وأسعار معقولة جداً." : lang === 'fr' ? "Un joyau caché près de Bab Boujloud. Saveurs authentiques et prix très raisonnables." : "A hidden gem near Bab Boujloud. Authentic flavors and very reasonable prices.", rating: 4 },
  ];

  return (
    <section className="py-24 px-6 bg-terracotta text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <h2 className="text-4xl font-serif">{t.title}</h2>
          <div className="flex items-center space-x-3 bg-ivory/10 px-4 py-2 rounded-full">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4.7 ? "currentColor" : "none"} />)}
            </div>
            <span className="font-bold">4.7</span>
            <span className="text-xs opacity-60">366 {t.googleReviews}</span>
          </div>
        </div>

        <div className="flex space-x-6 overflow-x-auto pb-8 snap-x no-scrollbar">
          {reviews.map((rev, idx) => (
            <div key={idx} className="min-w-[300px] md:min-w-[400px] bg-ivory p-8 rounded-sm snap-center text-charcoal">
              <div className="flex text-gold mb-4">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg font-serif italic mb-6 leading-relaxed">&quot;{rev.text}&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-terracotta" />
                <span className="uppercase tracking-widest text-xs font-bold">{rev.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReservationForm = ({ lang }: { lang: Language }) => {
  const t = translations[lang].reservation;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await addDoc(collection(db, 'reservations'), {
        ...formData,
        guests: Number(formData.guests),
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2 });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'reservations');
      setStatus('error');
    }
  };

  return (
    <div id="reserve" className="py-24 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto bg-charcoal text-ivory rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="md:w-1/3 bg-terracotta p-12 flex flex-col justify-center">
          <h3 className="text-3xl font-serif mb-6">{t.title}</h3>
          <p className="text-ivory/80 text-sm mb-8 italic">{t.desc}</p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center space-x-3">
              <Phone size={16} className="text-gold" />
              <span dir="ltr">06 63 83 24 35</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock size={16} className="text-gold" />
              <span dir="ltr">09:00 – 23:00</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 p-12">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <CheckCircle2 size={64} className="text-gold" />
              <h4 className="text-2xl font-serif">{t.successTitle}</h4>
              <p className="text-ivory/60">{t.successDesc}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-gold border-b border-gold/30 pb-1 text-sm uppercase tracking-widest font-bold"
              >
                {t.another}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">{t.fullName}</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">{t.email}</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">{t.phone}</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">{t.guests}</label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                    className="w-full bg-transparent border-b border-ivory/20 py-2 focus:border-gold outline-none transition-colors appearance-none"
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-charcoal">{n} {t.guestsCount}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">{t.date}</label>
                  <input 
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-50">{t.time}</label>
                  <input 
                    required
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-transparent border-b border-ivory/20 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>
              
              {status === 'error' && (
                <div className="flex items-center space-x-2 text-red-400 text-xs">
                  <AlertCircle size={14} />
                  <span>{t.error}</span>
                </div>
              )}

              <button 
                disabled={status === 'loading'}
                type="submit"
                className="w-full py-4 bg-gold text-charcoal font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-ivory transition-all disabled:opacity-50"
              >
                {status === 'loading' ? t.sending : t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const VisitUs = ({ lang }: { lang: Language }) => {
  const t = translations[lang].visit;
  return (
    <section id="visit" className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-terracotta uppercase tracking-[0.3em] text-sm mb-2 block">{t.tagline}</span>
          <h2 className="text-5xl font-serif mb-8 text-charcoal">{t.title}</h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-terracotta/10 rounded-full text-terracotta">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-1">{t.address}</h4>
                <p className="text-lg text-charcoal/80">{t.addressVal}</p>
                <p className="text-sm text-charcoal/40 mt-1">{t.googleMapsCode}: 3268+JC</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-terracotta/10 rounded-full text-terracotta">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-1">{t.phone}</h4>
                <p className="text-lg text-charcoal/80" dir="ltr">06 63 83 24 35</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-terracotta/10 rounded-full text-terracotta">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-1">{t.hours}</h4>
                <p className="text-lg text-charcoal/80">{t.hoursVal}</p>
                <p className="text-sm text-charcoal/40 mt-1">{t.dineIn}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-video bg-charcoal/5 rounded-sm overflow-hidden border border-charcoal/10">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d52756.4929090231!2d-6.6415795!3d34.2668909!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7575e7fbf9f4f%3A0x9fb097307281abbd!2sRazane%20H%C3%B4tel!5e0!3m2!1sfr!2sma!4v1773464166641!5m2!1sfr!2sma" 
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  return (
    <footer className="py-16 px-6 bg-charcoal text-ivory border-t border-ivory/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="flex flex-col mb-4">
            <span className="font-serif text-3xl font-bold tracking-tighter text-gold">THE OLD MILL</span>
            <span className="text-xs uppercase tracking-[0.3em] opacity-50">Restaurant & Café</span>
          </div>
          <p className="text-ivory/40 text-sm max-w-xs italic">&quot;{translations[lang].hero.subtitle}&quot;</p>
        </div>

        <div className="flex space-x-8">
          <a href="/admin" className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">{translations[lang].nav.admin}</a>
          <a href="#" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs uppercase tracking-widest opacity-40 mb-2">{t.rights}</p>
          <p className="text-[10px] opacity-30">{t.location}</p>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-ivory" />;
  }

  return (
    <main className={`relative bg-ivory min-h-screen selection:bg-terracotta selection:text-ivory ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <MenuHighlights lang={lang} />
      <Atmosphere lang={lang} />
      <Reviews lang={lang} />
      <ReservationForm lang={lang} />
      <VisitUs lang={lang} />
      <Footer lang={lang} />
      
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] bg-noise opacity-[0.03]" />
    </main>
  );
}
