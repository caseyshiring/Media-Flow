import { FiMenu, FiSearch, FiBell, FiUpload } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from '@/components/common/ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
}

/**
 * Header component for the main layout, containing search, notifications,
 * and user controls.
 *
 * @param {object} props - Component props
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar
 * @returns {JSX.Element} The rendered header component
 */
const Header = ({ toggleSidebar }: HeaderProps): JSX.Element => {
  const { theme } = useTheme();

  return (
    <header className="relative z-10 flex h-16 flex-shrink-0 items-center border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Left: Hamburger menu and search */}
      <div className="flex items-center px-4 md:px-6">
        <button
          type="button"
          className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        {/* Search bar */}
        <div
          className={`relative rounded-md shadow-sm ${
            theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Search media assets..."
          />
        </div>
      </div>

      {/* Right: Actions and user */}
      <div className="ml-auto flex items-center space-x-4 px-4 md:px-6">
        {/* Upload button */}
        <button type="button" className="btn btn-primary flex items-center space-x-2 text-sm">
          <FiUpload className="h-4 w-4" />
          <span className="hidden md:inline">Upload</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="View notifications"
        >
          <FiBell className="h-5 w-5" />
          <span className="absolute right-0 top-0 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
          </span>
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User profile */}
        <div className="relative">
          <button
            type="button"
            className="flex rounded-full border-2 border-transparent text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
              <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
