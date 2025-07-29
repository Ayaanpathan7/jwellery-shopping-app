import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/wishlist-button';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { ReviewList, type Review } from '@/components/review-list';
import { ReviewForm } from '@/components/review-form';
import { Card, CardContent } from '@/components/ui/card';

const mockReviews: Review[] = [
  { id: 1, name: 'Sophia L.', rating: 5, review: 'Absolutely stunning! The craftsmanship is top-notch. I get compliments every time I wear it.', date: '2 weeks ago' },
  { id: 2, name: 'James R.', rating: 4, review: 'Beautiful piece, very elegant. The packaging was lovely too. It was a bit smaller than I expected, but I still love it.', date: '1 month ago' },
  { id: 3, name: 'Isabella C.', rating: 5, review: 'I bought this as a gift for my sister and she was overjoyed. It\'s even more beautiful in person. Highly recommend!', date: '3 weeks ago' },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id, 10));

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

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
                          data-ai-hint={product.aiHint}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0">
                       <Image
                          src={image.replace('600x600', '1200x1200')}
                          alt={`${product.name} view ${index + 1}`}
                          width={1200}
                          height={1200}
                          className="w-full h-auto"
                          data-ai-hint={product.aiHint}
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
            <p className="text-2xl font-semibold text-primary mb-6">{product.price}</p>
            <p className="text-muted-foreground font-body text-lg mb-8">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-grow">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <WishlistButton productId={product.id} />
            </div>
            <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-primary-foreground mb-2">Product Details</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Handcrafted with ethically sourced materials.</li>
                    <li>Available in 14k Gold, Rose Gold, and Sterling Silver.</li>
                    <li>Comes in a signature Luna Gems gift box.</li>
                </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-16 md:my-24" />

        <div className="grid md:grid-cols-5 gap-16">
            <div className="md:col-span-3">
                <h2 className="text-3xl font-bold font-headline mb-8 text-primary-foreground">Customer Reviews</h2>
                <ReviewList reviews={mockReviews} />
            </div>
            <div className="md:col-span-2">
                <h2 className="text-3xl font-bold font-headline mb-8 text-primary-foreground">Write a Review</h2>
                <Card className="bg-accent">
                  <CardContent className="p-6">
                    <ReviewForm />
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
