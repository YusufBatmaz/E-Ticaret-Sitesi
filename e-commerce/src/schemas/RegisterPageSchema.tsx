import * as Yup from 'yup';

export const RegisterPageSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Ad Soyad en az 3 karakter olmalıdır')
    .max(50, 'Ad Soyad en fazla 50 karakter olabilir')
    .required('Ad Soyad zorunludur'),
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta zorunludur'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon numarası zorunludur'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .matches(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .matches(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermelidir')
    .required('Şifre zorunludur'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunludur')
});
