import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import FireWork from "./Firework";

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
    10000
  );

  camera.position.z = 8000;

  new OrbitControls(camera, renderer.domElement);

  const fireworks = [];

  fireworks.update = function () {
    for (let i = 0; i < this.length; i++) {
      const firework = fireworks[i];

      firework.update();
    }
  };

  const firework = new FireWork({ x: 0, y: 0 });

  scene.add(firework.points);

  fireworks.push(firework);

  const render = () => {
    fireworks.update();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();

  const handleResize = () => {
    fireworks.update();

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  window.addEventListener("resize", handleResize);

  function handleMouseDown() {
    const firework = new FireWork({
      x: THREE.MathUtils.randFloatSpread(8000),
      y: THREE.MathUtils.randFloatSpread(8000),
      z: THREE.MathUtils.randFloatSpread(8000),
    });

    scene.add(firework.points);

    fireworks.push(firework);
  }

  window.addEventListener("mousedown", handleMouseDown);
};

window.addEventListener("load", () => {
  init();
});
