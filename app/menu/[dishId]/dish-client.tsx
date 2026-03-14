'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Facebook, Twitter, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { translations, Language } from '@/lib/translations';

const dishMap: Record<string, { name: string, desc: string, price: string, ingredients: string, img: string }> = {
  'tajine': { name: 'tajine', desc: 'tajineDesc', price: 'tajinePrice', ingredients: 'tajineIngredients', img: '/tajine_hero.webp' },
  'meat-tajine': { name: 'meatTajine', desc: 'meatTajineDesc', price: 'meatTajinePrice', ingredients: 'meatTajineIngredients', img: '/meat_tajine.webp' },
  'pastilla': { name: 'pastilla', desc: 'pastillaDesc', price: 'pastillaPrice', ingredients: 'pastillaIngredients', img: '/pastilla.webp' },
  'couscous': { name: 'couscous', desc: 'couscousDesc', price: 'couscousPrice', ingredients: 'couscousIngredients', img: '/couscous.webp' },
};

export default function DishClient({ dishId }: { dishId: string }) {
  const router = useRouter();
  const [lang] = React.useState<Language>('en'); 
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const dish = dishMap[dishId];

  if (!dish) {
    return <div className="min-h-screen flex items-center justify-center">Dish not found</div>;
  }

  const t = translations[lang].menu;
  const title = t[dish.name as keyof typeof t] as string;
  const shareText = `Check out this delicious dish: ${title}`;

  return (
    <main className="min-h-screen bg-ivory py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center space-x-2 text-charcoal/60 hover:text-terracotta mb-8">
          <ChevronLeft size={20} />
          <span>Back to Menu</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ivory rounded-sm shadow-xl overflow-hidden"
        >
          <div className="relative aspect-video">
            <Image 
              src={dish.img} 
              alt={title} 
              fill 
              className="object-cover" 
              referrerPolicy="no-referrer" 
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">{title}</h1>
            <p className="text-xl text-charcoal/80 mb-6">{t[dish.desc as keyof typeof t] as string}</p>
            
            <div className="flex items-center justify-between border-t border-charcoal/10 pt-6">
              <span className="text-2xl font-serif text-gold">{t[dish.price as keyof typeof t] as string}</span>
              
              <div className="flex gap-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  <Facebook size={20} />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition">
                  <Twitter size={20} />
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            {dish.ingredients && (
              <div className="mt-6">
                <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Ingredients</h4>
                <p className="text-charcoal/60">{t[dish.ingredients as keyof typeof t] as string}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
