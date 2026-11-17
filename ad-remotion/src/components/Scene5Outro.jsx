// =====================================================================
// SCÈNE 5 (23–30 s) — End card : logo (réel ou placeholder), CTA, URL.
// Pas de fondu final : tenue nette jusqu'à la dernière image.
// =====================================================================
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS, FONT, TEXTS} from '../config.js';
import {EASE_OUT, springIn, KineticWords} from './helpers.jsx';
import {AudioTrack, LogoLockup} from './assets.jsx';

export const Scene5Outro = ({duration, format}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = format === '9:16';

  const opacity = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const logoS = springIn({frame, fps, delay: 8, damping: 12, stiffness: 120});
  const pulse = interpolate(frame, [24, 54], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE_OUT});
  const urlS = springIn({frame, fps, delay: 60, damping: 18, stiffness: 140});

  const ringSize = v ? 330 : 270;
  const logoH = v ? 160 : 120;
  const centerTop = v ? 760 : 420;

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        background: `radial-gradient(${v ? '900px 1400px' : '1200px 800px'} at 50% 45%, ${COLORS.bgSoft}, ${COLORS.bgDeep})`,
        opacity,
      }}
    >
      {/* Anneau pulsé une seule fois autour du logo */}
      <div
        style={{
          position: 'absolute',
          left: `calc(50% - ${ringSize / 2}px)`,
          top: centerTop - ringSize / 2,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `2px solid ${COLORS.accent}`,
          opacity: (1 - pulse) * 0.8,
          transform: `scale(${0.9 + pulse * 0.45})`,
        }}
      />
      <LogoLockup
        height={logoH}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: centerTop - logoH / 2,
          alignItems: 'center',
          transform: `scale(${logoS})`,
        }}
      />
      <KineticWords
        text={TEXTS.s5Cta}
        frame={frame}
        fps={fps}
        delay={34}
        stagger={5}
        style={{
          position: 'absolute',
          top: centerTop + (v ? 130 : 110),
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: v ? 56 : 48,
          fontWeight: 700,
          color: COLORS.ink,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: centerTop + (v ? 240 : 200),
          left: '50%',
          transform: `translateX(-50%) scale(${urlS})`,
          padding: v ? '16px 44px' : '14px 38px',
          borderRadius: 999,
          border: `2px solid ${COLORS.accent}`,
          background: 'rgba(255,255,255,0.05)',
          color: COLORS.accent,
          fontSize: v ? 40 : 34,
          fontWeight: 800,
          letterSpacing: 2,
        }}
      >
        {TEXTS.s5Url}
      </div>
      <Sequence from={8} durationInFrames={36}>
        <AudioTrack name="hitLogo" />
      </Sequence>
    </AbsoluteFill>
  );
};
