import { Link } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

/**
 * NotFound component displays when a route is not found.
 *
 * @returns {JSX.Element} The rendered not found component
 */
const NotFound = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <FiAlertCircle className="h-12 w-12 text-gray-500 dark:text-gray-400" />
      </div>

      <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>

      <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>

      <Link to="/" className="btn btn-primary flex items-center space-x-2 px-6 py-2.5">
        <FiArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
};

export default NotFound;
