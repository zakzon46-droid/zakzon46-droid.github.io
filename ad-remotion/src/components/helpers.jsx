// =====================================================================
// Helpers d'animation — 100 % pilotés par le numéro d'image (frame).
// =====================================================================
import {interpolate, spring, Easing} from 'remotion';

export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

// Fondu d'entrée/sortie piloté par la frame locale de la séquence.
export const fadeInOut = (frame, {duration, inDur = 10, outDur = 10}) => {
  const fade = (frames, from, to) =>
    interpolate(frame, frames, [from, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: to > from ? EASE_OUT : EASE_IN_OUT,
    });
  const fadeIn = fade([0, inDur], 0, 1);
  const fadeOut = outDur > 0 ? fade([duration - outDur, duration], 1, 0) : 1;
  return Math.min(fadeIn, fadeOut);
};

// Ressort d'entrée (délai, amortissement, raideur) — jamais négatif.
export const springIn = ({frame, fps, delay = 0, damping = 18, stiffness = 130, mass = 0.8}) =>
  spring({frame: Math.max(0, frame - delay), fps, config: {damping, stiffness, mass}});

// Léger travelling avant sur toute la durée de la scène.
export const pushIn = (frame, duration, amount = 0.04) =>
  interpolate(frame, [0, duration], [1, 1 + amount], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_IN_OUT,
  });

// Typographie cinétique : révélation mot à mot avec masque + ressort.
export const KineticWords = ({text, frame, fps, delay = 0, stagger = 4, style = {}, wordStyle = {}}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.32em', ...style}}>
    {text.split(' ').map((w, i) => {
      const p = springIn({frame, fps, delay: delay + i * stagger, damping: 20, stiffness: 150});
      return (
        <span key={i} style={{display: 'inline-block', overflow: 'hidden', ...wordStyle}}>
          <span style={{display: 'inline-block', transform: `translateY(${(1 - p) * 115}%)`}}>{w}</span>
        </span>
      );
    })}
  </div>
);
