interface StorageStatsType {
  used: number;
  total: number;
  usage: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

interface StorageUsageProps {
  storageStats: StorageStatsType;
}

/**
 * StorageUsage component displays storage usage breakdown by file type.
 *
 * @param {object} props - Component props
 * @param {StorageStatsType} props.storageStats - Storage statistics data
 * @returns {JSX.Element} The rendered storage usage component
 */
const StorageUsage = ({ storageStats }: StorageUsageProps): JSX.Element => {
  // Calculate the percentage of total storage used
  const usedPercentage = Math.round((storageStats.used / storageStats.total) * 100);

  return (
    <div>
      {/* Overall usage gauge */}
      <div className="mb-4 flex flex-col items-center">
        <svg className="h-32 w-32" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
            className="dark:stroke-gray-700"
          />

          {/* Progress arc - stroke-dasharray is the circumference of the circle */}
          {/* stroke-dashoffset creates the arc effect based on the percentage */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={usedPercentage > 90 ? '#ef4444' : '#6366f1'}
            strokeWidth="10"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * usedPercentage) / 100}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className={usedPercentage > 90 ? 'dark:stroke-danger-500' : 'dark:stroke-primary-500'}
          />

          {/* Percentage text */}
          <text
            x="50"
            y="50"
            fontSize="18"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#1e293b"
            className="font-bold dark:fill-white"
          >
            {usedPercentage}%
          </text>

          <text
            x="50"
            y="65"
            fontSize="8"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#64748b"
            className="dark:fill-gray-400"
          >
            of {storageStats.total} TB
          </text>
        </svg>

        <p className="mt-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
          {storageStats.used} TB used of {storageStats.total} TB total
        </p>
      </div>

      {/* Usage breakdown */}
      <div className="mt-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage Breakdown</h3>

        {storageStats.usage.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${item.color}`} />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {item.value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageUsage;
