import Bleed from 'pliny/ui/Bleed.js';
import type { CoreContent } from 'pliny/utils/contentlayer.js';
import { Comments } from '@/components/comments';
import { Image } from '@/components/image';
import { Link } from '@/components/link';
import { PageTitle } from '@/components/page-title';
import { ScrollTopAndComment } from '@/components/scroll-top-and-comment';
import { SectionContainer } from '@/components/section-container';
import type { Post } from '@/contentlayer/generated';
import { siteMetadata } from '@/data/site-metadata';

interface PostBannerProps {
  children: React.ReactNode;
  content: CoreContent<Post>;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export function PostBanner({
  content,
  next,
  prev,
  children,
}: PostBannerProps): JSX.Element {
  const { slug, title, images } = content;
  const displayImage =
    images && images.length > 0 && images[0]
      ? images[0]
      : 'https://picsum.photos/seed/picsum/800/400';

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    alt={title}
                    className="object-cover"
                    fill
                    src={displayImage}
                  />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose max-w-none py-4 dark:prose-invert">
            {children}
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
      </article>
    </SectionContainer>
  );
}
