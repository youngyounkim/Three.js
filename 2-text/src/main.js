import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import typeface from "./assets/fonts/The Jamsil 3 Regular_Regular.json";

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

  camera.position.z = 5;

  // Font
  const fontLoader = new FontLoader();

  // fontLoader.load(
  //   "./assets/fonts/The Jamsil 3 Regular_Regular.json",
  //   (font) => {
  //     console.log(font);
  //   },
  //   (event) => {
  //     console.log(event);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );

  const font = fontLoader.parse(typeface);

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
