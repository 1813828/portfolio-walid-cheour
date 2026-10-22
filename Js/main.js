// Menu hamburger : ouvre et ferme la navigation sur mobile.
function initialiserMenuMobile() {
    const bouton = document.querySelector('.menu-bouton');
    const menu = document.getElementById('menu-principal');

    if (!bouton || !menu) return;

    bouton.addEventListener('click', () => {
        const menuOuvert = menu.classList.toggle('menu-ouvert');
        bouton.setAttribute('aria-expanded', String(menuOuvert));
        bouton.querySelector('.visuellement-cache').textContent = menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu';
    });

    menu.querySelectorAll('a').forEach((lien) => {
        lien.addEventListener('click', () => {
            menu.classList.remove('menu-ouvert');
            bouton.setAttribute('aria-expanded', 'false');
            bouton.querySelector('.visuellement-cache').textContent = 'Ouvrir le menu';
        });
    });
}

initialiserMenuMobile();

// Sélectionne la vidéo du demo reel adaptée à l'orientation de l'écran.
function choisirVideoDemoReel() {
    const video = document.getElementById('demo-reel-video');
    const source = video ? video.querySelector('source') : null;

    if (!video || !source) return;

    const videoMobile = 'assets/videos/demo_reel_walid_1080x1920.mp4';
    const videoWeb = 'assets/videos/demo_reel_walid_1920x1080.mp4';
    const sourceActuelle = window.matchMedia('(max-width: 720px)').matches ? videoMobile : videoWeb;

    if (source.getAttribute('src') !== sourceActuelle) {
        source.setAttribute('src', sourceActuelle);
        video.load();
    }
}

choisirVideoDemoReel();
window.addEventListener('resize', choisirVideoDemoReel);






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
