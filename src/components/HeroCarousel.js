import img1 from '../assets/images/Carrucel1.png';
import img2 from '../assets/images/Carrucel2.png';
import img3 from '../assets/images/Carrucel3.png';
import img4 from '../assets/images/Carrusel4.png';
import img5 from '../assets/images/Carrusel5.png';

const carouselSlides = [img1, img2, img3, img4, img5];

let carouselInterval;

export const renderHeroCarousel = (containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="hero-carousel">
      ${carouselSlides.map((img, i) => `
        <div class="carousel-slide ${i === 0 ? 'active' : ''}" data-index="${i}"
             style="background-image:url('${img}');"></div>
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
