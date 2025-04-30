import { ReactNode } from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { cn } from '@/utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean | null;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

/**
 * StatCard component displays a metric with its trend in a card format.
 *
 * @param {object} props - Component props
 * @param {string} props.title - Title of the stat
 * @param {string} props.value - Value of the stat
 * @param {string} props.trend - Trend text to display
 * @param {boolean | null} props.trendUp - Whether trend is positive, negative, or neutral
 * @param {ReactNode} props.icon - Icon to display
 * @param {string} props.color - Color scheme for the card
 * @returns {JSX.Element} The rendered stat card component
 */
const StatCard = ({ title, value, trend, trendUp, icon, color }: StatCardProps): JSX.Element => {
  // Color mappings for different card types
  const colorMap = {
    primary: {
      icon: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
      trend: {
        up: 'text-success-600 dark:text-success-400',
        down: 'text-danger-600 dark:text-danger-400',
        neutral: 'text-gray-500 dark:text-gray-400',
      },
    },
    secondary: {
      icon: 'bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400',
      trend: {
        up: 'text-success-600 dark:text-success-400',
        down: 'text-danger-600 dark:text-danger-400',
        neutral: 'text-gray-500 dark:text-gray-400',
      },
    },
    success: {
      icon: 'bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400',
      trend: {
        up: 'text-success-600 dark:text-success-400',
        down: 'text-danger-600 dark:text-danger-400',
        neutral: 'text-gray-500 dark:text-gray-400',
      },
    },
    warning: {
      icon: 'bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400',
      trend: {
        up: 'text-success-600 dark:text-success-400',
        down: 'text-danger-600 dark:text-danger-400',
        neutral: 'text-gray-500 dark:text-gray-400',
      },
    },
    danger: {
      icon: 'bg-danger-100 text-danger-600 dark:bg-danger-900/30 dark:text-danger-400',
      trend: {
        up: 'text-success-600 dark:text-success-400',
        down: 'text-danger-600 dark:text-danger-400',
        neutral: 'text-gray-500 dark:text-gray-400',
      },
    },
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={cn('rounded-lg p-2', colorMap[color].icon)}>{icon}</div>
      </div>

      <div className="mt-4 flex items-center">
        {trendUp !== null ? (
          trendUp ? (
            <FiArrowUp className={cn('mr-1 h-3 w-3', colorMap[color].trend.up)} />
          ) : (
            <FiArrowDown className={cn('mr-1 h-3 w-3', colorMap[color].trend.down)} />
          )
        ) : null}

        <p
          className={cn(
            'text-xs font-medium',
            trendUp === null
              ? colorMap[color].trend.neutral
              : trendUp
              ? colorMap[color].trend.up
              : colorMap[color].trend.down
          )}
        >
          {trend}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
