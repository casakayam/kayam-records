---
name: kayam-brand
description: Charte graphique et ton éditorial de Kayam Records (couleurs, polices, éléments graphiques, photos, voix EN/ES). À utiliser avant toute modification visuelle ou rédactionnelle du site kayamrecords.com — nouvelle section, changement de design, couleur, police, bouton, image, texte marketing, ou quand l'utilisateur dit « c'est pas dans l'esprit Kayam », « fais plus joli », « change le style ».
---

# Charte Kayam Records

Source complète : `docs/brand-guidelines.md`. Résumé opérationnel :

## Couleurs (hex exacts, déjà utilisés en inline dans le code)

| Rôle | Hex | Usage |
|---|---|---|
| Beige | `#e4e2dd` | fond principal (55-65 %) — éviter le blanc pur |
| Crème | `#fbf9f4` | fond des sections à filigrane (Hero, Services) |
| Ink | `#1a1a1a` / Noir `#000` | texte, footer |
| Orange vif | `#e63f0a` | titres d'accent, CTA (7-15 %) |
| Orange chaud | `#e6740a` | hover |
| Terracotta | `#ad410c` | pressed/active |
| Vert forêt | `#074242` | accents nature |
| Teal / teal clair | `#0d6969` / `#0c8686` | liens, highlights |
| Taupe | `#bbb3a0` | fonds secondaires |

Interdit : orange sur vert forêt. Combo signature : orange sur beige.

## Typographie

- **Anton** — titres H1, MAJUSCULES.
- **Allura** (script, remplace Brittany) — sous-titres/accents en minuscules, orange (ex. « records » sous KAYAM).
- **Akshar** — corps de texte et boutons (boutons : 600, uppercase, letter-spacing ~0.14em).
- **DM Mono** — labels, données, petites mentions (uppercase, letter-spacing ~0.18em, 10-12px).

N'ajouter aucune autre police. Elles sont chargées dans `client/index.html`.

## Éléments graphiques existants (réutiliser)

Taches de peinture `/assets/tache-*.png|webp` (orange, teal, forest, ink, taupe), filigrane `guatape-watermark`, papier froissé `crumpled_paper`, overlay VHS global (`VHSOverlay`), animations Framer Motion douces (`ease: [0.22, 1, 0.36, 1]`, apparition `opacity 0→1, y 24→0`, `viewport once`).
Textures/cercles en arrière-plan, jamais au premier plan. Asymétrie maîtrisée, marges généreuses.

## Photos

N&B contrasté ou couleurs naturelles désaturées ; studio en action, nature, communauté, concerts ; lumière naturelle. Pas de poses artificielles, filtres saturés ou photos touristiques génériques.

## Ton éditorial

Chaleureux et analytique, jamais corporate. Pair à pair, direct, inspirant, concret. Tutoiement en ES (« Descubre », « tu música »). Toujours écrire EN + ES.

## Check avant de livrer un changement visuel

1. Couleurs prises dans le tableau ci-dessus (pas de nouvelles teintes).
2. Polices limitées aux 4 ci-dessus.
3. Rendu vérifié dans l'aperçu en desktop et en mobile (375px) — pas de scroll horizontal.
4. Textes présents dans les deux langues (bouton EN/ES du header).
