import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Divider,
  Button,
  List,
  ListItem,
  Avatar
} from '@mui/material';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromBasket,
  clearBasket 
} from '../redux/slices/basketSlice';
import { decreaseBudget } from '../redux/appSlice';
import { toast } from 'react-toastify';

interface BasketDetailsProps {
  open: boolean;
  onClose: () => void;
}

function BasketDetails({ open, onClose }: BasketDetailsProps) {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector((state) => state.basket.items || []);
  const totalPrice = useAppSelector((state) => state.basket.totalPrice || 0);
  const totalItems = useAppSelector((state) => state.basket.totalItems || 0);
  const user = useAppSelector((state) => state.app.user);
  
  // Bütçe hesaplamaları
  const remainingBudget = user ? user.budget - totalPrice : 0;
  const isAffordable = remainingBudget >= 0;
  const canCheckout = user && isAffordable;

  const handleIncrease = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemove = (productId: number, productTitle: string) => {
    dispatch(removeFromBasket(productId));
    toast.info(`${productTitle} sepetten çıkarıldı`);
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
    toast.success('Sepet temizlendi');
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Satın alma işlemi için giriş yapmalısınız');
      return;
    }

    if (!isAffordable) {
      toast.error(`Yetersiz bütçe! Mevcut bütçeniz: $${user.budget.toFixed(2)}, Gerekli: $${totalPrice.toFixed(2)}`);
      return;
    }

    // Bütçeyi güncelle
    const newBudget = user.budget - totalPrice;
    dispatch(decreaseBudget(totalPrice));

    // Sepeti temizle
    dispatch(clearBasket());

    // Başarı mesajı
    toast.success(`Satın alma başarılı! Kalan bütçeniz: $${newBudget.toFixed(2)}`);
    
    console.log('Satın alma detayları:', {
      kullanıcı: user.fullName,
      ürünSayısı: totalItems,
      toplamTutar: totalPrice.toFixed(2),
      öncekiBütçe: user.budget.toFixed(2),
      yeniBütçe: newBudget.toFixed(2),
      tarih: new Date().toLocaleString('tr-TR')
    });

    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100%'
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaShoppingCart size={24} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Sepetim
            </Typography>
          </Box>
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <FaTimes />
          </IconButton>
        </Box>

        {/* Sepet İçeriği */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {basketItems.length === 0 ? (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                gap: 2
              }}
            >
              <FaShoppingCart size={64} color="#ccc" />
              <Typography variant="h6" color="text.secondary">
                Sepetiniz Boş
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Alışverişe başlamak için ürünleri sepete ekleyin
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ p: 0 }}>
                {basketItems.map((item) => (
                  <Box key={item.product.id}>
                    <ListItem 
                      sx={{ 
                        p: 2,
                        display: 'flex',
                        gap: 2,
                        alignItems: 'flex-start'
                      }}
                    >
                      {/* Ürün Görseli */}
                      <Avatar
                        src={item.product.image}
                        variant="rounded"
                        sx={{ 
                          width: 80, 
                          height: 80,
                          backgroundColor: '#f5f5f5',
                          '& img': {
                            objectFit: 'contain',
                            padding: 1
                          }
                        }}
                      />

                      {/* Ürün Bilgileri */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 0.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {item.product.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          color="primary"
                          sx={{ fontWeight: 700, mb: 1 }}
                        >
                          ${item.product.price.toFixed(2)}
                        </Typography>

                        {/* Miktar Kontrolleri */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDecrease(item.product.id)}
                            sx={{
                              border: '1px solid #667eea',
                              color: '#667eea',
                              width: 28,
                              height: 28,
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              }
                            }}
                          >
                            <FaMinus size={10} />
                          </IconButton>

                          <Typography 
                            variant="body1" 
                            sx={{ 
                              minWidth: '30px', 
                              textAlign: 'center',
                              fontWeight: 600 
                            }}
                          >
                            {item.quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() => handleIncrease(item.product.id)}
                            sx={{
                              border: '1px solid #667eea',
                              color: '#667eea',
                              width: 28,
                              height: 28,
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              }
                            }}
                          >
                            <FaPlus size={10} />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleRemove(item.product.id, item.product.title)}
                            sx={{
                              color: '#ff4444',
                              ml: 1,
                              '&:hover': {
                                backgroundColor: 'rgba(255, 68, 68, 0.1)',
                              }
                            }}
                          >
                            <FaTrash size={14} />
                          </IconButton>
                        </Box>

                        {/* Ara Toplam */}
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Ara Toplam: ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>

              {/* Sepeti Temizle Butonu */}
              {basketItems.length > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<FaTrash />}
                  onClick={handleClearBasket}
                  sx={{ mt: 2 }}
                >
                  Sepeti Temizle
                </Button>
              )}
            </>
          )}
        </Box>

        {/* Footer - Toplam ve Ödeme */}
        {basketItems.length > 0 && (
          <Box 
            sx={{ 
              p: 2, 
              borderTop: '2px solid #f0f0f0',
              backgroundColor: '#fafafa'
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  Toplam Ürün:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {totalItems} Adet
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Toplam:
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              
              {/* Bütçe Bilgisi */}
              {user && (
                <Box 
                  sx={{ 
                    mt: 2,
                    p: 1.5,
                    borderRadius: 1,
                    backgroundColor: isAffordable ? '#e8f5e9' : '#ffebee'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Mevcut Bütçe:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${user.budget.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Kalan Bütçe:
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 700,
                        color: isAffordable ? '#2e7d32' : '#d32f2f'
                      }}
                    >
                      ${remainingBudget.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Yetersiz Bütçe Uyarısı */}
            {user && !isAffordable && (
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: '#ffebee',
                  border: '1px solid #ef5350',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#d32f2f',
                    fontWeight: 600,
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  ⚠️ Bakiyeniz Yeterli Değil!
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={!canCheckout}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                },
                '&:disabled': {
                  background: '#ccc',
                  color: '#666'
                }
              }}
            >
              {!user ? 'Giriş Yapın' : !isAffordable ? 'Yetersiz Bakiye' : 'Satın Al'}
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default BasketDetails;
