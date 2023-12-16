import type { MDXComponents } from 'mdx/types';
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm.js';
import Pre from 'pliny/ui/Pre.js';
import TOCInline from 'pliny/ui/TOCInline.js';
import { Image } from './image';
import { Link } from './link';
import { TableWrapper } from './table-wrapper';

export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-expect-error -- TSCONVERSION
  a: Link,
  // @ts-expect-error -- TSCONVERSION
  pre: Pre,
  // @ts-expect-error -- TSCONVERSION
  table: TableWrapper,
  BlogNewsletterForm,
};
