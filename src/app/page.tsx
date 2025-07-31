import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProductsServer } from '@/lib/products-server';
import { ArrowRight, Award, Truck, Shield } from 'lucide-react';

export default async function Home() {
  const featuredProducts = await getFeaturedProductsServer();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] bg-gradient-to-r from-rose-50 to-orange-50 flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-[0.2em] text-gray-600 uppercase">
                Limited Edition
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                LUXURY DESIGN<br />
                <span className="text-4xl md:text-6xl">COLLECTIONS</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Every gemstone has its own beauty and luxury stories, 
                our designers create some outstanding jewelry design 
                for you to look outstanding in any condition.
              </p>
            </div>
            
            <Button asChild className="bg-black text-white px-8 py-6 text-base hover:bg-gray-800">
              <Link href="/gallery">
                Explore More →
              </Link>
            </Button>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-xs text-gray-500">Our Trusted Partners:</div>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="font-medium">OpenGate</span>
                <span className="font-medium">shopeey</span>
                <span className="font-medium">bluemarket</span>
              </div>
            </div>
          </div>

          {/* Right - Model Image */}
          <div className="relative h-full min-h-[600px]">
            <Image
              src="https://placehold.co/800x600/F5F5DC/8B4513?text=Luxury+Jewelry+Model"
              alt="Elegant woman wearing luxury jewelry"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">EXCLUSIVE GUARANTEE YOU GET</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Guarantee */}
            <div className="text-center group">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/400x300/D4AF37/FFFFFF?text=Premium+Quality+Guarantee"
                  alt="Luxury guarantee"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Award className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">GUARANTEE</h3>
              <p className="text-gray-300 text-sm">Premium quality you can see</p>
              <p className="text-gray-300 text-sm">all your life and we are sure</p>
              <p className="text-gray-300 text-sm">guaranteed we give the</p>
              <Button variant="link" className="text-white p-0 mt-2">Read More</Button>
            </div>

            {/* Cashback */}
            <div className="text-center group">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/400x300/228B22/FFFFFF?text=80%25+Cashback+Offer"
                  alt="Cashback offer"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">CASHBACK UP TO 80%</div>
                    <div className="text-sm">For Limited Time</div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">CASHBACK UP TO 80%</h3>
              <p className="text-gray-300 text-sm">We offer cash return of up</p>
              <p className="text-gray-300 text-sm">to 80% on every purchase</p>
              <p className="text-gray-300 text-sm">for you</p>
              <Button variant="link" className="text-white p-0 mt-2">Read More</Button>
            </div>

            {/* Free Delivery */}
            <div className="text-center group">
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/400x300/4169E1/FFFFFF?text=Free+Worldwide+Delivery"
                  alt="Free delivery"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Truck className="w-16 h-16 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">FREE DELIVERY</h3>
              <p className="text-gray-300 text-sm">Free shipping and delivery</p>
              <p className="text-gray-300 text-sm">all over the world, with</p>
              <p className="text-gray-300 text-sm">guaranteed service on time</p>
              <Button variant="link" className="text-white p-0 mt-2">Read More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Jewelry Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-600 uppercase mb-2">Category</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">OUR JEWELRY CATEGORY</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our as one of the professional agencies engaged in the largest jewelry sector in 
              the world, we also offer several special categories for you.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Necklaces */}
            <div className="group cursor-pointer">
              <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://placehold.co/400x500/D4AF37/FFFFFF?text=Luxury+Necklaces"
                  alt="Necklaces"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded">
                  <h3 className="font-bold text-gray-900">Necklaces</h3>
                </div>
              </div>
            </div>

            {/* Bracelets */}
            <div className="group cursor-pointer">
              <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://placehold.co/400x500/C0C0C0/000000?text=Silver+Bracelets"
                  alt="Bracelets"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded">
                  <h3 className="font-bold text-gray-900">Bracelets</h3>
                </div>
              </div>
            </div>

            {/* Rings */}
            <div className="group cursor-pointer">
              <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://placehold.co/400x500/FFD700/000000?text=Diamond+Rings"
                  alt="Rings"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded">
                  <h3 className="font-bold text-gray-900">Rings</h3>
                </div>
              </div>
            </div>

            {/* Earrings */}
            <div className="group cursor-pointer">
              <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://placehold.co/400x500/FF6347/FFFFFF?text=Rose+Gold+Earrings"
                  alt="Earrings"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded">
                  <h3 className="font-bold text-gray-900">Earrings</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-6">
              <Link href="/gallery">
                More Information →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Catalogue */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-600 uppercase mb-2">Products</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">OUR CATALOGUE</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800 px-8 py-6">
              <Link href="/gallery">
                View All →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-600 uppercase mb-2">Stay In Touch</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SUBSCRIBE TO JOIN NEWSLETTER</h2>
            <p className="text-gray-600 mb-8">
              Get the latest updates on new products and upcoming sales
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button className="bg-black text-white hover:bg-gray-800 px-8">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
