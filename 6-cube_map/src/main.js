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
    10000
  );

  camera.position.z = 5;
  const controls = new OrbitControls(camera, renderer.domElement);
  /** 큐브 텍스처 활용 */

  // controls.minDistance = 5;
  // controls.maxDistance = 100;

  // const textureLoader = new THREE.TextureLoader().setPath(
  //   "./assets/textures/Yokohama/"
  // );

  // const images = [
  //   "posx.jpg",
  //   "negx.jpg",
  //   "posy.jpg",
  //   "negy.jpg",
  //   "posz.jpg",
  //   "negz.jpg",
  // ];

  // const geometry = new THREE.BoxGeometry(5000, 5000, 5000);
  // const materials = images.map(
  //   (el) =>
  //     new THREE.MeshBasicMaterial({
  //       map: textureLoader.load(el),
  //       side: THREE.BackSide,
  //     })
  // );

  // const skybox = new THREE.Mesh(geometry, materials);

  // scene.add(skybox);

  const cubeTextureLoader = new THREE.CubeTextureLoader().setPath(
    "./assets/textures/Yokohama/"
  );

  const images = [
    "posx.jpg",
    "negx.jpg",
    "posy.jpg",
    "negy.jpg",
    "posz.jpg",
    "negz.jpg",
  ];

  const cubeTexture = cubeTextureLoader.load(images);

  scene.background = cubeTexture;

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
