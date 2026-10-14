import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS automatically (Next.js handles it)
config.autoAddCss = false;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
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

export const metadata = {
  title: {
    default: 'Arvin Paolo Diaz | Web Developer',
    template: '%s | Arvin Paolo Diaz',
  },
  description: 'Personal portfolio of Arvin Paolo Diaz — a Full-Stack Web Developer from the Philippines.',
  keywords: ['portfolio', 'web developer', 'React', 'Next.js', 'full-stack', 'Philippines'],
  openGraph: {
    title: 'Arvin Paolo Diaz | Web Developer',
    description: 'Personal portfolio of Arvin Paolo Diaz — a Full-Stack Web Developer from the Philippines.',
    url: 'https://apqdiaz.online',
    siteName: 'Arvin Paolo Diaz Portfolio',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

