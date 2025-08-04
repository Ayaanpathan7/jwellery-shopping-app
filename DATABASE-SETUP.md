# Database Setup Required for Cart & Wishlist

## Current Issue

You're seeing these errors because the database tables for user-specific cart and wishlist storage haven't been created yet:

```
Error: Error fetching user cart: {}
Error: Error adding to wishlist: {}
Error: Error fetching user wishlist: {}
Error: Error adding to cart: {}
```

## Solution

The application has been upgraded to use **user-specific cart and wishlist storage** instead of shared localStorage. This prevents data mixing between different users/sessions.

### Step 1: Create Database Tables

1. Open your **Supabase project dashboard**
2. Navigate to **SQL Editor**
3. Copy the SQL script from: `docs/user-cart-wishlist-setup-simple.sql`
4. Paste and execute the SQL script

The SQL script creates:
- `user_cart` table for user-specific cart items
- `user_wishlist` table for user-specific wishlist items  
- Appropriate indexes and permissions
- Triggers for automatic timestamp updates

### Step 2: Restart Development Server

```bash
npm run dev
```

## What This Fixes

✅ **User Isolation**: Each user gets their own cart and wishlist data  
✅ **Data Persistence**: Cart/wishlist data survives browser refreshes  
✅ **Migration**: Existing localStorage data automatically migrates to database  
✅ **Better Performance**: Database queries instead of localStorage operations  

## Features After Setup

- **Anonymous Users**: Get unique user IDs, their data stays separate
- **Guest Sessions**: Each browser session maintains separate cart/wishlist
- **Data Security**: Row-level security ensures users only see their own data
- **Automatic Migration**: Old localStorage data moves to database seamlessly

## Technical Details

- Uses Supabase PostgreSQL database
- Row Level Security (RLS) policies for data isolation  
- Anonymous user support with generated UUIDs
- Automatic fallback handling when tables don't exist
- Migration utilities for localStorage data

## Files Updated

- `src/context/cart-provider.tsx` - Database-backed cart management
- `src/context/wishlist-provider.tsx` - Database-backed wishlist management  
- `src/lib/user-data.ts` - Database operations for cart/wishlist
- `src/lib/auth.ts` - User authentication and session management

Run `./database-setup-instructions.sh` for a quick setup guide!
