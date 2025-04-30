import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white';
  fullScreen?: boolean;
  message?: string;
}

/**
 * LoadingSpinner component displays a loading indicator.
 *
 * @param {object} props - Component props
 * @param {string} [props.size='medium'] - Size of the spinner
 * @param {string} [props.color='primary'] - Color of the spinner
 * @param {boolean} [props.fullScreen=false] - Whether to display full screen
 * @param {string} [props.message] - Optional loading message
 * @returns {JSX.Element} The rendered loading spinner
 */
const LoadingSpinner = ({
  size = 'medium',
  color = 'primary',
  fullScreen = false,
  message,
}: LoadingSpinnerProps): JSX.Element => {
  // Size mappings
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-3',
  };

  // Color mappings
  const colorClasses = {
    primary: 'border-primary-600 border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  // Container classes for full screen or inline
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="flex flex-col items-center">
        <div className={cn('animate-spin rounded-full', sizeClasses[size], colorClasses[color])} />
        {message && (
          <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
