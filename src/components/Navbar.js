// src/components/Navbar.js — with mobile hamburger menu
import { brands }       from '../data/brands.js';
import { logoMarvelsa } from '../assets/images.js';

export const renderNavbar = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const rawPath     = window.location.hash.replace('#', '') || '/';
  const currentPath = rawPath.split('?')[0];
  const isBrandActive = currentPath !== '/' && currentPath !== '/nosotros' && currentPath !== '/contacto';

  container.innerHTML = `
    <nav class="pill-navbar container animate-nav-down">

      <div class="nav-logo">
        <a href="#/">
          <img loading="eager" src="${logoMarvelsa}" alt="Marvelsa Logo" style="height:45px;width:auto;display:block;">
        </a>
      </div>

      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <div class="nav-main-pill glass-panel" id="nav-main-pill">
        <a href="#/"        class="nav-link ${currentPath === '/'          ? 'active' : ''}" onclick="closeNav()">Home</a>
        <div class="nav-link dropdown ${isBrandActive ? 'active' : ''}">
          <span>Nuestras Marcas <i class="chevron"></i></span>
          <ul class="dropdown-menu">
            ${Object.values(brands).map((brand, i) => `
              <li style="--delay:${i * 0.1}s">
                <a href="#/${brand.id}" class="brand-item" onclick="closeNav()">
                  <img loading="lazy" src="${brand.logo}" alt="${brand.name}" class="nav-brand-logo">
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
        <a href="#/nosotros" class="nav-link ${currentPath === '/nosotros' ? 'active' : ''}" onclick="closeNav()">Nosotros</a>
        <a href="#/contacto" class="nav-link ${currentPath === '/contacto' ? 'active' : ''}" onclick="closeNav()">Contacto</a>
      </div>

      <div class="nav-cta-pill">
        <a href="https://marvelsa.com/" class="cta-link" target="_blank" rel="noopener noreferrer">¿Eres distribuidor?</a>
      </div>

    </nav>
  `;

  const hamburger = document.getElementById('nav-hamburger');
  const navPill   = document.getElementById('nav-main-pill');

  hamburger.addEventListener('click', () => {
    const isOpen = navPill.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  window.closeNav = () => {
    navPill.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) window.closeNav();
  }, { passive: true });
};
