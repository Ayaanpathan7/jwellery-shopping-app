'use client';

import { useWishlist as useWishlistProvider } from '@/context/wishlist-provider';

export const useWishlist = () => {
  return useWishlistProvider();
};
