# 🔧 Troubleshooting Guide

## "Supabase error: {}" Issue

### Symptoms
- Console shows "Supabase error: {}"
- "Failed to fetch products" errors
- Empty product pages or broken functionality

### Root Cause
The database tables haven't been created in your Supabase project yet.

### ✅ Solution Steps

#### Step 1: Verify Supabase Setup
1. Check `.env.local` has correct credentials
2. Verify Supabase project is active

#### Step 2: Create Database Schema
1. **Go to Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Open your project

2. **Open SQL Editor**
   - Click "SQL Editor" in sidebar
   - Create new query

3. **Run Schema**
   - Copy ALL contents from `supabase-schema.sql`
   - Paste into SQL editor
   - Click "Run" to execute

#### Step 3: Add Sample Data
```bash
chmod +x setup-database.sh
./setup-database.sh
```

#### Step 4: Verify Fix
1. Restart development server:
   ```bash
   npm run dev
   ```
2. Visit http://localhost:9002
3. Check console for errors

### 🧪 Testing Database Connection

Run this command to diagnose issues:
```bash
node -e "
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
supabase.from('products').select('*').limit(1).then(({data, error}) => {
  if (error) console.log('❌ Error:', error.message);
  else console.log('✅ Database connected, found', data?.length || 0, 'products');
});
"
```

### 📋 What the Schema Creates

The `supabase-schema.sql` file creates:
- **products** - Product catalog
- **reviews** - Customer reviews  
- **contact_submissions** - Contact form data
- **orders** - Order records
- **order_items** - Order line items

### 🚨 Common Mistakes

1. **Partial schema execution**
   - Make sure to run the ENTIRE `supabase-schema.sql` file
   - Don't run it piece by piece

2. **Wrong environment variables**
   - Use `.env.local` not `.env`
   - Get keys from Supabase Settings > API

3. **Missing RLS policies**
   - The schema includes Row Level Security
   - Don't skip any parts of the SQL file

### 💡 Fallback System

Even without a database, the app shows sample products:
- 3 featured jewelry items
- Full product details
- Working UI components

This lets you test the frontend while setting up the backend.

### 🆘 Still Having Issues?

1. **Check Supabase project status**
2. **Verify network connectivity**
3. **Review Supabase dashboard for errors**
4. **Check browser console for detailed error messages**
