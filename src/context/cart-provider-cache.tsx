'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/products-api';
import { toast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/auth';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // Generate storage key for user-specific cart
  const getStorageKey = (userId: string) => `luna_gems_cart_${userId}`;

  // Load cart from localStorage
  const loadCartFromStorage = (userId: string): CartItem[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(getStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  };

  // Save cart to localStorage
  const saveCartToStorage = (userId: string, cartItems: CartItem[]) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  // Load user and cart data
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.id);

        // Load cart from localStorage for this user
        const cartData = loadCartFromStorage(user.id);
        setItems(cartData);
      } catch (error) {
        console.error('Error initializing cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

  // Save cart whenever items change
  useEffect(() => {
    if (currentUserId && !isLoading) {
      saveCartToStorage(currentUserId, items);
    }
  }, [items, currentUserId, isLoading]);

  const addToCart = (product: Product, quantity = 1) => {
    try {
      const existingItem = items.find(item => item.id === product.id.toString());
      
      if (existingItem) {
        setItems(items.map(item =>
          item.id === product.id.toString()
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ));
      } else {
        setItems([...items, { id: product.id.toString(), product, quantity }]);
      }

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      const item = items.find(item => item.id === productId);
      setItems(items.filter(item => item.id !== productId));
      
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.product.name} has been removed from your cart.`,
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setItems(items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity.",
        variant: "destructive",
      });
    }
  };

  const clearCart = () => {
    try {
      setItems([]);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive",
      });
    }
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const isInCart = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
    isInCart,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
