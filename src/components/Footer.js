// src/components/Footer.js
import { logoMarvelsa } from '../assets/images.js';

export const getFooterHTML = () => `
  <footer class="main-footer">
    <div class="container footer-grid">

      <div class="footer-col about">
        <a href="#/">
          <img loading="lazy" src="${logoMarvelsa}" alt="Marvelsa Logo" style="height:45px;width:auto;display:block;">
        </a>
        <p class="footer-desc">
          MARVELSA es una empresa generadora de bienestar económico tanto para nuestros proveedores,
          colaboradores, clientes así como usuario final, a través de la comercialización de productos
          de calidad, a precios competitivos y con el mejor servicio del mercado para la industria
          agrícola, forestal, jardinería y construcción.
        </p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.353 2.612 6.777 6.974 6.975 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.351-.2 6.777-2.612 6.975-6.974.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.352-2.612-6.78-6.975-6.976C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-col links">
        <h3>MARVEL</h3>
        <ul>
          <li><a href="#/">INICIO</a></li>
          <li><a href="#/nosotros">NOSOTROS</a></li>
          <li><a href="#/contacto">MARCAS</a></li>
        </ul>
      </div>

      <div class="footer-col contact">
        <h3>CONTACTO</h3>
        <div class="contact-item">
          <span class="icon">
            <svg viewBox="0 0 24 24" fill="var(--primary)" width="20" height="20">
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
            </svg>
          </span>
          <p>+52 3318657506</p>
        </div>
        <div class="contact-item">
          <span class="icon">
            <svg viewBox="0 0 24 24" fill="var(--primary)" width="20" height="20">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </span>
          <p>contacto@marvelsa.com</p>
        </div>
        <div class="contact-item">
          <span class="icon">
            <svg viewBox="0 0 24 24" fill="var(--primary)" width="20" height="20">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </span>
          <p>Av. Privada de la Cruz 13, Condominio Industrial Santa Cruz, 45640 Tlajomulco de Zúñiga, Jal.</p>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <div class="container">
        <p class="corporate-name">Comercializadora Marvel S.A. de C.V.</p>
        <p class="copyright">Todos los derechos © 2026 | Marvelsa México</p>
        <div style="margin-top:15px;display:flex;gap:20px;justify-content:center;font-size:0.75rem;opacity:0.5;">
          <a href="javascript:void(0)" onclick="document.getElementById('modal-legal').style.display='flex'" style="color:inherit;text-decoration:none;">Aviso Legal</a>
          <a href="javascript:void(0)" onclick="document.getElementById('modal-privacidad').style.display='flex'" style="color:inherit;text-decoration:none;">Aviso de Privacidad</a>
        </div>
      </div>
    </div>
  </footer>
`;
