// src/pages/brandMicrosite.js
import { brands } from '../data/brands.js';
import { renderNavbar } from '../components/Navbar.js';
import { renderLeadForm } from '../components/LeadForm.js';
import { getFooterHTML } from '../components/Footer.js';
import {
  bannerKawashima, bannerGoldenTree, bannerPowerHunt, bannerTakashi, bannerParazzini,
  bgKawashimaFondo, bgKawashimaFondoNew, bgParazziniFondo, bgGoldenTreeFondo, bgPowerHuntFondo, bgTakashiFondo,
  imgKawAgricola, imgKawBosque, imgKawJardin,
  imgAK26_1, imgAK26_2, imgAK26_3, imgAK20LE_1, imgAK20LE_2,
  imgMTK26_1, imgMTK26_2, imgMTK26_3, pdfMTK26, pdfAK20LE,
  imgDKM26KN_1, imgDKM26KN_2, imgDKM26KN_3,
} from '../assets/images.js';

/* ─── shared helpers ─── */

const makeParticles = (containerId, color) => {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'kaw-particle';
    const s = Math.random() * 5 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}vw;bottom:-10px;background:${color.replace('1)', `${Math.random() * .4 + .1})`)}`;
    p.style.animationDuration = `${Math.random() * 10 + 8}s`;
    p.style.animationDelay = `${Math.random() * 15}s`;
    c.appendChild(p);
  }
};

const makeSectionObserver = (cardSelector) => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.querySelectorAll(cardSelector).forEach(el => el.classList.add('kaw-visible', 'par-visible', 'gt-visible', 'ph-visible', 'tak-visible'));
        observer.unobserve(en.target);
      }
    });
  }, { threshold: 0.1 });
  return observer;
};

const initProductCarousels = () => {
  document.querySelectorAll('.product-carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (images.length <= 1) return;

    images.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    let current = 0;
    let interval;

    const show = (next) => {
      const prev = current;
      images[prev].classList.remove('active');
      images[prev].classList.add('exit');
      dots[prev].classList.remove('active');
      current = next;
      images[current].classList.remove('exit');
      images[current].classList.add('active');
      dots[current].classList.add('active');
      setTimeout(() => images[prev].classList.remove('exit'), 800);
    };

    const startInterval = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (!document.contains(carousel)) { clearInterval(interval); return; }
        show((current + 1) % images.length);
      }, 4000);
    };

    carousel.addEventListener('click', e => { e.stopPropagation(); show((current + 1) % images.length); startInterval(); });
    startInterval();
  });
};

/* ─── KAWASHIMA ─── */

const renderKawashima = () => {
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main>
      <section class="kaw-hero">
        <div class="kaw-hero-bg" style="background-image:url('${bgKawashimaFondoNew}');"></div>
        <div class="kaw-hero-overlay"></div>
        <div class="kaw-hero-grid"></div>
        <div id="kaw-particles"></div>
        <div class="kaw-hero-content">
          <div class="kaw-badge">⚡ Maquinaria Profesional • México</div>
          <h1 class="kaw-hero-title">KAWASHIMA</h1>
          <p class="kaw-hero-slogan">El Trabajo Real Necesita Herramientas Reales</p>
          <div class="kaw-hero-divider"></div>
          <div class="kaw-hero-stats">
            <div class="kaw-stat"><span class="kaw-stat-number">30+</span><span class="kaw-stat-label">Años de potencia</span></div>
            <div class="kaw-stat" style="border-left:1px solid rgba(255,255,255,.08);border-right:1px solid rgba(255,255,255,.08);padding:0 60px;">
              <span class="kaw-stat-number">5K+</span><span class="kaw-stat-label">Distribuidores activos</span>
            </div>
            <div class="kaw-stat"><span class="kaw-stat-number">100%</span><span class="kaw-stat-label">Refacciones disponibles</span></div>
          </div>
          <div class="kaw-hero-cta">
            <button class="kaw-btn-primary" onclick="window.renderContacto(true)">Ser Distribuidor</button>
            <button class="kaw-btn-outline" onclick="document.getElementById('kaw-cats').scrollIntoView({behavior:'smooth'})">Ver Catálogo</button>
          </div>
        </div>
      </section>

      <!-- MARQUEE -->
      <div class="kaw-marquee-strip">
        <div class="kaw-marquee-track">
          ${Array(8).fill(['Aspersión', 'Motosierras', 'Desbrozadoras', 'Podadoras', 'Refacciones', 'Soporte Técnico'].map(t => `<span class="kaw-marquee-item">${t}<span class="kaw-marquee-dot"></span></span>`).join('')).join('')}
        </div>
      </div>

      <!-- INTRO -->
      <section class="kaw-intro" id="kaw-intro">
        <div class="kaw-intro-inner">
          <div class="kaw-intro-left">
            <span class="kaw-intro-eyebrow">Nuestra Esencia</span>
            <h2 class="kaw-intro-title">Herramientas profesionales,<br>precio justo y soporte en México.</h2>
            <p class="kaw-intro-text">
              Fabricamos equipos potentes, resistentes y accesibles para el campo, la jardinería y el bosque. Creemos que la calidad no debe ser un lujo, por eso ofrecemos maquinaria de alto desempeño con precio justo, refacciones disponibles y servicio en todo México.<br><br>
              En Kawashima trabajamos contigo, para que nada detenga tu esfuerzo.
            </p>
          </div>
          <div class="kaw-intro-features">
            ${[
    { icon: 'wrench', title: 'Herramientas profesionales', desc: 'Equipos diseñados para uso rudo, con tecnología que garantiza durabilidad en cualquier jornada.', path: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
    { icon: 'tag', title: 'Precio justo', desc: 'Calidad de alto desempeño a un costo accesible para potenciar tu inversión.', path: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01' },
    { icon: 'headset', title: 'Soporte en México', desc: 'Red nacional de centros de servicio y refacciones siempre al alcance de tu mano.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4' },
  ].map((f, i) => `
              <div class="kaw-feature-item" style="transition-delay:${i * 0.15 + 0.1}s">
                <div class="kaw-feature-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="${f.path}"/></svg>
                </div>
                <div class="kaw-feature-text"><h4>${f.title}</h4><p>${f.desc}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <hr class="kaw-sep">

      <!-- CATEGORIES -->
      <section class="kaw-categories" id="kaw-cats">
        <div class="kaw-section-header">
          <span class="kaw-section-eyebrow">Líneas de producto</span>
          <h2 class="kaw-section-title">Un universo de<br><em>soluciones</em></h2>
          <p class="kaw-section-sub">Cada línea está diseñada con propósito específico para maximizar tu productividad.</p>
        </div>
        <div class="kaw-cat-grid">
          ${[
    { img: imgKawBosque, name: 'BOSQUE', desc: 'Motosierras profesionales, cadenas y refacciones diseñadas para ofrecer fuerza constante, cortes limpios y larga durabilidad.' },
    { img: imgKawAgricola, name: 'AGRÍCOLA', desc: 'Nuestra oferta en aspersores a motor, manuales y eléctricos brindan potencia, autonomía y eficiencia para todo tipo de cultivos. Equipos confiables que te permiten trabajar con precisión y sin interrupciones, a precio justo.' },
    { img: imgKawJardin, name: 'JARDÍN', desc: 'Desde desbrozadoras hasta sierras telescópicas, nuestras herramientas ofrecen potencia controlada y comodidad para cada jornada. Ideales para profesionales que buscan acabados limpios, rendimiento y confianza en cada uso.' },
  ].map(cat => `
            <div class="kaw-cat-card">
              <div class="kaw-cat-img" style="background-image:url('${cat.img}');"></div>
              <div class="kaw-cat-overlay" style="background:linear-gradient(to top,rgba(0,0,0,.9) 0%,rgba(0,0,0,.4) 40%,transparent 100%);"></div>
              <div class="kaw-cat-content" style="justify-content:flex-end;padding:40px 25px;text-align:center;">
                <div class="kaw-cat-name" style="text-transform:uppercase;font-size:2.2rem;font-weight:900;letter-spacing:2px;margin-bottom:10px;color:white;-webkit-text-stroke:1.2px #CC1111;paint-order:stroke fill;">${cat.name}</div>
                <div style="height:4.5rem;display:flex;align-items:flex-start;justify-content:center;">
                  <p style="color:rgba(255,255,255,.9);font-size:0.85rem;line-height:1.4;margin:0;max-width:320px;">${cat.desc}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- FEATURED PRODUCTS -->
      <section class="kaw-products">
        <div class="kaw-section-header">
          <span class="kaw-section-eyebrow">Top Productos</span>
          <h2 class="kaw-section-title">Equipos destacados</h2>
          <p class="kaw-section-sub">Ingeniería que no falla cuando más la necesitas.</p>
        </div>
        <div class="kaw-prod-grid">
          <div class="kaw-prod-card">
            <div class="kaw-prod-img-wrap product-carousel">
              <img loading="lazy" src="${imgKawBosque}" class="active" alt="Motosierra Profesional">
              <div class="carousel-dots"></div>
            </div>
            <span class="kaw-prod-tag">Bosque</span>
            <div class="kaw-prod-name">Motosierras Profesionales</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">Fuerza constante y cortes limpios<br>Diseñadas para durabilidad extrema</div>
            <a href="https://drive.google.com/file/d/1_cz69JEq-QHj_dGuKpY0JnxQCsl6uIK1/view?usp=drive_link" target="_blank" rel="noopener" class="kaw-prod-cta" style="text-decoration:none;">
              Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
          <div class="kaw-prod-card">
            <div class="kaw-prod-img-wrap product-carousel">
              <img loading="lazy" src="/Users/alanhernandezvazquez/.gemini/antigravity/brain/50be9afa-246a-496c-aaca-d99acce4ad84/aspersor_manual_campo_1778956715575.png" class="active" alt="Aspersor Manual en Campo">
              <div class="carousel-dots"></div>
            </div>
            <span class="kaw-prod-tag">Agrícola</span>
            <div class="kaw-prod-name">Oferta de Aspersores</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">A motor, manuales y eléctricos<br>Eficiencia para todo tipo de cultivos</div>
            <a href="https://drive.google.com/file/d/1iwXDsjfivbGO7g4DDOBtfHz09r9vk_c3/view?usp=drive_link" target="_blank" rel="noopener" class="kaw-prod-cta" style="text-decoration:none;">
              Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
          <div class="kaw-prod-card">
            <div class="kaw-prod-img-wrap product-carousel">
              <img loading="lazy" src="${imgKawJardin}" class="active" alt="Desbrozadora Kawashima">
              <div class="carousel-dots"></div>
            </div>
            <span class="kaw-prod-tag">Jardín</span>
            <div class="kaw-prod-name">Desbrozadoras y Sierras</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">Potencia controlada y comodidad<br>Rendimiento para cada jornada profesional</div>
            <a href="https://drive.google.com/file/d/1pqkksN8Q335B2cV26wUfTjHXy2bvUhyg/view?usp=drive_link" target="_blank" rel="noopener" class="kaw-prod-cta" style="text-decoration:none;">
              Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
        </div>
      </section>

      <!-- WHY KAWASHIMA -->
      <section style="background:var(--kaw-dark);padding:120px 0;">
        <div style="max-width:1200px;margin:0 auto;padding:0 40px;">
          <div style="text-align:center;margin-bottom:80px;">
            <span class="kaw-section-eyebrow">Nuestra diferencia</span>
            <h2 class="kaw-section-title">¿Por qué elegir<br>Kawashima?</h2>
          </div>
          <div class="why-grid">
            ${[
    {
      title: 'Relación calidad–precio',
      text: 'En Kawashima creemos que la calidad profesional no tiene que costar de más. Ofrecemos maquinaria profesional a un precio justo, pensado para quienes trabajan todos los días en campo, jardín o bosque.',
      icon: `
        <line x1="12" y1="2" x2="12" y2="22"/>
        <line x1="5" y1="6" x2="12" y2="4"/>
        <line x1="19" y1="6" x2="12" y2="4"/>
        <path d="M5 6L2 13h6z"/>
        <path d="M19 6l-3 7h6z"/>
        <line x1="4" y1="22" x2="20" y2="22"/>
      `
    },
    {
      title: 'Durabilidad en productos',
      text: 'Fabricamos con materiales de alto rendimiento que aseguran potencia constante y larga vida útil, siempre que se realice el mantenimiento preventivo y el uso adecuado del equipo.',
      icon: `
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      `
    },
    {
      title: 'Refacciones en todos los equipos',
      text: 'Todos nuestros equipos cuentan con refacciones disponibles en México y una red de servicio lista para mantener tus máquinas en marcha. Con Kawashima, siempre encuentras la pieza que necesitas para seguir trabajando.',
      icon: `
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      `
    },

  ].map(card => `
              <div class="kaw-why-card" style="background:rgba(255,255,255,0.03);text-align:center;padding:60px 35px 50px;border-radius:32px;position:relative;overflow:visible;border:1px solid rgba(255,255,255,0.06);transition:all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);box-shadow:0 20px 40px rgba(0,0,0,0.2);">
                <div style="position:absolute;top:0;left:0;right:0;height:4px;background:var(--kaw-red);border-radius:32px 32px 0 0;opacity:0.8;"></div>
                <div class="kaw-card-icon-wrap" style="width:90px;height:90px;background:white;border-radius:24px;display:flex;align-items:center;justify-content:center;margin:-105px auto 30px;box-shadow:0 20px 40px rgba(204,17,17,0.3);position:relative;z-index:2;transform:rotate(-5deg);">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#CC1111" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    ${card.icon}
                  </svg>
                </div>
                <h3 style="font-size:1.15rem;font-weight:900;color:white;text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;">${card.title}</h3>
                <p style="color:rgba(255,255,255,0.6);font-size:0.95rem;line-height:1.8;margin:0;">${card.text}</p>
              </div>

            `).join('')}
          </div>
        </div>
      </section>

      <!-- BLOG/GUIDE PREVIEW -->
      <section style="background:#f9f9f9; padding:80px 0;">
        <div class="container-narrow reveal-up" style="display:flex; align-items:center; gap:60px;">
          <div style="flex:1;">
            <span class="kaw-section-eyebrow">Consejo del Experto</span>
            <h2 class="kaw-section-title" style="margin-bottom:25px; color:#111;">Cómo elegir la desbrozadora Kawashima ideal</h2>
            <p style="color:#666; font-size:1.1rem; line-height:1.8; margin-bottom:30px;">
              Elegir la herramienta correcta marca la diferencia entre un trabajo pesado y uno bien hecho. Descubre nuestra guía completa para identificar el equipo que mejor se adapta a tus necesidades.
            </p>
            <button onclick="window.renderBlogArticle('desbrozadora-kawashima')" class="kaw-btn-primary" style="border-radius:100px; padding:15px 35px;">Leer Guía Completa</button>
          </div>
          <div style="flex:1; border-radius:30px; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.15);">
             <img src="${imgKawJardin}" alt="Mantenimiento de Jardín" style="width:100%; height:100%; object-fit:cover;">
          </div>
        </div>
      </section>

      <!-- DISTRIBUTOR SPLIT BANNER -->
      <section class="split-banner" style="background:var(--kaw-black);">
        <div class="split-banner-text">
          <h2 style="font-size:clamp(2.5rem,5vw,4.2rem);font-weight:900;color:white;line-height:1.1;margin-bottom:25px;text-transform:uppercase;">
            Súmate a la <span style="color:var(--kaw-red);">red de distribución</span> Kawashima
          </h2>
          <p style="color:var(--kaw-muted);font-size:1.1rem;line-height:1.8;margin-bottom:40px;">
            Forma parte de una marca que está transformando el acceso a herramientas profesionales en México.
            Maquinaria de alta demanda, soporte constante y respaldo comercial para que tu negocio crezca con nosotros.
          </p>
          <a href="https://forms.gle/ZnBSdJCScRHuZLnY6" target="_blank" rel="noopener" class="kaw-btn-primary" style="text-decoration:none;border-radius:100px;padding:20px 40px;font-size:1rem;display:inline-block;">
            Conviértete en distribuidor Kawashima
          </a>
        </div>
        <div class="split-banner-img" style="--overlay-color:var(--kaw-black);background-image:url('${bannerKawashima}');background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#0a0a0a;">
        </div>
      </section>

      ${getFooterHTML()}
    </main>
  `;

  renderNavbar('nav-container');
  makeParticles('kaw-particles', 'rgba(204,17,17,1)');
  const obs = makeSectionObserver('.kaw-cat-card, .kaw-prod-card, .kaw-feature-item');
  document.querySelectorAll('.kaw-categories, .kaw-products, .kaw-intro').forEach(s => obs.observe(s));
  initProductCarousels();
};

/* ─── GENERIC BRAND TEMPLATE ─── */

const brandConfig = {
  parazzini: {
    css: 'par', bg: bgParazziniFondo, banner: bannerParazzini,
    badge: '🇮🇹 Ingeniería Italiana • México', title: 'PARAZZINI', slogan: 'Potencia, calidad y respaldo al servicio del trabajo profesional.',
    accentColor: '#1A7A4A',
    stats: [{ n: '20+', l: 'Años de experiencia' }, { n: '3K+', l: 'Profesionales equipados', mid: true }, { n: '100%', l: 'Soporte técnico' }],
    marquee: ['Sector Agrícola', 'Construcción', 'Sector Hogar', 'Calidad Italiana', 'Potencia Real', 'Refacciones'],
    introCopy: 'Parazzini es una marca de maquinaria diseñada para responder a las exigencias reales del campo, la construcción y la industria. Ofrecemos equipos potentes, confiables y accesibles, desarrollados con estándares técnicos altos y motores de calidad italiana que garantizan durabilidad y rendimiento.',
    cats: [
      { img: bannerParazzini, name: 'SECTOR AGRÍCOLA', desc: 'Todo lo que necesitas para armar sistemas de riego eficientes, duraderos y con calidad técnica. Desde mangueras y tubería PVC hasta motobombas de alto rendimiento, ofrecemos soluciones completas para ingenieros de riego y profesionales del agro que buscan sistemas funcionales, resistentes y fáciles de instalar.', subs: 'MANGUERAS • TUBERÍA PVC • MOTOBOMBAS' },
      { img: bannerGoldenTree, name: 'SECTOR CONSTRUCCIÓN', desc: 'Equipos robustos para trabajos pesados, pensados para durar en obra. Revolvedoras, motobombas, generadores y más equipos que brindan potencia real en cada proyecto. Nuestra maquinaria está diseñada para soportar las condiciones exigentes del sitio de construcción, con el respaldo que todo profesional necesita.', subs: 'REVOLVEDORAS • MOTOBOMBAS • GENERADORES' },
      { img: bannerPowerHunt, name: 'SECTOR HOGAR', desc: 'Soluciones confiables para mantener tu hogar funcionando con eficiencia. Desde bombas presurizadoras hasta potentes hidrolavadoras que combinan rendimiento, facilidad de uso y durabilidad. Perfectas para quienes buscan resultados profesionales también en casa.', subs: 'HIDROLAVADORAS • BOMBAS PRESURIZADORAS' },
    ],
    prods: [{ name: 'Motobomba PRZ', tag: 'Construcción' }, { name: 'Generador PRZ', tag: 'Energía' }, { name: 'Hidrolavadora PRZ', tag: 'Hogar' }, { name: 'Revolvedora PRZ', tag: 'Construcción' }],
    why: [
      { title: 'Refacciones disponibles en todos los equipos', text: 'Nuestros productos están pensados para el largo plazo. Por eso, garantizamos disponibilidad de refacciones en todo el catálogo, asegurando mantenimiento continuo, ahorro a futuro y tranquilidad para el usuario profesional.' },
      { title: 'Calidad técnica y potencia real', text: 'Cada máquina Parazzini combina potencia profesional con componentes de calidad, incluyendo motores de ingeniería italiana. Esto se traduce en equipos que rinden más, aguantan más y elevan el estándar del trabajo técnico.' },
      { title: 'Durabilidad y respaldo', text: 'Nuestros equipos están diseñados para soportar las condiciones reales del campo, la obra y el uso intensivo. Y no estás solo: nuestro compromiso de respaldo incluye servicio, asesoría y atención postventa, porque sabemos que en el trabajo serio, el soporte hace la diferencia.' },
    ],
    contactLink: 'https://forms.gle/vXg39DUZdyiDzJH58',
    contactText: 'Forma parte de una marca que está elevando el estándar de la maquinaria profesional en México. Equipos con respaldo, durabilidad y alto valor percibido para que tu negocio crezca con nosotros.',
  },
  goldentree: {
    css: 'gt', bg: bgGoldenTreeFondo, banner: bannerGoldenTree,
    badge: '🌾 Riego Agrícola • México', title: 'GOLDEN TREE', slogan: 'Cintilla y soluciones de riego de alta eficiencia.',
    accentColor: '#C89B2A',
    stats: [{ n: '40+', l: 'Años en el mercado' }, { n: '50+', l: 'Soluciones de riego', mid: true }, { n: '100%', l: 'Respaldo técnico' }],
    marquee: ['Cintilla de Riego', 'Eficiencia Hídrica', 'Alta Resistencia', 'Riego Agrícola', 'Calidad Global', 'Soporte Técnico'],
    introCopy: 'Somos una marca especializada en cintilla y soluciones de riego diseñadas para maximizar la eficiencia hídrica y la durabilidad del sistema. Innovamos en materiales con más calibres y mayor resistencia para ofrecer al agricultor rendimiento confiable y protección de su inversión en cada temporada.',
    cats: [],
    prods: [{ name: 'Cintilla Golden Tree', tag: 'Riego' }, { name: 'Conectores Pro', tag: 'Riego' }, { name: 'Filtros de Anillas', tag: 'Riego' }, { name: 'Válvulas de Paso', tag: 'Riego' }],
    why: [
      { title: 'Más de 40 años en el mercado mundial', text: 'Nuestra experiencia global nos respalda. Durante más de cuatro décadas, Golden Tree ha desarrollado soluciones de riego confiables que hoy impulsan la productividad de agricultores en distintos países del mundo.' },
      { title: 'Procesos de calidad', text: 'Cada rollo de cintilla Golden Tree pasa por estrictos controles de calidad y pruebas de rendimiento. Utilizamos materiales de alta resistencia y tecnología avanzada para asegurar durabilidad y eficiencia en cada sistema de riego.' },
      { title: 'Respaldo en todos los productos', text: 'No solo ofrecemos productos, ofrecemos confianza. Nuestro compromiso es acompañar al agricultor con asesoría, soporte y garantía real, porque sabemos que detrás de cada cultivo hay una inversión que merece protección.' },
    ],
    contactLink: 'https://forms.gle/cVH1y8d3zrDx7XJ47',
    contactText: 'Forma parte de una marca que está transformando el riego agrícola con innovación, calidad y confianza. En Golden Tree, respaldamos a cada distribuidor con productos de alto rendimiento, soporte técnico y crecimiento en conjunto. Crece con nosotros y lleva soluciones confiables a más agricultores.',
  },
  powerhunt: {
    css: 'ph', bg: bgPowerHuntFondo, banner: bannerPowerHunt,
    badge: '⚡ Herramientas Prácticas • México', title: 'POWER HUNT', slogan: 'Herramientas prácticas para trabajos reales.',
    accentColor: '#005BB5',
    stats: [{ n: '25+', l: 'Años de servicio' }, { n: '4K+', l: 'Usuarios felices', mid: true }, { n: '100%', l: 'Refacciones' }],
    marquee: ['Hogar', 'Agrícola', 'Jardín', 'Práctico', 'Accesible', 'Refacciones Disponibles'],
    introCopy: 'Diseñamos herramientas pensadas para quienes valoran lo práctico: equipos accesibles, confiables y listos para entrar en acción. Sea en casa, en el jardín o en el campo, Power Hunt te acompaña con soluciones que rinden en lo cotidiano.',
    cats: [
      { img: bannerPowerHunt, name: 'HOGAR', desc: 'Hidrolavadoras, generadores y más. Ya sea para limpiar a fondo o tener energía lista cuando se va la luz, nuestras soluciones están hechas para facilitar tu rutina.', subs: 'HIDROLAVADORAS • GENERADORES' },
      { img: bannerKawashima, name: 'AGRÍCOLA', desc: 'Aspersores, motobombas y más para el campo. Llevamos potencia práctica al trabajo agrícola. Productos listos para acompañarte en cada jornada, desde el riego hasta el traslado de agua.', subs: 'ASPERSORES • MOTOBOMBAS' },
      { img: bannerGoldenTree, name: 'JARDÍN', desc: 'Desbrozadoras, motosierras y equipos de mantenimiento. Porque cuidar tu jardín también merece herramientas confiables. Equipos ligeros, funcionales y fáciles de usar.', subs: 'DESBROZADORAS • MOTOSIERRAS' },
    ],
    prods: [{ name: 'Hidrolavadora PH', tag: 'Hogar' }, { name: 'Generador Portátil PH', tag: 'Hogar' }, { name: 'Aspersor PH', tag: 'Agrícola' }, { name: 'Desbrozadora PH', tag: 'Jardín' }],
    why: [
      { title: 'Refacciones en todos los equipos', text: 'Porque sabemos lo importante que es darles vida útil a tus herramientas. Todos nuestros productos cuentan con refacciones disponibles para que sigan funcionando cuando más los necesitas.' },
      { title: 'Practicidad accesible', text: 'Nuestros productos están pensados para tareas cotidianas y de baja exigencia, con el rendimiento justo para resolver con eficiencia y la calidad necesaria para hacerlo bien, siempre.' },
      { title: 'Herramientas fáciles de usar', text: 'No necesitas ser experto para usarlas. Nuestras herramientas son seguras y pensadas para que cualquiera pueda sacarles provecho desde el primer uso.' },
    ],
    contactLink: 'https://forms.gle/14HdmMV9jE7ziRsU9',
    contactText: 'Súmate a nuestra red de distribuidores y lleva herramientas prácticas, accesibles y confiables a más personas. Con Power Hunt, tienes una marca con productos funcionales y respaldo en refacciones.',
  },
  takashi: {
    css: 'tak', bg: bgTakashiFondo, banner: bannerTakashi,
    badge: '🔧 Eficiencia sin Complicaciones • México', title: 'TAKASHI', slogan: 'Herramientas que cumplen. Sin complicaciones.',
    accentColor: '#FF6600',
    stats: [{ n: '20+', l: 'Años de experiencia' }, { n: '2K+', l: 'Usuarios prácticos', mid: true }, { n: '100%', l: 'Refacciones' }],
    marquee: ['Forestal', 'Agrícola', 'Jardín', 'Funcionalidad', 'Accesibilidad', 'Resistencia'],
    introCopy: 'Takashi es una marca de maquinaria ligera y accesible, diseñada para quienes hacen trabajos simples, pero exigen buenos resultados. Nuestras herramientas son prácticas, resistentes y listas para cuando más se necesitan.',
    cats: [
      { img: bannerTakashi, name: 'FORESTAL', desc: 'Potencia ligera para cortes precisos. Nuestras motosierras están diseñadas para tareas de baja a media exigencia, ideales para quienes necesitan una herramienta confiable, fácil de usar y siempre lista para responder.', subs: 'MOTOSIERRAS • CADENAS • ACCESORIOS' },
      { img: bannerPowerHunt, name: 'AGRÍCOLA', desc: 'Riego fácil, soluciones que cumplen. Takashi ofrece aspersores de mochila y motobombas pensadas para las necesidades del campo. Productos prácticos, duraderos y funcionales para tareas de riego ligero o traslado de agua.', subs: 'ASPERSORES • MOTOBOMBAS' },
      { img: bannerKawashima, name: 'JARDÍN', desc: 'Control total sin esfuerzo. Con nuestras desbrozadoras mantén tu jardín o terreno limpio y en orden. Ligeras, cómodas y fáciles de usar, son la opción ideal para trabajos de mantenimiento con buenos resultados.', subs: 'DESBROZADORAS • PODADORAS' },
    ],
    prods: [{ name: 'Motosierra Takashi', tag: 'Forestal' }, { name: 'Aspersor Takashi', tag: 'Agrícola' }, { name: 'Motobomba Takashi', tag: 'Agrícola' }, { name: 'Desbrozadora Takashi', tag: 'Jardín' }],
    why: [
      { title: 'Refacciones disponibles para todos nuestros equipos', text: 'Sabemos lo importante que es mantener tus herramientas funcionando. Por eso, cada producto Takashi cuenta con refacciones disponibles, para que siempre tengas una solución a la mano y sigas trabajando sin interrupciones.' },
      { title: 'Diseño ligero, materiales resistentes', text: 'Nuestras herramientas están hechas con materiales seleccionados que ofrecen durabilidad y confianza, pero sin sacrificar comodidad. Su diseño ligero permite un manejo fácil y seguro, ideal para tareas cotidianas o esporádicas.' },
      { title: 'Herramientas prácticas para trabajos reales', text: 'Takashi no es lujo innecesario, es funcionalidad pura. Diseñamos cada equipo pensando en quienes necesitan resolver tareas concretas con eficiencia, sin complicarse ni gastar de más.' },
    ],
    contactLink: 'https://forms.gle/pUAjVxuKtu9rqK3GA',
    contactText: 'Llévate a tu negocio una marca confiable, accesible y con productos que realmente se mueven. Forma parte de nuestra red de distribución y ofrece a tus clientes herramientas que responden, sin complicaciones.',
  },
};

const renderGenericBrand = (brandId) => {
  const cfg = brandConfig[brandId];
  const p = cfg.css;  // prefix: 'par', 'gt', 'ph', 'tak'

  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main>
      <section class="${p}-hero">
        <div class="${p}-hero-bg" style="background-image:url('${cfg.bg}');"></div>
        <div class="${p}-hero-overlay"></div>
        <div class="${p}-hero-grid"></div>
        <div id="${p}-particles"></div>
        <div class="${p}-hero-content">
          <div class="${p}-badge">${cfg.badge}</div>
          <h1 class="${p}-hero-title">${cfg.title}</h1>
          <p class="${p}-hero-slogan">${cfg.slogan}</p>
          <div class="${p}-hero-divider"></div>
          <div class="${p}-hero-stats">
            ${cfg.stats.map(s => `
              <div ${s.mid ? `style="border-left:1px solid rgba(255,255,255,.08);border-right:1px solid rgba(255,255,255,.08);padding:0 60px;"` : ''}>
                <span class="${p}-stat-number">${s.n}</span>
                <span class="${p}-stat-label">${s.l}</span>
              </div>
            `).join('')}
          </div>
          <div class="${p}-hero-cta">
            <button class="${p}-btn-primary" onclick="window.renderContacto(true)">Ser Distribuidor</button>
            <button class="${p}-btn-outline" onclick="document.getElementById('${p}-cats').scrollIntoView({behavior:'smooth'})">Ver Catálogo</button>
          </div>
        </div>
      </section>

      <div class="${p}-marquee-strip">
        <div class="${p}-marquee-track">
          ${Array(8).fill(cfg.marquee.map(t => `<span class="${p}-marquee-item">${t}<span class="${p}-marquee-dot"></span></span>`).join('')).join('')}
        </div>
      </div>

      <section class="${p}-intro" id="${p}-intro">
        <div class="${p}-intro-inner">
          <div>
            <span class="${p}-intro-eyebrow">Nuestra Esencia</span>
            <h2 class="${p}-intro-title">Diseñados para <em>ti</em></h2>
            <p class="${p}-intro-text">${cfg.introCopy}</p>
          </div>
          <div class="${p}-features">
            ${[
    { title: 'Calidad', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
    { title: 'Diseño', path: 'M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' },
    { title: 'Soporte', path: 'M21 10c0-4.97-4.03-9-9-9s-9 4.03-9 9M7 15h10m2 0a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2M5 15a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2' }
  ].map((f, i) => `
              <div class="${p}-feature-item" style="transition-delay:${i * 0.15 + 0.1}s">
                <div class="${p}-feature-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="${f.path}"/></svg>
                </div>
                <div class="${p}-feature-text"><h4>${f.title} Comprobada</h4><p>Herramientas que garantizan resultados profesionales en cada jornada de trabajo.</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <hr class="${p}-sep">

      ${cfg.cats.length > 0 ? `
      <section class="${p}-categories" id="${p}-cats">
        <div class="${p}-section-header">
          <span class="${p}-section-eyebrow">Líneas de producto</span>
          <h2 class="${p}-section-title">Equipos Para Cada Necesidad</h2>
        </div>
        <div class="${p}-cat-grid">
          ${cfg.cats.map(cat => `
            <div class="${p}-cat-card">
              <div class="${p}-cat-img" style="background-image:url('${cat.img}');"></div>
              <div class="${p}-cat-overlay"></div>
              <div class="${p}-cat-content">
                <div class="${p}-cat-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 4-2 8-2s4 2 8 2v-2c-4 0-4-2-8-2-1.13 0-1.9.16-2.53.33C13.93 11.66 17 8 17 8z"/></svg>
                </div>
                <div class="${p}-cat-name">${cat.name}</div>
                <div class="${p}-cat-desc">${cat.desc}</div>
                <span class="${p}-cat-count">${cat.subs}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>` : ''}

      <section class="${p}-products">
        <div class="${p}-section-header">
          <span class="${p}-section-eyebrow">Top Productos</span>
          <h2 class="${p}-section-title">Equipos destacados</h2>
          <p class="${p}-section-sub">La herramienta correcta hace la diferencia.</p>
        </div>
        <div class="${p}-prod-grid">
          ${cfg.prods.map(prod => `
            <div class="${p}-prod-card">
              <div style="height:180px;background:rgba(0,0,0,.03);border-radius:10px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;">
                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(100,100,100,0.2)" stroke-width="1"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 4-2 8-2s4 2 8 2v-2"/></svg>
              </div>
              <span class="${p}-prod-tag">${prod.tag}</span>
              <div class="${p}-prod-name">${prod.name}</div>
              <div class="${p}-prod-spec">Alta eficiencia • Diseño ergonómico<br>Refacciones disponibles en México</div>
              <a href="#" class="${p}-prod-cta" style="text-decoration:none;">
                Ver ficha técnica <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="background:var(--${p}-dark);padding:120px 0;">
        <div style="max-width:1200px;margin:0 auto;padding:0 40px;">
          <div style="text-align:center;margin-bottom:80px;">
            <span class="${p}-section-eyebrow">Nuestra diferencia</span>
            <h2 class="${p}-section-title">¿Por qué elegir ${cfg.title}?</h2>
          </div>
          <div class="why-grid">
            ${(cfg.why || ['Calidad Premium', 'Diseño Ergonómico', 'Cobertura Nacional']).map(item => typeof item === 'string' ? `
              <div class="${p}-prod-card" style="text-align:center;padding:50px 35px;">
                <div style="width:90px;height:90px;background:rgba(100,100,100,.1);border:1px solid rgba(100,100,100,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px;">
                  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="${cfg.accentColor}" stroke-width="2"><circle cx="32" cy="32" r="22"/><path d="M22 32 l8 8 14-16"/></svg>
                </div>
                <h3 style="font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;">${item}</h3>
                <p style="font-size:0.95rem;line-height:1.8;margin:0;opacity:0.7;">Materiales de primera línea que garantizan durabilidad y rendimiento en cada jornada de trabajo.</p>
              </div>
            ` : `
              <div class="${p}-prod-card" style="text-align:center;padding:50px 35px;">
                <div style="width:90px;height:90px;background:rgba(100,100,100,.1);border:1px solid rgba(100,100,100,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px;">
                  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="${cfg.accentColor}" stroke-width="2"><circle cx="32" cy="32" r="22"/><path d="M22 32 l8 8 14-16"/></svg>
                </div>
                <h3 style="font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;">${item.title}</h3>
                <p style="font-size:0.95rem;line-height:1.8;margin:0;opacity:0.7;">${item.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="split-banner" style="background:var(--${p}-black);">
        <div class="split-banner-text">
          <h2 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;margin-bottom:25px;text-transform:uppercase;">
            Súmate a la red de<br><span style="color:${cfg.accentColor};">distribución ${cfg.title}</span>
          </h2>
          <p style="font-size:1rem;line-height:1.8;margin-bottom:40px;opacity:0.7;">
            ${cfg.contactText || 'Distribuidores con acceso a catálogo completo, precios preferenciales y soporte técnico especializado.'}
          </p>
          <a href="${cfg.contactLink || '#'}" target="_blank" rel="noopener" class="${p}-btn-primary" style="text-decoration:none;border-radius:100px;display:inline-block;padding:15px 30px;">
            CONVIÉRTETE EN DISTRIBUIDOR
          </a>
        </div>
        <div class="split-banner-img" style="--overlay-color:var(--${p}-black);background-image:url('${cfg.banner}');background-size:cover;background-position:center;filter:brightness(0.55) saturate(0.7);">
        </div>
      </section>

      ${getFooterHTML()}
    </main>
  `;

  renderNavbar('nav-container');
  makeParticles(`${p}-particles`, `rgba(${p === 'par' ? '26,122,74' : p === 'gt' ? '200,155,42' : p === 'ph' ? '0,91,181' : '255,102,0'},1)`);
  const obs = makeSectionObserver(`.${p}-cat-card, .${p}-prod-card, .${p}-feature-item`);
  document.querySelectorAll(`.${p}-categories, .${p}-products, .${p}-intro`).forEach(s => obs.observe(s));
};

/* ─── PUBLIC ENTRY POINT ─── */

export const renderBrandMicrosite = (brandId) => {
  const brand = brands[brandId];
  document.body.className = brand.theme;

  if (brandId === 'kawashima') return renderKawashima();
  if (brandConfig[brandId]) return renderGenericBrand(brandId);

  // Fallback for any future brand without a custom microsite
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main>
      <section class="brand-hero section-padding" style="background:linear-gradient(to bottom,rgba(0,0,0,.8),var(--bg-body));">
        <div class="container" style="text-align:center;">
          <h1 class="animate-fade" style="font-size:clamp(3rem,10vw,60px);">${brand.name}</h1>
          <p class="animate-fade" style="font-size:1.5rem;color:var(--primary);">${brand.slogan}</p>
        </div>
      </section>
      <section class="container section-padding">
        <div id="brand-lead-form"></div>
      </section>
    </main>
  `;
  renderNavbar('nav-container');
  renderLeadForm('brand-lead-form');
};
