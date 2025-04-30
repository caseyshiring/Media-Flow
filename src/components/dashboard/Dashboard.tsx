import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlusCircle,
  FiExternalLink,
  FiAlertTriangle,
  FiCloudOff,
  FiHardDrive,
} from 'react-icons/fi';
import StatCard from './StatCard';
import RecentMediaCard from './RecentMediaCard';
import StorageUsage from './StorageUsage';

/**
 * Dashboard component displays an overview of the media assets,
 * storage statistics, and recent activities.
 *
 * @returns {JSX.Element} The rendered dashboard component
 */
const Dashboard = (): JSX.Element => {
  // Sample data - in real app this would come from an API
  const [storageStats] = useState({
    used: 2.7, // TB
    total: 5.0, // TB
    usage: [
      { name: 'Video', value: 65, color: 'bg-primary-500' },
      { name: 'Audio', value: 15, color: 'bg-success-500' },
      { name: 'Graphics', value: 10, color: 'bg-warning-500' },
      { name: 'Other', value: 10, color: 'bg-secondary-500' },
    ],
  });

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Overview of your media assets and storage
          </p>
        </div>
        <Link
          to="/media"
          className="btn btn-primary flex items-center justify-center space-x-2 whitespace-nowrap"
        >
          <FiPlusCircle className="h-4 w-4" />
          <span>New Upload</span>
        </Link>
      </div>

      {/* Stats cards grid */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Files"
          value="1,284"
          trend="+12%"
          trendUp={true}
          icon={<FiHardDrive className="h-6 w-6" />}
          color="primary"
        />
        <StatCard
          title="Storage Used"
          value={`${storageStats.used}/${storageStats.total} TB`}
          trend={`${Math.round((storageStats.used / storageStats.total) * 100)}%`}
          trendUp={false}
          icon={<FiHardDrive className="h-6 w-6" />}
          color="secondary"
        />
        <StatCard
          title="Cloud Sync"
          value="87%"
          trend="3 files pending"
          trendUp={null}
          icon={<FiCloudOff className="h-6 w-6" />}
          color="warning"
        />
        <StatCard
          title="System Health"
          value="Good"
          trend="No issues"
          trendUp={true}
          icon={<FiAlertTriangle className="h-6 w-6" />}
          color="success"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Storage usage chart - takes up 1/3 on large screens */}
        <div className="card lg:col-span-1">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Storage Usage</h2>
          <StorageUsage storageStats={storageStats} />
        </div>

        {/* Recent media - takes up 2/3 on large screens */}
        <div className="card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Media</h2>
            <Link
              to="/media"
              className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all
              <FiExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            <RecentMediaCard
              title="Final Cut - Mountain Sequence.mp4"
              thumbnail="/sample-thumb-1.jpg"
              type="video"
              size="1.2 GB"
              modified="2 hours ago"
              project="Adventure Series"
            />
            <RecentMediaCard
              title="Interview Audio - Sarah Johnson.wav"
              thumbnail="/sample-thumb-2.jpg"
              type="audio"
              size="248 MB"
              modified="Yesterday"
              project="Documentary"
            />
            <RecentMediaCard
              title="Logo Design - Client Approval.ai"
              thumbnail="/sample-thumb-3.jpg"
              type="image"
              size="15 MB"
              modified="2 days ago"
              project="Branding Project"
            />
            <RecentMediaCard
              title="VFX Sequence - Space Battle.mov"
              thumbnail="/sample-thumb-4.jpg"
              type="video"
              size="4.7 GB"
              modified="3 days ago"
              project="Sci-Fi Short"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
