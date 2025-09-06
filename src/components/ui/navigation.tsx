import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Plus, LogOut, Home, Package, Heart, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/context/AppContext';

export const Header: React.FC = () => {
  const { user, cart, logout, searchQuery, setSearchQuery, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/?search=' + encodeURIComponent(searchQuery));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EcoFinds
            </span>
          </Link>

          {/* Search Bar */}
          {isAuthenticated && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </form>
          )}

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <Button variant="ghost" size="icon" asChild className="relative">
                  <Link to="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    {cart.length > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                      >
                        {cart.length}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Add Product */}
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/add-product">
                    <Plus className="h-5 w-5" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt="Profile" 
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {user?.fullName || user?.username}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-listings" className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        My Listings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/purchases" className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        Purchase History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export const BottomNav: React.FC = () => {
  const { cart, isAuthenticated } = useApp();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Package, label: 'My Items', path: '/my-listings' },
    { icon: Plus, label: 'Sell', path: '/add-product' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: cart.length },
    { icon: User, label: 'Profile', path: '/dashboard' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 text-xs relative ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 h-4 w-4 flex items-center justify-center text-xs p-0"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};