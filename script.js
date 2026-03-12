document.addEventListener("DOMContentLoaded", () => {
  // mes differents  projets
  const projectData = [
    {
      id: "Robot-d'Évitement-d'Obstacles", 
      category: "arduino",
      title: "Robot d'Évitement d'Obstacles",
      desc: "Développement d'un robot autonome basé sur Arduino, capable de naviguer dans un environnement en détectant et évitant les obstacles grâce à des capteurs ultrasoniques. Ce projet m'a permis d'approfondir mes connaissances en robotique embarquée et en programmation microcontrôleur.",
      img: "Images/arduino.png",
      tags: ["Arduino", "Capteurs ultrason", "Moteurs DC"],
      features: [
        "Détection d'obstacles en temps réel.",
        "Algorithme de décision pour l'évitement (virage à gauche/droite).",
        "Contrôle précis des moteurs.",
      ],
      challenges:
        "Le principal défi a été d'optimiser l'algorithme d'évitement pour une navigation fluide et efficace dans des environnements variés. J'ai résolu ce problème en ajustant les seuils de distance des capteurs et en implémentant une logique de virage plus adaptative.",
    },
    {
      id: "sonar",
      category: "arduino",
      title: "SONAR (Arduino & Python)",
      desc: "Conception et programmation d'un système SONAR capable de balayer un angle de 180° pour cartographier son environnement proche. Les données collectées par l'Arduino sont ensuite transmises et visualisées en temps réel via une interface développée en Python, offrant une représentation graphique des distances.",
      img: "Images/vue_d'ensemble.jpg",
      tags: ["Arduino", "Python", "Capteurs ultrason", "Communication série", "Matplotlib"],
      features: [
        "Balayage angulaire de 180° avec un servomoteur.",
        "Acquisition de données de distance via ultrasons.",
        "Visualisation graphique en temps réel des obstacles et distances en Python.",
        "Communication fluide entre Arduino et Python via port"
      ],
      challenges:
        "La synchronisation de la communication entre l'Arduino et le script Python pour une visualisation en temps réel sans latence a été le défi majeur. J'ai mis en place un protocole de communication simple et des tampons pour assurer une transmission de données stable et rapide.",
    },
    {
      id: "magasin",
      category: "c",
      title: "Logiciel de Gestion de Magasin",
      desc: "Développement d'un logiciel de gestion pour un magasin, en utilisant le langage C. Ce programme permet de gérer les stocks de produits, d'enregistrer les ventes, de suivre les informations clients et de générer des rapports. Il est conçu pour être robuste et efficace, facilitant les opérations quotidiennes d'un petit commerce.",
      img: "https://placeholder.pics/svg/300x200/DEDEDE/555555/Logiciel%20Gestion",
      tags: ["Langage C", "Gestion de fichiers", "Structures de données", "Algorithmes de recherche/tri"],
      features: [
        "Ajout, modification et suppression de produits.",
        "Gestion des ventes et calcul automatique des totaux.",
        "Base de données clients avec fonctions de recherche.",
        "Génération de rapports de stock et de ventes.",
        "Interface en console intuitive.",
      ],
      challenges:
        "Un des défis était de concevoir une structure de données efficace pour stocker les informations et de gérer la persistance des données sur disque. J'ai utilisé des fichiers plats et une organisation logique pour assurer l'intégrité et l'accès rapide aux informations.",
    },
    {
      id: "probabilite",
      category: "python",
      title: "Analyse Stochastique d'une Tontine",
      desc: "Projet Python axé sur l'analyse et la simulation stochastique du fonctionnement d'une tontine. Ce programme modélise les flux financiers, les contributions et les distributions, permettant d'étudier la viabilité et les risques associés à ce type de système financier participatif. Des outils d'analyse de données et de visualisation sont utilisés pour présenter les résultats.",
      img: "Images/graph1.png",
      tags: ["Python","Matplotlib", "Statistiques"],
      features: [
        "Modélisation des contributions et distributions de la tontine.",
        "Simulation de scénarios aléatoires (retards de paiement, abandons).",
        "Calcul des indicateurs financiers (solde, gains, pertes).",
        "Visualisation des résultats via des graphiques (évolution du fonds).",
      ],
      challenges:
        "La modélisation des aspects stochastiques et l'intégration de différents scénarios imprévus ont été complexes. Et ce problème n'a malheureusement pas été résolu.",
    },
    {
      id: "site",
      category: "web",
      title: "Mon portfolio",
      desc: "Conception et développement d'un site web responsive pour présenter mon parcours,ma personne et mes ambitions. Le site est construit avec HTML, CSS et JavaScript",
      img: "Images/portfolio.png",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
      features: [
        "A propos de moi",
        "Mes projets.",
        "Navigation intuitive et animations CSS.",
        "Compatibilité mobile et tablette.",
      ],
      challenges:
        "Assurer la responsivité du design sur une multitude d'appareils tout en maintenant une esthétique attrayante a demandé un travail minutieux.",
    },
    {
      id: "tontine",
      category: "c",
      title: "Programme de Gestion d'une Tontine",
      desc: "Développement en langage C d'un programme permettant de gérer les interactions entre les membres d'une tontine. Ce programme gère l'ajout et la suppression de membres, l'enregistrement des cotisations, et la planification des attributions de fonds, garantissant la bonne marche et la transparence de la tontine.",
      img: "https://placeholder.pics/svg/300x200/DEDEDE/555555/IA%20Jeu",
      tags: ["Langage C", "Gestion de données", "Structures de données", "Algorithmes de planification"],
      features: [
        "Création et gestion de profils membres.",
        "Enregistrement des contributions et suivi des paiements.",
        "Planification et exécution des distributions de fonds.",
        "Calcul des soldes et historique des transactions.",
        "Validation des entrées utilisateur pour éviter les erreurs.",
      ],
      challenges:
        "La gestion des erreurs et la robustesse du programme face aux entrées utilisateur inattendues ont été un point crucial. J'ai implémenté de nombreuses vérifications et messages d'erreur pour guider l'utilisateur et maintenir l'intégrité des données.",
    },
    {
      id: "jeu",
      category: "c",
      title: "Jeu de Bataille Navale en Console",
      desc: "Création d'une version en console du célèbre jeu de bataille navale, implémentée en langage C. Le jeu propose trois niveaux de 'mer' (tailles de plateau différentes) et intègre des logiques de placement de bateaux, de tirs, et de détection de coups. Ce projet a renforcé mes compétences en logique algorithmique et en gestion d'interactions utilisateur en console.",
      img: "Images/navale.png",
      tags: ["Langage C", "Algorithmes de jeu", "Matrices", "Gestion d'entrées/sorties console"],
      features: [
        "Trois niveaux de difficulté (tailles de grille différentes).",
        "Placement manuel ou automatique des bateaux.",
        "Système de tir et de détection 'touché/coulé'.",
        "Gestion du tour par tour.",
        "Affichage clair du plateau de jeu et des tirs.",
      ],
      challenges:
        "La gestion des coordonnées du plateau et la vérification des conditions de victoire ont présenté des défis algorithmiques. J'ai utilisé des matrices pour représenter les plateaux et des fonctions modulaires pour les différentes phases du jeu, rendant le code plus gérable et lisible.",
    },
    {
      id: "hiker-stm32",
      category: "embarque",
      title: "Projet Hiker (Carte STM32)",
      desc: "Programmation bas niveau sur microcontrôleur STM32 pour détecter le passage de randonneurs devant un capteur. Implémentation d'une machine à états robuste pour gérer les situations inattendues (ex: chute d'arbre) et mise à jour dynamique de la distance de considération.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/STM32%20Hiker",
      tags: ["C", "STM32", "Registres", "Machine à états", "Bas Niveau"],
      features: [
        "Détection de passage via capteurs",
        "Manipulation directe des registres matériels",
        "Gestion des interruptions et situations inattendues",
      ],
      challenges: "Le défi principal a été de gérer la complexité de l'environnement physique (fausses détections, obstacles) grâce à une machine à états stricte et une programmation bas niveau rigoureuse."
    },
    {
      id: "elec-analogique",
      category: "electronique",
      title: "Simulation Détection de Proximité (US)",
      desc: "Conception et simulation d'une fonction de détection de proximité utilisant un capteur à ultrasons. Le projet inclut la conversion de la largeur d'impulsion pour un affichage dynamique et visuel sur un bargraph à LED.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/Elec%20Analogique",
      tags: ["Électronique Analogique", "Simulation", "Capteurs US", "Bargraph LED"],
      features: [
        "Simulation de signal de capteur à ultrasons",
        "Conversion largeur d'impulsion",
        "Interfaçage avec un bargraph LED",
      ],
      challenges: "Calibrer précisément le circuit analogique pour que la conversion de l'impulsion reflète fidèlement la distance physique sur l'affichage LED."
    },
    {
      id: "fpga-microonde",
      category: "embarque",
      title: "Simulateur Micro-ondes sur FPGA",
      desc: "Conception d'un circuit numérique complexe sur carte FPGA Basys 3 pour simuler le comportement d'un four à micro-ondes. Le projet a nécessité une description matérielle minutieuse et la création d'un graphe d'états.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/FPGA%20Basys3",
      tags: ["FPGA", "Basys 3", "Description Matérielle", "Circuit Numérique"],
      features: [
        "Description matérielle (VHDL/Verilog)",
        "Élaboration de graphe et machine à états",
        "Programmation et test sur cible réelle",
      ],
      challenges: "Traduire des comportements fonctionnels complexes en logique séquentielle et combinatoire fiable."
    },
    {
      id: "elec-puissance",
      category: "electronique",
      title: "Design de Fonction Alimentation",
      desc: "Études approfondies et livrables sur la conception de systèmes d'alimentation dans le cadre du cours de génie électrique. Implémentation et analyse des performances sur MATLAB.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/Elec%20Puissance",
      tags: ["Électronique de Puissance", "MATLAB", "Génie Électrique", "Alimentation"],
      features: [
        "Design de circuits d'alimentation",
        "Simulation de composants de puissance",
        "Analyse de rendement et de stabilité",
      ],
      challenges: "Modéliser fidèlement les pertes thermiques et électriques dans l'environnement MATLAB pour obtenir des simulations proches du réel."
    },
    {
      id: "arch-si",
      category: "informatique",
      title: "Conception d'un Ordinateur (Logisim)",
      desc: "Compréhension de l'architecture d'un système d'information par la conception complète d'un ordinateur au plus bas niveau en utilisant l'outil Logisim, accompagnée d'exercices de programmation en langage Assembleur.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/Logisim",
      tags: ["Logisim", "Assembleur", "Architecture Ordinateur", "Portes Logiques"],
      features: [
        "Création de composants (ALU, Registres, Mémoire)",
        "Conception du chemin de données",
        "Programmation d'instructions en Assembleur",
      ],
      challenges: "Connecter et synchroniser parfaitement tous les bus de données et signaux de contrôle d'horloge pour que le processeur exécute le code correctement."
    },
    {
      id: "traitement-signal",
      category: "matlab",
      title: "Traitement Numérique de l'Image",
      desc: "Projet MATLAB axé sur le traitement numérique du signal appliqué à l'image. Compréhension approfondie des pixels à travers des opérations mathématiques complexes.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/Matlab%20Image",
      tags: ["MATLAB", "Traitement d'Image", "Segmentation", "Filtres Mathématiques"],
      features: [
        "Opérations de segmentation d'image",
        "Application de produits de convolution",
        "Calculs de gradient et traitement Laplacien",
      ],
      challenges: "Optimiser les matrices de calcul sur MATLAB pour appliquer des filtres lourds (Laplacien) sans temps de latence excessif."
    },
    {
      id: "bdd-serveur",
      category: "informatique",
      title: "Déploiement Serveur et Base de Données",
      desc: "Mise en place d'une infrastructure back-end solide incluant le déploiement d'un serveur sous Apache et la gestion complète d'une base de données relationnelle via SQL.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/SQL%20Apache",
      tags: ["SQL", "Apache", "Backend", "Base de Données Relationnelle"],
      features: [
        "Modélisation conceptuelle et logique (MCD/MLD)",
        "Création de requêtes SQL complexes",
        "Configuration et déploiement de serveur web",
      ],
      challenges: "Assurer la sécurité des accès à la base de données et la bonne configuration d'Apache pour le routage des requêtes."
    },
    {
      id: "poo-academique",
      category: "informatique",
      title: "Programmation Orientée Objet",
      desc: "Projet académique permettant de valider les compétences en modélisation et développement objet. Création de classes, gestion de l'héritage et du polymorphisme pour résoudre un problème algorithmique.",
      img: "https://placeholder.pics/svg/600x400/DEDEDE/555555/POO",
      tags: ["POO", "Java/C++", "UML", "Architecture Logicielle"],
      features: [
        "Modélisation UML des classes",
        "Implémentation des piliers de la POO (Encapsulation, Héritage...)",
        "Gestion optimisée de la mémoire",
      ],
      challenges: "Concevoir une architecture évolutive sans créer un couplage trop fort entre les différentes classes de l'application."
    },
  ]

  // Navigation menu toggle
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-links li")

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("active")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        // Correction de la syntaxe de l'animation pour utiliser les template literals
        link.style.animation =  `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s `
      }
    })

    // Burger Animation
    burger.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = nav.contains(event.target)
    const isClickOnBurger = burger.contains(event.target)

    if (nav.classList.contains("active") && !isClickInsideNav && !isClickOnBurger) {
      nav.classList.remove("active")
      burger.classList.remove("active")

      // Supprime les animations des liens lors de la fermeture
      navLinks.forEach((link) => {
        link.style.animation = ""
      })
    }
  })

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active")
        burger.classList.remove("active")

        // Supprime les animations des liens lors de la fermeture
        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }
    })
  })

  // Project Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "scale(1)"
          }, 10)
        } else {
          card.style.opacity = "0"
          card.style.transform = "scale(0.8)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  
  
  // Gestion des Modales de Projets

  // Cibler la seule modale HTML et ses éléments internes
  const projectModal = document.getElementById("projectModal"); // Assurez-vous que votre modale HTML a bien cet ID
  const modalBody = projectModal.querySelector(".modal-body");
  const closeModalBtn = projectModal.querySelector(".close-modal");
  const projectDetailsBtns = document.querySelectorAll(".project-details-btn");

  projectDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Bouton 'Voir détails' cliqué", btn);
      const projectId = btn.getAttribute("data-project-id");
      console.log("ID du projet:", projectId);
      const project = projectData.find((p) => p.id === projectId);
      if (!project) {
      console.warn("Projet non trouvé pour l'ID:", projectId);
      modalBody.innerHTML = `<p style='color:red;'>Projet non trouvé pour l'ID: ${projectId}</p>`;
      projectModal.style.display = "block";
      return;
      }
      console.log("Projet trouvé:", project);
      modalBody.innerHTML = `
      <div class="modal-header">
        <h2>${project.title}</h2>
      </div>
      <div class="modal-img">
        <img src="${project.img}" alt="${project.title}">
      </div>
      <div class="modal-desc">
        <h3>Description</h3>
        <p>${project.desc}</p>
        <h3>Technologies utilisées</h3>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <h3>Fonctionnalités</h3>
        <div class="project-tags">
          ${project.features.map(feature => `<p class="feature-item">${feature}</p>`).join('')}
        </div>
        <h3>Défis et solutions</h3>
        <div class="project-tags">
          <p>${project.challenges}</p>
        </div>
      </div>
      `;
      projectModal.style.display = "block";
      document.body.style.overflow = "hidden";
      console.log("Modal affichée.");
    });
  });

  // Gérer la fermeture de la modale par le bouton "x"
  closeModalBtn.addEventListener("click", () => {
    projectModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Gérer la fermeture de la modale en cliquant à l'extérieur
  window.addEventListener("click", (event) => {
    if (event.target === projectModal) { // Si le clic est directement sur l'arrière-plan de la modale
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  
  
  // Formulaire de Contact

  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    // Simple validation
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
      formStatus.textContent = "Veuillez remplir tous les champs."
      formStatus.className = "error"
      return
    }

    // Envoi réel du formulaire via Formspree (remplacez par votre endpoint Formspree)
    fetch('https://formspree.io/f/xnjgadvy', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          formStatus.textContent = "Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais."
          formStatus.className = "success"
          contactForm.reset()
        } else {
          formStatus.textContent = "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
          formStatus.className = "error"
        }
      })
      .catch(() => {
        formStatus.textContent = "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
        formStatus.className = "error"
      })
  })

  
  
  // Animations et Comportements Généraux

  // Scroll animation for sections
  const sections = document.querySelectorAll("section")

  function checkSections() {
    const triggerBottom = window.innerHeight * 0.8

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top

      if (sectionTop < triggerBottom) {
        section.classList.add("show")
      }
    })
  }

  // Initial check
  checkSections()

  // Check on scroll
  window.addEventListener("scroll", checkSections)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Ajuste la position de défilement pour tenir compte de la hauteur du header fixe
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const isDarkMode = document.body.classList.contains("dark-mode")

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)"
    }

    // Update scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop

    // Add shadow when scrolled and apply appropriate background color based on theme
    if (scrollTop > 50) {
      header.style.boxShadow = isDarkMode ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)"
      header.style.background = isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"
    } else {
      // Si on est tout en haut, pas d'ombre et couleur de fond par défaut (qui devrait être gérée par le CSS ou par le mode sombre)
      header.style.boxShadow = "none"
      // Réapplique la couleur de fond basée sur le mode sombre même si scrollTop n'est pas > 50
      header.style.background = isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"
    }
  })

  // Mode sombre toggle
  const darkModeToggle = document.getElementById("darkmode-toggle")

  // Vérifier si le mode sombre est déjà activé dans le localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode")
    darkModeToggle.checked = true
  }

  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("darkMode", "enabled")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("darkMode", "disabled")
    }
    updateHeaderStyle() // Mettre à jour le style du header après le changement de thème
  })
})

// Ajouter également cette fonction pour mettre à jour le header lorsque le mode sombre est activé/désactivé
function updateHeaderStyle() {
  const isDarkMode = document.body.classList.contains("dark-mode")
  const header = document.querySelector("header")
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 50) {
    header.style.boxShadow = isDarkMode ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "none"; // Pas d'ombre si tout en haut
  }
  // Toujours appliquer la couleur de fond correcte en fonction du mode sombre
  header.style.background = isDarkMode ? "rgba(30, 30, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"
}

// Appeler updateHeaderStyle au chargement de la page pour assurer la cohérence
document.addEventListener("DOMContentLoaded", () => {
  updateHeaderStyle()
  // Le reste du code DOMContentLoaded existant...
})