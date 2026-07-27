import { BASE_URL } from '../api/apiClient';

export const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Strip trailing /api if present in BASE_URL when accessing static /uploads directory
  const rootDomain = BASE_URL.replace(/\/api\/?$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${rootDomain}${cleanPath}`;
};
