// Copie le modèle HTML, puis remplit les informations du projet.
function createProjectCard(project) {
    const template = document.getElementById('modele-carte-projet');
    // content contient le HTML du template. true copie aussi tous les éléments à l'intérieur.
    const card = template.content.cloneNode(true);

    // querySelector cherche une classe dans cette copie, pas dans toutes les cartes de la page.
    // src définit le fichier de l'image ; alt fournit un texte alternatif.
    card.querySelector('.carte-image').src = project.image;
    card.querySelector('.carte-image').alt = 'Projet ' + project.title;
    // textContent insère du texte, sans le traiter comme du code HTML.
    card.querySelector('.carte-titre').textContent = project.title;
    card.querySelector('.carte-categorie').textContent = project.category;
    card.querySelector('.carte-annee').textContent = project.year;
    card.querySelector('.carte-description').textContent = project.description;

    // Chaque carte affiche seulement les actions disponibles dans le JSON.
    const link = card.querySelector('.carte-lien');
    if (project.link) {
        // href indique la page externe à ouvrir quand on clique sur le lien.
        link.href = project.link;
    } else {
        // Retire le lien du modèle si ce projet n'a pas d'adresse externe.
        link.remove();
    }

    const button = card.querySelector('.carte-bouton');
    if (project.processus) {
        // POWER possède le processus : on prépare son contenu dès la création de sa carte.
        // Le bouton l'ouvrira ensuite avec ses attributs HTML commandfor et command.
        remplirModale(project);
    } else {
        button.remove();
    }
    // Retourne la copie remplie ; main.js l'ajoutera au bon endroit avec append().
    return card;
}
