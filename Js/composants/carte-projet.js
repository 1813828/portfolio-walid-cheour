function animerCartes() {
	gsap.registerPlugin(ScrollTrigger);

	ScrollTrigger.getAll().forEach((trigger) => {
		if (trigger.vars.id === 'apparition-cartes') {
			trigger.kill();
		}
	});

	document.querySelectorAll('.card').forEach((card) => {
		gsap.fromTo(
			card,
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 0.8,
				ease: 'power2.out',
				scrollTrigger: {
					id: 'apparition-cartes',
					trigger: card,
					start: 'top 85%',
					once: true
				}
			}
		);
	});

    
}
