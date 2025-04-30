import { useState, useEffect } from 'react';

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'audio' | 'document';
  size: string;
  modified: string;
  thumbnail?: string;
  favorite?: boolean;
  tags?: string[];
  project?: string;
}

/**
 * Hook that provides mock media data for demonstration purposes.
 * In a real application, this would be replaced with API calls.
 *
 * @returns {object} Object containing media items and loading state
 */
export function useMockMediaData() {
  const [isLoading, setIsLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setMediaItems(mockMediaItems);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { mediaItems, isLoading };
}

// Mock data for the media items
const mockMediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'Aerial Mountain Range.mp4',
    type: 'video',
    size: '1.2 GB',
    modified: '2025-04-25T15:32:00',
    thumbnail: 'https://via.placeholder.com/150?text=Video',
    favorite: true,
    tags: ['landscape', 'aerial', 'mountains'],
    project: 'Adventure Series',
  },
  {
    id: '2',
    title: 'Client Interview Audio.wav',
    type: 'audio',
    size: '248 MB',
    modified: '2025-04-24T09:15:00',
    thumbnail: 'https://via.placeholder.com/150?text=Audio',
    tags: ['interview', 'client'],
    project: 'Documentary',
  },
  {
    id: '3',
    title: 'Logo Design - Final.ai',
    type: 'image',
    size: '15 MB',
    modified: '2025-04-23T14:45:00',
    thumbnail: 'https://via.placeholder.com/150?text=Image',
    favorite: true,
    tags: ['logo', 'design', 'approved'],
    project: 'Branding Project',
  },
  {
    id: '4',
    title: 'VFX Sequence - Space Battle.mov',
    type: 'video',
    size: '4.7 GB',
    modified: '2025-04-22T11:20:00',
    thumbnail: 'https://via.placeholder.com/150?text=Video',
    tags: ['vfx', 'space', 'battle'],
    project: 'Sci-Fi Short',
  },
  {
    id: '5',
    title: 'Project Proposal.pdf',
    type: 'document',
    size: '3.5 MB',
    modified: '2025-04-21T16:08:00',
    tags: ['proposal', 'client', 'budget'],
    project: 'New Business',
  },
  {
    id: '6',
    title: 'Camera Test - Low Light.mp4',
    type: 'video',
    size: '2.1 GB',
    modified: '2025-04-20T19:30:00',
    thumbnail: 'https://via.placeholder.com/150?text=Video',
    tags: ['test', 'low-light', 'camera'],
  },
  {
    id: '7',
    title: 'Soundtrack Draft 2.mp3',
    type: 'audio',
    size: '85 MB',
    modified: '2025-04-19T12:40:00',
    thumbnail: 'https://via.placeholder.com/150?text=Audio',
    tags: ['music', 'soundtrack', 'draft'],
    project: 'Feature Film',
  },
  {
    id: '8',
    title: 'Location Photos - Beach.zip',
    type: 'image',
    size: '384 MB',
    modified: '2025-04-18T10:15:00',
    thumbnail: 'https://via.placeholder.com/150?text=Images',
    tags: ['location', 'beach', 'scouting'],
    project: 'Travel Show',
  },
  {
    id: '9',
    title: 'Voice Over - Final Mix.wav',
    type: 'audio',
    size: '175 MB',
    modified: '2025-04-17T15:50:00',
    thumbnail: 'https://via.placeholder.com/150?text=Audio',
    favorite: true,
    tags: ['voice', 'narration', 'final'],
    project: 'Documentary',
  },
  {
    id: '10',
    title: 'Storyboard Sketches.pdf',
    type: 'document',
    size: '8.7 MB',
    modified: '2025-04-16T09:25:00',
    tags: ['storyboard', 'preproduction'],
    project: 'Short Film',
  },
  {
    id: '11',
    title: 'Product Renders - Final.psd',
    type: 'image',
    size: '154 MB',
    modified: '2025-04-15T14:10:00',
    thumbnail: 'https://via.placeholder.com/150?text=Image',
    tags: ['product', 'render', 'final'],
    project: 'Commercial',
  },
  {
    id: '12',
    title: 'Background Music Options.zip',
    type: 'audio',
    size: '320 MB',
    modified: '2025-04-14T11:30:00',
    thumbnail: 'https://via.placeholder.com/150?text=Audio',
    tags: ['music', 'options', 'background'],
  },
];
