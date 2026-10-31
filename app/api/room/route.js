import { rooms, uid, push, saveRoom, loadRoom } from "../../store";
export const dynamic = "force-dynamic";
const J = (o, status = 200) => Response.json(o, { status });
const blank = () => [0, 0, 0, 0, 0, 0];
const newPlayer = (id, name) => ({
  id,
  name: (name || "Player").slice(0, 14),
  coins: 1000,
  bets: blank(),
  lastBets: blank(),
  last: null,
});

export async function POST(req) {
  const { action, code, pid, name, sym, amt } = await req.json();
  if (action === "create") {
    const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c;
    do {
      c = Array.from(
        { length: 5 },
        () => A[Math.floor(Math.random() * A.length)]
      ).join("");
    } while (rooms.has(c));
    const id = uid();
    const newRoom = {
      code: c,
      hostId: id,
      hostName: (name || "Host").slice(0, 14),
      phase: "betting",
      dice: null,
      round: 1,
      house: 0,
      history: [],
      players: {},
      subs: new Set(),
    };
    rooms.set(c, newRoom);
    await saveRoom(newRoom);
    return J({ code: c, pid: id });
  }

  // Try to load room from memory first, then from Redis
  let r = rooms.get((code || "").toUpperCase());
  if (!r) {
    const loaded = await loadRoom((code || "").toUpperCase());
    if (loaded) {
      r = loaded;
    } else {
      return J({ error: "Room not found" }, 404);
    }
  }

  const isHost = pid === r.hostId,
    p = r.players[pid];

  if (action === "join") {
    const id = pid && (isHost || p) ? pid : uid();
    if (!isHost && !r.players[id]) r.players[id] = newPlayer(id, name);
    push(r);
    return J({ code: r.code, pid: id });
  }
  if (action === "bet" && p && r.phase === "betting") {
    if (sym >= 0 && sym < 6 && amt > 0 && p.coins >= amt) {
      p.coins -= amt;
      p.bets[sym] += amt;
    }
  } else if (action === "clear" && p && r.phase === "betting") {
    p.coins += p.bets.reduce((a, b) => a + b, 0);
    p.bets = blank();
  } else if (
    action === "refill" &&
    p &&
    p.coins === 0 &&
    p.bets.every((b) => !b)
  ) {
    p.coins = 1000;
  } else if (action === "roll" && isHost && r.phase === "betting") {
    r.dice = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6));
    r.phase = "rolling";
    setTimeout(() => {
      // reveal after the dice animation: only 2+ matches win: pays stake x (n+1) back; 0 or 1 match loses the stake
      const n = blank();
      r.dice.forEach((d) => n[d]++);
      Object.values(r.players).forEach((q) => {
        let net = 0;
        q.bets.forEach((b, s) => {
          if (!b) return;
          if (n[s] >= 2) {
            q.coins += b * (n[s] + 1);
            net += b * n[s];
          } else net -= b;
        });
        q.last = net;
        r.house -= net;
        q.lastBets = q.bets;
        q.bets = blank();
      });
      r.history.unshift(r.dice);
      r.history = r.history.slice(0, 8);
      r.phase = "result";
      push(r);
    }, 3800);
  } else if (action === "next" && isHost && r.phase === "result") {
    r.phase = "betting";
    r.dice = null;
    r.round++;
    Object.values(r.players).forEach((q) => (q.last = null));
  }
  push(r);
  return J({ ok: true });
}
