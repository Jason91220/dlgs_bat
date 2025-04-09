document.addEventListener('DOMContentLoaded', function() {
    // Configuration du carrousel
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // Fonction pour aller au slide suivant
    function nextSlide() {
        // Masquer le slide actuel
        slides[currentSlide].classList.remove('active');
        
        // Passer au slide suivant (avec retour au début si nécessaire)
        currentSlide = (currentSlide + 1) % slideCount;
        
        // Afficher le nouveau slide
        slides[currentSlide].classList.add('active');
    }
    
    // Démarrer le défilement automatique
    function startAutoSlide() {
        // Défilement toutes les 5 secondes
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Initialiser le carrousel et démarrer le défilement automatique
    startAutoSlide();
});
