import productsData from '@/data/products.json';
import ordersData from '@/data/orders.json';
import usersData from '@/data/users.json';

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  images: string[];
  specifications: Record<string, string | undefined>; // <-- The fix is here
  featured: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  customerId: string;
  email: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: Address;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  orderHistory: string[];
  preferences: {
    category: string;
    newsletter: boolean;
    smsUpdates: boolean;
  };
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Data functions
export const getProducts = (): Product[] => {
  return productsData as Product[];
};

export const getProduct = (id: string): Product | undefined => {
  return productsData.find(product => product.id === id) as Product | undefined;
};

export const deleteProduct = (id: string): void => {
  console.log(`Deleting product with ID ${id}`);
  productsData.splice(productsData.findIndex(product => product.id === id), 1);
};

export const getFeaturedProducts = (): Product[] => {
  return productsData.filter(product => product.featured) as Product[];
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter(product => product.category === category) as Product[];
};

export const getCategories = (): string[] => {
  const categories = new Set(productsData.map(product => product.category));
  return Array.from(categories);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  ) as Product[];
};

export const getOrders = (): Order[] => {
  return ordersData as Order[];
};

export const getOrder = (id: string): Order | undefined => {
  return ordersData.find(order => order.id === id) as Order | undefined;
};

export const getOrdersByStatus = (status: string): Order[] => {
  return ordersData.filter(order => order.status === status) as Order[];
};

export const getUsers = (): User[] => {
  return usersData as User[];
};

export const getUser = (id: string): User | undefined => {
  return usersData.find(user => user.id === id) as User | undefined;
};

// Cart utilities (localStorage based)
export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('WA-tech-cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  localStorage.setItem('WA-tech-cart', JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const removeFromCart = (productId: string): void => {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const filteredCart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem('WA-tech-cart', JSON.stringify(filteredCart));
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const updateCartQuantity = (productId: string, quantity: number): void => {
  if (typeof window === 'undefined') return;
  
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.product.id === productId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem('WA-tech-cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('WA-tech-cart');
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Statistics for admin dashboard
export const getDashboardStats = () => {
  const orders = getOrders();
  const users = getUsers();
  
  const totalRevenue = orders
    .filter(order => order.status === 'Delivered')
    .reduce((sum, order) => sum + order.total, 0);
  
  const totalSales = orders
    .filter(order => order.status === 'Delivered')
    .length;
  
  const activeUsers = users.length;
  
  const recentOrders = orders
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalRevenue,
    totalSales,
    activeUsers,
    recentOrders,
    statusCounts
  };
};