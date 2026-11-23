/* ==========================================================================
   ReverdeSer — Vanilla JavaScript Interactions
   ========================================================================== */

(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5493416750185';

  /* 1. Sticky Header State */
  const header = document.getElementById('site-header');
  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* 2. Mobile Navigation Menu */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const setMenuOpen = (isOpen) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const currentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!currentlyOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        menuToggle.getAttribute('aria-expanded') === 'true' &&
        !header.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    });
  }

  /* 3. Interactive Zones Selector */
  const ZONES_DATA = {
    abdomen: {
      title: 'Abdomen',
      tag: 'Moldeo y drenaje',
      desc: 'Trabajamos con maniobras suaves pero firmes para reducir volumen localizado, disminuir la hinchazón por retención de líquidos y mejorar la firmeza de la piel abdominal.',
      highlights: [
        'Descongestiona y reduce centímetros',
        'Estimula el drenaje linfático',
        'Mejora el tono y la textura de la piel'
      ],
      image: './assets/maderoterapia-abdomen.jpg',
      alt: 'Maderoterapia focalizada en abdomen'
    },
    cintura: {
      title: 'Cintura',
      tag: 'Definición de silueta',
      desc: 'Combinamos copa sueca y tabla moldeadora para acompañar las líneas naturales del torso, estilizar los flancos y lograr una silueta más armoniosa.',
      highlights: [
        'Define y estiliza el contorno de la cintura',
        'Trabaja grasa localizada en flancos',
        'Acompaña el moldeo natural del cuerpo'
      ],
      image: './assets/maderoterapia-cintura.jpg',
      alt: 'Sesión moldeadora de maderoterapia en cintura'
    },
    gluteos: {
      title: 'Glúteos',
      tag: 'Firmeza y tonificación',
      desc: 'Las maniobras ascendentes con instrumentos de madera y masaje reductor ayudan a tonificar, combatir la celulitis y mejorar la firmeza de la zona.',
      highlights: [
        'Reafirma y tonifica los tejidos',
        'Suaviza el aspecto de la celulitis',
        'Activa la circulación local'
      ],
      image: './assets/maderoterapia-piernas.jpg',
      alt: 'Maderoterapia reafirmante en glúteos y piernas'
    },
    piernas: {
      title: 'Piernas',
      tag: 'Circulación y liviandad',
      desc: 'Ideal para aliviar la pesadez, mejorar el flujo sanguíneo y linfático, reducir celulitis y relajar la musculatura después del ejercicio o jornadas largas.',
      highlights: [
        'Combate celulitis y retención de líquidos',
        'Favorece el flujo sanguíneo y linfático',
        'Alivia la tensión muscular post-entrenamiento'
      ],
      image: './assets/maderoterapia-detalle.jpg',
      alt: 'Tabla moldeadora de madera aplicada sobre piernas'
    },
    brazos: {
      title: 'Brazos',
      tag: 'Tonificación suave',
      desc: 'Maniobras delicadas y focalizadas para mejorar la elasticidad de la piel, combatir la flacidez y acompañar la definición del contorno de los brazos.',
      highlights: [
        'Combate la flacidez cutánea',
        'Mejora la textura y firmeza de la piel',
        'Estimula la circulación y oxigenación'
      ],
      image: './assets/masajes-reductores.jpg',
      alt: 'Masaje reductor manual para tonificación corporal'
    }
  };

  const zoneTabs = Array.from(document.querySelectorAll('.zone-tab'));
  const zonePanel = document.getElementById('zone-panel');
  const zoneImage = document.getElementById('zone-image');
  const zoneTag = document.getElementById('zone-tag');
  const zoneTitle = document.getElementById('zone-title');
  const zoneDesc = document.getElementById('zone-desc');
  const zoneHighlights = document.getElementById('zone-highlights');
  const zoneCta = document.getElementById('zone-cta');
  const zoneCtaLabel = document.getElementById('zone-cta-label');

  let switchTimer = null;

  const activateZone = (zoneKey) => {
    const data = ZONES_DATA[zoneKey];
    if (!data || !zonePanel) return;

    zoneTabs.forEach((tab) => {
      const selected = tab.dataset.zone === zoneKey;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');
      if (selected) {
        zonePanel.setAttribute('aria-labelledby', tab.id);
      }
    });

    zonePanel.classList.add('is-switching');
    window.clearTimeout(switchTimer);

    switchTimer = window.setTimeout(() => {
      if (zoneImage) {
        zoneImage.src = data.image;
        zoneImage.alt = data.alt;
      }
      if (zoneTag) zoneTag.textContent = data.tag;
      if (zoneTitle) zoneTitle.textContent = data.title;
      if (zoneDesc) zoneDesc.textContent = data.desc;

      if (zoneHighlights) {
        zoneHighlights.innerHTML = data.highlights
          .map((item) => `<li>${item}</li>`)
          .join('');
      }

      if (zoneCta && zoneCtaLabel) {
        const msg = encodeURIComponent(
          `Hola! Quisiera consultar por tratamientos para ${data.title} en ReverdeSer.`
        );
        zoneCta.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
        zoneCtaLabel.textContent = `Consultar por ${data.title}`;
      }

      zonePanel.classList.remove('is-switching');
    }, 140);
  };

  zoneTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateZone(tab.dataset.zone));

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const nextIndex =
        event.key === 'ArrowRight'
          ? (index + 1) % zoneTabs.length
          : (index - 1 + zoneTabs.length) % zoneTabs.length;
      const nextTab = zoneTabs[nextIndex];
      nextTab.focus();
      activateZone(nextTab.dataset.zone);
    });
  });

  /* 4. Scroll Reveal with IntersectionObserver (Progressive) */
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-pending');
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px 60px 0px' }
    );

    const viewportBottom = window.innerHeight;
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only hide elements that are strictly below the current viewport
      if (rect.top > viewportBottom + 20) {
        el.classList.add('is-pending');
        revealObserver.observe(el);
      } else {
        el.classList.add('is-visible');
      }
    });
  }

  /* 5. Active Navigation Highlight on Scroll */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-38% 0px -55% 0px' }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* 6. Current Year */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
