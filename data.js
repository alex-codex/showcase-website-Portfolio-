const PROJECTS = [
  {
    id: "sonar",
    category: "arduino",
    title: "SONAR Arduino",
    subtitle: "Acquisition & Visualisation temps réel",
    img: "Images/sonar.jpg",
    tags: ["Arduino", "Python", "Matplotlib", "Capteurs US"],
    year: "2025",
    desc: "Système SONAR balayant 180° avec visualisation graphique Python en temps réel. Pipeline complet : acquisition série C++, traitement et rendu animé des distances.",
    features: ["Balayage angulaire 180° servomoteur", "Communication série Arduino ↔ Python", "Visualisation live Matplotlib", "Détection anomalies distance"],
    challenges: "Synchroniser la communication série sans latence perceptible. Résolu via buffering et protocole léger."
  },
  {
    id: "tontine-python",
    category: "data",
    title: "Modélisation Stochastique",
    subtitle: "Simulation financière Monte-Carlo",
    img: "Images/tontine.jpg",
    tags: ["Python", "NumPy", "Pandas", "Matplotlib"],
    year: "2025",
    desc: "Pipeline d'analyse stochastique d'une tontine : simulation Monte-Carlo de +10 000 scénarios, modélisation des flux financiers et restitution visuelle des risques.",
    features: ["Simulation Monte-Carlo paramétrable", "Agrégation et analyse Pandas", "Visualisations Matplotlib/Seaborn", "Export structuré des résultats"],
    challenges: "Modéliser les aspects stochastiques tout en gardant un pipeline reproductible et des résultats interprétables."
  },
  {
    id: "fpga-microonde",
    category: "embarque",
    title: "Simulateur Micro-ondes FPGA",
    subtitle: "Basys 3 · VHDL · FSM",
    img: null,
    tags: ["FPGA", "VHDL", "Basys 3", "Machine à états"],
    year: "2025",
    desc: "Conception d'un circuit numérique complet sur FPGA Basys 3 simulant un four micro-onde. Élaboration du cahier des charges, FSM, description matérielle VHDL.",
    features: ["Modélisation FSM complète", "Description matérielle VHDL", "Test sur cible réelle", "Cahier des charges élaboré"],
    challenges: "Traduire des comportements fonctionnels complexes en logique séquentielle fiable et testable sur cible."
  },
  {
    id: "hiker-stm32",
    category: "embarque",
    title: "Projet Hiker STM32",
    subtitle: "C bas niveau · Registres · FSM",
    img: null,
    tags: ["STM32", "C bas niveau", "Registres", "FSM"],
    year: "2025",
    desc: "Détection de randonneurs via microcontrôleur STM32. Programmation directe des registres, machine à états robuste pour gestion d'événements inattendus.",
    features: ["Accès direct registres matériels", "Machine à états de contrôle", "Gestion des interruptions", "Détection événements inattendus"],
    challenges: "Gérer les fausses détections physiques avec une FSM stricte et une programmation bas niveau rigoureuse."
  },
  {
    id: "robot-obstacle",
    category: "arduino",
    title: "Robot Évitement d'Obstacles",
    subtitle: "Arduino · Capteurs · Autonomie",
    img: "Images/arduino.png",
    tags: ["Arduino", "Capteurs ultrason", "Moteurs DC"],
    year: "2024",
    desc: "Robot autonome naviguant en détectant et évitant les obstacles via capteurs ultrasoniques. Algorithme adaptatif pour navigation fluide.",
    features: ["Détection obstacles temps réel", "Algorithme décision adaptatif", "Contrôle précis des moteurs", "Navigation autonome"],
    challenges: "Optimiser les seuils capteurs pour une navigation fluide dans des environnements variés."
  },
  {
    id: "bataille-navale",
    category: "dev",
    title: "Bataille Navale Console",
    subtitle: "Langage C · Algorithmes",
    img: "Images/bataille_reelle.webp",
    tags: ["C", "Algorithmes", "Matrices"],
    year: "2024",
    desc: "Jeu de bataille navale en console, 3 niveaux de difficulté, placement manuel ou automatique, système de tir et détection touché/coulé.",
    features: ["3 niveaux de difficulté", "Placement manuel/automatique", "Système touché/coulé", "Tour par tour"],
    challenges: "Gestion des coordonnées et conditions de victoire via matrices et fonctions modulaires."
  },
  {
    id: "tontine-c",
    category: "dev",
    title: "Gestion de Tontine",
    subtitle: "Langage C · Structures de données",
    img: "Images/argent.jpg",
    tags: ["C", "Algorithmes", "Gestion données"],
    year: "2024",
    desc: "Programme C gérant les interactions entre membres d'une tontine : cotisations, distributions, historique des transactions.",
    features: ["Gestion profils membres", "Suivi des paiements", "Planification distributions", "Historique transactions"],
    challenges: "Robustesse face aux entrées inattendues et intégrité des données sur toute la durée de vie du programme."
  },
  {
    id: "portfolio",
    category: "dev",
    title: "Mon Portfolio",
    subtitle: "HTML · CSS · JavaScript",
    img: "Images/portfolio.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    year: "2025",
    desc: "Conception et développement du portfolio personnel : animations avancées, dark mode, filtres projets, formulaire de contact intégré.",
    features: ["Dark mode persistant", "Filtres projets animés", "Formulaire Formspree", "Responsive complet"],
    challenges: "Assurer la responsivité et les animations sur tous les appareils tout en maintenant les performances."
  }
];

const TIMELINE = [
  {
    year: "2023",
    title: "Baccalauréat Scientifique",
    subtitle: "Collège Saint-Cœur de Marie",
    detail: "Mention Bien — 15,23 / 20",
    icon: "🎓",
    color: "#64b5f6"
  },
  {
    year: "2024",
    title: "Stage — INFOGENIE TECHNOLOGIE",
    subtitle: "Yaoundé, Cameroun",
    detail: "Déploiement réseau, collecte et analyse de données de surveillance",
    icon: "💼",
    color: "#f06292"
  },
  {
    year: "2023 — 2025",
    title: "Classes Préparatoires Intégrées",
    subtitle: "Prépas Internationales, Yaoundé",
    detail: "Top 2 de la promotion · Projets Arduino, FPGA, simulations",
    icon: "⚙️",
    color: "#4db6ac"
  },
  {
    year: "Sept. 2025",
    title: "Cycle Ingénieur — 1ère année",
    subtitle: "ESEO Paris-Vélizy",
    detail: "Spécialisation Data & IA · STM32, FPGA, pipelines Python",
    icon: "🚀",
    color: "#ba68c8"
  },
  {
    year: "2026 →",
    title: "Recherche d'alternance",
    subtitle: "Data · Embarqué · Électronique",
    detail: "Disponible dès septembre 2026 · Rythme 2 sem. / 2 sem.",
    icon: "🎯",
    color: "#ffb74d"
  }
];