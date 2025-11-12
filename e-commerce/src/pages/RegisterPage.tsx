import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaEraser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { RegisterPageSchema } from '../schemas/RegisterPageSchema';
import { registerUser, checkEmailExists, checkPhoneExists } from '../services/RegisterPageService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setLoading } from '../redux/appSlice';
import Spinner from '../components/Spinner';
import '../css/RegisterPage.css';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.isLoading);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegisterPageSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));
      try {
        // E-posta kontrolü
        const emailExists = await checkEmailExists(values.email);
        if (emailExists) {
          dispatch(setLoading(false));
          toast.error('Bu e-posta adresi zaten kayıtlı!');
          return;
        }

        // Telefon kontrolü
        const phoneExists = await checkPhoneExists(values.phone);
        if (phoneExists) {
          dispatch(setLoading(false));
          toast.error('Bu telefon numarası zaten kayıtlı!');
          return;
        }

        // Kullanıcı kaydı
        const result = await registerUser(values);

        if (result.success) {
          toast.success('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
          formik.resetForm();
          setTimeout(() => {
            dispatch(setLoading(false));
            navigate('/login');
          }, 2000);
        } else {
          dispatch(setLoading(false));
          toast.error(result.error || 'Kayıt sırasında bir hata oluştu.');
        }
      } catch (error) {
        dispatch(setLoading(false));
        console.error('Kayıt hatası:', error);
        toast.error('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClear = () => {
    formik.resetForm();
  };

  return (
    <>
      <Spinner loading={loading} />
      <div className="register-container">
        <div className="register-box">
        <div className="register-header">
          <h1>Hesap Oluştur</h1>
          <p>Hemen üye olun ve alışverişe başlayın</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="register-form">
          <TextField
            fullWidth
            label="Ad Soyad"
            name="fullName"
            type="text"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser className="input-icon" />
                  </InputAdornment>
                ),
              }
            }}
            sx={{ marginBottom: 2 }}
          />

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
            label="Telefon"
            name="phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            variant="outlined"
            placeholder="5551234567"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FaPhone className="input-icon" />
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
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Şifre Tekrar"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }}
            sx={{ marginBottom: 2 }}
          />

          <div className="button-group">
            <Button
              type="button"
              variant="outlined"
              className="clear-button"
              onClick={handleClear}
              startIcon={<FaEraser />}
            >
              Temizle
            </Button>

            <Button
              type="submit"
              variant="contained"
              className="register-button"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </Button>
          </div>

          <div className="login-link">
            <span>Zaten hesabınız var mı? </span>
            <Link to="/login">Giriş Yap</Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default RegisterPage;