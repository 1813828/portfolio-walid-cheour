// Affiche les logiciels indiqués dans projects.json sous forme de badges.
function afficherLogiciels(logiciels, conteneur) {
    if (!logiciels || logiciels.length === 0) {
        conteneur.closest('.carte-logiciels').remove();
        return;
    }

    logiciels.forEach((logiciel) => {
        const badge = document.createElement('span');
        badge.className = 'carte-logiciel';
        badge.textContent = logiciel;
        conteneur.append(badge);
    });
}

// Affiche les techniques indiquées dans projects.json sous forme de badges.
function afficherTechniques(techniques, conteneur) {
    if (!techniques || techniques.length === 0) {
        conteneur.closest('.carte-techniques').remove();
        return;
    }

    techniques.forEach((technique) => {
        const badge = document.createElement('span');
        badge.className = 'carte-logiciel';
        badge.textContent = technique;
        conteneur.append(badge);
    });
}

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
    afficherLogiciels(project.logiciels, card.querySelector('.carte-logiciels-liste'));
    afficherTechniques(project.techniques, card.querySelector('.carte-techniques-liste'));
    card.querySelector('.carte-description').textContent = project.description;

    // Ouvre la vidéo ou le processus lorsque la carte est cliquée.
    const carte = card.querySelector('.carte-projet');
    if (project.link || project.processus) {
        carte.classList.add('carte-projet-cliquable');
        carte.addEventListener('click', (evenement) => {
            if (evenement.target.closest('a, button')) return;
            if (project.processus) {
                document.getElementById('modale-processus').showModal();
            } else {
                window.open(project.link, '_blank', 'noopener,noreferrer');
            }
        });
    }

    if (project.processus) {
        // POWER possède le processus : on prépare son contenu dès la création de sa carte.
        remplirModale(project);
    }
    // Retourne la copie remplie ; main.js l'ajoutera au bon endroit avec append().
    return card;
}
