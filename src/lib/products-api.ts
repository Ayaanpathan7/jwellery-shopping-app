export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  ai_hint: string;
  material: 'gold' | 'silver' | 'rose-gold' | 'brass';
  gemstone: 'diamond' | 'crystal' | 'opal' | 'labradorite' | 'moonstone' | 'onyx' | 'none';
  is_featured: boolean;
  in_stock: boolean;
  created_at: string;
};

// Fallback data for development
export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Celestial Necklace',
    description: 'A delicate gold chain with a crescent moon pendant, studded with diamonds.',
    price: 180.00,
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    ai_hint: 'gold necklace',
    material: 'gold',
    gemstone: 'diamond',
    is_featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Stardust Hoops',
    description: 'Elegant silver hoops featuring a spray of tiny embedded crystals.',
    price: 120.00,
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    ai_hint: 'silver earrings',
    material: 'silver',
    gemstone: 'crystal',
    is_featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Orion Ring',
    description: 'A minimalist gold band with three opals set in a row, like Orion\'s belt.',
    price: 250.00,
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    ai_hint: 'gold ring',
    material: 'gold',
    gemstone: 'opal',
    is_featured: true,
    in_stock: true,
    created_at: new Date().toISOString(),
  },
];

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return fallbackProducts;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return fallbackProducts.find(p => p.id === parseInt(id)) || null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter(product => product.is_featured);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return fallbackProducts.filter(p => p.is_featured);
  }
}

// Legacy export for backwards compatibility
export const products = fallbackProducts;
