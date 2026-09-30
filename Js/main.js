// Recupere les elements necessaires au menu mobile.
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Ouvre, ferme et reinitialise le menu de navigation responsive.
if (navToggle && navLinks) {
	navToggle.addEventListener('click', () => {
		const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

		navToggle.setAttribute('aria-expanded', String(!isExpanded));
		navToggle.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu' : 'Fermer le menu');
		navLinks.classList.toggle('is-open');
	});

	navLinks.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			navToggle.setAttribute('aria-expanded', 'false');
			navToggle.setAttribute('aria-label', 'Ouvrir le menu');
			navLinks.classList.remove('is-open');
		});
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 720) {
			navToggle.setAttribute('aria-expanded', 'false');
			navToggle.setAttribute('aria-label', 'Ouvrir le menu');
			navLinks.classList.remove('is-open');
		}
	});
}

// Construit une carte HTML a partir des donnees d'un projet.
function createProjectCard(project) {
	const article = document.createElement('article');
	article.className = 'card';

	const image = document.createElement('img');
	image.src = project.image;
	image.alt = `Projet ${project.title}`;

	const content = document.createElement('div');
	content.className = 'card-content';

	const title = document.createElement('h3');
	title.textContent = project.title;

	const category = document.createElement('span');
	category.className = 'card-category';
	category.textContent = project.category;

	const description = document.createElement('p');
	description.textContent = project.description;

	const year = document.createElement('span');
	year.className = 'card-year';
	year.textContent = project.year;

	content.append(category, title, description, year);

	if (project.link) {
		const link = document.createElement('a');
		link.href = project.link;
		link.textContent = 'Voir le projet';
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		content.append(link);
	}

	article.append(image, content);
	return article;
}

// Filtre les projets puis les repartit dans les deux conteneurs de cartes.
function renderProjects(projects, filter) {
	const mainContainer = document.querySelector('.card-container');
	const smallContainer = document.querySelector('.card-container-small');

	if (!mainContainer || !smallContainer) {
		return;
	}

	let filteredProjects = projects;

	if (filter === 'video') {
		filteredProjects = projects.filter((project) =>
			project.category.toLowerCase().includes('vidéo')
		);
	}

	if (filter === 'design') {
		filteredProjects = projects.filter((project) =>
			project.category.toLowerCase().includes('graphisme')
		);
	}

	mainContainer.replaceChildren();
	smallContainer.replaceChildren();

	filteredProjects.forEach((project, index) => {
		const card = createProjectCard(project);
		const container = index < 3 ? mainContainer : smallContainer;
		container.append(card);
	});

	animerCartes();
}

// Charge les projets et active les boutons de filtrage.
async function displayProjects() {
	const mainContainer = document.querySelector('.card-container');
	const filterButtons = document.querySelectorAll('.filtre');

	if (!mainContainer) {
		return;
	}

	try {
		const projects = await loadProjects();
		renderProjects(projects);

		filterButtons.forEach((button) => {
			button.addEventListener('click', () => {
				const selectedFilter = button.dataset.filtre;

				filterButtons.forEach((filterButton) => {
					const isActive = filterButton === button;
					filterButton.classList.toggle('actif', isActive);
					filterButton.setAttribute('aria-pressed', String(isActive));
				});

				renderProjects(projects, selectedFilter);
			});
		});
	} catch (error) {
		console.error(error);
		mainContainer.textContent = 'Les projets ne peuvent pas être chargés.';
	}
}

// Lance l'affichage initial des projets.
displayProjects();

// Active le plugin qui declenche les animations au defilement.
gsap.registerPlugin(ScrollTrigger);

// Anime le titre principal de la section competences.
const title = document.querySelector('#competences .skills-title');

gsap.fromTo(
  title,
  { x: 150, opacity: 0 },   // départ : décalé à droite, invisible
  {
    x: 0,                   // arrivée : position normale
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: title,
      start: 'top 90%',
      once: true
    }
  }
);

// Anime le petit texte situe au-dessus du titre competences.
const title2 = document.querySelector('#competences .skills-eyebrow');

gsap.fromTo(
  title2,
  { x: 150, opacity: 0 },   // départ : décalé à droite, invisible
  {
    x: 0,                   // arrivée : position normale
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: title2,
      start: 'top 90%',
      once: true
    }
  }
);


// Anime la grille qui contient les cartes de competences.
const listedecompetence = document.querySelector('#competences .skills-grid');

gsap.fromTo(
  listedecompetence,
  { y: 150, opacity: 0 },   // départ : décalé à droite, invisible
  {
    y: 0,                   // arrivée : position normale
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: listedecompetence,
      start: 'top 90%',
      once: true
    }
  }
);



// Anime la photo de la section a propos depuis la droite.
const walidapropos = document.querySelector('#apropos .ma-photo');

gsap.fromTo(
  walidapropos,
  { x:250, opacity: 0 },   // départ : décalé à droite, invisible
  {
    x: 0,                   // arrivée : position normale
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: walidapropos,
      start: 'top 97%',
      once: true
    }
  }
);



// Anime le texte de la section a propos depuis la gauche.
const walidaproposdescription = document.querySelector('#apropos .colonne-texte');

gsap.fromTo(
  walidaproposdescription,
  { x:-250, opacity: 0 },   // départ : décalé à droite, invisible
  {
    x: 0,                   // arrivée : position normale
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: walidaproposdescription,
      start: 'top 97%',
      once: true
    }
  }
);

gsap.registerPlugin(ScrollTrigger);

// Anime le contenu de la section contact depuis le bas.
const walidcontact = document.querySelector('#contact .contact__texte');

gsap.fromTo(
  walidcontact,
  { y:250, opacity: 0 },   // départ : décalé à droite, invisible
  {
    y: 0,                   // arrivée : position normale
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: walidcontact,
      start: 'top 97%',
      once: true
    }
  }
);







