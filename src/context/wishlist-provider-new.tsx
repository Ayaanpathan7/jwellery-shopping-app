'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import {
  getUserWishlist,
  addToWishlist as addToWishlistDB,
  removeFromWishlist as removeFromWishlistDB,
  isInWishlist as isInWishlistDB,
  migrateLocalWishlistToDatabase
} from '@/lib/user-data';

type WishlistContextType = {
  wishlist: number[];
  addToWishlist: (id: number) => Promise<void>;
  removeFromWishlist: (id: number) => Promise<void>;
  isWishlisted: (id: number) => boolean;
  isLoading: boolean;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  useEffect(() => {
    const initializeWishlist = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.id);

        // Migrate localStorage data if exists
        await migrateLocalWishlistToDatabase(user.id);

        // Load wishlist from database
        const wishlistData = await getUserWishlist(user.id);
        const productIds = wishlistData.map(item => item.product_id);
        setWishlist(productIds);
      } catch (error) {
        console.error('Error initializing wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWishlist();
  }, []);

  const addToWishlist = async (id: number) => {
    try {
      const success = await addToWishlistDB(currentUserId, id);
      if (success) {
        setWishlist((prev) => [...new Set([...prev, id])]);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (id: number) => {
    try {
      const success = await removeFromWishlistDB(currentUserId, id);
      if (success) {
        setWishlist((prev) => prev.filter((itemId) => itemId !== id));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  const isWishlisted = (id: number) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isWishlisted,
      isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
}
