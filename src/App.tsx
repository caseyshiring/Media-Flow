import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, lazy } from 'react';

// Layouts
import MainLayout from '@/components/layout/MainLayout';

// Pages
const Dashboard = lazy(() => import('@/components/dashboard/Dashboard'));
const Projects = lazy(() => import('@/components/dashboard/Projects'));
const MediaBrowser = lazy(() => import('@/components/media/MediaBrowser'));
const MediaDetail = lazy(() => import('@/components/media/MediaDetail'));
const ErrorFallback = lazy(() => import('@/components/common/ErrorFallback'));
const NotFound = lazy(() => import('@/components/common/NotFound'));

// Loading
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Theme Provider
import { ThemeProvider } from '@/hooks/useTheme';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="media" element={<MediaBrowser />} />
              <Route path="media/:id" element={<MediaDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
