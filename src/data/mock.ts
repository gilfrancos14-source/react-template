export type RangeKey = '7d' | '30d' | '3m' | '1y'

export const revenueRanges: Record<RangeKey, { label: string; value: number }[]> = {
  '7d': [
    { label: 'Lun', value: 320000 },
    { label: 'Mar', value: 410000 },
    { label: 'Mer', value: 360000 },
    { label: 'Jeu', value: 520000 },
    { label: 'Ven', value: 470000 },
    { label: 'Sam', value: 610000 },
    { label: 'Dim', value: 580000 },
  ],
  '30d': [
    { label: '21/09', value: 420000 },
    { label: '24/09', value: 560000 },
    { label: '27/09', value: 510000 },
    { label: '30/09', value: 640000 },
    { label: '03/10', value: 600000 },
    { label: '06/10', value: 720000 },
    { label: '09/10', value: 680000 },
    { label: '12/10', value: 810000 },
    { label: '15/10', value: 760000 },
    { label: '18/10', value: 890000 },
    { label: '20/10', value: 940000 },
  ],
  '3m': [
    { label: 'Août', value: 1450000 },
    { label: 'Septembre', value: 1820000 },
    { label: 'Octobre', value: 2160000 },
  ],
  '1y': [
    { label: 'T1', value: 3200000 },
    { label: 'T2', value: 3850000 },
    { label: 'T3', value: 4120000 },
    { label: 'T4', value: 4860000 },
  ],
}

export const rangeTabs: { key: RangeKey; label: string }[] = [
  { key: '7d', label: '7J' },
  { key: '30d', label: '30J' },
  { key: '3m', label: '3M' },
  { key: '1y', label: '1A' },
]

export const stats = [
  {
    icon: 'wallet',
    label: 'Revenus totaux',
    value: '1 250 000 FCFA',
    delta: '+12%',
    tone: 'brand',
    trend: [24, 22, 23, 16, 17, 9, 3],
  },
  {
    icon: 'cart',
    label: 'Commandes',
    value: '48',
    delta: '+8%',
    tone: 'brand',
    trend: [22, 16, 22, 12, 18, 8, 6],
  },
  {
    icon: 'users',
    label: 'Nouveaux clients',
    value: '32',
    delta: '+20%',
    tone: 'violet',
    trend: [24, 16, 18, 14, 18, 10, 6],
  },
  {
    icon: 'box',
    label: 'Produits en ligne',
    value: '120',
    delta: '+5%',
    tone: 'teal',
    trend: [22, 14, 18, 10, 16, 6, 8],
  },
] as const

export const sales = [
  { label: 'Électronique', value: 35, color: '#1f6bff' },
  { label: 'Mode', value: 25, color: '#6c3be0' },
  { label: 'Maison & déco', value: 15, color: '#10b89a' },
  { label: 'Beauté & santé', value: 12, color: '#fbb83a' },
  { label: 'Autres', value: 13, color: '#c3d0ea' },
]

export type OrderStatus = 'Livrée' | 'En cours' | 'En préparation' | 'Annulée'

export type Order = {
  id: string
  initials: string
  client: string
  product: string
  amount: string
  date: string
  status: OrderStatus
  avatar: string
}

export const orders: Order[] = [
  {
    id: '#CMD-001245',
    initials: 'AD',
    client: 'Aminata D.',
    product: 'Casque Bluetooth',
    amount: '45 000 FCFA',
    date: '20/10/2026',
    status: 'Livrée',
    avatar: 'linear-gradient(135deg, #a8643f, #2b1c15)',
  },
  {
    id: '#CMD-001244',
    initials: 'KS',
    client: 'Koffi S.',
    product: 'T-shirt homme',
    amount: '12 500 FCFA',
    date: '20/10/2026',
    status: 'En cours',
    avatar: 'linear-gradient(135deg, #b9803f, #2b1c15)',
  },
  {
    id: '#CMD-001243',
    initials: 'ST',
    client: 'Sika T.',
    product: 'Sac à main',
    amount: '28 000 FCFA',
    date: '19/10/2026',
    status: 'En cours',
    avatar: 'linear-gradient(135deg, #7a4a32, #2b1c15)',
  },
  {
    id: '#CMD-001242',
    initials: 'YM',
    client: 'Yao M.',
    product: 'Montre connectée',
    amount: '75 000 FCFA',
    date: '19/10/2026',
    status: 'Livrée',
    avatar: 'linear-gradient(135deg, #8a5a3c, #2b1c15)',
  },
  {
    id: '#CMD-001241',
    initials: 'FB',
    client: 'Fati B.',
    product: 'Chaussures',
    amount: '32 000 FCFA',
    date: '18/10/2026',
    status: 'En préparation',
    avatar: 'linear-gradient(135deg, #a05a46, #2b1c15)',
  },
  {
    id: '#CMD-001240',
    initials: 'KA',
    client: 'Kouassi A.',
    product: 'Enceinte portable',
    amount: '58 000 FCFA',
    date: '18/10/2026',
    status: 'Livrée',
    avatar: 'linear-gradient(135deg, #6b4b33, #2b1c15)',
  },
  {
    id: '#CMD-001239',
    initials: 'NB',
    client: 'Nadia B.',
    product: 'Robe été',
    amount: '21 500 FCFA',
    date: '17/10/2026',
    status: 'Annulée',
    avatar: 'linear-gradient(135deg, #8f5a63, #2b1c15)',
  },
  {
    id: '#CMD-001238',
    initials: 'MB',
    client: 'Moussa B.',
    product: 'Clavier mécanique',
    amount: '39 000 FCFA',
    date: '17/10/2026',
    status: 'Livrée',
    avatar: 'linear-gradient(135deg, #7c5230, #2b1c15)',
  },
  {
    id: '#CMD-001237',
    initials: 'AK',
    client: 'Awa K.',
    product: 'Lampe de bureau',
    amount: '18 000 FCFA',
    date: '16/10/2026',
    status: 'En préparation',
    avatar: 'linear-gradient(135deg, #9a6a4a, #2b1c15)',
  },
  {
    id: '#CMD-001236',
    initials: 'ID',
    client: 'Ibrahim D.',
    product: 'Souris sans fil',
    amount: '9 500 FCFA',
    date: '15/10/2026',
    status: 'Livrée',
    avatar: 'linear-gradient(135deg, #6f4a3a, #2b1c15)',
  },
  {
    id: '#CMD-001235',
    initials: 'CS',
    client: 'Clarisse S.',
    product: 'Tapis de salon',
    amount: '64 000 FCFA',
    date: '15/10/2026',
    status: 'En cours',
    avatar: 'linear-gradient(135deg, #b07a5a, #2b1c15)',
  },
  {
    id: '#CMD-001234',
    initials: 'PD',
    client: 'Paul D.',
    product: 'Écouteurs filaires',
    amount: '7 500 FCFA',
    date: '14/10/2026',
    status: 'Annulée',
    avatar: 'linear-gradient(135deg, #5f4536, #2b1c15)',
  },
  {
    id: '#CMD-001233',
    initials: 'RG',
    client: 'Rita G.',
    product: 'Parfum floral',
    amount: '27 000 FCFA',
    date: '13/10/2026',
    status: 'Livrée',
    avatar: 'linear-gradient(135deg, #a5616b, #2b1c15)',
  },
  {
    id: '#CMD-001232',
    initials: 'SD',
    client: 'Serge D.',
    product: 'Veste en jean',
    amount: '42 000 FCFA',
    date: '12/10/2026',
    status: 'En préparation',
    avatar: 'linear-gradient(135deg, #6d5240, #2b1c15)',
  },
]

export const activities = [
  {
    icon: 'cart',
    title: 'Nouvelle commande #4587',
    description: 'Aminata D. a passé une commande',
    time: 'Il y a 12 min',
    tone: 'brand',
  },
  {
    icon: 'wallet',
    title: 'Paiement reçu',
    description: '75 000 FCFA de Yao M.',
    time: 'Il y a 48 min',
    tone: 'teal',
  },
  {
    icon: 'users',
    title: 'Nouveau client inscrit',
    description: "Kouassi A. s'est inscrit sur votre site",
    time: 'Il y a 2 h',
    tone: 'violet',
  },
  {
    icon: 'box',
    title: 'Produit ajouté',
    description: 'T-shirt femme a été ajouté au catalogue',
    time: 'Il y a 3 h',
    tone: 'brand',
  },
  {
    icon: 'message',
    title: 'Message client',
    description: 'Sika T. vous a envoyé un message',
    time: 'Il y a 5 h',
    tone: 'amber',
  },
] as const

export type NavItem = {
  icon: 'home' | 'cart' | 'box' | 'users' | 'chart' | 'message' | 'settings'
  label: string
  to?: string
  badge?: string
}

export const navItems: NavItem[] = [
  { icon: 'home', label: 'Tableau de bord', to: '/' },
  { icon: 'cart', label: 'Commandes', to: '/commandes', badge: '12' },
  { icon: 'box', label: 'Produits', to: '/produits' },
  { icon: 'users', label: 'Clients', to: '/clients' },
  { icon: 'chart', label: 'Rapports', to: '/rapports' },
  { icon: 'message', label: 'Messages', to: '/messages', badge: '3' },
  { icon: 'settings', label: 'Paramètres' },
]

export type ProductCategory =
  | 'Électronique'
  | 'Mode'
  | 'Téléphonie'
  | 'Accessoires'
  | 'Informatique'

export type Product = {
  ref: string
  name: string
  category: ProductCategory
  price: number
  stock: number
  addedAt: string
  addedTime: string
  image: string
}

export const products: Product[] = [
  {
    ref: 'PRD-001',
    name: 'Casque Bluetooth Pro',
    category: 'Électronique',
    price: 45000,
    stock: 25,
    addedAt: '20/11/2025',
    addedTime: '14:32',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-002',
    name: 'Montre connectée',
    category: 'Électronique',
    price: 32000,
    stock: 12,
    addedAt: '19/11/2025',
    addedTime: '10:24',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-003',
    name: 'Baskets Classiques',
    category: 'Mode',
    price: 28000,
    stock: 0,
    addedAt: '18/11/2025',
    addedTime: '16:45',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-004',
    name: 'Smartphone X Pro',
    category: 'Téléphonie',
    price: 120000,
    stock: 8,
    addedAt: '17/11/2025',
    addedTime: '11:20',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-005',
    name: 'Sac à dos urbain',
    category: 'Accessoires',
    price: 22000,
    stock: 15,
    addedAt: '16/11/2025',
    addedTime: '09:14',
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-006',
    name: 'Ordinateur portable',
    category: 'Informatique',
    price: 250000,
    stock: 5,
    addedAt: '15/11/2025',
    addedTime: '15:37',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-007',
    name: 'Baskets sport',
    category: 'Mode',
    price: 35000,
    stock: 3,
    addedAt: '14/11/2025',
    addedTime: '12:03',
    image:
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=200&h=160&q=80',
  },
  {
    ref: 'PRD-008',
    name: 'Écouteurs sans fil',
    category: 'Électronique',
    price: 18000,
    stock: 0,
    addedAt: '13/11/2025',
    addedTime: '17:21',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&h=160&q=80',
  },
]

