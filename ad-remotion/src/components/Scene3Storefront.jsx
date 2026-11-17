// =====================================================================
// SCÈNE 3 (10–17 s) — La boutique sur laptop + téléphone.
// Reflet balayant piloté par la frame. Contenu d'écran = captures
// RÉELLES (placeholders marqués sinon). Aucune interface inventée.
// =====================================================================
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {COLORS, FONT, TEXTS} from '../config.js';
import {fadeInOut, pushIn, springIn, KineticWords} from './helpers.jsx';
import {AssetImage, AudioTrack} from './assets.jsx';
import {LaptopFrame, PhoneFrame} from './Device.jsx';

export const Scene3Storefront = ({duration, format}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const v = format === '9:16';

  const opacity = fadeInOut(frame, {duration, inDur: 12, outDur: 12});
  const laptop = springIn({frame, fps, delay: 5, damping: 18, stiffness: 110});
  const phone = springIn({frame, fps, delay: 15, damping: 14, stiffness: 120});
  // Balayage de reflet (une seule passe, discrète) : 60 → 120 im.
  const sweep = interpolate(frame, [60, 120], [-30, 130], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const laptopW = v ? 980 : 860;
  const phoneW = v ? 300 : 235;

  return (
    <AbsoluteFill style={{fontFamily: FONT, background: COLORS.bgDeep, opacity}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${pushIn(frame, duration, 0.04)})`}}>
        <AbsoluteFill
          style={{
            background: `radial-gradient(${v ? '900px 1300px' : '1000px 700px'} at 50% 55%, ${COLORS.bgSoft}, ${COLORS.bgDeep})`,
          }}
        />
        <KineticWords
          text={TEXTS.s3Headline}
          frame={frame}
          fps={fps}
          delay={6}
          stagger={4}
          style={{
            position: 'absolute',
            top: v ? 280 : 110,
            left: v ? 70 : 160,
            right: v ? 70 : 160,
            textAlign: 'center',
            fontSize: v ? 58 : 50,
            fontWeight: 700,
            color: COLORS.ink,
          }}
        />

        {/* Laptop */}
        <div
          style={{
            position: 'absolute',
            left: v ? '50%' : '44%',
            top: v ? 660 : 320,
            transform: `translateX(-50%) translateY(${(1 - laptop) * 140}px)`,
          }}
        >
          <LaptopFrame width={laptopW}>
            <AssetImage name="captureStoreDesktop" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateX(${sweep}%) rotate(12deg)`,
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.13) 50%, transparent 70%)',
                width: '60%',
                pointerEvents: 'none',
              }}
            />
          </LaptopFrame>
        </div>

        {/* Téléphone en avant-plan */}
        <div
          style={{
            position: 'absolute',
            left: v ? '66%' : '63%',
            top: v ? 1080 : 560,
            transform: `translateX(-50%) translateY(${(1 - phone) * 160}px)`,
            zIndex: 3,
          }}
        >
          <PhoneFrame width={phoneW}>
            <AssetImage name="captureStoreMobile" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} />
          </PhoneFrame>
        </div>

        <Sequence from={5} durationInFrames={24}>
          <AudioTrack name="uiPop" />
        </Sequence>
        <Sequence from={15} durationInFrames={24}>
          <AudioTrack name="uiPop2" />
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
