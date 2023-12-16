import { slug } from 'github-slugger';
import Link from 'next/link';

interface TagProps {
  text: string;
}

export function Tag({ text }: TagProps): JSX.Element {
  return (
    <Link
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      href={`/tags/${slug(text)}`}
    >
      {text.split(' ').join('-')}
    </Link>
  );
}
