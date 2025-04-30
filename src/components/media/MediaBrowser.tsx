import { useState } from 'react';
import { FiFilter, FiGrid, FiList, FiUpload, FiSearch, FiX } from 'react-icons/fi';
//import { useLocation, useNavigate } from "react-router-dom";
import MediaGrid from './MediaGrid';
import MediaList from './MediaList';
import MediaFilters from './MediaFilters';

/**
 * MediaBrowser component displays a collection of media assets with filtering
 * and viewing options.
 *
 * @returns {JSX.Element} The rendered media browser component
 */
const MediaBrowser = (): JSX.Element => {
  // State for view mode: grid or list
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // State for filter panel visibility
  const [showFilters, setShowFilters] = useState(false);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Current page state - would typically come from URL or API pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  /*
  Implement later -- these can be used for 
   - reading query params from URL
   - Updating URL when filters change
   - Navigate to detail pages

  // Get location and history for URL manipulation
  const location = useLocation();
  const navigate = useNavigate();
  */

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update URL params or trigger API call
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
    // In a real app, this would update URL params or trigger API call
  };

  // Handle page change - in real app this would update URL or call API
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Media Assets</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse and manage your media files
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          <FiUpload className="h-4 w-4" />
          <span>Upload Files</span>
        </button>
      </div>

      {/* Search and filters row */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Search by filename, type, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={clearSearch}
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Filter toggle */}
          <button
            type="button"
            className={`flex items-center space-x-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
              showFilters
                ? 'border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {showFilters && (
              <span className="ml-1 rounded-full bg-primary-100 px-1.5 py-0.5 text-xs dark:bg-primary-900/50">
                3
              </span>
            )}
          </button>

          {/* View toggle */}
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-l-lg ${
                viewMode === 'grid'
                  ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                  : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={`flex h-9 w-9 items-center justify-center rounded-r-lg ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
                  : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter panel - conditionally rendered */}
      {showFilters && <MediaFilters onClose={() => setShowFilters(false)} />}

      {/* Media display - grid or list based on view mode */}
      <div className="mb-8">{viewMode === 'grid' ? <MediaGrid /> : <MediaList />}</div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 py-4 dark:border-gray-700">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 5 /* Total pages hard coded for demo */}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, 58)}</span> of{' '}
              <span className="font-medium">58</span> results
            </p>
          </div>

          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                    page === currentPage
                      ? 'z-10 border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === 5 /* Total pages hardcoded for demo */}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaBrowser;
