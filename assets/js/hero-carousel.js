// Optimized carousel initialization
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the first slide is visible immediately for better LCP
    const firstSlide = document.querySelector('.hero-slide.active');
    if (firstSlide) {
        // Force browser to prioritize this element
        firstSlide.style.display = 'block';
    }
    
    // Defer the carousel initialization to after critical content is loaded
    const deferCarousel = function() {
        // Configuration du carrousel
        const slides = document.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;
        
        // Fonction pour aller au slide suivant
        function nextSlide() {
            // Use requestAnimationFrame for smoother transitions
            requestAnimationFrame(function() {
                // Masquer le slide actuel
                slides[currentSlide].classList.remove('active');
                
                // Passer au slide suivant (avec retour au début si nécessaire)
                currentSlide = (currentSlide + 1) % slideCount;
                
                // Afficher le nouveau slide
                slides[currentSlide].classList.add('active');
            });
        }
        
        // Démarrer le défilement automatique
        function startAutoSlide() {
            // Défilement toutes les 5 secondes
            // Only start after the page has fully loaded
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Initialiser le carrousel et démarrer le défilement automatique
        // Delay the start of the carousel to prioritize LCP
        setTimeout(startAutoSlide, 2000);
    };
    
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
        requestIdleCallback(deferCarousel);
    } else {
        setTimeout(deferCarousel, 200);
    }
});
