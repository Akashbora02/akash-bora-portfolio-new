/**
 * 3D Cloud-Native & AI Neural Topology Visualization Engine
 * Powered by Three.js for Akash Bora Portfolio
 */

(function () {
  'use strict';

  let scene, camera, renderer;
  let centralCore, coreWireframe, innerCore;
  let orbitGroup, particles, particleGeo, particleMat;
  let orbitalRings = [];
  let satelliteNodes = [];
  let canvas, container;
  let isRendering = true;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let currentMode = 'neural'; // 'neural', 'cloud', 'k8s'

  const THEMES = {
    neural: {
      coreColor: 0x00E5FF,
      innerColor: 0x6366F1,
      ringColor: 0x8B5CF6,
      particleColor: 0x00E5FF,
      speed: 1.0,
      label: 'AI Neural Core'
    },
    cloud: {
      coreColor: 0xFF9900,
      innerColor: 0x00E5FF,
      ringColor: 0x38BDF8,
      particleColor: 0xFFB84D,
      speed: 0.8,
      label: 'Global Multi-Cloud'
    },
    k8s: {
      coreColor: 0x326CE5,
      innerColor: 0x10B981,
      ringColor: 0x00E5FF,
      particleColor: 0x34D399,
      speed: 1.2,
      label: 'Kubernetes Mesh'
    }
  };

  function init() {
    canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, falling back to 2D canvas.');
      return;
    }

    container = canvas.parentElement || document.body;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    // 2. WebGL Renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed:', e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Central 3D AI Neural Core
    centralCore = new THREE.Group();

    // Outer Geodesic Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    coreWireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeo),
      new THREE.LineBasicMaterial({
        color: THEMES.neural.coreColor,
        transparent: true,
        opacity: 0.65,
        linewidth: 1.5
      })
    );
    centralCore.add(coreWireframe);

    // Inner Pulsing Core
    const innerGeo = new THREE.SphereGeometry(2.4, 16, 16);
    innerCore = new THREE.Mesh(
      innerGeo,
      new THREE.MeshBasicMaterial({
        color: THEMES.neural.innerColor,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
    );
    centralCore.add(innerCore);

    // Core Center Glowing Point
    const pointLightGeo = new THREE.SphereGeometry(0.8, 12, 12);
    const pointLightMesh = new THREE.Mesh(
      pointLightGeo,
      new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.85
      })
    );
    centralCore.add(pointLightMesh);

    scene.add(centralCore);

    // 4. Multi-Region Orbital Rings & Satellite Nodes
    orbitGroup = new THREE.Group();

    const ringConfigs = [
      { radius: 6.8, tube: 0.035, rotX: Math.PI / 3, rotY: Math.PI / 6, speed: 0.008, color: 0x00E5FF, region: 'AWS us-east-1' },
      { radius: 9.0, tube: 0.030, rotX: -Math.PI / 4, rotY: Math.PI / 4, speed: -0.006, color: 0x8B5CF6, region: 'AWS eu-west-1' },
      { radius: 11.2, tube: 0.025, rotX: Math.PI / 2.2, rotY: -Math.PI / 8, speed: 0.005, color: 0x38BDF8, region: 'AWS ap-south-1' }
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.45
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = cfg.rotX;
      ring.rotation.y = cfg.rotY;
      ring.userData = { speed: cfg.speed };
      orbitGroup.add(ring);
      orbitalRings.push(ring);

      // Satellite Node attached to this orbit
      const satGeo = new THREE.SphereGeometry(0.42, 12, 12);
      const satMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.95
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.userData = {
        orbitRadius: cfg.radius,
        angle: Math.random() * Math.PI * 2,
        speed: cfg.speed * 2,
        ringRotX: cfg.rotX,
        ringRotY: cfg.rotY,
        regionName: cfg.region
      };
      orbitGroup.add(sat);
      satelliteNodes.push(sat);
    });

    scene.add(orbitGroup);

    // 5. 3D Particle Constellation Dust
    const particleCount = window.innerWidth < 768 ? 160 : 380;
    particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 45;
      scales[i / 3] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    particleMat = new THREE.PointsMaterial({
      color: THEMES.neural.particleColor,
      size: 0.18,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Listeners
    setupInteractions();

    // 7. Visibility Observer (Pause when off-screen to save battery)
    setupVisibilityObserver();

    // 8. Start Animation Loop
    animate(0);
  }

  function setupInteractions() {
    window.addEventListener('resize', onWindowResize, { passive: true });

    // Pointer move parallax
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX - window.innerWidth / 2) * 0.0018;
      targetY = (e.clientY - window.innerHeight / 2) * 0.0018;
    }, { passive: true });

    // Touch move parallax
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        targetX = (e.touches[0].clientX - window.innerWidth / 2) * 0.0015;
        targetY = (e.touches[0].clientY - window.innerHeight / 2) * 0.0015;
      }
    }, { passive: true });

    // Mouse drag to rotate 3D cluster directly
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      centralCore.rotation.y += deltaX * 0.008;
      centralCore.rotation.x += deltaY * 0.008;
      orbitGroup.rotation.y += deltaX * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch drag support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      centralCore.rotation.y += deltaX * 0.008;
      centralCore.rotation.x += deltaY * 0.008;
      orbitGroup.rotation.y += deltaX * 0.005;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    // Setup 3D Mode Selector Buttons
    document.querySelectorAll('.btn-3d-mode').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const mode = btn.getAttribute('data-mode');
        if (mode && THEMES[mode]) {
          switchTheme(mode);
          document.querySelectorAll('.btn-3d-mode').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });
  }

  function switchTheme(mode) {
    if (!THEMES[mode]) return;
    currentMode = mode;
    const theme = THEMES[mode];

    // Transition Colors
    if (coreWireframe) coreWireframe.material.color.setHex(theme.coreColor);
    if (innerCore) innerCore.material.color.setHex(theme.innerColor);
    if (particleMat) particleMat.color.setHex(theme.particleColor);

    orbitalRings.forEach((r, idx) => {
      r.material.color.setHex(idx === 0 ? theme.coreColor : (idx === 1 ? theme.innerColor : theme.ringColor));
    });
    satelliteNodes.forEach((s, idx) => {
      s.material.color.setHex(idx === 0 ? theme.coreColor : (idx === 1 ? theme.innerColor : theme.ringColor));
    });

    // Pulse notification toast or tag if HUD exists
    const hudBadge = document.getElementById('threejs-hud-status');
    if (hudBadge) {
      hudBadge.textContent = theme.label;
      hudBadge.style.borderColor = `#${theme.coreColor.toString(16).padStart(6, '0')}`;
    }
  }

  function setupVisibilityObserver() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isRendering = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    observer.observe(heroSection);
  }

  function onWindowResize() {
    if (!canvas || !renderer || !camera) return;
    const width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate(time) {
    requestAnimationFrame(animate);

    if (!isRendering) return;

    const theme = THEMES[currentMode];
    const speed = theme ? theme.speed : 1.0;

    // Smooth camera mouse follow (Parallax)
    mouseX += (targetX - mouseX) * 0.04;
    mouseY += (targetY - mouseY) * 0.04;
    camera.position.x = mouseX * 8;
    camera.position.y = -mouseY * 6;
    camera.lookAt(scene.position);

    // 1. Rotate Central Core
    if (centralCore) {
      centralCore.rotation.y += 0.006 * speed;
      centralCore.rotation.x += 0.003 * speed;

      // Inner Core Pulse (Breathing effect)
      if (innerCore) {
        const pulse = 1 + Math.sin(time * 0.003 * speed) * 0.12;
        innerCore.scale.set(pulse, pulse, pulse);
        innerCore.rotation.y -= 0.008 * speed;
      }
    }

    // 2. Rotate Orbital Rings
    orbitalRings.forEach((ring) => {
      ring.rotation.z += ring.userData.speed * speed;
    });

    // 3. Update Satellite Nodes on 3D Orbits
    satelliteNodes.forEach((sat) => {
      sat.userData.angle += sat.userData.speed * speed;
      const angle = sat.userData.angle;
      const r = sat.userData.orbitRadius;

      // Calculate 3D circular position on tilted plane
      const lx = Math.cos(angle) * r;
      const ly = Math.sin(angle) * r;
      const rotX = sat.userData.ringRotX;
      const rotY = sat.userData.ringRotY;

      sat.position.x = lx * Math.cos(rotY) - ly * Math.sin(rotY) * Math.sin(rotX);
      sat.position.y = ly * Math.cos(rotX);
      sat.position.z = lx * Math.sin(rotY) + ly * Math.cos(rotY) * Math.sin(rotX);
    });

    // 4. Subtle Particle Drift
    if (particles) {
      particles.rotation.y += 0.0008 * speed;
      particles.rotation.x += 0.0004 * speed;
    }

    renderer.render(scene, camera);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export globally for manual theme switching
  window.Akash3D = {
    switchTheme: switchTheme,
    getMode: () => currentMode
  };

})();
