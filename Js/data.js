// Lit les données. Le JSON reste le seul fichier à modifier pour les projets.
async function loadProjects() {
    // async permet d'utiliser await pour attendre la réponse du serveur.
    const response = await fetch('./data/projects.json');
    // fetch ne signale pas automatiquement les erreurs HTTP, comme un fichier absent (404).
    if (!response.ok) {
        throw new Error('Le fichier des projets est introuvable.');
    }
    // Convertit le contenu JSON en un tableau de projets utilisable en JavaScript.
    return response.json();
}
