import { slug } from 'github-slugger';
import type { Metadata } from 'next';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import { allPosts } from '@/contentlayer/generated';
import { siteMetadata } from '@/data/site-metadata';
import { BlogLayout } from '@/layouts/blog-layout';
import { genPageMetadata } from '@/lib/seo';
import tagData from '@/lib/tag-data.json';

interface Params {
  tag: string;
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const tag = decodeURI(params.tag);
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  });
}

export function generateStaticParams(): Params[] {
  const tagCounts = tagData;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }));
  return paths;
}

export default function Page({ params }: { params: Params }): JSX.Element {
  const tag = decodeURI(params.tag);
  // Capitalize first letter and convert space to dash
  const title =
    tag.slice(0, 1).toUpperCase() + tag.split(' ').join('-').slice(1);
  const filteredPosts = allCoreContent(
    sortPosts(
      allPosts.filter((post) => post.tags.map((t) => slug(t)).includes(tag)),
    ),
  );
  return <BlogLayout posts={filteredPosts} title={title} />;
}
