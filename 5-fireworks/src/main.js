import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // 시야각,  ,얼마나 가까이, 얼마나 멀리
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.z = 5;

  new OrbitControls(camera, renderer.domElement);

  const geometry = new THREE.SphereGeometry();

  const count = 1000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = THREE.MathUtils.randFloatSpread(10); //  Math.random() - 0.5 과 결과값이 같음
    positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10);
    positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10);

    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }

  const material = new THREE.PointsMaterial({
    color: 0xccaaff,
    size: 0.1,
    vertexColors: true,
  });

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load("./assets/textures/particle.png");

  material.alphaMap = texture;
  material.transparent = true;
  material.depthWrite = false;

  const points = new THREE.Points(geometry, material);

  scene.add(points);

  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  window.addEventListener("resize", handleResize);
};

window.addEventListener("load", () => {
  init();
});
