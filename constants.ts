import { Fish } from './types';

// WhatsApp Number for Tirupati Aquarium
export const WHATSAPP_NUMBER = "916302382280";

export const SHOP_DETAILS = {
  name: "Tirupati Aquarium",
  email: "charantejathangeti282002@gmail.com",
  address: "Tilak Road",
  city: "Tirupati",
  pincode: "517520",
  fullAddress: "Tilak Road, Tirupati - 517520"
};

export const INITIAL_FISH: Fish[] = [
  {
    id: '1',
    name: 'King Kamfa Flowerhorn (Imported)',
    scientificName: 'Paraneetroplus synspilus hybrid',
    price: 12500.00,
    originalPrice: 15000.00,
    stock: 2,
    description: 'Premium grade Kamfa with massive Kok and intense pearling. A true masterpiece for collectors.',
    imageUrl: 'https://images.unsplash.com/photo-1544555866-e3d8c11e404b?auto=format&fit=crop&q=80&w=800', 
    category: 'Exotic',
    habitat: 'Hybrid'
  },
  {
    id: '2',
    name: 'High Back Golden Arowana',
    scientificName: 'Scleropages formosus',
    price: 18000.00,
    stock: 3,
    description: 'RTG (Red Tail Gold) variety. Chip certified. Represents wealth and prosperity.',
    imageUrl: 'https://images.unsplash.com/photo-1627918889182-59c362088f12?auto=format&fit=crop&q=80&w=800',
    category: 'Exotic',
    habitat: 'Indonesia'
  },
  {
    id: '3',
    name: 'Red Cap Oranda (Jumbo Size)',
    scientificName: 'Carassius auratus',
    price: 850.00,
    originalPrice: 1200.00,
    stock: 12,
    description: 'Hand-picked Jumbo Orandas with prominent wen (head growth) and flowy tails.',
    imageUrl: 'https://images.unsplash.com/photo-1518049870341-26c721741549?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'Coldwater'
  },
  {
    id: '4',
    name: 'Discus Fish (Red Map)',
    scientificName: 'Symphysodon',
    price: 3500.00,
    stock: 8,
    description: 'Vibrant red patterning. The jewel of freshwater aquariums. Requires soft, warm water.',
    imageUrl: 'https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=800',
    category: 'Exotic',
    habitat: 'Amazon'
  },
  {
    id: '5',
    name: 'Blood Red Parrot Fish',
    scientificName: 'Amphilophus citrinellus x',
    price: 650.00,
    originalPrice: 800.00,
    stock: 25,
    description: 'Deep red coloration. Very active, hardy, and interacts with owners like a pet.',
    imageUrl: 'https://images.unsplash.com/photo-1571752726703-424217e08fe1?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'Hybrid'
  },
  {
    id: '6',
    name: 'Albino Tiger Oscar',
    scientificName: 'Astronotus ocellatus',
    price: 450.00,
    stock: 15,
    description: 'Intelligent "Wet Pet". White body with fiery orange marble patterns. Fast grower.',
    imageUrl: 'https://images.unsplash.com/photo-1549448057-a9a797c55041?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'South America'
  },
  {
    id: '7',
    name: 'Halfmoon Betta (Mustard Gas)',
    scientificName: 'Betta splendens',
    price: 550.00,
    originalPrice: 750.00,
    stock: 30,
    description: 'Show quality male Betta with blue body and yellow fins. Perfect for nano tanks.',
    imageUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'Still Water'
  },
  {
    id: '8',
    name: 'Neon Tetra (Pack of 12)',
    scientificName: 'Paracheirodon innesi',
    price: 600.00,
    originalPrice: 720.00,
    stock: 40,
    description: 'The classic schooling fish. Glowing blue and red stripes. Best for planted tanks.',
    imageUrl: 'https://images.unsplash.com/photo-1635865239556-3665790d965e?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'Blackwater'
  },
  {
    id: '9',
    name: 'Platinum Angel Fish',
    scientificName: 'Pterophyllum scalare',
    price: 250.00,
    stock: 20,
    description: 'Shimmering solid white body. Elegant swimmer. Adds grace to any community tank.',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'Amazon'
  },
  {
    id: '10',
    name: 'Frontosa Cichlid (Burundi)',
    scientificName: 'Cyphotilapia frontosa',
    price: 2200.00,
    stock: 6,
    description: 'Tanganyikan deep water cichlid. Beautiful blue bands and distinct hump head.',
    imageUrl: 'https://images.unsplash.com/photo-1544555866-e3d8c11e404b?auto=format&fit=crop&q=80&w=800', 
    category: 'Exotic',
    habitat: 'Lake Tanganyika'
  },
  {
    id: '11',
    name: 'Red Tail Catfish',
    scientificName: 'Phractocephalus hemioliopterus',
    price: 850.00,
    stock: 8,
    description: 'Monster fish favorite. Attractive red tail and whiskers. Needs a large tank.',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800',
    category: 'Exotic',
    habitat: 'River Bed'
  },
  {
    id: '12',
    name: 'Ocellaris Clownfish (Pair)',
    scientificName: 'Amphiprion ocellaris',
    price: 1800.00,
    stock: 5,
    description: 'The famous "Nemo" fish. Tank bred, eats pellets. Good for beginner marine tanks.',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800',
    category: 'Saltwater',
    habitat: 'Coral Reefs'
  },
  {
    id: '13',
    name: 'Polar Blue Parrot (Short Body)',
    scientificName: 'Cichlasoma hybrid',
    price: 150.00,
    originalPrice: 200.00,
    stock: 50,
    description: 'Cute, small, blue convict hybrid. Very popular active schooling cichlid.',
    imageUrl: 'https://images.unsplash.com/photo-1541961917761-0d3a516093df?auto=format&fit=crop&q=80&w=800', 
    category: 'Freshwater',
    habitat: 'Hybrid'
  },
  {
    id: '14',
    name: 'Koi Carp (Standard Mix)',
    scientificName: 'Cyprinus rubrofuscus',
    price: 150.00,
    stock: 100,
    description: 'Hardy pond fish in mixed colors. Can grow very large and live for 20+ years.',
    imageUrl: 'https://images.unsplash.com/photo-1512403610931-1e9671d1883b?auto=format&fit=crop&q=80&w=800',
    category: 'Freshwater',
    habitat: 'Ponds'
  },
  {
    id: '15',
    name: 'Black Ghost Knife Fish',
    scientificName: 'Apteronotus albifrons',
    price: 450.00,
    stock: 10,
    description: 'Unique electric fish. Swims backwards and forwards. Nocturnal and peaceful.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292205-388775f06dde?auto=format&fit=crop&q=80&w=800',
    category: 'Exotic',
    habitat: 'South America'
  },
  {
    id: '16',
    name: 'Driftwood with Anubias Plant',
    scientificName: 'Anubias barteri',
    price: 650.00,
    originalPrice: 850.00,
    stock: 15,
    description: 'Live aquatic plant attached to treated driftwood. Low light, hardy plant.',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    habitat: 'Aquascape'
  }
];

export const MOCK_ADMIN_USER = {
  id: 'admin-1',
  name: 'Tirupati Aquarium Admin',
  email: 'charantejathangeti282002@gmail.com',
  role: 'admin' as const
};