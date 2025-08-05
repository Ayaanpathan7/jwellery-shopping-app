import { supabase } from './supabase';

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string; // Make sure email is included
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface Order {
  id?: number;
  user_id: string;
  customer_info: CustomerInfo;
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export class OrdersClient {
  /**
   * Create a new order directly in the database
   */
  static async createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User must be authenticated to create an order');
      }

      // Extract customer info for individual columns
      const customerInfo = orderData.customer_info;

      // Create the order with both individual columns and JSONB customer_info
      const { data: order, error: insertError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          // Individual customer columns
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email, // This was missing!
          phone: customerInfo.phone,
          address: customerInfo.address,
          city: customerInfo.city,
          postal_code: customerInfo.postalCode,
          country: customerInfo.country,
          notes: customerInfo.notes || null,
          // JSONB columns
          customer_info: orderData.customer_info,
          items: orderData.items,
          total_amount: orderData.total_amount,
          status: orderData.status || 'pending'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw new Error(`Failed to create order: ${insertError.message}`);
      }

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  /**
   * Get all orders for the current user
   */
  static async getUserOrders(): Promise<Order[]> {
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User must be authenticated to view orders');
      }

      // Fetch orders
      const { data: orders, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Database fetch error:', fetchError);
        throw new Error(`Failed to fetch orders: ${fetchError.message}`);
      }

      return orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  /**
   * Get a specific order by ID
   */
  static async getOrder(orderId: number): Promise<Order | null> {
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User must be authenticated to view order details');
      }

      // Fetch specific order
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .eq('user_id', user.id) // Ensure user can only access their own orders
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        console.error('Database fetch error:', fetchError);
        throw new Error(`Failed to fetch order: ${fetchError.message}`);
      }

      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  /**
   * Update order status (for admin or customer cancellation)
   */
  static async updateOrderStatus(orderId: number, newStatus: Order['status']): Promise<Order> {
    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('User must be authenticated to update order');
      }

      // Update the order
      const { data: order, error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .eq('user_id', user.id) // Ensure user can only update their own orders
        .select()
        .single();

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error(`Failed to update order: ${updateError.message}`);
      }

      return order;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
}
