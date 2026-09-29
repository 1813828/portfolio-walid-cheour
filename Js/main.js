const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

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

async function displayProjects() {
	const mainContainer = document.querySelector('.card-container');
	const smallContainer = document.querySelector('.card-container-small');

	if (!mainContainer || !smallContainer) {
		return;
	}

	try {
		const projects = await loadProjects();
		mainContainer.replaceChildren();
		smallContainer.replaceChildren();

		projects.forEach((project, index) => {
			const card = createProjectCard(project);
			const container = index < 3 ? mainContainer : smallContainer;
			container.append(card);
		});
	} catch (error) {
		console.error(error);
		mainContainer.textContent = 'Les projets ne peuvent pas être chargés.';
	}
}

displayProjects();
