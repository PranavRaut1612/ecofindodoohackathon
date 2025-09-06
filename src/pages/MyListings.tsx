import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ProductCard } from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';

const MyListings: React.FC = () => {
  const { myListings, deleteProduct } = useApp();
  const { toast } = useToast();
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    setProductToDelete(null);
    toast({
      title: "Product deleted",
      description: "Your product has been removed from the marketplace.",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const totalValue = myListings
    .filter(product => product.isAvailable)
    .reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your products and track performance
            </p>
          </div>
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link to="/add-product">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold">{myListings.length}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold">
                    {myListings.filter(p => p.isAvailable).length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Plus className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">{formatPrice(totalValue)}</p>
                </div>
                <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-warning">$</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        {myListings.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20 md:mb-6">
            {myListings.map(product => (
              <div key={product.id} className="relative">
                <ProductCard 
                  product={product} 
                  showActions 
                  onEdit={(product) => {
                    // In a real app, this would navigate to edit page
                    toast({
                      title: "Edit Feature",
                      description: "Edit functionality would be implemented here.",
                    });
                  }}
                  onDelete={(productId) => setProductToDelete(productId)}
                />
                
                {!product.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg">
                      SOLD
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">📦</div>
              <CardTitle className="mb-2">No listings yet</CardTitle>
              <p className="text-muted-foreground mb-6">
                Start selling by adding your first product to the marketplace
              </p>
              <Button asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/add-product">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => productToDelete && handleDelete(productToDelete)}
                className="bg-destructive hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MyListings;