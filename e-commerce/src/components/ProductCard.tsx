import { Card, CardContent, CardMedia, Typography, Button, Rating, Box } from '@mui/material';
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../redux/hooks';
import { addToBasket } from '../redux/slices/basketSlice';
import type { ProductType } from '../types/Types';

interface ProductCardProps {
  product: ProductType;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToBasket({ product, quantity: 1 }));
    toast.success(`${product.title} sepete eklendi!`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
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

        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h5" 
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FaEye />}
            onClick={handleDetailClick}
            fullWidth
            sx={{
              textTransform: 'none',
              borderColor: '#667eea',
              color: '#667eea',
              '&:hover': {
                borderColor: '#764ba2',
                backgroundColor: 'rgba(102, 126, 234, 0.04)',
              }
            }}
          >
            Detay
          </Button>
          
          <Button
            variant="contained"
            startIcon={<FaShoppingCart />}
            onClick={handleAddToCart}
            fullWidth
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
