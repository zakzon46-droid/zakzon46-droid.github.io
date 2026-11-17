// =====================================================================
// Gestion des médias : placeholder marqué tant que l'asset réel manque.
// Un placeholder N'EST PAS une capture d'UTIFY : il est visuellement
// identifiable comme tel (hachures + étiquette).
// =====================================================================
import {Img, Audio, staticFile} from 'remotion';
import {ASSETS, AUDIO, COLORS, FONT} from '../config.js';

export const PlaceholderBox = ({label, style = {}}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      border: '3px dashed rgba(255,255,255,0.35)',
      borderRadius: 14,
      background:
        'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 26px, rgba(255,255,255,0.09) 26px 52px)',
      color: '#fff',
      fontFamily: FONT,
      padding: 12,
      ...style,
    }}
  >
    <div style={{opacity: 0.92}}>
      <div style={{fontWeight: 700, letterSpacing: 1, fontSize: 20}}>REMPLACER PAR {label}</div>
      <div style={{fontSize: 15, opacity: 0.7, marginTop: 4}}>Placeholder — pas une capture réelle d'UTIFY</div>
    </div>
  </div>
);

// Affiche l'asset déclaré dans config.ASSETS, ou son placeholder.
export const AssetImage = ({name, style = {}}) => {
  const a = ASSETS[name];
  if (!a) throw new Error(`Asset inconnu dans config.ASSETS : ${name}`);
  return a.ready ? (
    <Img src={staticFile(a.file)} style={{objectFit: 'cover', width: '100%', height: '100%', ...style}} />
  ) : (
    <PlaceholderBox label={a.label} style={style} />
  );
};

// Logo réel si fourni, sinon wordmark + étiquette de remplacement.
export const LogoLockup = ({height = 120, style = {}}) => {
  const a = ASSETS.logo;
  if (a.ready) {
    return <Img src={staticFile(a.file)} style={{height, width: 'auto', objectFit: 'contain', ...style}} />;
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, ...style}}>
      <div style={{fontSize: height * 0.55, fontWeight: 800, letterSpacing: 8, color: COLORS.ink, fontFamily: FONT}}>
        UTIFY
      </div>
      <div
        style={{
          fontSize: Math.max(12, height * 0.1),
          color: COLORS.ink,
          opacity: 0.85,
          border: '2px dashed rgba(255,255,255,0.5)',
          borderRadius: 8,
          padding: '4px 10px',
          fontFamily: FONT,
        }}
      >
        REMPLACER PAR LOGO RÉEL — public/{a.file}
      </div>
    </div>
  );
};

// Piste audio : ne rend rien tant que le fichier n'est pas déclaré prêt.
export const AudioTrack = ({name}) => {
  const a = AUDIO[name];
  if (!a) throw new Error(`Piste audio inconnue dans config.AUDIO : ${name}`);
  return a.ready ? <Audio src={staticFile(a.file)} volume={a.volume ?? 1} /> : null;
};
