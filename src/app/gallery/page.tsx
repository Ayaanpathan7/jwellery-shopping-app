'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product-card';
import { getProducts, type Product } from '@/lib/products-api';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [materialFilter, setMaterialFilter] = useState('all');
  const [gemstoneFilter, setGemstoneFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const productData = await getProducts();
      setProducts(productData);
      setFilteredProducts(productData);
      
      // Update price range based on actual products
      if (productData.length > 0) {
        const maxPrice = Math.max(...productData.map(p => p.price));
        setPriceRange([0, Math.ceil(maxPrice)]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const materials = ['all', ...Array.from(new Set(products.map(p => p.material)))];
  const gemstones = ['all', ...Array.from(new Set(products.map(p => p.gemstone)))];

  const handleFilterChange = () => {
    let tempProducts = products;

    if (materialFilter !== 'all') {
      tempProducts = tempProducts.filter(p => p.material === materialFilter);
    }

    if (gemstoneFilter !== 'all') {
      tempProducts = tempProducts.filter(p => p.gemstone === gemstoneFilter);
    }

    // Filter by price range
    tempProducts = tempProducts.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(tempProducts);
  };

  useEffect(() => {
    handleFilterChange();
  }, [materialFilter, gemstoneFilter, priceRange, products]);

  const handleClearFilters = () => {
    setMaterialFilter('all');
    setGemstoneFilter('all');
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => p.price));
      setPriceRange([0, Math.ceil(maxPrice)]);
    }
  };

  if (loading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-12 text-center">
            Shop All
          </h1>
          <div className="flex justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-12 text-center">
          Shop All
        </h1>

        {/* Filters */}
        <div className="mb-8 p-6 bg-card rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Material</label>
              <Select value={materialFilter} onValueChange={setMaterialFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  {materials.map(material => (
                    <SelectItem key={material} value={material}>
                      {material === 'all' ? 'All Materials' : material.charAt(0).toUpperCase() + material.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gemstone</label>
              <Select value={gemstoneFilter} onValueChange={setGemstoneFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gemstone" />
                </SelectTrigger>
                <SelectContent>
                  {gemstones.map(gemstone => (
                    <SelectItem key={gemstone} value={gemstone}>
                      {gemstone === 'all' ? 'All Gemstones' : gemstone.charAt(0).toUpperCase() + gemstone.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={products.length > 0 ? Math.max(...products.map(p => p.price)) : 300}
                min={0}
                step={10}
                className="mt-2"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              size="sm"
            >
              Clear Filters
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No products found matching your criteria.
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            Our team is here to help you find the perfect piece.
          </p>
          <Button asChild variant="outline">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
