import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import { allPosts } from '@/contentlayer/generated';
import { BlogLayout } from '@/layouts/blog-layout';
import { genPageMetadata } from '@/lib/seo';

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: 'Blog' });

export default function Page(): JSX.Element {
  const posts = allCoreContent(sortPosts(allPosts));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return (
    <BlogLayout
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      posts={posts}
      title="All Posts"
    />
  );
}
