# AGENTS.md — Site vitrine Salem Braha Finance (SBF)

Document de spécifications destiné à un agent IA de développement (Antigravity ou équivalent). Il définit le contexte projet, les règles techniques, les contraintes de performance, le design attendu et la structure complète des pages. À suivre comme référence unique tout au long de la construction du site.

---

## 1. Contexte projet

**Client** : Salem Braha Finance (SBF), institution de microfinance au Bénin, 15 ans d'existence, SARL au capital de 138 000 000 FCFA.

**Objectif** : site vitrine institutionnel (pas d'espace client, pas de transaction en ligne) présentant l'institution, ses produits et son réseau d'agences, avec un dashboard admin permettant de tout modifier sans compétence technique.

**Budget** : 600 000 FCFA — délai : 4 semaines. Cette contrainte impose une stack légère, peu de dépendances payantes, et un hébergement à coût minimal (Vercel + Supabase plan gratuit).

**Piloté par** : Direction Marketing, Communication et Vente de SBF.

**Identité institutionnelle**
- Slogan : *"Cultivons la prospérité"* / *"Osez entreprendre, nous finançons la suite"*
- Mission : contribuer à l'amélioration des conditions de vie des personnes à faible revenu (notamment les femmes des zones urbaines et rurales) via des services financiers et non financiers adaptés et durables
- Vision : être une institution de microfinance leader dans la finance inclusive, responsable et environnementale au Bénin à l'horizon 2035
- Valeurs : Respect, Intégrité, Efficacité
- Agrément N° A.20.0126.L — RCCM RB/COT/11 B 8264 — IFU 3201101797911
- Contact : BP 317, +229 01 21 38 05 87 / 01 61 09 20 32, contact@sbfinance.bj, WhatsApp +229 01 28 30 59 76
- Siège social : ZOGBO Carré 553 Lot 1907 M 072, Arconville / Abomey-Calavi

---

## 2. Stack technique

| Couche | Choix | Justification |
|---|---|---|
| Frontend | Next.js 14+ (App Router) + TypeScript | SSR/SSG natif → SEO fort, base solide pour évoluer en application |
| Style | Tailwind CSS + shadcn/ui | Rapide à personnaliser à la charte SBF, composants accessibles par défaut |
| Backend / DB | Supabase (PostgreSQL) | Auth intégrée (admin), storage d'images, Row Level Security prête pour l'avenir |
| ORM | Prisma | Modélisation propre des tables (produits, agences, actualités...) |
| Carte | Leaflet + OpenStreetMap | Gratuit, suffisant pour 5 points de service (pas de coût d'API comme Google Maps) |
| Email formulaire | Resend | Notification des demandes de contact/rappel |
| Hébergement | Vercel (frontend) + Supabase (DB/Auth/Storage) | Coût quasi nul, cohérent avec le budget |

**Rôle admin unique** : un seul compte administrateur (Supabase Auth) avec accès total au dashboard. Pas de gestion de rôles multiples dans cette V1.

---

## 3. Règles de performance — site léger

Le site doit rester rapide même sur connexion mobile 3G/4G moyenne (contexte Bénin). Règles non négociables :

1. **Images optimisées** : toujours passer par `next/image`, jamais de `<img>` brut. Formats WebP/AVIF systématiques. Lazy loading par défaut sauf image hero (priority).
2. **Poids des pages** : viser < 1.5 Mo par page (JS + CSS + images) en première visite, < 500 Ko en navigation suivante (cache).
3. **Fonts** : maximum 2 familles de polices, chargées via `next/font` (self-hosted, pas de requête externe vers Google Fonts au runtime).
4. **Rendu** : pages statiques (SSG/ISR) pour Accueil, Qui sommes-nous, Nos produits, Notre réseau — régénérées à intervalle (revalidate) plutôt qu'en SSR pur, pour limiter la charge serveur.
5. **JS minimal côté client** : aucune librairie lourde non utilisée. Pas de framework d'animation lourd (voir section 4) — privilégier CSS/Framer Motion en chargement différé.
6. **Carte interactive** : chargée en `dynamic import` (`next/dynamic`, `ssr: false`) pour ne pas peser sur le chargement initial de la page Notre réseau.
7. **Pas de dépendances inutiles** : avant d'ajouter un package npm, vérifier qu'il n'existe pas déjà une solution native Next.js/Tailwind.
8. **Score cible** : Lighthouse ≥ 90 sur Performance, Accessibilité, SEO et Bonnes pratiques, mesuré sur mobile.

---

## 4. Design, animations et expérience utilisateur

### 4.1 Utiliser les skills disponibles

Avant toute création de composant UI, consulter et appliquer les skills disponibles dans l'environnement — il définit les tokens de design, la typographie et les contraintes de style à respecter pour un rendu non générique. Ne pas partir sur des styles par défaut de shadcn/ui sans y passer.

### 4.2 Bannières et sections hero
- Le hero de la page Accueil (et les bannières secondaires des autres pages) doivent afficher un **carrousel d'images en défilement automatique** :
  - Rotation automatique toutes les 5 à 6 secondes
  - Transition en fondu (fade) ou glissement (slide) fluide, jamais de coupure brute
  - Pause au survol (desktop) et navigation tactile (swipe) sur mobile
  - Indicateurs de position (dots) cliquables
  - Contenu texte (titre, sous-titre, CTA) superposé, lisible sur toutes les images (overlay sombre semi-transparent si nécessaire)
- Implémentation recommandée : Embla Carousel (léger, ~6 Ko gzippé) ou solution CSS native avec `scroll-snap` — éviter Swiper.js qui est plus lourd que nécessaire ici.

### 4.3 Animations
- Utiliser des animations fluides et discrètes pour renforcer l'expérience sans nuire à la performance :
  - Apparition progressive des sections au scroll (fade-in + léger slide-up), via `Intersection Observer` ou Framer Motion en lazy load
  - Transitions douces sur les boutons, cartes produits et liens (hover, focus) — 150–250ms, easing `ease-out`
  - Chiffres clés (bloc "15 ans d'existence", nombre d'agences...) animés en compteur montant au premier affichage
  - Aucune animation ne doit bloquer le rendu initial (respecter `prefers-reduced-motion` pour l'accessibilité)
- Garder les animations sobres et professionnelles — cohérent avec un site institutionnel financier, pas un site événementiel.

### 4.4 Responsive
- Mobile-first obligatoire (rappel du plan client : grande partie du trafic vient du mobile)
- Breakpoints Tailwind standards (sm/md/lg/xl)
- Menu principal en burger sur mobile avec accès rapide WhatsApp toujours visible (bouton flottant ou fixe)

---

## 5. Structure des pages

### 5.1 Accueil
1. Header — logo, navigation, bouton WhatsApp visible
2. Hero — carrousel automatique (voir 4.2), slogan, CTA "Découvrir nos produits" / "Nous contacter"
3. Bloc chiffres clés animés — 15 ans d'existence, nombre d'agences, nombre de clients, agrément affiché
4. Aperçu Mission/Vision — résumé court + lien "En savoir plus"
5. Nos produits (aperçu) — 5 cartes (Épargne, Crédit, Appui, Conseil, Formation)
6. Actualités récentes — 3 dernières publications
7. Témoignages clients — carrousel
8. Aperçu réseau — mini-carte ou liste des 5 points de service
9. Footer — coordonnées complètes, RCCM/IFU, réseaux sociaux, liens rapides

### 5.2 Qui sommes-nous
1. Bannière (photo siège)
2. Histoire (texte à obtenir)
3. Mission (texte complet)
4. Vision (texte complet)
5. Valeurs — Respect, Intégrité, Efficacité
6. "SB Finance c'est..." — Formation, Éducation Financière, Assurance Conseil
7. Gouvernance (à obtenir)
8. Bloc agrément et sécurité — N° A.20.0126.L, RCCM, IFU

### 5.3 Nos produits
**Niveau 1** — 5 catégories : Épargne, Crédit, Appui, Conseil, Formation (fiches courtes, contenu à obtenir pour les 4 hors Crédit)

**Niveau 2** — Crédit, 3 sous-catégories :
1. Besoin de fonds de roulement : CG, GCS, CICP, CC
2. Crédit à la consommation : CF, SA, CP, CMP, CA
3. Crédit Cause : CBC, CAF

**Niveau 3** — fiche produit dynamique (`/produits/credit/[slug]`), générée depuis la base de données, reformulée en langage client (pas le jargon administratif brut) :
- Nom, description/objet, cible
- Conditions d'éligibilité (liste à puces)
- Garantie exigée (résumé grand public — ne pas inclure les procédures internes type co-signature bancaire ou notification par huissier)
- Pièces à fournir (liste)
- Montant min/max, durée min/max
- Taux d'intérêt annuel, périodicité de remboursement
- CTA "Simuler / Se renseigner en agence"

⚠️ Ne jamais exposer publiquement : méthodologie interne de traitement des dossiers, procédures de co-signature bancaire, pénalités détaillées par tranche (peuvent être résumées ou données en agence uniquement).

### 5.4 Notre réseau
1. Carte interactive (Leaflet, dynamic import) — 5 points de service géolocalisés
2. Liste des agences : Arconville, Zogbo, Tankpè, Togba, Division Crédit aux Fonctionnaires — nom, adresse, téléphones, horaires (à obtenir)
3. Bouton "Appeler" / WhatsApp par fiche agence

### 5.5 Actualités / Blog
1. Liste des articles (vignette, titre, date, extrait, catégorie)
2. Filtre par catégorie
3. Page article détail
4. Articles similaires en fin de page

### 5.6 Contact
1. Formulaire (nom, téléphone, email optionnel, message, agence de préférence) → stocké en base + notification email (Resend)
2. Coordonnées complètes
3. Bouton WhatsApp direct
4. Liens réseaux sociaux
5. Mini-carte du siège social

---

## 6. Modèle de données (aperçu)

Tables Prisma à prévoir (schéma détaillé à affiner en phase de build) :

- `produits_credit` — champs structurés incluant listes JSON pour conditions, pièces à fournir, précisions — un seul modèle pour les 11 produits de crédit plutôt que 11 pages codées en dur
- `produits` — Épargne, Appui, Conseil, Formation (contenu plus simple, non tabulaire)
- `agences` — nom, adresse, coordonnées GPS, téléphones, horaires
- `actualites` — titre, contenu, image, date, catégorie
- `temoignages` — nom, texte, photo (optionnelle)
- `demandes_contact` — soumissions du formulaire, statut traité/non traité
- `parametres_site` — contenu éditable transverse (mission, vision, valeurs, chiffres clés, coordonnées)
- `admin_users` — un seul compte admin (Supabase Auth)

---

## 7. Dashboard admin

- Authentification simple (email/mot de passe via Supabase Auth), un seul rôle admin
- Interface de gestion pour chaque table listée en section 6, avec formulaires adaptés (pas d'édition JSON brute pour l'admin — champs structurés type "ajouter une condition", "ajouter une pièce à fournir")
- Liste des demandes de contact avec marquage traité/non traité
- Paramètres SEO de base par page (titre, meta description)
- Simplicité d'usage prioritaire sur la richesse fonctionnelle — l'admin n'a pas de compétence technique

---

## 8. Contenus manquants à obtenir avant mise en production

- Nombre exact de clients
- Historique / fondation de SBF
- Gouvernance (organigramme ou liste dirigeants)
- Descriptions détaillées des produits Épargne, Appui, Conseil, Formation
- Horaires d'ouverture par agence
- Témoignages clients réels (texte + autorisation d'usage du nom/photo)
- Coordonnées GPS précises des 5 points de service

Tu as maintenant tout ce qu'il faut pour construire le site dans le dossier du projet les pdf sont aussi à ta disposition.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
