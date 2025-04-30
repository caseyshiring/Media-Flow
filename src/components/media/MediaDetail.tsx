import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCalendar,
  FiDownload,
  FiEdit2,
  FiHeart,
  FiInfo,
  FiShare2,
  FiTag,
  FiTrash2,
  FiX,
  FiPlus,
} from 'react-icons/fi';
import { format } from 'date-fns';
import { MediaItem } from '@/hooks/useMockMediaData';
import LoadingSpinner from '@/components/common/LoadingSpinner';

/**
 * MediaDetail component displays detailed information about a specific media item.
 *
 * @returns {JSX.Element} The rendered media detail component
 */
const MediaDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState<MediaItem | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Mock comments for the detail view
  const [comments, setComments] = useState([
    {
      id: '1',
      user: 'Mock user 1',
      avatar: 'https://via.placeholder.com/40',
      text: 'Wow, nice media file.',
      date: '1993-07-23T09:15:00',
    },
    {
      id: '2',
      user: 'Mock user 2',
      avatar: 'https://via.placeholder.com/40',
      text: 'Yay! Another comment!',
      date: '2024-05-05T05:00:00',
    },
  ]);

  // Simulate API fetch
  useEffect(() => {
    const fetchMediaDetails = async () => {
      // In a real app, this would be an API call
      setIsLoading(true);

      // Simulate network request
      setTimeout(() => {
        // Mock data for demonstration
        const mockMedia: MediaItem = {
          id: id || '1',
          title: 'Aerial Mountain Range Sequence.mp4',
          type: 'video',
          size: '1.2 GB',
          modified: '2025-04-25T15:32:00',
          thumbnail: 'https://via.placeholder.com/800x450?text=Video+Preview',
          favorite: true,
          tags: ['landscape', 'aerial', 'mountains', 'approved'],
          project: 'Adventure Series',
        };

        setMedia(mockMedia);
        setIsFavorite(mockMedia.favorite || false);
        setIsLoading(false);
      }, 1000);
    };

    fetchMediaDetails();
  }, [id]);

  // Handle adding a new comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      user: 'You',
      avatar: 'https://via.placeholder.com/40',
      text: commentText,
      date: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
  };

  // Handle toggling favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would make an API call to update the server
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="large" message="Loading media details..." />
      </div>
    );
  }

  if (!media) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
          <FiInfo className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Media Not Found</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          The media item you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/media" className="btn btn-primary flex items-center space-x-2">
          <FiArrowLeft className="h-4 w-4" />
          <span>Back to Media Library</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Back button and actions header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Media Library
        </button>

        <div className="flex space-x-2">
          <button
            onClick={toggleFavorite}
            className={`flex items-center rounded-md border px-3 py-1.5 text-sm font-medium ${
              isFavorite
                ? 'border-pink-500 bg-pink-50 text-pink-600 dark:border-pink-500/50 dark:bg-pink-900/20 dark:text-pink-400'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50'
            }`}
          >
            <FiHeart
              className={`mr-1.5 h-4 w-4 ${isFavorite ? 'fill-pink-500 dark:fill-pink-400' : ''}`}
            />
            {isFavorite ? 'Favorited' : 'Favorite'}
          </button>

          <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700/50">
            <FiShare2 className="mr-1.5 h-4 w-4" />
            Share
          </button>

          <button className="flex items-center rounded-md border border-danger-500 bg-white px-3 py-1.5 text-sm font-medium text-danger-600 hover:bg-danger-50 dark:border-danger-500/50 dark:bg-transparent dark:text-danger-400 dark:hover:bg-danger-900/20">
            <FiTrash2 className="mr-1.5 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Media preview - takes up 2/3 on large screens */}
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            {/* Video preview */}
            <div className="relative aspect-video w-full bg-black">
              <img
                src={media.thumbnail}
                alt={media.title}
                className="h-full w-full object-contain"
              />
              {media.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    className="rounded-full bg-primary-600 bg-opacity-80 p-4 text-white transition hover:bg-opacity-100"
                    aria-label="Play video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{media.title}</h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <FiCalendar className="mr-1.5 h-4 w-4" />
                  <span>Modified {format(new Date(media.modified), 'MMM d, yyyy')}</span>
                </div>

                {media.project && (
                  <div className="flex items-center">
                    <span className="mr-1.5 h-2 w-2 rounded-full bg-primary-500"></span>
                    <span>{media.project}</span>
                  </div>
                )}

                <div>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {media.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="card mt-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Comments</h3>

            {/* New comment form */}
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <svg
                    className="h-full w-full text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />

                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="btn btn-primary text-sm disabled:opacity-50"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.length ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex space-x-3 border-t border-gray-200 pt-4 dark:border-gray-700"
                  >
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                      <img
                        src={comment.avatar}
                        alt={`${comment.user}'s avatar`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {comment.user}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(new Date(comment.date), 'MMM d, h:mm a')}
                        </p>
                      </div>

                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {comment.text}
                      </p>

                      <div className="mt-2 flex space-x-4">
                        <button
                          type="button"
                          className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Reply
                        </button>
                        <button
                          type="button"
                          className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          Like
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - takes up 1/3 on large screens */}
        <div className="space-y-6">
          {/* Info panel */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">File Info</h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Type</dt>
                <dd className="text-gray-900 dark:text-white">
                  {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Size</dt>
                <dd className="text-gray-900 dark:text-white">{media.size}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="text-gray-900 dark:text-white">
                  {format(new Date(media.modified), 'MMM d, yyyy')}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Modified</dt>
                <dd className="text-gray-900 dark:text-white">
                  {format(new Date(media.modified), 'MMM d, yyyy')}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd>
                  <span className="inline-flex items-center rounded-full bg-success-100 px-2.5 py-0.5 text-xs font-medium text-success-800 dark:bg-success-900/30 dark:text-success-400">
                    Active
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <FiDownload className="mr-2 h-4 w-4" />
                Download File
              </button>
            </div>
          </div>

          {/* Tags panel */}
          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tags</h3>

              <button
                type="button"
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                aria-label="Add tag"
              >
                <FiPlus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {media.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                >
                  <FiTag className="mr-1.5 h-3 w-3" />
                  {tag}
                  <button className="ml-1.5 flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}

              {!media.tags?.length && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tags yet. Add some tags to help organize your media.
                </p>
              )}
            </div>
          </div>

          {/* Version history panel */}
          <div className="card">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Version History
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <FiEdit2 className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      Current Version
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format(new Date(media.modified), 'MMM d, yyyy')}
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Updated by Alex Morgan
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  <FiEdit2 className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Version 1.1
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Apr 20, 2025</p>
                  </div>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Updated by Jamie Chen
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  <FiEdit2 className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Original Upload
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Apr 15, 2025</p>
                  </div>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Uploaded by you</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all versions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;
