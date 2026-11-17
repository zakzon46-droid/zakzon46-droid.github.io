// =====================================================================
// SCÈNE 2 (4–10 s) — Révélation UTIFY : iris + logo + capture plateau.
// La capture est un PLACEHOLDER tant que config.ASSETS.captureApp.ready
// est false. Le pan lent simule une caméra sans inventer l'interface.
// =====================================================================
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS, FONT, TEXTS} from '../config.js';
import {EASE_OUT, fadeInOut, springIn, KineticWords} from './helpers.jsx';
import {AssetImage, AudioTrack, LogoLockup} from './assets.jsx';

export const Scene2Reveal = ({duration, format}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = format === '9:16';

  const opacity = fadeInOut(frame, {duration, inDur: 0, outDur: 12}); // l'iris fait l'entrée
  const iris = interpolate(frame, [0, 20], [0, 85], {extrapolateRight: 'clamp', easing: EASE_OUT});
  const logoS = springIn({frame, fps, delay: 6, damping: 12, stiffness: 120});
  const card = springIn({frame, fps, delay: 70, damping: 20, stiffness: 110});
  const pan = interpolate(frame, [70, duration], [-20, 20], {extrapolateLeft: 'clamp', easing: EASE_OUT});
  const subOpacity = interpolate(frame, [52, 66], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{fontFamily: FONT, background: COLORS.bgDeep, opacity}}>
      <AbsoluteFill style={{clipPath: `circle(${iris}% at 50% ${v ? 38 : 42}%)`}}>
        <AbsoluteFill
          style={{
            background: `radial-gradient(${v ? '900px 1400px' : '1200px 800px'} at 50% 40%, ${COLORS.bgSoft}, ${COLORS.bgDeep})`,
          }}
        />
        <LogoLockup
          height={v ? 150 : 110}
          style={{position: 'absolute', top: v ? 430 : 220, left: 0, right: 0, alignItems: 'center', transform: `scale(${logoS})`}}
        />
        <KineticWords
          text={TEXTS.s2Headline}
          frame={frame}
          fps={fps}
          delay={30}
          stagger={4}
          style={{
            position: 'absolute',
            top: v ? 660 : 400,
            left: v ? 70 : 160,
            right: v ? 70 : 160,
            textAlign: 'center',
            fontSize: v ? 62 : 54,
            fontWeight: 700,
            color: COLORS.ink,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: v ? 790 : 500,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: v ? 30 : 26,
            color: COLORS.inkMuted,
            opacity: subOpacity,
          }}
        >
          {TEXTS.s2Sub}
        </div>
        {/* Capture réelle de la plateforme (placeholder marqué sinon) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: v ? 1120 : 640,
            transform: `translateX(-50%) translateY(${(1 - card) * 160}px) translateX(${pan}px)`,
          }}
        >
          <AssetImage name="captureApp" style={{width: v ? 900 : 1020, height: v ? 430 : 290}} />
        </div>
        <Sequence from={10} durationInFrames={30}>
          <AudioTrack name="whooshReveal" />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
