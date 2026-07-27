import { BASE_URL } from '../api/apiClient';

export const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // If path targets backend API routes (e.g. /banners, /posts, /gallery, /api/...), ensure /api prefix is preserved
  if (
    cleanPath.startsWith('/api') ||
    cleanPath.startsWith('/banners') ||
    cleanPath.startsWith('/posts') ||
    cleanPath.startsWith('/gallery') ||
    cleanPath.startsWith('/events') ||
    cleanPath.startsWith('/entertainment')
  ) {
    const apiBase = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL.replace(/\/$/, '')}/api`;
    const relativePath = cleanPath.startsWith('/api') ? cleanPath.substring(4) : cleanPath;
    return `${apiBase}${relativePath}`;
  }

  // Static uploads directory (e.g. /uploads/image.jpg)
  const rootDomain = BASE_URL.replace(/\/api\/?$/, '');
  return `${rootDomain}${cleanPath}`;
};
