import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import RouterConfig from './config/RouterConfig';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './redux/hooks';
import { loadUserFromStorage } from './redux/appSlice';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Navbar'ın gözükmeyeceği sayfalar
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcıyı localStorage'dan yükle
    dispatch(loadUserFromStorage());
    
    // Kullanıcı bilgilerini console'a yazdır
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      console.log('Kullanıcı bilgileri yüklendi:', {
        adSoyad: user.fullName,
        email: user.email,
        telefon: user.phone,
        bütçe: user.budget,
        kayıtTarihi: new Date(user.createdAt).toLocaleString('tr-TR')
      });
    }
  }, [dispatch]);

  return (  
   <div>
    {shouldShowNavbar && <Navbar />}
    <RouterConfig />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
   </div>
  );
}

export default App;
