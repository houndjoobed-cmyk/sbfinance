# Salem Braha Finance (SBF) - Site Vitrine Institutionnel

![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)

Site vitrine officiel de **Salem Braha Finance (SBF)**, une institution de microfinance béninoise œuvrant pour l'inclusion financière depuis 15 ans. Ce projet vise à présenter l'institution, ses produits (épargne, crédit, appui, conseil) et son réseau d'agences via une interface web moderne, performante et accessible.

## 🎯 Objectifs du Projet

- **Présentation Institutionnelle :** Un espace dédié pour afficher la mission, la vision et les valeurs de SBF.
- **Catalogue de Produits :** Fiches détaillées et dynamiques des produits financiers avec un langage clair pour les utilisateurs.
- **Réseau d'Agences :** Carte interactive (Leaflet) listant les points de service de l'institution au Bénin.
- **Tableau de Bord Administrateur :** Espace sécurisé permettant à l'équipe SBF de mettre à jour le contenu (actualités, agences, produits) et de gérer les demandes de contact de manière autonome, sans compétences techniques.

## 🛠️ Stack Technique

- **Frontend :** [Next.js 14+](https://nextjs.org/) (App Router) + TypeScript
- **Style & UI :** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) pour des composants accessibles et personnalisés à la charte.
- **Backend & Base de données :** [Supabase](https://supabase.com/) (PostgreSQL + Auth + Storage)
- **ORM :** [Prisma](https://www.prisma.io/)
- **Carte Interactive :** Leaflet (OpenStreetMap)
- **Envoi d'e-mails :** Resend (notification des demandes de contact)
- **Hébergement :** Déploiement optimisé sur Vercel (Frontend) et Supabase (Backend) pour un coût minimal.

## 🚀 Fonctionnalités Clés

### Côté Client (Public)
- **Accueil Dynamique :** Carrousel automatique, présentation des chiffres clés animés, aperçu des produits et témoignages.
- **Pages Statiques (SSG/ISR) :** Rendu optimisé pour des temps de chargement ultra-rapides, essentiels pour les connexions mobiles moyennes (3G/4G).
- **SEO & Accessibilité :** Structure HTML sémantique, balises meta optimisées et respect du `prefers-reduced-motion`.
- **Contact & Localisation :** Formulaire de contact fonctionnel avec notifications par email, accès rapide WhatsApp et carte interactive des agences.

### Côté Administrateur (Dashboard)
- **Gestion de Contenu (CMS sur-mesure) :** Création, modification et suppression structurée des produits de crédit, des agences, des témoignages et des actualités (pas d'édition JSON brute).
- **Suivi des Contacts :** Interface pour consulter et marquer comme traitées les demandes issues du formulaire de contact.
- **Authentification Unique :** Un compte admin sécurisé géré par Supabase Auth.

## 📦 Installation et Lancement en Local

### Prérequis
- Node.js (v18+)
- npm, yarn ou pnpm
- Un projet [Supabase](https://supabase.com/) configuré avec PostgreSQL
- Une clé d'API [Resend](https://resend.com/)

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone <url-du-depot>
   cd SBF_site
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   # ou yarn install / pnpm install
   ```

3. **Configurer les variables d'environnement :**
   Copiez le fichier `.env.example` vers `.env` (à la racine) et renseignez les valeurs :
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=votre_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_supabase_anon_key
   
   # Prisma
   DATABASE_URL=votre_supabase_postgres_connection_string
   DIRECT_URL=votre_supabase_postgres_direct_url
   
   # Resend
   RESEND_API_KEY=votre_cle_api_resend
   ```

4. **Initialiser la base de données (Prisma) :**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

## 📊 Performances et Optimisation

Ce projet respecte des contraintes de performances strictes pour s'adapter au contexte réseau local au Bénin :
- **Poids minimal :** Moins de 1.5 Mo en première visite (fichiers JS/CSS et images compris).
- **Images optimisées :** Utilisation systématique du composant `next/image` pour le WebP/AVIF.
- **Lazy-loading :** Chargement différé pour la carte interactive (`next/dynamic`, `ssr: false`) et les animations UI.
- **Score Lighthouse ciblé :** ≥ 90 (Performance, Accessibilité, SEO).

## 📄 Licence et Droits
Projet propriétaire développé pour le compte de **Salem Braha Finance (SBF)**. Tous droits réservés.
