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

    cube.rotation.x = elapsedTime; // x 축 방향으로 돌리는 것 단위는 라디안
    cube.rotation.y = elapsedTime;

    skeleton.rotation.x = elapsedTime * 1.5;
    skeleton.rotation.y = elapsedTime * 1.5;
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x);

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
