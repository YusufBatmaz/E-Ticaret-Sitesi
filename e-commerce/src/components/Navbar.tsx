import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  InputBase, 
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider
} from '@mui/material';
import { 
  FaSearch, 
  FaCog, 
  FaSignOutAlt, 
  FaShoppingBag,
  FaUser,
  FaTimes,
  FaShoppingCart
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, setSearchQuery, clearSearchQuery } from '../redux/appSlice';
import { toast } from 'react-toastify';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.app.user);
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  const searchQuery = useAppSelector((state) => state.app.searchQuery);
  const basketItemsCount = useAppSelector((state) => state.basket.items?.length || 0);

  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Başarıyla çıkış yapıldı');
    navigate('/login');
    handleMenuClose();
  };

  const handleSettings = () => {
    toast.info('Ayarlar sayfası yakında eklenecek');
    handleMenuClose();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      dispatch(setSearchQuery(searchValue.trim()));
      toast.success(`"${searchValue.trim()}" için arama yapılıyor...`);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    dispatch(clearSearchQuery());
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    toast.info('Sepet sayfası yakında eklenecek');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo ve Şirket İsmi */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            cursor: 'pointer'
          }}
          onClick={handleLogoClick}
        >
          <FaShoppingBag size={32} color="white" />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: 'white',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Yusuf'un E-ticaret Sitesi
          </Typography>
        </Box>

        {/* Arama Butonu */}
        <Box 
          component="form"
          onSubmit={handleSearch}
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            flexGrow: 1,
            maxWidth: 600,
            mx: { xs: 1, sm: 3 },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            }
          }}
        >
          <FaSearch color="white" style={{ marginRight: 8 }} />
          <InputBase
            placeholder="Ürün ara..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ 
              color: 'white',
              flexGrow: 1,
              '& ::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1
              }
            }}
          />
          {searchValue && (
            <IconButton
              size="small"
              onClick={handleClearSearch}
              sx={{ 
                color: 'white',
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <FaTimes size={14} />
            </IconButton>
          )}
        </Box>

        {/* Sağ Taraf - Sepet, Ayarlar ve Çıkış */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Sepet İkonu */}
          <IconButton
            onClick={handleCartClick}
            sx={{ 
              color: 'white',
              position: 'relative',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <FaShoppingCart size={24} />
            {/* Sepet Badge - Farklı ürün çeşidi sayısı */}
            {basketItemsCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#ff4444',
                  color: 'white',
                  borderRadius: '50%',
                  minWidth: 16,
                  height: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  border: '1.5px solid white',
                  padding: '0 3px'
                }}
              >
                {basketItemsCount > 99 ? '99+' : basketItemsCount}
              </Box>
            )}
          </IconButton>

          {isAuthenticated && user ? (
            <>
              {/* Kullanıcı Bilgisi */}
              <Box 
                sx={{ 
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  mr: 1
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {user.fullName}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Bütçe: ${user.budget.toFixed(2)}
                </Typography>
              </Box>

              {/* Avatar */}
              <IconButton
                onClick={handleMenuOpen}
                sx={{ 
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'white',
                    color: '#667eea',
                    width: 40,
                    height: 40,
                    fontWeight: 700
                  }}
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {user.fullName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleSettings}>
                  <FaCog style={{ marginRight: 12 }} />
                  Ayarlar
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <FaSignOutAlt style={{ marginRight: 12 }} />
                  Çıkış Yap
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Giriş Yapmamış Kullanıcı */}
              <IconButton
                onClick={() => navigate('/login')}
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <FaUser />
              </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
