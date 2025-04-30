import { Link } from 'react-router-dom';
import { FiFile, FiVideo, FiImage, FiMusic, FiDownload, FiMoreVertical } from 'react-icons/fi';
import { cn } from '@/utils/cn';

interface RecentMediaCardProps {
  title: string;
  thumbnail?: string;
  type: 'video' | 'audio' | 'image' | 'document';
  size: string;
  modified: string;
  project?: string;
}

/**
 * RecentMediaCard component displays information about a recently accessed media file.
 *
 * @param {object} props - Component props
 * @param {string} props.title - File title
 * @param {string} [props.thumbnail] - Optional thumbnail URL
 * @param {'video' | 'audio' | 'image' | 'document'} props.type - Media type
 * @param {string} props.size - File size
 * @param {string} props.modified - Last modified time
 * @param {string} [props.project] - Optional project name
 * @returns {JSX.Element} The rendered recent media card component
 */
const RecentMediaCard = ({
  title,
  thumbnail,
  type,
  size,
  modified,
  project,
}: RecentMediaCardProps): JSX.Element => {
  // Get the appropriate icon and style based on file type
  const getTypeInfo = () => {
    switch (type) {
      case 'video':
        return {
          icon: <FiVideo className="h-4 w-4" />,
          bgColor: 'bg-primary-100 dark:bg-primary-900/30',
          textColor: 'text-primary-600 dark:text-primary-400',
        };
      case 'audio':
        return {
          icon: <FiMusic className="h-4 w-4" />,
          bgColor: 'bg-success-100 dark:bg-success-900/30',
          textColor: 'text-success-600 dark:text-success-400',
        };
      case 'image':
        return {
          icon: <FiImage className="h-4 w-4" />,
          bgColor: 'bg-warning-100 dark:bg-warning-900/30',
          textColor: 'text-warning-600 dark:text-warning-400',
        };
      case 'document':
      default:
        return {
          icon: <FiFile className="h-4 w-4" />,
          bgColor: 'bg-secondary-100 dark:bg-secondary-900/30',
          textColor: 'text-secondary-600 dark:text-secondary-400',
        };
    }
  };

  const typeInfo = getTypeInfo();

  return (
    <div className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-3 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50">
      {/* Thumbnail or placeholder */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className={cn('flex h-full w-full items-center justify-center', typeInfo.bgColor)}>
            {typeInfo.icon}
          </div>
        )}
      </div>

      {/* File info */}
      <div className="min-w-0 flex-1">
        <Link to={`/media/${encodeURIComponent(title)}`}>
          <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className={cn('inline-flex items-center gap-1', typeInfo.textColor)}>
            {typeInfo.icon}
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </span>
          <span className="text-gray-600 dark:text-gray-400">{size}</span>
          <span className="text-gray-600 dark:text-gray-400">{modified}</span>
          {project && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 dark:bg-gray-700">{project}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="ml-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex -space-x-1">
          <button
            type="button"
            className="rounded-md p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            aria-label="Download file"
          >
            <FiDownload className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            aria-label="More options"
          >
            <FiMoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentMediaCard;
