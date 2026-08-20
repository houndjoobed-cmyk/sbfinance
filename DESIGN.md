# DESIGN.md — Salem Braha Finance (SBF)

## 1. Objet

Ce document transforme la charte graphique de Salem Braha Finance en règles exploitables pour la conception et le développement du site web.

Il couvre : identité, couleurs, typographie, logo, direction artistique, composants, responsive, accessibilité, animations et principes UX.

> **Principe directeur :** prolonger l'identité SBF sur le web sans la dénaturer. La charte reste la source de vérité pour le logo, les couleurs officielles et la typographie.

## 2. Identité de marque

**Nom :** Salem Braha Finance  
**Sigle :** SBF

La charte présente l'identité visuelle comme un cadre destiné à assurer une perception cohérente, qualitative et authentique de la marque auprès des clients, partenaires et du public.

Le site doit transmettre une image : professionnelle, fiable, claire, structurée, institutionnelle et cohérente.

## 3. Couleurs

### 3.1 Couleurs officielles

#### Bleu SBF

```text
HEX  : #01438F
RGB  : 1, 67, 143
CMJN : C100 M83 J13 N2
```

**Usage recommandé :** couleur primaire, navigation, titres importants, boutons principaux, liens, fonds de sections fortes et états actifs.

#### Rouge SBF

```text
HEX  : #EB001B
RGB  : 235, 0, 27
CMJN : C0 M100 J100 N0
```

**Usage recommandé :** accent, appels à l'action prioritaires, éléments importants et indicateurs visuels ponctuels.

> Le rouge doit rester une couleur d'accent et ne doit pas dominer l'interface.

### 3.2 Couleurs fonctionnelles web

La charte fournit officiellement le bleu et le rouge comme couleurs de marque. Les couleurs suivantes sont des propositions fonctionnelles pour le système UI web :

```text
Blanc principal : #FFFFFF
Fond secondaire : #F5F7FA
Bordure         : #E2E6EA
Texte principal : #1F2937
Texte secondaire: #667085
Texte désactivé : #98A2B3
```

Priorité visuelle : **neutres → bleu SBF → rouge SBF**.

## 4. Typographie

La charte utilise désormais **Open Sans**.

### Open Sans Bold

Pour : titres, sous-titres importants, boutons, informations mises en avant et navigation nécessitant une emphase.

### Open Sans Regular

Pour : paragraphes, descriptions, informations secondaires, formulaires et contenus longs.

### Échelle web recommandée

| Élément | Desktop | Mobile | Graisse |
|---|---:|---:|---|
| Hero H1 | 48–64 px | 36–42 px | Bold |
| H2 | 36–44 px | 28–32 px | Bold |
| H3 | 24–30 px | 22–24 px | Bold |
| H4 | 20–22 px | 18–20 px | Bold |
| Body large | 18 px | 17 px | Regular |
| Body | 16 px | 16 px | Regular |
| Small | 14 px | 14 px | Regular |
| Caption | 12 px | 12 px | Regular |

Cette échelle est une adaptation web ; la charte ne définit pas ces tailles en pixels.

## 5. Logo

La charte définit le symbole, le mot-symbole, le logotype, les variations, la version monochrome, le motif et les règles de protection, dimension et positionnement.

### Taille minimale

La charte précise une utilisation à **15 mm minimum** afin de préserver la lisibilité.

Sur le web, conserver une taille équivalente permettant une lecture claire sur desktop et mobile.

### Protection

Préserver un espace de respiration autour du logo. Ne jamais coller le logo à un autre élément, réduire son espace de protection ou le déformer.

### Interdictions

Ne pas étirer, comprimer, pivoter, recolorer arbitrairement, ajouter des effets non prévus ou utiliser un arrière-plan réduisant fortement son contraste.

## 6. Direction artistique

### Style général

**Moderne · Institutionnel · Professionnel · Clair · Rassurant**

Privilégier une interface blanche, aérée et structurée. Éviter la surcharge, les animations agressives, les effets 3D inutiles, les dégradés omniprésents et les éléments décoratifs sans fonction.

### Espace

Utiliser des sections bien séparées, des marges généreuses, des grilles équilibrées et des espaces blancs importants.

## 7. Architecture visuelle

### Header

Structure recommandée :

```text
[LOGO SBF]   Accueil   À propos   Services   Solutions   Contact   [CTA]
```

Fond blanc ou très clair, logo visible, navigation simple, état actif bleu SBF et CTA principal bleu.

### Hero

Le hero doit expliquer rapidement ce que fait SBF, sa proposition de valeur et l'action principale.

```text
[Titre principal]
[Proposition de valeur]
[CTA principal] [CTA secondaire]
                         [Visuel]
```

H1 bleu SBF, texte gris foncé, CTA principal bleu et visuel professionnel.

### Sections

Utiliser une alternance légère :

```text
Section A → #FFFFFF
Section B → #F5F7FA
Section C → #FFFFFF
```

Les sections fortes peuvent utiliser ponctuellement le bleu SBF.

## 8. Cards

Les cartes doivent rester simples et professionnelles : fond blanc, bordure légère ou ombre discrète, rayon modéré, titre bleu ou foncé, icône bleue et interaction subtile.

Éviter les cartes excessivement arrondies ou fortement ombrées.

## 9. Boutons

### Primary

```text
Background : #01438F
Text       : #FFFFFF
```

Pour les actions principales.

### Accent

```text
Background : #EB001B
Text       : #FFFFFF
```

À réserver aux actions nécessitant une attention particulière.

### Secondary

```text
Background : transparent
Border     : #01438F
Text       : #01438F
```

Les états hover, focus et active doivent rester sobres et fluides.

## 10. Formulaires

Les formulaires doivent inspirer confiance : fond blanc, bordure gris clair, texte foncé, labels visibles et focus bleu SBF.

```text
Focus : #01438F
Erreur: #EB001B
```

Le rouge sert à signaler l'erreur, pas à colorer tout le formulaire.

## 11. Chiffres clés

Une section de statistiques peut utiliser le bleu SBF en arrière-plan, avec chiffres et labels blancs.

Les données publiées doivent être réelles et validées avant mise en ligne.

## 12. Images

Privilégier des images professionnelles, lumineuses, naturelles et liées à la finance, aux entreprises, aux entrepreneurs ou aux clients.

Éviter les filtres excessifs, les visuels trop saturés et les images génériques sans rapport avec la marque.

Pour le logo sur image : préserver lisibilité, contraste et espace autour du logo, conformément aux règles de la charte.

## 13. Icônes

Style recommandé : simple, linéaire ou minimal, cohérent et professionnel. Les icônes utilisent principalement le bleu SBF ; le rouge reste ponctuel.

## 14. Responsive

Breakpoints recommandés :

```text
Mobile  : 320–767 px
Tablet  : 768–1023 px
Desktop : 1024 px et plus
```

Le logo doit rester lisible, les boutons accessibles, les grilles adaptatives et les cartes doivent passer en colonne sur petit écran.

## 15. Grille et espacements

Une base de grille de 8 px est recommandée :

```text
4 px   → micro-spacing
8 px   → petit spacing
16 px  → standard
24 px  → séparation
32 px  → séparation importante
48 px  → grande séparation
64 px  → section
96 px  → grande section
```

Ces valeurs sont des recommandations web et non des règles présentes dans la charte.

## 16. Rayons et ombres

Rayons recommandés :

```text
Small  : 4 px
Medium : 8 px
Large  : 12 px
```

Utiliser des ombres très discrètes. Éviter le glassmorphism ou les effets de profondeur excessifs.

## 17. Animations

Les animations doivent être rapides, fluides, discrètes et fonctionnelles : apparition progressive, hover, transitions de menu et mouvements légers.

Éviter les animations permanentes, rapides ou spectaculaires.

## 18. Accessibilité

Maintenir un contraste suffisant entre texte et arrière-plan, boutons et texte, logo et arrière-plan. Ne jamais faire reposer une information uniquement sur la couleur.

Les formulaires doivent avoir des labels compréhensibles.

## 19. États des composants

Chaque composant interactif doit prévoir au minimum :

```text
Default
Hover
Focus
Active
Disabled
Error
Success
```

## 20. Principes UX

### Clarté
L'utilisateur comprend rapidement l'offre.

### Confiance
Le design communique sérieux et professionnalisme.

### Simplicité
Chaque élément a une fonction.

### Hiérarchie
Les informations importantes sont immédiatement visibles.

### Conversion
Les CTA sont faciles à identifier.

### Cohérence
Un même composant conserve le même comportement partout.

## 21. Tokens CSS recommandés

```css
:root {
  --color-primary: #01438F;
  --color-accent: #EB001B;
  --color-white: #FFFFFF;
  --color-background: #F5F7FA;
  --color-text: #1F2937;
  --color-text-secondary: #667085;
  --color-border: #E2E6EA;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
}
```

Les couleurs de marque et la typographie proviennent de la charte. Les autres tokens sont des recommandations pour l'implémentation web.

## 22. Architecture de composants recommandée

```text
components/
├── layout/
│   ├── Header
│   ├── Footer
│   ├── Container
│   └── Section
├── navigation/
│   ├── Navbar
│   ├── MobileMenu
│   └── Breadcrumb
├── ui/
│   ├── Button
│   ├── Card
│   ├── Badge
│   ├── Input
│   ├── Select
│   ├── Textarea
│   ├── Modal
│   └── Alert
├── sections/
│   ├── Hero
│   ├── Services
│   ├── Statistics
│   ├── About
│   ├── CTA
│   └── Contact
└── media/
    ├── Image
    ├── Gallery
    └── Logo
```

## 23. Checklist de validation

- [ ] Logo conforme à la charte.
- [ ] Bleu `#01438F` correctement utilisé.
- [ ] Rouge `#EB001B` réservé aux accents.
- [ ] Open Sans Bold / Regular respectées.
- [ ] Hiérarchie des titres claire.
- [ ] CTA identifiables.
- [ ] Espaces suffisants.
- [ ] Composants cohérents.
- [ ] Responsive mobile validé.
- [ ] Images compatibles avec le logo.
- [ ] Animations discrètes.
- [ ] Contraste suffisant.

## 24. Synthèse

Le site Salem Braha Finance doit être **bleu, rouge, blanc, professionnel, institutionnel, clair, moderne et rassurant**.

```text
PRIMARY  = #01438F
ACCENT   = #EB001B
HEADINGS = Open Sans Bold
BODY     = Open Sans Regular
```

**Règle fondamentale :** ne pas créer une nouvelle identité visuelle. Construire une expérience web moderne à partir de l'identité SBF existante.

## 25. Source et limites

Ce document est basé sur la **Charte Graphique Salem Braha Finance**. Les éléments explicitement définis dans la charte sont traités comme règles de marque. Les breakpoints, espacements, rayons, tokens CSS, architecture de composants et états UI sont des recommandations de design system web ajoutées pour faciliter l'implémentation et ne sont pas présentés comme des éléments officiellement définis par la charte.
