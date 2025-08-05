# 🛒 Orders System Setup Guide

## Database Setup

To enable the orders functionality, you need to create the orders table in your Supabase database.

### Step 1: Create Orders Table

1. Open your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL script to create the orders table:

```sql
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_info JSONB NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;

-- Create policies for security
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### Step 2: Verify Table Creation

After running the SQL script, verify the table was created by checking the Tables section in your Supabase dashboard. You should see an `orders` table with the following structure:

- `id` (BIGSERIAL) - Primary key
- `user_id` (UUID) - Foreign key to auth.users
- `customer_info` (JSONB) - Customer details
- `items` (JSONB) - Array of ordered items
- `total_amount` (DECIMAL) - Order total
- `status` (TEXT) - Order status
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🚀 Features Implemented

### ✅ Order Creation
- **API Endpoint**: `/api/orders` (POST)
- **Functionality**: Creates new orders in the database
- **Validation**: Validates customer info and cart items
- **Security**: Only authenticated users can create orders

### ✅ Order History
- **Page**: `/orders`
- **API Endpoint**: `/api/orders` (GET)
- **Functionality**: Displays user's order history
- **Features**: 
  - Order status tracking
  - Item details
  - Shipping information
  - Order totals

### ✅ Checkout Integration
- **Page**: `/checkout`
- **Functionality**: 
  - Validates cart items
  - Collects customer information
  - Creates order in database
  - Clears cart on success
  - Shows order confirmation

### ✅ Navigation Integration
- **Header Menu**: "My Orders" link for logged-in users
- **Mobile Menu**: Orders link in mobile navigation
- **Admin Access**: Orders visible to admin users

## 🔧 Order Status Flow

1. **pending** - Order placed, awaiting confirmation
2. **confirmed** - Order confirmed, preparing for processing
3. **processing** - Order being prepared/manufactured
4. **shipped** - Order shipped to customer
5. **delivered** - Order delivered successfully
6. **cancelled** - Order cancelled

## 🛡️ Security Features

- **Row Level Security**: Users can only see their own orders
- **Authentication Required**: Must be logged in to place/view orders
- **Data Validation**: Server-side validation of all order data
- **JSONB Storage**: Efficient storage of complex order data

## 📊 Admin Features (Future Enhancement)

You can extend this system by adding:

- Admin order management dashboard
- Order status update functionality
- Email notifications for status changes
- Inventory management integration
- Payment processing integration

## 🧪 Testing the System

1. **Add items to cart** from the product gallery
2. **Navigate to checkout** (requires login)
3. **Fill in customer information**
4. **Place order** - should save to database
5. **View orders** at `/orders` page
6. **Check database** in Supabase dashboard

## 📁 Files Created/Modified

- `src/app/api/orders/route.ts` - API endpoints for orders
- `src/app/orders/page.tsx` - Order history page
- `src/app/checkout/page.tsx` - Updated with database integration
- `src/lib/supabase.ts` - Added orders table types
- `docs/create-orders-table.sql` - Database setup script

The orders system is now fully functional and integrated with your Luna Gems jewelry shopping app! 🎉
