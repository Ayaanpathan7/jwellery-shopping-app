'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { OrdersClient } from '@/lib/orders-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/cart-provider';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { items, getTotalPrice, clearCart } = useCart();
  const [orderData, setOrderData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    // Redirect to cart if no items
    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      router.push('/cart');
    }
  }, [items, router, toast]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setOrderData(prev => ({
          ...prev,
          email: user.email || ''
        }));
      } else {
        // This shouldn't happen due to middleware, but just in case
        router.push('/login?redirect=/checkout');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login?redirect=/checkout');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Debug: Check if user is authenticated
      console.log('User authentication status:', user);
      
      // Validate form data
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
      const missingFields = requiredFields.filter(field => !orderData[field as keyof typeof orderData]);
      
      if (missingFields.length > 0) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required fields.',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      // Validate cart items
      if (items.length === 0) {
        toast({
          title: 'Cart is Empty',
          description: 'Add some items to your cart before checking out.',
          variant: 'destructive',
        });
        router.push('/cart');
        return;
      }

      // Calculate total
      const total = getTotalPrice();
      
      // Create order object for API
      const orderPayload = {
        customer_info: orderData,
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity
        })),
        total_amount: total
      };

      console.log('Submitting order:', orderPayload);

      // Create order using the OrdersClient (direct database access)
      const order = await OrdersClient.createOrder({
        user_id: user.id,
        customer_info: orderPayload.customer_info,
        items: orderPayload.items,
        total_amount: orderPayload.total_amount,
        status: 'pending'
      });

      console.log('Order created successfully:', order);

      // Clear cart after successful order
      clearCart();

      toast({
        title: 'Order Placed Successfully! 🎉',
        description: `Thank you for your order of ${formatPrice(total)}. Order ID: ${order.id}. You will receive a confirmation email shortly.`,
      });

      // Redirect to a success page or orders page
      router.push('/?success=true');
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-8">Checkout</h1>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart message if no items
  if (items.length === 0) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-primary-foreground mb-8">Checkout</h1>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/gallery">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Checkout
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Complete your order
          </p>
          <Badge variant="secondary" className="mt-2">
            Signed in as: {user?.email}
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>
                Please provide your shipping details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={orderData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={orderData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={orderData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={orderData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={orderData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={orderData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={orderData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions..."
                  />
                </div>

                <Separator />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your items before placing the order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 py-3 border-b">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.product.material} • {item.product.gemstone !== 'none' && item.product.gemstone}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              {/* Cart Actions */}
              <div className="pt-4 space-y-2">
                <Button asChild variant="outline" className="w-full" size="sm">
                  <Link href="/cart">
                    Edit Cart
                  </Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  🔒 Secure checkout • 💎 Authentic guarantee • 📦 Free shipping
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
