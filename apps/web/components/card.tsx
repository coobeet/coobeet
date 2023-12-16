/* eslint-disable no-nested-ternary -- ignore */
import { Image } from './image';
import { Link } from './link';

interface CardProps {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
}

export function Card({
  title,
  description,
  imgSrc,
  href,
}: CardProps): JSX.Element {
  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        {imgSrc ? (
          href ? (
            <Link aria-label={`Link to ${title}`} href={href}>
              <Image
                alt={title}
                className="object-cover object-center md:h-36 lg:h-48"
                height={306}
                src={imgSrc}
                width={544}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              className="object-cover object-center md:h-36 lg:h-48"
              height={306}
              src={imgSrc}
              width={544}
            />
          )
        ) : null}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link aria-label={`Link to ${title}`} href={href}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {description}
          </p>
          {href ? (
            <Link
              aria-label={`Link to ${title}`}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              href={href}
            >
              Learn more &rarr;
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
