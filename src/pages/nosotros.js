// src/pages/nosotros.js
import { renderNavbar } from '../components/Navbar.js';
import { renderHeroCarousel } from '../components/HeroCarousel.js';
import { getFooterHTML } from '../components/Footer.js';
import { img30Anos, imgNosotrosFull } from '../assets/images.js';
import { activateRevealObserver } from '../core/reveal.js';

const marqueeItems = ['Distribuidores Autorizados', 'Cobertura Nacional', 'Atención B2B', 'Soporte Técnico'];
const marqueeHTML  = Array(8).fill(marqueeItems.map(t => `<span class="mvh-mqitem-pill">${t}</span>`).join('')).join('');

const stats = [
  { value: '+30', label: 'Años de historia', delay: '' },
  { value: '20K+', label: 'SKUs disponibles', delay: '0.1s' },
  { value: '5', label: 'Marcas exclusivas', delay: '0.2s' },
  { value: '100%', label: 'Soporte Nacional', delay: '0.3s' },
];

const timelineItems = [
  { year: '1985', title: 'Fundación', desc: 'Nace con el enfoque de revolucionar el sector forestal en México.', inverted: false },
  { year: '1995', title: 'Expansión Agrícola', desc: 'Ampliamos nuestro horizonte para servir a toda la industria agrícola nacional.', inverted: true },
  { year: '2008', title: 'Nueva Infraestructura', desc: 'Inauguramos nuestro centro logístico de clase mundial en Jalisco.', inverted: false },
  { year: '2011', title: 'Lanzamiento Kawashima', desc: 'Consolidamos nuestras marcas propias para democratizar la calidad profesional.', inverted: true },
  { year: '2024', title: 'Liderazgo B2B', desc: 'Hoy somos la plataforma líder de soluciones integrales para distribuidores en México.', inverted: false },
];

export const renderNosotros = () => {
  document.body.className = '';
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main style="background:var(--bg-body);min-height:100vh;overflow-x:hidden;">

      <!-- HERO CAROUSEL -->
      <section style="padding-top:20px;">
        <div id="nosotros-carousel-container"></div>
      </section>

      <!-- MARQUEE -->
      <div class="mvh-marquee" style="margin-top:-20px;position:relative;z-index:10;">
        <div class="mvh-marquee-track">${marqueeHTML}</div>
      </div>


      <!-- STATS -->
      <section class="nos-stats">
        <div class="nos-stats-grid">
          ${stats.map(s => `
            <div class="nos-stat-card reveal-up" ${s.delay ? `style="transition-delay:${s.delay}"` : ''}>
              <span class="nos-stat-number">${s.value}</span>
              <span class="nos-stat-label">${s.label}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <hr class="mvh-sep">

      <!-- TRAYECTORIA -->
      <section style="padding:clamp(50px,8vw,100px) 0;">
        <div class="container nosotros-split-grid">
          <div class="reveal-left" style="display:flex;">
            <div class="glass-panel-premium" style="padding:clamp(30px,5vw,60px);border-radius:30px;width:100%;display:flex;flex-direction:column;justify-content:center;background:#fff;box-shadow:0 25px 50px -12px rgba(0,0,0,.08);border:none;">
              <span class="mvh-eyebrow" style="margin-bottom:15px;">Trayectoria</span>
              <h2 class="mvh-section-title" style="margin-bottom:30px;">30 Años <em>Impulsando</em> al Distribuidor</h2>
              <p style="font-size:1.15rem;line-height:1.8;color:rgba(0,0,0,.7);margin-bottom:30px;">
                En Comercializadora Marvelsa conectamos a los distribuidores con las mejores marcas del mundo en
                maquinaria, refacciones y soluciones para los sectores agrícola, ferretero, construcción, forestal y jardín.
                Nuestra misión: que cada negocio crezca con productos confiables, precios justos y el respaldo técnico que
                hace la diferencia.
              </p>
            </div>
          </div>
          <div class="reveal-right" style="display:flex;justify-content:center;">
            <div class="glass-panel-premium" style="padding:10px;border-radius:30px;max-width:450px;">
              <img loading="lazy" src="${img30Anos}" alt="30 años" style="width:100%;border-radius:20px;">
            </div>
          </div>
        </div>
      </section>

      <!-- NUESTRA HISTORIA -->
      <section style="padding:0 0 clamp(50px,8vw,100px) 0;">
        <div class="container nosotros-split-grid">
          <div class="reveal-left" style="display:flex;">
            <div class="glass-panel-premium" style="padding:10px;border-radius:30px;width:100%;display:flex;">
              <img loading="lazy" src="${imgNosotrosFull}" alt="Nuestra Historia" style="width:100%;border-radius:20px;object-fit:cover;">
            </div>
          </div>
          <div class="reveal-right" style="display:flex;">
            <div class="glass-panel-premium" style="padding:clamp(30px,5vw,60px);border-radius:30px;width:100%;display:flex;flex-direction:column;justify-content:center;background:#fff;box-shadow:0 25px 50px -12px rgba(0,0,0,.08);border:none;">
              <h2 class="mvh-section-title" style="margin-bottom:30px;text-align:center;">Nuestra <em>Historia</em></h2>
              <p style="font-size:1.1rem;line-height:1.8;color:rgba(0,0,0,.7);margin-bottom:20px;">Nacimos con una idea sencilla: acercar productos de calidad profesional al alcance de todos los distribuidores del país. <br> 
              Con el tiempo, esa idea se convirtió en una red sólida de aliados comerciales que confían en nuestro compromiso, rapidez y respaldo. <br> 
              Hoy, Comercializadora Marvelsa es referente nacional por su capacidad de distribución, su servicio posventa y su portafolio de marcas líderes que marcan la diferencia en cada proyecto.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- TIMELINE -->
      <section style="background:rgba(0,0,0,.02);padding:120px 0;">
        <div class="mvh-section-head reveal-up">
          <span class="mvh-eyebrow">Nuestros Hitos</span>
          <h2 class="mvh-section-title">Línea del <em>Tiempo</em></h2>
        </div>
        <div class="zigzag-timeline active">
          <div class="timeline-container">
            ${timelineItems.map(t => `
              <div class="timeline-item ${t.inverted ? 'timeline-inverted' : ''} timeline-active reveal-up">
                <div class="timeline-content">
                  <span class="timeline-year">${t.year}</span>
                  <h3>${t.title}</h3>
                  <p>${t.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ¿POR QUÉ ELEGIR MARVELSA? -->
      <section class="nos-why-choose" style="padding:clamp(60px,10vw,120px) 0;">
        <div class="container-narrow">
          <div class="nos-why-choose-header reveal-up">
            <div class="glass-panel-premium" style="padding:clamp(30px,5vw,60px);border-radius:30px;background:#fff;box-shadow:0 25px 50px -12px rgba(0,0,0,.08);border:none;">
              <h2 class="mvh-section-title" style="margin-bottom:15px;text-align:center;">¿Por qué elegir <em>Marvelsa</em>?</h2>
              <p style="font-size:1.1rem;line-height:1.8;color:rgba(0,0,0,.6);text-align:left;">
                Más que un proveedor, somos un aliado de negocio que entiende tus retos y te acompaña en cada paso.
              </p>
            </div>
          </div>

          <div class="nos-why-grid reveal-up" style="margin-top:30px;">
            <div class="glass-panel-premium" style="padding:clamp(30px,5vw,60px);border-radius:30px;background:#fff;box-shadow:0 25px 50px -12px rgba(0,0,0,.08);border:none;">
              <div class="nos-why-cards-grid">
                ${[
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        title: 'Experiencia Comprobada',
        desc: 'Más de dos décadas liderando la distribución B2B en múltiples sectores',
        delay: ''
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>',
        title: 'Marcas Líderes',
        desc: 'Representamos fabricantes reconocidos por su innovación y desempeño.',
        delay: '0.1s'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
        title: 'Cobertura Nacional',
        desc: 'Entregamos a todo México con eficiencia y respaldo logístico.',
        delay: '0.2s'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
        title: 'Portal Exclusivo',
        desc: 'Compra, planifica y controla tu negocio con facilidad.',
        delay: '0.3s'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        title: 'Soporte Técnico y Postventa',
        desc: 'Soluciones rápidas, atención cercana y respaldo garantizado.',
        delay: '0.4s'
      },
      {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/><path d="M11 11h2"/><path d="M4 11h16"/></svg>',
        title: 'Valor Justo',
        desc: 'Productos de calidad profesional a precios que permiten competir y crecer.',
        delay: '0.5s'
      },
    ].map(c => `
                  <div class="nos-why-card reveal-up" ${c.delay ? `style="transition-delay:${c.delay}"` : ''}>
                    <div class="nos-why-card-icon">${c.icon}</div>
                    <h3 class="nos-why-card-title">${c.title}</h3>
                    <p class="nos-why-card-desc">${c.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PHILOSOPHY BANNER -->
      <section class="nos-philosophy" style="padding:clamp(60px,10vw,120px) 0;">
        <div class="container-narrow">
          <div class="nos-philosophy-card reveal-up">
            <span class="mvh-eyebrow nos-philosophy-eyebrow">Nuestra Filosofía</span>
            <h2 class="nos-philosophy-quote" style="font-size:clamp(1.5rem,3vw,2.2rem);font-weight:900;line-height:1.4;margin-bottom:20px;">
              Nuestra filosofía
            </h2>
            <p class="nos-philosophy-text" style="font-size:1.05rem;line-height:1.8;color:rgba(0,0,0,.7);text-align:left;">
              En Marvelsa creemos que el crecimiento solo es real cuando se comparte.<br>
              Por eso, cada producto, servicio y proceso está pensado para fortalecer a nuestros distribuidores, ayudarlos a expandirse y ofrecer siempre lo mejor a sus clientes.<br>
              Somos más que una comercializadora: somos el respaldo que impulsa tu negocio.
            </p>
          </div>
        </div>
      </section>

    </main>
    ${getFooterHTML()}
  `;

  renderNavbar('nav-container');
  renderHeroCarousel('nosotros-carousel-container');
  activateRevealObserver({ includeTimeline: true });
};
