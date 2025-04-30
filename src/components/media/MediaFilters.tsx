import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFile, FiImage, FiMusic, FiVideo, FiX } from 'react-icons/fi';

interface MediaFiltersProps {
  onClose: () => void;
}

/**
 * MediaFilters component provides filtering options for the media browser.
 *
 * @param {object} props - Component props
 * @param {Function} props.onClose - Function to close the filters panel
 * @returns {JSX.Element} The rendered media filters component
 */
const MediaFilters = ({ onClose }: MediaFiltersProps): JSX.Element => {
  // State for type filter
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['image', 'video']);

  // State for date filter
  const [dateRange, setDateRange] = useState<string>('all');

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    type: true,
    date: true,
    tags: false,
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle file type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Handle date range selection
  const handleDateChange = (range: string) => {
    setDateRange(range);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([]);
    setDateRange('all');
  };

  // Apply filters
  const applyFilters = () => {
    // In a real app, this would trigger API request or update URL params
    console.log('Applying filters:', { selectedTypes, dateRange });
    onClose();
  };

  return (
    <div className="animate-fade-in mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Close filters"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* File type filter */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('type')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-medium text-gray-900 dark:text-white">File Type</span>
            {expandedSections.type ? (
              <FiChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <FiChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          {expandedSections.type && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => toggleType('image')}
                className={`flex items-center rounded-md border px-3 py-2 text-sm ${
                  selectedTypes.includes('image')
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`}
              >
                <FiImage className="mr-2 h-4 w-4" />
                <span>Images</span>
              </button>

              <button
                type="button"
                onClick={() => toggleType('video')}
                className={`flex items-center rounded-md border px-3 py-2 text-sm ${
                  selectedTypes.includes('video')
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`}
              >
                <FiVideo className="mr-2 h-4 w-4" />
                <span>Videos</span>
              </button>

              <button
                type="button"
                onClick={() => toggleType('audio')}
                className={`flex items-center rounded-md border px-3 py-2 text-sm ${
                  selectedTypes.includes('audio')
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`}
              >
                <FiMusic className="mr-2 h-4 w-4" />
                <span>Audio</span>
              </button>

              <button
                type="button"
                onClick={() => toggleType('document')}
                className={`flex items-center rounded-md border px-3 py-2 text-sm ${
                  selectedTypes.includes('document')
                    ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`}
              >
                <FiFile className="mr-2 h-4 w-4" />
                <span>Documents</span>
              </button>
            </div>
          )}
        </div>

        {/* Date range filter */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('date')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-medium text-gray-900 dark:text-white">Date Modified</span>
            {expandedSections.date ? (
              <FiChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <FiChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          {expandedSections.date && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center">
                <input
                  id="date-all"
                  type="radio"
                  name="date-range"
                  value="all"
                  checked={dateRange === 'all'}
                  onChange={() => handleDateChange('all')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="date-all" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Any time
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="date-today"
                  type="radio"
                  name="date-range"
                  value="today"
                  checked={dateRange === 'today'}
                  onChange={() => handleDateChange('today')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="date-today"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Today
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="date-week"
                  type="radio"
                  name="date-range"
                  value="week"
                  checked={dateRange === 'week'}
                  onChange={() => handleDateChange('week')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="date-week"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Last 7 days
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="date-month"
                  type="radio"
                  name="date-range"
                  value="month"
                  checked={dateRange === 'month'}
                  onChange={() => handleDateChange('month')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="date-month"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Last 30 days
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="date-custom"
                  type="radio"
                  name="date-range"
                  value="custom"
                  checked={dateRange === 'custom'}
                  onChange={() => handleDateChange('custom')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="date-custom"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Custom range
                </label>
              </div>

              {dateRange === 'custom' && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor="date-from"
                      className="block text-xs text-gray-500 dark:text-gray-400"
                    >
                      From
                    </label>
                    <input
                      id="date-from"
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date-to"
                      className="block text-xs text-gray-500 dark:text-gray-400"
                    >
                      To
                    </label>
                    <input
                      id="date-to"
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tags filter */}
        <div className="py-4">
          <button
            onClick={() => toggleSection('tags')}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-medium text-gray-900 dark:text-white">Tags</span>
            {expandedSections.tags ? (
              <FiChevronUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <FiChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>

          {expandedSections.tags && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  <span>Project A</span>
                  <button className="ml-1.5 flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </span>

                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  <span>Approved</span>
                  <button className="ml-1.5 flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add tag..."
                  className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter actions */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Clear all
        </button>

        <button type="button" onClick={applyFilters} className="btn btn-primary text-sm">
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default MediaFilters;
