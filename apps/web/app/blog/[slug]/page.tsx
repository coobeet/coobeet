import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';
import { allPosts } from 'contentlayer/generated';

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
}

export default function Layout({
  params,
}: {
  params: { slug: string };
}): JSX.Element {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time className="mb-1 text-xs text-gray-600" dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div
        className="[&>*]:mb-3 [&>*:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: post.body.raw }}
      />
    </article>
  );
}
