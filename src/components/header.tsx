'use client';

import Link from 'next/link';
import { Gem, Heart, Menu, ShoppingBag, X, User, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/context/cart-provider';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist } = useWishlist();
  const { getItemCount } = useCart();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setIsClient(true);
    
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Update cart count safely after hydration
  useEffect(() => {
    if (isClient) {
      setCartCount(getItemCount());
    }
  }, [isClient, getItemCount]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Signed out successfully',
      });
      router.push('/');
    }
  };

  const isAdmin = user?.email === 'admin@lunagems.com' || user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" suppressHydrationWarning />
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

        <div className="flex items-center justify-end ml-auto space-x-2">
           <Button asChild variant="ghost" size="icon" className="relative hidden md:inline-flex">
              <Link href="/wishlist">
                <Heart className="h-5 w-5 text-primary" suppressHydrationWarning />
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
                    <ShoppingBag className="h-5 w-5 text-primary" suppressHydrationWarning />
                    {isClient && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                    <span className="sr-only">Cart</span>
                </Link>
            </Button>

            {/* User Authentication */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                        <User className="h-5 w-5 text-primary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <div className="px-2 py-1.5">
                          <div className="text-sm font-medium">{user.email}</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {isAdmin && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="w-full">
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="w-full">
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/login">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </>
            )}

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" suppressHydrationWarning />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                   <Link href="/" className="flex items-center space-x-2" onClick={() => setSheetOpen(false)}>
                      <Gem className="h-6 w-6 text-primary" suppressHydrationWarning />
                      <span className="font-bold font-headline text-lg text-primary-foreground">Luna Gems</span>
                    </Link>
                   <Button variant="ghost" size="icon" onClick={() => setSheetOpen(false)}>
                      <X className="h-6 w-6" suppressHydrationWarning />
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
                        {isClient && cartCount > 0 && (
                          <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                    </Link>

                    {/* Mobile Auth Section */}
                    {!loading && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        {user ? (
                          <>
                            <div className="text-sm text-muted-foreground">
                              Signed in as: {user.email}
                            </div>
                            {isAdmin && (
                              <Link
                                href="/admin"
                                onClick={() => setSheetOpen(false)}
                                className="block text-lg font-medium transition-colors hover:text-primary"
                              >
                                Admin Dashboard
                              </Link>
                            )}
                            <Link
                              href="/orders"
                              onClick={() => setSheetOpen(false)}
                              className="block text-lg font-medium transition-colors hover:text-primary"
                            >
                              My Orders
                            </Link>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                handleSignOut();
                                setSheetOpen(false);
                              }}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Sign Out
                            </Button>
                          </>
                        ) : (
                          <div className="space-y-2">
                            <Button
                              asChild
                              variant="outline"
                              className="w-full"
                              onClick={() => setSheetOpen(false)}
                            >
                              <Link href="/login">Sign In</Link>
                            </Button>
                            <Button
                              asChild
                              className="w-full"
                              onClick={() => setSheetOpen(false)}
                            >
                              <Link href="/login">Sign Up</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
