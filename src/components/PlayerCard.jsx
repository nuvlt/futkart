import "./PlayerCard.css";

// Kart bileşeni. props:
//   player: oyuncu objesi (players.js'ten)
//   faceDown: arka yüz mü? (true ise tek/çift modunda gizli)
//   highlightStat: vurgulanacak stat anahtarı ("pac","sho"...) veya null
//   onPick: bir stata tıklanınca çağrılır (stat anahtarı) — tıklanabilir yapar
//   small: küçük boy
export default function PlayerCard({ player, faceDown, highlightStat, onPick, small, dim }) {
  if (!player) return <div className={"fcard empty" + (small ? " small" : "")} />;

  if (faceDown) {
    return (
      <div className={"fcard back" + (small ? " small" : "")}>
        <div className="fc-back-inner">
          <span className="fc-back-mark">?</span>
        </div>
      </div>
    );
  }

  const rows = [
    ["pac", "PAC", "dri", "DRI"],
    ["sho", "SHO", "def", "DEF"],
    ["pas", "PAS", "phy", "PHY"],
  ];

  const statCell = (key, label) => {
    const hot = highlightStat === key;
    const clickable = !!onPick;
    return (
      <div
        className={
          "fc-stat" +
          (hot ? " hot" : "") +
          (clickable ? " clickable" : "")
        }
        onClick={clickable ? () => onPick(key) : undefined}
      >
        <b>{player[key]}</b> {label}
      </div>
    );
  };

  return (
    <div className={"fcard" + (small ? " small" : "") + (dim ? " dim" : "")}>
      <div className="fc-inner">
        <div className="fc-top">
          <div className="fc-rt">
            <span className="fc-ovr">{player.ovr}</span>
            <span className="fc-pos">{player.pos}</span>
            <span className="fc-flag">{player.flag}</span>
          </div>
          <div className="fc-photo">
            {player.foto ? (
              <img src={player.foto} alt={player.name} />
            ) : (
              <span className="fc-photo-fb">FOTO</span>
            )}
          </div>
        </div>
        <div className="fc-name">{player.name}</div>
        <div className="fc-line" />
        <div className="fc-stats">
          {rows.map((r, i) => (
            <div className="fc-row" key={i}>
              {statCell(r[0], r[1])}
              {statCell(r[2], r[3])}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
