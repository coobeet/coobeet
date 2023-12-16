/* eslint-disable jsx-a11y/anchor-has-content -- Disable for now. */
import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export function Link({
  href,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return <NextLink href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a href={href} rel="noopener noreferrer" target="_blank" {...rest} />;
}
