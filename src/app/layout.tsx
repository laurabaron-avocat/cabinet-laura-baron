import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CookieConsent from '@/components/ui/CookieConsent';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Maître Laura Baron • Avocat Dommage Corporel | Bayonne & Toulouse',
    template: '%s | Maître Laura Baron • Avocat',
  },
  description: 'Avocat spécialisé en dommage corporel et indemnisation des victimes. Accidents de la route (Loi Badinter), accidents médicaux (CCI/ONIAM), agressions (CIVI). Bayonne & Toulouse.',
  keywords: ['avocat', 'dommage corporel', 'indemnisation', 'accident', 'Bayonne', 'Toulouse', 'Loi Badinter', 'CIVI', 'CCI', 'ONIAM'],
  authors: [{ name: 'Maître Laura Baron' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://maitre-laura-baron.fr',
    siteName: 'Maître Laura Baron - Avocat',
    title: 'Maître Laura Baron • Avocat Dommage Corporel | Bayonne & Toulouse',
    description: 'Avocat spécialisé en dommage corporel et indemnisation des victimes. Expertise en accidents de la route, médicaux, agressions. Bayonne & Toulouse.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maître Laura Baron • Avocat Dommage Corporel',
    description: 'Avocat spécialisé en dommage corporel et indemnisation des victimes. Bayonne & Toulouse.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}