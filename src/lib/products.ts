export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
  aiHint: string;
  material: 'gold' | 'silver' | 'rose-gold' | 'brass';
  gemstone: 'diamond' | 'crystal' | 'opal' | 'labradorite' | 'moonstone' | 'onyx' | 'none';
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Celestial Necklace',
    description: 'A delicate gold chain with a crescent moon pendant, studded with diamonds.',
    price: '$180.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'gold necklace',
    material: 'gold',
    gemstone: 'diamond',
  },
  {
    id: 2,
    name: 'Stardust Hoops',
    description: 'Elegant silver hoops featuring a spray of tiny embedded crystals.',
    price: '$120.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'silver earrings',
    material: 'silver',
    gemstone: 'crystal',
  },
  {
    id: 3,
    name: 'Orion Ring',
    description: 'A minimalist gold band with three opals set in a row, like Orion\'s belt.',
    price: '$250.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'gold ring',
    material: 'gold',
    gemstone: 'opal',
  },
  {
    id: 4,
    name: 'Galaxy Bracelet',
    description: 'A fine silver chain adorned with shimmering labradorite beads.',
    price: '$150.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'silver bracelet',
    material: 'silver',
    gemstone: 'labradorite',
  },
  {
    id: 5,
    name: 'Aurora Studs',
    description: 'Luminous moonstone studs set in a simple, elegant rose gold bezel.',
    price: '$95.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'rose-gold earrings',
    material: 'rose-gold',
    gemstone: 'moonstone',
  },
  {
    id: 6,
    name: 'Nova Locket',
    description: 'An antique-inspired gold locket with intricate star engravings.',
    price: '$220.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'gold locket',
    material: 'gold',
    gemstone: 'none',
  },
  {
    id: 7,
    name: 'Eclipse Cuff',
    description: 'A bold, hand-hammered brass cuff with a striking black onyx centerpiece.',
    price: '$165.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'brass cuff',
    material: 'brass',
    gemstone: 'onyx',
  },
  {
    id: 8,
    name: 'Solstice Anklet',
    description: 'A dainty gold anklet with tiny sun charms that catch the light.',
    price: '$110.00',
    images: [
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
        'https://placehold.co/600x600',
    ],
    aiHint: 'gold anklet',
    material: 'gold',
    gemstone: 'none',
  },
];
