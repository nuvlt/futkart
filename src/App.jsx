import { useState } from "react";
import PlayerCard from "./components/PlayerCard.jsx";
import { dealGame, playStatRound, playOddEvenRound } from "./game.js";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState("stat");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [game, setGame] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [scores, setScores] = useState([0, 0]); // tek/çift: doğru tahmin sayısı

  function start() {
    setGame(dealGame(p1, p2));
    setScores([0, 0]);
    setReveal(false);
    setScreen("game");
  }
  function newGame() {
    setScreen("home");
    setGame(null);
  }

  if (screen === "home") {
    return (
      <div className="app">
        <div className="home">
          <div className="brand">
            <span className="brand-mark">★</span>
            <h1>KART KAPIŞMASI</h1>
            <p className="tag">Sahanın yıldızlarını kapıştır</p>
          </div>

          <div className="modes">
            <button className={"mode-btn" + (mode === "stat" ? " on" : "")} onClick={() => setMode("stat")}>
              <span className="mode-ic">⚔️</span>
              <b>İstatistik Yarıştırma</b>
              <span className="mode-d">Stat seç, yüksek olan rakibin kartını alır</span>
            </button>
            <button className={"mode-btn" + (mode === "oddeven" ? " on" : "")} onClick={() => setMode("oddeven")}>
              <span className="mode-ic">🎲</span>
              <b>Tek mi Çift mi?</b>
              <span className="mode-d">Reytingin son hanesini tahmin et</span>
            </button>
          </div>

          <div className="names">
            <input placeholder="1. oyuncu" value={p1} onChange={(e) => setP1(e.target.value)} maxLength={14} />
            <span className="vs-mini">VS</span>
            <input placeholder="2. oyuncu" value={p2} onChange={(e) => setP2(e.target.value)} maxLength={14} />
          </div>

          <button className="start" onClick={start}>Başlat</button>
          <p className="foot">Aynı cihazda sırayla • üyelik yok</p>
        </div>
      </div>
    );
  }

  const a = game.players[0];
  const b = game.players[1];
  const total = a.deck.length + b.deck.length + game.pot.length;

  if (game.winner !== null) {
    const w = game.players[game.winner];
    return (
      <div className="app">
        <div className="home win">
          <div className="trophy">🏆</div>
          <h1>{w.name}</h1>
          <p className="tag">kazandı!</p>
          {mode === "oddeven" && (
            <p className="win-score">Doğru tahmin: {scores[0]} – {scores[1]}</p>
          )}
          <button className="start" onClick={newGame}>Yeni Oyun</button>
        </div>
      </div>
    );
  }

  // ---- SKORBORD (her iki modda) ----
  const Scoreboard = () => (
    <div className="board">
      <div className={"team" + (game.turn === 0 ? " active" : "")}>
        <span className="team-name">{a.name}</span>
        <span className="team-stat">
          <b>{a.deck.length}</b> kart
          {mode === "oddeven" && <em>{scores[0]} ✓</em>}
        </span>
      </div>
      <div className="board-mid">
        <span className="board-vs">VS</span>
        {game.pot.length > 0 && <span className="pot-badge">+{game.pot.length} ortada</span>}
      </div>
      <div className={"team right" + (game.turn === 1 ? " active" : "")}>
        <span className="team-name">{b.name}</span>
        <span className="team-stat">
          <b>{b.deck.length}</b> kart
          {mode === "oddeven" && <em>{scores[1]} ✓</em>}
        </span>
      </div>
    </div>
  );

  // ---- İSTATİSTİK YARIŞTIRMA ----
  if (mode === "stat") {
    const last = game.log[0];
    return (
      <div className="app">
        <div className="game">
          <div className="game-top">
            <button className="exit" onClick={newGame}>‹ Çıkış</button>
            <span className="progress">{total} kart oyunda</span>
          </div>

          <Scoreboard />

          <p className="prompt">
            Sıra <b>{game.players[game.turn].name}</b>'da — bir istatistik seç
          </p>

          <div className="arena">
            <div className="slot">
              <PlayerCard
                player={a.deck[0]}
                highlightStat={last?.stat}
                onPick={game.turn === 0 ? (k) => setGame(playStatRound(game, k)) : undefined}
                dim={game.turn !== 0}
              />
            </div>
            <div className="arena-vs">VS</div>
            <div className="slot">
              <PlayerCard
                player={b.deck[0]}
                highlightStat={last?.stat}
                onPick={game.turn === 1 ? (k) => setGame(playStatRound(game, k)) : undefined}
                dim={game.turn !== 1}
              />
            </div>
          </div>

          {last && (
            <div className={"verdict " + last.result}>
              {last.msg}
            </div>
          )}
        </div>
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
    const card = opener.deck[0];
    const actual = card.ovr % 10 % 2 === 0 ? "even" : "odd";
    const correct = g === actual;
    setTimeout(() => {
      if (correct) {
        setScores((s) => {
          const n = [...s];
          n[guesserIdx]++;
          return n;
        });
      }
      setGame(playOddEvenRound(game, g));
      setReveal(false);
    }, 1500);
  }

  const last = game.log[0];
  return (
    <div className="app">
      <div className="game">
        <div className="game-top">
          <button className="exit" onClick={newGame}>‹ Çıkış</button>
          <span className="progress">{a.deck.length + b.deck.length} kart oyunda</span>
        </div>

        <Scoreboard />

        <p className="prompt">
          <b>{opener.name}</b> kart açıyor — <b>{guesser.name}</b> tahmin etsin
        </p>

        <div className="arena single">
          <div className="slot">
            <PlayerCard player={opener.deck[0]} faceDown={!reveal} />
          </div>
        </div>

        {!reveal ? (
          <div className="guess-btns">
            <button className="guess odd" onClick={() => guess("odd")}>
              <b>TEK</b><span>1 · 3 · 5 · 7 · 9</span>
            </button>
            <button className="guess even" onClick={() => guess("even")}>
              <b>ÇİFT</b><span>0 · 2 · 4 · 6 · 8</span>
            </button>
          </div>
        ) : (
          <p className="revealing">Açılıyor…</p>
        )}

        {last && (
          <div className={"verdict " + (last.winner === guesserIdx ? "p0" : "tie")}>
            {last.msg}
          </div>
        )}
      </div>
    </div>
  );
}
