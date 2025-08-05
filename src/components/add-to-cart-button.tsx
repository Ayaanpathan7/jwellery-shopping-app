'use client';

import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-provider';
import { Product } from '@/lib/products-api';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function AddToCartButton({ 
  product, 
  variant = 'default', 
  size = 'default',
  className = ''
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Button 
      variant={variant}
      size={size} 
      className={`flex-grow ${className}`}
      disabled={!product.in_stock}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-4 w-4" /> 
      {product.in_stock ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}
