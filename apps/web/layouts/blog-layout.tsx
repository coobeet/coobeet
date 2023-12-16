'use client';

import { slug } from 'github-slugger';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CoreContent } from 'pliny/utils/contentlayer.js';
import { formatDate } from 'pliny/utils/formatDate.js';
import { Tag } from '@/components/tag';
import type { Post } from '@/contentlayer/generated';
import { siteMetadata } from '@/data/site-metadata';
import tagData from '@/lib/tag-data.json';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

interface BlogLayoutProps {
  posts: CoreContent<Post>[];
  title: string;
  initialDisplayPosts?: CoreContent<Post>[];
  pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps): JSX.Element {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];
  const prevPage = currentPage - 1 > 0;
  const nextPage = currentPage + 1 <= totalPages;

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
            type="button"
          >
            Previous
          </button>
        )}
        {prevPage ? (
          <Link
            href={
              currentPage - 1 === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${currentPage - 1}`
            }
            rel="prev"
          >
            Previous
          </Link>
        ) : null}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
            type="button"
          >
            Next
          </button>
        )}
        {nextPage ? (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

export function BlogLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: BlogLayoutProps): JSX.Element {
  const pathname = usePathname();
  const tagCounts = tagData;
  const tagKeys = Object.keys(tagCounts) as (keyof typeof tagCounts)[];
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <div>
      <div className="pb-6 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {title}
        </h1>
      </div>
      <div className="flex sm:space-x-24">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
          <div className="px-6 py-4">
            {pathname.startsWith('/Post') ? (
              <h3 className="font-bold uppercase text-primary-500">
                All Posts
              </h3>
            ) : (
              <Link
                className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                href="/blog"
              >
                All Posts
              </Link>
            )}
            <ul>
              {sortedTags.map((t) => {
                return (
                  <li className="my-3" key={t}>
                    {pathname.split('/tags/')[1] === slug(t) ? (
                      <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        aria-label={`View posts tagged ${t}`}
                        className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                        href={`/tags/${slug(t)}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <ul>
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post;
              return (
                <li className="py-5" key={path}>
                  <article className="flex flex-col space-y-2 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            className="text-gray-900 dark:text-gray-100"
                            href={`/${path}`}
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          {pagination && pagination.totalPages > 1 ? (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
