import Image from 'next/image';
import type { Product } from '@/lib/products-api';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { WishlistButton } from './wishlist-button';
import { AddToCartButton } from './add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

// Helper function to get a valid image URL from database
function getValidImageUrl(product: Product): string {
  // Use the first image from the database if available
  if (product.images && product.images.length > 0 && product.images[0]) {
    const imageUrl = product.images[0];
    
    // Check if it's a valid URL
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      // If not a valid URL, return placeholder
      return 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image';
    }
  }
  
  // Return placeholder if no images
  return 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image';
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  const validImageUrl = getValidImageUrl(product);
  const validLargeImageUrl = validImageUrl.replace('600x600', '1200x1200');

  return (
    <div className="group relative bg-white border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Product Image */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-square w-full relative overflow-hidden cursor-zoom-in">
            <Image
              src={validImageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Featured badge */}
            {product.is_featured && (
              <Badge className="absolute top-3 left-3 bg-gray-900 text-white text-xs">
                Featured
              </Badge>
            )}
            
            {/* Wishlist button overlay */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <WishlistButton product={product} />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0">
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <Image
            src={validLargeImageUrl}
            alt={product.name}
            width={1200}
            height={1200}
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <Link href={`/products/${product.id}`} className="hover:text-gray-600 transition-colors">
            <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
          </Link>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Material */}
        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.material}</span>
          {product.gemstone && product.gemstone !== 'none' && (
            <span className="text-xs text-gray-500 ml-2">• {product.gemstone}</span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">
            {formatPrice(product.price)}
          </div>
          
          {/* Stock status */}
          <div className="text-xs">
            {product.in_stock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
