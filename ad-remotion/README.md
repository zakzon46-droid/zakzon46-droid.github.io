# Publicité UTIFY — Projet Remotion (30 s)

Master publicitaire 16:9 (1920×1080) et 9:16 (1080×1920), 30 fps, 900 images.
Dossier autonome : tout le code vidéo vit dans `ad-remotion/`, isolé du site
GitHub Pages à la racine du dépôt (branche dédiée `remotion-ad`).

## Démarrage rapide (Codespaces)

1. Ouvrir le dépôt sur la branche **`remotion-ad`**
2. Menu **Code** → **Codespaces** → **Create codespace on remotion-ad**
3. Dans le terminal du Codespace :

```bash
cd ad-remotion
npm install
npm run dev            # Studio Remotion — prévisualisation dans le navigateur
```

## Rendu des MP4

```bash
cd ad-remotion
npm run render:16x9    # → out/utify-ad-16x9.mp4 (1920×1080, 30 fps, H.264)
npm run render:9x16    # → out/utify-ad-9x16.mp4 (1080×1920, 30 fps, H.264)
```

Les MP4 apparaissent dans `ad-remotion/out/`. Dans un Codespace, clic droit
sur le fichier → **Download** pour le récupérer sur votre téléphone/PC.

## Ajouter les médias réels

Déposer les fichiers dans `ad-remotion/public/assets/` (noms exacts dans
`ad-remotion/src/config.js`) puis passer `ready: true` :

- `utify-logo.png` — logo réel (exposé publiquement sur utify.site/utify-logo.png — à faire valider par le client)
- `capture-app.png` — capture réelle de la plateforme
- `capture-store-desktop.png` / `capture-store-mobile.png` — captures réelles d'une boutique
- `music.mp3`, `whoosh-intro.mp3`, `whoosh-reveal.mp3`, `ui-pop.mp3`, `whoosh-share.mp3`, `hit-logo.mp3` — audio libre de droits

Tant que `ready: false` : la vidéo affiche des placeholders marqués
« REMPLACER PAR … » (qui ne sont PAS des captures d'UTIFY) et aucun son.

## Modifier textes, couleurs, timings

Tout est centralisé dans `ad-remotion/src/config.js`
(TEXTS, TEXTS_AR, COLORS, SCENES, ASSETS, AUDIO).

- Couleur d'accent actuelle (`#3ECF8E`) : PROVISOIRE — à extraire du vrai logo.
- Version arabe : traduction à valider par un locuteur natif avant usage
  (activer en remplaçant `TEXTS` par `TEXTS_AR` + `direction:'rtl'`).

## Avertissements

- Tous les textes publicitaires sont des PROPOSITIONS À VALIDER par UTIFY.
- Les affirmations « n°1 en Algérie » et « 0 DZD » (présentes sur le site
  public) ne sont PAS utilisées sans approbation explicite du client.
- Aucune fonctionnalité (paiements, livraison, stocks, commandes,
  automatisation) n'est représentée, faute de vérification.
- Zones sûres 9:16 : bande centrale conservée (~220 px haut, 340 px bas,
  90 px côtés) pour l'UI des plateformes et sous-titres.
- NOTE : ce dépôt est servi par GitHub Pages — NE PAS fusionner cette
  branche vers `main` sans retirer `node_modules`/`out` (déjà ignorés
  par `ad-remotion/.gitignore`), et garder le projet dans `ad-remotion/`.
