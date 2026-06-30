// 🤖 LOGIQUE DES PROJETS ET DES MODALS PAR CATÉGORIE

const CATEGORY_ICONS = {
  'arduino': '🤖',
  'data': '📊',
  'embarque': '🛰️',
  'dev': '💻'
};

const CATEGORY_LABELS = {
  'arduino': 'Arduino & Capteurs',
  'data': 'Data & IA',
  'embarque': 'Systèmes Embarqués',
  'dev': 'Développement'
};

// Ouvrir la fenêtre modale en style parchemin
function openScrollModal(category, categoryLabel, categoryIcon, categoryProjects) {
  let modal = document.getElementById('scroll-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'scroll-modal';
    modal.className = 'scroll-modal';
    document.body.appendChild(modal);
  }

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
              <div class="scroll-project-icon">${CATEGORY_ICONS[p.category] || '📁'}</div>
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

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 600);
  };

  modal.querySelector('.scroll-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Générer les cartes projets par catégorie dans la vue Projets
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

  const categoryOrder = ['arduino', 'data', 'embarque', 'dev'];

  // Générer un carrousel pour chaque catégorie
  categoryOrder.forEach(category => {
    if (!categories[category] || categories[category].length === 0) return;

    const categoryProjects = categories[category];
    const section = document.createElement('div');
    section.className = 'carousel-category-section';

    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'category-carousel-container';
    
    const carousel = document.createElement('div');
    carousel.className = 'category-carousel-3d';
    carousel.dataset.category = category;

    // Rayon de rotation basé sur le nombre de projets
    const radius = Math.max(250, categoryProjects.length * 70);
    const angleStep = 360 / categoryProjects.length;

    categoryProjects.forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'carousel-mini-card';
      card.dataset.category = category;
      card.dataset.projectId = p.id;
      
      const icon = CATEGORY_ICONS[p.category] || '📁';
      card.innerHTML = `
        <div class="mini-card-icon">${icon}</div>
        <div class="mini-card-title">${p.title}</div>
      `;

      const angle = index * angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateX(-50%) translateY(-50%)`;
      
      // Ouvrir le modal au clic
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        openScrollModal(category, CATEGORY_LABELS[category], CATEGORY_ICONS[category], categoryProjects);
      });
      
      carousel.appendChild(card);
    });

    carouselContainer.appendChild(carousel);
    section.appendChild(carouselContainer);
    container.appendChild(section);
  });
}

// Afficher les détails d'une catégorie dans la vue dédiée
function showCategoryDetails(category, projects, label, icon) {
  document.getElementById('category-title').textContent = `${icon} ${label}`;
  
  const projectsList = document.getElementById('category-projects-list');
  if (!projectsList) return;
  projectsList.innerHTML = '';

  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'category-project-card';

    const tagsHTML = (p.tags || []).map(t => 
      `<span class="category-project-tag">${t}</span>`
    ).join('');

    card.innerHTML = `
      <div class="category-project-header">
        <div class="category-project-icon">${CATEGORY_ICONS[p.category] || '📁'}</div>
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
