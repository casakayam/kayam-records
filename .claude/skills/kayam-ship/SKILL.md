---
name: kayam-ship
description: Vérifier, committer, pousser et mettre en ligne les modifications du site Kayam Records (GitHub casakayam/kayam-records → Netlify → kayamrecords.com), puis contrôler le site live. À utiliser quand l'utilisateur dit « mets en ligne », « publie », « déploie », « pousse sur GitHub », « fais une PR », « commit », « c'est bon on envoie », ou demande si une modif est visible en ligne.
---

# Mettre en ligne kayamrecords.com

Chaîne : branche locale → push GitHub → PR → merge dans `main` → Netlify build (`npm run build`, publie `dist/public`) → Cloudflare → https://kayamrecords.com

## 0. Prérequis accès (à vérifier une fois par session)

```bash
gh auth status
gh repo view casakayam/kayam-records --json viewerPermission
```
Il faut `WRITE`, `MAINTAIN` ou `ADMIN` (le compte `hifago` a `WRITE` depuis le 2026-11-17). Si c'est retombé à `READ`, on ne peut pas pousser : demander à l'utilisateur soit d'inviter `hifago` comme collaborateur (GitHub → casakayam/kayam-records → Settings → Collaborators), soit de se connecter avec le compte `casakayam` (`gh auth login`, puis `gh auth setup-git`). Ne jamais saisir de mot de passe/token soi-même.

## 1. Vérifier

```bash
npx tsc --noEmit          # seule erreur tolérée : BuildPackage.tsx:208 (préexistante)
npx vite build            # compile sans lancer optimize-images.cjs
git status --short        # aucune image recompressée par erreur, pas de dist/
```
Contrôle visuel dans l'aperçu `kayam-dev` : desktop + mobile, EN/ES, console.

## 2. Committer sur une branche

- Si on est sur `main` : `git switch -c <type>/<sujet-court>` (ex. `content/prix-2027`, `fix/mobile-hero`).
- Messages de commit courts, en anglais, au format du repo (`fix: …`, `chore: …`, `SEO: …`, `content: …`).
- Committer uniquement quand l'utilisateur l'a demandé ; ne jamais committer `.env`, `dist/`, `node_modules/`.

## 3. Pousser et ouvrir la PR

```bash
git push -u origin HEAD
gh pr create --repo casakayam/kayam-records --base main --fill
```
Netlify génère normalement une *deploy preview* sur la PR : donner son lien à l'utilisateur pour validation.

## 4. Merger (seulement avec accord explicite)

```bash
gh pr merge <n> --repo casakayam/kayam-records --squash --delete-branch
git switch main && git pull
```

## 5. Contrôler le live

Netlify met ~1-3 min. Ensuite :
```bash
curl -s https://kayamrecords.com | grep -o 'assets/index-[^"]*\.js'
```
Le nom du bundle doit changer par rapport à avant. Ouvrir https://kayamrecords.com dans le navigateur intégré pour vérifier la modification. Si Cloudflare sert l'ancienne version, attendre ou demander à l'utilisateur de purger le cache Cloudflare.
