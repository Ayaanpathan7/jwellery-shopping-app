'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type WishlistButtonProps = {
  productId: number;
};

export function WishlistButton({ productId }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Heart className="h-6 w-6" />
      </Button>
    );
  }

  const inWishlist = isWishlisted(productId);

  const handleClick = () => {
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
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
      />
    </Button>
  );
}
