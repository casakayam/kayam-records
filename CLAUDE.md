# Kayam Records — site vitrine (kayamrecords.com)

Landing page one-page du studio-résidence Kayam Records à Guatapé (Colombie), bilingue EN/ES.
Repo : `casakayam/kayam-records` (branche `main`). Site live : https://kayamrecords.com (Cloudflare devant, build Netlify via `netlify.toml`).

## Commandes

- `npm run dev` → http://localhost:3000 (Vite, hot reload). Dans l'app : aperçu `kayam-dev`.
- `npx tsc --noEmit` → typecheck. **1 erreur préexistante** dans `BuildPackage.tsx:208` (itération de Map, pas de `target` dans tsconfig) ; ne compter que les nouvelles erreurs.
- `npx vite build` → vérifier que le site compile **sans toucher aux images**.
- ⚠️ `npm run build` lance aussi `optimize-images.cjs`, qui **recompresse en place** les PNG/JPEG de `client/public/assets/` (perte de qualité cumulative + gros diff git). Ne pas le lancer en local, sauf demande explicite. Netlify le lance de toute façon à chaque déploiement.
- `npm start` utilise la syntaxe `NODE_ENV=production …` (ne marche pas sous PowerShell) ; inutile pour Netlify.

## Architecture

- `client/index.html` — SEO : meta, Open Graph, **JSON-LD** (studio, offres avec prix, FAQPage) et bloc `<noscript>` avec prix/texte pour les crawlers IA.
- `client/src/pages/Home.tsx` — assemble les sections (Hero/Header en direct, le reste en `React.lazy`), modal vidéo YouTube, footer inline.
- Sections : `Hero`, `WhyChooseKayamSection`, `Services`, `Accommodation`, `Testimonials`, `BuildPackage` (configurateur de package + formulaire).
- Non utilisés actuellement : `Footer.tsx`, `Booking.tsx`, `VideoSection.tsx`, `WhyChoosingKayam.tsx`, `ManusDialog.tsx`.
- `client/src/data/catalog.ts` — prix et items du configurateur (`BUNDLE_DISCOUNT` = 15 %).
- `client/src/data/translations.ts` + `contexts/LanguageContext.tsx` — clés `t('...')`. **Mais la plupart des textes sont en dur dans les composants** sous forme `language === 'en' ? '…' : '…'`.
- `client/src/components/ui/` — composants shadcn/Radix génériques, ne pas modifier sans raison.
- Styles : surtout inline `style={{…}}` + Tailwind 4 (`index.css`). Polices Google Fonts dans `index.html`.
- Formulaires : Web3Forms (`api.web3forms.com`, clé publique côté client, normal). Contact : WhatsApp `+57 321 576 4841`, `info@casakayam.com`.
- Images : `client/public/assets/` servies sous `/assets/…` ; versions `.webp` à côté des PNG/JPEG.

## Règles de travail

- **Toujours bilingue** : tout texte ajouté/modifié l'est en EN **et** ES.
- **Prix = 4 endroits à synchroniser** : `catalog.ts`, textes des composants (`Services`, `Accommodation`…), JSON-LD `Offer` + FAQ dans `index.html`, bloc `<noscript>`. Voir skill `kayam-content`.
- Charte graphique : skill `kayam-brand` (source : `docs/brand-guidelines.md`).
- Vérifier visuellement chaque changement dans l'aperçu (desktop + mobile 375px) avant de livrer.
- Mise en ligne : skill `kayam-ship` — branche → commit → push → PR → merge sur `main` → Netlify déploie. Jamais de push direct sur `main` sans accord.
- Accès GitHub : le compte `gh` connecté sur ce PC (`hifago`) est collaborateur avec droit **écriture** (accordé le 2026-11-17).
- Fichiers d'archives à ne pas éditer : `kayam_records_full_code.txt` (export généré par `export.cjs`), `stitch_*.html`, `ideas.md` (idées initiales obsolètes), `why_choose_kayam_images.zip`.
- Ressources business (tarifs xlsx, propositions PDF, photos) : dossier parent `../` (`Offres & tarifs`, `Site & ressources`).
