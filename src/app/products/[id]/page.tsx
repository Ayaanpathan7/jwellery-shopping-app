import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { WishlistButton } from '@/components/wishlist-button';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id, 10));

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

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
