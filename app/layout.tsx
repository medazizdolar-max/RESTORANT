import type {Metadata} from 'next';
import { Cormorant_Garamond, Inter, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'The Old Mill Restaurant & Café | Fès, Morocco',
  description: 'Experience the heart of Old Fès at The Old Mill. Traditional Moroccan cuisine, mint tea, and stunning sunsets near the Blue Gate.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${notoArabic.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#FFFFF0] text-[#333333] antialiased">
        {children}
      </body>
    </html>
  );
}
