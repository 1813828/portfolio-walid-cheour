// Le premier projet est mis en avant. Les suivants partagent la même grille.
async function displayProjects() {
    // On retrouve les zones du HTML grâce à leurs attributs id.
    const message = document.getElementById('projets-message');
    const mainContainer = document.getElementById('projets-principaux');
    const otherContainer = document.getElementById('projets-secondaires');

    // try exécute le chargement ; catch affichera un message s'il échoue.
    try {
        // Attend les données avant de commencer à créer les cartes.
        const projects = await loadProjects();
        // forEach parcourt chaque projet. index indique sa position, en commençant à 0.
        projects.forEach((project, index) => {
            const card = createProjectCard(project);
            // Le premier projet va dans la grande zone, tous les autres dans la grille.
            if (index === 0) {
                mainContainer.append(card);
            } else {
                otherContainer.append(card);
            }
        });
        // Cette écriture signifie : si le tableau est vide, afficher un message ; sinon, l'effacer.
        message.textContent = projects.length === 0 ? 'Aucun projet disponible.' : '';
    } catch (error) {
        // La console aide à comprendre l'erreur ; le visiteur voit le message dans la page.
        console.error(error);
        message.textContent = 'Impossible de charger les projets. Ouvrez le site avec Live Server ou un serveur local.';
    }

    // Anime la page après le chargement des projets, même si le JSON n'a pas pu être lu.
    initialiserAnimations();
}

// Appelle la fonction une fois le HTML prêt, grâce à defer dans index.html.
displayProjects();
