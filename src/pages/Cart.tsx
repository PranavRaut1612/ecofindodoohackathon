import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, makePurchase } = useApp();
  const { toast } = useToast();

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    makePurchase();
    toast({
      title: "Purchase successful!",
      description: "Your order has been placed successfully. Check your purchase history.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold ml-4">Shopping Cart</h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={item.product.images[0] || '/placeholder.svg'}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          by {item.product.sellerName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Category: {item.product.category}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-primary">
                              {formatPrice(item.product.price)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <p className="text-sm text-muted-foreground">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  
                  <div className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="truncate mr-2">{item.product.title}</span>
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-primary hover:opacity-90"
                    size="lg"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Checkout
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Secure checkout with buyer protection
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Browse our marketplace to find amazing second-hand items
              </p>
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/">
                  Start Shopping
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cart;