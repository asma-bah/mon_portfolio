/* =============================================
   main.js — Portfolio Asmaou BAH
   ============================================= */
let lang = 'fr';
let dark = true;

// ---- SCROLL VERS SECTION ----
function go(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 70;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  // Ne ferme plus le menu mobile au clic sur un lien
}

// ---- LANGUE ----
function setLang(l) {
  lang = l;
  document.getElementById('lang-select').value = l;
  document.querySelectorAll('[data-fr]').forEach(el => {
    const val = el.getAttribute('data-' + l);
    if (!val) return;
    el.textContent = val;
  });
}

// ---- THÈME ----
function toggleTheme() {
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  document.body.classList.toggle('light', !dark);
  document.getElementById('theme-icon').textContent = dark ? '☽' : '☀';
}

// ---- SCROLL REVEAL ----
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.reveal-child').forEach(c => c.classList.add('visible'));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ---- NAV SCROLL EFFECT ----
// Uniquement l'effet visuel (fond flouté), ne cache pas la nav
function initNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// ---- HAMBURGER ----
function initHamburger() {
  const btn = document.getElementById('menu-bt');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavScroll();
  initHamburger();
  // Déclenche les éléments déjà visibles au chargement
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add('visible');
      el.querySelectorAll('.reveal-child').forEach(c => c.classList.add('visible'));
    }
  });
});