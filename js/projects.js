// 🤖 PROJETS — GRILLE MINIMALISTE PAR CATÉGORIE

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

// Générer les cartes projets groupées par catégorie dans la vue Projets
function genererCartesProjets(projects) {
  const container = document.querySelector('#projects-carousel-grid');
  if (!container) return;

  container.innerHTML = '';

  const categories = {};
  projects.forEach(p => {
    if (!categories[p.category]) categories[p.category] = [];
    categories[p.category].push(p);
  });

  const categoryOrder = ['arduino', 'data', 'embarque', 'dev'];

  categoryOrder.forEach(category => {
    const categoryProjects = categories[category];
    if (!categoryProjects || categoryProjects.length === 0) return;

    const block = document.createElement('div');
    block.className = 'project-category-block';

    const title = document.createElement('div');
    title.className = 'project-category-title';
    title.innerHTML = `${CATEGORY_ICONS[category] || '📁'} ${CATEGORY_LABELS[category] || category} <span class="project-category-count">— ${categoryProjects.length} projet${categoryProjects.length > 1 ? 's' : ''}</span>`;
    block.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'project-category-grid';

    categoryProjects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'category-project-card';

      const tagsHTML = (p.tags || []).map(t => `<span class="category-project-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="category-project-header">
          <div class="category-project-icon">${CATEGORY_ICONS[p.category] || '📁'}</div>
          <span class="category-project-year">${p.year}</span>
        </div>
        <h3 class="category-project-title">${p.title}</h3>
        <p class="category-project-subtitle">${p.subtitle}</p>
        <p class="category-project-desc">${p.desc}</p>
        <div class="category-project-tags">${tagsHTML}</div>
      `;

      grid.appendChild(card);
    });

    block.appendChild(grid);
    container.appendChild(block);
  });
}

// Injection au chargement (attend que data.js ait défini PROJECTS)
function initProjects() {
  if (typeof PROJECTS === 'undefined') {
    setTimeout(initProjects, 50);
    return;
  }
  genererCartesProjets(PROJECTS);
}

initProjects();