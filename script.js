/* ═══════════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createDots(n) {
    dots = [];
    for (let i = 0; i < n; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > W) d.vx *= -1;
      if (d.y < 0 || d.y > H) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${d.alpha})`;
      ctx.fill();
    });

    // lignes entre points proches
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createDots(80); });
  resize();
  createDots(80);
  draw();
})();

/* ═══════════════════════════════════════════════
   HEADER — hide/show on scroll
═══════════════════════════════════════════════ */
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  if (cur > lastScroll && cur > 80) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = cur <= 0 ? 0 : cur;
});

/* ═══════════════════════════════════════════════
   BURGER MENU
═══════════════════════════════════════════════ */
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════════
   AOS — animate on scroll
═══════════════════════════════════════════════ */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════
   TIMELINE
═══════════════════════════════════════════════ */
function buildTimeline() {
  const track = document.getElementById('timelineTrack');
  if (!track) return;

  TIMELINE.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'tl-item';
    el.style.transitionDelay = `${i * 0.12}s`;
    el.innerHTML = `
      <div class="tl-dot" style="border-color:${item.color}; color:${item.color}">
        ${item.icon}
      </div>
      <div class="tl-year" style="color:${item.color}">${item.year}</div>
      <div class="tl-title">${item.title}</div>
      <div class="tl-sub">${item.subtitle}</div>
      <div class="tl-detail" style="border-color:${item.color}">${item.detail}</div>
    `;
    track.appendChild(el);
  });

  // Observer pour animer chaque item
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  track.querySelectorAll('.tl-item').forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════ */
const CAT_LABELS = {
  data:     'Data',
  embarque: 'Embarqué',
  arduino:  'Arduino',
  dev:      'Dev / Web'
};

const CAT_ICONS = {
  data:     '📊',
  embarque: '⚙️',
  arduino:  '🤖',
  dev:      '💻'
};

function buildProjects(filter = 'all') {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.dataset.id = p.id;

    const thumbHTML = p.img
      ? `<img src="${p.img}" alt="${p.title}" loading="lazy" />`
      : `<div class="pc-placeholder">${CAT_ICONS[p.category] || '🔧'}</div>`;

    card.innerHTML = `
      <div class="pc-thumb">
        ${thumbHTML}
        <span class="pc-year">${p.year}</span>
      </div>
      <div class="pc-body">
        <div class="pc-cat">${CAT_LABELS[p.category] || p.category}</div>
        <div class="pc-title">${p.title}</div>
        <div class="pc-sub">${p.subtitle}</div>
        <p class="pc-desc">${p.desc}</p>
        <div class="pc-tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
        </div>
        <button class="pc-btn">Voir le projet <i class="fas fa-arrow-right"></i></button>
      </div>
    `;

    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
}

// Filtres
document.querySelectorAll('.filt').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildProjects(btn.dataset.filter);
  });
});

/* ═══════════════════════════════════════════════
   MODAL
═══════════════════════════════════════════════ */
const overlay     = document.getElementById('modalOverlay');
const modalClose  = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

function openModal(p) {
  const imgHTML = p.img
    ? `<img src="${p.img}" alt="${p.title}" />`
    : `<span style="font-size:3rem">${CAT_ICONS[p.category] || '🔧'}</span>`;

  modalContent.innerHTML = `
    <div class="modal-cat">${CAT_LABELS[p.category] || p.category} · ${p.year}</div>
    <div class="modal-title">${p.title}</div>
    <div class="modal-sub">${p.subtitle}</div>
    <div class="modal-img">${imgHTML}</div>
    <div class="modal-section">
      <h4>Description</h4>
      <p>${p.desc}</p>
    </div>
    <div class="modal-section">
      <h4>Fonctionnalités</h4>
      <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>Défis &amp; solutions</h4>
      <p>${p.challenges}</p>
    </div>
    <div class="modal-section">
      <h4>Stack technique</h4>
      <div class="modal-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ═══════════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════════ */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi…';
    btn.disabled = true;

    const data = {
      name:    document.getElementById('name').value,
      email:   document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    try {
      const res = await fetch('https://formspree.io/f/xnjgadvy', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.ok) {
        formStatus.textContent = '✓ Message envoyé ! Je vous réponds rapidement.';
        formStatus.className = 'success';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      formStatus.textContent = '✗ Erreur lors de l\'envoi. Réessayez ou écrivez directement par email.';
      formStatus.className = 'error';
    }

    btn.innerHTML = 'Envoyer <i class="fas fa-arrow-right"></i>';
    btn.disabled = false;
  });
}

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      const offset = document.getElementById('header').offsetHeight;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    }
  });
});

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildTimeline();
  buildProjects();
  initAOS();
});
