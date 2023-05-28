import '@/app/globals.css';
import Header from '@/components/Header';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'URL Shortener',
  description: 'Shorten Your URLs. The Shorter the Better',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bg-main text-primary-slate`}>
        <div className="min-h-screen w-[min(1280px,96%)] mx-auto grid grid-rows-[auto_1fr] pb-4">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
