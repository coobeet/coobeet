import { writeFileSync } from 'node:fs';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import type { Post } from 'contentlayer/generated';
import { siteMetadata } from './data/site-metadata';

function createSearchIndex(allPosts: Post[]): void {
  if (siteMetadata.search.kbarConfig.searchDocumentsPath) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allPosts))),
    );
  }
}

export const post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/*.md`,
  contentType: 'mdx',
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
      resolve: (p) => `/${p._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [post],
  onSuccess: async (importData) => {
    const { allPosts } = await importData();
    createSearchIndex(allPosts);
  },
});
