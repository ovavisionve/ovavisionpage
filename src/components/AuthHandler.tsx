'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Don't process if we're already on the callback page
    if (pathname === '/auth/callback') return;

    const hash = window.location.hash;

    // Check if we have auth tokens in the URL hash
    if (hash && hash.includes('access_token=')) {
      // Redirect to callback page with the hash intact
      router.push(`/auth/callback${hash}`);
    }
  }, [pathname, router]);

  return null;
}
