// =====================================================================
// SCÈNE 1 (0–4 s) — Naissance de l'idée : cercle dessiné + titre.
// =====================================================================
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS, FONT, TEXTS} from '../config.js';
import {EASE_IN_OUT, fadeInOut, pushIn, springIn, KineticWords} from './helpers.jsx';
import {AudioTrack} from './assets.jsx';

const R = 130;
const CIRC = 2 * Math.PI * R;

export const Scene1Idea = ({duration, format}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = format === '9:16';
  const k = v ? 1.35 : 1;

  const opacity = fadeInOut(frame, {duration, inDur: 12, outDur: 12});
  const draw = interpolate(frame, [6, 58], [CIRC, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });
  const dot = springIn({frame, fps, delay: 44, damping: 14, stiffness: 140});

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        background: `radial-gradient(${v ? '900px 1400px' : '1100px 700px'} at 50% 38%, ${COLORS.bgSoft}, ${COLORS.bgDeep})`,
        opacity,
      }}
    >
      <div style={{position: 'absolute', inset: 0, transform: `scale(${pushIn(frame, duration, 0.05)})`}}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <svg width={R * 2 + 20} height={R * 2 + 20} style={{marginBottom: v ? 90 : 56}}>
            <circle
              cx={R + 10}
              cy={R + 10}
              r={R}
              fill="none"
              stroke={COLORS.ink}
              strokeOpacity={0.55}
              strokeWidth={2.5}
              strokeDasharray={CIRC}
              strokeDashoffset={draw}
              transform={`rotate(-90 ${R + 10} ${R + 10})`}
            />
            <circle cx={R + 10} cy={R + 10} r={10 * dot} fill={COLORS.accent} />
          </svg>

          <KineticWords
            text={TEXTS.s1Title}
            frame={frame}
            fps={fps}
            delay={24}
            stagger={4}
            style={{
              maxWidth: v ? 900 : 1400,
              textAlign: 'center',
              fontSize: 64 * k,
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.12,
            }}
          />
          <div
            style={{
              marginTop: 26 * k,
              fontSize: 32 * k,
              color: COLORS.inkMuted,
              opacity: interpolate(frame, [56, 72], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            {TEXTS.s1Sub}
          </div>
        </AbsoluteFill>
      </div>
      <Sequence from={6} durationInFrames={36}>
        <AudioTrack name="whooshIntro" />
      </Sequence>
    </AbsoluteFill>
  );
};
