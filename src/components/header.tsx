'use client';

import Link from 'next/link';
import { Gem, Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useWishlist } from '@/hooks/use-wishlist';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg text-primary-foreground">Luna Gems</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end ml-auto">
           <Button asChild variant="ghost" size="icon" className="relative hidden md:inline-flex">
              <Link href="/wishlist">
                <Heart className="h-5 w-5 text-primary" />
                {isClient && wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative hidden md:inline-flex">
                <Link href="/cart">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <span className="sr-only">Cart</span>
                </Link>
            </Button>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href="/" className="flex items-center space-x-2" onClick={() => setSheetOpen(false)}>
                      <Gem className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline text-lg text-primary-foreground">Luna Gems</span>
                    </Link>
                   <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <nav className="flex flex-col p-4 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                      href="/wishlist"
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'flex items-center text-lg font-medium transition-colors hover:text-primary',
                        pathname === '/wishlist' ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      Wishlist 
                      {isClient && wishlist.length > 0 && (
                        <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {wishlist.length}
                        </span>
                      )}
                    </Link>
                    <Link
                        href="/cart"
                        onClick={() => setSheetOpen(false)}
                        className={cn(
                            'flex items-center text-lg font-medium transition-colors hover:text-primary',
                            pathname === '/cart' ? 'text-primary' : 'text-muted-foreground'
                        )}
                    >
                        Cart
                    </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
