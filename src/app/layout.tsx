
'use client';

import './globals.css';
import { NavigationHeader } from './components/NavigationHeader';
import StickyFooter from './components/StickyFooter';
import Footer from './components/Footer';
import { SessionProvider } from 'next-auth/react';
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
      <body
        className="min-h-screen flex flex-col bg-white dark:bg-gray-900"
        suppressHydrationWarning // Add this to suppress the warning
      >
        <SessionProvider>
          <NavigationHeader />
          <main className="flex-grow">{children}</main>
          <StickyFooter />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

