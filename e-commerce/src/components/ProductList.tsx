import { useEffect, useState } from 'react';
import { Grid, Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';
import Category from './Category';
import { getAllProducts } from '../services/ProductService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setLoading } from '../redux/appSlice';
import type { ProductType } from '../types/Types';

function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.isLoading);

  useEffect(() => {
    console.log('ProductList component yüklendi, ürünler çekiliyor...');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    console.log('Ürünler API\'den çekiliyor...');
    try {
      const result = await getAllProducts();
      console.log('API yanıtı:', result);
      
      if (result.success && result.data) {
        console.log(`${result.data.length} ürün başarıyla yüklendi`);
        setAllProducts(result.data);
        setProducts(result.data);
        setError('');
      } else {
        console.error('API hatası:', result.error);
        setError(result.error || 'Ürünler yüklenemedi');
        toast.error(result.error || 'Ürünler yüklenemedi');
      }
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
      setError('Ürünler yüklenirken bir hata oluştu');
      toast.error('Ürünler yüklenirken bir hata oluştu');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    
    if (categories.length === 0) {
      // Hiç kategori seçilmemişse tüm ürünleri göster
      setProducts(allProducts);
    } else {
      // Seçili kategorilere göre filtrele
      const filtered = allProducts.filter(product => 
        categories.includes(product.category)
      );
      setProducts(filtered);
      console.log(`${filtered.length} ürün filtrelendi`);
    }
  };

  const handleAddToCart = (product: ProductType) => {
    toast.success(`${product.title} sepete eklendi!`);
    console.log('Sepete eklenen ürün:', {
      id: product.id,
      başlık: product.title,
      fiyat: product.price,
      kategori: product.category
    });
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

  if (error) {
    return (
      <Container maxWidth={false} sx={{ mt: 4, px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4, px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
      {/* Kategori Filtresi - Üstte, Yatay */}
      <Box sx={{ mb: 3 }}>
        <Category 
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      </Box>

      {/* Ürünler - Tam Genişlik */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }} key={product.id}>
            <ProductCard 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>

      {products.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Seçili kategorilerde ürün bulunamadı
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default ProductList;
