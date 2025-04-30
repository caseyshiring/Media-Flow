import { NavLink } from 'react-router-dom';
import { FiX, FiHome, FiBriefcase, FiVideo, FiSettings, FiHelpCircle } from 'react-icons/fi';
import Logo from '@/components/common/Logo';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

/**
 * Sidebar component providing the main navigation of the application.
 *
 * @param {object} props - Component props
 * @param {boolean} props.isOpen - Whether the sidebar is open (for mobile)
 * @param {Function} props.closeSidebar - Function to close the sidebar
 * @returns {JSX.Element} The rendered sidebar component
 */
const Sidebar = ({ isOpen, closeSidebar }: SidebarProps): JSX.Element => {
  // Navigation items configuration
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FiHome className="h-5 w-5" /> },
    {
      path: '/projects',
      label: 'Projects',
      icon: <FiBriefcase className="h-5 w-5" />,
    },
    {
      path: '/media',
      label: 'Media Assets',
      icon: <FiVideo className="h-5 w-5" />,
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: <FiSettings className="h-5 w-5" />,
    },
    {
      path: '/help',
      label: 'Help & Support',
      icon: <FiHelpCircle className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar component */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header with logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          <Logo />

          <button
            type="button"
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
                }`
              }
              end={item.path === '/'}
            >
              <span className="mr-3 flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white">
              <span className="text-sm font-semibold">MS</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                Media Studio Pro
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
