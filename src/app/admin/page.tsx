'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Lock, LogOut, AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import ImageUpload from '@/components/image-upload'
import CloudinaryStatus from '@/components/cloudinary-status'
import AdminAuth from '@/components/admin-auth'
import { getValidImageUrl } from '@/lib/image-utils'

// Handle missing environment variables during build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const supabase = createClient(supabaseUrl, supabaseKey)

interface Order {
  id: string
  created_at: string
  user_email: string
  status: string
  total_amount: number
  items: any[]
  customer_info: any
}

interface Product {
  id: number
  name: string
  price: number
  image_url: string
  description: string
  category: string
  in_stock: boolean
  material?: string
  gemstone?: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image_url: '',
    description: '',
    category: '',
    in_stock: true,
    material: '',
    gemstone: ''
  })

  // Load orders and products from database
  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin_authenticated')
      const authTime = localStorage.getItem('admin_auth_time')
      
      if (isAuth && authTime) {
        // Check if authentication is still valid (24 hours)
        const twentyFourHours = 24 * 60 * 60 * 1000
        const now = Date.now()
        const authTimestamp = parseInt(authTime)
        
        if (now - authTimestamp < twentyFourHours) {
          setIsAuthenticated(true)
        } else {
          // Authentication expired
          localStorage.removeItem('admin_authenticated')
          localStorage.removeItem('admin_auth_time')
        }
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
      loadProducts()
    }
  }, [isAuthenticated])

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading products:', error)
      } else {
        setProducts(data || [])
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading orders:', error)
      } else {
        setOrders(data || [])
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) {
        console.error('Error updating order status:', error)
        alert('Failed to update order status')
      } else {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ))
        alert('Order status updated successfully')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image_url) {
      alert('Please fill in all required fields (Name, Price, and Image)')
      return
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select()

      if (error) {
        console.error('Error adding product:', error)
        alert('Failed to add product')
      } else {
        if (data && data.length > 0) {
          setProducts([data[0], ...products])
          setNewProduct({
            name: '',
            price: 0,
            image_url: '',
            description: '',
            category: '',
            in_stock: true,
            material: '',
            gemstone: ''
          })
          alert('Product added successfully')
        }
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    }
  }

  const deleteProduct = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId)

        if (error) {
          console.error('Error deleting product:', error)
          alert('Failed to delete product')
        } else {
          setProducts(products.filter(p => p.id !== productId))
          alert('Product deleted successfully')
        }
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product')
      }
    }
  }

  const toggleProductStock = async (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    try {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !product.in_stock })
        .eq('id', productId)

      if (error) {
        console.error('Error updating product stock:', error)
        alert('Failed to update product stock')
      } else {
        setProducts(products.map(p => 
          p.id === productId ? { ...p, in_stock: !p.in_stock } : p
        ))
      }
    } catch (error) {
      console.error('Error updating product stock:', error)
      alert('Failed to update product stock')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_auth_time')
    setIsAuthenticated(false)
  }

  // Show authentication form if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center space-x-2"
        >
          <Lock className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
      
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders">Orders Management</TabsTrigger>
          <TabsTrigger value="products">Products Management</TabsTrigger>
        </TabsList>

        {/* Orders Management Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders Overview</CardTitle>
              <CardDescription>
                Manage customer orders and update their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">
                          {String(order.id).slice(0, 8)}...
                        </TableCell>
                        <TableCell>{order.user_email}</TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>₹{order.total_amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              disabled={order.status === 'processing'}
                            >
                              Process
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                              disabled={order.status === 'shipped' || order.status === 'delivered'}
                            >
                              Ship
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              disabled={order.status === 'delivered'}
                            >
                              Deliver
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Products Management Tab */}
        <TabsContent value="products" className="space-y-6">
          {/* Cloudinary Status */}
          <CloudinaryStatus />
          
          {/* Invalid Images Warning */}
          {products.some(p => !getValidImageUrl(p.image_url).includes(p.image_url || '')) && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> Some products have invalid or blocked image URLs. 
                They are being displayed with placeholder images. 
                Please update them with valid image URLs or upload new images.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Add New Product */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Add a new product to your jewelry collection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload Section */}
              <ImageUpload
                value={newProduct.image_url}
                onChange={(url) => setNewProduct({...newProduct, image_url: url})}
                onRemove={() => setNewProduct({...newProduct, image_url: ''})}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Enter price"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Enter category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    placeholder="e.g., gold, silver, rose-gold"
                    value={newProduct.material}
                    onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="gemstone">Gemstone</Label>
                  <Input
                    id="gemstone"
                    placeholder="e.g., diamond, crystal, opal"
                    value={newProduct.gemstone}
                    onChange={(e) => setNewProduct({...newProduct, gemstone: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <Button onClick={addProduct} className="w-full">
                Add Product
              </Button>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Products List</CardTitle>
              <CardDescription>
                Manage your existing products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="relative w-12 h-12">
                          <Image 
                            src={getValidImageUrl(product.image_url)} 
                            alt={product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.material}</TableCell>
                      <TableCell>
                        <Badge variant={product.in_stock ? "default" : "secondary"}>
                          {product.in_stock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleProductStock(product.id)}
                          >
                            Toggle Stock
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
