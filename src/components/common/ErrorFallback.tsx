import { FallbackProps } from 'react-error-boundary';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

/**
 * ErrorFallback component displays when an error is caught by the ErrorBoundary.
 * Provides information about the error and a way to recover.
 *
 * @param {FallbackProps} props - Props from react-error-boundary
 * @returns {JSX.Element} The rendered error fallback component
 */
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger-100 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400">
            <FiAlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h1>

          <p className="mb-6 text-gray-600 dark:text-gray-400">
            We encountered an unexpected error. Please try again or contact support if the problem
            persists.
          </p>

          {process.env.NODE_ENV !== 'production' && (
            <div className="mb-6 w-full overflow-auto rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-700">
              <p className="font-mono text-sm text-gray-800 dark:text-gray-300">{error.message}</p>
            </div>
          )}

          <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <button
              onClick={resetErrorBoundary}
              className="flex items-center justify-center space-x-2 rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:flex-1"
            >
              <FiRefreshCw className="h-4 w-4" />
              <span>Try again</span>
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 sm:flex-1"
            >
              Return to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
