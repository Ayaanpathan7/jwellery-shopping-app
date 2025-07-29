import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/products';

const orders = [
    { id: 'ORD001', customer: 'Liam Johnson', date: '2023-07-23', status: 'Fulfilled', total: '$250.00' },
    { id: 'ORD002', customer: 'Olivia Smith', date: '2023-07-24', status: 'Pending', total: '$150.00' },
    { id: 'ORD003', customer: 'Noah Williams', date: '2023-07-25', status: 'Fulfilled', total: '$350.00' },
    { id: 'ORD004', customer: 'Emma Brown', date: '2023-07-26', status: 'Shipped', total: '$450.00' },
];

export default function AdminPage() {
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-primary-foreground mb-8">
          Admin Dashboard
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle>$45,231.89</CardTitle>
            </CardHeader>
             <CardContent>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardDescription>Orders</CardDescription>
              <CardTitle>+2350</CardTitle>
            </CardHeader>
             <CardContent>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardDescription>Inventory</CardDescription>
              <CardTitle>{products.length} Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">2 running low</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle>+573</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+201 since last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>A list of the most recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell><Badge variant={order.status === 'Fulfilled' ? 'default' : 'secondary'}>{order.status}</Badge></TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell className="text-right">{order.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Inventory</CardTitle>
                    <CardDescription>Current product stock levels.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.slice(0, 5).map(product => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="text-right">10</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
