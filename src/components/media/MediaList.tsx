import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiEdit2,
  FiFile,
  FiHeart,
  FiImage,
  FiMoreVertical,
  FiMusic,
  FiTrash2,
  FiVideo,
} from 'react-icons/fi';
import { useMockMediaData } from '@/hooks/useMockMediaData';
import { formatDistanceToNow, format } from 'date-fns';

/**
 * MediaList component displays media items in a list/table layout.
 *
 * @returns {JSX.Element} The rendered media list component
 */
const MediaList = (): JSX.Element => {
  // This would come from an API in a real app
  const { mediaItems, isLoading } = useMockMediaData();

  // State for sorting
  const [sortField, setSortField] = useState<'title' | 'type' | 'size' | 'modified'>('modified');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // State for active dropdown menu
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Toggle dropdown menu
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Close dropdown when clicking outside
  const handleDocumentClick = () => {
    if (activeDropdown) {
      setActiveDropdown(null);
    }
  };

  // Handle column sort
  const handleSort = (field: 'title' | 'type' | 'size' | 'modified') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <FiImage className="h-4 w-4" />;
      case 'video':
        return <FiVideo className="h-4 w-4" />;
      case 'audio':
        return <FiMusic className="h-4 w-4" />;
      default:
        return <FiFile className="h-4 w-4" />;
    }
  };

  // Sort media items based on current sort state
  const sortedItems = [...mediaItems].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'size':
        // Simplified size comparison - in a real app, would convert to bytes first
        comparison = a.size.localeCompare(b.size);
        break;
      case 'modified':
        comparison = new Date(a.modified).getTime() - new Date(b.modified).getTime();
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  if (isLoading) {
    return (
      <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="h-12 bg-gray-100 dark:bg-gray-800"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div
      onClick={handleDocumentClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleDocumentClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Table header */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <div className="col-span-5 md:col-span-6">
            <button className="flex items-center space-x-1" onClick={() => handleSort('title')}>
              <span>Name</span>
              {sortField === 'title' &&
                (sortDirection === 'asc' ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                ))}
            </button>
          </div>
          <div className="col-span-2">
            <button className="flex items-center space-x-1" onClick={() => handleSort('type')}>
              <span>Type</span>
              {sortField === 'type' &&
                (sortDirection === 'asc' ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                ))}
            </button>
          </div>
          <div className="col-span-2 md:col-span-1">
            <button className="flex items-center space-x-1" onClick={() => handleSort('size')}>
              <span>Size</span>
              {sortField === 'size' &&
                (sortDirection === 'asc' ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                ))}
            </button>
          </div>
          <div className="col-span-2 md:col-span-2">
            <button className="flex items-center space-x-1" onClick={() => handleSort('modified')}>
              <span>Modified</span>
              {sortField === 'modified' &&
                (sortDirection === 'asc' ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                ))}
            </button>
          </div>
          <div className="col-span-1">
            <span className="sr-only">Actions</span>
          </div>
        </div>
      </div>

      {/* Table body */}
      <div className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="group grid grid-cols-12 gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            {/* Name column with thumbnail */}
            <div className="col-span-5 flex items-center space-x-3 md:col-span-6">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
                ) : (
                  getFileIcon(item.type)
                )}
              </div>
              <Link
                to={`/media/${item.id}`}
                className="truncate font-medium text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400"
              >
                {item.title}
              </Link>
            </div>

            {/* Type column */}
            <div className="col-span-2 flex items-center">
              <span className="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                {getFileIcon(item.type)}
                <span className="hidden sm:inline">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </span>
            </div>

            {/* Size column */}
            <div className="col-span-2 flex items-center text-sm text-gray-600 dark:text-gray-400 md:col-span-1">
              {item.size}
            </div>

            {/* Modified date column */}
            <div className="col-span-2 hidden items-center text-sm text-gray-600 dark:text-gray-400 md:flex">
              <div>
                <div>{format(new Date(item.modified), 'MMM d, yyyy')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDistanceToNow(new Date(item.modified), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            {/* Actions column */}
            <div className="col-span-1 flex items-center justify-end space-x-2 md:space-x-3">
              <div className="hidden md:flex md:space-x-1">
                <button
                  type="button"
                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  aria-label="Download"
                >
                  <FiDownload className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  aria-label="Favorite"
                >
                  <FiHeart className="h-4 w-4" />
                </button>
              </div>

              {/* Dropdown menu */}
              <div className="relative">
                <button
                  type="button"
                  className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(item.id);
                  }}
                  aria-label="More options"
                >
                  <FiMoreVertical className="h-4 w-4" />
                </button>

                {activeDropdown === item.id && (
                  <div className="absolute right-0 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                    <Link
                      to={`/media/${item.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    >
                      View details
                    </Link>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    >
                      <span className="flex items-center gap-2">
                        <FiEdit2 className="h-4 w-4" />
                        Rename
                      </span>
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-gray-100 dark:text-danger-400 dark:hover:bg-gray-700/50"
                    >
                      <span className="flex items-center gap-2">
                        <FiTrash2 className="h-4 w-4" />
                        Delete
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaList;
