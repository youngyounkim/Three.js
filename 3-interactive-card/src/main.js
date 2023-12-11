import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "lil-gui";
import Card from "./Card";

const init = () => {
  const gui = new GUI();
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // 랜더러 배경을 투명하게
  });

  // renderer.setClearAlpha(0.5); // 알파 값의 비율을 정함
  // renderer.setClearColor(0x00aaff, 0.5); // 배경 색과 알파 값의 비율
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

  camera.position.z = 25;

  const controls = new OrbitControls(camera, renderer.domElement);

  const card = new Card({
    width: 10,
    height: 15.8,
    radius: 0.5,
    color: "#0077ff",
  });

  scene.add(card.mesh);

  const cardFolder = gui.addFolder("Card");

  cardFolder
    .add(card.mesh.material, "roughness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("roughness");

  cardFolder
    .add(card.mesh.material, "metalness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("metalness");

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  ambientLight.position.set(-5, -5, -5);

  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  const directionalLight2 = directionalLight1.clone();

  directionalLight1.position.set(1, 1, 3);
  directionalLight2.position.set(-1, 1, -3);

  scene.add(directionalLight1, directionalLight2);

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