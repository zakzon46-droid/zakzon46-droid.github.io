// =====================================================================
// UTIFY — CONFIG CENTRALE (30 s @ 30 fps = 900 images)
// Tous les textes sont des PROPOSITIONS PUBLICITAIRES à valider par UTIFY.
// Pour activer un média : déposer le fichier dans public/assets/
// puis passer son entrée "ready" à true.
// =====================================================================

export const FPS = 30;
export const TOTAL_FRAMES = 900; // 30 s

// --- Timings (en IMAGES) -------------------------------------------
export const SCENES = {
  s1: {from: 0,   duration: 120}, // 0–4 s   : l'idée
  s2: {from: 120, duration: 180}, // 4–10 s  : révélation UTIFY
  s3: {from: 300, duration: 210}, // 10–17 s : boutique sur devices
  s4: {from: 510, duration: 180}, // 17–23 s : le lien à partager
  s5: {from: 690, duration: 210}, // 23–30 s : end card
};

// --- Identité (COULEURS À EXTRAIRE DU VRAI LOGO) ---------------------
export const COLORS = {
  bgDeep: '#0B0D12',
  bgSoft: '#151B26',
  ink: '#F4F6FB',
  inkMuted: '#9AA3B5',
  accent: '#3ECF8E', // PROVISOIRE — remplacer par la couleur officielle du logo
  line: 'rgba(255,255,255,0.16)',
};

// Police de secours uniquement (aucune police téléchargée).
export const FONT = "Inter, 'Segoe UI', 'Helvetica Neue', Arial, system-ui, sans-serif";

// --- Textes FR (à valider) — Variante A par défaut -------------------
export const TEXTS = {
  s1Title: 'Vous avez un projet de vente ?',      // à valider
  s1Sub: 'Donnez-lui une vitrine en ligne.',      // à valider
  s2Headline: 'Créez votre boutique en ligne',    // à valider
  s2Sub: 'UTIFY — plateforme de création de boutiques en ligne', // à valider
  s3Headline: 'Une vitrine en ligne, à partager', // à valider
  s4Headline: 'Partagez le lien de votre boutique', // à valider
  s4UrlExample: 'utify.site/votre-boutique',      // ILLUSTRATIF — format réel à valider
  s4UrlCaption: 'exemple illustratif de lien',    // mention honnête affichée en petit
  s5Cta: 'Découvrez UTIFY',                        // à valider
  s5Url: 'utify.site',                             // à valider
};

// --- Version arabe (traduction à valider par un locuteur natif) ------
// Non utilisée par défaut. Pour l'activer : remplacer TEXTS par TEXTS_AR
// dans les scènes et ajouter direction:'rtl' sur les conteneurs de texte.
export const TEXTS_AR = {
  s1Title: 'هل لديك مشروع بيع؟',
  s1Sub: 'امنحه واجهة عبر الإنترنت.',
  s2Headline: 'أنشئ متجرك الإلكتروني',
  s2Sub: 'UTIFY — منصة لإنشاء المتاجر الإلكترونية',
  s3Headline: 'واجهة عبر الإنترنت، للمشاركة',
  s4Headline: 'شارك رابط متجرك',
  s4UrlExample: 'utify.site/your-store',
  s4UrlCaption: 'مثال توضيحي لرابط',
  s5Cta: 'اكتشف UTIFY',
  s5Url: 'utify.site',
};

// --- Assets visuels ---------------------------------------------------
// ready:false  → placeholder visible « REMPLACER PAR ... »
// ready:true   → le fichier public/assets/<file> est affiché.
export const ASSETS = {
  logo: {file: 'assets/utify-logo.png', ready: false, label: 'LOGO RÉEL UTIFY'},
  captureApp: {file: 'assets/capture-app.png', ready: false, label: 'CAPTURE RÉELLE DE LA PLATEFORME'},
  captureStoreDesktop: {file: 'assets/capture-store-desktop.png', ready: false, label: "CAPTURE RÉELLE D'UNE BOUTIQUE (desktop)"},
  captureStoreMobile: {file: 'assets/capture-store-mobile.png', ready: false, label: "CAPTURE RÉELLE D'UNE BOUTIQUE (mobile)"},
};

// --- Audio ------------------------------------------------------------
// SFX : générés automatiquement par `npm run sfx` (scripts/generate-sfx.mjs),
// qui écrit les .wav dans public/assets/ ET passe ready à true dans ce
// fichier pour les 6 pistes ci-dessous.
// Musique : à fournir séparément (libre de droits, ~30 s, sans paroles) ;
// rester à ready:false jusqu'au dépôt du fichier dans public/assets/.
export const AUDIO = {
  music:        {file: 'assets/music.mp3',        ready: false, volume: 0.55},
  whooshIntro:  {file: 'assets/whoosh-intro.wav', ready: false, volume: 0.7},
  whooshReveal: {file: 'assets/whoosh-reveal.wav', ready: false, volume: 0.8},
  uiPop:        {file: 'assets/ui-pop.wav',       ready: false, volume: 0.6},
  uiPop2:       {file: 'assets/ui-pop-2.wav',     ready: false, volume: 0.55},
  whooshShare:  {file: 'assets/whoosh-share.wav', ready: false, volume: 0.7},
  hitLogo:      {file: 'assets/hit-logo.wav',     ready: false, volume: 0.9},
};

// Zones sûres 9:16 (UI plateformes + sous-titres) — utilisées pour la mise en page.
export const SAFE_9x16 = {top: 220, bottom: 340, side: 90};
