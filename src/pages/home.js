import { renderNavbar } from '../components/Navbar.js';
import { renderHeroCarousel } from '../components/HeroCarousel.js';
import { getFooterHTML } from '../components/Footer.js';
import {
  mainStrategicImage,
  bannerKawashima, bannerGoldenTree, bannerPowerHunt, bannerTakashi, bannerParazzini,
  imgBlog1, imgBlog2, imgBlog3,
} from '../assets/images.js';
import { activateRevealObserver } from '../core/reveal.js';

const marqueeItems = ['Maquinaria Agrícola', 'Refacciones Originales', 'Soporte Técnico', 'Campo', 'Forestal', 'Construcción', 'Jardinería'];
const marqueeHTML = Array(6).fill(marqueeItems.map(t => `<span class="mvh-mqitem-pill">${t}</span>`).join('')).join('');

const brandBanners = [
  { id: 'kawashima', img: bannerKawashima, title: 'KAWASHIMA', pills: ['Agrícola', 'Forestal', 'Poda y Jardín'], desc: 'Herramientas que combinan potencia, ligereza y durabilidad, pensadas para acompañar a quienes enfrentan los retos del trabajo diario, con la mejor relación calidad-precio.' },
  { id: 'parazzini', img: bannerParazzini, title: 'PARAZZINI', pills: ['Construcción', 'Agrícola', 'Energía', 'Bombeo'], desc: 'Maquinaria con motores de calidad italiana que combinan fuerza, eficiencia y durabilidad para los profesionales.' },
  { id: 'takashi', img: bannerTakashi, title: 'TAKASHI', pills: ['Forestal', 'Agrícola'], desc: 'Para los trabajos simples, maquinaria que cumple.' },
  { id: 'goldentree', img: bannerGoldenTree, title: 'GOLDEN TREE', pills: ['Sistemas de riego', 'Agrícola'], desc: '30 años cuidando tu inversión en el campo con riego eficiente.' },
  { id: 'ducar', img: bannerPowerHunt, title: 'DUCAR', pills: ['Motores', 'Generadores', 'Agrícola'], desc: 'Motores y generadores de alto desempeño con refacciones disponibles en todo México.' },
  { id: 'powerhunt', img: bannerPowerHunt, title: 'POWER HUNT', pills: ['Taller', 'Agrícola', 'Hogar', 'Jardín'], desc: 'Creamos maquinaria potente, fácil de armar y lista para entrar en acción.' },
  { id: 'oregon', img: bannerKawashima, title: 'OREGON', pills: ['Forestal', 'Agrícola', 'Accesorios'], desc: 'La marca #1 mundial en cadenas y componentes para motosierra. Corte profesional siempre.' },
];

const featCards = [
  {
    title: 'Cobertura En Todo México',
    desc: 'Contamos con la infraestructura y logística para llevar nuestros productos a cualquier parte de la República, garantizando disponibilidad y cercanía con cada distribuidor..',
    icon: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
  },
  {
    title: 'Experiencia Del Cliente',
    desc: 'Somos pioneros en la industria con un portal exclusivo para distribuidores, diseñado para comprar en pocos clics, planear inventarios y tomar el control de su negocio.',
    icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  },
  {
    title: 'Servicio Postventa Personalizado',
    desc: 'Respaldamos cada compra con un servicio postventa que atiende garantías, reclamos y solicitudes de refacciones de manera rápida y efectiva.',
    icon: `<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>`,
  },
  {
    title: '+20,000 SKUs',
    desc: 'Más de 20,000 productos disponibles para mantener tu negocio actualizado, competitivo y listo para responder a las necesidades del mercado.',
    icon: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
  },
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

      <!-- IMPACT STRIP -->
      <div class="mvh-impact-strip">
        <div class="mvh-impact-inner">
          <div class="mvh-istat">
            <span class="mvh-istat-n">30+</span>
            <span class="mvh-istat-l">Años de experiencia</span>
          </div>
          <div class="mvh-istat-div"></div>
          <div class="mvh-istat">
            <span class="mvh-istat-n">7</span>
            <span class="mvh-istat-l">Marcas líderes</span>
          </div>
          <div class="mvh-istat-div"></div>
          <div class="mvh-istat">
            <span class="mvh-istat-n">20K+</span>
            <span class="mvh-istat-l">SKUs disponibles</span>
          </div>
          <div class="mvh-istat-div"></div>
          <div class="mvh-istat">
            <span class="mvh-istat-n">100%</span>
            <span class="mvh-istat-l">Cobertura nacional</span>
          </div>
        </div>
      </div>

      <!-- MARQUEE -->
      <div class="mvh-marquee" style="position:relative;z-index:10;">
        <div class="mvh-marquee-track">${marqueeHTML}</div>
      </div>

      <!-- ABOUT -->
      <section class="mvh-intro reveal-up">
        <div class="mvh-intro-inner">
          <div class="mvh-intro-left">
            <span class="mvh-eyebrow">¿Quiénes somos?</span>
            <h2 class="mvh-section-title">Más de 30 años <em>impulsando</em> a quienes mueven a México</h2>
            <p class="mvh-intro-text">
              Somos el aliado estratégico de distribuidores y negocios en México. Llevamos hasta ti la más amplia oferta en maquinaria, refacciones y soluciones para el campo, la construcción y la industria. Con el respaldo técnico de nuestro equipo y disponibilidad de productos, hacemos más fácil tu día a día y el de tus clientes.
              <br><br>
              En Marvelsa creemos que la calidad profesional no debe ser un lujo: por eso acercamos productos de alto desempeño a precios justos, ofreciendo a nuestros distribuidores y sus clientes el valor real que se merecen.
            </p>
            <div style="margin-top:35px;">
              <button class="mvh-btn-teal" onclick="navigate('/nosotros')">Nuestra Historia</button>
            </div>
          </div>
          <div class="mvh-intro-img-wrap">
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
        <div class="mvh-feat-grid">
          ${featCards.map((f, i) => `
            <div class="mvh-feat-card reveal-up" style="transition-delay:${i * 0.1}s">
              <div class="mvh-feat-top">
                <span class="mvh-feat-num">0${i + 1}</span>
                <div class="mvh-feat-icon-wrap">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${f.icon}</svg>
                </div>
              </div>
              <h3>${f.title}</h3>
              <p>${f.desc}</p>
              <div class="mvh-feat-line"></div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- BRANDS — dark universe -->
      <section class="mvh-brands-universe">
        <div class="mvh-brands-bg-grid"></div>
        <div class="mvh-brands-bg-glow"></div>
        <div class="mvh-brands-content">
          <div class="mvh-section-head reveal-up" style="margin-bottom:60px;">
            <span class="mvh-eyebrow mvh-eyebrow-light">Alianzas Estratégicas</span>
            <h2 class="mvh-section-title" style="color:white;">Nuestras <em>Marcas</em> Líderes</h2>
            <p class="mvh-section-sub" style="color:rgba(255,255,255,0.55);">Soluciones especializadas para cada sector del campo y la industria.</p>
          </div>
          <div class="mvh-brands-grid">
            ${brandBanners.map(b => `
              <div class="brand-banner reveal-up" onclick="navigate('/${b.id}')">
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
        </div>
      </section>

      <!-- BLOG -->
      <section class="mvh-blog">
        <div class="mvh-section-head reveal-up">
          <span class="mvh-eyebrow">Actualidad</span>
          <h2 class="mvh-section-title">Últimos <em>Blogs</em></h2>
        </div>
        <div class="mvh-blog-grid">
          ${[
      { img: imgBlog2, title: 'Takashi: Potencia real', sub: 'Nuevas tecnologías para el campo mexicano...' },
      { img: imgBlog1, title: 'Guía de Motobombas', sub: 'Cómo elegir el equipo ideal para riego...' },
      { img: imgBlog3, title: 'Lanzamiento Power Hunt', sub: 'La nueva era de la energía industrial...' },
    ].map(b => `
            <div class="mvh-blog-card reveal-up" style="cursor:pointer;">
              <div class="mvh-blog-img" style="background-image:url('${b.img}');"></div>
              <div class="mvh-blog-body">
                <h3>${b.title}</h3>
                <p>${b.sub}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CTA -->
      <section class="mvh-cta reveal-up" style="padding:0;margin-bottom:100px;">
        <div class="mvh-cta-card">
          <div class="mvh-cta-bg-grid"></div>
          <div class="mvh-cta-glow"></div>
          <div style="position:relative;z-index:2;text-align:center;">
            <span class="mvh-eyebrow" style="color:rgba(0,200,200,0.8);">Distribución</span>
            <h2 class="mvh-section-title" style="color:white;margin-bottom:20px;">¿Listo para ser <em>distribuidor</em>?</h2>
            <p style="color:rgba(255,255,255,.75);max-width:600px;margin:0 auto 40px;font-size:1.1rem;line-height:1.8;">
              En Marvelsa siempre estamos en busca de nuevos aliados comerciales. Si deseas distribuir nuestras marcas y acceder a productos de calidad profesional con respaldo técnico, completa el formulario y comienza a formar parte de nuestra red de distribuidores
            </p>
            <button class="mvh-btn-primary" onclick="navigate('/contacto?scrollTo=form')">
              Contactar Ahora
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>

    </main>
    ${getFooterHTML()}
  `;

  renderNavbar('nav-container');
  renderHeroCarousel('home-carousel-container');
  activateRevealObserver();
};
