'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/products-api';

type WishlistButtonProps = {
  product: Product;
};

export function WishlistButton({ product }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Heart className="h-6 w-6" suppressHydrationWarning />
      </Button>
    );
  }

  const inWishlist = isInWishlist(product.id.toString());

  const handleClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id.toString());
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      className="text-primary hover:text-primary/80"
    >
      <Heart
        className={cn('h-6 w-6 transition-all', {
          'fill-current': inWishlist,
        })}
        suppressHydrationWarning
      />
    </Button>
  );
}
