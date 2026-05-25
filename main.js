/* =============================================
   main.js — Portfolio Asmaou BAH
   ============================================= */

// ---- ÉTAT GLOBAL ----
let lang = 'fr';
let dark = true;

// ---- SCROLL VERS SECTION ----
function go(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 60;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ---- LANGUE ----
function setLang(l) {
  lang = l;
  document.getElementById('lang-select').value = l;

  document.querySelectorAll('[data-fr]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (!val) return;
    // Preserve inner HTML structure (no icons here, just text)
    el.textContent = val;
  });

  // Mettre à jour le label thème
  updateThemeLabel();
}

// ---- THÈME ----
function toggleTheme() {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  document.body.classList.toggle('light', !dark);
  document.getElementById('theme-icon').textContent = dark ? '☽' : '☀';
  updateThemeLabel();
}

function updateThemeLabel() {
  const lbl = document.getElementById('theme-label');
  if (!lbl) return;
  if (dark) {
    lbl.textContent = lang === 'fr' ? 'Mode clair' : 'Light mode';
  } else {
    lbl.textContent = lang === 'fr' ? 'Mode sombre' : 'Dark mode';
  }
}

// ---- SCROLL REVEAL ----
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Déclenche les enfants aussi
        entry.target.querySelectorAll('.reveal-child').forEach(child => {
          child.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- ACTIVE LINK AU SCROLL ----
function initScrollSpy() {
  const sections = ['sk', 'exp', 'acad', 'pr', 'dist', 'co'];

  window.addEventListener('scroll', () => {
    let current = 'sk';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 120) current = id;
    });
    document.querySelectorAll('.nbl').forEach(b => {
      const fn = b.getAttribute('onclick') || '';
      b.classList.toggle('active', fn.includes("'" + current + "'"));
    });

    // Nav top shadow on scroll
    const nav = document.getElementById('nav-top');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// ---- HAMBURGER MENU ----
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // Ferme le menu quand on clique sur un lien
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initScrollSpy();
  initHamburger();

  // Déclenche les éléments déjà visibles (hero)
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
      el.querySelectorAll('.reveal-child').forEach(c => c.classList.add('visible'));
    }
  });
});


