import { useState } from "react";
import PlayerCard from "./components/PlayerCard.jsx";
import {
  dealGame, playStatRound, playOddEvenRound, STAT_LABELS,
} from "./game.js";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home"); // home | game
  const [mode, setMode] = useState("stat");      // stat | oddeven
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [game, setGame] = useState(null);
  const [reveal, setReveal] = useState(false);   // tek/çift: kart açıldı mı

  function start() {
    setGame(dealGame(p1, p2));
    setReveal(false);
    setScreen("game");
  }

  function newGame() {
    setScreen("home");
    setGame(null);
  }

  if (screen === "home") {
    return (
      <div className="wrap home">
        <h1>⚽ Futbolcu Kart Kapışması</h1>
        <p className="sub">Çocukluğun kart oyunu, sırayla — aynı cihazda karşılıklı.</p>

        <div className="modes">
          <button
            className={"mode-btn" + (mode === "stat" ? " on" : "")}
            onClick={() => setMode("stat")}
          >
            <b>İstatistik Yarıştırma</b>
            <span>Stat seç, yüksek olan kartı alır</span>
          </button>
          <button
            className={"mode-btn" + (mode === "oddeven" ? " on" : "")}
            onClick={() => setMode("oddeven")}
          >
            <b>Tek mi Çift mi?</b>
            <span>Reytingin son hanesini tahmin et</span>
          </button>
        </div>

        <div className="names">
          <input placeholder="1. oyuncu adı" value={p1} onChange={(e) => setP1(e.target.value)} />
          <input placeholder="2. oyuncu adı" value={p2} onChange={(e) => setP2(e.target.value)} />
        </div>

        <button className="start" onClick={start}>Oyunu Başlat</button>
      </div>
    );
  }

  const a = game.players[0];
  const b = game.players[1];
  const turnName = game.players[game.turn].name;

  // ---- KAZANAN EKRANI ----
  if (game.winner !== null) {
    return (
      <div className="wrap home">
        <h1>🏆 {game.players[game.winner].name} kazandı!</h1>
        <p className="sub">Bütün kartları topladı.</p>
        <button className="start" onClick={newGame}>Yeni Oyun</button>
      </div>
    );
  }

  // ---- İSTATİSTİK YARIŞTIRMA ----
  if (mode === "stat") {
    return (
      <div className="wrap">
        <div className="topbar">
          <span>{a.name}: {a.deck.length} kart</span>
          <button className="ghost" onClick={newGame}>Çıkış</button>
          <span>{b.name}: {b.deck.length} kart</span>
        </div>

        <p className="turn">Sıra: <b>{turnName}</b> — bir istatistik seç</p>

        <div className="table">
          <div className="side">
            <small>{a.name}</small>
            <PlayerCard
              player={a.deck[0]}
              highlightStat={game.log[0]?.stat}
              onPick={game.turn === 0 ? (k) => setGame(playStatRound(game, k)) : undefined}
            />
          </div>

          <div className="vs">VS</div>

          <div className="side">
            <small>{b.name}</small>
            <PlayerCard
              player={b.deck[0]}
              highlightStat={game.log[0]?.stat}
              onPick={game.turn === 1 ? (k) => setGame(playStatRound(game, k)) : undefined}
            />
          </div>
        </div>

        {game.pot.length > 0 && (
          <p className="pot">Ortada bekleyen: {game.pot.length} kart</p>
        )}
        {game.log[0] && <p className="result">{game.log[0].msg}</p>}
        <p className="hint">
          {game.players[game.turn].name}'in kartındaki bir stata tıkla.
        </p>
      </div>
    );
  }

  // ---- TEK Mİ ÇİFT Mİ ----
  const openerIdx = game.turn;
  const opener = game.players[openerIdx];
  const guesserIdx = openerIdx === 0 ? 1 : 0;
  const guesser = game.players[guesserIdx];

  function guess(g) {
    setReveal(true);
    setTimeout(() => {
      setGame(playOddEvenRound(game, g));
      setReveal(false);
    }, 1400);
  }

  return (
    <div className="wrap">
      <div className="topbar">
        <span>{a.name}: {a.deck.length} kart</span>
        <button className="ghost" onClick={newGame}>Çıkış</button>
        <span>{b.name}: {b.deck.length} kart</span>
      </div>

      <p className="turn">
        <b>{opener.name}</b> kartı açıyor — <b>{guesser.name}</b> tahmin etsin:
        reytingin son hanesi tek mi, çift mi?
      </p>

      <div className="table single">
        <div className="side">
          <small>{opener.name} (üst kart)</small>
          <PlayerCard player={opener.deck[0]} faceDown={!reveal} />
        </div>
      </div>

      {!reveal && (
        <div className="guess-btns">
          <button onClick={() => guess("odd")}>TEK</button>
          <button onClick={() => guess("even")}>ÇİFT</button>
        </div>
      )}

      {game.log[0] && <p className="result">{game.log[0].msg}</p>}
    </div>
  );
}
