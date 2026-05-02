// src/pages/brandMicrosite.js
import { brands }             from '../data/brands.js';
import { renderNavbar }       from '../components/Navbar.js';
import { renderLeadForm }     from '../components/LeadForm.js';
import { getFooterHTML }      from '../components/Footer.js';
import {
  bannerKawashima, bannerGoldenTree, bannerPowerHunt, bannerTakashi, bannerParazzini,
  bgKawashimaFondo, bgParazziniFondo, bgGoldenTreeFondo, bgPowerHuntFondo, bgTakashiFondo,
  imgKawAgricola, imgKawBosque, imgKawJardin,
  imgAK26_1, imgAK26_2, imgAK26_3, imgAK20LE_1, imgAK20LE_2, pdfAK20LE,
} from '../assets/images.js';

/* ─── shared helpers ─── */

const makeParticles = (containerId, color) => {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'kaw-particle';
    const s = Math.random() * 5 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}vw;bottom:-10px;background:${color.replace('1)', `${Math.random()*.4+.1})`)}`;
    p.style.animationDuration = `${Math.random()*10+8}s`;
    p.style.animationDelay    = `${Math.random()*15}s`;
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

    carousel.addEventListener('click', e => { e.stopPropagation(); show((current+1)%images.length); startInterval(); });
    startInterval();
  });
};

/* ─── KAWASHIMA ─── */

const renderKawashima = () => {
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main>
      <section class="kaw-hero">
        <div class="kaw-hero-bg" style="background-image:url('${bgKawashimaFondo}');"></div>
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
          ${Array(8).fill(['Aspersión','Motosierras','Desbrozadoras','Podadoras','Refacciones','Soporte Técnico'].map(t=>`<span class="kaw-marquee-item">${t}<span class="kaw-marquee-dot"></span></span>`).join('')).join('')}
        </div>
      </div>

      <!-- INTRO -->
      <section class="kaw-intro" id="kaw-intro">
        <div class="kaw-intro-inner">
          <div class="kaw-intro-left">
            <span class="kaw-intro-eyebrow">Nuestra Esencia</span>
            <h2 class="kaw-intro-title">Fabricados para el<br>campo <em>mexicano</em></h2>
            <p class="kaw-intro-text">
              Fabricamos equipos potentes, resistentes y accesibles para el campo, la jardinería y el bosque.
              Creemos que la calidad no debe ser un lujo, por eso ofrecemos maquinaria de alto desempeño con precio justo,
              refacciones disponibles y servicio en todo México.<br><br>
              En Kawashima trabajamos contigo, para que nada detenga tu esfuerzo.
            </p>
          </div>
          <div class="kaw-intro-features">
            ${[
              { icon:'wrench',  title:'Herramientas profesionales', desc:'Equipos diseñados para uso rudo, con tecnología que garantiza durabilidad en cualquier jornada.' },
              { icon:'tag',     title:'Precio justo',               desc:'Calidad de alto desempeño a un costo accesible para potenciar tu inversión.' },
              { icon:'headset', title:'Soporte en México',          desc:'Red nacional de centros de servicio y refacciones siempre al alcance de tu mano.' },
            ].map((f,i) => {
              const icons = {
                wrench: '<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>',
                tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>',
                headset: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
              };
              return `
                <div class="kaw-feature-item" style="transition-delay:${i*0.15+0.1}s">
                  <div class="kaw-feature-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">${icons[f.icon]}</svg>
                  </div>
                  <div class="kaw-feature-text"><h4>${f.title}</h4><p>${f.desc}</p></div>
                </div>
              `;
            }).join('')}
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
            { img: imgKawAgricola, name: 'AGRÍCOLA', desc: 'Aspersores a motor, manuales y eléctricos que brindan potencia, autonomía y eficiencia para todo tipo de cultivos.' },
            { img: imgKawBosque,   name: 'BOSQUE',   desc: 'Motosierras profesionales, cadenas y refacciones diseñadas para fuerza constante, cortes limpios y larga durabilidad.' },
            { img: imgKawJardin,   name: 'JARDÍN',   desc: 'Desde desbrozadoras hasta sierras telescópicas, nuestras herramientas ofrecen potencia controlada y comodidad.' },
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
              <img loading="lazy" src="${imgAK26_1}" class="active" alt="Aspersor AK 26 - 1">
              <img loading="lazy" src="${imgAK26_2}" alt="Aspersor AK 26 - 2">
              <img loading="lazy" src="${imgAK26_3}" alt="Aspersor AK 26 - 3">
              <div class="carousel-dots"></div>
            </div>
            <span class="kaw-prod-tag">Aspersión</span>
            <div class="kaw-prod-name">Aspersor AK 26</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">Motor 2 tiempos / 26cc<br>Alta eficiencia en cultivos extensos</div>
            <a href="https://drive.google.com/file/d/1_cz69JEq-QHj_dGuKpY0JnxQCsl6uIK1/view?usp=drive_link" target="_blank" rel="noopener" class="kaw-prod-cta" style="text-decoration:none;">
              Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
          <div class="kaw-prod-card">
            <div class="kaw-prod-img-wrap"><img loading="lazy" src="${bannerKawashima}" alt="MAKO 58"></div>
            <span class="kaw-prod-tag">Bosque</span>
            <div class="kaw-prod-name">Motosierra MAKO 58</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">Barra 18 Plg / 45cm<br>Corte profesional de alta potencia</div>
            <a href="#" class="kaw-prod-cta" style="text-decoration:none;">
              Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
          <div class="kaw-prod-card">
            <div class="kaw-prod-img-wrap"><img loading="lazy" src="${bannerKawashima}" alt="DKM26KN"></div>
            <span class="kaw-prod-tag">Jardín</span>
            <div class="kaw-prod-name">Desbrozadora DKM26KN</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">1 HP / 26cc — Tipo D<br>Ligera y versátil para todo terreno</div>
            <a href="#" class="kaw-prod-cta" style="text-decoration:none;">
              Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </a>
          </div>
          <div class="kaw-prod-card">
            <div class="kaw-prod-img-wrap product-carousel">
              <div class="kaw-img-cleaner" style="filter:invert(1);width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                <img loading="lazy" src="${imgAK20LE_1}" class="active" alt="Aspersor 20LE - 1" style="filter:invert(1);mix-blend-mode:screen;">
                <img loading="lazy" src="${imgAK20LE_2}" alt="Aspersor 20LE - 2" style="filter:invert(1);mix-blend-mode:screen;">
              </div>
              <div class="carousel-dots"></div>
            </div>
            <span class="kaw-prod-tag">Aspersión</span>
            <div class="kaw-prod-name">Aspersor Eléctrico 20LE</div>
            <div class="kaw-prod-spec" style="min-height:2.8rem;">Eléctrico / 26cc<br>Sin emisiones, máximo rendimiento</div>
            <a href="${pdfAK20LE}" target="_blank" rel="noopener" class="kaw-prod-cta" style="text-decoration:none;">
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
              { title:'Relación Calidad–Precio', text:'En Kawashima creemos que la calidad profesional no tiene que costar de más. Ofrecemos maquinaria profesional a un precio justo, pensado para quienes trabajan todos los días.' },
              { title:'Durabilidad en Productos', text:'Fabricamos con materiales de alto rendimiento que aseguran potencia constante y larga vida útil, siempre que se realice el mantenimiento preventivo y uso adecuado.' },
              { title:'Refacciones en todos los equipos', text:'Todos nuestros equipos cuentan con refacciones disponibles en México y una red de servicio lista para mantener tus máquinas en marcha.' },
            ].map(card => `
              <div class="kaw-why-card glass-panel" style="text-align:center;padding:60px 35px;border-radius:24px;position:relative;overflow:visible;">
                <div class="kaw-card-icon-wrap" style="width:100px;height:100px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:-110px auto 30px;box-shadow:0 15px 35px rgba(0,0,0,.2);position:relative;z-index:2;">
                  <svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="#CC1111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <h3 style="font-size:1.1rem;font-weight:900;color:white;text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;">${card.title}</h3>
                <p style="color:var(--kaw-muted);font-size:0.95rem;line-height:1.8;margin:0;">${card.text}</p>
              </div>
            `).join('')}
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
          <button class="kaw-btn-primary" onclick="window.renderContacto(true)" style="border-radius:100px;padding:20px 40px;font-size:1rem;">
            Conviértete en distribuidor Kawashima
          </button>
        </div>
        <div class="split-banner-img" style="--overlay-color:var(--kaw-black);background-image:url('${bannerKawashima}');background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#0a0a0a;">
        </div>
      </section>

      <!-- FINAL CTA -->
      <hr class="kaw-sep">
      <section class="kaw-cta-banner">
        <div class="kaw-cta-inner">
          <div class="kaw-badge" style="opacity:1;animation:none;">Distribuidores</div>
          <h2>¿Listo para unirte al<br>universo <em>Kawashima</em>?</h2>
          <p>Únete a nuestra red de más de 5,000 distribuidores en todo México. Precios preferenciales, soporte técnico y catálogo completo.</p>
          <div class="kaw-hero-cta" style="opacity:1;animation:none;">
            <button class="kaw-btn-primary" onclick="window.renderContacto(true)">Quiero ser distribuidor</button>
            <button class="kaw-btn-outline" onclick="window.renderHome()">Ver todas las marcas</button>
          </div>
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
    badge: '🌿 Paisajismo Profesional • México', title: 'PARAZZINI', slogan: 'Pasión por el Paisajismo',
    accentColor: '#1A7A4A',
    stats: [{ n:'20+', l:'Años de experiencia' }, { n:'3K+', l:'Profesionales equipados', mid:true }, { n:'100%', l:'Soporte técnico' }],
    marquee: ['Podadoras','Desbrozadoras','Cortacésped','Jardinería','Paisajismo','Herramientas Pro'],
    introCopy: 'Parazzini nació para darle a cada jardinero y paisajista profesional las herramientas que merecen. Equipos de precisión, rendimiento constante y un diseño pensado para quienes aman lo que hacen.',
    cats: [
      { img: bannerKawashima, name:'AGRÍCOLAS',     desc:'Todo lo que necesitas para armar sistemas de riego eficientes, duraderos y con calidad.',        subs:'MANGUERAS • TUBERIA PVC • MOTOBOMBAS' },
      { img: bannerGoldenTree,name:'CONSTRUCCIÓN',  desc:'Equipos robustos para trabajos pesados, pensados para durar en obra.',                           subs:'REVOLVEDORAS • MOTOBOMBAS • GENERADORES' },
      { img: bannerPowerHunt, name:'HOGAR',         desc:'Soluciones confiables para mantener tu hogar funcionando con eficiencia.',                       subs:'HIDROLAVADORAS • BOMBAS PRESURIZADORAS' },
    ],
    prods: [{ name:'Cortacésped PRZ-500',tag:'Jardín' },{ name:'Desbrozadora PRZ-26',tag:'Jardín' },{ name:'Soplador PRZ-3000',tag:'Jardín' },{ name:'Bordeadora PRZ-18',tag:'Jardín' }],
  },
  goldentree: {
    css: 'gt', bg: bgGoldenTreeFondo, banner: bannerGoldenTree,
    badge: '🌾 Nutrición Vegetal • México', title: 'GOLDEN TREE', slogan: 'Nutriendo tus Cosechas',
    accentColor: '#C89B2A',
    stats: [{ n:'15+', l:'Años en el mercado' }, { n:'50+', l:'Productos disponibles', mid:true }, { n:'100%', l:'Eficacia comprobada' }],
    marquee: ['Fertilizantes','Nutrición Foliar','Bioestimulantes','Sanidad Vegetal','Sustratos','Agricultura Premium'],
    introCopy: 'Golden Tree es la marca de fertilización y sanidad vegetal de alto rendimiento. Formulaciones desarrolladas para maximizar el potencial de cada cultivo, desde hortalizas hasta árboles frutales, con ingredientes de calidad premium al alcance del agricultor mexicano.',
    cats: [
      { img: bannerGoldenTree, name:'Fertilizantes',   desc:'Fórmulas balanceadas para una nutrición completa durante todo el ciclo del cultivo.', subs:'Granulados • Líquidos • Foliares' },
      { img: bannerKawashima,  name:'Bioestimulantes', desc:'Potencia la germinación, el enraizamiento y la resistencia ante el estrés ambiental.', subs:'Aminoácidos • Algas • Hormonas' },
      { img: bannerParazzini,  name:'Sanidad Vegetal', desc:'Protege tus cultivos de plagas y enfermedades con productos de alta efectividad.', subs:'Fungicidas • Insecticidas • Bactericidas' },
    ],
    prods: [{ name:'GT Foliar Pro',tag:'Nutrición' },{ name:'GT Raíz Max',tag:'Nutrición' },{ name:'GT Bioestim 500',tag:'Nutrición' },{ name:'GT Fungicida Plus',tag:'Nutrición' }],
  },
  powerhunt: {
    css: 'ph', bg: bgPowerHuntFondo, banner: bannerPowerHunt,
    badge: '⚡ Energía Industrial • México', title: 'POWER HUNT', slogan: 'Energía que Nunca se Detiene',
    accentColor: '#005BB5',
    stats: [{ n:'25+', l:'Años de potencia' }, { n:'4K+', l:'Equipos instalados', mid:true }, { n:'24/7', l:'Soporte técnico' }],
    marquee: ['Generadores','Plantas de Luz','Motobombas','Soldadoras','Compresores','Energía Confiable'],
    introCopy: 'PowerHunt es la marca de generadores eléctricos y soluciones de energía para la industria, el campo y la construcción. Máquinas robustas diseñadas para operar en las condiciones más exigentes, donde la energía nunca puede faltar.',
    cats: [
      { img: bannerPowerHunt, name:'Generadores', desc:'Plantas de luz portátiles e industriales para operaciones continuas de alto rendimiento.', subs:'1kW – 50kW • Gasolina • Diesel' },
      { img: bannerKawashima, name:'Motobombas', desc:'Soluciones de bombeo de agua para riego, trasvases y uso industrial.', subs:'Centrífugas • Sumergibles • Alta presión' },
      { img: bannerGoldenTree,name:'Industrial', desc:'Compresores, soldadoras y equipos de alto desempeño para la industria.', subs:'Compresores • Soldadoras • Equipos Pro' },
    ],
    prods: [{ name:'Generador PH-3500',tag:'Energía' },{ name:'Generador PH-7000D',tag:'Energía' },{ name:'Motobomba PH-200',tag:'Energía' },{ name:'Compresor PH-50L',tag:'Energía' }],
  },
  takashi: {
    css: 'tak', bg: bgTakashiFondo, banner: bannerTakashi,
    badge: '🔧 Precisión y Fuerza • México', title: 'TAKASHI', slogan: 'Precisión y Fuerza',
    accentColor: '#FF6600',
    stats: [{ n:'20+', l:'Años de tecnología' }, { n:'2K+', l:'Distribuidores activos', mid:true }, { n:'100%', l:'Refacciones garantizadas' }],
    marquee: ['Maquinaria Agrícola','Alta Tecnología','Precisión Japonesa','Rendimiento Profesional','Campo Mexicano','Refacciones Disponibles'],
    introCopy: 'Takashi combina la ingeniería de alta tecnología con el conocimiento del campo mexicano. Equipos robustos, precisos y accesibles diseñados para maximizar la productividad de cada agricultor y productor en México.',
    cats: [
      { img: bannerTakashi,   name:'Agrícola',     desc:'Equipos de alta tecnología para el manejo eficiente de cultivos a gran escala.',                                   subs:'Tractores • Implementos • Aspersión' },
      { img: bannerPowerHunt, name:'Construcción', desc:'Maquinaria robusta de alta precisión para proyectos de construcción e infraestructura.',                          subs:'Compactadores • Vibradores • Mezcladoras' },
      { img: bannerKawashima, name:'Industrial',   desc:'Soluciones industriales de precisión para operaciones de alto volumen y exigencia.',                              subs:'Bombas • Compresores • Equipos Especiales' },
    ],
    prods: [{ name:'Tractor TAK-25HP',tag:'Precisión' },{ name:'Compactador TAK-800',tag:'Precisión' },{ name:'Mezcladora TAK-3.5',tag:'Precisión' },{ name:'Bomba TAK-5000',tag:'Precisión' }],
  },
};

const renderGenericBrand = (brandId) => {
  const cfg = brandConfig[brandId];
  const p   = cfg.css;  // prefix: 'par', 'gt', 'ph', 'tak'

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
          ${Array(8).fill(cfg.marquee.map(t=>`<span class="${p}-marquee-item">${t}<span class="${p}-marquee-dot"></span></span>`).join('')).join('')}
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
            ${['Calidad', 'Diseño', 'Soporte'].map((f,i) => `
              <div class="${p}-feature-item" style="transition-delay:${i*0.15+0.1}s">
                <div class="${p}-feature-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div class="${p}-feature-text"><h4>${f} Comprobado</h4><p>Herramientas que garantizan resultados profesionales en cada jornada de trabajo.</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <hr class="${p}-sep">

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
      </section>

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
            <h2 class="${p}-section-title">¿Por qué elegirnos?</h2>
          </div>
          <div class="why-grid">
            ${['Calidad Premium','Diseño Ergonómico','Cobertura Nacional'].map(title => `
              <div class="${p}-prod-card" style="text-align:center;padding:50px 35px;">
                <div style="width:90px;height:90px;background:rgba(100,100,100,.1);border:1px solid rgba(100,100,100,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 30px;">
                  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="${cfg.accentColor}" stroke-width="2"><circle cx="32" cy="32" r="22"/><path d="M22 32 l8 8 14-16"/></svg>
                </div>
                <h3 style="font-size:1rem;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;">${title}</h3>
                <p style="font-size:0.95rem;line-height:1.8;margin:0;opacity:0.7;">Materiales de primera línea que garantizan durabilidad y rendimiento en cada jornada de trabajo.</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="split-banner" style="background:var(--${p}-black);">
        <div class="split-banner-text">
          <h2 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;margin-bottom:25px;text-transform:uppercase;">
            Únete a la red<br><span style="color:${cfg.accentColor};">${cfg.title}</span>
          </h2>
          <p style="font-size:1rem;line-height:1.8;margin-bottom:40px;opacity:0.7;">
            Distribuidores con acceso a catálogo completo, precios preferenciales y soporte técnico especializado.
          </p>
          <button class="${p}-btn-primary" onclick="window.renderContacto(true)" style="border-radius:100px;">
            CONVIÉRTETE EN DISTRIBUIDOR
          </button>
        </div>
        <div class="split-banner-img" style="--overlay-color:var(--${p}-black);background-image:url('${cfg.banner}');background-size:cover;background-position:center;filter:brightness(0.55) saturate(0.7);">
        </div>
      </section>

      <hr class="${p}-sep">
      <section class="${p}-cta-banner">
        <div class="${p}-cta-inner">
          <div class="${p}-badge" style="opacity:1;animation:none;">Distribuidores</div>
          <h2>¿Listo para crecer con<br><em>${cfg.title}</em>?</h2>
          <p>Herramientas profesionales con soporte técnico para quienes hacen del trabajo su pasión.</p>
          <div style="display:flex;gap:20px;justify-content:center;flex-wrap:wrap;">
            <button class="${p}-btn-primary" onclick="window.renderContacto(true)">Contactar a ${cfg.title}</button>
            <button class="${p}-btn-outline" onclick="window.renderHome()">Ver todas las marcas</button>
          </div>
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
  if (brandConfig[brandId])   return renderGenericBrand(brandId);

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
