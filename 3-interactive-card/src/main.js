import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Card from "./Card";

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // 랜더러 배경을 투명하게
  });

  // renderer.setClearAlpha(0.5); // 알파 값의 비율을 정함
  // renderer.setClearColor(0x00aaff, 0.5); // 배경 색과 알파 값의 비율
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const sceen = new THREE.Scene();

  // 시야각,  ,얼마나 가까이, 얼마나 멀리
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.z = 25;

  const controls = new OrbitControls(camera, renderer.domElement);

  const card = new Card({ width: 10, height: 15.8, color: "#0077ff" });

  sceen.add(card.mesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

  ambientLight.position.set(-5, -5, -5);

  sceen.add(ambientLight);

  const render = () => {
    renderer.render(sceen, camera);
    requestAnimationFrame(render);
  };

  render();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(sceen, camera);
  };

  window.addEventListener("resize", handleResize);
};

window.addEventListener("load", () => {
  init();
});
