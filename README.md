# Veloria E-Ticaret Uygulaması

Bu proje, **React**, **TypeScript** ve **Vite** kullanılarak geliştirilmiş, modern ve responsive bir e-ticaret uygulamasıdır. Kullanıcıların ürünleri inceleyebileceği, kategoriye göre filtreleyebileceği, sepete ekleyebileceği ve sanal bakiye ile satın alma işlemi gerçekleştirebileceği kapsamlı bir ön yüz (frontend) deneyimi sunar.

## 🚀 Özellikler

  * **Kullanıcı Kimlik Doğrulama:**
      * Kayıt Ol (Register) ve Giriş Yap (Login) sayfaları.
      * Formik ve Yup ile form yönetimi ve validasyonu.
      * JSON Server kullanılarak simüle edilmiş kullanıcı veritabanı.
  * **Ürün Yönetimi:**
      * [FakeStoreAPI](https://fakestoreapi.com/) üzerinden dinamik ürün verisi çekme.
      * Kategori bazlı filtreleme.
      * Ürün ismine göre arama yapma.
      * Detaylı ürün sayfası.
  * **Sepet ve Sipariş:**
      * Ürünleri sepete ekleme, çıkarma ve miktar güncelleme.
      * Sepet içeriğini görüntülemek için sağdan açılan çekmece (Drawer).
      * Kullanıcı bakiyesi ile satın alma simülasyonu.
  * **Durum Yönetimi (State Management):**
      * **Redux Toolkit** ile global state yönetimi (Sepet, Kullanıcı, Yüklenme Durumu vb.).
  * **Arayüz ve UX:**
      * **Material UI (MUI)** bileşenleri ile şık tasarım.
      * React Toastify ile kullanıcı bildirimleri (Başarılı, Hata, Uyarı).
      * Yüklenme durumları için Spinner (Loading indicator).
      * Responsive tasarım.

## 🛠️ Teknolojiler

  * **Core:** [React v19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
  * **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/), React-Redux
  * **Routing:** [React Router DOM v7](https://reactrouter.com/)
  * **UI Framework:** [Material UI (@mui/material)](https://mui.com/)
  * **HTTP Client:** [Axios](https://axios-http.com/)
  * **Form & Validation:** [Formik](https://formik.org/), [Yup](https://github.com/jquense/yup)
  * **Icons:** React Icons, MUI Icons
  * **Notifications:** React Toastify
  * **Mock Backend:** JSON Server (Kullanıcı verileri için)

## ⚙️ Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### 1\. Projeyi Klonlayın

```bash
git clone https://github.com/enesdolgun33/e-commerce-app.git
cd e-commerce-app
```

### 2\. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3\. Uygulamayı Başlatın

Bu proje iki farklı sunucuya ihtiyaç duyar: Biri React uygulaması için, diğeri kullanıcı verilerini tutan yerel JSON veritabanı için.

**Adım 3.1: JSON Server'ı Başlatın (Backend Simülasyonu)**
Kullanıcı giriş/çıkış işlemlerinin çalışması için `json-server`'ı ayrı bir terminalde 3000 portunda çalıştırmanız gerekmektedir.

```bash
npx json-server --watch src/jsonserver/db.json --port 3000
```

**Adım 3.2: React Uygulamasını Başlatın**
Yeni bir terminal açın ve projeyi başlatın:

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` (veya terminalde belirtilen adres) adresine giderek uygulamayı görüntüleyebilirsiniz.

## 📂 Proje Yapısı

```
src/
├── components/      # Navbar, ProductCard, Spinner vb. tekrar kullanılabilir bileşenler
├── config/          # Axios ve Router konfigürasyonları
├── css/             # Sayfa bazlı CSS dosyaları
├── images/          # Logo ve statik görseller
├── jsonserver/      # db.json (Kullanıcı veritabanı)
├── pages/           # HomePage, LoginPage, RegisterPage, ProductDetail
├── redux/           # Redux store ve slice dosyaları (appSlice, basketSlice)
├── schemas/         # Yup validasyon şemaları
├── services/        # API isteklerini yöneten servisler
├── types/           # TypeScript tip tanımlamaları
├── App.tsx          # Ana uygulama bileşeni
└── main.tsx         # Giriş noktası
```

## 📝 Kullanım Senaryosu

1.  **Kayıt Olun:** "Kaydol" sayfasına giderek yeni bir kullanıcı oluşturun. Sisteme yeni kaydolan kullanıcılara varsayılan olarak **1000$** bakiye tanımlanır.
2.  **Giriş Yapın:** Oluşturduğunuz kullanıcı bilgileri ile giriş yapın.
3.  **Alışveriş Yapın:**
      * Ürünleri inceleyin ve detaylarına gidin.
      * Beğendiğiniz ürünleri sepete ekleyin.
      * Sağ üstteki sepet ikonuna tıklayarak sepetinizi görüntüleyin.
4.  **Satın Alın:** Sepet detayında "Satın Al" butonuna tıklayın. Eğer bakiyeniz yeterliyse satın alma gerçekleşecek ve tutar bakiyenizden düşülecektir.

## 🤝 Katkıda Bulunma

1.  Bu repoyu fork edin.
2.  Yeni bir feature branch oluşturun (`git checkout -b feature/amazing-feature`).
3.  Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`).
4.  Branch'inizi push edin (`git push origin feature/amazing-feature`).
5.  Bir Pull Request oluşturun.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
