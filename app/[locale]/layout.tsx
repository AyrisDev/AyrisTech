import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n/config';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RouteTracker from "@/components/RouteTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ayristech.com'),
  title: {
    default: "Ayris Tech | Forging the Future with AI & Blockchain",
    template: "%s | Ayris Tech"
  },
  description: "Ayris Tech delivers enterprise-grade digital transformation. We build the impossible for the next generation of business using AI, Blockchain, and modern web technologies.",
  keywords: ["AI Solutions", "Blockchain Development", "Enterprise Software", "Digital Transformation", "Web3", "Machine Learning"],
  authors: [{ name: "Ayris Tech" }],
  creator: "Ayris Tech",
  publisher: "Ayris Tech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Ayris Tech | Forging the Future with AI & Blockchain",
    description: "Ayris Tech delivers enterprise-grade digital transformation. We build the impossible for the next generation of business.",
    url: 'https://ayristech.com',
    siteName: 'Ayris Tech',
    images: [
      {
        url: 'https://ayristech.com/og-image.jpg', // Placeholder, user should upload this
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ayris Tech | Forging the Future with AI & Blockchain",
    description: "Ayris Tech delivers enterprise-grade digital transformation.",
    images: ['https://ayristech.com/og-image.jpg'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'tr': '/tr',
    },
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <RouteTracker />
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>

      </body>

    </html>
  );
}

