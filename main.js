/* ============================================
   KODURI VEERAPRASAD — PORTFOLIO
   JavaScript: Scroll animations, nav, mobile menu
   ============================================ */

// ---- NAV scroll state ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- Intersection Observer: fade-up sections ----
const fadeEls = document.querySelectorAll(
  '.section-heading, .section-sub, .about-grid, .timeline-item, .contact-card'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ---- Skill cards: staggered reveal ----
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

skillCards.forEach(card => skillObserver.observe(card));

// ---- Project cards: fade-up ----
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => card.classList.add('fade-up'));
const projObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      projObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
projectCards.forEach(card => projObserver.observe(card));

// ---- Smooth active nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- Terminal typing animation ----
(function initTerminal() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  // cursor blinks via CSS; nothing extra needed
})();

// ---- Stat pill count-up ----
function animateCount(el, target, suffix, duration) {
  const isFloat = target % 1 !== 0;
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const val = isFloat
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statPills = document.querySelectorAll('.stat-pill');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      const label = entry.target.querySelector('.stat-label').textContent;
      if (label.includes('Experience')) animateCount(numEl, 3.2, '<small>yrs</small>', 1200);
      else if (label.includes('Uptime'))   animateCount(numEl, 99.9, '<small>%</small>', 1500);
      else if (label.includes('Faster'))   animateCount(numEl, 40, '<small>%</small>', 1200);
      else if (label.includes('Reduction')) animateCount(numEl, 95, '<small>%</small>', 1400);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statPills.forEach(p => statsObserver.observe(p));

// Allow innerHTML for count-up since we set small tags
statPills.forEach(pill => {
  const numEl = pill.querySelector('.stat-num');
  if (numEl) numEl.innerHTML = numEl.textContent; // keep existing HTML structure
});
