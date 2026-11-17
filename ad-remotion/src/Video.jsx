// =====================================================================
// MASTER 16:9 — 1920×1080 @ 30 fps, 900 images (30 s).
// =====================================================================
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES, COLORS, FONT} from './config.js';
import {AudioTrack} from './components/assets.jsx';
import {Scene1Idea} from './components/Scene1Idea.jsx';
import {Scene2Reveal} from './components/Scene2Reveal.jsx';
import {Scene3Storefront} from './components/Scene3Storefront.jsx';
import {Scene4Share} from './components/Scene4Share.jsx';
import {Scene5Outro} from './components/Scene5Outro.jsx';

// Vignettage discret, appliqué au-dessus de toutes les scènes.
const Vignette = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: 'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)',
    }}
  />
);

export const Video = () => (
  <AbsoluteFill style={{background: COLORS.bgDeep, fontFamily: FONT}}>
    {/* Musique principale (silencieuse tant que config.AUDIO.music.ready = false) */}
    <AudioTrack name="music" />

    <Sequence from={SCENES.s1.from} durationInFrames={SCENES.s1.duration}>
      <Scene1Idea duration={SCENES.s1.duration} format="16:9" />
    </Sequence>
    <Sequence from={SCENES.s2.from} durationInFrames={SCENES.s2.duration}>
      <Scene2Reveal duration={SCENES.s2.duration} format="16:9" />
    </Sequence>
    <Sequence from={SCENES.s3.from} durationInFrames={SCENES.s3.duration}>
      <Scene3Storefront duration={SCENES.s3.duration} format="16:9" />
    </Sequence>
    <Sequence from={SCENES.s4.from} durationInFrames={SCENES.s4.duration}>
      <Scene4Share duration={SCENES.s4.duration} format="16:9" />
    </Sequence>
    <Sequence from={SCENES.s5.from} durationInFrames={SCENES.s5.duration}>
      <Scene5Outro duration={SCENES.s5.duration} format="16:9" />
    </Sequence>

    <Vignette />
  </AbsoluteFill>
);

export default Video;
