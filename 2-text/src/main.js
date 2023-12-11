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

  // 그림자 사용 여부
  renderer.shadowMap.enabled = true;

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

  camera.position.set(0, 1, 5);

  new OrbitControls(camera, renderer.domElement);

  // Font
  const fontLoader = new FontLoader();

  const font = await fontLoader.loadAsync(
    "./assets/fonts/The Jamsil 3 Regular_Regular.json"
  );

  const textGeometry = new TextGeometry("안녕하세요 만나서 반갑습니다", {
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });

  const textMaterial = new THREE.MeshPhongMaterial();

  const text = new THREE.Mesh(textGeometry, textMaterial);

  text.castShadow = true;

  // 바운딩 박스 계산을 실행시켜 element의 크기를 계산
  // min, max 값이 나오는데 각각 바운딩 박스의 시작과 끝을 의미
  // textGeometry.computeBoundingBox();

  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) * 0.5,
  //   -(textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y) * 0.5,
  //   -(textGeometry.boundingBox.max.z - textGeometry.boundingBox.min.z) * 0.5
  // );

  textGeometry.center();

  const textureLoader = new THREE.TextureLoader().setPath("./assets/textures/");

  const textTexture = textureLoader.load("holographic.jpeg");

  textMaterial.map = textTexture;

  scene.add(text);

  const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x00000f });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.position.z = -2;
  plane.receiveShadow = true;

  scene.add(plane);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

  scene.add(ambientLight);
  // const font = fontLoader.parse(typeface);

  // 색상, 각도, 거리, 빛이 퍼지는 각도, 빛의 감쇠하는 정도, 빛이 거리에 따라 어두워 지는가
  const spotLight = new THREE.SpotLight(
    0xffffff,
    2.5,
    30,
    Math.PI * 0.15,
    0.2,
    0.5
  );

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.radius = 10;

  spotLight.position.set(0, 0, 3);

  const spotLightTexture = textureLoader.load("gradient.jpg");

  spotLight.map = spotLightTexture;

  // 어떤 대상을 기준으로 빛을 쏠 것인가는 target 속성에 있음
  scene.add(spotLight, spotLight.target);

  window.addEventListener("mousemove", (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 5;
    const mouseY = -(e.clientY / window.innerHeight - 0.5) * 5;

    spotLight.target.position.set(mouseX, mouseY, -3);
  });

  // 폴더화 해서 여러 옵션을 관리 할 수 있다.
  const spotLitghtFolder = gui.addFolder("SpotLight");

  spotLitghtFolder
    .add(spotLight, "angle")
    .min(0)
    .max(Math.PI / 2)
    .step(0.01);

  spotLitghtFolder
    .add(spotLight.position, "z")
    .min(1)
    .max(10)
    .step(0.01)
    .name("position.z");

  spotLitghtFolder.add(spotLight, "distance").min(1).max(30).step(0.01);

  // 빛과 거리
  spotLitghtFolder.add(spotLight, "decay").min(0).max(10).step(0.01);

  // 빛의 경계
  spotLitghtFolder.add(spotLight, "penumbra").min(0).max(1).step(0.01);

  spotLitghtFolder
    .add(spotLight.shadow, "radius")
    .min(1)
    .max(20)
    .step(0.01)
    .name("shadow.radius");

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
