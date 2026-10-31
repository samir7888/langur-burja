import { rooms, pub, loadRoom } from "../../../store";
export const dynamic = "force-dynamic";
export async function GET(req) {
  const code = (new URL(req.url).searchParams.get("code") || "").toUpperCase();
  let r = rooms.get(code);

  // Try to load from Redis if not in memory
  if (!r) {
    const loaded = await loadRoom(code);
    if (loaded) {
      r = loaded;
    } else {
      return new Response("Room not found", { status: 404 });
    }
  }

  const enc = new TextEncoder();
  let send, ka;
  const stream = new ReadableStream({
    start(c) {
      send = (d) => c.enqueue(enc.encode(d));
      r.subs.add(send);
      send(`data: ${JSON.stringify(pub(r))}\n\n`);
      ka = setInterval(() => {
        try {
          send(": ka\n\n");
        } catch {}
      }, 20000);
      req.signal.addEventListener("abort", () => {
        clearInterval(ka);
        r.subs.delete(send);
      });
    },
    cancel() {
      clearInterval(ka);
      r.subs.delete(send);
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
