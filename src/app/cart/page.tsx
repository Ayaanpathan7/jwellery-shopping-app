import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">
            Shopping Cart
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your selected items.
          </p>
        </div>

        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-20 w-20 text-muted-foreground/50" />
          <h2 className="mt-6 font-headline text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any items yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/gallery">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
