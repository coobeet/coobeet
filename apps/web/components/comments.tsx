'use client';

import { Comments as CommentsComponent } from 'pliny/comments/index.js';
import { useState } from 'react';
import { siteMetadata } from '@/data/site-metadata';

export function Comments({ slug }: { slug: string }): JSX.Element {
  const [loadComments, setLoadComments] = useState(false);

  return (
    <>
      {!loadComments && (
        <button
          onClick={() => {
            setLoadComments(true);
          }}
          type="button"
        >
          Load Comments
        </button>
      )}
      {siteMetadata.comments && loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : null}
    </>
  );
}
