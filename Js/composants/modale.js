// La même fonction remplit les étapes et les réglages avec des éléments <li>.
function remplirListe(id, textes) {
    // id désigne la liste à remplir ; textes est un tableau provenant du JSON.
    const liste = document.getElementById(id);
    // Efface les anciennes lignes pour ne pas les dupliquer à chaque ouverture.
    liste.replaceChildren();
    // Crée une ligne <li> pour chaque texte, puis l'ajoute à la liste.
    textes.forEach((texte) => {
        const ligne = document.createElement('li');
        ligne.textContent = texte;
        liste.append(ligne);
    });
}

// Prépare le contenu du processus POWER pendant le chargement des projets.
// L'ouverture et la fermeture sont gérées dans le HTML, sans listener JavaScript.
function remplirModale(projet) {
    // Remplit les éléments du dialog avec les informations du JSON.
    document.getElementById('processus-titre').textContent = projet.title;
    document.getElementById('processus-categorie').textContent = projet.category + ' / ' + projet.year;
    document.getElementById('processus-description').textContent = projet.processus.description;
    document.getElementById('processus-image').src = projet.image;
    document.getElementById('processus-image').alt = 'Projet ' + projet.title;
    // projet.processus contient les étapes, les réglages et les images de la galerie.
    remplirListe('processus-etapes', projet.processus.steps);
    remplirListe('processus-parametres', projet.processus.settings);

    // Un lien vers l'image suffit pour la voir en grand, sans deuxième modale.
    const galerie = document.getElementById('processus-galerie');
    // Nettoie aussi la galerie avant de reconstruire ses liens.
    galerie.replaceChildren();
    projet.processus.gallery.forEach((photo) => {
        const lien = document.createElement('a');
        lien.href = photo.image;
        // _blank ouvre l'image dans un nouvel onglet.
        lien.target = '_blank';
        // Empêche le nouvel onglet d'accéder à la page d'origine et de recevoir son adresse comme référence.
        lien.rel = 'noopener noreferrer';
        const image = document.createElement('img');
        image.src = photo.image;
        image.alt = photo.alt;
        // Place d'abord l'image dans le lien, puis le lien dans la galerie.
        lien.append(image);
        galerie.append(lien);
    });
}
