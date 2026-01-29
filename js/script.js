// Faire fonctionner les particles.js
document.addEventListener('DOMContentLoaded', function () {
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'json/particlesjs-config.json', function () {
            console.log('Particles.js chargé avec succès !');
        });
    } else {
        console.error('Particles.js n\'est pas chargé :(');
    }

    // Effet "typing" sur le mot "développeuse" dans la page d'accueil

    const typingElement = document.querySelector('.hero_title-orchidee');
    if (typingElement) {
        const text = typingElement.textContent; // Récupère le texte actuel
        typingElement.textContent = ''; // Vide le contenu

        let index = 0;
        const typingSpeed = 100; // Vitesse en millisecondes entre chaque lettre

        function typeText() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            }
        }

        // Démarrer l'effet après un court délai pour un meilleur effet visuel
        setTimeout(typeText, 600);
    }

    // Gestion des projets avce l'interface VsCode

    // Configuration des projets (vous pouvez modifier ces chemins)
    const projets = {
        projet1: {
            name: 'Site Web intégrant des données Json et des graphiques dynamiques',
            type: 'iframe', // 'image', 'video', 'iframe' (pour un site)
            content: 'https://inesldg.github.io/SAE303/' // Chemin vers votre image/vidéo/site
        },
        projet2: {
            name: 'Site Web de gestion de ruches pour les apiculteurs',
            type: 'video',
            content: 'visuels/projets/projet_ruches.mp4'
        },
        projet3: {
            name: 'Maquette article pour le web référencement (SEO, sémantique)',
            type: 'iframe',
            content: 'https://embed.figma.com/proto/dA4vOVVuLoecno1DCDHtyr/Maquette_Web_302?node-id=4-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share'
        },
        projet4: {
            name: 'Maquette Design Figma UI/UX (refonte du site atelierpatine.fr)',
            type: 'iframe',
            content: 'https://embed.figma.com/proto/EjVjeMIxIDpPYcrKjXNurP/Maquette-patine_In%C3%A8sLedig?node-id=2015-481&p=f&scaling=contain&content-scaling=fixed&page-id=0%3A1&embed-host=share'
        },
        projet5: {
            name: 'Premier site dynamique avec PHP/MySQL et BDD',
            type: 'video',
            content: 'visuels/projets/website-video.mp4'
        },
        projet6: {
            name: 'Animation Blender pour un logo (agence de communication)',
            type: 'video',
            content: 'visuels/projets/blender-des.mov'
        },
        projet7: {
            name: 'Design pour une Newsletter Nintendo (cours de communication numérique)',
            type: 'iframe',
            content: 'visuels/projets/newsletter.pdf'
        }
    };

    // Gestion des clics sur les dossiers
    const folders = document.querySelectorAll('.projets_folder');
    const contentArea = document.querySelector('.projets_content');
    const tabName = document.querySelector('.projets_tab-name');

    folders.forEach(folder => {
        folder.addEventListener('click', function () {
            // Retirer la classe active de tous les dossiers
            folders.forEach(f => f.classList.remove('active'));
            // Ajouter la classe active au dossier cliqué
            this.classList.add('active');

            // Récupérer l'ID du projet
            const projectId = this.getAttribute('data-project');
            const project = projets[projectId];

            if (project) {
                // Mettre à jour le nom de l'onglet
                tabName.textContent = project.name;

                // Vider le contenu
                contentArea.innerHTML = '';

                // Créer le contenu selon le type
                if (project.type === 'image') {
                    const img = document.createElement('img');
                    img.src = project.content;
                    img.alt = project.name;
                    contentArea.appendChild(img);
                } else if (project.type === 'video') {
                    const video = document.createElement('video');
                    video.src = project.content;
                    video.controls = true;
                    video.autoplay = false;
                    contentArea.appendChild(video);
                } else if (project.type === 'iframe') {
                    const embed = document.createElement('div');
                    embed.className = 'projets_embed';

                    const loader = document.createElement('div');
                    loader.className = 'projets_embed-loader';
                    loader.setAttribute('role', 'status');
                    loader.setAttribute('aria-live', 'polite');
                    loader.innerHTML = `
                        <div class="projets_spinner" aria-hidden="true"></div>
                        <div class="projets_loader-text">Chargement…</div>
                    `;

                    const iframe = document.createElement('iframe');
                    iframe.className = 'projets_embed-iframe';
                    iframe.src = project.content;
                    iframe.setAttribute('allowfullscreen', 'true');
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('loading', 'lazy');
                    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
                    iframe.title = project.name;

                    const markLoaded = () => {
                        embed.classList.add('is-loaded');
                    };

                    // Masquer le loader quand l'iframe est prête
                    iframe.addEventListener('load', markLoaded, { once: true });

                    // Fallback: si l'iframe met trop de temps, on masque quand même (évite un loader infini)
                    window.setTimeout(() => {
                        if (!embed.classList.contains('is-loaded')) {
                            embed.classList.add('is-slow');
                        }
                    }, 3500);
                    window.setTimeout(() => {
                        if (!embed.classList.contains('is-loaded')) {
                            markLoaded();
                        }
                    }, 12000);

                    // Pour Figma, on peut ajouter des paramètres spécifiques
                    if (project.content.includes('figma.com')) {
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                        iframe.style.minHeight = '600px';
                    }

                    embed.appendChild(loader);
                    embed.appendChild(iframe);
                    contentArea.appendChild(embed);
                }
            }
        });
    });

    // Bouton pour retourner en haut du site

    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        // Afficher/masquer le bouton selon le scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Smooth scroll vers le haut au clic
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Menu burger
    const burgerBtn = document.querySelector('.nav_burger');
    const navMenu = document.querySelector('.nav_menu');
    const navLinks = document.querySelectorAll('.nav_link');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', function () {
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});