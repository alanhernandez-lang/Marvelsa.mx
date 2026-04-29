// src/pages/contacto.js
import { renderNavbar }       from '../components/Navbar.js';
import { renderHeroCarousel } from '../components/HeroCarousel.js';
import { renderLeadForm }     from '../components/LeadForm.js';
import { getFooterHTML }      from '../components/Footer.js';
import { activateRevealObserver } from '../core/reveal.js';

const marqueeItems = ['Distribuidores Autorizados', 'Cobertura Nacional', 'Atención B2B', 'Soporte Técnico'];
const marqueeHTML  = Array(8).fill(marqueeItems.map(t => `<span class="mvh-mqitem-pill">${t}</span>`).join('')).join('');

const contactCards = [
  { emoji: '📍', title: 'Ubicación', text: 'Av. Privada de la Cruz 13, Tlajomulco de Zúñiga, Jalisco, México.' },
  { emoji: '📞', title: 'Teléfono',  text: '+52 33 1865 7506<br>Lunes a Viernes 9:00 AM - 6:00 PM', delay: '0.1s' },
  { emoji: '✉️', title: 'Correo',   text: 'contacto@marvelsa.com<br>Ventas y Soporte',              delay: '0.2s' },
];

export const renderContacto = (shouldScroll = false) => {
  document.body.className = '';
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main style="background:var(--bg-body);min-height:100vh;overflow-x:hidden;">

      <!-- HERO CAROUSEL -->
      <section style="padding-top:20px;">
        <div id="contacto-carousel-container"></div>
      </section>

      <!-- MARQUEE -->
      <div class="mvh-marquee" style="margin-top:-20px;position:relative;z-index:10;">
        <div class="mvh-marquee-track">${marqueeHTML}</div>
      </div>

      <!-- CONTACT INFO + FORM -->
      <section style="padding:100px 0;">
        <div class="container">
          <div class="mvh-section-head reveal-up">
            <span class="mvh-eyebrow">Contacto</span>
            <h2 class="mvh-section-title">Hablemos de <em>Negocios</em></h2>
            <p class="mvh-section-sub">Estamos listos para impulsarte. Déjanos tus datos y un asesor se pondrá en contacto contigo.</p>
          </div>

          <div class="contacto-info-grid">
            ${contactCards.map(c => `
              <div class="contacto-info-card reveal-up" ${c.delay ? `style="transition-delay:${c.delay}"` : ''}>
                <div class="contacto-info-icon">${c.emoji}</div>
                <h3 class="contacto-info-title">${c.title}</h3>
                <p class="contacto-info-text">${c.text}</p>
              </div>
            `).join('')}
          </div>

          <div id="contact-form-anchor" class="reveal-up" style="max-width:900px;margin:0 auto;background:white;border-radius:40px;box-shadow:0 30px 100px rgba(0,0,0,.05);padding:60px;border:1px solid rgba(0,0,0,.05);">
            <h3 style="font-size:2rem;font-weight:900;text-align:center;margin-bottom:40px;">¿Deseas ser distribuidor?</h3>
            <div id="contact-form-container"></div>
          </div>
        </div>
      </section>

      <!-- MAP -->
      <section style="padding:0 20px 100px;">
        <div class="glass-panel-premium reveal-up" style="padding:0;height:450px;overflow:hidden;border-radius:24px;">
          <iframe
            src="https://maps.google.com/maps?q=Comercializadora+Marvelsa,+Av.+Privada+de+la+Cruz+13,+Tlajomulco+de+Zuniga,+Jalisco&t=&z=16&ie=UTF8&iwloc=B&output=embed"
            width="100%" height="100%" frameborder="0"
            style="border:0;display:block;" allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div class="reveal-up" style="display:flex;align-items:center;gap:12px;margin-top:20px;padding:18px 24px;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.06);">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span style="font-size:0.95rem;color:rgba(0,0,0,.7);font-weight:500;">Av. Privada de la Cruz 13, Tlajomulco de Zúñiga, Jalisco, México.</span>
        </div>
      </section>

    </main>
    ${getFooterHTML()}
  `;

  renderNavbar('nav-container');
  renderHeroCarousel('contacto-carousel-container');
  renderLeadForm('contact-form-container');

  if (shouldScroll) {
    setTimeout(() => {
      const el = document.getElementById('contact-form-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }

  activateRevealObserver();
};
