import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Instagram } from 'lucide-react';

const feedItems = [
  { id: 1, src: 'https://placehold.co/400x400', alt: 'A beautiful necklace', hint: 'necklace lifestyle' },
  { id: 2, src: 'https://placehold.co/400x400', alt: 'Elegant earrings', hint: 'earrings model' },
  { id: 3, src: 'https://placehold.co/400x400', alt: 'A hand wearing a ring', hint: 'ring hand' },
  { id: 4, src: 'https://placehold.co/400x400', alt: 'Close-up of a bracelet', hint: 'bracelet detail' },
];

export function InstagramFeed() {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        {feedItems.map((item) => (
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" key={item.id}>
            <div className="aspect-square relative overflow-hidden rounded-md group">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
               <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Button asChild className="w-full mt-6">
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="mr-2 h-4 w-4" />
          Follow on Instagram
        </Link>
      </Button>
    </div>
  );
}
