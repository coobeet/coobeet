import type { ImageProps } from 'next/image';
import NextImage from 'next/image';

export function Image({ ...rest }: ImageProps): JSX.Element {
  return <NextImage {...rest} />;
}
