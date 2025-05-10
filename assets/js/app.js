document.addEventListener('DOMContentLoaded', function() {
    // Note: L'animation des feux d'artifice a été déplacée dans fireworks.js
    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    

    


    // Slider avant/après sur la page d'accueil
    const sliderHandle = document.querySelector('.slider-handle');
    const beforeImage = document.querySelector('.before-image');

    if (sliderHandle && beforeImage) {
        let isDragging = false;

        const slider = sliderHandle.parentElement;
        const sliderWidth = slider.offsetWidth;

        // Fonction pour mettre à jour la position du slider
        const updateSliderPosition = (x) => {
            const sliderRect = slider.getBoundingClientRect();
            let position = (x - sliderRect.left) / sliderRect.width;
            position = Math.max(0, Math.min(1, position));
            
            beforeImage.style.width = `${position * 100}%`;
            sliderHandle.style.left = `${position * 100}%`;
        };

        // Événements pour le glisser-déposer
        sliderHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
        });

        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
        }, { passive: true });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging || !e.touches[0]) return;
            updateSliderPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // Sliders avant/après sur la page réalisations
    const realisationCards = document.querySelectorAll('.realisation-card');
    
    realisationCards.forEach(card => {
        const handle = card.querySelector('.comparison-slider-handle');
        const beforeAfterImages = card.querySelector('.before-after-images');
        const afterImg = card.querySelector('.after-img');
        
        if (handle && afterImg) {
            let isDragging = false;

            // Fonction pour mettre à jour la position du slider
            const updatePosition = (x) => {
                const rect = beforeAfterImages.getBoundingClientRect();
                let position = (x - rect.left) / rect.width;
                position = Math.max(0, Math.min(1, position));
                
                afterImg.style.clipPath = `polygon(${position * 100}% 0, 100% 0, 100% 100%, ${position * 100}% 100%)`;
                handle.style.left = `${position * 100}%`;
            };

            // Événements pour le glisser-déposer
            handle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDragging = true;
            });

            handle.addEventListener('touchstart', (e) => {
                isDragging = true;
            }, { passive: true });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                updatePosition(e.clientX);
            });

            window.addEventListener('touchmove', (e) => {
                if (!isDragging || !e.touches[0]) return;
                updatePosition(e.touches[0].clientX);
            }, { passive: true });

            window.addEventListener('mouseup', () => {
                isDragging = false;
            });

            window.addEventListener('touchend', () => {
                isDragging = false;
            });
        }
    });

    // Filtrage des réalisations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const realisationItems = document.querySelectorAll('.realisation-card');

    if (filterButtons.length > 0 && realisationItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                realisationItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category').includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Accordéon FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                // Vérifier si l'élément est déjà actif
                const isActive = item.classList.contains('active');
                
                // Fermer tous les accordéons
                accordionItems.forEach(accItem => {
                    accItem.classList.remove('active');
                });
                
                // Si l'élément n'était pas actif, l'ouvrir
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .feature, .realisation-card, .contact-info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Exécuter l'animation au chargement et au défilement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Accordéon mentions légales
    const legalAccordionHeader = document.querySelector('.legal-accordion .accordion-header');
    const legalAccordionContent = document.querySelector('.legal-accordion .accordion-content');
    
    if (legalAccordionHeader && legalAccordionContent) {
        legalAccordionHeader.addEventListener('click', function() {
            this.classList.toggle('active');
            legalAccordionContent.classList.toggle('active');
            
            // Rotation de l'icône
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = this.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    }
});

// All animation variables and code are now inside the DOMContentLoaded event

// DISCLAIMER: This function does require jQuery. I've used it here because the project I'm building this for already uses jQuery, so I thought why not. It can be modified quite simply to be done in raw JavaScript.  Just thought I'd let you know.




// This is the funtion you need to copy
// Copy from line 9 to 34

function autoType(elementClass, typingSpeed){
    var thhis = $(elementClass);
    thhis.css({
      "position": "relative",
      "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function(){
      thhis.css("opacity",1);
      thhis.prev().removeAttr("style");
      thhis.text("");
      for(var i = 0; i < amntOfChars; i++){
        (function(i,char){
          setTimeout(function() {        
            newString += char;
            thhis.text(newString);
          },i*typingSpeed);
        })(i+1,text[i]);
      }
    },1500);
  }
  
 


