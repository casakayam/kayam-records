---
name: kayam-content
description: Modifier le contenu du site Kayam Records — textes EN/ES, prix et tarifs, offres/packages, témoignages, chambres/hébergement, photos, vidéo YouTube, numéro WhatsApp/email, FAQ et SEO associé. À utiliser dès que l'utilisateur demande de changer un texte, un prix, « mets à jour les tarifs », ajouter/remplacer une photo, ajouter un témoignage, une chambre, un service, ou corriger une traduction.
---

# Modifier le contenu de kayamrecords.com

Le contenu est éparpillé : il faut **toujours chercher toutes les occurrences** (`Grep`) avant de modifier, puis tout mettre à jour d'un coup.

## Où vit quoi

| Contenu | Fichier(s) |
|---|---|
| Prix + items du configurateur | `client/src/data/catalog.ts` (`PACKAGE_ITEMS`, `BUNDLE_DISCOUNT`) |
| Prix affichés dans les sections | `client/src/components/Services.tsx`, `Accommodation.tsx`, `BuildPackage.tsx` |
| Prix pour Google / IA | `client/index.html` : JSON-LD `Offer.priceSpecification`, réponses `FAQPage`, bloc `<noscript>` |
| Textes de sections | en dur dans chaque composant : `language === 'en' ? '…' : '…'` |
| Quelques clés `t()` | `client/src/data/translations.ts` |
| Hero (titre, intro, témoignage flottant) | `client/src/components/Hero.tsx` |
| Témoignages | `client/src/components/Testimonials.tsx` |
| Vidéo YouTube | `VIDEO_ID` dans `client/src/pages/Home.tsx` + JSON-LD `VideoObject` dans `index.html` |
| WhatsApp / email | `grep -rn "wa.me\|casakayam.com" client` (numéro actuel `573215764841`) |
| Footer affiché | inline dans `Home.tsx` (pas `Footer.tsx`, non utilisé) |
| Meta / titre / description / sitemap | `client/index.html`, `client/public/sitemap.xml` (`lastmod`) |

Sources métier de référence (hors repo) : `../Offres & tarifs/Tarifas Kayam Records.xlsx`, `../Site & ressources/`.

## Changer un prix — checklist

1. `Grep` le montant actuel (ex. `180`) et le nom du service dans `client/`.
2. Mettre à jour `catalog.ts`.
3. Mettre à jour les textes des composants concernés.
4. Mettre à jour `index.html` : `"price": "…"` de l'`Offer`, la réponse FAQ qui cite le prix, le `<noscript>`.
5. Mettre à jour `lastmod` de `sitemap.xml` à la date du jour.
6. Vérifier dans l'aperçu : section concernée + total du configurateur (remise bundle 15 %).

## Changer / ajouter un texte

- Toujours fournir EN **et** ES. Si l'utilisateur ne donne qu'une langue, traduire et le signaler.
- Respecter le ton (skill `kayam-brand`).
- Si le texte apparaît aussi dans le JSON-LD/FAQ/noscript de `index.html`, le synchroniser.

## Ajouter / remplacer une image

1. Copier la source dans `client/public/assets/` avec un nom en kebab-case sans espaces ni accents.
2. Redimensionner (largeur max ~1600px, 800px pour vignettes) et générer le `.webp` avec sharp, sans toucher aux autres images :
   ```bash
   node -e "const s=require('sharp');s('client/public/assets/NOM.jpg').resize({width:1600,withoutEnlargement:true}).webp({quality:80}).toFile('client/public/assets/NOM.webp')"
   ```
3. Référencer en `/assets/NOM.webp` avec un `alt` descriptif en anglais incluant « Guatapé » quand pertinent, `loading="lazy"` sauf above-the-fold.
4. Ne **pas** lancer `npm run build` (recompresse toutes les images en place).

## Vérification

- `npx tsc --noEmit` (ignorer l'erreur préexistante `BuildPackage.tsx:208`).
- Aperçu `kayam-dev` : basculer EN/ES, desktop + mobile 375px, console sans nouvelle erreur.
- Ensuite, pour publier : skill `kayam-ship`.
