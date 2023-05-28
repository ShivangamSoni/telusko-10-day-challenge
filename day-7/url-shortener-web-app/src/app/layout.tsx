import './globals.css';
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
        {children}
      </body>
    </html>
  );
}
