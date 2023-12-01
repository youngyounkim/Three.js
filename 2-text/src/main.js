import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const init = () => {
  const gui = new GUI();

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

  // Font
  const fontLoader = new FontLoader();

  let textGeometry, textMaterial;

  fontLoader.load(
    "./assets/fonts/The Jamsil 3 Regular_Regular.json",
    (font) => {
      textGeometry = new TextGeometry("안녕하세요", {
        font,
        size: 0.5,
        height: 0.1,
      });

      textMaterial = new THREE.MeshPhongMaterial({ color: 0x00c896 });

      const text = new THREE.Mesh(textGeometry, textMaterial);

      scene.add(text);
    }
  );

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(ambientLight);
  // const font = fontLoader.parse(typeface);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.5);

  pointLight.position.set(3, 0, 2);

  scene.add(pointLight, pointLightHelper);

  gui.add(pointLight.position, "x").min(-3).max(3).step(0.1);

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
