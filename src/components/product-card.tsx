import Image from 'next/image';
import type { Product } from '@/lib/products';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { WishlistButton } from './wishlist-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card h-full">
      <CardHeader className="p-0">
        <Dialog>
          <DialogTrigger asChild>
            <div className="aspect-square w-full relative overflow-hidden cursor-zoom-in group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.aiHint}
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <Image
              src={product.images[0].replace('600x600', '1200x1200')}
              alt={product.name}
              width={1200}
              height={1200}
              className="w-full h-auto"
              data-ai-hint={product.aiHint}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle>
            <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">{product.name}</Link>
        </CardTitle>
        <CardDescription className="font-body text-muted-foreground">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">{product.price}</p>
        <WishlistButton productId={product.id} />
      </CardFooter>
    </Card>
  );
}
