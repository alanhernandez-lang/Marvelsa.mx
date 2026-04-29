// src/components/LeadForm.js
import { trackLeadConversion } from '../core/tracking';

export const renderLeadForm = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="lead-form-wrapper glass-panel animate-fade" style="padding: 40px; max-width: 800px; margin: 0 auto; background: white; border: 1px solid rgba(0,0,0,0.05);">
      <h3 style="margin-bottom: 10px; color: var(--primary); font-size: 1.8rem; text-align: center;">Comencemos a trabajar juntos</h3>
      <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 30px; text-align: center;">Déjanos tus datos y un asesor profesional se pondrá en contacto contigo.</p>
      
      <form id="distributor-form" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <input type="text" name="name" placeholder="Nombre completo" required minlength="3" pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$" title="Ingresa un nombre válido (solo letras)" style="padding: 15px; border-radius: 12px; border: 1px solid #ddd; background: #f9f9f9; color: var(--text-main); font-size: 1rem;">
        <input type="text" name="company" placeholder="Empresa / Negocio" required minlength="2" style="padding: 15px; border-radius: 12px; border: 1px solid #ddd; background: #f9f9f9; color: var(--text-main); font-size: 1rem;">
        <input type="text" name="city" placeholder="Ciudad / Estado" required minlength="3" style="padding: 15px; border-radius: 12px; border: 1px solid #ddd; background: #f9f9f9; color: var(--text-main); font-size: 1rem;">
        <input type="tel" name="phone" placeholder="Teléfono (10 dígitos)" required pattern="[0-9]{10,15}" title="Ingresa un teléfono válido (10-15 dígitos)" style="padding: 15px; border-radius: 12px; border: 1px solid #ddd; background: #f9f9f9; color: var(--text-main); font-size: 1rem;">
        
        <button type="submit" class="btn-primary" style="grid-column: span 2; padding: 18px; font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; cursor: pointer;">Enviar Solicitud</button>
      </form>
      
      <div id="form-feedback" style="margin-top: 30px; text-align: center; display: none;">
        <div style="background: rgba(0, 94, 94, 0.1); padding: 20px; border-radius: 12px;">
          <p style="color: var(--primary); font-weight: 600; font-size: 1.2rem; margin: 0;">✅ ¡Gracias! Tu solicitud ha sido recibida con éxito.</p>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('distributor-form');
  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI Feedback: Loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'PROCESANDO...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Collect data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Prepare Email Content (Professional Plain-Text Formatting)
    const subject = encodeURIComponent(`🚀 Nueva Solicitud de Distribuidor: ${data.name}`);
    const body = encodeURIComponent(
      `=======================================\n` +
      `   NUEVA SOLICITUD DE DISTRIBUIDOR\n` +
      `=======================================\n\n` +
      `DETALLES DEL PROSPECTO:\n` +
      `---------------------------------------\n` +
      `👤 Nombre:    ${data.name}\n` +
      `🏢 Empresa:   ${data.company}\n` +
      `📍 Ubicación: ${data.city}\n` +
      `📞 Teléfono:  ${data.phone}\n\n` +
      `---------------------------------------\n` +
      `Enviado desde el Portal Marvelsa (Nosotros)\n` +
      `Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n` +
      `=======================================`
    );

    // Simulate Network latency and then redirect/show success
    setTimeout(() => {
      // Trigger Email Client
      window.location.href = `mailto:alan.hernandez@marvelsa.com?subject=${subject}&body=${body}`;
      
      trackLeadConversion();
      form.style.display = 'none';
      feedback.style.display = 'block';
      feedback.classList.add('animate-scale');
    }, 1000);
  });
};
