// Initialise la modale, injecte les donnees du projet et gere son ouverture.
function initialiserModale(projects) {
	// Recupere la fenetre modale et son bouton de fermeture.
	const modal = document.querySelector('#modale-processus');
	const closeButton = modal?.querySelector('.processus-power__fermer');

	// Arrete l'initialisation si la modale n'est pas presente dans la page.
	if (!modal || !closeButton) {
		return;
	}

	// Recupere les zones qui recevront les informations du projet selectionne.
	const image = modal.querySelector('#processus-image');
	const title = modal.querySelector('#processus-titre');
	const name = modal.querySelector('#processus-nom');
	const category = modal.querySelector('#processus-categorie');
	const description = modal.querySelector('#processus-description');
	const steps = modal.querySelector('#processus-etapes');
	const gallery = modal.querySelector('#processus-galerie');

	// Utilise un seul ecouteur pour les boutons de detail crees dynamiquement.
	document.addEventListener('click', (event) => {
		const button = event.target.closest('[data-project-id]');

		// Ignore les clics qui ne concernent pas un bouton de projet.
		if (!button) {
			return;
		}

		const project = projects.find((item) => item.id === button.dataset.projectId);

		// Ignore le projet si aucun processus detaille n'est disponible.
		if (!project?.processus) {
			return;
		}

		// Remplit l'en-tete et la description avec les donnees du projet.
		image.src = project.image;
		image.alt = `Projet ${project.title}`;
		title.textContent = project.title;
		name.textContent = project.title;
		category.textContent = `${project.category} - ${project.year}`;
		description.textContent = project.processus.description;
		steps.replaceChildren();
		gallery.replaceChildren();

		// Construit la liste numerotee des etapes du processus.
		project.processus.steps.forEach((step) => {
			const listItem = document.createElement('li');
			listItem.textContent = step;
			steps.append(listItem);
		});

		// Construit la galerie d'images du processus.
		project.processus.gallery.forEach((item) => {
			const figure = document.createElement('figure');
			const galleryImage = document.createElement('img');
			galleryImage.src = item.image;
			galleryImage.alt = item.alt;
			figure.append(galleryImage);
			gallery.append(figure);
		});

		// Affiche la modale une fois que son contenu est complet.
		modal.showModal();
	});

	// Ferme la modale avec le bouton dédié.
	closeButton.addEventListener('click', () => modal.close());

	// Ferme aussi la modale lorsqu'on clique sur son arrière-plan.
	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.close();
		}
	});
}
