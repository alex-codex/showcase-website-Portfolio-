// 3D PORTFOLIO ENTRY POINT & ENGINE (Style Arkon)

(function initThreeJS() {
  if (typeof THREE === 'undefined') {
    console.warn("Three.js n'est pas chargé. Vérifie le lien CDN dans ton HTML.");
    return;
  }

  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Configuration Constants
  const PARTICLE_COUNT = 45000;
  const STAR_COUNT = 2000;
  const RADIUS = 20.0;
  const DEFAULT_CAMERA_Z = 38;
  const SMALL_CAMERA_Z = 44;
  const MOBILE_CAMERA_Z = 54;
  const EXTRA_MOBILE_CAMERA_Z = 60;
  
  const DEFAULT_BLOB_SCALE = 0.7;
  const SMALL_BLOB_SCALE = 0.62;
  const MOBILE_BLOB_SCALE = 0.42;
  const EXTRA_BLOB_SCALE = 0.34;

  const DEFAULT_SPHERE_SCALE = 1;
  const SMALL_SPHERE_SCALE = 0.82;
  const MOBILE_SPHERE_SCALE = 0.64;
  const EXTRA_SPHERE_SCALE = 0.54;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  let currentView = 'home'; 
  let targetCameraZ = DEFAULT_CAMERA_Z; 
  let targetCameraY = 0;
  let targetCameraX = 0;

  // Target values for Blob Morphing Transitions
  let targetBlobX = 0;
  let targetBlobY = 0;
  let targetBlobZ = 0;
  let targetBlobScale = DEFAULT_BLOB_SCALE;
  let targetNoiseSpeed = 0.35;
  let targetNoiseStrength = 1.1;
  let targetSphereScale = DEFAULT_SPHERE_SCALE;

  camera.position.z = targetCameraZ; 

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  // Particle Sphere (définie dans js/particles.js)
  const particleSphere = createParticleSphere(scene, PARTICLE_COUNT, RADIUS);

  // Background Starfield (définie dans js/particles.js)
  const starField = createStarField(scene, STAR_COUNT);

  // Instantiate 3D Liquid Blob (defined in js/blob.js)
  const blobObject = createLiquidBlob(scene);

  function updateBlobTargets(viewName) {
    const width = window.innerWidth;
    let baseScale = DEFAULT_BLOB_SCALE;
    if (width <= 420) baseScale = EXTRA_BLOB_SCALE;
    else if (width <= 520) baseScale = MOBILE_BLOB_SCALE;
    else if (width <= 760) baseScale = SMALL_BLOB_SCALE;

    if (viewName === 'home') {
      targetBlobX = 0; targetBlobY = 0; targetBlobZ = 0;
      targetBlobScale = baseScale;
      targetNoiseSpeed = 0.35; targetNoiseStrength = 1.1;
    } else if (viewName === 'about') {
      if (width > 960) {
        targetBlobX = 11; targetBlobY = 0; targetBlobZ = 0;
        targetBlobScale = 0.65;
      } else {
        targetBlobX = 0; targetBlobY = 0; targetBlobZ = -12;
        targetBlobScale = 0.45;
      }
      targetNoiseSpeed = 0.15; targetNoiseStrength = 0.7;
    } else if (viewName === 'timeline') {
      targetBlobX = 0; targetBlobY = 0; targetBlobZ = -15;
      targetBlobScale = 0.45;
      targetNoiseSpeed = 0.1; targetNoiseStrength = 0.5;
    } else if (viewName === 'projects') {
      targetBlobX = 0; targetBlobY = 0; targetBlobZ = -18;
      targetBlobScale = 0.4;
      targetNoiseSpeed = 0.08; targetNoiseStrength = 0.4;
    } else if (viewName === 'contact') {
      if (width > 960) {
        targetBlobX = -11; targetBlobY = 0; targetBlobZ = 0;
        targetBlobScale = 0.65;
      } else {
        targetBlobX = 0; targetBlobY = 0; targetBlobZ = -12;
        targetBlobScale = 0.45;
      }
      targetNoiseSpeed = 0.22; targetNoiseStrength = 0.95;
    }
  }

  function updateResponsive3D() {
    const width = window.innerWidth;
    if (width <= 420) {
      targetCameraZ = EXTRA_MOBILE_CAMERA_Z; targetCameraY = 0.18; targetSphereScale = EXTRA_SPHERE_SCALE;
    } else if (width <= 520) {
      targetCameraZ = MOBILE_CAMERA_Z; targetCameraY = 0.1; targetSphereScale = MOBILE_SPHERE_SCALE;
    } else if (width <= 760) {
      targetCameraZ = SMALL_CAMERA_Z; targetCameraY = 0.05; targetSphereScale = SMALL_SPHERE_SCALE;
    } else {
      targetCameraZ = DEFAULT_CAMERA_Z; targetCameraY = 0; targetSphereScale = DEFAULT_SPHERE_SCALE;
    }
    if (currentView) updateBlobTargets(currentView);
  }

  updateResponsive3D();

  const mouse = new THREE.Vector2(-9999, -9999);
  const clock = new THREE.Clock();
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  const onMouseMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    if (isDragging && currentView === 'home') {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      particleSphere.mesh.rotation.y += deltaX * 0.003;
      particleSphere.mesh.rotation.x += deltaY * 0.003;
    }
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') onMouseMove(e);
  });
  window.addEventListener('pointerdown', (e) => {
    if (currentView === 'home' && e.pointerType === 'touch' && !e.target.closest('.sphere-nav-item')) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  });
  window.addEventListener('pointerup', () => { isDragging = false; });
  window.addEventListener('pointercancel', () => { isDragging = false; });

  const navItems = [
    { name: 'about', el: document.querySelector('[data-target="about"]'), pos: new THREE.Vector3(-1, 0.6, 1).normalize().multiplyScalar(RADIUS * 1.05) },
    { name: 'timeline', el: document.querySelector('[data-target="timeline"]'), pos: new THREE.Vector3(1, 0.3, 0.8).normalize().multiplyScalar(RADIUS * 1.05) },
    { name: 'projects', el: document.querySelector('[data-target="projects"]'), pos: new THREE.Vector3(-0.3, -0.8, 1).normalize().multiplyScalar(RADIUS * 1.05) },
    { name: 'contact', el: document.querySelector('[data-target="contact"]'), pos: new THREE.Vector3(0.8, -0.7, 0.8).normalize().multiplyScalar(RADIUS * 1.05) }
  ];

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (!isDragging) {
      // Vitesse de rotation ralentie pour faciliter le clic sur les boutons (Style Arkon)
      particleSphere.mesh.rotation.y += 0.00020;
      particleSphere.mesh.rotation.x += 0.00010;
    }

    particleSphere.update(time);

    const currentSphereScale = particleSphere.mesh.scale.x;
    const nextSphereScale = currentSphereScale + (targetSphereScale - currentSphereScale) * 0.05;
    particleSphere.mesh.scale.set(nextSphereScale, nextSphereScale, nextSphereScale);

    camera.position.z += (targetCameraZ - camera.position.z) * 0.03;
    camera.position.y += (targetCameraY - camera.position.y) * 0.03;
    camera.position.x += (targetCameraX - camera.position.x) * 0.03;

    navItems.forEach(item => {
      if (!item.el) return;
      // Position fixe dans l'espace 3D (n'hérite plus de la rotation continue de la
      // sphère : les nodules ne doivent pas "tourner" autour d'elle, seulement
      // suivre sa taille via l'échelle courante, et flotter légèrement via CSS).
      let wp = item.pos.clone().multiplyScalar(particleSphere.mesh.scale.x);
      // Rendre les éléments toujours visibles et cliquables (opacité min 0.35 pour l'effet de profondeur 3D)
      if (wp.z < 0) {
        item.el.style.opacity = '0.35'; 
        item.el.style.pointerEvents = 'auto';
      } else if (wp.z < 10.0) {
        let t = wp.z / 10.0; 
        item.el.style.opacity = `${0.35 + 0.65 * t}`;
        item.el.style.pointerEvents = 'auto';
      } else {
        item.el.style.opacity = '1'; 
        item.el.style.pointerEvents = 'auto';
      }

      wp.project(camera);
      let x = (wp.x * 0.5 + 0.5) * window.innerWidth;
      let y = (-(wp.y * 0.5) + 0.5) * window.innerHeight;

      const minMargin = window.innerWidth <= 520 ? 40 : 100;
      const minMarginY = window.innerWidth <= 520 ? 36 : 100;
      x = Math.max(minMargin, Math.min(x, window.innerWidth - minMargin));
      y = Math.max(minMarginY, Math.min(y, window.innerHeight - minMarginY));

      item.el.style.left = `${x}px`;
      item.el.style.top = `${y}px`;
    });

    if (blobObject && blobObject.sphere) {
      blobObject.sphere.position.x += (targetBlobX - blobObject.sphere.position.x) * 0.05;
      blobObject.sphere.position.y += (targetBlobY - blobObject.sphere.position.y) * 0.05;
      blobObject.sphere.position.z += (targetBlobZ - blobObject.sphere.position.z) * 0.05;
      
      const currentScale = blobObject.sphere.scale.x;
      const nextScale = currentScale + (targetBlobScale - currentScale) * 0.05;
      blobObject.sphere.scale.set(nextScale, nextScale, nextScale);
      
      blobObject.material.uniforms.uNoiseSpeed.value += (targetNoiseSpeed - blobObject.material.uniforms.uNoiseSpeed.value) * 0.05;
      blobObject.material.uniforms.uNoiseStrength.value += (targetNoiseStrength - blobObject.material.uniforms.uNoiseStrength.value) * 0.05;
      
      blobObject.update(time, mouse);
    }

    renderer.render(scene, camera);
  }

  animate();


  function switchView(viewName) {
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
    currentView = viewName;
    updateBlobTargets(viewName);
    updateResponsive3D();

    setTimeout(() => {
      const targetPanel = document.getElementById(viewName === 'home' ? 'view-home' : `view-${viewName}`);
      if (targetPanel) targetPanel.classList.add('active');
    }, 400);
  }

  let navigationHistory = ['home'];

  function navigateTo(viewName) {
    switchView(viewName);
    if (viewName !== 'home') navigationHistory.push(viewName);
  }

  function goBack() {
    if (navigationHistory.length > 1) {
      navigationHistory.pop();
      switchView(navigationHistory[navigationHistory.length - 1]);
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

  document.querySelectorAll('.home-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.target));
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); navigateTo(btn.dataset.target); }, {passive: false});
  });

  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => goBack());
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (currentView === 'home') updateResponsive3D();
  });

})();