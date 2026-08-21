const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const carousel = document.querySelector('.hero-carousel');
const slides = [...carousel.querySelectorAll('.hero-slide')];
const dots = [...carousel.querySelectorAll('.carousel-dots button')];
let currentSlide = 0;
let carouselTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, position) => slide.classList.toggle('active', position === currentSlide));
  dots.forEach((dot, position) => {
    const isCurrent = position === currentSlide;
    dot.classList.toggle('active', isCurrent);
    dot.toggleAttribute('aria-current', isCurrent);
  });
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
}

carousel.querySelector('.carousel-prev').addEventListener('click', () => { showSlide(currentSlide - 1); startCarousel(); });
carousel.querySelector('.carousel-next').addEventListener('click', () => { showSlide(currentSlide + 1); startCarousel(); });
dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); startCarousel(); }));
carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
carousel.addEventListener('mouseleave', startCarousel);
startCarousel();
