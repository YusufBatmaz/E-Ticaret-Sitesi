import { useEffect } from 'react';
import './App.css';
import RouterConfig from './config/RouterConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './redux/hooks';
import { loadUserFromStorage } from './redux/appSlice';

function App() {
  const dispatch = useAppDispatch();

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
