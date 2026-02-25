let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carousel = document.getElementById('carousel');
const dotsContainer = document.getElementById('dots');

// Crea i dots
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Aggiorna i dots attivi
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Vai a una slide specifica
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Muovi la slide
function moveSlide(direction) {
    currentSlide += direction;
    
    // Loop infinito
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

// Aggiorna la posizione del carousel
function updateCarousel() {
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Auto-play del carousel
function autoPlay() {
    setInterval(() => {
        moveSlide(1);
    }, 5000); // Cambia slide ogni 5 secondi
}

// Navigazione con tastiera
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// Swipe per mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        moveSlide(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        moveSlide(-1); // Swipe right
    }
}

// Smooth scroll per i link di navigazione
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inizializza tutto quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    autoPlay();
});

// Pausa auto-play quando l'utente interagisce
const carouselContainer = document.querySelector('.carousel-container');
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

// Avvia auto-play all'inizio
startAutoPlay();
