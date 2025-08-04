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
            id: item.product_id.toString(),
            name: item.product?.name || '',
            description: item.product?.description || '',
            price: `₹${item.product?.price || 0}`,
            images: [item.product?.image_url || 'https://placehold.co/600x600'],
            is_featured: false,
            ai_hint: item.product?.material || 'jewelry'
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
      const success = await addToCartDB(currentUserId, parseInt(product.id), quantity);
      
      if (success) {
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          setItems(items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ));
        } else {
          setItems([...items, { id: product.id, product, quantity }]);
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
