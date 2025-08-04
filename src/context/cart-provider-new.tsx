'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/products-api';
import { toast } from '@/hooks/use-toast';
import { getCurrentUser } from '@/lib/auth';
import {
  getUserCart,
  addToCart as addToCartDB,
  removeFromCart as removeFromCartDB,
  updateCartQuantity as updateCartQuantityDB,
  clearCart as clearCartDB,
  migrateLocalCartToDatabase,
  CartItem as DBCartItem
} from '@/lib/user-data';

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

  // Load user and cart data
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUserId(user.id);

        // Migrate localStorage data if exists
        await migrateLocalCartToDatabase(user.id);

        // Load cart from database
        const cartData = await getUserCart(user.id);
        const formattedItems: CartItem[] = cartData.map((item: DBCartItem) => ({
          id: item.product_id.toString(),
          product: {
            id: item.product_id,
            name: item.product?.name || '',
            description: item.product?.description || '',
            price: item.product?.price || 0,
            images: [item.product?.image_url || 'https://placehold.co/600x600'],
            is_featured: false,
            ai_hint: item.product?.material || 'jewelry',
            material: item.product?.material || 'unknown',
            gemstone: item.product?.gemstone || 'none',
            in_stock: item.product?.in_stock || true,
            created_at: item.product?.created_at || ''
          },
          quantity: item.quantity
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error('Error initializing cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, []);

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
