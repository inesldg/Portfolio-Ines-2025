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
            name: 'Site Web Data & Charts',
            fileName: 'data-charts.js',
            description: 'Visualisation de données interactives via l\'intégration de fichiers JSON et de graphiques dynamiques.',
            takeaway: 'Maîtrise de la manipulation du DOM, requêtes asynchrones (Fetch API) et traitement de structures JSON complexe.',
            type: 'iframe',
            content: 'https://inesldg.github.io/SAE303/'
        },
        projet2: {
            name: 'Ruches Connectées',
            fileName: 'ruches-connectees.mp4',
            description: 'Plateforme web de suivi et de gestion des ruches destinée aux apiculteurs.',
            takeaway: 'Conception orientée utilisateur (UX), gestion de données métriques et structuration d\'un projet orienté métier.',
            type: 'video',
            content: 'visuels/projets/projet_ruches.mp4'
        },
        projet3: {
            name: 'Maquette Article Web',
            fileName: 'article-seo.fig',
            description: 'Conception d\'une maquette optimisée pour la sémantique HTML et le référencement naturel (SEO).',
            takeaway: 'Compréhension des enjeux SEO on-page, hiérarchisation de l\'information et respect des normes d\'accessibilité.',
            type: 'iframe',
            content: 'https://embed.figma.com/proto/dA4vOVVuLoecno1DCDHtyr/Maquette_Web_302?node-id=4-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share'
        },
        projet4: {
            name: 'Refonte UI/UX Patine',
            fileName: 'atelier-patine.fig',
            description: 'Refonte graphique et ergonomique du site e-commerce atelierpatine.fr.',
            takeaway: 'Création de composants réutilisables sous Figma, prototypage interactif et recherche utilisateur.',
            type: 'iframe',
            content: 'https://embed.figma.com/proto/EjVjeMIxIDpPYcrKjXNurP/Maquette-patine_In%C3%A8sLedig?node-id=2015-481&p=f&scaling=contain&content-scaling=fixed&page-id=0%3A1&embed-host=share'
        },
        projet5: {
            name: 'Premier Site Dynamique',
            fileName: 'index.php',
            description: 'Développement backend d\'un site dynamique avec gestion de base de données MySQL.',
            takeaway: 'Architecture MVC, requêtes SQL sécurisées (PDO), gestion des sessions et formulaires.',
            type: 'video',
            content: 'visuels/projets/website-video.mp4'
        },
        projet6: {
            name: 'Animation Blender Logo',
            fileName: 'logo-animation.blend',
            description: 'Animation 3D d\'un logo pour le branding d\'une agence de communication.',
            takeaway: 'Prise en main des keyframes Blender, rendu lumineux et intégration d\'assets 3D dans une charte graphique.',
            type: 'video',
            content: 'visuels/projets/blender-des.mov'
        },
        projet7: {
            name: 'Newsletter Nintendo',
            fileName: 'newsletter.pdf',
            description: 'Design et mise en page d\'une newsletter responsive pour l\'univers Nintendo.',
            takeaway: 'Contraintes de mise en page e-mailing, storytelling visuel et respect d\'une charte éditoriale stricte.',
            type: 'iframe',
            content: 'visuels/projets/newsletter.pdf'
        }
    };

    // Gestion des projets avec l'interface VS Code
    const folders = document.querySelectorAll('.projets_folder');
    const contentArea = document.querySelector('.projets_content');
    const tabName = document.querySelector('.projets_tab-name');

    folders.forEach(folder => {
        folder.addEventListener('click', function () {
            folders.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            const projectId = this.getAttribute('data-project');
            const project = projets[projectId];

            if (project) {
                // Mise à jour du nom de l'onglet
                tabName.textContent = project.fileName || project.name;

                // Vider la zone de contenu
                contentArea.innerHTML = '';

                // 1. Création de la carte récapitulative (Description & Ce que ça m'a apporté)
                const detailsHeader = document.createElement('div');
                detailsHeader.className = 'projets_details-header';
                detailsHeader.innerHTML = `
                <div class="projets_details-title">${project.name}</div>
                <div class="projets_details-body">
                    <p class="projets_details-desc"><strong>📌 Description :</strong> ${project.description}</p>
                    <p class="projets_details-takeaway"><strong>💡 Ce que ce projet m'a apporté :</strong> ${project.takeaway}</p>
                </div>
            `;
                contentArea.appendChild(detailsHeader);

                // 2. Zone de prévisualisation (Agrandie)
                const previewContainer = document.createElement('div');
                previewContainer.className = 'projets_preview-container';

                if (project.type === 'image') {
                    const img = document.createElement('img');
                    img.src = project.content;
                    img.alt = project.name;
                    previewContainer.appendChild(img);
                } else if (project.type === 'video') {
                    const video = document.createElement('video');
                    video.src = project.content;
                    video.controls = true;
                    video.autoplay = false;
                    previewContainer.appendChild(video);
                } else if (project.type === 'iframe') {
                    const embed = document.createElement('div');
                    embed.className = 'projets_embed';

                    const loader = document.createElement('div');
                    loader.className = 'projets_embed-loader';
                    loader.setAttribute('role', 'status');
                    loader.setAttribute('aria-live', 'polite');
                    loader.innerHTML = `
                    <div class="projets_spinner" aria-hidden="true"></div>
                    <div class="projets_loader-text">Chargement du projet…</div>
                `;

                    const iframe = document.createElement('iframe');
                    iframe.className = 'projets_embed-iframe';
                    iframe.src = project.content;
                    iframe.setAttribute('allowfullscreen', 'true');
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('loading', 'lazy');
                    iframe.title = project.name;

                    const markLoaded = () => {
                        embed.classList.add('is-loaded');
                    };

                    iframe.addEventListener('load', markLoaded, { once: true });

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

                    embed.appendChild(loader);
                    embed.appendChild(iframe);
                    previewContainer.appendChild(embed);
                }

                contentArea.appendChild(previewContainer);
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