'use strict';

/* ═══════════════════════════════════════════════════════════════
   Marron Pâtisserie — catalog.js
   Renders product cards, featured slider, and category filters.
   Depends on window.MARRON_PRODUCTS set by data/products.js.
   ═══════════════════════════════════════════════════════════════ */

/* ─── WhatsApp config ───────────────────────────────────────── */
var WA_NUMBER = '21600000000';

/* ─── WhatsApp message generator ───────────────────────────── */
function commanderWhatsApp(produit) {
  var prixText = produit.sur_devis
    ? 'Sur devis'
    : produit.prix + ' ' + produit.devise;

  var message = encodeURIComponent(
    'Bonjour Marron \uD83C\uDF82\nJe souhaite commander : *' +
    produit.nom +
    '*\nPrix : ' +
    prixText +
    '\nMerci de me confirmer la disponibilit\u00e9.'
  );

  window.open(
    'https://wa.me/' + WA_NUMBER + '?text=' + message,
    '_blank',
    'noopener,noreferrer'
  );
}

/* ─── Product card DOM builder ──────────────────────────────── */
function buildProductCard(product) {
  /* Root element */
  var card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-category', product.categorie);
  card.setAttribute('data-product-id', product.id);

  /* ── Image wrapper ── */
  var imageWrapper = document.createElement('div');
  imageWrapper.className = 'product-card-image';

  var img = document.createElement('img');
  img.setAttribute('loading', 'lazy');
  img.setAttribute('alt', product.nom);
  img.src = product.image;
  img.onerror = function () {
    this.onerror = null;
    this.src =
      'https://placehold.co/600x750/E8C9B0/6B3A2A?text=' +
      encodeURIComponent(product.nom);
  };

  imageWrapper.appendChild(img);

  /* Badges */
  if (product.vedette || product.nouveau) {
    var badgesWrapper = document.createElement('div');
    badgesWrapper.className = 'product-card-badges';

    if (product.vedette) {
      var badgeVedette = document.createElement('span');
      badgeVedette.className = 'badge badge-vedette';
      badgeVedette.textContent = 'Vedette';
      badgesWrapper.appendChild(badgeVedette);
    }

    if (product.nouveau) {
      var badgeNouveau = document.createElement('span');
      badgeNouveau.className = 'badge badge-nouveau';
      badgeNouveau.textContent = 'Nouveau';
      badgesWrapper.appendChild(badgeNouveau);
    }

    imageWrapper.appendChild(badgesWrapper);
  }

  card.appendChild(imageWrapper);

  /* ── Card body ── */
  var body = document.createElement('div');
  body.className = 'product-card-body';

  var name = document.createElement('h3');
  name.className = 'product-card-name';
  name.textContent = product.nom;

  var desc = document.createElement('p');
  desc.className = 'product-card-desc';
  desc.textContent = product.description;

  var footer = document.createElement('div');
  footer.className = 'product-card-footer';

  var price = document.createElement('span');
  price.className = 'product-price';
  price.textContent = product.sur_devis
    ? product.prix_affiche
    : product.prix + '\u00a0' + product.devise;

  var btn = document.createElement('button');
  btn.className = 'btn-commander';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Commander ' + product.nom + ' via WhatsApp');
  btn.textContent = 'Commander';

  footer.appendChild(price);
  footer.appendChild(btn);

  body.appendChild(name);
  body.appendChild(desc);
  body.appendChild(footer);

  card.appendChild(body);

  return card;
}

/* ─── Featured card DOM builder ─────────────────────────────── */
function buildFeaturedCard(product) {
  /* Root element */
  var card = document.createElement('div');
  card.className = 'featured-card';
  card.setAttribute('data-category', product.categorie);
  card.setAttribute('data-product-id', product.id);

  /* ── Image wrapper ── */
  var imageWrapper = document.createElement('div');
  imageWrapper.className = 'featured-card-image';

  var img = document.createElement('img');
  img.setAttribute('loading', 'lazy');
  img.setAttribute('alt', product.nom);
  img.src = product.image;
  img.onerror = function () {
    this.onerror = null;
    this.src =
      'https://placehold.co/600x750/E8C9B0/6B3A2A?text=' +
      encodeURIComponent(product.nom);
  };

  imageWrapper.appendChild(img);

  /* Spotlight overlay */
  var overlay = document.createElement('div');
  overlay.className = 'featured-card-overlay';
  imageWrapper.appendChild(overlay);

  card.appendChild(imageWrapper);

  /* ── Card body ── */
  var body = document.createElement('div');
  body.className = 'featured-card-body';

  var name = document.createElement('h3');
  name.className = 'featured-card-name';
  name.textContent = product.nom;

  var desc = document.createElement('p');
  desc.className = 'featured-card-desc';
  desc.textContent = product.description;

  var footer = document.createElement('div');
  footer.className = 'featured-card-footer';

  var price = document.createElement('span');
  price.className = 'featured-price';
  price.textContent = product.sur_devis
    ? product.prix_affiche
    : product.prix + '\u00a0' + product.devise;

  var btn = document.createElement('button');
  btn.className = 'btn-commander';
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Commander ' + product.nom + ' via WhatsApp');
  btn.textContent = 'Commander';

  footer.appendChild(price);
  footer.appendChild(btn);

  body.appendChild(name);
  body.appendChild(desc);
  body.appendChild(footer);

  card.appendChild(body);

  return card;
}

/* ─── Attach commander button event listeners ───────────────── */
function attachCommanderListeners(container) {
  var buttons = container.querySelectorAll('.btn-commander');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var card = e.currentTarget.closest('[data-product-id]');
      var productId = card ? card.getAttribute('data-product-id') : null;
      var product = productId
        ? window.MARRON_PRODUCTS.find(function (p) { return p.id === productId; })
        : null;

      if (product) {
        commanderWhatsApp(product);
      }
    });
  });
}

/* ─── Render all products into #products-grid ───────────────── */
function renderProducts(products) {
  var grid = document.getElementById('products-grid');
  if (!grid) return;

  /* Clear existing content */
  grid.innerHTML = '';

  products.forEach(function (product, index) {
    var card = buildProductCard(product);
    /* Staggered animation delay for CSS transitions */
    card.style.animationDelay = index * 0.05 + 's';
    grid.appendChild(card);
  });

  attachCommanderListeners(grid);

  /* Trigger GSAP card animation if main.js has exposed it */
  if (typeof window.animateProductCards === 'function') {
    requestAnimationFrame(window.animateProductCards);
  }
}

/* ─── Render featured/bestsellers into #featured-track ──────── */
function renderFeatured(products) {
  var track = document.getElementById('featured-track');
  if (!track) return;

  var featured = products.filter(function (p) { return p.vedette; });

  track.innerHTML = '';

  featured.forEach(function (product) {
    track.appendChild(buildFeaturedCard(product));
  });

  attachCommanderListeners(track);
}

/* ─── Category filter logic ─────────────────────────────────── */
function initFilters() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      /* Update active state and ARIA */
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var category = btn.getAttribute('data-category');
      var filtered = category === 'all'
        ? window.MARRON_PRODUCTS
        : window.MARRON_PRODUCTS.filter(function (p) {
            return p.categorie === category;
          });

      /* Fade out, re-render, fade in */
      var grid = document.getElementById('products-grid');
      if (!grid) return;

      grid.style.opacity = '0';
      grid.style.transform = 'translateY(10px)';
      grid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

      setTimeout(function () {
        renderProducts(filtered);
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
      }, 260);
    });
  });
}

/* ─── Init ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.MARRON_PRODUCTS || !Array.isArray(window.MARRON_PRODUCTS)) return;

  renderProducts(window.MARRON_PRODUCTS);
  renderFeatured(window.MARRON_PRODUCTS);
  initFilters();
});
