import { useRouter } from 'next/router';

export const useCanonicalUrl = () => {
  const router = useRouter();
  
  // Generate canonical URL based on current path
  // Add .html suffix for all pages except homepage
  const path = router.asPath;
  const canonicalUrl = path === '/' 
    ? 'https://arbovert.cz/' 
    : `https://arbovert.cz${path}.html`;
  
  return canonicalUrl;
}; 