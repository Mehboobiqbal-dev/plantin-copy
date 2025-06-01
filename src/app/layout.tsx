'use client';

import './globals.css';
import { Poppins } from 'next/font/google';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <link rel="icon" href="/favicon.png" />
      <body
        className="min-h-screen flex flex-col bg-white text-black"
        suppressHydrationWarning
      >
        
            <main className="flex-grow bg-white">{children}</main>
            
      </body>
    </html>
  );
}