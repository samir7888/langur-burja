"use client";
import { useEffect, useRef, useState } from "react";
import { sfx, unlock, setMuted } from "./sound";

const SVG = {
  flag: (
    <path
      d="M6 3v18M6 4h13l-3.5 4L19 12H6"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  crown: <path d="M3 18 2 7l6 4 4-7 4 7 6-4-1 11z" fill="currentColor" />,
};
const S = [
  { n: "झण्डा", en: "Jhanda · Flag", c: "#c92a2a", svg: "flag" },
  { n: "बुर्जा", en: "Burja · Crown", c: "#1d1511", svg: "crown" },
  { n: "पान", en: "Paan · Heart", c: "#c92a2a", t: "♥" },
  { n: "हुकुम", en: "Hukum · Spade", c: "#1d1511", t: "♠" },
  { n: "इँटा", en: "Itta · Diamond", c: "#c92a2a", t: "♦" },
  { n: "चिडी", en: "Chidi · Club", c: "#1d1511", t: "♣" },
];
const F = [
  [0, 0],
  [0, 180],
  [0, -90],
  [0, 90],
  [-90, 0],
  [90, 0],
];
const Sym = ({ i, size = 40 }) => (
  <span
    style={{
      color: S[i].c,
      fontSize: size,
      lineHeight: 1,
      display: "grid",
      placeItems: "center",
    }}
  >
    {S[i].svg ? (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
        {SVG[S[i].svg]}
      </svg>
    ) : (
      S[i].t
    )}
  </span>
);
const api = (b) =>
  fetch("/api/room", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(b),
  }).then((r) => r.json());

function Count({ v, delay = 0 }) {
  // number that rolls up/down smoothly
  const [d, setD] = useState(v),
    [fl, setFl] = useState(""),
    cur = useRef(v);
  useEffect(() => {
    const from = cur.current;
    if (from === v) return;
    let raf, t2;
    const t1 = setTimeout(() => {
      setFl(v > from ? "up" : "dn");
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 1000);
        cur.current = Math.round(from + (v - from) * k);
        setD(cur.current);
        if (k < 1) raf = requestAnimationFrame(step);
        else t2 = setTimeout(() => setFl(""), 400);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  }, [v]);
  return <span className={"cnt " + fl}>{d}</span>;
}

// Dice hidden under the cup -> cup shakes (rattle) -> cup lifts, dice tumble out and settle on the result.
function Tray({ phase, dice, round }) {
  const [stage, setStage] = useState(phase === "betting" ? "idle" : "done"),
    [rots, setRots] = useState(null),
    played = useRef(false);
  useEffect(() => {
    if (phase === "betting") {
      played.current = false;
      setStage("idle");
      setRots(null);
      return;
    }
    if (!dice) return;
    const spin = () => 360 * (1 + Math.floor(Math.random() * 3));
    if (phase === "rolling") {
      played.current = true;
      setStage("shake");
      sfx.rattle(1900);
      const t = setTimeout(() => {
        setStage("toss");
        sfx.toss();
        setRots(
          dice.map((v) => ({ x: F[v][0] + spin(), y: F[v][1] + spin() }))
        );
      }, 1900);
      return () => clearTimeout(t);
    }
    if (!played.current) {
      setStage("done");
      setRots(dice.map((v) => ({ x: F[v][0], y: F[v][1] })));
    } // joined mid-result: no replay
  }, [phase, round]);
  return (
    <div className={"tray " + stage} aria-label="Dice tray">
      <div className="dice">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="dw"
            style={{ "--d": i * 60 + "ms", "--ox": (2.5 - i) * 70 + "px" }}
          >
            <div
              className="cube"
              style={{
                transform: rots
                  ? `rotateX(${rots[i].x}deg) rotateY(${rots[i].y}deg)`
                  : `rotateX(-24deg) rotateY(${30 + i * 12}deg)`,
                transition:
                  rots && stage === "toss"
                    ? `transform 1.1s cubic-bezier(.15,.8,.2,1) ${i * 60}ms`
                    : "none",
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((f) => (
                <div key={f} className={"face f" + f}>
                  <Sym i={f} size={36} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={"cup " + stage} />
    </div>
  );
}

function Home({ onEnter, initialCode }) {
  const [name, setName] = useState(""),
    [code, setCode] = useState(initialCode || ""),
    [err, setErr] = useState("");
  const go = async (b) => {
    const r = await api({ ...b, name });
    r.error ? setErr(r.error) : onEnter({ code: r.code, pid: r.pid, name });
  };
  return (
    <div className="home">
      <h1 style={{ fontSize: 44 }}>Langur Burja</h1>
      <p style={{ margin: 0, opacity: 0.85, fontWeight: 500 }}>
        All players must be connected to the same WiFi network to
        play together.
      </p>
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <input
          aria-label="Your name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={14}
        />
        <button
          disabled={!name.trim()}
          onClick={() => go({ action: "create" })}
        >
          Host a new room
        </button>
        <div className="row" style={{ flexWrap: "nowrap" }}>
          <input
            aria-label="Room code"
            placeholder="Room code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={5}
          />
          <button
            className="alt"
            disabled={!name.trim() || code.length < 5}
            onClick={() => go({ action: "join", code })}
          >
            Join
          </button>
        </div>
        {err && (
          <div className="err" role="alert">
            {err}
          </div>
        )}
      </div>
    </div>
  );
}

function Room({ me, room, leave }) {
  const [chip, setChip] = useState(50),
    [mute, setMute] = useState(false);
  const isHost = room.hostId === me.pid,
    mine = room.players.find((p) => p.id === me.pid);
  const act = (b) => api({ ...b, code: me.code, pid: me.pid });
  const counts = [0, 0, 0, 0, 0, 0];
  room.dice?.forEach((d) => counts[d]++);
  const show = room.phase === "result",
    canBet = room.phase === "betting" && !isHost && mine;
  const total = (s) => room.players.reduce((a, p) => a + p.bets[s], 0);
  const bank = room.players.reduce((a, p) => a - (p.last || 0), 0);
  useEffect(() => {
    // win / lose jingle when the result lands
    if (room.phase !== "result") return;
    const net = isHost ? bank : mine?.last;
    if (net > 0) setTimeout(sfx.win, 500);
    else if (net < 0) setTimeout(sfx.lose, 500);
  }, [room.phase, room.round]);
  const bet = (i) => {
    sfx.chip();
    act({ action: "bet", sym: i, amt: chip });
  };
  return (
    <div className="wrap">
      <div className="top">
        <div>
          <div style={{ opacity: 0.7, fontSize: 14 }}>
            Room code · {room.hostName} is the banker
          </div>
          <div
            className="code"
            onClick={() =>
              navigator.clipboard?.writeText(
                `${location.origin}/?code=${room.code}`
              )
            }
            title="Click to copy invite link"
          >
            {room.code}
          </div>
        </div>
        <div className="row">
          <button
            className="alt"
            aria-pressed={mute}
            onClick={() => {
              setMute(!mute);
              setMuted(!mute);
            }}
          >
            {mute ? "Sound off" : "Sound on"}
          </button>
          <button className="alt" onClick={leave}>
            Leave
          </button>
        </div>
      </div>
      <Tray phase={room.phase} dice={room.dice} round={room.round} />
      <div className="board">
        {S.map((s, i) => {
          const st = mine ? (show ? mine.lastBets[i] : mine.bets[i]) : 0,
            win = show && counts[i] >= 2;
          return (
            <button
              key={i}
              disabled={!canBet}
              onClick={() => bet(i)}
              className={"tile" + (show ? (win ? " win" : " lose") : "")}
              aria-label={`${s.en}${st ? ", your stake " + st : ""}`}
            >
              {show && counts[i] > 0 && (
                <span className={"badge" + (win ? " hot" : "")}>
                  ×{counts[i]}
                </span>
              )}
              <Sym i={i} size={58} />
              <span className="nm">{s.n}</span>
              <small>{s.en}</small>
              <small>table {total(i) || (show ? "" : 0)}</small>
              {st > 0 && (
                <span key={st + "-" + show} className="stake">
                  {st}
                </span>
              )}
              {show && st > 0 && (
                <>
                  <span className={"pop " + (win ? "w" : "l")}>
                    {win ? "+" + st * counts[i] : "−" + st}
                  </span>
                  {[0, 1, 2, 3, 4, 5].map((k) => (
                    <i
                      key={k}
                      className={"coin " + (win ? "cw" : "cl")}
                      style={{
                        "--dx": (k - 2.5) * 16 + "px",
                        "--d": k * 80 + "ms",
                      }}
                    />
                  ))}
                </>
              )}
            </button>
          );
        })}
      </div>
      <div className="card" style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {!isHost && mine && (
          <>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong style={{ fontSize: 22 }}>
                Your coins: <Count v={mine.coins} delay={show ? 900 : 0} />
              </strong>
              {show && mine.last !== null && (
                <strong className={mine.last >= 0 ? "up" : "dn"}>
                  {mine.last >= 0 ? "+" : ""}
                  {mine.last} this round
                </strong>
              )}
            </div>
            <div className="row chips">
              {[10, 50, 100, 500].map((v) => (
                <button
                  key={v}
                  className={chip === v ? "on" : "alt"}
                  onClick={() => {
                    sfx.chip();
                    setChip(v);
                  }}
                >
                  {v}
                </button>
              ))}
              <button
                className="alt pill"
                disabled={!canBet}
                onClick={() => act({ action: "clear" })}
              >
                Take back bets
              </button>
              {mine.coins === 0 && mine.bets.every((b) => !b) && (
                <button
                  className="red pill"
                  onClick={() => act({ action: "refill" })}
                >
                  Refill 1000
                </button>
              )}
            </div>
          </>
        )}
        {isHost && (
          <div className="row">
            <button
              disabled={room.phase !== "betting"}
              onClick={() => act({ action: "roll" })}
            >
              {room.phase === "rolling" ? "Rolling…" : "Roll the dice"}
            </button>
            <button
              className="alt"
              disabled={room.phase !== "result"}
              onClick={() => act({ action: "next" })}
            >
              Next round
            </button>
            <strong className={room.house >= 0 ? "up" : "dn"}>
              Banker: {room.house >= 0 ? "+" : ""}
              <Count v={room.house} delay={show ? 900 : 0} />
            </strong>
          </div>
        )}
        <div>
          <strong>
            Round {room.round} · {room.players.length} player
            {room.players.length === 1 ? "" : "s"}
          </strong>
          <div className="plist">
            {room.players.map((p) => (
              <div key={p.id}>
                <span>
                  {p.name}
                  {p.id === me.pid ? " (you)" : ""}
                </span>
                <span>
                  <Count v={p.coins} delay={show ? 900 : 0} /> coins
                  {room.phase === "betting" && p.bets.some(Boolean)
                    ? ` · staked ${p.bets.reduce((a, b) => a + b, 0)}`
                    : ""}
                  {show && p.last !== null && (
                    <b className={p.last >= 0 ? "up" : "dn"}>
                      {" "}
                      ({p.last >= 0 ? "+" : ""}
                      {p.last})
                    </b>
                  )}
                </span>
              </div>
            ))}
            {!room.players.length && (
              <div>Share the code {room.code} to invite players.</div>
            )}
          </div>
        </div>
        {room.history.length > 0 && (
          <div className="hist">
            Past rolls:{" "}
            {room.history.map((h, k) => (
              <span
                key={k}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: "2px 6px",
                  display: "inline-flex",
                  gap: 2,
                }}
              >
                {h.map((d, j) => (
                  <Sym key={j} i={d} size={14} />
                ))}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const [me, setMe] = useState(null),
    [room, setRoom] = useState(null),
    [ready, setReady] = useState(false),
    [pre, setPre] = useState("");
  const leave = () => {
    localStorage.removeItem("lb");
    setMe(null);
    setRoom(null);
  };
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("lb") || "null");
      if (s) setMe(s);
    } catch {}
    setPre(
      (new URLSearchParams(location.search).get("code") || "").toUpperCase()
    );
    setReady(true);
    document.addEventListener("pointerdown", unlock);
    return () => document.removeEventListener("pointerdown", unlock); // browsers need a tap before audio
  }, []);
  useEffect(() => {
    if (!me) return;
    localStorage.setItem("lb", JSON.stringify(me));
    const es = new EventSource("/api/room/events?code=" + me.code);
    es.onmessage = (e) => setRoom(JSON.parse(e.data));
    es.onerror = () => {
      if (es.readyState === 2) leave();
    };
    return () => es.close();
  }, [me]);
  if (!ready) return null;
  if (!me)
    return (
      <div className="wrap">
        <Home onEnter={setMe} initialCode={pre} />
      </div>
    );
  return room ? (
    <Room me={me} room={room} leave={leave} />
  ) : (
    <div className="wrap">Connecting…</div>
  );
}
