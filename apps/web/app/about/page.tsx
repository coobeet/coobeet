import { MDXLayoutRenderer } from 'pliny/mdx-components.js';
import { coreContent } from 'pliny/utils/contentlayer.js';
import { allAuthors } from '@/contentlayer/generated';
import AuthorLayout from '@/layouts/author-layout';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page(): JSX.Element {
  const author = allAuthors.find((p) => p.slug === 'default');
  if (!author) throw new Error('Author not found');
  const mainContent = coreContent(author);

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  );
}
