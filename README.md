# ⚽ Futbolcu Kart Kapışması (Hot-Seat v1)

Çocukluğun futbolcu kart oyunu — sırayla, aynı cihazda karşılıklı.
Üyeliksiz, backend yok. İki mod: İstatistik Yarıştırma + Tek mi Çift mi.

## Çalıştırma
```
npm install
npm run dev      # geliştirme
npm run build    # üretim (dist/)
```

## Vercel'e deploy
GitHub'a yükle → Vercel'de "Import" → Framework: Vite → Deploy.
Otomatik algılar, ayar gerekmez.

## Oyuncu ekleme / foto koyma
`src/data/players.js` içindeki listeyi düzenle.
Her oyuncuya `foto: "https://..."` ekleyince kart o görseli kullanır,
boşsa "FOTO" yer tutucu gösterir.

## Sıradaki adım (backend)
Şu an iki kişi aynı tarayıcıda oynuyor. Uzaktan kod paylaşımlı oynamak için
Railway'de küçük bir Express backend ekleyeceğiz (kod üret / state sakla / sıra yönet).
