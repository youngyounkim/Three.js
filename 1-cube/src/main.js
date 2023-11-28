import * as THREE from "three";

const init = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

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

  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ conlor: 0xcc99ff });

  const cube = new THREE.Mesh(geometry, material);

  sceen.add(cube);

  camera.position.set(3, 4, 5);

  camera.lookAt(cube.position);

  renderer.render(sceen, camera);
};

window.addEventListener("load", () => {
  init();
});
