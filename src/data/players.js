// Futbolcu kart verisi.
// foto: Wikimedia Commons "Special:FilePath" yönlendirmesi kullanır.
//   Kalıp: https://commons.wikimedia.org/wiki/Special:FilePath/<DOSYA_ADI>?width=500
//   Bu endpoint dosya adından doğru CDN URL'sine otomatik yönlendirir (hash gerekmez).
//   Tarayıcıda sorunsuz açılır. Bir görsel açılmazsa kart "FOTO" yer tutucu gösterir.
//   Değiştirmek istersen: Commons'ta dosyayı bul, adını buraya yaz.
// Statlar: ünlü futbolcuların yaklaşık FC/FIFA değerleri (referans).

const W = (file, w = 500) =>
  "https://commons.wikimedia.org/wiki/Special:FilePath/" +
  encodeURIComponent(file) + "?width=" + w;

export const PLAYERS = [
  { id: 1,  name: "MESSI",      pos: "RW",  flag: "🇦🇷", ovr: 98, foto: W("Lionel Messi WC2022.jpg"),                  pac: 81, sho: 89, pas: 90, dri: 94, def: 34, phy: 64 },
  { id: 2,  name: "RONALDO",    pos: "ST",  flag: "🇵🇹", ovr: 95, foto: W("Cristiano Ronaldo WC2022 - 01.jpg"),         pac: 87, sho: 93, pas: 82, dri: 88, def: 35, phy: 78 },
  { id: 3,  name: "MBAPPÉ",     pos: "ST",  flag: "🇫🇷", ovr: 91, foto: W("Kylian Mbappé 2019.jpg"),                    pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78 },
  { id: 4,  name: "HAALAND",    pos: "ST",  flag: "🇳🇴", ovr: 91, foto: W("Erling Haaland 2023 (cropped).jpg"),         pac: 89, sho: 93, pas: 66, dri: 80, def: 45, phy: 88 },
  { id: 5,  name: "DE BRUYNE",  pos: "CM",  flag: "🇧🇪", ovr: 91, foto: W("Kevin De Bruyne 2018.jpg"),                  pac: 72, sho: 88, pas: 94, dri: 87, def: 64, phy: 78 },
  { id: 6,  name: "BELLINGHAM", pos: "CM",  flag: "🏴",   ovr: 90, foto: W("Jude Bellingham 2023.jpg"),                  pac: 80, sho: 84, pas: 86, dri: 87, def: 78, phy: 84 },
  { id: 7,  name: "VINÍCIUS",   pos: "LW",  flag: "🇧🇷", ovr: 90, foto: W("Vinícius Júnior 2023.jpg"),                  pac: 95, sho: 83, pas: 78, dri: 92, def: 29, phy: 68 },
  { id: 8,  name: "SALAH",      pos: "RW",  flag: "🇪🇬", ovr: 89, foto: W("Mohamed Salah 2018.jpg"),                    pac: 90, sho: 87, pas: 81, dri: 88, def: 45, phy: 75 },
  { id: 9,  name: "KANE",       pos: "ST",  flag: "🏴",   ovr: 90, foto: W("Harry Kane 2018 (cropped).jpg"),             pac: 68, sho: 93, pas: 84, dri: 83, def: 47, phy: 83 },
  { id: 10, name: "MODRIĆ",     pos: "CM",  flag: "🇭🇷", ovr: 87, foto: W("Luka Modrić 2018.jpg"),                      pac: 72, sho: 78, pas: 89, dri: 89, def: 72, phy: 65 },
  { id: 11, name: "NEYMAR",     pos: "LW",  flag: "🇧🇷", ovr: 88, foto: W("Bóris Vega - Neymar (cropped).jpg"),         pac: 85, sho: 83, pas: 85, dri: 92, def: 36, phy: 60 },
  { id: 12, name: "BENZEMA",    pos: "ST",  flag: "🇫🇷", ovr: 89, foto: W("Karim Benzema 2018.jpg"),                    pac: 78, sho: 89, pas: 83, dri: 87, def: 40, phy: 78 },
  { id: 13, name: "LEWANDOWSKI",pos: "ST",  flag: "🇵🇱", ovr: 90, foto: W("Robert Lewandowski 2018.jpg"),               pac: 77, sho: 91, pas: 80, dri: 85, def: 44, phy: 82 },
  { id: 14, name: "RODRI",      pos: "CDM", flag: "🇪🇸", ovr: 90, foto: W("Rodrigo Hernández 2018.jpg"),                pac: 64, sho: 75, pas: 85, dri: 80, def: 87, phy: 85 },
  { id: 15, name: "SON",        pos: "LW",  flag: "🇰🇷", ovr: 87, foto: W("Son Heung-min 2018 (cropped).jpg"),          pac: 88, sho: 87, pas: 81, dri: 86, def: 43, phy: 69 },
  { id: 16, name: "VAN DIJK",   pos: "CB",  flag: "🇳🇱", ovr: 89, foto: W("Virgil van Dijk 2018.jpg"),                  pac: 80, sho: 60, pas: 71, dri: 72, def: 90, phy: 86 },
  { id: 17, name: "COURTOIS",   pos: "GK",  flag: "🇧🇪", ovr: 90, foto: W("Thibaut Courtois 2018.jpg"),                 pac: 85, sho: 89, pas: 76, dri: 88, def: 52, phy: 90 },
  { id: 18, name: "KIMMICH",    pos: "CDM", flag: "🇩🇪", ovr: 88, foto: W("Joshua Kimmich 2018.jpg"),                   pac: 73, sho: 76, pas: 88, dri: 82, def: 82, phy: 78 },
  { id: 19, name: "FODEN",      pos: "CAM", flag: "🏴",   ovr: 88, foto: W("Phil Foden 2023.jpg"),                       pac: 82, sho: 84, pas: 85, dri: 89, def: 60, phy: 67 },
  { id: 20, name: "GRIEZMANN",  pos: "CF",  flag: "🇫🇷", ovr: 88, foto: W("Antoine Griezmann 2018.jpg"),                pac: 80, sho: 85, pas: 86, dri: 87, def: 52, phy: 71 },
  { id: 21, name: "MARTÍNEZ",   pos: "GK",  flag: "🇦🇷", ovr: 88, foto: W("Emiliano Martínez 2022.jpg"),                pac: 82, sho: 86, pas: 79, dri: 87, def: 48, phy: 88 },
  { id: 22, name: "SAKA",       pos: "RM",  flag: "🏴",   ovr: 87, foto: W("Bukayo Saka 2023.jpg"),                      pac: 84, sho: 82, pas: 82, dri: 87, def: 56, phy: 72 },
  { id: 23, name: "ØDEGAARD",   pos: "CAM", flag: "🇳🇴", ovr: 88, foto: W("Martin Ødegaard 2023.jpg"),                  pac: 78, sho: 82, pas: 87, dri: 89, def: 60, phy: 65 },
  { id: 24, name: "OSIMHEN",    pos: "ST",  flag: "🇳🇬", ovr: 88, foto: W("Victor Osimhen 2023.jpg"),                   pac: 90, sho: 87, pas: 70, dri: 81, def: 38, phy: 84 },
  { id: 25, name: "WIRTZ",      pos: "CAM", flag: "🇩🇪", ovr: 87, foto: W("Florian Wirtz 2023.jpg"),                    pac: 81, sho: 80, pas: 86, dri: 89, def: 55, phy: 66 },
  { id: 26, name: "VALVERDE",   pos: "CM",  flag: "🇺🇾", ovr: 88, foto: W("Federico Valverde 2022.jpg"),                pac: 85, sho: 82, pas: 84, dri: 84, def: 80, phy: 85 },
  { id: 27, name: "DI MARÍA",   pos: "RW",  flag: "🇦🇷", ovr: 84, foto: W("Ángel Di María 2022.jpg"),                   pac: 80, sho: 82, pas: 86, dri: 87, def: 42, phy: 63 },
  { id: 28, name: "KROOS",      pos: "CM",  flag: "🇩🇪", ovr: 88, foto: W("Toni Kroos 2018.jpg"),                       pac: 54, sho: 80, pas: 92, dri: 84, def: 72, phy: 70 },
  { id: 29, name: "ALABA",      pos: "CB",  flag: "🇦🇹", ovr: 86, foto: W("David Alaba 2018.jpg"),                      pac: 74, sho: 68, pas: 82, dri: 80, def: 85, phy: 78 },
  { id: 30, name: "DYBALA",     pos: "CF",  flag: "🇦🇷", ovr: 86, foto: W("Paulo Dybala 2018.jpg"),                     pac: 80, sho: 84, pas: 84, dri: 89, def: 38, phy: 62 },
];
