// =====================================================================
// MASTER 9:16 — 1080×1920 @ 30 fps, 900 images (30 s).
// Recomposé pour le vertical : chaque scène reçoit format="9:16" et
// applique ses propres positions/échelles verticales (ce n'est PAS un
// recadrage). Les textes clés restent dans la bande centrale
// (zones sûres réseaux sociaux ≈ 220 px haut / 340 px bas).
// =====================================================================
import {AbsoluteFill, Sequence} from 'remotion';
import {SCENES, COLORS, FONT} from './config.js';
import {AudioTrack} from './components/assets.jsx';
import {Scene1Idea} from './components/Scene1Idea.jsx';
import {Scene2Reveal} from './components/Scene2Reveal.jsx';
import {Scene3Storefront} from './components/Scene3Storefront.jsx';
import {Scene4Share} from './components/Scene4Share.jsx';
import {Scene5Outro} from './components/Scene5Outro.jsx';

const Vignette = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: 'radial-gradient(150% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)',
    }}
  />
);

export const Video9x16 = () => (
  <AbsoluteFill style={{background: COLORS.bgDeep, fontFamily: FONT}}>
    <AudioTrack name="music" />

    <Sequence from={SCENES.s1.from} durationInFrames={SCENES.s1.duration}>
      <Scene1Idea duration={SCENES.s1.duration} format="9:16" />
    </Sequence>
    <Sequence from={SCENES.s2.from} durationInFrames={SCENES.s2.duration}>
      <Scene2Reveal duration={SCENES.s2.duration} format="9:16" />
    </Sequence>
    <Sequence from={SCENES.s3.from} durationInFrames={SCENES.s3.duration}>
      <Scene3Storefront duration={SCENES.s3.duration} format="9:16" />
    </Sequence>
    <Sequence from={SCENES.s4.from} durationInFrames={SCENES.s4.duration}>
      <Scene4Share duration={SCENES.s4.duration} format="9:16" />
    </Sequence>
    <Sequence from={SCENES.s5.from} durationInFrames={SCENES.s5.duration}>
      <Scene5Outro duration={SCENES.s5.duration} format="9:16" />
    </Sequence>

    <Vignette />
  </AbsoluteFill>
);

export default Video9x16;
