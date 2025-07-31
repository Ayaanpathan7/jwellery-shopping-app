import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Shopping Cart
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your selected items.
          </p>
        </div>

        <div className="text-center py-16">
          <ShoppingCart className="mx-auto h-20 w-20 text-muted-foreground/50" suppressHydrationWarning />
          <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven't added any items yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button asChild variant="outline">
              <Link href="/gallery">Continue Shopping</Link>
            </Button>
            <Button asChild>
              <Link href="/login?redirect=/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Note: You'll need to sign in to place an order
          </p>
        </div>
      </div>
    </div>
  );
}
