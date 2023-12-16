import { NewsletterAPI } from 'pliny/newsletter/index.js';
import { siteMetadata } from '@/data/site-metadata';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- ignore
const handler = NewsletterAPI({
  // @ts-expect-error -- ignore
  provider: siteMetadata.newsletter.provider,
});

export { handler as GET, handler as POST };
