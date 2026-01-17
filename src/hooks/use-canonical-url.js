"use client";

import { usePathname, useSearchParams } from 'next/navigation';

export const useCanonicalUrl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Generate canonical URL based on current path
  // Only include search params if needed, otherwise use clean pathname
  const path = pathname || '/';
  const query = searchParams?.toString();
  const fullPath = query ? `${path}?${query}` : path;
  
  const canonicalUrl = path === '/' 
    ? 'https://arbovert.cz/' 
    : `https://arbovert.cz${fullPath}`;
  
  return canonicalUrl;
}; 