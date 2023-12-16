'use client';

import { ThemeProvider } from 'next-themes';
import { siteMetadata } from '@/data/site-metadata';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
}
