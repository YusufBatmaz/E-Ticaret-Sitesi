# E-Ticaret Uygulaması

Modern ve kullanıcı dostu bir e-ticaret platformu. React, TypeScript, Redux Toolkit ve Material-UI kullanılarak geliştirilmiştir.

## 📸 Ekran Görüntüleri

### Ana Sayfa
<img width="1894" height="968" alt="image" src="https://github.com/user-attachments/assets/f2dbea1c-0aec-4062-abc9-0e98147b1888" />

*Ürünlerin listelendiği ve kategorilere göre filtrelenebildiği ana sayfa*

### Ürün Detay
<img width="1918" height="974" alt="image" src="https://github.com/user-attachments/assets/61548481-27ae-4829-b5ad-75b5a1cb8809" />

*Ürün detaylarının görüntülendiği ve sepete eklendiği sayfa*

### Sepet
<img width="374" height="981" alt="image" src="https://github.com/user-attachments/assets/c54abddf-82f8-4a3c-987c-e23c23d7c72a" />

*Sepetteki ürünlerin yönetildiği alan*

### Giriş Sayfası
<img width="1897" height="977" alt="image" src="https://github.com/user-attachments/assets/6cbd9dab-b053-4f87-9f8b-decd259b27ca" />

*Kullanıcı giriş ekranı*

### Kayıt Sayfası
<img width="1891" height="975" alt="image" src="https://github.com/user-attachments/assets/c49af2d1-98ea-4e30-b1bd-088beb2b03f6" />

*Yeni kullanıcı kayıt ekranı*

## ✨ Özellikler

- 🛍️ Ürün listeleme ve detay görüntüleme
- 🔍 Kategori bazlı ürün filtreleme
- 🛒 Sepet yönetimi (ekleme, çıkarma, miktar güncelleme)
- 👤 Kullanıcı kayıt ve giriş sistemi
- 💰 Kullanıcı bütçe takibi
- 📱 Responsive tasarım
- 🎨 Modern ve kullanıcı dostu arayüz
- ⚡ Hızlı ve performanslı
- 🔔 Toast bildirimleri

## 🚀 Teknolojiler

- **React 19** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Redux Toolkit** - State yönetimi
- **React Router DOM** - Sayfa yönlendirme
- **Material-UI** - UI bileşenleri
- **Axios** - HTTP istekleri
- **Formik & Yup** - Form yönetimi ve validasyon
- **React Toastify** - Bildirimler
- **JSON Server** - Mock backend API
- **Vite** - Build tool

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn

## 🔧 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd e-commerce
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. JSON Server'ı başlatın (Terminal 1):
```bash
npm run server
```

4. Geliştirme sunucusunu başlatın (Terminal 2):
```bash
npm run dev
```

5. Tarayıcınızda açın:
```
http://localhost:5173
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── BasketDetails.tsx
│   ├── Category.tsx
│   └── Spinner.tsx
├── pages/              # Sayfa bileşenleri
│   ├── HomePage.tsx
│   ├── ProductDetailPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── redux/              # Redux state yönetimi
│   ├── store.tsx
│   ├── appSlice.tsx
│   ├── hooks.tsx
│   └── slices/
│       └── basketSlice.tsx
├── services/           # API servisleri
│   ├── ProductService.tsx
│   ├── LoginPageService.tsx
│   └── RegisterPageService.tsx
├── schemas/            # Form validasyon şemaları
│   ├── LoginPageSchema.tsx
│   └── RegisterPageSchema.tsx
├── types/              # TypeScript tip tanımlamaları
│   └── Types.tsx
├── config/             # Yapılandırma dosyaları
│   ├── RouterConfig.tsx
│   └── AxiosConfig.tsx
├── jsonserver/         # Mock veritabanı
│   └── db.json
├── css/                # Stil dosyaları
└── images/             # Görseller
```

## 🎯 Kullanım

### Kullanıcı Kaydı
1. "Kayıt Ol" butonuna tıklayın
2. Gerekli bilgileri doldurun (Ad Soyad, E-posta, Telefon, Şifre)
3. Başlangıç bütçeniz otomatik olarak 5000₺ olarak atanır

### Giriş Yapma
1. Kayıtlı e-posta ve şifrenizi girin
2. Sisteme giriş yapın

### Ürün İşlemleri
1. Ana sayfada ürünleri görüntüleyin
2. Kategorilere göre filtreleyin
3. Ürün detayına gitmek için ürüne tıklayın
4. Sepete eklemek için "Sepete Ekle" butonunu kullanın

### Sepet Yönetimi
1. Navbar'daki sepet ikonuna tıklayın
2. Ürün miktarlarını artırın/azaltın
3. Ürünleri sepetten çıkarın
4. Toplam tutarı görüntüleyin

## 🔑 Test Kullanıcıları

```javascript
// Kullanıcı 1
Email: yusuf@example.com
Şifre: Yusuf123
Bütçe: 10000₺

// Kullanıcı 2
Email: aliVeli@gmail.com
Şifre: Asd123
Bütçe: 5000₺
```

## 📝 API Endpoints

JSON Server aşağıdaki endpoint'leri sağlar:

- `GET /users` - Tüm kullanıcıları listele
- `GET /users/:id` - Belirli bir kullanıcıyı getir
- `POST /users` - Yeni kullanıcı oluştur
- `PUT /users/:id` - Kullanıcı bilgilerini güncelle
- `DELETE /users/:id` - Kullanıcıyı sil

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# JSON Server'ı başlat
npm run server

# Production build
npm run build

# Linting
npm run lint

# Preview production build
npm run preview
```

## 🌟 Öne Çıkan Özellikler

- **State Yönetimi**: Redux Toolkit ile merkezi state yönetimi
- **Form Validasyonu**: Formik ve Yup ile güçlü form kontrolü
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **LocalStorage**: Kullanıcı ve sepet bilgilerinin kalıcı saklanması
- **Toast Bildirimleri**: Kullanıcı dostu geri bildirimler
- **TypeScript**: Tip güvenliği ve daha iyi geliştirici deneyimi

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
