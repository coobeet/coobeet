import Link from 'next/link';
import type { CoreContent } from 'pliny/utils/contentlayer.js';
import { formatDate } from 'pliny/utils/formatDate.js';
import { Comments } from '@/components/comments';
import { PageTitle } from '@/components/page-title';
import { ScrollTopAndComment } from '@/components/scroll-top-and-comment';
import { SectionContainer } from '@/components/section-container';
import type { Post } from '@/contentlayer/generated';
import { siteMetadata } from '@/data/site-metadata';

interface PostSimpleProps {
  content: CoreContent<Post>;
  children: React.ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export function PostSimple({
  content,
  next,
  prev,
  children,
}: PostSimpleProps): JSX.Element {
  const { slug, date, title } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                {children}
              </div>
            </div>
            {siteMetadata.comments ? (
              <div
                className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                id="comment"
              >
                <Comments slug={slug} />
              </div>
            ) : null}
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev?.path ? (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      aria-label={`Previous post: ${prev.title}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      href={`/${prev.path}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                ) : null}
                {next?.path ? (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      aria-label={`Next post: ${next.title}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      href={`/${next.path}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                ) : null}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
