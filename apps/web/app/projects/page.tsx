import { Card } from '@/components/card';
import { projects } from '@/data/projects';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({ title: 'Projects' });

export default function Page(): JSX.Element {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Projects
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Showcase your projects with a hero image (16 x 9)
        </p>
      </div>
      <div className="container py-12">
        <div className="-m-4 flex flex-wrap">
          {projects.map((p) => (
            <Card
              description={p.description}
              href={p.href}
              imgSrc={p.imgSrc}
              key={p.title}
              title={p.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
