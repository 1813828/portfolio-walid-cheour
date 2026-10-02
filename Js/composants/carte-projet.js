/* Anime l'apparition des cartes de projets lorsqu'elles entrent dans l'écran. */
function animerCartes() {
	// Active le plugin qui déclenche les animations au défilement.
	gsap.registerPlugin(ScrollTrigger);

	// Supprime les anciens déclencheurs avant de recréer les animations après un filtrage.
	ScrollTrigger.getAll().forEach((trigger) => {
		if (trigger.vars.id === 'apparition-cartes') {
			trigger.kill();
		}
	});

	// Sélectionne chaque carte actuellement affichée et lui applique une animation.
	document.querySelectorAll('.card').forEach((card) => {
		gsap.fromTo(
			card,
			// La carte commence invisible.
			{ opacity: 0 },
			{
				// La carte devient visible quand elle arrive dans la zone de déclenchement.
				opacity: 1,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					// Identifiant utilisé pour retrouver et supprimer cette animation.
					id: 'apparition-cartes',
					trigger: card,
					// Lance l'animation lorsque le haut de la carte atteint 85% de la fenêtre.
					start: 'top 85%',
					// Chaque carte ne s'anime qu'une seule fois.
					once: true
				}
			}
		);
	});

    
}
