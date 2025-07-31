import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProductsServer } from '@/lib/products-server';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProductsServer();

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center text-white flex items-center justify-center">
        <Image
          src="https://placehold.co/1800x1000"
          alt="Signature jewelry piece on a dark, elegant background"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute z-0"
          data-ai-hint="elegant jewelry"
          priority
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Luna Gems
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-body max-w-2xl mx-auto drop-shadow-md">
            Handcrafted Elegance for Every Moment.
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/gallery">Explore Collections</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Artisanal & Ethically Sourced
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground font-body text-base md:text-lg mb-8">
            At Luna Gems, we believe in beauty with a conscience. Each piece is meticulously handcrafted with love, using ethically sourced materials to create timeless treasures you can feel good about wearing.
          </p>
          <Button asChild variant="link" className="text-primary hover:text-primary/80">
            <Link href="/about">
              Our Story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl md:text-4xl font-bold mb-12 text-primary-foreground">
            Featured Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-background">
              <Link href="/gallery">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
