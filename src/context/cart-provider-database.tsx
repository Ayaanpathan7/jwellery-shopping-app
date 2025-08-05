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
  const getStorageKey = (userId: string) => `cart_${userId}`;

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

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const success = await addToCartDB(currentUserId, product.id, quantity);
      
      if (success) {
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
      } else {
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const success = await removeFromCartDB(currentUserId, parseInt(productId));
      
      if (success) {
        const item = items.find(item => item.id === productId);
        setItems(items.filter(item => item.id !== productId));
        
        if (item) {
          toast({
            title: "Removed from cart",
            description: `${item.product.name} has been removed from your cart.`,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to remove item from cart. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const success = await updateCartQuantityDB(currentUserId, parseInt(productId), quantity);
      
      if (success) {
        if (quantity <= 0) {
          setItems(items.filter(item => item.id !== productId));
        } else {
          setItems(items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          ));
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to update quantity. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      const success = await clearCartDB(currentUserId);
      
      if (success) {
        setItems([]);
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to clear cart. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
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
