'use client';

import { useEffect, useState } from 'react';
import { siteMetadata } from '@/data/site-metadata';

export function ScrollTopAndComment(): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleWindowScroll = (): void => {
      if (window.scrollY > 50) setShow(true);
      else setShow(false);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  const handleScrollTop = (): void => {
    window.scrollTo({ top: 0 });
  };

  const handleScrollToComment = (): void => {
    document.getElementById('comment')?.scrollIntoView();
  };

  return (
    <div
      className={`fixed bottom-8 right-8 hidden flex-col gap-3 ${
        show ? 'md:flex' : 'md:hidden'
      }`}
    >
      {siteMetadata.comments?.provider ? (
        <button
          aria-label="Scroll To Comment"
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          onClick={handleScrollToComment}
          type="button"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      ) : null}
      <button
        aria-label="Scroll To Top"
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        onClick={handleScrollTop}
        type="button"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
