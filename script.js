/* ═══════════════════════════════════════════════
   MOTEUR SPATIAL IMMERSIF ET INJECTION DE DONNÉES
═══════════════════════════════════════════════ */

// 1. INJECTION ROBUSTE DES DONNÉES (Polling system corrigé)
function injectPortfolioData() {
  try {
    // On vérifie directement l'existence des constantes globales
    if (typeof PROJECTS === 'undefined' || typeof TIMELINE === 'undefined') {
      setTimeout(injectPortfolioData, 100);
      return;
    }

    genererConstellationParcours(TIMELINE);
    genererCartesProjets(PROJECTS);

  } catch (error) {
    // Si la variable n'existe pas encore, une erreur est levée. On boucle.
    setTimeout(injectPortfolioData, 100);
  }
}

// Lancement immédiat
injectPortfolioData();

function genererConstellationParcours(timeline) {
    const container = document.querySelector('.custom-timeline');
    if (!container) return;

    // Nettoyage
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.minHeight = '1000px'; // ✅ AUGMENTÉ pour plus de place

    // 1️⃣ Créer le SVG pour les lignes de connexion
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'timeline-svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    container.appendChild(svg);

    // 2️⃣ Positions des nœuds EN ZIGZAG (en %)
    const positions = timeline.map((item, index) => {
        // Zigzag horizontal : alterne gauche (20%) et droite (80%)
        const isLeft = index % 2 === 0;
        const y = isLeft ? 25 : 50;
        
        // Zigzag horizontal
        const x = 10 + (index * (100 / Math.max(timeline.length - 1, 1)));
        
        return { x, y };
    });

    // 3️⃣ Tracer les lignes de connexion
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'timeline-gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'rgba(0, 102, 255, 0.4)');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'rgba(0, 102, 255, 0.1)');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Tracer les lignes reliant les points
    for (let i = 0; i < positions.length - 1; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', `${positions[i].x}%`);
        line.setAttribute('y1', `${positions[i].y}%`);
        line.setAttribute('x2', `${positions[i + 1].x}%`);
        line.setAttribute('y2', `${positions[i + 1].y}%`);
        line.setAttribute('stroke', 'url(#timeline-gradient)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.7');
        svg.appendChild(line);
    }

    // 4️⃣ Créer les nœuds (stars)
    timeline.forEach((item, index) => {
        const node = document.createElement('div');
        node.className = 'star-node';
        node.style.left = `${positions[index].x}%`;
        node.style.top = `${positions[index].y}%`;
        
        // Glow
        const glow = document.createElement('div');
        glow.className = 'star-glow';
        glow.style.background = item.color;
        
        // 📌 Aperçu permanent
        const preview = document.createElement('div');
        preview.className = 'star-preview';
        preview.innerHTML = `
            <div style="color: ${item.color}; font-weight: 700; font-size: 0.85rem; margin-bottom: 4px;">${item.year}</div>
            <div style="font-size: 0.75rem;">${item.title}</div>
        `;
        
        // Contenu détaillé (survol/clic)
        const content = document.createElement('div');
        content.className = 'star-content';
        content.innerHTML = `
            <span class="year">${item.year}</span>
            <h4>${item.title}</h4>
            <p style="font-size: 0.85rem; margin: 8px 0 0 0;">${item.subtitle}</p>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 6px 0 0 0;">${item.detail}</p>
        `;
        
        // ✅ Interactivité : clic ET survol
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            node.classList.toggle('active');
        });
        
        node.addEventListener('mouseenter', () => {
            node.classList.add('hover');
        });
        
        node.addEventListener('mouseleave', () => {
            node.classList.remove('hover');
        });
        
        node.appendChild(glow);
        node.appendChild(preview);
        node.appendChild(content);
        container.appendChild(node);
    });
}

/* ═══════════════════════════════════════════════
   MODAL PARCHEMIN POUR LES PROJETS
═══════════════════════════════════════════════ */
function openScrollModal(category, categoryLabel, categoryIcon, categoryProjects) {
  // Créer le modal s'il n'existe pas
  let modal = document.getElementById('scroll-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'scroll-modal';
    modal.className = 'scroll-modal';
    document.body.appendChild(modal);
  }

  // Remplir le contenu du modal
  const categoryIcons = {
    'arduino': '🤖',
    'data': '📊',
    'embarque': '🛰️',
    'dev': '💻'
  };

  const contentHTML = `
    <div class="scroll-modal-content">
      <button class="scroll-modal-close"><i class="fas fa-times"></i></button>
      <div class="scroll-modal-header">
        <h2>${categoryIcon} ${categoryLabel}</h2>
        <p class="scroll-modal-count">${categoryProjects.length} projet${categoryProjects.length > 1 ? 's' : ''}</p>
      </div>
      <div class="scroll-modal-projects">
        ${categoryProjects.map(p => `
          <div class="scroll-modal-project-item">
            <div class="scroll-project-header">
              <div class="scroll-project-icon">${categoryIcons[p.category] || '📁'}</div>
              <div class="scroll-project-meta">
                <h4>${p.title}</h4>
                <p class="scroll-project-subtitle">${p.subtitle}</p>
              </div>
              <span class="scroll-project-year">${p.year}</span>
            </div>
            <p class="scroll-project-desc">${p.desc}</p>
            <div class="scroll-project-tags">
              ${p.tags.map(tag => `<span class="scroll-project-tag">${tag}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.innerHTML = contentHTML;
  modal.classList.add('active');

  // Event listener pour fermer le modal
  modal.querySelector('.scroll-modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
    }, 600);
  });

  // Fermer en cliquant en dehors
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
      }, 600);
    }
  });
}

/* ═══════════════════════════════════════════════
   GÉNÉRATION DES PROJETS : CARROUSELS PAR CATÉGORIE
═══════════════════════════════════════════════ */
function genererCartesProjets(projects) {
  const container = document.querySelector('#projects-carousel-grid');
  if (!container) return;

  // Grouper les projets par catégorie
  const categories = {};
  projects.forEach(p => {
    if (!categories[p.category]) {
      categories[p.category] = [];
    }
    categories[p.category].push(p);
  });

  // Icônes et labels par catégorie
  const categoryIcons = {
    'arduino': '🤖',
    'data': '📊',
    'embarque': '🛰️',
    'dev': '💻'
  };

  const categoryLabels = {
    'arduino': 'Arduino & Capteurs',
    'data': 'Data & IA',
    'embarque': 'Systèmes Embarqués',
    'dev': 'Développement'
  };

  // Ordre des catégories
  const categoryOrder = ['arduino', 'data', 'embarque', 'dev'];

  // Générer un carrousel pour chaque catégorie (dans l'ordre)
  categoryOrder.forEach(category => {
    if (!categories[category] || categories[category].length === 0) return;

    const categoryProjects = categories[category];
    const section = document.createElement('div');
    section.className = 'carousel-category-section';
    section.innerHTML = `
      <div class="carousel-category-title">
        ${categoryIcons[category] || '📁'} ${categoryLabels[category] || category}
      </div>
    `;

    // Conteneur du carrousel
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'category-carousel-container';
    
    const carousel = document.createElement('div');
    carousel.className = 'category-carousel-3d';
    carousel.dataset.category = category;

    // Rayon basé sur le nombre de projets
    const radius = Math.max(250, categoryProjects.length * 70);
    const angleStep = 360 / categoryProjects.length;

    // Créer les cartes mini (aperçu léger mais stylisé)
    categoryProjects.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'carousel-mini-card';
      card.dataset.category = category;
      card.dataset.projectId = p.id;
      
      const icon = categoryIcons[p.category] || '📁';
      card.innerHTML = `
        <div class="mini-card-icon">${icon}</div>
        <div class="mini-card-title">${p.title}</div>
      `;

      // Transformation 3D circulaire
      const angle = index * angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`;
      
      // 🎯 Ajouter interactivité : clic pour ouvrir le modal parchemin
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        openScrollModal(category, categoryLabels[category], categoryIcons[category], categoryProjects);
      });
      
      carousel.appendChild(card);
    });

    carouselContainer.appendChild(carousel);
    section.appendChild(carouselContainer);

    // ❌ BOUTON SUPPRIMÉ - Les utilisateurs cliquent directement sur les cartes pour ouvrir le modal
    
    container.appendChild(section);
  });
}

function showCategoryDetails(category, projects, label, icon) {
  // Mettre à jour le titre de la catégorie
  document.getElementById('category-title').textContent = `${icon} ${label}`;
  
  // Générer la liste des projets en détail
  const projectsList = document.getElementById('category-projects-list');
  projectsList.innerHTML = '';

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'category-project-card';

    const tagsHTML = (p.tags || []).map(t => 
      `<span class="category-project-tag">${t}</span>`
    ).join('');

    const categoryIcons = {
      'arduino': '🤖',
      'data': '📊',
      'embarque': '🛰️',
      'dev': '💻'
    };

    card.innerHTML = `
      <div class="category-project-header">
        <div class="category-project-icon">${categoryIcons[p.category] || '📁'}</div>
        <span class="category-project-year">${p.year}</span>
      </div>
      <h3 class="category-project-title">${p.title}</h3>
      <p class="category-project-subtitle">${p.subtitle}</p>
      <p class="category-project-desc">${p.desc}</p>
      <div class="category-project-tags">
        ${tagsHTML}
      </div>
    `;

    projectsList.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════
   2. MOTEUR 3D THREE.JS (SPHÈRE GÉANTE)
═══════════════════════════════════════════════ */
(function initThreeJS() {
  if (typeof THREE === 'undefined') {
    console.warn("Three.js n'est pas chargé. Vérifie le lien CDN dans ton HTML.");
    return;
  }

  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  let currentView = 'home'; 
  
  // SPHÈRE GÉANTE : Paramètres
  const radius = 20.0; 
  let targetCameraZ = 38; 
  let targetCameraY = 0;
  let targetCameraX = 0;

  camera.position.z = 38; 

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const particleCount = 45000; 
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const u = Math.random();
    const v = Math.random();
    const theta = u * Math.PI * 2;
    const phi = Math.acos(2 * v - 1);

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3+2] = radius * Math.cos(phi);

    originalPositions[i3] = positions[i3];
    originalPositions[i3+1] = positions[i3+1];
    originalPositions[i3+2] = positions[i3+2];
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x0066FF,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSphere = new THREE.Points(geometry, material);
  scene.add(particleSphere);

  const starCount = 2000;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  for(let i=0; i<starCount*3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 200;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.3 });
  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);

  const mouse = new THREE.Vector2(-9999, -9999);
  const clock = new THREE.Clock();
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isDragging && currentView === 'home') {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      particleSphere.rotation.y += deltaX * 0.003;
      particleSphere.rotation.x += deltaY * 0.003;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousedown', () => { if(currentView === 'home') isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });

  const navItems = [
    { name: 'about', el: document.querySelector('[data-target="about"]'), pos: new THREE.Vector3(-1, 0.6, 1).normalize().multiplyScalar(radius * 1.05) },
    { name: 'timeline', el: document.querySelector('[data-target="timeline"]'), pos: new THREE.Vector3(1, 0.3, 0.8).normalize().multiplyScalar(radius * 1.05) },
    { name: 'projects', el: document.querySelector('[data-target="projects"]'), pos: new THREE.Vector3(-0.3, -0.8, 1).normalize().multiplyScalar(radius * 1.05) },
    { name: 'contact', el: document.querySelector('[data-target="contact"]'), pos: new THREE.Vector3(0.8, -0.7, 0.8).normalize().multiplyScalar(radius * 1.05) }
  ];

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (!isDragging) {
      particleSphere.rotation.y += 0.0008;
      particleSphere.rotation.x += 0.0004;
    }

    const posAttr = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let ox = originalPositions[i3];
      let oy = originalPositions[i3+1];
      let oz = originalPositions[i3+2];

      let wave = Math.sin(ox * 0.2 + time * 1.5) * 0.15;
      posAttr[i3] = ox + (ox / radius) * wave;
      posAttr[i3+1] = oy + (oy / radius) * wave;
      posAttr[i3+2] = oz + (oz / radius) * wave;
    }
    geometry.attributes.position.needsUpdate = true;

    camera.position.z += (targetCameraZ - camera.position.z) * 0.03;
    camera.position.y += (targetCameraY - camera.position.y) * 0.03;
    camera.position.x += (targetCameraX - camera.position.x) * 0.03;

    navItems.forEach(item => {
      if (!item.el) return;

      if (currentView !== 'home') {
        item.el.style.opacity = '0';
        item.el.style.pointerEvents = 'none';
        return;
      }

      let wp = item.pos.clone().applyMatrix4(particleSphere.matrixWorld);

      if (wp.z < 0) {
        item.el.style.opacity = '0.02';
        item.el.style.pointerEvents = 'none';
      } else if (wp.z < 10.0) {
        let t = wp.z / 10.0; 
        item.el.style.opacity = `${0.02 + 0.98 * t}`;
        item.el.style.pointerEvents = t > 0.4 ? 'auto' : 'none';
      } else {
        item.el.style.opacity = '1';
        item.el.style.pointerEvents = 'auto';
      }

      wp.project(camera);
      let x = (wp.x * 0.5 + 0.5) * window.innerWidth;
      let y = (-(wp.y * 0.5) + 0.5) * window.innerHeight;

      // LIMITER LA ZONE DE DÉPLACEMENT : Garder les éléments dans une zone centrale
      const minMargin = 100; // Minimum de pixels du bord (ajustable)
      const maxX = window.innerWidth - minMargin;
      const maxY = window.innerHeight - minMargin;
      
      x = Math.max(minMargin, Math.min(x, maxX));
      y = Math.max(minMargin, Math.min(y, maxY));

      item.el.style.left = `${x}px`;
      item.el.style.top = `${y}px`;
    });

    renderer.render(scene, camera);
  }

  animate();

  function switchView(viewName) {
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    currentView = viewName;

    if (viewName === 'home') {
      targetCameraX = 0;
      targetCameraY = 0;
      targetCameraZ = 38; 
      
      setTimeout(() => {
        const homeView = document.getElementById('view-home');
        if (homeView) homeView.classList.add('active');
      }, 500);
    } else {
      targetCameraX = 0;
      targetCameraY = 0;
      targetCameraZ = 0; 

      setTimeout(() => {
        const targetPanel = document.getElementById(`view-${viewName}`);
        if(targetPanel) targetPanel.classList.add('active');
      }, 900); 
    }
  }

  // Système de navigation historique
  let navigationHistory = ['home'];

  function navigateTo(viewName) {
    switchView(viewName);
    if (viewName !== 'home') {
      navigationHistory.push(viewName);
    }
  }

  function goBack() {
    if (navigationHistory.length > 1) {
      navigationHistory.pop();
      const previousView = navigationHistory[navigationHistory.length - 1];
      switchView(previousView);
    } else {
      switchView('home');
    }
  }

  navItems.forEach(item => {
    if(item.el) {
      item.el.addEventListener('click', () => navigateTo(item.name));
      item.el.addEventListener('touchstart', (e) => { e.preventDefault(); navigateTo(item.name); }, {passive: false});
    }
  });

  // Boîte permanente d'indication pour 'parcours' (timeline) en haut à gauche
  (function createPermanentTimelineBox() {
    const existing = document.getElementById('timeline-hint-box');
    if (existing) return;

    const box = document.createElement('div');
    box.id = 'timeline-hint-box';
    box.className = 'timeline-hint-box permanent';
    box.textContent = 'Cliquer pour avoir les détails';
    box.setAttribute('role', 'button');
    box.setAttribute('aria-label', 'Cliquer pour avoir les détails du parcours');
    document.body.appendChild(box);

    box.addEventListener('click', (ev) => {
      ev.stopPropagation();
      navigateTo('timeline');
    });
  })();

  // Back buttons : navigation intelligente
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => goBack());
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();