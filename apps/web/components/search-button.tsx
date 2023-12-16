import { AlgoliaButton } from 'pliny/search/AlgoliaButton.js';
import { KBarButton } from 'pliny/search/KBarButton.js';
import { siteMetadata } from '@/data/site-metadata';

export function SearchButton(): React.ReactNode {
  if (siteMetadata.search) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton;

    return (
      <SearchButtonWrapper aria-label="Search">
        <svg
          className="h-6 w-6 text-gray-900 dark:text-gray-100"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SearchButtonWrapper>
    );
  }
}
