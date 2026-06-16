export interface Product {
  id: string;
  name: string;
  category: 'phone' | 'tab' | 'watch' | 'buds' | 'vision' | 'mac' | 'accessories';
  price: number; // In base currency: INR
  colors: string[]; // Hex values
  storage: string[]; // Capacity levels
  tagline: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "bp17pro",
    name: "Berry Phone 17 Pro",
    category: "phone",
    price: 129900,
    colors: ["#7B2FBE", "#1A1A1A", "#E040FB", "#E5E7EB"],
    storage: ["128GB", "256GB", "512GB", "1TB"],
    tagline: "Titanium. Liquid Obsidian. Built for Berry AI.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bwultra",
    name: "Berry Watch Ultra",
    category: "watch",
    price: 89900,
    colors: ["#7B2FBE", "#E040FB", "#F97316"],
    storage: [],
    tagline: "Adventure awaits. Sculpted in deep forge titanium.",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bbudspro",
    name: "Berry Buds Pro",
    category: "buds",
    price: 24900,
    colors: ["#1A1A1A", "#E5E7EB"],
    storage: [],
    tagline: "Acoustic alchemy. Active noise canceling evolved.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bmacpro",
    name: "BerryBook Pro 16",
    category: "mac",
    price: 249900,
    colors: ["#1A1A1A", "#E5E7EB"],
    storage: ["512GB", "1TB", "2TB", "4TB"],
    tagline: "Mind-blowing performance. Liquid Obsidian architecture.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bvision",
    name: "Berry Vision Pro",
    category: "vision",
    price: 349900,
    colors: ["#7B2FBE"],
    storage: ["256GB", "512GB", "1TB"],
    tagline: "Welcome to the era of spatial entertainment.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&auto=format&fit=crop&q=80"
  }
];