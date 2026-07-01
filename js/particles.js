// 🌌 LOGIQUE DU CHAMP D'ÉTOILES ET DE LA SPHÈRE DE PARTICULES

function createParticleSphere(scene, particleCount, radius) {
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

  return {
    mesh: particleSphere,
    update: function(time) {
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
    }
  };
}

function createStarField(scene, starCount) {
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  for(let i=0; i<starCount*3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 200;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.3 });
  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);
  return starField;
}
