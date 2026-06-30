// ⚙️ CONSTELLATION DU PARCOURS (TIMELINE SVG)
function genererConstellationParcours(timeline) {
  const container = document.querySelector('.custom-timeline');
  if (!container) return;

  // Nettoyage
  container.innerHTML = '';
  container.style.position = 'relative';
  container.style.minHeight = '1000px';

  // 1️⃣ Créer le SVG pour les lignes de connexion
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'timeline-svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  container.appendChild(svg);

  // 2️⃣ Positions des nœuds EN ZIGZAG (en %)
  const positions = timeline.map((item, index) => {
    // Alterne les positions verticales pour créer un chemin
    const isLeft = index % 2 === 0;
    const y = isLeft ? 25 : 50;
    const x = 10 + (index * (100 / Math.max(timeline.length - 1, 1)));
    return { x, y };
  });

  // 3️⃣ Tracer les lignes de connexion avec dégradé
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

  // 4️⃣ Créer les nœuds (étoiles interactives)
  timeline.forEach((item, index) => {
    const node = document.createElement('div');
    node.className = 'star-node';
    node.style.left = `${positions[index].x}%`;
    node.style.top = `${positions[index].y}%`;
    
    const glow = document.createElement('div');
    glow.className = 'star-glow';
    glow.style.background = item.color;
    
    // Aperçu permanent au-dessus du nœud
    const preview = document.createElement('div');
    preview.className = 'star-preview';
    preview.innerHTML = `
      <div style="color: ${item.color}; font-weight: 700; font-size: 0.85rem; margin-bottom: 4px;">${item.year}</div>
      <div style="font-size: 0.75rem;">${item.title}</div>
    `;
    
    // Contenu détaillé (clic/survol)
    const content = document.createElement('div');
    content.className = 'star-content';
    content.innerHTML = `
      <span class="year">${item.year}</span>
      <h4>${item.title}</h4>
      <p style="font-size: 0.85rem; margin: 8px 0 0 0;">${item.subtitle}</p>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin: 6px 0 0 0;">${item.detail}</p>
    `;
    
    // Interactivité : clic tactile et survol souris
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
