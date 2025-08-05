'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

type WishlistContextType = {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
};

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedWishlist = localStorage.getItem('luna-gems-wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Failed to parse wishlist from localStorage', error);
      setWishlist([]);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('luna-gems-wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error('Failed to save wishlist to localStorage', error);
      }
    }
  }, [wishlist, isMounted]);

  const addToWishlist = (id: number) => {
    setWishlist((prev) => [...new Set([...prev, id])]);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
  };
  
  const isWishlisted = (id: number) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}
