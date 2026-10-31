import { rooms, pub } from '../../../store';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  const r = rooms.get((new URL(req.url).searchParams.get('code') || '').toUpperCase());
  if (!r) return new Response('Room not found', { status: 404 });
  const enc = new TextEncoder(); let send, ka;
  const stream = new ReadableStream({
    start(c) {
      send = (d) => c.enqueue(enc.encode(d));
      r.subs.add(send); send(`data: ${JSON.stringify(pub(r))}\n\n`);
      ka = setInterval(() => { try { send(': ka\n\n'); } catch {} }, 20000);
      req.signal.addEventListener('abort', () => { clearInterval(ka); r.subs.delete(send); });
    },
    cancel() { clearInterval(ka); r.subs.delete(send); },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive' } });
}
