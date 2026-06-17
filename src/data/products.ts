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
  },
  {
    id: "berrypad",
    name: "BerryPad",
    category: "tab",
    price: 150000,
    colors: ["#F5F5F7", "#2C2C2E", "#7B2FBE"],
    storage: ["256GB", "512GB", "1TB"],
    tagline: "Boundless power. Incredibly thin. Total creative freedom.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-mini-finish-unselect-gallery-1-202410?wid=5120&hei=2880&fmt=webp&qlt=90&.v=eDJDc00wczl1QWk5QmpVYitFNXQwOVgrSXpWVEhWaW9YTGlWRHFoSHU0L1BqbTR3VEdKRWdqMUVib1BPSWdhYWd2S3NaRzcrU0dmYjNHTUFiMnlsWFUxSlgrVWMrMzU1OXo2c2JyNjJZTGdyNS9FSzFhNVRJSXdZQnFCMkJ5K2E&traceId=1"
  },
  {
    id: "magsafecharger",
    name: "MagSafe Charger",
    category: "accessories",
    price: 4500,
    colors: ["#FFFFFF"],
    storage: [],
    tagline: "Snap on for faster wireless charging.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGD74?wid=532&hei=582&fmt=png-alpha&.v=Nm9pdHNQWlpqeUxJK05lY2hoUkdzZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MzNKK09jOHUreEYvZnpSQUVFYUZBZnpxVmhFdC9yK2RzT3FKL1lsOVpPbVE"
  },
  {
    id: "airtag1",
    name: "AirTag",
    category: "accessories",
    price: 3790,
    colors: ["#FFFFFF"],
    storage: [],
    tagline: "Lose your knack for losing things.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airtag-4pack-select-202601_GEO_IN?wid=532&hei=582&fmt=png-alpha&.v=QVI2eUgvdU1qT1VRdEZUOXVUVHgrWG4vOTFXQ0RXTHAyUGJ2QnEvejJSamxqREhtMytBVUhNVnhoTDFZSDI2VnAxemF2anFla0E2R0xKdlltYU9XUTN6aHlnMFRsSlRZRk8wQ0pRT3pHQWgrYWpGdS9XeFgvbS9ITnNYOEhYaG4"
  },
  {
    id: "30wadapter",
    name: "30W USB-C Power Adapter",
    category: "accessories",
    price: 3800,
    colors: ["#FFFFFF"],
    storage: [],
    tagline: "Compact and efficient charging at home or office.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MY1W2_GEO_IN?wid=532&hei=582&fmt=png-alpha&.v=QXpNQVc2djBEbjNUUFZnQWhTMlAvTW5GeFlBNUZ4MVNzNjJzZFhYMTFSanVnZHBjTzh5d2huWkZTclZJejBITG5Rb0tEQlVMN0l3TC9qdEpPMlNGeEE"
  },
  {
    id: "studiodisplay",
    name: "Berry Studio Display",
    category: "accessories",
    price: 159900,
    colors: ["#E5E7EB"],
    storage: [],
    tagline: "Immersive 27-inch 5K Retina display.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MFEW4?wid=532&hei=582&fmt=png-alpha&.v=L0dURC91cFIxNjVzZmhWTTNzOTdTZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MG91QkNNSkV3OEg0bEdUbWNzMm9mRC85TFIvY2xoL3VaSnpkWldSSEQzNkE"
  },
  {
    id: "smartscale",
    name: "Berry's Veiled Grey Nike Sport Loop",
    category: "accessories",
    price: 12900,
    colors: ["#1A1A1A", "#FFFFFF"],
    storage: [],
    tagline: "Track your health metrics with clinical precision.",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MGD44?wid=532&hei=582&fmt=png-alpha&.v=YmZWcHYxOEFxK1NwTXBjOHg0NjhCZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MDM2d2RLWmZBYXVXSWdYQml3SC9hNkZIVDNwUVhMbndIUnMrNmZIclQ5WkE"
  }
];