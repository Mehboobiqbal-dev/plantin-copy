import './globals.css';
import { NavigationHeader } from './components/NavigationHeader';
import StickyFooter from './components/StickyFooter';
import Footer from './components/Footer';
import { SessionWrapper } from './SessionWrapper'; // Import the Client Component
import { metadata } from './metadata'; // Import metadata from the Server Component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col bg-white dark:bg-gray-900"
        suppressHydrationWarning
      >
        <SessionWrapper>
          <NavigationHeader />
          <main className="flex-grow">{children}</main>
          <StickyFooter />
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}