import { useEffect, useState } from "react";

// Oyuncu fotosunu çalışma anında Wikipedia'dan çeker.
// Öncelik: players.js'teki manuel `foto` > Wikipedia ana görseli > avatar (null).
// Sonuçları sessionStorage'da cache'ler (aynı oturum içinde tekrar sorgu yok).

const memCache = {};

async function fetchWikiThumb(query) {
  // 1) Başlığı bul (arama)
  const sUrl =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*" +
    "&list=search&srsearch=" + encodeURIComponent(query + " footballer") +
    "&srlimit=1";
  const sRes = await fetch(sUrl);
  const sJson = await sRes.json();
  const hit = sJson?.query?.search?.[0];
  if (!hit) return null;

  // 2) O başlığın sayfa görselini al
  const pUrl =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*" +
    "&prop=pageimages&piprop=thumbnail&pithumbsize=500&titles=" +
    encodeURIComponent(hit.title);
  const pRes = await fetch(pUrl);
  const pJson = await pRes.json();
  const pages = pJson?.query?.pages || {};
  const first = Object.values(pages)[0];
  return first?.thumbnail?.source || null;
}

export function usePlayerPhoto(player) {
  // manuel foto varsa direkt onu kullan
  const [src, setSrc] = useState(player?.foto || null);

  useEffect(() => {
    if (!player) return;
    if (player.foto) { setSrc(player.foto); return; }

    const key = "wikiphoto:" + player.name;
    // bellek cache
    if (memCache[key] !== undefined) { setSrc(memCache[key]); return; }
    // oturum cache
    try {
      const cached = sessionStorage.getItem(key);
      if (cached !== null) {
        memCache[key] = cached || null;
        setSrc(cached || null);
        return;
      }
    } catch {}

    let alive = true;
    // arama terimi: TAM_ADI varsa onu, yoksa kart adını kullan
    const q = player.fullName || player.name;
    fetchWikiThumb(q)
      .then((url) => {
        if (!alive) return;
        memCache[key] = url;
        try { sessionStorage.setItem(key, url || ""); } catch {}
        setSrc(url);
      })
      .catch(() => { if (alive) setSrc(null); });

    return () => { alive = false; };
  }, [player?.name, player?.foto]);

  return src;
}
