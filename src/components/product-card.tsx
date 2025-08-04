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

// Helper function to get a valid image URL
function getValidImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return 'https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image';
  
  // Check if it's a valid URL from allowed domains
  const allowedDomains = [
    'placehold.co',
    'images.unsplash.com',
    'via.placeholder.com',
    'picsum.photos',
    'source.unsplash.com',
    'res.cloudinary.com',
    'cloudinary.com'
  ];
  
  try {
    const url = new URL(imageUrl);
    // Check if hostname matches allowed domains or is a subdomain of cloudinary.com
    if (allowedDomains.includes(url.hostname) || url.hostname.endsWith('.cloudinary.com')) {
      return imageUrl;
    }
  } catch {
    // Invalid URL
  }
  
  // Return fallback image
  return 'https://placehold.co/600x600/f3f4f6/9ca3af?text=Invalid+Image';
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const validImageUrl = getValidImageUrl(product.images?.[0]);
  const validLargeImageUrl = validImageUrl.replace('600x600', '1200x1200');

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-square w-full relative overflow-hidden cursor-zoom-in">
            <Image
              src={validImageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={product.ai_hint}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Featured badge */}
            {product.is_featured && (
              <Badge className="absolute top-3 left-3 bg-black text-white">
                Featured
              </Badge>
            )}
            
            {/* Wishlist button overlay */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
            data-ai-hint={product.ai_hint}
          />
        </DialogContent>
      </Dialog>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/products/${product.id}`} className="hover:text-gray-600 transition-colors">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{product.name}</h3>
          </Link>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Material and Gemstone */}
        <div className="flex gap-2 mb-4">
          <Badge variant="secondary" className="text-xs capitalize">
            {product.material}
          </Badge>
          {product.gemstone !== 'none' && (
            <Badge variant="outline" className="text-xs capitalize">
              {product.gemstone}
            </Badge>
          )}
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
          <div className="text-sm text-gray-500">
            {product.in_stock ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <AddToCartButton product={product} size="sm" />
          <Button asChild variant="outline" size="sm">
            <Link href={`/products/${product.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
