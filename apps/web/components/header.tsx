'use client';

import { headerNavLinks } from '@/data/header-nav-links';
import Logo from '@/data/logo.svg';
import { siteMetadata } from '@/data/site-metadata';
import { Link } from './link';
import { MobileNav } from './mobile-nav';
import { SearchButton } from './search-button';
import { ThemeSwitch } from './theme-switch';

export function Header(): JSX.Element {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link aria-label={siteMetadata.headerTitle} href="/">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
              href={link.href}
              key={link.title}
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
