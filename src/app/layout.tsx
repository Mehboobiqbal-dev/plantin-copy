import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Dour - Visites Virtuelles Immersives",
  description: "Visites virtuelles 3D, création de contenu, sites web, photos HDR et Google Maps pour entreprises. Basé à Alger, au service de Hainaut et au-delà.",
  icons: {
    icon: "/images/3d-dour.jpeg", // Replaces Next.js favicon
    apple: "/apple-touch-icon.png", // iOS bookmark icon
    shortcut: "/android-chrome-192x192.png", // Android/PWA icon
  },
  openGraph: {
    title: "3D Dour - Visites Virtuelles Immersives",
    description: "Visites virtuelles 3D, création de contenu, sites web, photos HDR et Google Maps pour entreprises.",
    images: [
      {
        url: "/images/logo.png", // Company logo for social sharing
        width: 800,
        height: 600,
        alt: "Logo 3D Dour",
      },
    ],
    url: "https://your-site-url.com", // Replace with your site URL
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Dour - Visites Virtuelles Immersives",
    description: "Visites virtuelles 3D, création de contenu, sites web, photos HDR et Google Maps pour entreprises.",
    images: ["/images/logo.png"], // Company logo for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body className={`${inter.variable} antialiased bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}