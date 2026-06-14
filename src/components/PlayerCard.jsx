import { useState } from "react";
import "./PlayerCard.css";

// Oyuncuya özel temsili avatar: baş harf + bayrak, pozisyona göre renk.
function Avatar({ player }) {
  const initials = player.name
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="fc-avatar">
      <span className="fc-av-initials">{initials}</span>
      <span className="fc-av-flag">{player.flag}</span>
    </div>
  );
}

// props:
//   player, faceDown, highlightStat, onPick, small, dim
export default function PlayerCard({ player, faceDown, highlightStat, onPick, small, dim }) {
  const [imgFailed, setImgFailed] = useState(false);

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
        className={"fc-stat" + (hot ? " hot" : "") + (clickable ? " clickable" : "")}
        onClick={clickable ? () => onPick(key) : undefined}
      >
        <b>{player[key]}</b> {label}
      </div>
    );
  };

  const showPhoto = player.foto && !imgFailed;

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
            {showPhoto ? (
              <img
                src={player.foto}
                alt={player.name}
                onError={() => setImgFailed(true)}
                loading="lazy"
              />
            ) : (
              <Avatar player={player} />
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
