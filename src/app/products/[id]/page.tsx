import { getProductServer, getProductsServer } from '@/lib/products-server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/wishlist-button';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ReviewList, type Review } from '@/components/review-list';
import { ReviewForm } from '@/components/review-form';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockReviews: Review[] = [
  { id: 1, user_name: 'Sophia L.', rating: 5, comment: 'Absolutely stunning! The craftsmanship is top-notch. I get compliments every time I wear it.', created_at: '2 weeks ago' },
  { id: 2, user_name: 'James R.', rating: 4, comment: 'Beautiful piece, very elegant. The packaging was lovely too. It was a bit smaller than I expected, but I still love it.', created_at: '1 month ago' },
  { id: 3, user_name: 'Isabella C.', rating: 5, comment: 'I bought this as a gift for my sister and she was overjoyed. It\'s even more beautiful in person. Highly recommend!', created_at: '3 weeks ago' },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductServer(id);

  if (!product) {
    notFound();
  }

  // Get related products (excluding current product)
  const allProducts = await getProductsServer();
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  // Use actual product images from database, or placeholder if none
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ['https://placehold.co/600x600/f3f4f6/9ca3af?text=No+Image'];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Carousel className="w-full">
            <CarouselContent>
              {productImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-zoom-in group">
                        <Image
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={product.ai_hint}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0">
                       <DialogTitle className="sr-only">{`${product.name} - view ${index + 1}`}</DialogTitle>
                       <Image
                          src={image.replace('600x600', '1200x1200')}
                          alt={`${product.name} view ${index + 1}`}
                          width={1200}
                          height={1200}
                          className="w-full h-auto"
                          data-ai-hint={product.ai_hint}
                        />
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                </div>
                <span className="text-gray-500 text-sm">({mockReviews.length} reviews)</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
            <div className="flex gap-2 mb-6">
              <span className="text-sm text-gray-500 capitalize">{product.material}</span>
              {product.gemstone !== 'none' && (
                <span className="text-sm text-gray-500">• {product.gemstone}</span>
              )}
              {product.is_featured && <Badge className="bg-gray-900 text-white text-xs">Featured</Badge>}
            </div>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <AddToCartButton product={product} size="lg" />
              <WishlistButton product={product} />
            </div>
            <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Product Details</h3>
                <ul className="text-gray-600 space-y-2">
                    <li>• Handcrafted with ethically sourced materials</li>
                    <li>• Available in multiple finishes</li>
                    <li>• Comes in signature Creations by Shubhi packaging</li>
                    <li>• Lifetime warranty included</li>
                </ul>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-16 border-t pt-16">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-light text-gray-900 mb-6">Customer Reviews</h2>
                    <ReviewList productId={product.id} />
                </div>
                <div>
                    <h2 className="text-2xl font-light text-gray-900 mb-6">Write a Review</h2>
                    <Card className="border border-gray-200">
                      <CardContent className="p-6">
                        <ReviewForm productId={product.id} />
                      </CardContent>
                    </Card>
                </div>
            </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
            <h2 className="text-center text-3xl font-light text-gray-900 mb-12">
                You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                     <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                        <ProductCard product={relatedProduct} />
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
