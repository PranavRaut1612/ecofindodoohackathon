import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';

const Purchases: React.FC = () => {
  const { purchases } = useApp();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'cancelled': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  const totalItems = purchases.reduce((sum, purchase) => sum + purchase.products.length, 0);

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="ml-4">
              <h1 className="text-3xl font-bold">Purchase History</h1>
              <p className="text-muted-foreground mt-1">
                View all your previous purchases
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{purchases.length}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Items Purchased</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">{formatPrice(totalSpent)}</p>
                </div>
                <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase History */}
        {purchases.length > 0 ? (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{purchase.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(purchase.purchaseDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-white ${getStatusColor(purchase.status)}`}>
                        {purchase.status.toUpperCase()}
                      </Badge>
                      <p className="text-lg font-bold text-primary mt-1">
                        {formatPrice(purchase.totalAmount)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {purchase.products.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.product.images[0] || '/placeholder.svg'}
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </Link>
                        
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            by {item.product.sellerName}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {item.product.category}
                            </Badge>
                            <div className="text-right">
                              <p className="font-medium">
                                {formatPrice(item.product.price)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">📦</div>
              <CardTitle className="mb-2">No purchases yet</CardTitle>
              <p className="text-muted-foreground mb-6">
                You haven't made any purchases yet. Start shopping to see your order history here.
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

export default Purchases;