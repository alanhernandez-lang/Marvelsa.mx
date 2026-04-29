// src/main.js
import { brands }              from './data/brands.js';
import { initTracking }        from './core/tracking.js';
import { renderHome }          from './pages/home.js';
import { renderNosotros }      from './pages/nosotros.js';
import { renderContacto }      from './pages/contacto.js';
import { renderBrandMicrosite }from './pages/brandMicrosite.js';

// ── Analytics (replace placeholder IDs before going live) ──
initTracking('GTM-XXXXXX', 'G-XXXXXXXXXX', 'PIXEL_ID');

// ── Router ──────────────────────────────────────────────────
const router = () => {
  const fullPath = window.location.hash.replace('#/', '');
  const [path, query] = fullPath.split('?');

  window.scrollTo(0, 0);

  if (!path || path === '') {
    renderHome();
  } else if (path === 'nosotros') {
    renderNosotros();
  } else if (path === 'contacto') {
    const shouldScroll = query?.includes('scrollTo=form');
    if (!shouldScroll) window.scrollTo(0, 0);
    renderContacto(shouldScroll);
  } else if (brands[path]) {
    renderBrandMicrosite(path);
  } else {
    renderHome();
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// ── Expose to global scope (used by onclick handlers in HTML strings) ──
window.renderHome          = renderHome;
window.renderNosotros      = renderNosotros;
window.renderContacto      = renderContacto;
window.renderBrandMicrosite= renderBrandMicrosite;

// ── Back-to-top button ───────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('show', window.scrollY > 300);
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Legal modals ─────────────────────────────────────────────
const injectLegalModals = () => {
  if (document.getElementById('legal-modals-container')) return;
  const container = document.createElement('div');
  container.id = 'legal-modals-container';
  container.innerHTML = `
    <div id="modal-legal" class="mvh-modal-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9999;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px);">
      <div class="mvh-modal-content" style="background:white;padding:40px;border-radius:30px;max-width:800px;width:100%;max-height:80vh;overflow-y:auto;position:relative;">
        <button onclick="this.closest('.mvh-modal-overlay').style.display='none'" style="position:absolute;top:20px;right:20px;border:none;background:none;font-size:2rem;cursor:pointer;color:#999;">&times;</button>
        <h2 style="margin-bottom:25px;color:var(--primary);">Aviso Legal</h2>
        <div style="font-size:0.95rem;line-height:1.7;color:#444;">
          <p>Las marcas, nombres comerciales y/o signos distintivos que se listan a continuación son propiedad de sus respectivos titulares y no existe ningún tipo de relación comercial o asociación, licencias o autorizaciones para fabricación, comercialización de productos o prestación de servicios entre dichos titulares y Comercializadora Marvel S.A. de C.V.</p>
          <p style="font-weight:700;margin-top:15px;font-size:0.85rem;line-height:1.6;">
            ARCHER, ARIENS, AMC, AYP, BLACK &amp; DECKER, BOLENS, BRIGGS &amp; STRATTON, COX, CUB CADET, CHAMPION, DEUTSCHER, DIXON, DUCAR, ECHO, ENCORE, EXMARK, FERRIS, FLYMO, GILSON, GRASSHOPPER, GRAVELY, GREATE DANE, GREEN MACHINE, GREENFIELD, HOMELITE, HONDA, HUSQVARNA, JAKMAX, JOHN DEERE, JONSE-RED, K&amp;S, KAWASAKI, KEES, KOHLER, KUBOTA, LAWN BOY, LAWN CHIEF, LECHLER, LESCO, LITTLE WONDER, MAKITA, MARUYAMA, MASPORT, MAXIM, McCULLOCH, McLINE, MITSUBISHI, MORRISON, MTD, MURRAY, NGK, NIKKI, NOMA, OREGON, OLEO MAC, ONAM, PARTNER, PHELON, POULAN, ROBIN, ROPER, ROVER, RYOBI, SCAG, SEARS, SHINDAIWA, SIMPLICITY, SNAPPER, STIHL, SOLO, SWISSMEX, TANAKA, TECUMSEH, TILLOTSON, TK, TORO, TROY-BILT, TYGON, VICA, VIKING, WAKER, WALBRO, WARNER, WEEDEATER, WESTWOOD, WHEELHORSE, WOOD, YARDMAN, ZAMA, ADAMA, AGROSCIENCE, ARYSTA, BAYER, BIOIBERICA, CUPROSA, DRAGON, OMEX, SQM, SUMMIT AGRO, SYNGENTA, TEPEYAC.
          </p>
        </div>
      </div>
    </div>

    <div id="modal-privacidad" class="mvh-modal-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9999;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px);">
      <div class="mvh-modal-content" style="background:white;padding:40px;border-radius:30px;max-width:800px;width:100%;max-height:80vh;overflow-y:auto;position:relative;">
        <button onclick="this.closest('.mvh-modal-overlay').style.display='none'" style="position:absolute;top:20px;right:20px;border:none;background:none;font-size:2rem;cursor:pointer;color:#999;">&times;</button>
        <h2 style="margin-bottom:25px;color:var(--primary);">Aviso de Privacidad</h2>
        <div style="font-size:0.95rem;line-height:1.7;color:#444;">
          <p>Comercializadora Marvel S.A. de C.V con domicilio en Av. Privada de la Cruz No. 13 Condominio industrial Santa Cruz, Tlajomulco de Zúñiga, Jalisco México C.P. 45640, es responsable del uso y protección de sus datos personales.</p>
          <p><strong>Finalidades para el trato de sus datos personales.</strong> MARVELSA, al solicitarle datos personales por proveerle nuestros servicios, establecerá una relación jurídica o contractual, utilizando sus datos para procesos de recursos humanos y procesos comerciales, administrativos, legales y de seguridad.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);
};

injectLegalModals();
