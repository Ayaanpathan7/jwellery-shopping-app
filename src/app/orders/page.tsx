'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Package, Calendar, MapPin, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { OrdersClient, Order } from '@/lib/orders-client';
import Link from 'next/link';

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

// Remove the local Order interface since we're importing it from orders-client

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-purple-500';
      case 'shipped': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    checkUserAndFetchOrders();
  }, []);

  const checkUserAndFetchOrders = async () => {
    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        router.push('/login?redirect=/orders');
        return;
      }

      setUser(user);
      await fetchOrders(user);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login?redirect=/orders');
    }
  };

  const fetchOrders = async (currentUser: any) => {
    try {
      // Fetch orders using OrdersClient
      const ordersData = await OrdersClient.getUserOrders();
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your orders. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-foreground mb-8">Your Orders</h1>
            <div className="animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
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
            Your Orders
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Track and manage your jewelry orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto h-20 w-20 text-muted-foreground/50" />
            <h2 className="mt-6 text-2xl font-semibold">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">
              Start shopping to see your orders here
            </p>
            <Button asChild className="mt-6">
              <Link href="/gallery">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order #{order.id}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.created_at)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(order.status)} text-white capitalize`}>
                        {order.status}
                      </Badge>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatPrice(order.total_amount)}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    <h3 className="font-semibold">Items Ordered</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b">
                        <div>
                          <div className="font-medium">{item.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × {formatPrice(item.price)}
                          </div>
                        </div>
                        <div className="font-medium">{formatPrice(item.total)}</div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Shipping Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Shipping Address
                      </h3>
                      <div className="text-sm space-y-1">
                        <div>{order.customer_info.firstName} {order.customer_info.lastName}</div>
                        <div>{order.customer_info.address}</div>
                        <div>{order.customer_info.city}, {order.customer_info.postalCode}</div>
                        <div>{order.customer_info.country}</div>
                        <div>Phone: {order.customer_info.phone}</div>
                        <div>Email: {order.customer_info.email}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Order Summary
                      </h3>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatPrice(order.total_amount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span className="text-green-600">Free</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>{formatPrice(order.total_amount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {order.customer_info.notes && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-2">Order Notes</h3>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                        {order.customer_info.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
