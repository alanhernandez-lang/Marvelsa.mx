// src/components/HeroCarousel.js
import img1 from '../assets/images/Carrucel1.png';
import img2 from '../assets/images/Carrucel2.png';
import img3 from '../assets/images/Carrucel3.png';
import img4 from '../assets/images/Carrusel4.png';
import img5 from '../assets/images/Carrusel5.png';

export const carouselSlides = [
  { id: 1, image: img1, titleTop: 'MARVELSA',    titleBottom: 'SÍ DA SOLUCIONES Y RESPALDA TUS EQUIPOS',     themeColor: '#e31e24' },
  { id: 2, image: img2, titleTop: 'INNOVACIÓN',  titleBottom: 'TECNOLOGÍA QUE IMPULSA TU NEGOCIO',           themeColor: '#005E5E' },
  { id: 3, image: img3, titleTop: 'POTENCIA',    titleBottom: 'ENERGÍA CONTINUA SIN INTERRUPCIONES',         themeColor: '#0046be' },
  { id: 4, image: img4, titleTop: 'RENDIMIENTO', titleBottom: 'TRABAJO DURO, RESULTADOS SEGUROS',            themeColor: '#f26522' },
  { id: 5, image: img5, titleTop: 'CONFIANZA',   titleBottom: 'SOPORTE Y CALIDAD DE CLASE MUNDIAL',          themeColor: '#2d5a27' },
];

let carouselInterval;

export const renderHeroCarousel = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="hero-carousel">
      ${carouselSlides.map((slide, i) => `
        <div class="carousel-slide ${i === 0 ? 'active' : ''}" data-index="${i}"
             style="background-image:url('${slide.image}');"></div>
      `).join('')}

      <button class="carousel-control prev" id="carousel-prev">‹</button>
      <button class="carousel-control next" id="carousel-next">›</button>

      <div class="carousel-indicators">
        ${carouselSlides.map((_, i) => `
          <div class="carousel-indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
        `).join('')}
      </div>
    </div>
  `;

  initCarouselLogic();
};

const initCarouselLogic = () => {
  const slides     = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn    = document.getElementById('carousel-prev');
  const nextBtn    = document.getElementById('carousel-next');
  let currentIndex = 0;

  const goToSlide = (index) => {
    slides[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
  };

  const resetInterval = () => {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
  };

  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);

  nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetInterval(); });
  prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetInterval(); });
  indicators.forEach((ind, i) => ind.addEventListener('click', () => { goToSlide(i); resetInterval(); }));
};
