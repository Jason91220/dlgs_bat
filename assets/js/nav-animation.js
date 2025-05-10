// Animation de la barre de navigation pendant le défilement
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Seuil de défilement pour déclencher l'animation

    // Ajout des classes CSS nécessaires pour l'animation
    if (navbar) {
        // Fonction pour gérer l'animation de la barre de navigation
        function handleNavAnimation() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Ajouter la classe 'scrolled' lorsque l'utilisateur défile en dessous du seuil
            if (scrollTop > scrollThreshold) {
                navbar.classList.add('scrolled');
                
                // Déterminer la direction du défilement
                if (scrollTop > lastScrollTop) {
                    // Défilement vers le bas
                    navbar.classList.remove('scroll-up');
                    navbar.classList.add('scroll-down');
                } else {
                    // Défilement vers le haut
                    navbar.classList.remove('scroll-down');
                    navbar.classList.add('scroll-up');
                }
            } else {
                // Au-dessus du seuil, retirer toutes les classes
                navbar.classList.remove('scrolled', 'scroll-up', 'scroll-down');
            }
            
            lastScrollTop = scrollTop;
        }

        // Exécuter l'animation au chargement initial
        handleNavAnimation();
        
        // Ajouter l'écouteur d'événement pour le défilement
        window.addEventListener('scroll', handleNavAnimation);
    }
});
