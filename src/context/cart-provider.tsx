'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/products-api';
import { toast } from '@/hooks/use-toast';

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('luna-gems-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever items change (but not on initial load)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('luna-gems-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!product.in_stock) {
      // Defer toast to avoid render conflicts
      setTimeout(() => {
        toast({
          title: "Out of Stock",
          description: "This item is currently out of stock.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Defer toast to avoid render conflicts
        setTimeout(() => {
          toast({
            title: "Updated Cart",
            description: `${product.name} quantity updated to ${existingItem.quantity + quantity}`,
          });
        }, 0);
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Defer toast to avoid render conflicts
        setTimeout(() => {
          toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart`,
          });
        }, 0);
        return [...currentItems, { id: product.id, product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => {
      const item = currentItems.find(item => item.id === productId);
      if (item) {
        // Defer toast to avoid render conflicts
        setTimeout(() => {
          toast({
            title: "Removed from Cart",
            description: `${item.product.name} has been removed from your cart`,
          });
        }, 0);
      }
      return currentItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    // Defer toast to avoid render conflicts
    setTimeout(() => {
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      });
    }, 0);
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

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      getTotalPrice,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
