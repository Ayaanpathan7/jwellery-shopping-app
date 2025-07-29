'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [materialFilter, setMaterialFilter] = useState('all');
  const [gemstoneFilter, setGemstoneFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 300]);

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

    tempProducts = tempProducts.filter(p => {
      const price = parseFloat(p.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredProducts(tempProducts);
  };
  
  const resetFilters = () => {
    setMaterialFilter('all');
    setGemstoneFilter('all');
    setPriceRange([0, 300]);
    setFilteredProducts(products);
  };

  // Apply filters whenever a filter state changes
  useState(() => {
    handleFilterChange();
  });


  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground">
            Shop Our Collections
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted treasures, designed to add a touch of elegance to every moment.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 bg-card p-6 rounded-lg shadow-sm h-fit">
              <h3 className="text-xl font-semibold mb-6">Filters</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Material</label>
                  <Select value={materialFilter} onValueChange={setMaterialFilter}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select Material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map(m => <SelectItem key={m} value={m} className="capitalize">{m}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <label className="text-sm font-medium">Gemstone</label>
                   <Select value={gemstoneFilter} onValueChange={setGemstoneFilter}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select Gemstone" />
                    </SelectTrigger>
                    <SelectContent>
                      {gemstones.map(g => <SelectItem key={g} value={g} className="capitalize">{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Price Range</label>
                    <div className="mt-3 flex items-center gap-4">
                        <span className="text-muted-foreground">${priceRange[0]}</span>
                        <Slider
                            min={0}
                            max={300}
                            step={10}
                            value={[priceRange[1]]}
                            onValueChange={(value) => setPriceRange([priceRange[0], value[0]])}
                        />
                         <span className="text-muted-foreground">${priceRange[1]}</span>
                    </div>
                </div>
                <Button onClick={handleFilterChange} className="w-full">Apply Filters</Button>
                <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
              </div>
            </aside>
            <main className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <ProductCard product={product} />
                    </Link>
                  ))
                ) : (
                    <div className="col-span-full text-center py-16">
                        <h3 className="text-2xl font-semibold text-primary-foreground">No Products Found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                    </div>
                )}
              </div>
            </main>
        </div>
      </div>
    </div>
  );
}
