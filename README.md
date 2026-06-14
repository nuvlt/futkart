# ★ Kart Kapışması (Hot-Seat v2)

Çocukluğun futbolcu kart oyunu — sırayla, aynı cihazda karşılıklı.
Üyeliksiz, backend yok. İki mod + premium stadyum arayüzü, mobil uyumlu.

## Çalıştırma
```
npm install
npm run dev      # geliştirme
npm run build    # üretim (dist/)
```

## Vercel'e deploy
GitHub'a yükle → Vercel "Import" → Framework: Vite → Deploy. Ayar gerekmez.

## Modlar
- İstatistik Yarıştırma: stat seç, yüksek olan rakibin kartını alır.
- Tek mi Çift mi: açılan kartın reyting son hanesini tahmin et. İki taraf
  da kart koyar, kazanan ikisini alır. Skorbord doğru tahminleri (✓) tutar.

## Foto / oyuncu düzenleme
`src/data/players.js`. Fotolar Wikimedia "Special:FilePath" üzerinden gelir
(tarayıcıda otomatik çalışır). Bir görsel açılmazsa kart "FOTO" yer tutucu
gösterir — o satırdaki dosya adını Commons'tan doğru adıyla değiştir.

## Sıradaki: backend
Şu an iki kişi aynı tarayıcıda oynuyor. Uzaktan kod paylaşımlı oynamak için
Railway'de küçük bir Express backend (kod üret / state sakla / sıra yönet)
ekleyeceğiz.
