'use client';
 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
 
type Lang = 'en' | 'fr' | 'ar';
 
interface DishData {
  name: { en: string; fr: string; ar: string };
  description: { en: string; fr: string; ar: string };
  price: string;
  img: string;
  time: string;
  rating: number;
  reviews: number;
  tag: { en: string; fr: string; ar: string };
  ingredients: { en: string[]; fr: string[]; ar: string[] };
}
 
const dishes: Record<string, DishData> = {
  tajine: {
    name: { en: 'Vegetable Tajine', fr: 'Tajine aux Légumes', ar: 'طاجين خضار' },
    description: {
      en: 'A slow-cooked symphony of seasonal vegetables, saffron, preserved lemon and aromatic spices — crafted the way it has been done in Fès for centuries. Served piping hot with freshly baked khobz bread.',
      fr: "Une symphonie de légumes de saison cuits à l'étouffée, safran, citron confit et épices aromatiques — préparée comme à Fès depuis des siècles. Servie brûlante avec du pain khobz frais.",
      ar: 'سيمفونية من الخضروات الموسمية المطهوة ببطء مع الزعفران والليمون المعصفر والتوابل العطرية — محضّرة كما كانت تُصنع في فاس منذ قرون. تُقدّم ساخنة مع خبز طازج.',
    },
    price: '55 MAD',
    img: '/tajine_hero.webp',
    time: '45 min',
    rating: 4.8,
    reviews: 32,
    tag: { en: 'Vegetarian', fr: 'Végétarien', ar: 'نباتي' },
    ingredients: {
      en: ['Carrots', 'Zucchini', 'Potatoes', 'Chickpeas', 'Saffron', 'Preserved lemon', 'Coriander', 'Cumin', 'Olive oil'],
      fr: ["Carottes", "Courgettes", "Pommes de terre", "Pois chiches", "Safran", "Citron confit", "Coriandre", "Cumin", "Huile d'olive"],
      ar: ['جزر', 'كوسة', 'بطاطا', 'حمص', 'زعفران', 'ليمون مخلل', 'كزبرة', 'كمون', 'زيت زيتون'],
    },
  },
  'meat-tajine': {
    name: { en: 'Meat Tajine with Prunes', fr: 'Tajine de Viande aux Pruneaux', ar: 'طاجين اللحم بالبرقوق' },
    description: {
      en: 'Tender slow-braised lamb shoulder with golden prunes, toasted almonds and a touch of honey — a jewel of Fassi cuisine. The deep, caramelized sauce is an heirloom recipe passed down through generations.',
      fr: "Épaule d'agneau braisée avec des pruneaux dorés, des amandes grillées et une touche de miel — un joyau de la cuisine fassi. La sauce caramélisée est une recette transmise de génération en génération.",
      ar: 'كتف ضأن مطهوّ ببطء مع برقوق ذهبي ولوز محمّص ولمسة عسل — جوهرة حقيقية من المطبخ الفاسي الأصيل. الصلصة المكرملة وصفة توارثتها الأجيال.',
    },
    price: '85 MAD',
    img: '/meat_tajine.webp',
    time: '90 min',
    rating: 4.9,
    reviews: 45,
    tag: { en: "Chef's Special", fr: 'Spécialité du Chef', ar: 'تخصص الشيف' },
    ingredients: {
      en: ['Lamb shoulder', 'Prunes', 'Almonds', 'Honey', 'Cinnamon', 'Ginger', 'Saffron', 'Onion', 'Sesame seeds'],
      fr: ["Épaule d'agneau", 'Pruneaux', 'Amandes', 'Miel', 'Cannelle', 'Gingembre', 'Safran', 'Oignon', 'Graines de sésame'],
      ar: ['كتف ضأن', 'برقوق', 'لوز', 'عسل', 'قرفة', 'زنجبيل', 'زعفران', 'بصل', 'سمسم'],
    },
  },
  pastilla: {
    name: { en: 'Chicken Pastilla', fr: 'Pastilla au Poulet', ar: 'بسطيلة الدجاج' },
    description: {
      en: 'The crown jewel of Moroccan cuisine — crispy warqa pastry layered with spiced chicken, eggs, cinnamon and powdered sugar. A magical interplay of sweet, savory and crunchy that has graced royal tables for centuries.',
      fr: 'Le joyau de la cuisine marocaine — pâte warqa croustillante garnie de poulet épicé, œufs, cannelle et sucre glace. Un équilibre magique entre sucré, salé et craquant.',
      ar: 'تاج المطبخ المغربي — عجينة الورقة المقرمشة محشوّة بالدجاج المتبّل والبيض والقرفة والسكر البودرة. توازن سحري بين الحلو والمالح والمقرمش.',
    },
    price: '70 MAD',
    img: '/pastilla.webp',
    time: '60 min',
    rating: 4.7,
    reviews: 28,
    tag: { en: 'Signature Dish', fr: 'Plat Signature', ar: 'طبق مميز' },
    ingredients: {
      en: ['Chicken', 'Warqa pastry', 'Eggs', 'Almonds', 'Cinnamon', 'Powdered sugar', 'Saffron', 'Parsley', 'Butter'],
      fr: ['Poulet', 'Pâte warqa', 'Œufs', 'Amandes', 'Cannelle', 'Sucre glace', 'Safran', 'Persil', 'Beurre'],
      ar: ['دجاج', 'ورقة', 'بيض', 'لوز', 'قرفة', 'سكر بودرة', 'زعفران', 'بقدونس', 'زبدة'],
    },
  },
  couscous: {
    name: { en: 'Friday Couscous', fr: 'Couscous du Vendredi', ar: 'كسكس الجمعة' },
    description: {
      en: 'Our Friday ritual — hand-rolled semolina steamed three times to cloud-like perfection, crowned with seven vegetables, braised lamb and a rich onion-raisin tfaya. A dish that brings families together every week.',
      fr: 'Notre rituel du vendredi — semoule roulée à la main et cuite trois fois à la vapeur, couronnée de sept légumes, agneau braisé et une tfaya généreuse aux oignons et raisins secs.',
      ar: 'طقوسنا يوم الجمعة — سميد مدلوك يدوياً ومطهو بالبخار ثلاث مرات، مُكلَّل بسبعة خضروات وضأن مطهو وتفاية غنية بالبصل والزبيب.',
    },
    price: '65 MAD',
    img: '/couscous.webp',
    time: '120 min',
    rating: 4.8,
    reviews: 22,
    tag: { en: 'Friday Only', fr: 'Vendredi Seulement', ar: 'الجمعة فقط' },
    ingredients: {
      en: ['Semolina', 'Lamb', 'Carrots', 'Turnips', 'Zucchini', 'Chickpeas', 'Raisins', 'Onion', 'Ras el hanout'],
      fr: ['Semoule', 'Agneau', 'Carottes', 'Navets', 'Courgettes', 'Pois chiches', 'Raisins secs', 'Oignon', 'Ras el hanout'],
      ar: ['سميد', 'ضأن', 'جزر', 'لفت', 'كوسة', 'حمص', 'زبيب', 'بصل', 'رأس الحانوت'],
    },
  },
};
 
const labels = {
  back: { en: 'Back to Menu', fr: 'Retour au Menu', ar: 'العودة للقائمة' },
  ingredients: { en: 'Ingredients', fr: 'Ingrédients', ar: 'المكونات' },
  cookTime: { en: 'Cook Time', fr: 'Temps de Cuisson', ar: 'وقت الطهي' },
  rating: { en: 'Rating', fr: 'Note', ar: 'التقييم' },
  reviews: { en: 'reviews', fr: 'avis', ar: 'تقييم' },
  reserve: { en: 'Reserve a Table', fr: 'Réserver une Table', ar: 'احجز طاولة' },
  notFound: { en: 'Dish not found', fr: 'Plat introuvable', ar: 'الطبق غير موجود' },
};
 
export default function DishPage() {
  const params = useParams();
  const id = params?.id as string;
  const [lang, setLang] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    // Sync lang with localStorage if you store it, otherwise default to 'en'
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored && ['en', 'fr', 'ar'].includes(stored)) setLang(stored);
  }, []);
 
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);
 
  if (!mounted) return <div className="min-h-screen bg-ivory" />;
 
  const dish = dishes[id];
 
  if (!dish) {
    return (
      <main className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-serif text-charcoal/50 mb-6">{labels.notFound[lang]}</p>
          <Link href="/#menu" className="text-terracotta uppercase tracking-widest text-sm font-bold border-b border-terracotta/30 pb-1">
            {labels.back[lang]}
          </Link>
        </div>
      </main>
    );
  }
 
  const isRtl = lang === 'ar';
 
  return (
    <main className={`relative bg-ivory min-h-screen selection:bg-terracotta selection:text-ivory ${isRtl ? 'font-arabic' : ''}`}>
 
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-ivory/80 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tighter text-terracotta">THE OLD MILL</span>
            <span className="text-[10px] uppercase tracking-[0.2em] -mt-1 opacity-70">Restaurant & Café</span>
          </Link>
          <div className="flex items-center space-x-2 text-sm">
            {(['en', 'fr', 'ar'] as Lang[]).map((l, i, arr) => (
              <React.Fragment key={l}>
                <button
                  onClick={() => setLang(l)}
                  className={`uppercase tracking-widest text-xs font-bold transition-colors hover:text-terracotta ${lang === l ? 'text-terracotta' : 'opacity-40'}`}
                >
                  {l}
                </button>
                {i < arr.length - 1 && <span className="opacity-20">|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>
 
      {/* ── Hero Image ── */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={dish.img}
          alt={dish.name[lang]}
          fill
          className="object-cover scale-105"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/80" />
 
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-24 left-6 z-10"
        >
          <Link
            href="/#menu"
            className="flex items-center space-x-2 text-ivory/80 hover:text-ivory transition-colors group"
          >
            <ArrowLeft size={18} className={`transition-transform group-hover:-translate-x-1 ${isRtl ? 'rotate-180' : ''}`} />
            <span className="text-xs uppercase tracking-widest font-bold">{labels.back[lang]}</span>
          </Link>
        </motion.div>
 
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-12 left-6 right-6 max-w-7xl mx-auto"
        >
          <span className="inline-block px-3 py-1 bg-gold text-charcoal text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm mb-4">
            {dish.tag[lang]}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-ivory drop-shadow-2xl leading-none">
            {dish.name[lang]}
          </h1>
        </motion.div>
      </section>
 
      {/* ── Content ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
 
        {/* Left — Description + Ingredients */}
        <div className="lg:col-span-2 space-y-12">
 
          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-8 pb-8 border-b border-charcoal/10"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-terracotta/10 rounded-full text-terracotta">
                <Star size={18} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50">{labels.rating[lang]}</p>
                <p className="font-serif text-xl text-charcoal">
                  {dish.rating} <span className="text-sm text-charcoal/40">({dish.reviews} {labels.reviews[lang]})</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-terracotta/10 rounded-full text-terracotta">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50">{labels.cookTime[lang]}</p>
                <p className="font-serif text-xl text-charcoal">{dish.time}</p>
              </div>
            </div>
          </motion.div>
 
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-8 h-[1px] bg-terracotta mb-6" />
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-charcoal/80 text-balance">
              {dish.description[lang]}
            </p>
          </motion.div>
 
          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-terracotta mb-6 font-bold">
              {labels.ingredients[lang]}
            </h2>
            <div className="flex flex-wrap gap-3">
              {dish.ingredients[lang].map((ing, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="px-4 py-2 border border-charcoal/15 text-sm text-charcoal/70 rounded-sm hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  {ing}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
 
        {/* Right — Price Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-28 bg-charcoal text-ivory rounded-sm p-8 space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Prix / السعر</p>
              <p className="text-5xl font-serif text-gold">{dish.price}</p>
            </div>
 
            <div className="w-full h-[1px] bg-ivory/10" />
 
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(dish.rating) ? 'currentColor' : 'none'} />
              ))}
              <span className="text-xs text-ivory/50 ml-2">{dish.rating}/5</span>
            </div>
 
            <Link
              href="/#reserve"
              className="flex items-center justify-center space-x-2 w-full py-4 bg-gold text-charcoal font-bold uppercase tracking-widest text-sm rounded-sm hover:bg-ivory transition-all transform hover:-translate-y-1"
            >
              <span>{labels.reserve[lang]}</span>
              <ChevronRight size={16} className={isRtl ? 'rotate-180' : ''} />
            </Link>
 
            <Link
              href="/#menu"
              className="flex items-center justify-center space-x-2 w-full py-3 border border-ivory/20 text-ivory/60 text-sm uppercase tracking-widest rounded-sm hover:border-ivory/60 hover:text-ivory transition-all"
            >
              <ArrowLeft size={14} className={isRtl ? 'rotate-180' : ''} />
              <span>{labels.back[lang]}</span>
            </Link>
          </div>
        </motion.div>
      </section>
 
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] bg-noise opacity-[0.03]" />
    </main>
  );
}
