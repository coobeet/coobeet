import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { SearchProvider } from 'pliny/search/index.js';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SectionContainer } from '@/components/section-container';
import { siteMetadata } from '@/data/site-metadata';
import { Providers } from './providers';

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
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
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html
      className={`${spaceGrotesk.variable} scroll-smooth`}
      lang={siteMetadata.language}
      suppressHydrationWarning
    >
      <link
        href="/static/favicons/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="76x76"
      />
      <link
        href="/static/favicons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/static/favicons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/static/favicons/site.webmanifest" rel="manifest" />
      <link
        color="#5bbad5"
        href="/static/favicons/safari-pinned-tab.svg"
        rel="mask-icon"
      />
      <meta content="#000000" name="msapplication-TileColor" />
      <meta
        content="#fff"
        media="(prefers-color-scheme: light)"
        name="theme-color"
      />
      <meta
        content="#000"
        media="(prefers-color-scheme: dark)"
        name="theme-color"
      />
      <link href="/feed.xml" rel="alternate" type="application/rss+xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <Providers>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- search is defined. */}
              <SearchProvider searchConfig={siteMetadata.search!}>
                <Header />
                {children}
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
