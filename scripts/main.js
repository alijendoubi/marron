'use strict';

/* ═══════════════════════════════════════════════════════════════
   Marron Pâtisserie — main.js
   Three.js · GSAP ScrollTrigger · Custom Cursor · Navbar · Slider
   ═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   1. LOADING SCREEN
   ════════════════════════════════════════════════════════════════ */
function initLoadingScreen(onComplete) {
  const screen = document.getElementById('loading-screen');
  const fill   = screen ? screen.querySelector('.loading-fill') : null;

  if (!screen || !fill) {
    onComplete();
    return;
  }

  /* Animate fill bar 0 → 100% */
  fill.style.transition = 'width 1.2s ease';
  fill.style.width      = '0%';

  /* Trigger reflow so transition fires */
  void fill.offsetWidth;
  fill.style.width = '100%';

  setTimeout(() => {
    screen.classList.add('hidden');

    setTimeout(() => {
      screen.style.display = 'none';
      onComplete();
    }, 300);
  }, 1500);
}

/* ════════════════════════════════════════════════════════════════
   2. LUCIDE ICONS
   ════════════════════════════════════════════════════════════════ */
function initLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ════════════════════════════════════════════════════════════════
   3. THREE.JS HERO CANVAS — Floating Particles
   ════════════════════════════════════════════════════════════════ */
function initThreeJS() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  try {
    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      alpha:     true,
      antialias: true,
      canvas:    canvas
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    /* ── Scene & Camera ── */
    const scene  = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    /* ── Helper: create particle group ── */
    function createParticles(count, rangeX, rangeY, rangeZ, color, size, opacity) {
      const geometry  = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * rangeX * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * rangeY * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * rangeZ * 2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size:        size,
        color:       color,
        transparent: true,
        opacity:     opacity,
        sizeAttenuation: true
      });

      return new THREE.Points(geometry, material);
    }

    /* ── Caramel particles (300) ── */
    const particles = createParticles(300, 4, 3, 2, 0xC8834A, 0.025, 0.6);
    scene.add(particles);

    /* ── Gold particles (150) ── */
    const goldParticles = createParticles(150, 4, 3, 2, 0xD4A94A, 0.015, 0.4);
    scene.add(goldParticles);

    /* ── Mouse parallax tracking ── */
    let targetRotX = 0;
    let targetRotY = 0;

    document.addEventListener('mousemove', e => {
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * 0.6;
      targetRotY = ((e.clientX / window.innerWidth)  - 0.5) * 0.6;
    });

    /* ── Animate loop ── */
    function animate() {
      requestAnimationFrame(animate);

      /* Gentle continuous drift */
      particles.rotation.z     += 0.0004;
      goldParticles.rotation.z -= 0.0002;

      /* Mouse parallax lerp */
      particles.rotation.x += (targetRotX - particles.rotation.x) * 0.02;
      particles.rotation.y += (targetRotY - particles.rotation.y) * 0.02;

      goldParticles.rotation.x += (targetRotX - goldParticles.rotation.x) * 0.015;
      goldParticles.rotation.y += (targetRotY - goldParticles.rotation.y) * 0.015;

      renderer.render(scene, camera);
    }

    animate();

    /* ── Resize handler ── */
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (err) {
    /* Graceful degradation — WebGL not available */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) canvas.style.display = 'none';
  }
}

/* ════════════════════════════════════════════════════════════════
   4. GSAP SCROLL ANIMATIONS
   ════════════════════════════════════════════════════════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined') return;

  /* Register ScrollTrigger plugin */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Hero entrance timeline ── */
  const tl = gsap.timeline();

  tl.from('.hero-eyebrow', {
    opacity:  0,
    y:        20,
    duration: 0.8,
    delay:    0.3
  })
  .from('.hero-title', {
    opacity:  0,
    y:        40,
    duration: 1,
    ease:     'power3.out'
  }, '-=0.4')
  .from('.hero-subtitle', {
    opacity:  0,
    y:        20,
    duration: 0.8
  }, '-=0.5')
  .from('.hero-cta .btn', {
    opacity:  0,
    y:        20,
    stagger:  0.15,
    duration: 0.6
  }, '-=0.4')
  .from('.hero-badge', {
    opacity:  0,
    scale:    0.9,
    duration: 0.5
  }, '-=0.3')
  .from('.scroll-indicator', {
    opacity:  0,
    y:        10,
    duration: 0.6
  }, '-=0.2');

  /* ── About section ── */
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo('.about-image-wrapper',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#about', start: 'top 75%' }
      }
    );

    gsap.fromTo('.about-text .reveal',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '#about', start: 'top 70%' }
      }
    );

    /* ── Catalogue section ── */
    gsap.fromTo('#catalogue .section-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '#catalogue', start: 'top 80%' }
      }
    );

    gsap.fromTo('.filter-pills',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.filter-pills', start: 'top 85%' }
      }
    );

    /* ── Steps section ── */
    gsap.fromTo('.step-item',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8,
        scrollTrigger: { trigger: '.steps-grid', start: 'top 75%' }
      }
    );

    gsap.fromTo('.order-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.order-cta', start: 'top 85%' }
      }
    );

    /* ── Gallery bento ── */
    gsap.fromTo('.gallery-item',
      { opacity: 0, scale: 0.93 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.7,
        scrollTrigger: { trigger: '.gallery-bento', start: 'top 75%' }
      }
    );

    /* ── Bestsellers section ── */
    gsap.fromTo('.bestsellers-header',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '#bestsellers', start: 'top 75%' }
      }
    );

    gsap.fromTo('#featured-track .featured-card',
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '#bestsellers', start: 'top 65%' }
      }
    );
  }
}

/* ── Exposed for catalog.js to call after rendering cards ── */
window.animateProductCards = function () {
  if (typeof gsap === 'undefined') return;

  gsap.fromTo('.product-card',
    { opacity: 0, y: 40, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out' }
  );
};

/* ════════════════════════════════════════════════════════════════
   5. NAVBAR BEHAVIOR
   ════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const bar    = document.querySelector('.progress-bar');

  if (!navbar) return;

  const onScroll = () => {
    const scrollY = window.scrollY;

    /* Scrolled state */
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Scroll progress bar */
    if (bar) {
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.width = total > 0
        ? ((scrollY / total) * 100) + '%'
        : '0%';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ════════════════════════════════════════════════════════════════
   6. MOBILE MENU
   ════════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const toggle    = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (!toggle || !mobileNav) return;

  function openMenu() {
    mobileNav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close on link click */
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   7. CUSTOM CURSOR
   ════════════════════════════════════════════════════════════════ */
function initCursor() {
  /* Hide cursor on touch devices */
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  cursor.style.display = 'block';

  document.addEventListener('mousemove', e => {
    if (typeof gsap !== 'undefined') {
      gsap.to('#custom-cursor', {
        x:        e.clientX,
        y:        e.clientY,
        duration: 0.15,
        ease:     'power1.out'
      });
    } else {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  });

  /* Hover enlargement on interactive elements */
  const hoverTargets = 'a, button, .btn, .product-card, .filter-btn, .gallery-item';

  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  /* Handle elements added later (delegation) */
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('cursor-hover');
    } else {
      cursor.classList.remove('cursor-hover');
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   8. PRODUCT CARD 3D TILT
   ════════════════════════════════════════════════════════════════ */
function initTiltEffect() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.addEventListener('mousemove', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x    = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const y    = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);

    card.style.transform  = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.transition = 'box-shadow 0.2s ease';
  });

  grid.addEventListener('mouseleave', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    card.style.transform  = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
  });

  /* Also handle when mouse leaves any card directly */
  grid.addEventListener('mouseout', e => {
    const card = e.target.closest('.product-card');
    if (!card) return;
    if (!card.contains(e.relatedTarget)) {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   9. BESTSELLERS SLIDER
   ════════════════════════════════════════════════════════════════ */
function initSlider() {
  const track    = document.getElementById('featured-track');
  const prevBtn  = document.querySelector('#bestsellers .slider-prev');
  const nextBtn  = document.querySelector('#bestsellers .slider-next');

  if (!track) return;

  let currentSlide = 0;
  let debounceTimer;

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  function getCardWidth() {
    const card = track.querySelector('.featured-card');
    return card ? card.offsetWidth : 0;
  }

  function getGap() {
    return 32; /* 2rem */
  }

  function getMaxSlide() {
    const total   = track.querySelectorAll('.featured-card').length;
    const visible = getVisibleCount();
    return Math.max(0, total - visible);
  }

  function goToSlide(index) {
    const max  = getMaxSlide();
    currentSlide = Math.max(0, Math.min(index, max));

    const cardWidth = getCardWidth();
    const gap       = getGap();
    track.style.transform   = `translateX(-${currentSlide * (cardWidth + gap)}px)`;
    track.style.transition  = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    /* Update button states */
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide >= max;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }

  /* Touch swipe support */
  let touchStartX = 0;
  let touchEndX   = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchStartX - touchEndX;

    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    }
  }, { passive: true });

  /* Debounced resize handler */
  window.addEventListener('resize', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      goToSlide(Math.min(currentSlide, getMaxSlide()));
    }, 150);
  });

  /* Initial state */
  goToSlide(0);
}

/* ════════════════════════════════════════════════════════════════
   10. SCROLL REVEAL FALLBACK (IntersectionObserver)
   ════════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length === 0) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
}

/* ════════════════════════════════════════════════════════════════
   11. INIT ORDER
   ════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Three.js canvas needs size ASAP, init immediately */
  initThreeJS();

  /* Loading screen then everything else */
  initLoadingScreen(() => {
    initLucide();
    initNavbar();
    initMobileMenu();
    initCursor();
    initGSAP();
    initSlider();
    initTiltEffect();
    initScrollReveal();
  });
});
