// Synthesised sound effects (Web Audio) - no audio files needed.
let ctx, master, muted = false;
const on = () => {
  if (typeof window === 'undefined') return false;
  if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
    ctx = new C(); master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination); }
  if (ctx.state === 'suspended') ctx.resume();
  return !muted;
};
export const unlock = () => { on(); };
export const setMuted = (m) => { muted = m; };
function noise(t, dur, { f = 3000, q = 1, g = 0.3 } = {}) {
  const n = Math.max(1, Math.floor(ctx.sampleRate * dur)), b = ctx.createBuffer(1, n, ctx.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), ga = ctx.createGain();
  s.buffer = b; fl.type = 'bandpass'; fl.frequency.value = f; fl.Q.value = q;
  ga.gain.setValueAtTime(g, t); ga.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(fl); fl.connect(ga); ga.connect(master); s.start(t);
}
function tone(t, f, dur, { type = 'sine', g = 0.2, to } = {}) {
  const o = ctx.createOscillator(), ga = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  ga.gain.setValueAtTime(g, t); ga.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(ga); ga.connect(master); o.start(t); o.stop(t + dur + 0.02);
}
const R = Math.random;
export const sfx = {
  chip() { if (!on()) return; const t = ctx.currentTime; tone(t, 2000, 0.09, { type: 'triangle', g: 0.15, to: 1300 }); noise(t, 0.04, { f: 6500, g: 0.25 }); },
  rattle(ms = 1900) { if (!on()) return; const t = ctx.currentTime;   // dice clattering inside the cup
    for (let i = 0; i < ms / 50; i++) { const x = t + i * 0.05 + R() * 0.03;
      noise(x, 0.05, { f: 1500 + R() * 3500, q: 3, g: 0.2 + R() * 0.25 }); if (i % 3 === 0) tone(x, 180 + R() * 140, 0.05, { type: 'square', g: 0.04 }); } },
  toss() { if (!on()) return; const t = ctx.currentTime; noise(t, 0.3, { f: 500, q: 0.6, g: 0.3 }); // cup lifts, dice land on the table
    for (let i = 0; i < 6; i++) { const x = t + 0.1 + i * 0.09 + R() * 0.05; noise(x, 0.08, { f: 800 + R() * 600, g: 0.5 }); tone(x, 140, 0.1, { g: 0.2, to: 70 }); } },
  win() { if (!on()) return; const t = ctx.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => tone(t + i * 0.09, f, 0.4, { type: 'triangle', g: 0.18 }));
    for (let i = 0; i < 9; i++) tone(t + 0.35 + i * 0.06 + R() * 0.03, 2400 + R() * 1400, 0.14, { g: 0.07 }); },
  lose() { if (!on()) return; const t = ctx.currentTime; tone(t, 330, 0.55, { type: 'sawtooth', g: 0.07, to: 110 }); tone(t + 0.05, 220, 0.6, { g: 0.16, to: 70 }); },
};
