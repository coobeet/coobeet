import { writeFileSync } from 'node:fs';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { slug } from 'github-slugger';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js';
import type { Post } from '@/contentlayer/generated';
import { siteMetadata } from './data/site-metadata';

const isProduction = process.env.NODE_ENV === 'production';

function createTagCount(allPosts: Post[]): void {
  const tagCount: Record<string, number> = {};
  allPosts.forEach((file) => {
    if (!isProduction || file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync('./lib/tag-data.json', JSON.stringify(tagCount));
}

function createSearchIndex(allPosts: Post[]): void {
  if (
    siteMetadata.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
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
    draft: { type: 'boolean' },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    summary: { type: 'string' },
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
  disableImportAliasWarning: true,
  contentDirPath: 'data',
  documentTypes: [post],
  onSuccess: async (importData) => {
    const { allPosts } = await importData();
    createTagCount(allPosts);
    createSearchIndex(allPosts);
  },
});
