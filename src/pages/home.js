// src/pages/home.js
import { renderNavbar } from '../components/Navbar.js';
import { renderHeroCarousel } from '../components/HeroCarousel.js';
import { getFooterHTML } from '../components/Footer.js';
import {
  mainStrategicImage,
  imgCobertura, imgExperiencia, imgServicio, imgMexico,
  bannerKawashima, bannerGoldenTree, bannerPowerHunt, bannerTakashi, bannerParazzini,
  imgBlog1, imgBlog2, imgBlog3,
} from '../assets/images.js';
import { activateRevealObserver } from '../core/reveal.js';

const marqueeItems = ['Maquinaria Agrícola', 'Refacciones Originales', 'Soporte Técnico', 'Campo y Bosque', 'Construcción', 'Jardinería'];
const marqueeHTML = Array(6).fill(marqueeItems.map(t => `<span class="mvh-mqitem-pill">${t}</span>`).join('')).join('');

const brandBanners = [
  { id: 'kawashima', img: bannerKawashima, title: 'KAWASHIMA', pills: ['Agrícola', 'Bosque', 'Poda y Jardín'], desc: 'Ingeniería de alto desempeño diseñada para las condiciones más exigentes del campo mexicano.' },
  { id: 'parazzini', img: bannerParazzini, title: 'PARAZZINI', pills: ['Jardinería', 'Paisajismo', 'Fumigación'], desc: 'Soluciones profesionales de fumigación y control de plagas con tecnología de punta.' },
  { id: 'takashi', img: bannerTakashi, title: 'TAKASHI', pills: ['Mantenimiento', 'Áreas Verdes'], desc: 'Potencia y precisión para el mantenimiento de áreas verdes.' },
  { id: 'goldentree', img: bannerGoldenTree, title: 'GOLDEN TREE', pills: ['Forestal', 'Trabajo Pesado'], desc: 'Equipos robustos para el trabajo pesado en el bosque.' },
  { id: 'powerhunt', img: bannerPowerHunt, title: 'POWER HUNT', pills: ['Industria', 'Generadores'], desc: 'Energía y fuerza para la construcción e industria.' },
];

export const renderHome = () => {
  document.body.className = '';
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main style="background:var(--bg-body);overflow-x:hidden;">

      <!-- HERO CAROUSEL -->
      <section style="padding-top:20px;">
        <div id="home-carousel-container"></div>
      </section>

      <!-- MARQUEE -->
      <div class="mvh-marquee" style="margin-top:-20px;position:relative;z-index:10;">
        <div class="mvh-marquee-track">${marqueeHTML}</div>
      </div>

      <!-- ABOUT -->
      <section class="mvh-intro reveal-up">
        <div class="mvh-intro-inner">
          <div style="flex:1;min-width:300px;">
            <span class="mvh-eyebrow">Nuestra Esencia</span>
            <h2 class="mvh-section-title">Impulsamos tu <em>Crecimiento</em></h2>
            <p style="font-size:1.15rem;color:rgba(0,0,0,0.7);line-height:1.8;margin-bottom:25px;">
              Somos el aliado estratégico de distribuidores y negocios en México. Llevamos hasta ti la más amplia oferta en maquinaria, refacciones y soluciones para el campo, la construcción y la industria. Con el respaldo técnico de nuestro equipo y disponibilidad de productos, hacemos más fácil tu día a día y el de tus clientes.
En Marvelsa creemos que la calidad profesional no debe ser un lujo: por eso acercamos productos de alto desempeño a precios justos, ofreciendo a nuestros distribuidores y sus clientes el valor real que se merecen

            </p>
            <div style="display:flex;gap:15px;flex-wrap:wrap;">
              <button class="mvh-btn-teal" onclick="window.location.hash='#/nosotros'">Nuestra Historia</button>
            </div>
          </div>
          <div style="flex:1;min-width:300px;">
            <div class="glass-panel-premium" style="padding:10px;border-radius:30px;">
              <img loading="lazy" src="${mainStrategicImage}" alt="Estratégico" style="width:100%;border-radius:20px;display:block;">
            </div>
          </div>
        </div>
      </section>

      <hr class="mvh-sep">

      <!-- BENEFITS -->
      <section class="mvh-features">
        <div class="mvh-section-head reveal-up">
          <span class="mvh-eyebrow">Beneficios</span>
          <h2 class="mvh-section-title">¿Por qué elegir <em>Marvelsa</em>?</h2>
          <p class="mvh-section-sub">Respaldo total y herramientas diseñadas para el éxito de tu negocio.</p>
        </div>
        <div class="features-grid">
          ${[
      { img: imgCobertura, title: 'Cobertura En Todo México', desc: 'Contamos con la infraestructura y logística para llevar nuestros productos a cualquier parte de la República, garantizando disponibilidad y cercanía con cada distribuidor..', delay: '.1s' },
      { img: imgExperiencia, title: 'Experiencia Del Cliente', desc: 'Somos pioneros en la industria con un portal exclusivo para distribuidores, diseñado para comprar en pocos clics, planear inventarios y tomar el control de su negocio.', delay: '.2s' },
      { img: imgServicio, title: 'Servicio Postventa Personalizado', desc: 'Respaldamos cada compra con un servicio postventa que atiende garantías, reclamos y solicitudes de refacciones de manera rápida y efectiva.', delay: '.3s' },
      { img: imgMexico, title: '+20,000 SKUs', desc: 'Más de 20,000 productos disponibles para mantener tu negocio actualizado, competitivo y listo para responder a las necesidades del mercado.', delay: '.4s' },
    ].map(f => `
            <div class="feature-card reveal-up" style="transition-delay:${f.delay}">
              <div class="feature-icon-wrapper"><img loading="lazy" src="${f.img}" alt="${f.title}"></div>
              <h3>${f.title}</h3>
              <p>${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- BRANDS -->
      <section class="mvh-brands" style="background:#f8fdfd;padding:120px 0;">
        <div class="mvh-section-head reveal-up">
          <span class="mvh-eyebrow">Alianzas Estratégicas</span>
          <h2 class="mvh-section-title">Nuestras <em>Marcas</em> Líderes</h2>
          <p class="mvh-section-sub">Soluciones especializadas para cada sector del campo y la industria.</p>
        </div>
        <div class="container mvh-brands-grid" style="padding:0 20px;">
          ${brandBanners.map(b => `
            <div class="brand-banner reveal-up" onclick="window.location.hash='#/${b.id}'">
              <div class="brand-banner-img-wrap">
                <img loading="lazy" src="${b.img}" alt="${b.title}">
              </div>
              <div class="brand-banner-overlay">
                <h3 class="brand-banner-title">${b.title}</h3>
                <div class="brand-categories">
                  ${b.pills.map(p => `<span class="brand-cat-pill">${p}</span>`).join('')}
                </div>
                <p class="brand-banner-desc">${b.desc}</p>
                <button class="brand-banner-btn">Explorar Línea</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- BLOG -->
      <section class="mvh-blog">
        <div class="mvh-section-head reveal-up">
          <span class="mvh-eyebrow">Actualidad</span>
          <h2 class="mvh-section-title">Últimos <em>Blogs</em></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px;">
          ${[
      { img: imgBlog2, title: 'Takashi: Potencia real', sub: 'Nuevas tecnologías para el campo mexicano...' },
      { img: imgBlog1, title: 'Guía de Motobombas', sub: 'Cómo elegir el equipo ideal para riego...' },
      { img: imgBlog3, title: 'Lanzamiento Power Hunt', sub: 'La nueva era de la energía industrial...' },
    ].map(b => `
            <div class="glass-panel-premium reveal-up" style="padding:0;cursor:pointer;">
              <img loading="lazy" src="${b.img}" alt="Blog" style="width:100%;height:200px;object-fit:cover;border-radius:30px 30px 0 0;">
              <div style="padding:30px;">
                <h3 style="font-weight:900;margin-bottom:15px;">${b.title}</h3>
                <p style="color:var(--text-muted);font-size:0.9rem;">${b.sub}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CTA -->
      <section class="mvh-cta reveal-up" style="padding:0;margin-bottom:100px;">
        <div class="glass-panel-premium" style="background:#003333;color:white;text-align:center;padding:100px 40px;border-radius:40px;margin:0 20px;">
          <span class="mvh-eyebrow" style="color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.3);">Distribución</span>
          <h2 class="mvh-section-title" style="color:white;margin-bottom:20px;">¿Listo para ser <em>distribuidor</em>?</h2>
          <p style="color:rgba(255,255,255,.8);max-width:600px;margin:0 auto 40px;font-size:1.1rem;">
            En Marvelsa siempre estamos en busca de nuevos aliados comerciales. Si deseas distribuir nuestras marcas y acceder a productos de calidad profesional con respaldo técnico, completa el formulario y comienza a formar parte de nuestra red de distribuidores
          </p>
          <button class="mvh-btn-teal" onclick="window.location.hash='#/contacto?scrollTo=form'" style="padding:20px 40px;font-size:1rem;">
            Contactar Ahora
          </button>
        </div>
      </section>

    </main>
    ${getFooterHTML()}
  `;

  renderNavbar('nav-container');
  renderHeroCarousel('home-carousel-container');
  activateRevealObserver();
};
