import { brands } from '../data/brands.js';
import { renderNavbar } from '../components/Navbar.js';
import { renderLeadForm } from '../components/LeadForm.js';
import { getFooterHTML } from '../components/Footer.js';
import { buildNewProductsHTML, brandNewProds } from '../helpers/newProducts.js';
import {
  bannerKawashima, bannerGoldenTree, bannerPowerHunt, bannerTakashi, bannerParazzini,
  bgKawashimaFondoNew, bgParazziniFondo, bgGoldenTreeFondo, bgPowerHuntFondo, bgTakashiFondo, bgFondoPowerHunt,
  imgHogarPowerHunt, imgAgricolaPowerHunt, imgJardinPowerHunt,
  imgKawAgricola, imgKawBosque, imgKawJardin,
  imgTakBosque, imgTakAgricola, imgTakJardin,
  imgAKH20L_A, imgAKH20L_B, imgAKH20L_C,
  imgAK26_1, imgAK26_2, imgAK26_3, imgAK20LE_1, imgAK20LE_2,
  imgMTK26_1, imgMTK26_2, imgMTK26_3, pdfMTK26, pdfAK20LE,
  imgDKM26KN_1, imgDKM26KN_2, imgDKM26KN_3,
  imgKPD52TOP_A, imgKPD52TOP_B, imgKPD52TOP_C,
  imgMAKO65_A,
  imgAK5L_A, imgAK5L_B,
  imgASK772TPRO_A, imgASK772TPRO_B, imgASK772TPRO_C,
  imgMKD5220_A, imgMKD5220_B, imgMKD5220_C,
  imgAK35GX_A, imgAK35GX_B, imgAK35GX_C,
  imgWIND43_A,
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
    const slides = carousel.querySelectorAll('.pc-slide');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (slides.length <= 1) return;

    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    let current = 0;
    let interval;

    const show = (next) => {
      const prev = current;
      slides[prev].classList.remove('active');
      slides[prev].classList.add('exit');
      dots[prev].classList.remove('active');
      current = next;
      slides[current].classList.remove('exit');
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      setTimeout(() => slides[prev].classList.remove('exit'), 600);
    };

    const startInterval = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (!document.contains(carousel)) { clearInterval(interval); return; }
        show((current + 1) % slides.length);
      }, 4000);
    };

    carousel.addEventListener('click', e => { e.stopPropagation(); show((current + 1) % slides.length); startInterval(); });
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
          <p class="kaw-hero-slogan">Profesional para el trabajo real.</p>
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
            <h2 class="kaw-intro-title">Diseñados para rendir<br>en todo <span style="color:var(--kaw-red);">trabajo</span></h2>
            <p class="kaw-intro-text">
              Fabricamos equipos potentes, resistentes y accesibles para el campo, la jardinería y el bosque.
              Creemos que la calidad no debe ser un lujo, por eso ofrecemos maquinaria de alto desempeño con precio justo,
              refacciones disponibles y servicio en todo México.<br><br>
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
      { img: imgKawAgricola, name: 'AGRÍCOLA', desc: 'Aspersores a motor, manuales y eléctricos que brindan potencia, autonomía y eficiencia para todo tipo de cultivos.', subs: 'Aspersión • Motor • Manual • Eléctrico' },
      { img: imgKawBosque, name: 'BOSQUE', desc: 'Motosierras profesionales, cadenas y refacciones diseñadas para fuerza constante, cortes limpios y larga durabilidad.', subs: 'Motosierras • Cadenas • Refacciones' },
      { img: imgKawJardin, name: 'JARDÍN', desc: 'Desde desbrozadoras hasta sierras telescópicas, nuestras herramientas ofrecen potencia controlada y comodidad en cada jornada.', subs: 'Desbrozadoras • Sierras • Podadoras' },
    ].map(cat => `
            <div class="kaw-cat-card">
              <div class="kaw-cat-img" style="background-image:url('${cat.img}');"></div>
              <div class="kaw-cat-overlay"></div>
              <div class="kaw-cat-content">
                <div class="kaw-cat-name">${cat.name}</div>
                <div class="kaw-cat-desc">${cat.desc}</div>
                <span class="kaw-cat-count">${cat.subs}</span>
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
          <p class="kaw-section-sub">Equipos más buscados por el mercado.</p>
        </div>
        <div class="kaw-prod-grid">
          ${[
            { sku: 'AKH20L',     name: 'Aspersor híbrido 20 lts',           tag: 'Aspersión', spec: 'Motor híbrido / 20 lts<br>Eficiencia y versatilidad en campo abierto', imgs: [imgAKH20L_A, imgAKH20L_B, imgAKH20L_C] },
            { sku: 'KPD52TOP',   name: 'Desbrozador PRO 52cc',              tag: 'Jardín',    spec: '52cc / 2 tiempos<br>Potencia profesional para terrenos difíciles',                                           imgs: [imgKPD52TOP_A, imgKPD52TOP_B, imgKPD52TOP_C] },
            { sku: 'MAKO65',     name: 'Motosierra Profesional 65cc',       tag: 'Forestal',  spec: '65cc / 2 barras y cadenas de 20 pulg.<br>Máxima potencia para trabajo forestal',                    imgs: [imgMAKO65_A] },
            { sku: 'AK5L',       name: 'Aspersor manual 5L',                tag: 'Aspersión', spec: 'Manual / 5 litros<br>Compacto y fácil de operar',                                                    imgs: [imgAK5L_A, imgAK5L_B] },
            { sku: 'ASK772TPRO', name: 'Pulverizador PRO 77cc 17 Lts',      tag: 'Agrícola',  spec: '77cc / 17 lts<br>Máxima capacidad para aplicación de líquidos',          imgs: [imgASK772TPRO_A, imgASK772TPRO_B, imgASK772TPRO_C] },
            { sku: 'MKD5220',    name: 'Motosierra Dakota 52cc',            tag: 'Forestal',  spec: '52cc / barra 20 pulg.<br>Kawashima Dakota para cortes profesionales',     imgs: [imgMKD5220_A, imgMKD5220_B, imgMKD5220_C] },
            { sku: 'AK-35GX',    name: 'Aspersor motorizado profesional',   tag: 'Aspersión', spec: 'Motor a gasolina / Alta potencia<br>Diseñado para grandes superficies agrícolas', imgs: [imgAK35GX_A, imgAK35GX_B, imgAK35GX_C] },
            { sku: 'WIND43',     name: 'Soplador de mochila 43cc',          tag: 'Jardín',    spec: '43cc / Mochila ergonómica<br>Potencia y comodidad para limpieza de terrenos',  imgs: [imgWIND43_A] },
          ].map(prod => `
            <div class="kaw-prod-card">
              <div class="kaw-prod-img-wrap" style="height:220px;margin-bottom:25px;border-radius:12px;overflow:hidden;${prod.imgs ? 'background:#1a1a1a;' : 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;'}">
                ${prod.imgs ? `
                <div class="product-carousel" style="width:100%;height:100%;position:relative;cursor:pointer;">
                  ${prod.imgs.map((src, i) => `<div class="pc-slide${i === 0 ? ' active' : ''}"><img src="${src}" alt="${prod.name}"></div>`).join('')}
                  <div class="carousel-dots"></div>
                </div>` : getProductIllustration('kaw', '#CC1111', prod.tag, prod.name)}
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:8px;">
                <span class="kaw-prod-tag" style="margin-bottom:0;">${prod.tag}</span>
                <span style="font-family:'SF Mono',SFMono-Regular,Consolas,monospace;font-size:0.62rem;font-weight:700;color:#CC1111;background:rgba(204,17,17,0.12);border:1px solid rgba(204,17,17,0.3);padding:2px 8px;border-radius:4px;letter-spacing:0.5px;">${prod.sku}</span>
              </div>
              <div class="kaw-prod-name">${prod.name}</div>
              <div class="kaw-prod-spec" style="min-height:2.8rem;">${prod.spec}</div>
              <a href="#" class="kaw-prod-cta" style="text-decoration:none;">
                Ver ficha técnica <svg class="kaw-prod-cta-arrow" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      ${buildNewProductsHTML('kaw', '#CC1111', 'KAWASHIMA', brandNewProds.kawashima, false, getProductIllustration)}

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
        title: 'Relación Calidad–Precio',
        text: 'En Kawashima creemos que la calidad profesional no tiene que costar de más. Ofrecemos maquinaria profesional a un precio justo, pensado para quienes trabajan todos los días.',
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
        title: 'Durabilidad en Productos',
        text: 'Fabricamos con materiales de alto rendimiento que aseguran potencia constante y larga vida útil, siempre que se realice el mantenimiento preventivo y uso adecuado.',
        icon: `
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      `
      },
      {
        title: 'Refacciones en todos los equipos',
        text: 'Todos nuestros equipos cuentan con refacciones disponibles en México y una red de servicio lista para mantener tus máquinas en marcha.',
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
    badge: '⚙️ Maquinaria Profesional • México', title: 'PARAZZINI', slogan: 'Calidad y potencia que trabajan contigo',
    accentColor: '#D4A800',
    stats: [{ n: '30+', l: 'Años de experiencia' }, { n: '500K+', l: 'Profesionales equipados', mid: true }, { n: '100%', l: 'Soporte técnico' }],
    marquee: ['Podadoras', 'Desbrozadoras', 'Cortacésped', 'Jardinería', 'Paisajismo', 'Herramientas Pro', 'Generadores', 'Hidrolavadoras', 'Motobombas', 'Bailarinas', 'Revolvedoras', 'Torres de luz', 'Maquinaria ligera', 'Motocultores'],
    introTitle: 'Potencia y calidad<br><em>para profesionales</em>',
    introCopy: 'Desarrollamos maquinaria que combina rendimiento profesional, fuerza comprobada y un valor accesible. La clave de esta fórmula: nuestros motores bajo calidad italiana, reconocida mundialmente por su resistencia, potencia y excelencia mecánica.',
    features: [
      { title: 'Potencia', label: 'Real', desc: 'Motores de alto rendimiento con tecnología italiana que entregan la fuerza necesaria para las jornadas más exigentes.', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
      { title: 'Calidad', label: 'Comprobada', desc: 'Estándares técnicos elevados en cada pieza y ensamble, garantizando durabilidad y precisión en cada uso.', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
      { title: 'Respaldo', label: 'Garantizado', desc: 'Red de servicio técnico y refacciones disponibles en México para mantener tus equipos siempre operativos.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    ],
    cats: [
      { img: bannerKawashima, name: 'AGRÍCOLAS', desc: 'Todo lo que necesitas para armar sistemas de riego eficientes, duraderos y con calidad técnica. Desde mangueras y tubería PVC hasta motobombas de alto rendimiento, ofrecemos soluciones completas para ingenieros de riego y profesionales del agro que buscan sistemas funcionales, resistentes y fáciles de instalar.', subs: 'MANGUERAS • TUBERIA PVC • MOTOBOMBAS' },
      { img: bannerGoldenTree, name: 'CONSTRUCCIÓN', desc: 'Equipos robustos para trabajos pesados, pensados para durar en obra. Revolvedoras, motobombas, generadores y más equipos que brindan potencia real en cada proyecto. Nuestra maquinaria está diseñada para soportar las condiciones exigentes del sitio de construcción, con el respaldo que todo profesional necesita.', subs: 'REVOLVEDORAS • MOTOBOMBAS • GENERADORES' },
      { img: bannerPowerHunt, name: 'HOGAR', desc: 'Soluciones confiables para mantener tu hogar funcionando con eficiencia. Desde bombas presurizadoras hasta potentes hidrolavadoras que combinan rendimiento, facilidad de uso y durabilidad. Perfectas para quienes buscan resultados profesionales también en casa.', subs: 'HIDROLAVADORAS • BOMBAS PRESURIZADORAS' },
    ],
    prods: [
      { name: 'REVOLVER1G', tag: 'Construcción', spec: 'Revolvedora a gasolina de 1/2 saco • Volumen de olla 140 litros • Motor 4 tiempos' },
      { name: 'GP10000GAS', tag: 'Energía',       spec: 'Generador estacionario a gas LP y GN • Potencia 10 kW • Monofásico' },
      { name: 'HP5.5N',     tag: 'Limpieza',      spec: 'Hidrolavadora a gasolina • Motor 5.5 HP • Alta presión para limpieza profesional' },
      { name: 'GP3000M',    tag: 'Energía',       spec: 'Generador portátil 3000W • Motor 6.5 HP 4 tiempos • Arranque manual' },
      { name: 'BP2.510',    tag: 'Bombeo',        spec: 'Motobomba autocebante 1 pulg • Motor 2.5 HP OHV 4 tiempos • Uso agrícola' },
      { name: 'BP720',      tag: 'Bombeo',        spec: 'Motobomba autocebante 2 pulg • Motor 7 HP 4 tiempos OHV • Alto caudal' },
    ],
    distributorLink: 'https://forms.gle/vXg39DUZdyiDzJH58',
    whyCards: [
      {
        title: 'Refacciones disponibles en todos los equipos',
        text: 'Nuestros productos están pensados para el largo plazo. Por eso, garantizamos disponibilidad de refacciones en todo el catálogo, asegurando mantenimiento continuo, ahorro a futuro y tranquilidad para el usuario profesional.',
        icon: `<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>`,
      },
      {
        title: 'Calidad técnica y potencia real',
        text: 'Cada máquina Parazzini combina <strong>potencia profesional</strong> con <strong>componentes de calidad</strong>, incluyendo motores de ingeniería italiana. Esto se traduce en equipos que rinden más, aguantan más y elevan el estándar del trabajo técnico.',
        icon: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
      },
      {
        title: 'Durabilidad y respaldo',
        text: 'Nuestros equipos están diseñados para soportar las condiciones reales del campo, la obra y el uso intensivo. Y no estás solo: <strong>nuestro compromiso de respaldo incluye servicio, asesoría y atención postventa</strong>, porque sabemos que en el trabajo serio, el soporte hace la diferencia.',
        icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
      },
    ],
  },
  goldentree: {
    css: 'gt', bg: bgGoldenTreeFondo, banner: bannerGoldenTree,
    badge: '🌿 Soluciones de riego', title: 'GOLDEN TREE', slogan: 'Nutriendo tus Cosechas',
    accentColor: '#C89B2A',
    stats: [{ n: '15+', l: 'Años en el mercado' }, { n: '40+', l: 'Presencia en países', mid: true }, { n: '100%', l: 'Eficacia comprobada' }],
    marquee: ['Gotero laberinto', 'Manguera de aspersión', 'Gotero pastilla', 'Cinta blanca'],
    introTitle: 'Tu tranquilidad en el campo<br><em>empieza con un buen riego.</em>',
    introCopy: 'Durante más de 30 años, Golden Tree ha cultivado algo más que sistemas de riego. Desde Corea del Sur, perfeccionamos la tecnología que asegura que cada gota llegue donde debe, con precisión, eficiencia y resistencia.<br><br>Hoy, al llegar a México y Latinoamérica, traemos esa misma calidad, pero con algo que nadie más ofrece: garantía, con un servicio humano y accesible que sí da la cara.',
    features: [
      { title: 'Eficiencia', label: 'Hídrica', desc: 'Sistemas de riego que reducen el consumo de agua y maximizan el rendimiento de cada metro de cultivo.', path: 'M12 2c0 0-7 8.25-7 12a7 7 0 0 0 14 0c0-3.75-7-12-7-12z' },
      { title: 'Mayor', label: 'Durabilidad', desc: 'Cintilla con más calibres y materiales de alta resistencia para que tu sistema dure más temporadas sin fallas.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      { title: 'Respaldo', label: 'Técnico', desc: 'Asesoría especializada para diseñar e instalar el sistema de riego ideal para tu tipo de cultivo y terreno.', path: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' },
    ],
    whyCards: [
      { title: 'Más de 30 años en el mercado mundial', text: 'Nuestra experiencia global nos respalda. Durante más de tres décadas, Golden Tree ha desarrollado soluciones de riego confiables que hoy impulsan la productividad de agricultores en distintos países del mundo.', icon: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>` },
      { title: 'Certificaciones mundiales', text: 'Para garantizar la satisfacción de nuestros clientes con la calidad del servicio y los productos que ofrecemos, contamos con la certificación ISO 9001 de aseguramiento de la calidad y un sistema de gestión cualificado. Por ello, nuestros productos se diseñan, desarrollan y fabrican de acuerdo con nuestras estrictas especificaciones. Confiamos plenamente en que nuestros sistemas de gestión y producción cualificados nos permiten ofrecer productos superiores y el mejor servicio a nuestros valiosos clientes.', icon: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>` },
      { title: 'Respaldo en todos los productos', text: 'No solo ofrecemos productos, ofrecemos confianza. Nuestro compromiso es acompañar al agricultor con asesoría, soporte y garantía real, porque sabemos que detrás de cada cultivo hay una inversión que merece protección.', icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` },
    ],
    distributorLink: 'https://forms.gle/cVH1y8d3zrDx7XJ47',
    distributorBody: 'Súmate a la marca que está transformando el sector con sistemas de riego innovadores, rentables y de alta durabilidad. Al convertirte en nuestro aliado, no solo vendes tecnología de punta, sino que aseguras y respaldas la inversión de tus clientes en el campo. ¿Listo para multiplicar tus ventas?',
    prodsTitle: 'Productos <em>destacados</em>',
    lightTheme: true,
    hideCats: true,
    cats: [],
    prods: [
      { name: 'BL015-100-10-3050', tag: 'Bluedrip', spec: 'Cinta Bluedrip 5/8" • Flujo medio 1 lph • Espaciado @10cm • Cal 6 mil • Rollo 3,050 m' },
      { name: 'BL125-80-20-3660', tag: 'Bluedrip', spec: 'Cinta Bluedrip 5/8" • Flujo bajo 0.8 lph • Espaciado @20cm • Cal 5 mil • Rollo 3,660 m' },
      { name: 'GSD3-030-080-100', tag: 'Aspersión', spec: 'Cinta GoldenSpray D-3 1.5" • 0.30 mm • 220 lpm • Rollo 100 m' },
      { name: 'WDE175-130-20-2600', tag: 'WhiteDrip', spec: 'Cinta WhiteDrip pastilla 5/8" • Flujo medio 1.3 lph • Espaciado @20cm • Cal 8 mil • Rollo 2,600 m' },
      { name: 'BL015-100-20-3050', tag: 'Bluedrip', spec: 'Cinta Bluedrip 5/8" • Flujo medio 1 lph • Espaciado @20cm • Cal 6 mil • Rollo 3,050 m' },
      { name: 'GR020-100-30-2300', tag: 'GreenDrip', spec: 'Cinta GreenDrip 5/8" • Flujo medio 1 lph • Espaciado @30cm • Cal 8 mil • Rollo 2,300 m' },
      { name: 'WDL175-100-10-2600', tag: 'WhiteDrip', spec: 'Cinta WhiteDrip laberinto 5/8" • Flujo medio 1 lph • Espaciado @10cm • Cal 8 mil • Rollo 2,600 m' },
      { name: 'GR015-100-20-280', tag: 'GreenDrip', spec: 'Cinta GreenDrip 5/8" • Flujo medio 1 lph • Espaciado @20cm • Cal 6 mil • Rollo 2,800 m' },
    ],
  },
  powerhunt: {
    css: 'ph', bg: bgFondoPowerHunt, banner: bannerPowerHunt,
    badge: '⚡ Maquinaria potente • México', title: 'POWER HUNT', slogan: 'Energía que Nunca se Detiene',
    accentColor: '#005BB5',
    distributorLink: 'https://forms.gle/14HdmMV9jE7ziRsU9',
    stats: [{ n: '80+', l: 'Productos' }, { n: '100%', l: 'Refacciones disponibles', mid: true }, { n: '24/7', l: 'Soporte técnico' }],
    marquee: ['Soldadoras', 'Compresores', 'Generadores', 'Motobombas', 'Aspersores'],
    introTitle: 'Poder real,<br><em>listo para entrar en acción</em>',
    introCopy: 'Diseñamos herramientas pensadas para quienes valoran lo práctico: equipos accesibles, confiables y listos para entrar en acción. Sea en casa, en el jardín o en el campo, Power Hunt te acompaña con soluciones que rinden en lo cotidiano.',
    features: [
      { title: 'Equipos', label: 'Accesibles', desc: 'Calidad de alto desempeño a un precio justo, para que cualquier persona tenga la herramienta correcta en el momento correcto.', path: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
      { title: 'Confiables', label: 'Siempre', desc: 'Herramientas robustas que funcionan cuando más las necesitas, sin importar las condiciones del terreno o del trabajo.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      { title: 'Soluciones', label: 'Cotidianas', desc: 'Para el hogar, el jardín y el campo. Fáciles de usar y listas para entrar en acción desde el primer día.', path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    ],
    whyCards: [
      { title: 'Refacciones en todos los equipos', text: 'Porque sabemos lo importante que es darles vida útil a tus herramientas. Todos nuestros productos cuentan con refacciones disponibles para que sigan funcionando cuando más los necesitas.', icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>` },
      { title: 'Practicidad accesible', text: 'Nuestros productos están pensados para tareas cotidianas y de baja exigencia, con el rendimiento justo para resolver con eficiencia y la calidad necesaria para hacerlo bien, siempre.', icon: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>` },
      { title: 'Herramientas fáciles de usar', text: 'No necesitas ser experto para usarlas. Nuestras herramientas son seguras y pensadas para que cualquiera pueda sacarles provecho desde el primer uso.', icon: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>` },
    ],
    cats: [
      { img: imgHogarPowerHunt, name: 'HOGAR', desc: 'Ya sea para limpiar a fondo o tener energía lista cuando se va la luz, nuestras soluciones están hechas para facilitar tu rutina.', subs: 'HIDROLAVADORAS • COMPRESORES • GENERADORES' },
      { img: imgAgricolaPowerHunt, name: 'AGRÍCOLA', desc: 'Llevamos potencia práctica al trabajo agrícola. Productos listos para acompañarte en cada jornada, desde el riego hasta el traslado de agua.', subs: 'BOMBAS • ASPERSORES • MANGUERA' },
      { img: imgJardinPowerHunt, name: 'JARDÍN', desc: 'Porque cuidar tu jardín también merece herramientas confiables. Equipos ligeros, funcionales y fáciles de usar.', subs: 'DESBROZADORAS • PODADORAS • MOTOSIERRAS' },
    ],
    prods: [
      { name: 'HUNT2',       tag: 'Motobomba', spec: 'Motobomba 7 hp 4 tiempos autocebante 2 pulg' },
      { name: 'COMPHKIT25L', tag: 'Compresor', spec: 'Kit compresor 25L doble conexión rápida • manguera 3mts y pistola de gravedad', pdf: 'https://drive.google.com/file/d/17WpnevdHCSFYwe5nG5gvYWsNXKLbBSWv/view' },
      { name: 'MONTANA20',   tag: 'Forestal',  spec: 'Motosierra 58 cc con 1 barra y 1 cadena de 20 pulg' },
      { name: 'GPH1000W',    tag: 'Generador', spec: 'Generador portátil de 64 cc monofásico 1000W 110V' },
      { name: 'COMPHKIT50L', tag: 'Compresor', spec: 'Compresor 2.5 hp 50 lts con doble conexión rápida • kit de manguera y pistola de gravedad' },
      { name: 'ELITE52',     tag: 'Jardín',    spec: 'Desbrozador recto de 52 cc con cuernos y eje partido' },
      { name: 'APH2L',       tag: 'Aspersión', spec: 'Aspersor Manual Power Hunt 2L' },
    ],
    newProds: [
      { name: 'REDWOOD',     tag: 'Nuevo' },
      { name: 'MPH-RT-4-050', tag: 'Riego' },
      { name: 'HPH1200E',    tag: 'Hogar' },
      { name: 'CP80SA',      tag: 'Compresor' },
    ],
  },
  takashi: {
    css: 'tak', bg: bgTakashiFondo, banner: bannerTakashi,
    badge: '🔧 Precisión y Fuerza • México', title: 'TAKASHI', slogan: 'Precisión y Fuerza',
    accentColor: '#FF6600',
    distributorLink: 'https://forms.gle/pUAjVxuKtu9rqK3GA',
    stats: [{ n: '50+', l: 'SKU disponibles' }, { n: '2K+', l: 'Distribuidores activos', mid: true }, { n: '100%', l: 'Refacciones garantizadas' }],
    marquee: ['Motobombas', 'Desbrozadoras', 'Refacciones', 'Accesorios', 'Campo'],
    introTitle: 'Calidad en todos<br><em>los equipos</em>',
    introCopy: 'Takashi es una marca de maquinaria ligera y accesible, diseñada para quienes hacen trabajos simples, pero exigen buenos resultados. Nuestras herramientas son prácticas, resistentes y listas para cuando más se necesitan.',
    features: [
      { title: 'Ligera', label: 'y Práctica', desc: 'Sin peso extra, sin complicaciones. Lista para cualquier tarea del día a día sin sacrificar rendimiento.', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
      { title: 'Resultados', label: 'Reales', desc: 'Para quienes exigen buenos resultados en trabajos simples. Calidad que se nota desde el primer uso.', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
      { title: 'Siempre', label: 'Lista', desc: 'Resistente y confiable cuando más la necesitas. Herramientas que no fallan cuando el trabajo no puede esperar.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    ],
    whyCards: [
      { title: 'Refacciones disponibles para todos nuestros equipos', text: 'Sabemos lo importante que es mantener tus herramientas funcionando. Por eso, cada producto Takashi cuenta con refacciones disponibles, para que siempre tengas una solución a la mano y sigas trabajando sin interrupciones.', icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>` },
      { title: 'Diseño ligero, materiales resistentes', text: 'Nuestras herramientas están hechas con materiales seleccionados que ofrecen durabilidad y confianza, pero sin sacrificar comodidad. Su diseño ligero permite un manejo fácil y seguro, ideal para tareas cotidianas o esporádicas.', icon: `<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>` },
      { title: 'Herramientas prácticas para trabajos reales', text: 'Takashi no es lujo innecesario, es funcionalidad pura. Diseñamos cada equipo pensando en quienes necesitan resolver tareas concretas con eficiencia, sin complicarse ni gastar de más.', icon: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>` },
    ],
    cats: [
      { img: imgTakBosque, name: 'BOSQUE', desc: 'Nuestras motosierras están diseñadas para tareas de baja a media exigencia, ideales para quienes necesitan una herramienta confiable, fácil de usar y siempre lista para responder.', subs: 'MOTOSIERRAS • CORTE • PODA' },
      { img: imgTakAgricola, name: 'AGRÍCOLA', desc: 'Takashi ofrece aspersores de mochila y motobombas pensadas para las necesidades del campo. Productos prácticos, duraderos y funcionales para tareas de riego ligero o traslado de agua.', subs: 'ASPERSORES • MOTOBOMBAS • RIEGO' },
      { img: imgTakJardin, name: 'JARDÍN', desc: 'Con nuestras desbrozadoras mantén tu jardín o terreno limpio y en orden. Ligeras, cómodas y fáciles de usar, son la opción ideal para trabajos de mantenimiento con buenos resultados.', subs: 'DESBROZADORAS • MANTENIMIENTO • JARDÍN' },
    ],
    prods: [
      { name: 'BT6.520', tag: 'Jardín', pdf: 'https://drive.google.com/file/d/1OkK0msXI9BLhczDtKVo5XM222Osq-w-F/view' },
      { name: 'MT|3', tag: 'Forestal', pdf: 'https://drive.google.com/file/d/15J2NeUrM84rhnuWirmkvn07pWlw6jres/view' },
      { name: 'WOOD58', tag: 'Forestal', pdf: 'https://drive.google.com/file/d/1mojUAbHEI7tc_SrjaHASBFN4d72wwXam/view' },
    ],
  },
  ducar: {
    css: 'duc', bg: bgPowerHuntFondo, banner: bannerPowerHunt,
    badge: '⚙️ Motores de Alto Desempeño • México', title: 'DUCAR', slogan: 'Motores que no paran',
    accentColor: '#D70E1B',
    distributorLink: 'https://forms.gle/cVH1y8d3zrDx7XJ47',
    stats: [{ n: '20+', l: 'Años en el mercado' }, { n: '10K+', l: 'Motores instalados', mid: true }, { n: '100%', l: 'Refacciones disponibles' }],
    marquee: ['Motores', 'Generadores', 'Motobombas', 'Motocultor', 'Compresores', 'Alta Potencia'],
    introCopy: 'DUCAR es una marca de motores y maquinaria de potencia diseñada para responder a las exigencias del campo, la industria y la construcción. Ofrecemos motores confiables, generadores robustos y motobombas de alto rendimiento, con refacciones disponibles en todo México.',
    features: [
      { title: 'Potencia', label: 'Comprobada', desc: 'Motores de alto desempeño diseñados para las jornadas más exigentes del campo y la industria, con rendimiento constante.', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
      { title: 'Durabilidad', label: 'Real', desc: 'Construidos con materiales de primera línea para soportar condiciones extremas y prolongar la vida útil del equipo.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      { title: 'Refacciones', label: 'Siempre', desc: 'Disponibilidad garantizada de refacciones originales en toda la República Mexicana para mantener tus equipos operativos.', path: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' },
    ],
    whyCards: [
      { title: 'Motores para cualquier aplicación', text: 'Desde pequeñas motobombas hasta generadores industriales, DUCAR ofrece motores para cada necesidad con el rendimiento y la confiabilidad que los profesionales exigen.', icon: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>` },
      { title: 'Red de refacciones en México', text: 'Contamos con una red de distribución de refacciones en todo el país, para que tus equipos nunca queden parados. Respaldo técnico real, sin excusas.', icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>` },
      { title: 'Equipos listos para trabajar', text: 'Fáciles de arrancar, sencillos de mantener. Nuestros equipos están diseñados para que cualquier operador los use desde el primer día con confianza y seguridad.', icon: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>` },
    ],
    cats: [
      { img: bannerParazzini, name: 'AGRÍCOLA', desc: 'Motobombas, motocultores y generadores diseñados para las necesidades del campo mexicano. Equipos confiables que acompañan al agricultor en cada jornada.', subs: 'MOTOBOMBAS • MOTOCULTORES • GENERADORES' },
      { img: bannerKawashima, name: 'CONSTRUCCIÓN', desc: 'Generadores y compresores de potencia real para sitios de obra. Equipos robustos que no fallan cuando el proyecto no puede detenerse.', subs: 'GENERADORES • COMPRESORES • OBRA' },
      { img: bannerTakashi, name: 'INDUSTRIAL', desc: 'Soluciones de potencia para aplicaciones industriales y comerciales que exigen desempeño continuo y alta confiabilidad en operación.', subs: 'MOTORES • PLANTAS DE LUZ • INDUSTRIAL' },
    ],
    prods: [
      { name: 'Motor DQ170F', tag: 'Motor', pdf: null },
      { name: 'Generador DG3500', tag: 'Generador', pdf: null },
      { name: 'Motobomba DWP30', tag: 'Agrícola', pdf: null },
      { name: 'Motocultor DT500', tag: 'Agrícola', pdf: null },
    ],
  },
  oregon: {
    css: 'ore', bg: bgKawashimaFondoNew, banner: bannerKawashima,
    badge: '🪚 Corte Profesional • México', title: 'OREGON', slogan: 'Corte profesional, siempre',
    accentColor: '#F06400',
    distributorLink: 'https://forms.gle/cVH1y8d3zrDx7XJ47',
    stats: [{ n: '60+', l: 'Años de innovación' }, { n: '100K+', l: 'Productos disponibles', mid: true }, { n: '100%', l: 'Compatibilidad garantizada' }],
    marquee: ['Cadenas', 'Barras Guía', 'Sprockets', 'Partes de Motosierra', 'Accesorios Forestales', 'Calidad Mundial'],
    introCopy: 'Oregon es la marca líder mundial en cadenas, barras guía y componentes para motosierra. Con más de 60 años de innovación, ofrecemos productos de precisión que maximizan el rendimiento y la vida útil de tus equipos, respaldados por disponibilidad inmediata en México.',
    features: [
      { title: 'Corte', label: 'Preciso', desc: 'Cadenas fabricadas con acero de alta aleación que garantizan cortes limpios, rápidos y seguros en cualquier tipo de madera.', path: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z M16 8 L2 22 M17.5 15 L9 15' },
      { title: 'Máxima', label: 'Durabilidad', desc: 'Componentes con tratamientos especiales que resisten el desgaste extremo y prolongan los intervalos de mantenimiento.', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
      { title: 'Compatibilidad', label: 'Universal', desc: 'Compatible con las principales marcas de motosierra del mercado. Un solo proveedor para todas tus necesidades de corte.', path: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' },
    ],
    whyCards: [
      { title: 'La marca #1 en cadenas para motosierra', text: 'Oregon es la referencia mundial en componentes de corte. Usada por profesionales forestales, agricultores y técnicos en más de 100 países, es la elección que nunca falla.', icon: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>` },
      { title: 'Compatibilidad con todas las marcas', text: 'Nuestro catálogo cubre los principales modelos de motosierra del mercado mexicano. Sea cual sea tu equipo, tenemos el componente correcto para mantenerlo en óptimas condiciones.', icon: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>` },
      { title: 'Disponibilidad inmediata en México', text: 'Gracias a nuestra red de distribución nacional, los componentes Oregon están disponibles cuando los necesitas, sin demoras ni contratiempos que paren tu trabajo.', icon: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>` },
    ],
    cats: [
      { img: bannerKawashima, name: 'FORESTAL', desc: 'Cadenas y barras guía de alta resistencia para trabajo forestal intensivo. Diseñadas para el corte profesional en condiciones extremas.', subs: 'CADENAS • BARRAS GUÍA • FORESTAL' },
      { img: bannerTakashi, name: 'AGRÍCOLA', desc: 'Componentes Oregon para equipos de poda y mantenimiento agrícola. Mantén tus motosierras y podadoras siempre en condiciones óptimas.', subs: 'PODA • MANTENIMIENTO • CAMPO' },
      { img: bannerParazzini, name: 'ACCESORIOS', desc: 'Sprockets, eslabones remache y aceites de cadena Oregon para el mantenimiento completo de tus equipos de corte.', subs: 'SPROCKETS • ESLABONES • ACEITES' },
    ],
    prods: [
      { name: 'Cadena Oregon 72V', tag: 'Forestal', pdf: null },
      { name: 'Barra Guía 20"', tag: 'Forestal', pdf: null },
      { name: 'Sprocket Rim', tag: 'Accesorio', pdf: null },
      { name: 'Aceite de Cadena', tag: 'Mantenimiento', pdf: null },
    ],
  },
};

const getProductIllustration = (p, accentColor, tag, name) => {
  const normTag = (tag || '').toLowerCase();
  const normName = (name || '').toLowerCase();
  let tagId = 'default';
  let path = '';
  
  if (normTag.includes('construc') || normName.includes('revolver') || normName.includes('mezcladora')) {
    tagId = 'construction';
    path = `
      <!-- Drum/Mixer body -->
      <path d="M35 32 L65 32 L75 52 L25 52 Z" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" stroke-linejoin="round" />
      <!-- Frame -->
      <path d="M25 52 L15 78 M75 52 L85 78 M15 78 L85 78 M50 52 L50 78" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" stroke-linecap="round" />
      <!-- Wheel -->
      <circle cx="80" cy="42" r="8" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <path d="M80 34 L80 50 M72 42 L88 42" stroke="url(#${p}-stroke-${tagId})" stroke-width="1" />
    `;
  } else if (normTag.includes('energ') || normTag.includes('generad') || normName.includes('generad') || normName.includes('gp') || normName.includes('dg') || normName.includes('planta')) {
    tagId = 'generator';
    path = `
      <!-- Cage Frame -->
      <rect x="25" y="25" width="50" height="50" rx="6" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <!-- Engine detailing (fins) -->
      <line x1="33" y1="40" x2="67" y2="40" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" stroke-dasharray="2 3" />
      <line x1="33" y1="48" x2="67" y2="48" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" stroke-dasharray="2 3" />
      <line x1="33" y1="56" x2="67" y2="56" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" stroke-dasharray="2 3" />
      <!-- Central Lightning Bolt -->
      <path d="M53 32 L40 50 L49 50 L45 68 L60 48 L50 48 Z" fill="${accentColor}" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round" />
    `;
  } else if (normTag.includes('limpie') || normName.includes('hp') || normName.includes('hidro') || normName.includes('limpieza')) {
    tagId = 'washer';
    path = `
      <!-- Gun body -->
      <path d="M25 65 L30 50 L65 50 M30 50 L33 45 L65 45 M35 50 L38 58" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Lance/Barrel -->
      <line x1="65" y1="47" x2="80" y2="47" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <rect x="80" y="44" width="5" height="6" rx="1" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <!-- Water spray cone -->
      <path d="M85 47 L95 35 M85 47 L95 59 M87 47 L95 41 M87 47 L95 53" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
      <!-- Background glow element -->
      <circle cx="45" cy="45" r="18" fill="url(#${p}-grad-${tagId})" />
    `;
  } else if (normTag.includes('bombeo') || normTag.includes('riego') || normTag.includes('agrícol') || normName.includes('bomba') || normName.includes('manguera') || normName.includes('dwp') || normName.includes('bp') || normName.includes('aspersor') || normName.includes('cintilla')) {
    tagId = 'pump';
    path = `
      <!-- Pump body circle -->
      <circle cx="45" cy="50" r="18" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <!-- Inlet pipe (bottom) -->
      <path d="M40 68 L40 82 M50 68 L50 82" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <!-- Outlet pipe (top-right) -->
      <path d="M58 40 L72 30 M63 46 L77 36" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" fill="none" />
      <!-- Impeller center and vanes -->
      <circle cx="45" cy="50" r="4" fill="${accentColor}" />
      <path d="M45 46 C48 42, 53 45, 53 50 M45 54 C42 58, 37 55, 37 50 M49 50 C53 53, 50 58, 45 58 M41 50 C37 47, 40 42, 45 42" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" stroke-linecap="round" fill="none" />
      <!-- Water wave lines outside -->
      <path d="M72 23 Q80 23, 85 28 T95 28" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
    `;
  } else if (normTag.includes('jard') || normTag.includes('forest') || normTag.includes('corte') || normName.includes('motosierra') || normName.includes('desbrozadora') || normName.includes('wood') || normName.includes('delta') || normName.includes('bt') || normName.includes('cadena') || normName.includes('barra') || normName.includes('aceite')) {
    tagId = 'garden';
    path = `
      <!-- Saw blade -->
      <circle cx="50" cy="50" r="18" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" stroke-dasharray="2 2" />
      <!-- Saw teeth -->
      <path d="M50 30 L53 32 L47 32 Z M64 36 L66 39 L61 41 Z M70 50 L68 53 L68 47 Z M64 64 L61 66 L66 69 Z M50 70 L47 68 L53 68 Z M36 64 L39 61 L34 59 Z M30 50 L32 47 L32 53 Z M36 36 L34 39 L39 41 Z" fill="url(#${p}-stroke-${tagId})" />
      <!-- Center arbor hole -->
      <circle cx="50" cy="50" r="3" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <!-- Leaf overlay -->
      <path d="M50 32 C62 32, 65 44, 50 62 C35 44, 38 32, 50 32 Z" fill="none" stroke="${accentColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M50 32 L50 62" stroke="${accentColor}" stroke-width="1" />
    `;
  } else if (normTag.includes('compres') || normName.includes('comp') || normName.includes('compressor')) {
    tagId = 'compressor';
    path = `
      <!-- Tank cylinder -->
      <rect x="25" y="42" width="50" height="25" rx="10" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <!-- Feet / Wheels -->
      <circle cx="35" cy="72" r="5" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <line x1="65" y1="67" x2="65" y2="74" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <!-- Gauge -->
      <circle cx="50" cy="30" r="8" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <path d="M50 30 L55 25" stroke="${accentColor}" stroke-width="1.5" stroke-linecap="round" />
      <path d="M47 30 A3 3 0 0 1 53 30" stroke="url(#${p}-stroke-${tagId})" stroke-width="1" />
      <line x1="50" y1="38" x2="50" y2="42" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
    `;
  } else if (normTag.includes('nutric') || normTag.includes('foliar') || normTag.includes('fertiliz')) {
    tagId = 'nutrition';
    path = `
      <path d="M50 80 L50 30 M50 50 Q65 40, 70 30 Q55 45, 50 50 M50 60 Q35 50, 30 40 Q45 55, 50 60" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" stroke-linecap="round" fill="none" />
      <circle cx="50" cy="25" r="3" fill="${accentColor}" />
      <circle cx="72" cy="27" r="2" fill="${accentColor}" />
      <circle cx="28" cy="37" r="2" fill="${accentColor}" />
      <circle cx="50" cy="55" r="22" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="1" stroke-dasharray="4 4" />
    `;
  } else if (normTag.includes('motor') || normName.includes('motor') || normName.includes('dq')) {
    tagId = 'motor';
    path = `
      <!-- Piston head -->
      <rect x="35" y="25" width="30" height="20" rx="2" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="2" />
      <!-- Ring lines -->
      <line x1="35" y1="31" x2="65" y2="31" stroke="url(#${p}-stroke-${tagId})" stroke-width="1" />
      <line x1="35" y1="36" x2="65" y2="36" stroke="url(#${p}-stroke-${tagId})" stroke-width="1" />
      <!-- Piston pin/rod -->
      <rect x="46" y="45" width="8" height="22" rx="1" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <circle cx="50" cy="45" r="4" fill="none" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" />
      <circle cx="50" cy="67" r="6" fill="url(#${p}-grad-${tagId})" stroke="${accentColor}" stroke-width="1.5" />
    `;
  } else {
    tagId = 'default';
    path = `
      <!-- Shield/Hexagon background -->
      <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="url(#${p}-grad-${tagId})" stroke="url(#${p}-stroke-${tagId})" stroke-width="1.5" stroke-linejoin="round" />
      <!-- Gear center -->
      <circle cx="50" cy="50" r="10" fill="none" stroke="${accentColor}" stroke-width="2" />
      <!-- Gear teeth -->
      <path d="M50 35 L50 40 M50 60 L50 65 M35 50 L40 50 M60 50 L65 50 M39 39 L43 43 M57 57 L61 61 M61 39 L57 43 M43 57 L39 61" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round" />
    `;
  }

  return `
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
      <defs>
        <linearGradient id="${p}-grad-${tagId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.05" />
          <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.2" />
        </linearGradient>
        <linearGradient id="${p}-stroke-${tagId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
          <stop offset="50%" stop-color="${accentColor}" stop-opacity="1" />
          <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      ${path}
    </svg>
  `;
};

const renderGenericBrand = (brandId) => {
  const cfg = brandConfig[brandId];
  const p = cfg.css;  // prefix: 'par', 'gt', 'ph', 'tak'

  const buildProdCard = (prod, isNew = false) => {
    const hasModel = /^[A-Z0-9.\-|]+$/.test(prod.name);
    let displayTitle = prod.name;
    let displayModel = '';
    if (hasModel) {
      displayModel = prod.name;
      if (prod.spec) {
        const parts = prod.spec.split(/•|—/);
        displayTitle = parts[0].trim();
        displayTitle = displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1);
      } else {
        if (prod.tag === 'Jardín') displayTitle = 'Equipo de Jardinería';
        else if (prod.tag === 'Forestal') displayTitle = 'Equipo Forestal';
        else displayTitle = prod.tag || 'Equipo Especializado';
      }
    }
    const specBullet = (text) => `<li style="font-size:0.82rem;color:var(--${p}-muted);display:flex;align-items:flex-start;gap:8px;line-height:1.5;text-align:left;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="${cfg.accentColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-top:3px;flex-shrink:0;"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${text}</span></li>`;
    let specsItems = [];
    if (prod.spec) {
      const allParts = prod.spec.split(/•|—/).map(s => s.trim()).filter(Boolean);
      specsItems = hasModel && allParts.length > 1 ? allParts.slice(1) : allParts;
    }
    if (specsItems.length === 0) specsItems = ['Alta eficiencia y potencia', 'Diseño ergonómico y duradero', 'Refacciones originales en México'];
    const specsHTML = `<ul style="list-style:none;padding:0;margin:12px 0 0 0;display:flex;flex-direction:column;gap:6px;flex:1;">${specsItems.map(specBullet).join('')}</ul>`;
    return `
      <div class="${p}-prod-card" style="position:relative;">
        ${isNew ? `<div style="position:absolute;top:12px;right:12px;z-index:2;background:${cfg.accentColor};color:white;font-size:0.6rem;font-weight:900;letter-spacing:1.5px;padding:3px 10px;border-radius:4px;text-transform:uppercase;">NUEVO</div>` : ''}
        <div class="prod-illustration-wrap" style="height:180px;background:rgba(0,0,0,0.25);border:1px solid ${cfg.accentColor}20;border-radius:14px;margin-bottom:18px;display:flex;align-items:center;justify-content:center;padding:20px;position:relative;overflow:hidden;transition:all 0.4s ease;">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at center, ${cfg.accentColor}0A 0%, transparent 70%);"></div>
          ${getProductIllustration(p, cfg.accentColor, prod.tag, prod.name)}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:8px;">
          <span class="${p}-prod-tag" style="margin-bottom:0;">${prod.tag}</span>
          ${displayModel ? `<span style="font-family:'SF Mono',SFMono-Regular,Consolas,monospace;font-size:0.65rem;font-weight:700;color:${cfg.accentColor};background:${cfg.accentColor}12;border:1px solid ${cfg.accentColor}30;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;">${displayModel}</span>` : ''}
        </div>
        <div class="${p}-prod-name" style="font-size:1.1rem;font-weight:800;line-height:1.3;min-height:3rem;display:flex;align-items:flex-start;text-align:left;">${displayTitle}</div>
        ${specsHTML}
        <a href="${prod.pdf || '#'}" ${prod.pdf ? 'target="_blank" rel="noopener"' : ''} class="${p}-prod-cta" style="text-decoration:none;margin-top:auto;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);">
          Ver ficha técnica <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </a>
      </div>`;
  };

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
            <h2 class="${p}-intro-title">${cfg.introTitle || 'Diseñados<br><em>para ti</em>'}</h2>
            <p class="${p}-intro-text">${cfg.introCopy}</p>
          </div>
          <div class="${p}-features">
            ${(cfg.features || [
      { title: 'Calidad', label: 'Comprobada', desc: 'Herramientas que garantizan resultados profesionales en cada jornada de trabajo.', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
      { title: 'Diseño', label: 'Comprobado', desc: 'Herramientas que garantizan resultados profesionales en cada jornada de trabajo.', path: 'M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z' },
      { title: 'Soporte', label: 'Comprobado', desc: 'Herramientas que garantizan resultados profesionales en cada jornada de trabajo.', path: 'M21 10c0-4.97-4.03-9-9-9s-9 4.03-9 9M7 15h10m2 0a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2M5 15a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2' },
    ]).map((f, i) => `
              <div class="${p}-feature-item" style="transition-delay:${i * 0.15 + 0.1}s">
                <div class="${p}-feature-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="${f.path}"/></svg>
                </div>
                <div class="${p}-feature-text"><h4>${f.title} ${f.label}</h4><p>${f.desc}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${!cfg.hideCats ? `<hr class="${p}-sep">` : ''}

      ${!cfg.hideCats ? `<section class="${p}-categories" id="${p}-cats">
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
          <h2 class="${p}-section-title">${cfg.prodsTitle || 'Equipos destacados'}</h2>
          <p class="${p}-section-sub">La herramienta correcta hace la diferencia.</p>
        </div>
        <div class="${p}-prod-grid">
          ${cfg.prods.map(prod => buildProdCard(prod)).join('')}
        </div>
      </section>

      ${buildNewProductsHTML(p, cfg.accentColor, cfg.title, brandNewProds[brandId], cfg.lightTheme, getProductIllustration)}

      <section style="background:var(--${p}-dark);padding:120px 0;">
        <div style="max-width:1200px;margin:0 auto;padding:0 40px;">
          <div style="text-align:center;margin-bottom:80px;">
            <span class="${p}-section-eyebrow">Nuestra diferencia</span>
            <h2 class="${p}-section-title">¿Por qué elegirnos?</h2>
          </div>
          <div class="why-grid">
            ${(cfg.whyCards || [
      { title: 'Calidad Premium', text: 'Materiales de primera línea que garantizan durabilidad y rendimiento en cada jornada de trabajo.', icon: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>` },
      { title: 'Diseño Ergonómico', text: 'Materiales de primera línea que garantizan durabilidad y rendimiento en cada jornada de trabajo.', icon: `<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>` },
      { title: 'Cobertura Nacional', text: 'Materiales de primera línea que garantizan durabilidad y rendimiento en cada jornada de trabajo.', icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` },
    ]).map(card => `
              <div class="brand-why-card" style="background:${cfg.lightTheme ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.03)'};text-align:center;padding:60px 35px 50px;border-radius:32px;position:relative;overflow:visible;border:1px solid ${cfg.lightTheme ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'};box-shadow:0 20px 40px rgba(0,0,0,0.1);">
                <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${cfg.accentColor};border-radius:32px 32px 0 0;opacity:0.8;"></div>
                <div class="why-icon-wrap" style="width:90px;height:90px;background:white;border-radius:24px;display:flex;align-items:center;justify-content:center;margin:-105px auto 30px;box-shadow:0 20px 40px rgba(0,0,0,0.18);position:relative;z-index:2;transform:rotate(-5deg);">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="${cfg.accentColor}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    ${card.icon}
                  </svg>
                </div>
                <h3 style="font-size:1.15rem;font-weight:900;color:${cfg.lightTheme ? 'var(--' + p + '-text)' : 'white'};text-transform:uppercase;letter-spacing:1px;margin-bottom:20px;">${card.title}</h3>
                <p style="color:${cfg.lightTheme ? 'var(--' + p + '-muted)' : 'rgba(255,255,255,0.6)'};font-size:0.95rem;line-height:1.8;margin:0;">${card.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="split-banner" style="background:var(--${p}-black);">
        <div class="split-banner-text">
          <h2 style="font-size:clamp(2.5rem,5vw,4.2rem);font-weight:900;color:${cfg.lightTheme ? 'var(--' + p + '-text)' : 'white'};line-height:1.1;margin-bottom:25px;text-transform:uppercase;">
            Súmate a la <span style="color:${cfg.accentColor};">red de distribución</span> ${cfg.title}
          </h2>
          <p style="font-size:1.1rem;line-height:1.8;margin-bottom:40px;opacity:0.7;color:${cfg.lightTheme ? 'var(--' + p + '-text)' : 'white'};">
            ${cfg.distributorBody || 'Forma parte de una marca que está transformando el acceso a herramientas profesionales en México. Maquinaria de alta demanda, soporte constante y respaldo comercial para que tu negocio crezca con nosotros.'}
          </p>
          ${cfg.distributorLink
      ? `<a href="${cfg.distributorLink}" target="_blank" rel="noopener" class="${p}-btn-primary" style="text-decoration:none;border-radius:100px;padding:20px 40px;font-size:1rem;display:inline-block;">Conviértete en distribuidor ${cfg.title}</a>`
      : `<button class="${p}-btn-primary" onclick="window.renderContacto(true)" style="border-radius:100px;padding:20px 40px;font-size:1rem;">Conviértete en distribuidor ${cfg.title}</button>`
    }
        </div>
        <div class="split-banner-img" style="--overlay-color:var(--${p}-black);background-image:url('${cfg.banner}');background-size:contain;background-repeat:no-repeat;background-position:center;background-color:var(--${p}-black);">
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
