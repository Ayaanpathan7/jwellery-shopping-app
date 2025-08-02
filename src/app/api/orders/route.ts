import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    console.log('Orders API - Creating Supabase client...');
    const supabase = await createClient();
    
    console.log('Orders API - Getting user...');
    // Get the authenticated user (cookies should be automatically included)
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log('Orders API - User:', user ? user.id : 'No user');
    console.log('Orders API - Auth error:', authError);
    
    if (authError || !user) {
      console.error('Authentication error:', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orderData = await request.json();
    console.log('Orders API - Order data received:', orderData);
    
    // Validate required fields
    const requiredFields = ['customer_info', 'items', 'total_amount'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Validate customer info
    const customerRequiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    for (const field of customerRequiredFields) {
      if (!orderData.customer_info[field]) {
        return NextResponse.json({ error: `Missing required customer field: ${field}` }, { status: 400 });
      }
    }

    // Validate items
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }

    console.log('Orders API - Creating order in database...');
    // Create the order
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        customer_info: orderData.customer_info,
        items: orderData.items,
        total_amount: orderData.total_amount,
        status: 'pending'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return NextResponse.json({ error: 'Failed to create order', details: insertError.message }, { status: 500 });
    }

    console.log('Orders API - Order created successfully:', order);
    return NextResponse.json({ 
      success: true, 
      order,
      message: 'Order created successfully' 
    });

  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's orders
    const { data: orders, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json({ orders });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
