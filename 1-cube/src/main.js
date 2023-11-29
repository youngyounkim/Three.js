import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.autoRotate = true;
  // controls.autoRotateSpeed = 30;
  controls.enableDamping = true; // 화면에서 스크롤 시 관성 여부
  // controls.dampingFactor = 0.01; // 관성의 유지 정도
  controls.enableZoom = true; // 카메라 줌 여부
  // controls.maxDistance = 50; // 카메라 최대 확대
  // controls.minDistance = 10; // 카메라 최소 확대
  controls.maxAzimuthAngle = Math.PI / 2; // 카메라 회전 크기\
  controls.minAzimuthAngle = Math.PI / 3;

  controls.enablePan = true; // 우클릭 카메라 전환 여부

  // const axesHelper = new THREE.AxesHelper(5);

  // sceen.add(axesHelper);

  const cubeGeometry = new THREE.IcosahedronGeometry(1);
  // 조명에 영향을 받는 메쉬
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111,
  });

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMetaerial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  });

  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMetaerial);

  sceen.add(cube, skeleton);

  camera.position.z = 5;

  // camera.lookAt(cube.position); // 카메라가 대상을 바라보게 함

  // 기본 조명을 추가
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-1, 2, 3);

  sceen.add(directionalLight);

  const clock = new THREE.Clock();

  const render = () => {
    const elapsedTime = clock.getElapsedTime();

    // cube.rotation.x = elapsedTime; // x 축 방향으로 돌리는 것 단위는 라디안
    // cube.rotation.y = elapsedTime;

    // skeleton.rotation.x = elapsedTime * 1.5;
    // skeleton.rotation.y = elapsedTime * 1.5;
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);
    controls.update();
    renderer.render(sceen, camera);
    requestAnimationFrame(render);
  };

  render();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.update();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(sceen, camera);
  };

  window.addEventListener("resize", handleResize);
};

window.addEventListener("load", () => {
  init();
});
