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
	const settings = modal.querySelector('#processus-parametres');
	const gallery = modal.querySelector('#processus-galerie');
	const lightbox = modal.querySelector('.processus-power__lightbox');
	const lightboxImage = modal.querySelector('.processus-power__lightbox-image');
	const closeLightboxButton = modal.querySelector('.processus-power__lightbox-fermer');

	// Ferme la lightbox et masque son contenu pour l'accessibilite.
	const fermerLightbox = () => {
		lightbox.classList.remove('is-visible');
		lightbox.setAttribute('aria-hidden', 'true');
	};

	// Ouvre la grande image pour permettre une lecture plus claire du visuel.
	const ouvrirLightbox = (imageSource, altText) => {
		lightboxImage.src = imageSource;
		lightboxImage.alt = altText;
		lightbox.classList.add('is-visible');
		lightbox.setAttribute('aria-hidden', 'false');
	};

	closeLightboxButton.addEventListener('click', fermerLightbox);
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) {
			fermerLightbox();
		}
	});

	// Permet de fermer la lightbox avec la touche Escape quand elle est ouverte.
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && lightbox.classList.contains('is-visible')) {
			fermerLightbox();
		}
	});

	// Un seul gestionnaire de clic suffit pour tous les boutons de projet créés dynamiquement.
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
		settings.replaceChildren();
		gallery.replaceChildren();

		// Construit la liste numerotee des etapes du processus.
		project.processus.steps.forEach((step) => {
			const listItem = document.createElement('li');
			listItem.textContent = step;
			steps.append(listItem);
		});

		// Construit la liste des parametres de configuration du projet.
		if (Array.isArray(project.processus.settings)) {
			project.processus.settings.forEach((setting) => {
				const listItem = document.createElement('li');
				listItem.textContent = setting;
				settings.append(listItem);
			});
		}

		// Construit la galerie d'images du processus et rend chaque visuel cliquable.
		project.processus.gallery.forEach((item) => {
			const figure = document.createElement('figure');
			const galleryImage = document.createElement('img');
			galleryImage.src = item.image;
			galleryImage.alt = item.alt;
			galleryImage.tabIndex = 0;
			galleryImage.setAttribute('role', 'button');
			galleryImage.setAttribute('aria-label', `Ouvrir l'image ${item.alt}`);
			// Permet d'ouvrir l'image aussi au clavier avec Entrée ou Espace.
			galleryImage.addEventListener('click', () => {
				ouvrirLightbox(item.image, item.alt);
			});
			galleryImage.addEventListener('keydown', (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					ouvrirLightbox(item.image, item.alt);
				}
			});
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
