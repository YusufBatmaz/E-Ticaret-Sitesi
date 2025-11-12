import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Paper,
  Divider,
  CircularProgress,
  Collapse,
  IconButton
} from '@mui/material';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getCategories } from '../services/ProductService';
import { toast } from 'react-toastify';

interface CategoryProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

function Category({ selectedCategories, onCategoryChange }: CategoryProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const result = await getCategories();
      
      if (result.success && result.data) {
        setCategories(result.data);
        console.log('Kategoriler yüklendi:', result.data);
      } else {
        toast.error('Kategoriler yüklenemedi');
      }
    } catch (error) {
      console.error('Kategori yükleme hatası:', error);
      toast.error('Kategoriler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (category: string) => {
    const isSelected = selectedCategories.includes(category);
    let newSelectedCategories: string[];

    if (isSelected) {
      // Kategoriyi kaldır
      newSelectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      // Kategoriyi ekle
      newSelectedCategories = [...selectedCategories, category];
    }

    onCategoryChange(newSelectedCategories);
    console.log('Seçili kategoriler:', newSelectedCategories);
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      // Tümünü kaldır
      onCategoryChange([]);
    } else {
      // Tümünü seç
      onCategoryChange(categories);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <Paper 
        elevation={3}
        sx={{ 
          p: 3,
          borderRadius: 2,
          position: 'sticky',
          top: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200
        }}
      >
        <CircularProgress size={40} />
      </Paper>
    );
  }

  return (
    <Paper 
      elevation={3}
      sx={{ 
        borderRadius: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Header - Her zaman görünür */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'rgba(102, 126, 234, 0.05)'
          }
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaFilter color="#667eea" size={20} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: '#333'
            }}
          >
            Kategoriler
          </Typography>
          {selectedCategories.length > 0 && (
            <Box 
              sx={{ 
                bgcolor: '#667eea',
                color: 'white',
                borderRadius: '50%',
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              {selectedCategories.length}
            </Box>
          )}
        </Box>

        <IconButton size="small" sx={{ color: '#667eea' }}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </IconButton>
      </Box>

      {/* Collapsible Content */}
      <Collapse in={isOpen}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
            {/* Tümünü Seç/Kaldır */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.length === categories.length && categories.length > 0}
                  indeterminate={selectedCategories.length > 0 && selectedCategories.length < categories.length}
                  onChange={handleSelectAll}
                  sx={{
                    color: '#667eea',
                    '&.Mui-checked': {
                      color: '#667eea',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: '#667eea',
                    }
                  }}
                />
              }
              label={
                <Typography sx={{ fontWeight: 600, color: '#667eea' }}>
                  Tümü
                </Typography>
              }
              sx={{ 
                mr: 2,
                bgcolor: selectedCategories.length > 0 ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                borderRadius: 1,
                px: 1
              }}
            />

            {/* Kategoriler */}
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    sx={{
                      color: '#667eea',
                      '&.Mui-checked': {
                        color: '#667eea',
                      }
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.95rem' }}>
                    {capitalizeFirstLetter(category)}
                  </Typography>
                }
                sx={{
                  bgcolor: selectedCategories.includes(category) ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                  borderRadius: 1,
                  px: 1,
                  mr: 1
                }}
              />
            ))}
          </FormGroup>
        </Box>
      </Collapse>
    </Paper>
  );
}

export default Category;
