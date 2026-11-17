// =====================================================================
// SCÈNE 4 (17–23 s) — Le lien comme signal : pilule URL, anneaux,
// traits qui se dessinent vers trois points abstraits.
// Aucune plateforme ni fonction non confirmée n'est nommée.
// =====================================================================
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS, FONT, TEXTS} from '../config.js';
import {EASE_IN_OUT, fadeInOut, springIn, KineticWords} from './helpers.jsx';
import {AudioTrack} from './assets.jsx';

const ANGLES = [-150, -30, 90]; // trois directions abstraites

export const Scene4Share = ({duration, format}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = format === '9:16';

  const opacity = fadeInOut(frame, {duration, inDur: 12, outDur: 12});
  const pill = springIn({frame, fps, delay: 5, damping: 16, stiffness: 130});

  const cx = v ? 540 : 960;
  const cy = v ? 900 : 560;
  const R = v ? 350 : 290;
  const pillW = v ? 680 : 620;
  const pillH = v ? 118 : 96;

  const points = ANGLES.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R};
  });

  return (
    <AbsoluteFill style={{fontFamily: FONT, background: COLORS.bgDeep, opacity}}>
      <AbsoluteFill
        style={{background: `radial-gradient(${v ? '900px 1300px' : '1100px 700px'} at 50% 55%, ${COLORS.bgSoft}, ${COLORS.bgDeep})`}}
      />
      <KineticWords
        text={TEXTS.s4Headline}
        frame={frame}
        fps={fps}
        delay={6}
        stagger={4}
        style={{
          position: 'absolute',
          top: v ? 330 : 170,
          left: v ? 70 : 160,
          right: v ? 70 : 160,
          textAlign: 'center',
          fontSize: v ? 58 : 52,
          fontWeight: 700,
          color: COLORS.ink,
        }}
      />

      {/* Anneaux concentriques (propagation du lien) */}
      {[0, 1, 2].map((i) => {
        const p = interpolate(frame, [20 + i * 20, 60 + i * 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: EASE_IN_OUT,
        });
        const size = v ? 320 : 260;
        return (
          <div
            key={`ring-${i}`}
            style={{
              position: 'absolute',
              left: cx - size / 2,
              top: cy - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              border: `2px solid ${COLORS.accent}`,
              opacity: (1 - p) * 0.5,
              transform: `scale(${0.7 + p * 0.9})`,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Traits qui se dessinent vers les points */}
      <svg width={v ? 1080 : 1920} height={v ? 1920 : 1080} style={{position: 'absolute', inset: 0}}>
        {points.map((pt, i) => {
          const len = Math.hypot(pt.x - cx, pt.y - cy);
          const p = interpolate(frame, [40 + i * 10, 75 + i * 10], [len, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: EASE_IN_OUT,
          });
          return (
            <line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={pt.x}
              y2={pt.y}
              stroke={COLORS.accent}
              strokeOpacity={0.55}
              strokeWidth={2.5}
              strokeDasharray={len}
              strokeDashoffset={p}
            />
          );
        })}
      </svg>

      {/* Points d'arrivée abstraits */}
      {points.map((pt, i) => {
        const s = springIn({frame, fps, delay: 60 + i * 10, damping: 14});
        return (
          <div
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              left: pt.x - 9,
              top: pt.y - 9,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: COLORS.accent,
              transform: `scale(${s})`,
            }}
          />
        );
      })}

      {/* Pilule URL (exemple illustratif, signalé à l'écran) */}
      <div
        style={{
          position: 'absolute',
          left: cx - pillW / 2,
          top: cy - pillH / 2,
          width: pillW,
          height: pillH,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.06)',
          border: `2px solid ${COLORS.accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: v ? 40 : 36,
          fontWeight: 700,
          letterSpacing: 1,
          color: COLORS.ink,
          transform: `scale(${pill})`,
          zIndex: 4,
        }}
      >
        {TEXTS.s4UrlExample}
      </div>
      <div
        style={{
          position: 'absolute',
          left: cx - pillW / 2,
          top: cy + pillH / 2 + 14,
          width: pillW,
          textAlign: 'center',
          fontSize: 15,
          color: COLORS.inkMuted,
          opacity: interpolate(frame, [30, 45], [0, 0.75], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          zIndex: 4,
        }}
      >
        {TEXTS.s4UrlCaption}
      </div>

      <Sequence from={18} durationInFrames={30}>
        <AudioTrack name="whooshShare" />
      </Sequence>
    </AbsoluteFill>
  );
};
