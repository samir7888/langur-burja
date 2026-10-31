// In-memory store with persistence. Lives in the Node process; globalThis keeps it across route bundles/HMR.
const g = globalThis;

// Initialize rooms from storage if available
if (!g.__lb) {
  g.__lb = new Map();
  // Load persisted rooms on server start
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const storePath = path.join(process.cwd(), ".lb-rooms.json");
      if (fs.existsSync(storePath)) {
        const data = JSON.parse(fs.readFileSync(storePath, "utf8"));
        Object.entries(data).forEach(([code, room]) => {
          g.__lb.set(code, { ...room, subs: new Set() });
        });
      }
    } catch (e) {
      console.error("Failed to load room data:", e);
    }
  }
}

export const rooms = g.__lb;
export const uid = () => Math.random().toString(36).slice(2, 10);
export const pub = (r) => ({
  code: r.code,
  hostId: r.hostId,
  hostName: r.hostName,
  phase: r.phase,
  dice: r.dice,
  round: r.round,
  house: r.house,
  history: r.history,
  players: Object.values(r.players),
});

// Save to file system periodically
export const save = () => {
  if (typeof window !== "undefined") return;
  try {
    const fs = require("fs");
    const path = require("path");
    const storePath = path.join(process.cwd(), ".lb-rooms.json");
    const data = {};
    rooms.forEach((room, code) => {
      data[code] = {
        code: room.code,
        hostId: room.hostId,
        hostName: room.hostName,
        phase: room.phase,
        dice: room.dice,
        round: room.round,
        house: room.house,
        history: room.history,
        players: room.players,
      };
    });
    fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Failed to save room data:", e);
  }
};

export const push = (r) => {
  const d = `data: ${JSON.stringify(pub(r))}\n\n`;
  r.subs.forEach((s) => {
    try {
      s(d);
    } catch {
      r.subs.delete(s);
    }
  });
  save(); // Persist after each state change
};
