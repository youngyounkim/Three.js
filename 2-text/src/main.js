import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const init = async () => {
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

  const font = await fontLoader.loadAsync(
    "./assets/fonts/The Jamsil 3 Regular_Regular.json"
  );

  const textGeometry = new TextGeometry("안녕하세요", {
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });

  const textMaterial = new THREE.MeshPhongMaterial({ color: 0x00c896 });

  const text = new THREE.Mesh(textGeometry, textMaterial);

  // 바운딩 박스 계산을 실행시켜 element의 크기를 계산
  // min, max 값이 나오는데 각각 바운딩 박스의 시작과 끝을 의미
  // textGeometry.computeBoundingBox();

  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) * 0.5,
  //   -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) * 0.5,
  //   -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) * 0.5
  // );

  textGeometry.center();

  scene.add(text);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  scene.add(ambientLight);
  // const font = fontLoader.parse(typeface);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);

  pointLight.position.set(3, 0, 2);

  scene.add(pointLight);

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
