'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { getProducts, type Product } from '@/lib/products-api';
import { HeartCrack } from 'lucide-react';

export default function WishlistPage() {
  const { items: wishlist } = useWishlist();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
    // With cache-based wishlist, we already have the full Product objects
    setWishlistItems(wishlist);
    setLoading(false);
  }, [wishlist]);

  if (!isClient || loading) {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Your Wishlist
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-lg shadow-sm animate-pulse">
                        <div className="aspect-square bg-muted rounded-md mb-4"></div>
                        <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded-md w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Your Wishlist
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your favorite handcrafted treasures, all in one place.
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
             <HeartCrack className="mx-auto h-20 w-20 text-muted-foreground/50" />
            <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven't added any items yet.
            </p>
            <Button asChild className="mt-6">
              <Link href="/gallery">Start Exploring</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
