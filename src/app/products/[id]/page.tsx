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

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
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
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-primary fill-current' : 'text-muted-foreground/50'}`} />
                    ))}
                </div>
                <span className="text-muted-foreground text-sm">({mockReviews.length} reviews)</span>
            </div>
            <p className="text-2xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>
            <div className="flex gap-2 mb-6">
              <Badge variant="outline" className="capitalize">{product.material}</Badge>
              <Badge variant="outline" className="capitalize">{product.gemstone}</Badge>
              {product.is_featured && <Badge variant="secondary">Featured</Badge>}
              <Badge variant={product.in_stock ? "default" : "destructive"}>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <p className="text-muted-foreground font-body text-lg mb-8">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <AddToCartButton product={product} size="lg" />
              <WishlistButton product={product} />
            </div>
            <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-primary-foreground mb-2">Product Details</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Handcrafted with ethically sourced materials.</li>
                    <li>Available in 14k Gold, Rose Gold, and Sterling Silver.</li>
                    <li>Comes in a signature Creations by Shubhi gift box.</li>
                </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-16 md:my-24" />

        <div className="grid md:grid-cols-5 gap-16">
            <div className="md:col-span-3">
                <h2 className="text-3xl font-bold font-headline mb-8 text-primary-foreground">Customer Reviews</h2>
                <ReviewList productId={product.id} />
            </div>
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold font-headline mb-8 text-primary-foreground">Write a Review</h2>
                <Card className="bg-accent">
                  <CardContent className="p-6">
                    <ReviewForm productId={product.id} />
                  </CardContent>
                </Card>
            </div>
        </div>


        <div className="mt-24">
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold mb-12 text-primary-foreground">
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
