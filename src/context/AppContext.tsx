import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Product, CartItem, Purchase } from '@/types';
import { mockProducts, mockPurchases } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface AppContextType {
  // Auth
  user: User | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>;
  
  // Products
  products: Product[];
  myListings: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'sellerId' | 'sellerName'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  
  // Purchases
  purchases: Purchase[];
  makePurchase: () => void;
  
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases] = useState<Purchase[]>(mockPurchases);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const isAuthenticated = !!session;
  const myListings = products.filter(p => p.sellerId === user?.id);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setSupabaseUser(session?.user ?? null);
        
        if (session?.user) {
          // Create a User object from Supabase user
          const appUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
            fullName: session.user.user_metadata?.full_name || '',
            phone: session.user.user_metadata?.phone,
            address: session.user.user_metadata?.address,
            avatar: session.user.user_metadata?.avatar,
            createdAt: new Date(session.user.created_at)
          };
          setUser(appUser);
        } else {
          setUser(null);
          setCart([]);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      
      if (session?.user) {
        const appUser: User = {
          id: session.user.id,
          email: session.user.email || '',
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
          fullName: session.user.user_metadata?.full_name || '',
          phone: session.user.user_metadata?.phone,
          address: session.user.user_metadata?.address,
          avatar: session.user.user_metadata?.avatar,
          createdAt: new Date(session.user.created_at)
        };
        setUser(appUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const signup = async (email: string, password: string, userData: Partial<User>) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username: userData.username,
          full_name: userData.fullName,
          phone: userData.phone,
          address: userData.address,
          avatar: userData.avatar
        }
      }
    });
    return { error };
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'sellerId' | 'sellerName'>) => {
    if (!user) return;
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      sellerId: user.id,
      sellerName: user.fullName,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, ...updates, updatedAt: new Date() } : p
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: Date.now().toString(), product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const makePurchase = () => {
    // Mock purchase - in real app, this would process payment
    clearCart();
  };

  const value: AppContextType = {
    user,
    supabaseUser,
    session,
    isAuthenticated,
    login,
    logout,
    signup,
    products,
    myListings,
    addProduct,
    updateProduct,
    deleteProduct,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    purchases,
    makePurchase,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};