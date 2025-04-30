import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiFolder,
  FiClock,
  FiFileText,
} from 'react-icons/fi';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  lastUpdated: string;
  totalFiles: number;
  storageUsed: string;
  thumbnail?: string;
}

/**
 * Projects component displays a list of media projects.
 *
 * @returns {JSX.Element} The rendered projects component
 */
const Projects = (): JSX.Element => {
  // Mock projects data
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Adventure Series',
      description: 'Documentary series featuring extreme sports and nature exploration',
      status: 'active',
      lastUpdated: '2025-04-25T15:32:00',
      totalFiles: 128,
      storageUsed: '24.5 GB',
      thumbnail: 'https://via.placeholder.com/400x225?text=Adventure+Series',
    },
    {
      id: '2',
      name: 'Commercial - XYZ Product',
      description: 'TV commercial for the new XYZ product line',
      status: 'active',
      lastUpdated: '2025-04-23T09:15:00',
      totalFiles: 64,
      storageUsed: '12.8 GB',
      thumbnail: 'https://via.placeholder.com/400x225?text=Commercial',
    },
    {
      id: '3',
      name: 'Sci-Fi Short Film',
      description: 'Short film exploring themes of technology and humanity',
      status: 'active',
      lastUpdated: '2025-04-21T11:45:00',
      totalFiles: 342,
      storageUsed: '86.3 GB',
      thumbnail: 'https://via.placeholder.com/400x225?text=Sci-Fi+Short',
    },
    {
      id: '4',
      name: 'Corporate Training Videos',
      description: 'Series of training videos for internal corporate use',
      status: 'completed',
      lastUpdated: '2025-04-18T14:20:00',
      totalFiles: 45,
      storageUsed: '8.7 GB',
      thumbnail: 'https://via.placeholder.com/400x225?text=Corporate+Training',
    },
    {
      id: '5',
      name: 'Music Festival Recap',
      description: 'Highlight reel and promotional content from annual music festival',
      status: 'archived',
      lastUpdated: '2025-03-15T10:30:00',
      totalFiles: 215,
      storageUsed: '42.1 GB',
      thumbnail: 'https://via.placeholder.com/400x225?text=Music+Festival',
    },
  ]);

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

  // Get badge color based on project status
  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400';
      case 'completed':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your media projects and collections
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          <FiPlus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects grid */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        onClick={handleDocumentClick}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Project thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <FiFolder className="h-12 w-12 text-gray-400" />
                </div>
              )}

              {/* Status badge */}
              <div className="absolute right-2 top-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(
                    project.status
                  )}`}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              {/* Actions overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity group-hover:opacity-100">
                <Link
                  to={`/projects/${project.id}`}
                  className="mx-1 rounded-full bg-white p-2 text-gray-700 shadow transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiFileText className="h-5 w-5" />
                </Link>
                <button
                  type="button"
                  className="mx-1 rounded-full bg-white p-2 text-gray-700 shadow transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiEdit2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Project info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <Link to={`/projects/${project.id}`} className="block">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
                    {project.name}
                  </h3>
                </Link>

                {/* Actions dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(project.id);
                    }}
                    aria-label="More options"
                  >
                    <FiMoreVertical className="h-5 w-5" />
                  </button>

                  {activeDropdown === project.id && (
                    <div className="absolute right-0 z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                      <Link
                        to={`/projects/${project.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      >
                        View project
                      </Link>
                      <Link
                        to={`/projects/${project.id}/media`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      >
                        Browse media
                      </Link>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      >
                        <span className="flex items-center gap-2">
                          <FiEdit2 className="h-4 w-4" />
                          Edit project
                        </span>
                      </button>
                      <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-gray-100 dark:text-danger-400 dark:hover:bg-gray-700/50"
                      >
                        <span className="flex items-center gap-2">
                          <FiTrash2 className="h-4 w-4" />
                          Delete project
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <FiFolder className="mr-1 h-4 w-4" />
                  <span>{project.totalFiles} files</span>
                </div>
                <div className="flex items-center">
                  <span className="block h-1.5 w-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                </div>
                <div className="flex items-center">
                  <span>{project.storageUsed}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-1 h-4 w-4" />
                  <span>
                    {new Date(project.lastUpdated).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
