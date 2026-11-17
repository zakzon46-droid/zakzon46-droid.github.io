// =====================================================================
// Déclaration des compositions — Remotion 4.
// =====================================================================
import {registerRoot, Composition} from 'remotion';
import Video from './Video.jsx';
import Video9x16 from './Video9x16.jsx';
import {FPS, TOTAL_FRAMES} from './config.js';

registerRoot(() => (
  <>
    <Composition
      id="UtifyAd16x9"
      component={Video}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="UtifyAd9x16"
      component={Video9x16}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
));
