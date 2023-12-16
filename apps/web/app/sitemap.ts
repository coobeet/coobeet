import type { MetadataRoute } from 'next';
import { allPosts } from 'contentlayer/generated';
import { siteMetadata } from '@/data/site-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const blogRoutes = allPosts
    // .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.date,
    }));

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
