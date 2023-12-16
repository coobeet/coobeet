import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[1],
    },
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: 'data', documentTypes: [Post] });
