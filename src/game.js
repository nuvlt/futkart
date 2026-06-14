import { PLAYERS } from "./data/players.js";

export const STAT_KEYS = ["pac", "sho", "pas", "dri", "def", "phy"];
export const STAT_LABELS = {
  pac: "PAC", sho: "SHO", pas: "PAS", dri: "DRI", def: "DEF", phy: "PHY",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Yeni oyun: kartları karıp iki desteye böl
export function dealGame(p1name, p2name) {
  const deck = shuffle(PLAYERS);
  const half = Math.floor(deck.length / 2);
  return {
    players: [
      { name: p1name || "Oyuncu 1", deck: deck.slice(0, half) },
      { name: p2name || "Oyuncu 2", deck: deck.slice(half, half * 2) },
    ],
    turn: 0,          // sıradaki oyuncu indeksi (stat seçecek olan)
    pot: [],          // beraberlikte biriken kartlar
    log: [],          // son tur sonucu
    winner: null,
  };
}

// İstatistik Yarıştırma: turn oyuncusu bir stat seçer
export function playStatRound(game, statKey) {
  const g = structuredClone(game);
  const a = g.players[0];
  const b = g.players[1];
  if (!a.deck.length || !b.deck.length) return g;

  const cardA = a.deck[0];
  const cardB = b.deck[0];
  const valA = cardA[statKey];
  const valB = cardB[statKey];

  // beraberlikte kartlar pota gider, sonraki tur kazananı alır
  if (valA === valB) {
    a.deck.shift();
    b.deck.shift();
    g.pot.push(cardA, cardB);
    g.log = [{ stat: statKey, valA, valB, result: "tie",
      msg: `Beraberlik (${valA}-${valB}). Kartlar ortada, sonraki turun kazananına.` }];
  } else {
    const aWins = valA > valB;
    a.deck.shift();
    b.deck.shift();
    const taken = [cardA, cardB, ...g.pot];
    g.pot = [];
    if (aWins) {
      a.deck.push(...taken);
      g.turn = 0;
    } else {
      b.deck.push(...taken);
      g.turn = 1;
    }
    g.log = [{ stat: statKey, valA, valB, result: aWins ? "p0" : "p1",
      msg: `${(aWins ? a : b).name} kazandı (${valA}-${valB}) → ${taken.length} kart aldı.` }];
  }

  if (!a.deck.length) g.winner = 1;
  else if (!b.deck.length) g.winner = 0;
  return g;
}

// Tek/Çift: turn oyuncusu kendi üst kartını açar, rakip tahmin etti
// guess: "odd" | "even" — rakibin (diğer oyuncunun) tahmini
// Açılan kartın ovr son hanesine bakılır.
export function playOddEvenRound(game, guess) {
  const g = structuredClone(game);
  const opener = g.players[g.turn];        // kartı açan
  const guesserIdx = g.turn === 0 ? 1 : 0; // tahmin eden rakip
  const guesser = g.players[guesserIdx];
  if (!opener.deck.length) return g;

  const card = opener.deck[0];
  const lastDigit = card.ovr % 10;
  const actual = lastDigit % 2 === 0 ? "even" : "odd";
  const correct = guess === actual;

  opener.deck.shift();
  if (correct) {
    // tahmin tutarsa rakip kartı alır, sıra rakibe geçer
    guesser.deck.push(card);
    g.turn = guesserIdx;
    g.log = [{ result: "guess", correct: true, digit: lastDigit, actual,
      msg: `${guesser.name} bildi! ${card.name} (${card.ovr}, ${actual === "odd" ? "tek" : "çift"}) → kartı aldı.` }];
  } else {
    // tutmazsa kartı açan saklar (destesinin altına), sıra açanda kalır
    opener.deck.push(card);
    g.log = [{ result: "guess", correct: false, digit: lastDigit, actual,
      msg: `${guesser.name} bilemedi. ${card.name} (${card.ovr}, ${actual === "odd" ? "tek" : "çift"}) → kart sahibinde kaldı.` }];
  }

  if (!opener.deck.length) g.winner = guesserIdx;
  return g;
}
