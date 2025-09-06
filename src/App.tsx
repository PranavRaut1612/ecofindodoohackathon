import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { Header, BottomNav } from "@/components/ui/navigation";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Cart from "./pages/Cart";
import Purchases from "./pages/Purchases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/purchases" element={<Purchases />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
