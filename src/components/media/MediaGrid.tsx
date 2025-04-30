import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiHeart,
  FiEdit2,
  FiDownload,
  FiMoreVertical,
  FiImage,
  FiVideo,
  FiFile,
  FiMusic,
} from 'react-icons/fi';
import { useMockMediaData } from '@/hooks/useMockMediaData';
import { formatDistanceToNow } from 'date-fns';

/**
 * MediaGrid component displays media items in a grid layout.
 *
 * @returns {JSX.Element} The rendered media grid component
 */
const MediaGrid = (): JSX.Element => {
  // This would come from an API in a real app
  const { mediaItems, isLoading } = useMockMediaData();

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

  // Get icon based on file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <FiImage className="h-5 w-5" />;
      case 'video':
        return <FiVideo className="h-5 w-5" />;
      case 'audio':
        return <FiMusic className="h-5 w-5" />;
      default:
        return <FiFile className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg bg-gray-200 pb-[100%] dark:bg-gray-700"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      onClick={handleDocumentClick}
    >
      {mediaItems.map((item) => (
        <div
          key={item.id}
          className="group relative rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        >
          {/* File preview/thumbnail */}
          <Link to={`/media/${item.id}`} className="block overflow-hidden rounded-t-lg">
            {item.thumbnail ? (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-40 w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
                {getFileIcon(item.type)}
              </div>
            )}
          </Link>

          {/* Hover actions */}
          <div className="absolute right-2 top-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              className="rounded-full bg-white/80 p-1.5 text-gray-700 backdrop-blur-sm transition hover:bg-white hover:text-pink-500 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-pink-400"
              aria-label="Favorite"
            >
              <FiHeart className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-full bg-white/80 p-1.5 text-gray-700 backdrop-blur-sm transition hover:bg-white hover:text-primary-500 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
              aria-label="Edit"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-full bg-white/80 p-1.5 text-gray-700 backdrop-blur-sm transition hover:bg-white hover:text-gray-900 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Download"
            >
              <FiDownload className="h-4 w-4" />
            </button>
          </div>

          {/* File info */}
          <div className="p-3">
            <div className="mb-1 flex items-start justify-between">
              <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {item.title}
              </h3>
              {/* Actions dropdown */}
              <div className="relative ml-2 flex-shrink-0">
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
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
                      Rename
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-gray-100 dark:text-danger-400 dark:hover:bg-gray-700/50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* File metadata */}
            <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                {getFileIcon(item.type)}
                <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
              </span>
              <span>•</span>
              <span>{item.size}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(item.modified), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
