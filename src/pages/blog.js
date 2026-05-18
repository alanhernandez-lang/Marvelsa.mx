import { renderNavbar } from '../components/Navbar.js';
import { getFooterHTML } from '../components/Footer.js';

export const renderBlogArticle = (articleId) => {
  const articles = {
    'desbrozadora-kawashima': {
      title: 'Cómo elegir la desbrozadora Kawashima ideal según tus tareas',
      content: `
        <p>Cuando se trata de mantener tu terreno limpio y productivo, elegir la desbrozadora correcta marca la diferencia entre un trabajo pesado… y uno bien hecho. En Kawashima, diseñamos herramientas pensadas para durar, con potencia y respaldo, para que puedas trabajar mejor, más rápido y con confianza.</p>
        <p>Pero no todas las desbrozadoras son iguales. Cada modelo está hecho para un tipo de tarea, terreno y frecuencia de uso. En esta guía te ayudaremos a identificar cuál es la mejor opción para ti.</p>
        
        <h3>1. Desbrozadoras semiprofesionales: potencia equilibrada para trabajos frecuentes</h3>
        <p>Ideales para quienes realizan mantenimiento constante en jardines, terrenos pequeños o medianos.</p>
        <ul>
          <li>Ofrecen un equilibrio entre potencia y ligereza, lo que las hace cómodas para jornadas de varias horas sin exigir demasiado esfuerzo físico.</li>
          <li>Son perfectas para cortar pasto grueso, maleza ligera y trabajos de mantenimiento periódico.</li>
        </ul>
        <p><strong>Ventajas:</strong></p>
        <ul>
          <li>Motor de dos tiempos con excelente rendimiento.</li>
          <li>Peso moderado, fácil transporte y arranque rápido.</li>
          <li>Gran relación entre potencia y consumo de combustible.</li>
        </ul>
        <p><em>Recomendadas para:</em> jardineros, cuidadores de áreas verdes y agricultores que realizan tareas de limpieza de forma continua.</p>

        <h3>2. Desbrozadoras profesionales: máxima potencia para terrenos exigentes</h3>
        <p>Diseñadas para uso intensivo en condiciones más duras. Si tu trabajo requiere cortar maleza densa, arbustos o trabajar largas jornadas, esta es tu mejor aliada.</p>
        <ul>
          <li>Su motor de mayor cilindrada y torque permite un corte más agresivo y eficiente, reduciendo el tiempo de trabajo.</li>
        </ul>
        <p><strong>Ventajas:</strong></p>
        <ul>
          <li>Mayor potencia y resistencia al uso continuo.</li>
          <li>Componentes reforzados y mayor durabilidad.</li>
          <li>Rendimiento estable incluso en terrenos irregulares o con pendientes.</li>
        </ul>
        <p><em>Recomendadas para:</em> agricultores, cuadrillas de mantenimiento, contratistas y usuarios que necesitan un equipo que resista el trabajo diario.</p>

        <div style="background:#f9f9f9; padding:30px; border-radius:20px; margin:40px 0;">
          <h3 style="margin-top:0;">⚙️ Eje recto o eje curvo: ¿cuál es mejor para ti?</h3>
          <table style="width:100%; border-collapse: collapse; margin-top:20px;">
            <thead>
              <tr style="border-bottom:2px solid #ddd; text-align:left;">
                <th style="padding:10px;">Tipo de eje</th>
                <th style="padding:10px;">Ideal para</th>
                <th style="padding:10px;">Ventajas principales</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:10px;"><strong>Recto</strong></td>
                <td style="padding:10px;">Terrenos amplios, planos o con maleza densa</td>
                <td style="padding:10px;">Mayor alcance, potencia directa y precisión en el corte. Ideal para uso profesional.</td>
              </tr>
              <tr>
                <td style="padding:10px;"><strong>Curvo</strong></td>
                <td style="padding:10px;">Jardines pequeños o con obstáculos</td>
                <td style="padding:10px;">Mejor maniobrabilidad y comodidad al trabajar cerca de árboles, cercas o muros. Perfecta para mantenimiento doméstico.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p><strong>Consejo del experto Kawashima: el mantenimiento es la clave</strong></p>
        <p>Una desbrozadora puede durar años si se cuida correctamente. Limpia el filtro de aire, revisa la bujía y utiliza mezcla de gasolina y aceite en la proporción recomendada.</p>
        <p>Recuerda: la durabilidad depende del mantenimiento, y nosotros te respaldamos con refacciones y servicio en todo el país.</p>

        <h3 style="text-align:center; margin-top:60px;">Elige con inteligencia, trabaja con confianza</h3>
        <p style="text-align:center;">No se trata solo de potencia, sino de elegir la herramienta que realmente se adapta a ti. Ya sea que necesites una desbrozadora semiprofesional de eje curvo y maneral tipo D para trabajos de jardín, o una profesional de eje recto y maneral tipo bicicleta para uso intensivo, Kawashima tiene el modelo ideal para tu trabajo.</p>
        <div style="text-align:center; margin-top:30px;">
          <button onclick="window.location.hash='#/marca/kawashima'" class="kaw-btn-primary" style="border-radius:100px; padding:15px 40px;">Encuentra tu desbrozadora Kawashima</button>
        </div>
      `
    }
  };

  const article = articles[articleId];
  if (!article) return;

  document.body.className = '';
  document.getElementById('app').innerHTML = `
    <div id="nav-container"></div>
    <main style="background:#fff; padding-top:100px;">
      <article class="container-narrow" style="padding-bottom:100px;">
        <header style="text-align:center; margin-bottom:60px;">
          <span style="color:var(--kaw-red); font-weight:800; text-transform:uppercase; letter-spacing:2px;">Blog Kawashima</span>
          <h1 style="font-size:clamp(2rem,5vw,3.5rem); font-weight:900; line-height:1.1; margin:20px 0;">${article.title}</h1>
          <div style="width:60px; height:4px; background:var(--kaw-red); margin:30px auto;"></div>
        </header>
        <div class="blog-content" style="font-size:1.15rem; line-height:1.8; color:#333;">
          ${article.content}
        </div>
      </article>
    </main>
    ${getFooterHTML()}
  `;
  renderNavbar('nav-container');
  window.scrollTo(0, 0);
};
