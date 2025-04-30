import { Link } from 'react-router-dom';

/**
 * Logo component displays the application logo and name.
 *
 * @returns {JSX.Element} The rendered logo component
 */
const Logo = (): JSX.Element => {
  return (
    <Link to="/" className="flex items-center space-x-2 focus:outline-none">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-600 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
        </svg>
      </div>
      <span className="text-lg font-bold text-gray-900 dark:text-white">MediaFlow</span>
    </Link>
  );
};

export default Logo;
