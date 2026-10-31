// Store with Redis persistence for serverless environments
// Uses Upstash Redis (compatible with Vercel)
const g = globalThis;

// Initialize Redis client (only on server-side)
let redis = null;
if (typeof window === "undefined") {
  try {
    const { Redis } = require("@upstash/redis");
    if (
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      console.log("✓ Redis connection initialized");
    } else {
      console.log("⚠ Redis env vars not found - using in-memory only");
    }
  } catch (e) {
    console.log("⚠ Redis not available:", e.message);
  }
}

// Initialize rooms map
if (!g.__lb) {
  g.__lb = new Map();
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

// Load a room from Redis
export const loadRoom = async (code) => {
  if (!redis) return null;
  try {
    const data = await redis.get(`room:${code}`);
    if (data) {
      const room = typeof data === "string" ? JSON.parse(data) : data;
      rooms.set(code, { ...room, subs: new Set() });
      return room;
    }
  } catch (e) {
    console.error("Failed to load room from Redis:", e.message);
  }
  return null;
};

// Save a room to Redis
export const saveRoom = async (room) => {
  if (!redis) return;
  try {
    const data = {
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
    // Save with 24 hour expiration
    await redis.setex(`room:${room.code}`, 86400, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save room to Redis:", e.message);
  }
};

// Delete a room from Redis
export const deleteRoom = async (code) => {
  if (!redis) return;
  try {
    await redis.del(`room:${code}`);
  } catch (e) {
    console.error("Failed to delete room from Redis:", e.message);
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
  // Save to Redis asynchronously (don't block)
  saveRoom(r).catch(() => {});
};
