import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaEraser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css/RegisterPage.css';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClear = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    
    console.log('Register data:', formData);
    // Kayıt işlemleri burada yapılacak
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <h1>Hesap Oluştur</h1>
          <p>Hemen üye olun ve alışverişe başlayın</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <TextField
            fullWidth
            label="Ad Soyad"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser className="input-icon" />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaEnvelope className="input-icon" />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Telefon"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaPhone className="input-icon" />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Şifre"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            InputProps={{
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
            }}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            fullWidth
            label="Şifre Tekrar"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
            required
            InputProps={{
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
            >
              Kayıt Ol
            </Button>
          </div>

          <div className="login-link">
            <span>Zaten hesabınız var mı? </span>
            <Link to="/login">Giriş Yap</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;