// 🔮 SHADERS POUR LE BLOB LIQUIDE 3D (Style Arkon)

const BLOB_VERTEX_SHADER = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vNoise;
  
  uniform float time;
  uniform float uNoiseSpeed;
  uniform float uNoiseStrength;
  uniform vec2 uMouse;

  // Ashima Arts 3D Simplex Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - D.yyy;

    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // Calcul du bruit 3D basé sur la position et le temps
    vec3 noisePos = position * 0.08 + vec3(0.0, 0.0, time * uNoiseSpeed);
    float noiseVal = snoise(noisePos);
    vNoise = noiseVal;
    
    // Influence du curseur de la souris (déformation locale)
    float mouseDist = distance(position.xy, uMouse * 14.0);
    float mouseInfluence = smoothstep(16.0, 0.0, mouseDist) * 0.45;
    
    // Déplacement le long de la normale
    float displacement = noiseVal * (uNoiseStrength + mouseInfluence);
    vec3 newPosition = position + normal * displacement;
    
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const BLOB_FRAGMENT_SHADER = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vNoise;
  
  uniform float time;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vPosition);
    
    // Effet Fresnel (surbrillance sur les bords)
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0);
    
    // Mélange dynamique des couleurs iridescentes selon le bruit et le temps
    float mixFactor = vNoise * 0.5 + 0.5;
    vec3 baseColor = mix(uColor1, uColor2, mixFactor);
    
    // Lueur iridescente multicolore (dégradé rose / violet / turquoise) sur les bords
    vec3 colorPink = vec3(0.95, 0.15, 0.75);
    vec3 colorGreen = vec3(0.1, 0.95, 0.75);
    vec3 rimColor = mix(colorPink, colorGreen, sin(time * 0.8) * 0.5 + 0.5);
    
    vec3 finalColor = mix(baseColor, rimColor, fresnel * 0.85);
    
    // Reflet spéculaire net et brillant (style verre glacé d'Arkon)
    vec3 lightDir = normalize(vec3(1.0, 1.2, 1.5));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 45.0);
    finalColor += vec3(0.95, 0.98, 1.0) * spec * 0.9;
    
    // Douce lumière interne blanche (centre du verre)
    float centerGlow = 1.0 - fresnel;
    finalColor += vec3(1.0, 1.0, 1.0) * pow(centerGlow, 8.0) * 0.2;
    
    // Transparence : style verre liquide ou bulle de savon
    float alpha = 0.45 + fresnel * 0.45;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function createLiquidBlob(scene) {
  // 🎨 Créer le shader de blob personnalisé avec bruit Simplex 3D
  const blobShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      uNoiseSpeed: { value: 0.35 },
      uNoiseStrength: { value: 1.1 },
      uColor1: { value: new THREE.Color(0xb5179e) }, // Rose/magenta iridescent
      uColor2: { value: new THREE.Color(0x4cc9f0) }, // Bleu/cyan pastel
      uMouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: BLOB_VERTEX_SHADER,
    fragmentShader: BLOB_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  // 🔘 Géométrie à haute densité de polygones pour une déformation fluide
  const sphereGeometry = new THREE.IcosahedronGeometry(15, 64);
  const liquidBlob = new THREE.Mesh(sphereGeometry, blobShaderMaterial);
  
  liquidBlob.position.set(0, 0, 0);
  liquidBlob.scale.set(0.7, 0.7, 0.7);
  
  scene.add(liquidBlob);

  return {
    sphere: liquidBlob,
    material: blobShaderMaterial,
    update: function(timeValue, mouseVector) {
      blobShaderMaterial.uniforms.time.value = timeValue;
      if (mouseVector && mouseVector.x !== -9999) {
        // Interpolation douce vers la position de la souris
        blobShaderMaterial.uniforms.uMouse.value.lerp(mouseVector, 0.08);
      }
    }
  };
}
