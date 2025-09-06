import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Edit, Trash2, Eye } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showActions = false, 
  onEdit, 
  onDelete 
}) => {
  const { addToCart, user } = useApp();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(product.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-success';
      case 'like-new': return 'bg-info';
      case 'good': return 'bg-warning';
      case 'fair': return 'bg-secondary';
      case 'poor': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="product-card h-full group cursor-pointer">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.images[0] || '/placeholder.svg'} 
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            className={`absolute top-2 left-2 text-white ${getConditionColor(product.condition)}`}
          >
            {product.condition}
          </Badge>
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">
                Sold
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <Badge variant="outline">
              {product.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            by {product.sellerName}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {showActions ? (
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEdit}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDelete}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleEdit}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              {product.isAvailable && product.sellerId !== user?.id && (
                <Button 
                  onClick={handleAddToCart}
                  size="sm"
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};