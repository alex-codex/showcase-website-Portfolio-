// ⚙️ PARCOURS — LISTE VERTICALE MINIMALISTE
function genererConstellationParcours(timeline) {
  const container = document.querySelector('.custom-timeline');
  if (!container) return;

  container.innerHTML = '';

  timeline.forEach(item => {
    const row = document.createElement('div');
    row.className = 'timeline-row';
    row.style.setProperty('--dot-color', item.color || 'var(--accent)');

    row.innerHTML = `
      <div class="timeline-icon">${item.icon || '•'}</div>
      <div class="timeline-body">
        <span class="timeline-year">${item.year}</span>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-subtitle">${item.subtitle}</div>
        <div class="timeline-detail">${item.detail}</div>
      </div>
    `;

    container.appendChild(row);
  });
}

// Injection au chargement (attend que data.js ait défini TIMELINE)
function initTimeline() {
  if (typeof TIMELINE === 'undefined') {
    setTimeout(initTimeline, 50);
    return;
  }
  genererConstellationParcours(TIMELINE);
}

initTimeline();