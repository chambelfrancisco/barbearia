/* =========================================================
   BarberKing – script.js
   Interactivity: Navbar, Carousel, Reveal, Mobile Menu
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 2. Mobile Menu Toggle ── */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  /* ── 3. Carousel ── */
  const track = document.getElementById('carousel-track');
  const cards = track ? track.querySelectorAll('.review-card') : [];
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (cards.length && dotsContainer) {
    let current = 0;
    let autoInterval;

    const getVisible = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    const totalSlides = () => Math.ceil(cards.length / getVisible());

    // Build dots
    const buildDots = () => {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides(); i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === current ? ' active' : '');
        dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    };

    const goTo = (index) => {
      const total = totalSlides();
      current = (index + total) % total;
      const cardWidth = cards[0].offsetWidth + 24; // gap-6 = 24px
      track.style.transform = `translateX(-${current * getVisible() * cardWidth}px)`;
      buildDots();
    };

    prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

    const resetAuto = () => {
      clearInterval(autoInterval);
      autoInterval = setInterval(() => goTo(current + 1), 5000);
    };

    window.addEventListener('resize', () => { current = 0; goTo(0); });

    buildDots();
    resetAuto();
  }

  /* ── 4. Scroll Reveal ── */
  const revealEls = document.querySelectorAll(
    '.feature-card, .service-card, .review-card, .gallery-item, #localizacao .flex'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ── 5. Active Nav Link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = '#C9A84C';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── 6. Smooth CTA click pulse ── */
  document.querySelectorAll('a[href="#agendar"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => btn.style.transform = '', 200);
    });
  });

});
