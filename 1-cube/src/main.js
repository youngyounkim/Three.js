import * as THREE from "three";

const init = () => {
  const renderer = new THREE.WebGLRenderer();

  document.body.appendChild(renderer.domElement);

  const sceen = new THREE.Scene();
  // 시야각,  ,얼마나 가까이, 얼마나 멀리
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  renderer.render(sceen, camera);
};

window.addEventListener("load", () => {
  init();
});
