import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { LoginPageSchema } from '../schemas/LoginPageSchema';
import { loginUser } from '../services/LoginPageService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser, setLoading } from '../redux/appSlice';
import Spinner from '../components/Spinner';
import '../css/LoginPage.css';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.isLoading);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginPageSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        const result = await loginUser(values);

        if (result.success && result.data) {
          dispatch(setUser(result.data));
          toast.success('Giriş başarılı! Hoş geldiniz...');
          formik.resetForm();
          setTimeout(() => {
            dispatch(setLoading(false));
            navigate('/');
          }, 1500);
        } else {
          dispatch(setLoading(false));
          toast.error(result.error || 'E-posta veya şifre hatalı!');
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error('Giriş hatası:', error);
        toast.error('Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Spinner loading={loading} />
      <div className="login-container">
        <div className="login-box">
        <div className="login-header">
          <h1>Hoş Geldiniz</h1>
          <p>Hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="login-form">
          <TextField
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope className="input-icon" />
                  </InputAdornment>
                ),
              }
            }}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Şifre"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock className="input-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
            sx={{ marginBottom: 1 }}
          />

          <div className="forgot-password">
            <Link to="/forgot-password">Şifremi Unuttum?</Link>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            disabled={formik.isSubmitting}
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            {formik.isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>

          <div className="register-link">
            <span>Hesabınız yok mu? </span>
            <Link to="/register">Kayıt Ol</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default LoginPage;