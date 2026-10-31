import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import localFont from 'next/font/local';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS automatically (Next.js handles it)
config.autoAddCss = false;

const plusJakartaSans = localFont({
  src: [
    { path: './fonts/PlusJakartaSans-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/PlusJakartaSans-latin.woff2', weight: '600', style: 'normal' },
    { path: './fonts/PlusJakartaSans-latin.woff2', weight: '700', style: 'normal' },
    { path: './fonts/PlusJakartaSans-latin.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport = {
  themeColor: '#0a0f0d',
};

export const metadata = {
  metadataBase: new URL('https://apqdiaz.online'),
  title: {
    default: 'Arvin Paolo Diaz | Full-Stack Web Developer',
    template: '%s | Arvin Paolo Diaz',
  },
  description: 'Personal portfolio of Arvin Paolo Diaz — a Full-Stack Web Developer from the Philippines specializing in React, Next.js, PHP, and modern web systems.',
  keywords: [
    'Arvin Paolo Diaz',
    'Web Developer Philippines',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'JavaScript',
    'PHP',
    'Portfolio'
  ],
  authors: [{ name: 'Arvin Paolo Diaz', url: 'https://apqdiaz.online' }],
  creator: 'Arvin Paolo Diaz',
  openGraph: {
    title: 'Arvin Paolo Diaz | Full-Stack Web Developer',
    description: 'Personal portfolio of Arvin Paolo Diaz — a Full-Stack Web Developer from the Philippines.',
    url: 'https://apqdiaz.online',
    siteName: 'Arvin Paolo Diaz Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arvin Paolo Diaz | Full-Stack Web Developer',
    description: 'Personal portfolio of Arvin Paolo Diaz — crafting modern, high-performance web applications.',
    creator: '@arvinpaoloqdiaz',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

import { ThemeProvider } from '@/components/ui/ThemeProvider/ThemeProvider';
import PageTransition from '@/components/ui/PageTransition/PageTransition';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.setAttribute('data-theme', 'light');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}

