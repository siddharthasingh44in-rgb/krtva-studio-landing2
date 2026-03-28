/* ================================================
   KRTVA STUDIO — Main Script
   GSAP + Lenis + Magnetic Cursor
   ================================================ */

import './style.css';

// --- Dynamic imports from CDN (saves disk space) ---
async function loadDeps() {
  const [gsapModule, lenisModule] = await Promise.all([
    import('https://esm.sh/gsap@3.12.5'),
    import('https://esm.sh/lenis@1.1.18'),
  ]);
  const scrollTriggerModule = await import('https://esm.sh/gsap@3.12.5/ScrollTrigger');
  return {
    gsap: gsapModule.default || gsapModule.gsap,
    ScrollTrigger: scrollTriggerModule.default || scrollTriggerModule.ScrollTrigger,
    Lenis: lenisModule.default || lenisModule.Lenis,
  };
}

// --- Boot ---
(async () => {
  const { gsap, ScrollTrigger, Lenis } = await loadDeps();
  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // LOADER
  // ============================================
  const loader = document.getElementById('loader');
  const loaderProgress = document.querySelector('.loader-progress');

  const loaderTl = gsap.timeline({
    onComplete: () => {
      initPage(gsap, ScrollTrigger, Lenis);
    },
  });

  loaderTl
    .to(loaderProgress, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    })
    .to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.2,
    })
    .set(loader, { display: 'none' });

  // ============================================
  // MAIN INIT
  // ============================================
  function initPage(gsap, ScrollTrigger, Lenis) {
    // --- Lenis smooth scroll ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- Nav ---
    gsap.to('#nav', {
      opacity: 1,
      duration: 0.6,
      delay: 0.2,
    });

    // --- Hero text reveal ---
    const heroLines = document.querySelectorAll('.hero-headline .line');
    gsap.to(heroLines, {
      y: 0,
      duration: 1.2,
      stagger: 0.12,
      ease: 'power4.out',
      delay: 0.1,
    });

    // --- Hero sub + footer fade ---
    gsap.to('.hero-sub', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.8,
    });

    gsap.to('[data-reveal-fade]', {
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      delay: 1.0,
    });

    // ============================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ============================================

    // --- Purpose section ---
    const purposeLabel = document.querySelector('.section--purpose .section-label');
    const purposeLines = document.querySelectorAll('.purpose-headline .line');
    const purposeBody = document.querySelector('.purpose-body');

    if (purposeLabel) {
      gsap.fromTo(purposeLabel,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: {
            trigger: purposeLabel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    purposeLines.forEach((line, i) => {
      gsap.fromTo(line,
        { y: '100%', opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power4.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: line.closest('.line-wrap'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    if (purposeBody) {
      gsap.fromTo(purposeBody,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: purposeBody,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    // --- Client rows ---
    const clientRows = document.querySelectorAll('.client-row');
    clientRows.forEach((row) => {
      const divider = row.querySelector('.client-divider');
      const content = row.querySelector('.client-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(divider, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      if (content) {
        tl.fromTo(content,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
      }
    });

    // --- Clients label ---
    const clientsLabel = document.querySelector('.section--clients .section-label');
    if (clientsLabel) {
      gsap.fromTo(clientsLabel,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: {
            trigger: clientsLabel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    // --- Contact section ---
    const contactLabel = document.querySelector('.section--contact .section-label');
    const contactLines = document.querySelectorAll('.contact-headline .line');
    const contactLinks = document.querySelector('.contact-links');
    const footer = document.querySelector('.footer');

    if (contactLabel) {
      gsap.fromTo(contactLabel,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: {
            trigger: contactLabel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    contactLines.forEach((line, i) => {
      gsap.fromTo(line,
        { y: '100%', opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power4.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: line.closest('.line-wrap'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    if (contactLinks) {
      gsap.fromTo(contactLinks,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactLinks,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            toggleActions: 'play none none none',
          }
        }
      );
    }

    // ============================================
    // MAGNETIC CURSOR
    // ============================================
    initMagneticCursor(gsap);
  }

  // ============================================
  // MAGNETIC CURSOR SYSTEM
  // ============================================
  function initMagneticCursor(gsap) {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth < 769) return;

    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');
    const magneticEls = document.querySelectorAll('[data-magnetic]');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isHovering = false;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor follow
    function updateCursor() {
      if (!isHovering) {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
      }

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Magnetic effect on interactive elements
    magneticEls.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-magnetic');
        isHovering = true;
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-magnetic');
        isHovering = false;
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      });

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - elCenterX) * 0.3;
        const deltaY = (e.clientY - elCenterY) * 0.3;

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Cursor follows the magnetic target center
        cursorX = elCenterX + deltaX;
        cursorY = elCenterY + deltaY;
      });
    });
  }
})();
