gsap.registerPlugin(ScrollTrigger);

// --- THREE.JS: VIBRANT SCENE ---
let scene,
  camera,
  renderer,
  balls = [];

function init3D() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg-canvas"),
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const p1 = new THREE.PointLight(0x8b5cf6, 2);
  p1.position.set(15, 15, 10);
  scene.add(p1);

  const p2 = new THREE.PointLight(0xec4899, 2);
  p2.position.set(-15, -15, 10);
  scene.add(p2);

  const geometry = new THREE.IcosahedronGeometry(1, 15);

  for (let i = 0; i < 6; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.08,
      wireframe: i % 2 === 0,
    });

    const ball = new THREE.Mesh(geometry, material);
    const scale = Math.random() * 6 + 3;
    ball.scale.set(scale, scale, scale);

    ball.position.x = (Math.random() - 0.5) * 40;
    ball.position.y = (Math.random() - 0.5) * 30;
    ball.position.z = (Math.random() - 0.5) * 15;

    ball.userData = {
      rx: Math.random() * 0.005,
      ry: Math.random() * 0.005,
    };

    scene.add(ball);
    balls.push(ball);
  }

  camera.position.z = 25;
}

function animate() {
  requestAnimationFrame(animate);
  balls.forEach((ball) => {
    ball.rotation.x += ball.userData.rx;
    ball.rotation.y += ball.userData.ry;
  });
  const sp = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  camera.position.y = -sp * 15;
  renderer.render(scene, camera);
}

function initAnimations() {
  gsap.to(".hero-fade", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.25,
    ease: "power4.out",
    delay: 0.4,
  });

  document.querySelectorAll(".reveal-text").forEach((text) => {
    gsap.from(text, {
      scrollTrigger: { trigger: text, start: "top 95%" },
      opacity: 0,
      y: 20,
      duration: 0.8,
    });
  });

  gsap.from(".skill-card", {
    scrollTrigger: { trigger: "#habilidades", start: "top 80%" },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
  });

  gsap.from(".experience-item", {
    scrollTrigger: { trigger: "#experiencia", start: "top 85%" },
    opacity: 0,
    x: -30,
    duration: 1,
    stagger: 0.3,
  });
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.onload = () => {
  init3D();
  animate();
  initAnimations();
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
