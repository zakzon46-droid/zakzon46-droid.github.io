#!/usr/bin/env node
// =====================================================================
// Générateur de SFX — Publicité UTIFY (30 s)
// ---------------------------------------------------------------------
// Usage :  npm run sfx   (ou : node scripts/generate-sfx.mjs)
// Produit des fichiers .wav 16 bits / 44,1 kHz dans public/assets/ :
//   whoosh-intro.wav, whoosh-reveal.wav, ui-pop.wav, ui-pop-2.wav,
//   whoosh-share.wav, hit-logo.wav
// puis passe automatiquement ready:true pour ces pistes dans src/config.js.
// Musique : à fournir séparément (libre de droits) — non générée ici.
// Node >= 18, aucune dépendance externe. Rendu 100 % déterministe.
// =====================================================================
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'assets');
const SR = 44100;

// PRNG déterministe (mulberry32) → rendu reproductible.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Écriture WAV mono 16 bits.
function writeWav(name, samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log(`  OK ${name}  (${(n / SR).toFixed(2)} s)`);
}

// Filtre passe-bande biquad (RBJ cookbook), fréquence variable par échantillon.
function makeBandpass() {
  const st = {x1: 0, x2: 0, y1: 0, y2: 0};
  return (x, f, q) => {
    const w = (2 * Math.PI * f) / SR;
    const alpha = Math.sin(w) / (2 * q);
    const c = Math.cos(w);
    const b0 = alpha, b2 = -alpha;
    const a0 = 1 + alpha, a1 = -2 * c, a2 = 1 - alpha;
    const y =
      (b0 / a0) * x - (b2 / a0) * st.x2 - (a1 / a0) * st.y1 - (a2 / a0) * st.y2;
    st.x2 = st.x1; st.x1 = x; st.y2 = st.y1; st.y1 = y;
    return y;
  };
}

const lerp = (a, b, t) => a + (b - a) * t;

// ---- 1. whoosh-intro : riser doux 200 -> 1200 Hz, résolution finale ----
function whooshIntro() {
  const dur = 1.25, n = Math.round(dur * SR);
  const bp = makeBandpass();
  const r = rng(1013);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = t < 0.85 ? Math.pow(t / 0.85, 2) : Math.pow(1 - (t - 0.85) / 0.4, 2);
    const f = 200 * Math.pow(1200 / 200, Math.min(1, t / 0.85));
    out[i] = bp(r() * 2 - 1, f, 2.4) * env * 0.7;
  }
  return out;
}

// ---- 2. whoosh-reveal : sweep 300 -> 2600 Hz + impact sourd à la fin ----
function whooshReveal() {
  const dur = 1.1, n = Math.round(dur * SR);
  const bp = makeBandpass();
  const r = rng(2027);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = Math.min(1, t / 0.85);
    const env = t < 0.85 ? Math.pow(p, 1.6) : Math.pow(1 - (t - 0.85) / 0.25, 2);
    const f = 300 * Math.pow(2600 / 300, p);
    let v = bp(r() * 2 - 1, f, 2.2) * env * 0.55;
    if (t >= 0.85) {
      const u = t - 0.85; // impact : atterrit sur le wordmark
      v += Math.sin(2 * Math.PI * 90 * u * Math.exp(-u * 3)) * Math.exp(-u * 14) * 0.9;
    }
    out[i] = v;
  }
  return out;
}

// ---- 3. ui-pop : blip UI discret (fréquences paramétrables) ----
function uiPop(f0 = 880, f1 = 540) {
  const dur = 0.3, n = Math.round(dur * SR);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = Math.min(1, t / 0.12);
    const f = lerp(f0, f1, p);
    const env = Math.exp(-t * 26) * Math.min(1, t / 0.004);
    out[i] = (Math.sin(2 * Math.PI * f * t) + 0.35 * Math.sin(4 * Math.PI * f * t)) * env * 0.5;
  }
  return out;
}

// ---- 4. whoosh-share : whoosh aérien descendant 1800 -> 350 Hz ----
function whooshShare() {
  const dur = 1.2, n = Math.round(dur * SR);
  const bp = makeBandpass();
  const r = rng(3041);
  const out = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const env = Math.pow(Math.sin(Math.PI * t), 1.4);
    const f = 1800 * Math.pow(350 / 1800, t);
    out[i] = bp(r() * 2 - 1, f, 1.4) * env * 0.6;
  }
  return out;
}

// ---- 5. hit-logo : hit net (thump grave + tonalité + splash bref) ----
function hitLogo() {
  const dur = 1.4, n = Math.round(dur * SR);
  const r = rng(4099);
  const hp = makeBandpass();
  const out = new Float64Array(n);
  let ph1 = 0, ph2 = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const fLow = 110 * Math.exp(-t * 1.2) + 45; // ~155 -> ~55 Hz
    ph1 += (2 * Math.PI * fLow) / SR;
    const thump = Math.sin(ph1) * Math.exp(-t * 5) * 0.9;
    ph2 += (2 * Math.PI * 440) / SR;
    const mid = Math.sin(ph2) * Math.exp(-t * 7) * 0.25;
    const splash = t < 0.12 ? hp(r() * 2 - 1, 3000, 0.9) * (1 - t / 0.12) * 0.35 : 0;
    out[i] = thump + mid + splash;
  }
  return out;
}

// ---- Activation automatique des pistes dans src/config.js ----
const SFX_KEYS = ['whooshIntro', 'whooshReveal', 'uiPop', 'uiPop2', 'whooshShare', 'hitLogo'];

function enableInConfig() {
  const p = path.join(ROOT, 'src', 'config.js');
  let txt = fs.readFileSync(p, 'utf8');
  let changed = 0;
  for (const key of SFX_KEYS) {
    const re = new RegExp(`(^|\\n)([^\\n]*${key}:[^\\n]*ready:\\s*)false`);
    if (re.test(txt)) {
      txt = txt.replace(re, (m, a, b) => a + b + 'true');
      changed++;
    }
  }
  if (changed) fs.writeFileSync(p, txt);
  console.log(`\nconfig.js : ${changed} piste(s) SFX passee(s) a ready:true.`);
  console.log('(music reste a ready:false jusqu\'au depot de votre musique)');
}

// ---- Main ----
fs.mkdirSync(OUT, {recursive: true});
console.log('Generation des SFX UTIFY dans public/assets/ ...');
writeWav('whoosh-intro.wav', whooshIntro());
writeWav('whoosh-reveal.wav', whooshReveal());
writeWav('ui-pop.wav', uiPop(880, 540));
writeWav('ui-pop-2.wav', uiPop(1040, 620));
writeWav('whoosh-share.wav', whooshShare());
writeWav('hit-logo.wav', hitLogo());
enableInConfig();
console.log('\nTermine. Prochaine etape : npm run render:16x9 / render:9x16');
