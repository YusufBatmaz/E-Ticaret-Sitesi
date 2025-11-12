import { Card, CardContent, CardMedia, Typography, Button, Rating, Box } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import type { ProductType } from '../types/Types';

interface ProductCardProps {
  product: ProductType;
  onAddToCart?: (product: ProductType) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.image}
        alt={product.title}
        sx={{ 
          objectFit: 'contain',
          padding: 2,
          backgroundColor: '#f5f5f5'
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3.6em',
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          {product.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 2,
            flexGrow: 1
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              backgroundColor: '#667eea',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              fontSize: '0.7rem'
            }}
          >
            {product.category}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating 
            value={product.rating.rate} 
            precision={0.1} 
            readOnly 
            size="small"
          />
          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
            ({product.rating.count})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h5" 
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<FaShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              }
            }}
          >
            Sepete Ekle
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
