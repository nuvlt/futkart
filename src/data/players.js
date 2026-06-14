// Futbolcu kart verisi.
//
// Fotoğraflar OTOMATİK gelir: oyun çalışırken her oyuncunun adıyla
// Wikipedia'ya sorgu atılıp ana görseli çekilir (usePlayerPhoto.js).
// Görsel bulunamazsa kart temsili avatara (baş harf + bayrak) düşer.
// Hiçbir şey elle URL girmene gerek yok.
//
// fullName: Wikipedia aramasında doğru oyuncuyu bulmak için kullanılır.
//   Yanlış oyuncu geliyorsa fullName'i düzelt (örn. "Rodri footballer").
//
// Statlar: ünlü futbolcuların yaklaşık FC/FIFA değerleri (referans).

export const PLAYERS = [
  { id: 1,  name: "MESSI", fullName: "Lionel Messi",      pos: "RW",  flag: "🇦🇷", ovr: 98,            pac: 81, sho: 89, pas: 90, dri: 94, def: 34, phy: 64 },
  { id: 2,  name: "RONALDO", fullName: "Cristiano Ronaldo",    pos: "ST",  flag: "🇵🇹", ovr: 95,   pac: 87, sho: 93, pas: 82, dri: 88, def: 35, phy: 78 },
  { id: 3,  name: "MBAPPÉ", fullName: "Kylian Mbappé",     pos: "ST",  flag: "🇫🇷", ovr: 91,              pac: 97, sho: 90, pas: 80, dri: 92, def: 36, phy: 78 },
  { id: 4,  name: "HAALAND", fullName: "Erling Haaland",    pos: "ST",  flag: "🇳🇴", ovr: 91,                                       pac: 89, sho: 93, pas: 66, dri: 80, def: 45, phy: 88 },
  { id: 5,  name: "DE BRUYNE", fullName: "Kevin De Bruyne",  pos: "CM",  flag: "🇧🇪", ovr: 91,                                       pac: 72, sho: 88, pas: 94, dri: 87, def: 64, phy: 78 },
  { id: 6,  name: "BELLINGHAM", fullName: "Jude Bellingham", pos: "CM",  flag: "🏴",   ovr: 90,                                       pac: 80, sho: 84, pas: 86, dri: 87, def: 78, phy: 84 },
  { id: 7,  name: "VINÍCIUS", fullName: "Vinicius Junior",   pos: "LW",  flag: "🇧🇷", ovr: 90,                                       pac: 95, sho: 83, pas: 78, dri: 92, def: 29, phy: 68 },
  { id: 8,  name: "SALAH", fullName: "Mohamed Salah",      pos: "RW",  flag: "🇪🇬", ovr: 89,                                       pac: 90, sho: 87, pas: 81, dri: 88, def: 45, phy: 75 },
  { id: 9,  name: "KANE", fullName: "Harry Kane",       pos: "ST",  flag: "🏴",   ovr: 90,                                       pac: 68, sho: 93, pas: 84, dri: 83, def: 47, phy: 83 },
  { id: 10, name: "MODRIĆ", fullName: "Luka Modric",     pos: "CM",  flag: "🇭🇷", ovr: 87,                                       pac: 72, sho: 78, pas: 89, dri: 89, def: 72, phy: 65 },
  { id: 11, name: "NEYMAR", fullName: "Neymar",     pos: "LW",  flag: "🇧🇷", ovr: 88,                                       pac: 85, sho: 83, pas: 85, dri: 92, def: 36, phy: 60 },
  { id: 12, name: "BENZEMA", fullName: "Karim Benzema",    pos: "ST",  flag: "🇫🇷", ovr: 89,                                       pac: 78, sho: 89, pas: 83, dri: 87, def: 40, phy: 78 },
  { id: 13, name: "LEWANDOWSKI", fullName: "Robert Lewandowski",pos: "ST",  flag: "🇵🇱", ovr: 90,                                       pac: 77, sho: 91, pas: 80, dri: 85, def: 44, phy: 82 },
  { id: 14, name: "RODRI", fullName: "Rodri footballer",      pos: "CDM", flag: "🇪🇸", ovr: 90,                                       pac: 64, sho: 75, pas: 85, dri: 80, def: 87, phy: 85 },
  { id: 15, name: "SON", fullName: "Son Heung-min",        pos: "LW",  flag: "🇰🇷", ovr: 87,                                       pac: 88, sho: 87, pas: 81, dri: 86, def: 43, phy: 69 },
  { id: 16, name: "VAN DIJK", fullName: "Virgil van Dijk",   pos: "CB",  flag: "🇳🇱", ovr: 89,                                       pac: 80, sho: 60, pas: 71, dri: 72, def: 90, phy: 86 },
  { id: 17, name: "COURTOIS", fullName: "Thibaut Courtois",   pos: "GK",  flag: "🇧🇪", ovr: 90,                                       pac: 85, sho: 89, pas: 76, dri: 88, def: 52, phy: 90 },
  { id: 18, name: "KIMMICH", fullName: "Joshua Kimmich",    pos: "CDM", flag: "🇩🇪", ovr: 88,                                       pac: 73, sho: 76, pas: 88, dri: 82, def: 82, phy: 78 },
  { id: 19, name: "FODEN", fullName: "Phil Foden",      pos: "CAM", flag: "🏴",   ovr: 88,                                       pac: 82, sho: 84, pas: 85, dri: 89, def: 60, phy: 67 },
  { id: 20, name: "GRIEZMANN", fullName: "Antoine Griezmann",  pos: "CF",  flag: "🇫🇷", ovr: 88,                                       pac: 80, sho: 85, pas: 86, dri: 87, def: 52, phy: 71 },
  { id: 21, name: "MARTÍNEZ", fullName: "Emiliano Martinez",   pos: "GK",  flag: "🇦🇷", ovr: 88,                                       pac: 82, sho: 86, pas: 79, dri: 87, def: 48, phy: 88 },
  { id: 22, name: "SAKA", fullName: "Bukayo Saka",       pos: "RM",  flag: "🏴",   ovr: 87,                                       pac: 84, sho: 82, pas: 82, dri: 87, def: 56, phy: 72 },
  { id: 23, name: "ØDEGAARD", fullName: "Martin Odegaard",   pos: "CAM", flag: "🇳🇴", ovr: 88,                                       pac: 78, sho: 82, pas: 87, dri: 89, def: 60, phy: 65 },
  { id: 24, name: "OSIMHEN", fullName: "Victor Osimhen",    pos: "ST",  flag: "🇳🇬", ovr: 88,                                       pac: 90, sho: 87, pas: 70, dri: 81, def: 38, phy: 84 },
  { id: 25, name: "WIRTZ", fullName: "Florian Wirtz",      pos: "CAM", flag: "🇩🇪", ovr: 87,                                       pac: 81, sho: 80, pas: 86, dri: 89, def: 55, phy: 66 },
  { id: 26, name: "VALVERDE", fullName: "Federico Valverde",   pos: "CM",  flag: "🇺🇾", ovr: 88,                                       pac: 85, sho: 82, pas: 84, dri: 84, def: 80, phy: 85 },
  { id: 27, name: "DI MARÍA", fullName: "Angel Di Maria",   pos: "RW",  flag: "🇦🇷", ovr: 84,                                       pac: 80, sho: 82, pas: 86, dri: 87, def: 42, phy: 63 },
  { id: 28, name: "KROOS", fullName: "Toni Kroos",      pos: "CM",  flag: "🇩🇪", ovr: 88,                                       pac: 54, sho: 80, pas: 92, dri: 84, def: 72, phy: 70 },
  { id: 29, name: "ALABA", fullName: "David Alaba",      pos: "CB",  flag: "🇦🇹", ovr: 86,                                       pac: 74, sho: 68, pas: 82, dri: 80, def: 85, phy: 78 },
  { id: 30, name: "DYBALA", fullName: "Paulo Dybala",     pos: "CF",  flag: "🇦🇷", ovr: 86,                                       pac: 80, sho: 84, pas: 84, dri: 89, def: 38, phy: 62 },
];
