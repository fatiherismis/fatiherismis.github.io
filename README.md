# 📱 BY PLANT - Landscape Design Portfolio

Modern ve minimalist bir peyzaj tasarım portfolyo websitesi. Tam sayfa kaydırma (fullscreen scrolling) özelliği ile responsive tasarım.

## 🎨 Özellikler

### ⚡ Core Features
- ✨ Fullscreen hero section (fixed background)
- 🖼️ Çift slider sistemi (projeler + hizmetler)
- 📱 Tam responsive tasarım (Desktop → Mobile)
- 👆 Touch/gesture desteği
- 🎭 Smooth animasyonlar ve parallax efektler
- ⚡ Performans optimizasyonları
- 🎯 Modern ve minimalist UI

### 🚀 NEW! Enhanced Features (v2.0)
- 🎬 **Loading Screen** - Animated yükleme ekranı
- 🖱️ **Custom Cursor** - Özel mouse imleci
- 📊 **Animated Stats Counter** - İstatistik sayaçları (50+ proje, 100+ müşteri)
- ❓ **FAQ Accordion** - Sıkça sorulan sorular (5 soru)
- 💬 **WhatsApp Float Button** - Hızlı iletişim butonu
- 🌟 **Scroll Reveal Animations** - Smooth görünme animasyonları
- 🎯 **Parallax Hero Effect** - Hero bölümü parallax efekti
- 🎪 **Enhanced Navbar** - Scroll ile gizlenen/görünen navbar
- ⚙️ **Performance Optimizations** - Debounce, lazy loading

## 📂 Proje Yapısı

```
.
├── index.html              # Ana HTML dosyası
├── styles.css              # CSS stilleri (2900+ satır)
├── script.js               # JavaScript fonksiyonları (850+ satır)
├── hero.gif                # Hero bölümü animasyonu
├── yosun.jpg               # Yosun tablo görseli
├── 1-4.png                 # Çalışma örnekleri görselleri
├── bylogo.png              # Logo ve favicon
├── Avenir-Black.*          # Özel font dosyaları
├── README.md               # Bu dosya
├── MOBILE_OPTIMIZATION.md  # Mobil optimizasyon dokümantasyonu
└── ENHANCED_FEATURES.md    # Yeni özellikler dokümantasyonu
```

## 🚀 Kullanım

Projeyi yerel bilgisayarınızda çalıştırmak için:

### Yöntem 1: Direkt Açma
```bash
# index.html dosyasını tarayıcıda aç
open index.html  # macOS
start index.html # Windows
```

### Yöntem 2: Python HTTP Server
```bash
# Python 3 ile
python -m http.server 8000

# Tarayıcıda aç
http://localhost:8000
```

### Yöntem 3: Node.js HTTP Server
```bash
# http-server yükle
npm install -g http-server

# Sunucuyu başlat
http-server

# Tarayıcıda aç
http://localhost:8080
```

### Yöntem 4: VS Code Live Server
```bash
# VS Code'da sağ tık → "Open with Live Server"
```

## 🛠️ Teknolojiler

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Animations, Custom Properties
- **Vanilla JavaScript (ES6+)** - Intersection Observer, Event Listeners
- **Google Fonts** - Playball, Poppins, Montserrat, Inter
- **SVG Icons** - Inline SVG kullanımı

## 📱 Responsive Breakpoints

| Device | Width | Grid | Features |
|--------|-------|------|----------|
| Desktop | 1440px+ | Multi-column | Tam özellikler + cursor |
| Laptop | 1024px-1440px | Adjusted | Tüm özellikler |
| Tablet | 768px-1024px | 2-column | Optimize edilmiş |
| Mobile | 480px-768px | 1-column | Touch optimized |
| Small | <480px | 1-column | Minimal |

## 🎯 Bölümler

1. **Hero** - Animasyonlu giriş bölümü (fixed background)
2. **About** - Hakkımızda + scroll animasyonu
3. **Work Grid** - Çalışma örnekleri (3 proje)
4. **Moss Products** - Yosun tablo ürün tanıtımı (Shopier link)
5. **Services** - Hizmetler slider (4 slide)
6. **How We Work** - Çalışma sürecimiz (3 adım)
7. **Stats** - İstatistikler (4 metric - animated counter)
8. **FAQ** - Sıkça sorulan sorular (5 soru - accordion)
9. **Contact** - İletişim bilgileri

## 🎨 Özelleştirme

### Stats Değerlerini Değiştirme
```html
<div class="stat-number" data-target="50">0</div>
```
`data-target` attribute'unu değiştir.

### FAQ Ekleme/Çıkarma
```html
<div class="faq-item">
    <button class="faq-question">
        <span>Soru metni?</span>
        <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
        <p>Cevap metni</p>
    </div>
</div>
```

### WhatsApp Numarası
```html
href="https://wa.me/90XXXXXXXXXX?text=Mesaj..."
```

### Renkler
```css
--primary: #4CAF50;
--secondary: #66BB6A;
--whatsapp: #25D366;
```

## 📊 Performans

### Optimizasyonlar
- ✅ CSS Hardware Acceleration
- ✅ JavaScript Debouncing
- ✅ Lazy Loading Images
- ✅ Intersection Observer API
- ✅ RequestAnimationFrame
- ✅ Efficient Selectors

### Hedef Metrikler
- **Lighthouse Score**: 90+
- **First Contentful Paint**: <2s
- **Time to Interactive**: <3s
- **Largest Contentful Paint**: <2.5s

## 🐛 Troubleshooting

### Loading Screen Takılırsa
- Console'da JavaScript hatalarını kontrol et
- Cache'i temizle (Ctrl/Cmd + Shift + R)

### Cursor Görünmüyorsa
- Desktop'ta çalıştığınızdan emin olun
- Mobil/tablet'te otomatik gizlenir

### Sayaç Çalışmıyorsa
- Stats section'a scroll ile ulaşın
- IntersectionObserver tarayıcı desteği kontrolü

## � Git Kullanımı

```bash
# Değişiklikleri commit et
git add .
git commit -m "feat: enhanced features added"

# Push to GitHub
git push origin main
```

## �📄 Lisans

Bu proje kişisel/ticari kullanım içindir.

## 👤 İletişim

- **Website**: [byplant.com](#)
- **Email**: byplanttr@gmail.com
- **Instagram**: [@byplantt](https://www.instagram.com/byplantt/)
- **WhatsApp**: +90 546 436 66 42

---

## 🎉 Changelog

### v2.0 - Enhanced Edition (12 Şubat 2026)
- ➕ Loading screen eklendi
- ➕ Custom cursor eklendi
- ➕ Animated stats counter eklendi
- ➕ FAQ accordion eklendi
- ➕ WhatsApp float button eklendi
- ➕ Parallax hero effect eklendi
- ➕ Enhanced navbar scroll behavior
- ➕ Scroll reveal animations
- ⚡ Performance optimizations

### v1.0 - Initial Release (29 Ocak 2026)
- ✅ Hero section with fixed background
- ✅ 7 main sections
- ✅ Modal system
- ✅ Horizontal sliders
- ✅ Mobile optimization
- ✅ Touch gestures support

---

Made with ❤️ by BY PLANT & GitHub Copilot
