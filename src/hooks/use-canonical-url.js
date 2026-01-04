import { useRouter } from 'next/router';

export const useCanonicalUrl = () => {
  const router = useRouter();
  
  // Generate canonical URL based on current path
  // Redirects in middleware.js and .htaccess ensure URLs are already clean (no .html suffix)
  // Only remove query params for canonical URLs
  const path = router.asPath.split('?')[0] || '/';
  const canonicalUrl = path === '/' 
    ? 'https://arbovert.cz/' 
    : `https://arbovert.cz${path}`;
  
  return canonicalUrl;
}; 