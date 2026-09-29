async function loadProjects() {
  const response = await fetch('./data/projects.json');

  if (!response.ok) {
    throw new Error('Impossible de charger les projets.');
  }

  return await response.json();
}