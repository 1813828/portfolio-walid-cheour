// main.js appelle cette fonction une fois que les cartes du JSON sont dans la page.
function initialiserAnimations() {
    // Si les bibliothèques ne se chargent pas, le contenu reste visible.
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // N'anime pas la page si l'utilisateur a activé la réduction des mouvements.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ScrollTrigger permet de lancer les animations pendant le défilement.
    gsap.registerPlugin(ScrollTrigger);

    // from() part de ces valeurs et revient à l'apparence définie dans le CSS.
    gsap.from('.accueil > div, .accueil-portrait', {
        y: 30,              // Commence 30px plus bas.
        opacity: 0,         // Commence invisible, puis apparaît.
        duration: 0.8,      // L'animation dure 0,8 seconde.
        stagger: 0.15,      // Décale légèrement le départ de la photo après le texte.
        clearProps: 'opacity,transform' // Retire les styles d'animation à la fin.
    });

    // Une seule boucle anime les cartes, les compétences, la présentation et le contact.
    const elements = document.querySelectorAll('.carte-projet, #competences .entete-section, .grille-competences, .apropos-contenu > div, .apropos figure, #contact .conteneur');
    elements.forEach((element) => {
        gsap.from(element, {
            opacity: 0,
            // Les cartes apparaissent en fondu ; les autres éléments remontent de 40px.
            y: element.classList.contains('carte-projet') ? 0 : 40,
            duration: 0.8,
            clearProps: 'opacity,transform',
            scrollTrigger: {
                trigger: element, // L'élément qui déclenche sa propre animation.
                start: 'top 90%',  // Quand son haut atteint 90% de la hauteur de l'écran.
                once: true        // Joue l'animation une seule fois.
            }
        });
    });

    // Recalcule les positions après l'ajout des projets dans la page.
    ScrollTrigger.refresh();
}
