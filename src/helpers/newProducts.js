/**
 * New Products Showcase Section
 * Renders a visually distinct "Productos Nuevos" section for brand microsites.
 * Design: animated glow borders, glassmorphism cards, aurora background,
 * spec chips, gradient CTAs — completely different from "Equipos Destacados".
 */

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
};

/* ─── Per-brand new product data ─── */

export const brandNewProds = {
  kawashima: [
    { name: 'BK7.530', tag: 'Forestal', spec: 'Equipo profesional • Alta eficiencia • Rendimiento superior' },
    { name: 'BK1440', tag: 'Agrícola', spec: 'Motor de alto desempeño • Durabilidad probada • Uso rudo' },
    { name: 'BK2.510', tag: 'Jardín', spec: 'Diseño compacto • Fácil manejo • Mantenimiento sencillo' },
    { name: 'AT5L', tag: 'Aspersión', spec: 'Cobertura uniforme • Ligero y ergonómico • Uso eficiente' },
  ],
  parazzini: [
    { name: 'BAKARAC300-G', tag: 'Industrial', spec: 'Alta capacidad • Resistencia extrema • Uso profesional' },
    { name: 'HULIGAN03', tag: 'Construcción', spec: 'Máximo rendimiento • Componentes reforzados • Larga vida útil' },
    { name: 'GPIS5.5KW', tag: 'Energía', spec: 'Generador 5.5KW • Arranque confiable • Energía estable' },
    { name: 'BSP0.550L', tag: 'Agrícola', spec: 'Precisión superior • Flujo constante • Fácil instalación' },
  ],
  goldentree: [
    { name: 'BL020-120-20-4000', tag: 'Bluedrip', spec: 'Cinta Bluedrip 5/8" • Flujo alto 1.2 lph • Espaciado @20cm • Cal 8 mil • Rollo 4,000 m' },
    { name: 'GSD5-040-300-200', tag: 'Aspersión', spec: 'Cinta GoldenSpray D-5 2" • 0.40 mm • 300 lpm • Rollo 200 m' },
    { name: 'WDE200-150-30-3000', tag: 'WhiteDrip', spec: 'Cinta WhiteDrip pastilla 5/8" • Flujo alto 1.5 lph • Espaciado @30cm • Cal 10 mil • Rollo 3,000 m' },
    { name: 'GR025-080-20-3500', tag: 'GreenDrip', spec: 'Cinta GreenDrip 5/8" • Flujo bajo 0.8 lph • Espaciado @20cm • Cal 10 mil • Rollo 3,500 m' },
  ],
  powerhunt: [
    { name: 'REDWOOD', tag: 'Forestal', spec: 'Motosierra profesional • Alta potencia • Diseño ergonómico • Cadena reforzada' },
    { name: 'MPH-RT-4-050', tag: 'Riego', spec: 'Manguera reforzada 4 capas • 50 metros • Uso agrícola e industrial' },
    { name: 'HPH1200E', tag: 'Hogar', spec: 'Hidrolavadora eléctrica 1200W • Compacta • Ideal para uso doméstico' },
    { name: 'CP80SA', tag: 'Compresor', spec: 'Compresor 80 lts • Silent Air • Bajo nivel de ruido • Doble salida' },
  ],
  takashi: [
    { name: 'TITAN62', tag: 'Forestal', spec: 'Motosierra 62cc • Barra 22 pulg • Cadena Oregon • Uso profesional intensivo' },
    { name: 'AST25E', tag: 'Agrícola', spec: 'Aspersor eléctrico de mochila 25 lts • Batería litio recargable • Motor silencioso' },
    { name: 'DT52-PRO', tag: 'Jardín', spec: 'Desbrozador 52cc • Cabezal multifunción • Incluye disco y nylon • Arnés incluido' },
  ],
  ducar: [
    { name: 'DG7500SE', tag: 'Generador', spec: 'Generador 7500W • Arranque eléctrico • ATS compatible • Monofásico' },
    { name: 'DWP40', tag: 'Agrícola', spec: 'Motobomba 4 pulg • Motor 13 HP • Alta capacidad de caudal • Autocebante' },
    { name: 'DQ210F', tag: 'Motor', spec: 'Motor 7 HP OHV • Eje horizontal • Compatible con múltiples aplicaciones' },
    { name: 'DC500E', tag: 'Agrícola', spec: 'Motocultor 9 HP • Arranque eléctrico • Ancho de trabajo 100 cm • Cuchillas reforzadas' },
  ],
  oregon: [
    { name: 'SpeedCut Nano 95TXL', tag: 'Forestal', spec: 'Cadena bajo perfil • Corte ultra rápido • Motosierras ligeras • Menos vibración' },
    { name: 'VersaCut 20"', tag: 'Forestal', spec: 'Barra guía 20 pulg • Compatible múltiples marcas • Acero templado • Larga duración' },
    { name: 'PowerSharp Kit', tag: 'Accesorio', spec: 'Sistema de afilado integrado • Afila en segundos • Sin desmontar cadena • Fácil uso' },
  ],
};

/* ─── Section builder ─── */

export const buildNewProductsHTML = (p, accentColor, brandTitle, newProds, isLight, illustrationFn) => {
  if (!newProds || newProds.length === 0) return '';
  const rgb = hexToRgb(accentColor);

  const buildNewCard = (prod, i) => {
    const hasModel = /^[A-Z0-9.\-|]+$/i.test(prod.name);
    let displayTitle = prod.name;
    let displayModel = '';
    let specChips = [];

    if (hasModel) {
      displayModel = prod.name;
      if (prod.spec) {
        const parts = prod.spec.split(/•|—/).map(s => s.trim()).filter(Boolean);
        displayTitle = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        specChips = parts.slice(1);
      } else {
        displayTitle = prod.tag || 'Producto Nuevo';
      }
    } else if (prod.spec) {
      specChips = prod.spec.split(/•|—/).map(s => s.trim()).filter(Boolean);
    }

    if (specChips.length === 0) specChips = ['Alta eficiencia', 'Diseño premium', 'Refacciones disponibles'];

    return `
      <div class="np-card" style="--np-delay:${i * 0.15}s;">
        <div class="np-card-glow"></div>
        <div class="np-card-bg"></div>
        <div class="np-card-content">
          <div class="np-badge-nuevo">✦ NUEVO</div>
          <div class="np-card-visual">
            ${illustrationFn(p, accentColor, prod.tag, prod.name)}
          </div>
          <div class="np-card-info">
            <div class="np-card-tag-row">
              <span class="np-card-tag">${prod.tag}</span>
              ${displayModel ? `<span class="np-card-model">${displayModel}</span>` : ''}
            </div>
            <h3 class="np-card-name">${displayTitle}</h3>
            <div class="np-card-chips">
              ${specChips.map(s => `<span class="np-chip">${s}</span>`).join('')}
            </div>
            <a href="${prod.pdf || '#'}" ${prod.pdf ? 'target="_blank" rel="noopener"' : ''} class="np-card-cta">
              Descubrir producto
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>`;
  };

  return `
    <section class="np-section${isLight ? ' np-light' : ''}" style="--np-accent:${accentColor};--np-rgb:${rgb};">
      <div class="np-aurora"></div>
      <div class="np-dots"></div>
      <div class="np-watermark">NEW</div>
      <div class="np-inner">
        <div class="np-header">
          <div class="np-header-badge">🚀 Recién Llegados</div>
          <h2 class="np-header-title">Productos <span>Nuevos</span></h2>
          <p class="np-header-sub">Descubre lo último en innovación y tecnología de ${brandTitle}</p>
          <div class="np-header-line"></div>
        </div>
        <div class="np-grid">
          ${newProds.map((prod, i) => buildNewCard(prod, i)).join('')}
        </div>
      </div>
    </section>`;
};
