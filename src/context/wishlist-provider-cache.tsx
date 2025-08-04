'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/products-api';
import { toast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/auth';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // Generate storage key for user-specific wishlist
  const getStorageKey = (userId: string) => `luna_gems_wishlist_${userId}`;

  // Load wishlist from localStorage
  const loadWishlistFromStorage = (userId: string): Product[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(getStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  };

  // Save wishlist to localStorage
  const saveWishlistToStorage = (userId: string, wishlistItems: Product[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  };

  // Load user and wishlist data
  useEffect(() => {
    const initializeWishlist = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.id);

        // Load wishlist from localStorage for this user
        const wishlistData = loadWishlistFromStorage(user.id);
        setItems(wishlistData);
      } catch (error) {
        console.error('Error initializing wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWishlist();
  }, []);

  // Save wishlist whenever items change
  useEffect(() => {
    if (currentUserId && !isLoading) {
      saveWishlistToStorage(currentUserId, items);
    }
  }, [items, currentUserId, isLoading]);

  const addToWishlist = (product: Product) => {
    try {
      if (!isInWishlist(product.id.toString())) {
        setItems([...items, product]);
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      } else {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist.`,
        });
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist.",
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    try {
      const product = items.find(item => item.id.toString() === productId);
      setItems(items.filter(item => item.id.toString() !== productId));
      
      if (product) {
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        });
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive",
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id.toString() === productId);
  };

  const clearWishlist = () => {
    try {
      setItems([]);
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist.",
      });
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to clear wishlist.",
        variant: "destructive",
      });
    }
  };

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    isLoading,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
