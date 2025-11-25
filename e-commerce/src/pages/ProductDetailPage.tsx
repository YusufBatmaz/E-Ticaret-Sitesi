import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Rating, 
  CircularProgress,
  Alert,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import { FaShoppingCart, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getProductById } from '../services/ProductService';
import { useAppDispatch } from '../redux/hooks';
import { setLoading } from '../redux/appSlice';
import { addToBasket } from '../redux/slices/basketSlice';
import type { ProductType } from '../types/Types';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoadingState] = useState(true);
  const [error, setError] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      fetchProductDetail(parseInt(id));
    }
  }, [id]);

  const fetchProductDetail = async (productId: number) => {
    setLoadingState(true);
    dispatch(setLoading(true));
    
    try {
      const result = await getProductById(productId);
      
      if (result.success && result.data) {
        setProduct(result.data);
        setError('');
      } else {
        setError(result.error || 'Ürün bulunamadı');
        toast.error(result.error || 'Ürün bulunamadı');
      }
    } catch (error) {
      setError('Ürün yüklenirken bir hata oluştu');
      toast.error('Ürün yüklenirken bir hata oluştu');
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToBasket({ product, quantity }));
      toast.success(`${quantity} adet ${product.title} sepete eklendi!`);
      setQuantity(1); // Miktar sıfırla
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error || 'Ürün bulunamadı'}</Alert>
        <Button 
          startIcon={<FaArrowLeft />}
          onClick={handleGoBack}
          sx={{ mt: 2 }}
        >
          Ana Sayfaya Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<FaArrowLeft />}
        onClick={handleGoBack}
        sx={{ mb: 3 }}
      >
        Geri Dön
      </Button>

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: { xs: 3, md: 4 },
          alignItems: { xs: 'stretch', md: 'flex-start' }
        }}
      >
        {/* Ürün Görseli */}
        <Box sx={{ flex: { xs: '0 0 auto', md: 1 }, maxWidth: { xs: '100%', md: '50%' } }}>
          <Box
            sx={{
              width: '100%',
              height: { xs: 300, sm: 400, md: 500 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              padding: { xs: 2, md: 3 }
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>

        {/* Ürün Bilgileri */}
        <Box sx={{ flex: { xs: '0 0 auto', md: 1 }, maxWidth: { xs: '100%', md: '50%' } }}>
          <Box>
            <Chip 
              label={product.category}
              sx={{ 
                backgroundColor: '#667eea',
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 600,
                mb: 2
              }}
            />

            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={product.rating.rate} 
                precision={0.1} 
                readOnly 
                size="large"
              />
              <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary' }}>
                {product.rating.rate} ({product.rating.count} değerlendirme)
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Birim Fiyat
              </Typography>
              <Typography 
                variant="h3" 
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ fontWeight: 600, mb: 1 }}
            >
              Ürün Açıklaması
            </Typography>

            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.8 }}
            >
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Miktar Seçici */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Miktar
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  sx={{
                    border: '2px solid #667eea',
                    color: '#667eea',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    },
                    '&:disabled': {
                      border: '2px solid #ccc',
                      color: '#ccc',
                    }
                  }}
                >
                  <FaMinus />
                </IconButton>

                <Typography 
                  variant="h4" 
                  sx={{ 
                    minWidth: '60px', 
                    textAlign: 'center',
                    fontWeight: 600 
                  }}
                >
                  {quantity}
                </Typography>

                <IconButton
                  onClick={handleIncreaseQuantity}
                  sx={{
                    border: '2px solid #667eea',
                    color: '#667eea',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    }
                  }}
                >
                  <FaPlus />
                </IconButton>
              </Box>
            </Box>

            {/* Toplam Fiyat */}
            <Box 
              sx={{ 
                backgroundColor: '#f5f5f5', 
                padding: 2, 
                borderRadius: 2,
                mb: 3 
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Toplam Fiyat:
                </Typography>
                <Typography 
                  variant="h4" 
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  ${(product.price * quantity).toFixed(2)}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<FaShoppingCart />}
              onClick={handleAddToCart}
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                }
              }}
            >
              Sepete Ekle ({quantity} Adet)
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetailPage;
