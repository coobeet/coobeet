import 'css/prism.css';
import 'katex/dist/katex.css';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXLayoutRenderer } from 'pliny/mdx-components.js';
import {
  coreContent,
  allCoreContent,
  sortPosts,
} from 'pliny/utils/contentlayer.js';
import { components } from '@/components/mdx-components';
import { allAuthors, allPosts } from '@/contentlayer/generated';
import { siteMetadata } from '@/data/site-metadata';
import { PostBanner } from '@/layouts/post-banner';
import { PostLayout } from '@/layouts/post-layout';
import { PostSimple } from '@/layouts/post-simple';

const defaultLayout = 'PostLayout';
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
};

interface Params {
  slug: string;
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata | undefined {
  const { slug } = params;
  const post = allPosts.find((p) => p.slug === slug);
  const authorList = post?.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    if (!authorResults) throw new Error(`Author ${author} not found`);
    return coreContent(authorResults);
  });
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  const authors = authorDetails.map((author) => author.name);
  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export function generateStaticParams(): Params[] {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export default function Page({ params }: { params: Params }): JSX.Element {
  const { slug } = params;
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allPosts));
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) throw new Error(`Post ${slug} not found`);
  const authorList = post.authors || ['default'];
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author);
    if (!authorResults) throw new Error(`Author ${author} not found`);
    return coreContent(authorResults);
  });
  const mainContent = coreContent(post);
  /* eslint-disable @typescript-eslint/no-unsafe-assignment -- ignore */
  const jsonLd = post.structuredData;
  /* eslint-disable @typescript-eslint/no-unsafe-member-access -- ignore */
  jsonLd.author = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    };
  });

  // @ts-expect-error -- TSCONVERSION
  const Layout = layouts[post.layout || defaultLayout];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <Layout
        authorDetails={authorDetails}
        content={mainContent}
        next={next}
        prev={prev}
      >
        <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        />
      </Layout>
    </>
  );
}
