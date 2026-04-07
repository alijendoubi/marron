# CLAUDE.md — Marron Pâtisserie · Catalogue Web

## 🎯 Contexte du Projet

**Marron** est une pâtisserie artisanale tunisienne qui vend ses créations via Instagram (`@marron.officialll`). L'objectif est de construire un **site vitrine catalogue** élégant, en une seule page (ou multi-pages légères), permettant aux clients de découvrir et commander les produits facilement.

- **Type** : Site vitrine catalogue (sans panier e-commerce complexe — commande via WhatsApp/DM Instagram)
- **Langue** : Français uniquement
- **Devise** : Dinar Tunisien (TND / DT)
- **Audience** : Femmes 18–40 ans, Tunisie, sensibles au beau, à l'artisanal et au sucré haut de gamme
- **Ton** : Chaleureux, artisanal, gourmand, élégant — jamais clinique ni corporate

---

## 🎨 Direction Artistique

### Palette de couleurs
Inspirée directement du nom **"Marron"** (brun en français) et de l'univers de la pâtisserie :

```css
--color-bg:         #FDF6EE;   /* Crème chaud — fond principal */
--color-surface:    #FFF9F2;   /* Blanc cassé légèrement chaud */
--color-marron:     #6B3A2A;   /* Marron profond — couleur signature */
--color-caramel:    #C8834A;   /* Caramel — accents chauds */
--color-gold:       #D4A94A;   /* Or doux — détails premium */
--color-rose-nude:  #E8C9B0;   /* Nude rosé — teintes pastel */
--color-text:       #2E1A0E;   /* Brun très foncé — textes */
--color-muted:      #9C7B6B;   /* Brun moyen — textes secondaires */
```

### Typographie
- **Titre principal / Logo** : `Playfair Display` ou `Cormorant Garamond` (serif élégant, évoque le luxe pâtissier parisien)
- **Sous-titres** : `DM Serif Display` (caractère, chaleur)
- **Corps de texte** : `Lato` ou `Source Sans 3` (lisible, propre)
- **Prix / Labels** : `Josefin Sans` (moderne, léger, discret)

### Ambiance visuelle
- Texture de fond subtile : grain photographique léger ou motif floral discret
- Grandes photos produit plein-format avec effet hover (léger zoom + ombre dorée)
- Sections asymétriques, chevauchements contrôlés
- Icônes minimalistes (stroke, pas fill)
- Micro-animations au scroll (fade-in progressif des cartes produit)
- Curseur personnalisé optionnel (petite pâtisserie / point marron)

---

## 🗂️ Architecture du Site

### Pages / Sections (Single Page Application recommandée)

```
1. Hero / Landing
2. Notre Histoire (À propos)
3. Catalogue Produits (filtrable par catégorie)
4. Produits Vedettes / Best-sellers
5. Galerie / Instagram Feed (mockup statique)
6. Commander (CTA WhatsApp + Instagram)
7. Footer
```

---

## 📦 Catalogue Produits (Données de démo à remplacer)

> ⚠️ Ces produits sont des exemples typiques d'une pâtisserie tunisienne. Remplacer par les vraies photos et vrais prix de @marron.officialll.

### Catégorie : Gâteaux & Entremets
| Produit | Description | Prix indicatif |
|---|---|---|
| Cheesecake Caramel Beurre Salé | Base biscuitée, crémeux Philadelphia, caramel coulant | 28 DT |
| Entremet Chocolat Noisette | Mousse chocolat noir 70%, feuilletine noisette, glaçage miroir | 32 DT |
| Fraisier Vanille | Génoise légère, crème mousseline, fraises fraîches de saison | 30 DT |
| Red Velvet | Biscuit velours rouge, cream cheese frosting, décor rose | 28 DT |
| Tarte Citron Meringuée | Pâte sablée, lemon curd, meringue italienne flambée | 22 DT |

### Catégorie : Petits Gâteaux & Bouchées
| Produit | Description | Prix indicatif |
|---|---|---|
| Macarons (x6) | Assortiment de saisons : framboise, pistache, chocolat, café | 18 DT |
| Éclairs au Chocolat | Pâte à choux, crème pâtissière chocolat, glaçage fondant | 8 DT / pièce |
| Choux Craquelin | Craquelin vanille, chantilly mascarpone, caramel | 7 DT / pièce |
| Financiers aux Amandes | Beurre noisette, amandes, moelleux fondant | 12 DT / x4 |

### Catégorie : Viennoiseries
| Produit | Description | Prix indicatif |
|---|---|---|
| Croissant Pur Beurre | Feuilletage classique, beurre AOP, doré au four | 4 DT |
| Pain au Chocolat | Double barre chocolat, feuilletage croustillant | 5 DT |
| Croissant Amande | Croissant repassé, crème d'amande, amandes effilées | 6 DT |

### Catégorie : Brownies & Bars
| Produit | Description | Prix indicatif |
|---|---|---|
| Brownie Triple Chocolat | Chocolat noir, blanc et lait, noix, texture fondante | 9 DT |
| Cookie New-York Style | Gros cookie moelleux, chunks chocolat, fleur de sel | 6 DT |
| Blondie Caramel Noix | Version caramel du brownie, caramel, noix de pécan | 9 DT |

### Catégorie : Commandes Spéciales
| Produit | Description | Prix |
|---|---|---|
| Gâteau d'anniversaire | Personnalisé sur devis, livraison sous 48h | Sur devis |
| Box Cadeau Pâtisserie | Assortiment de saison, emballage premium | À partir de 45 DT |
| Table de desserts (event) | Pour mariages, anniversaires, corporate | Sur devis |

---

## 🧱 Spécifications Techniques

### Stack recommandé
```
- HTML5 + CSS3 + Vanilla JS  (si fichier unique)
- OU React + Tailwind CSS    (si projet multi-fichiers)
- Fonts : Google Fonts (Playfair Display, Lato, Josefin Sans)
- Icons : Lucide Icons ou Feather Icons
- Animations : CSS keyframes + IntersectionObserver (scroll reveal)
- Pas de backend — données produits en JSON statique
```

### Structure des fichiers (si multi-fichiers)
```
marron-patisserie/
├── index.html
├── styles/
│   ├── main.css
│   ├── components.css
│   └── animations.css
├── scripts/
│   ├── main.js
│   └── catalog.js
├── data/
│   └── products.json
├── assets/
│   ├── images/          ← photos produits (placeholders Unsplash au départ)
│   ├── logo.svg
│   └── icons/
└── CLAUDE.md
```

### Structure `products.json`
```json
[
  {
    "id": "cheesecake-caramel",
    "nom": "Cheesecake Caramel Beurre Salé",
    "categorie": "gateaux",
    "description": "Base biscuitée dorée, crémeux Philadelphia onctueux, caramel beurre salé coulant.",
    "prix": 28,
    "devise": "DT",
    "disponible": true,
    "vedette": true,
    "nouveau": false,
    "image": "assets/images/cheesecake-caramel.jpg",
    "image_hover": "assets/images/cheesecake-caramel-detail.jpg",
    "tags": ["caramel", "fromage", "best-seller"]
  }
]
```

---

## 🖥️ Sections — Détail de Chaque Composant

### 1. Hero Section
- Plein écran (100vh)
- Grande photo de gâteau ou flat-lay en fond, légère superposition crème semi-transparente
- Logo Marron centré (typographie Playfair Display, couleur marron profond)
- Sous-titre : *"Pâtisserie artisanale · Tunis"*
- CTA : `Découvrir le catalogue` → scroll vers catalogue
- Badge flottant : "Commandes WhatsApp / Instagram DM"
- Animation : fade-in élégant au chargement, parallax léger au scroll

### 2. À Propos (mini)
- 2 colonnes : photo ambiance cuisine / texte
- Texte chaleureux en français : histoire de la marque, amour du fait-maison, ingrédients de qualité
- 3 icônes valeurs : 🤍 Artisanal · 🌾 Ingrédients Naturels · 🎁 Sur Commande

### 3. Catalogue Produits ← SECTION PRINCIPALE
- Filtres par catégorie (pills/chips cliquables) :
  `Tout | Gâteaux | Petits Gâteaux | Viennoiseries | Brownies & Cookies | Commandes Spéciales`
- Grille responsive : 3 cols desktop / 2 cols tablette / 1 col mobile
- Chaque carte produit :
  - Photo en ratio 4:5 (portrait) avec hover zoom + ombre caramel
  - Badge "Nouveau" ou "Vedette" si applicable
  - Nom du produit (Playfair Display)
  - Description courte (2 lignes max, tronquée)
  - Prix en DT (Josefin Sans, gras, couleur caramel)
  - Bouton "Commander" → ouvre WhatsApp avec message pré-rempli
- Animation : staggered fade-in au scroll (chaque carte avec délai progressif)

### 4. Produits Vedettes / Best-sellers
- Slider horizontal (3 produits mis en avant)
- Cartes plus grandes, fond marron profond, texte crème
- Effet "spotlight" au hover

### 5. Comment Commander
- 3 étapes visuelles :
  1. 📸 Choisissez votre produit sur le catalogue
  2. 💬 Envoyez votre commande via WhatsApp ou Instagram
  3. 🎁 Récupération ou livraison à Tunis
- Boutons CTA :
  - `Commander sur WhatsApp` → `https://wa.me/216XXXXXXXX`
  - `Envoyer un DM Instagram` → `https://instagram.com/marron.officialll`

### 6. Galerie Ambiance
- Grille Bento (style Instagram) : 6 photos format varié
- Titre : *"Notre univers sur Instagram"*
- CTA : `Suivre @marron.officialll`
- Photos : placeholders Unsplash (pâtisseries, chocolat, caramel, mains artisanes)

### 7. Footer
- Logo + tagline
- Liens rapides : Catalogue, Commander, Contact
- Icônes réseaux : Instagram, WhatsApp
- Mention : `© 2025 Marron Pâtisserie · Tunis, Tunisie`
- Texte crème sur fond marron profond

---

## 📱 Responsivité

| Breakpoint | Comportement |
|---|---|
| Mobile (< 640px) | 1 colonne catalogue, menu burger, hero réduit |
| Tablette (640–1024px) | 2 colonnes catalogue, navigation compacte |
| Desktop (> 1024px) | 3 colonnes catalogue, navigation complète |

---

## ✨ Micro-interactions & Animations

```css
/* Scroll Reveal — chaque carte apparaît avec délai */
.product-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.product-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover carte produit */
.product-card:hover .product-image {
  transform: scale(1.05);
  box-shadow: 0 20px 60px rgba(107, 58, 42, 0.25);
}

/* Bouton Commander */
.btn-commander {
  background: var(--color-marron);
  color: var(--color-bg);
  border-radius: 2px; /* carré, pas rond — élégant */
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: background 0.3s ease, transform 0.2s ease;
}
.btn-commander:hover {
  background: var(--color-caramel);
  transform: translateY(-2px);
}
```

---

## 🔗 Intégrations

| Fonction | Solution |
|---|---|
| Commande | WhatsApp Business (`wa.me/216...` avec message pré-rempli) |
| Galerie Instagram | Lien externe vers profil (pas d'API nécessaire) |
| Contact | Formulaire simple → `mailto:` ou WhatsApp |
| Analytics | Google Analytics (optionnel) |
| Hébergement | GitHub Pages / Netlify / Vercel (gratuit) |

### Message WhatsApp pré-rempli (exemple)
```js
const commanderWhatsApp = (produit) => {
  const message = encodeURIComponent(
    `Bonjour Marron 🎂\nJe souhaite commander : *${produit.nom}*\nPrix : ${produit.prix} DT\nMerci de me confirmer la disponibilité.`
  );
  window.open(`https://wa.me/216XXXXXXXX?text=${message}`, '_blank');
};
```

---

## 📝 Contenu Textuel (Copywrting FR)

### Hero
> **Marron**
> *Pâtisserie artisanale · Tunis*
> Des créations gourmandes façonnées avec passion, livrées avec amour.

### À Propos
> Chez Marron, chaque gâteau raconte une histoire.
> Nous créons des pâtisseries artisanales avec des ingrédients soigneusement sélectionnés,
> pour que chaque bouchée soit un moment de pur bonheur.
> Basée à Tunis, Marron livre ses créations avec amour depuis [ANNÉE].

### CTA Commander
> Envie d'une douceur ?
> Passez votre commande facilement via WhatsApp ou Instagram DM.
> Livraison disponible à Tunis · Récupération sur place aussi

---

## ⚙️ Instructions pour Claude Code

Lorsque tu génères ce projet :

1. **Commence par `index.html`** — structure complète en une seule page
2. **Charge les fonts Google** via `<link>` en tête de fichier
3. **Crée `data/products.json`** avec au minimum 12 produits (3 par catégorie)
4. **Utilise des images Unsplash** via URL directe pour les placeholders :
   - Recherche : `https://source.unsplash.com/600x750/?pastry,cake,chocolate`
5. **Implémente le filtre JS** : clic sur une catégorie filtre les cartes avec animation fade
6. **Implémente le scroll reveal** avec `IntersectionObserver`
7. **Rends le bouton Commander fonctionnel** avec le lien WhatsApp
8. **Mobile-first CSS** : commence par le mobile, utilise `min-width` pour agrandir
9. **Aucun framework CSS externe** (pas de Bootstrap) — CSS custom vars uniquement
10. **Qualité production** : pas de console.log, code commenté, structure sémantique HTML5

---

## 🚀 Commande de Démarrage

Pour démarrer le projet avec Claude Code, utilise ce prompt exact :

```
En utilisant le fichier CLAUDE.md comme référence complète, crée le site vitrine catalogue 
pour la pâtisserie Marron. Commence par index.html avec toutes les sections, puis crée 
products.json avec les données de démo, puis le CSS (main.css), puis le JS (main.js).
Utilise la palette couleur, la typographie et toutes les specs définies dans CLAUDE.md.
Le site doit être prêt à ouvrir dans un navigateur sans aucune dépendance externe à installer.
```

---

*Fichier généré le 06/04/2026 · Projet : Marron Pâtisserie · marron.officialll*