import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const init = async () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // 시야각,  ,얼마나 가까이, 얼마나 멀리
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.minDistance = 15;
  controls.maxDistance = 25;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 3;

  camera.position.set(0, 5, 20);

  const loadingManager = new THREE.LoadingManager();

  const progressBar = document.querySelector("#progress-bar");
  const progressBarContainer = document.querySelector(
    "#progress-bar-container"
  );

  loadingManager.onProgress = (url, loaded, total) => {
    progressBar.value = (loaded / total) * 100;
  };

  loadingManager.onLoad = () => {
    progressBarContainer.style.display = "none";
  };
  const gltfLoader = new GLTFLoader(loadingManager);

  const gltf = await gltfLoader.loadAsync("./models/character.gltf");

  const model = gltf.scene;

  model.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
    }
  });

  model.scale.set(0.1, 0.1, 0.1);

  scene.add(model);

  camera.lookAt(model.position);

  const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 10000);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -7.5;
  plane.receiveShadow = true;

  scene.add(plane);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333);

  hemisphereLight.position.set(0, 20, 10);

  scene.add(hemisphereLight);

  const spotLight = new THREE.SpotLight(
    0xffffff,
    1.5,
    30,
    Math.PI * 0.15,
    0.5,
    0.5
  );

  spotLight.position.set(0, 20, 0);

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.radius = 8;

  scene.add(spotLight);

  const mixer = new THREE.AnimationMixer(model);

  const buttons = document.querySelector(".actions");

  let currentAction;

  const combatAnimations = gltf.animations.slice(0, 5);

  combatAnimations.forEach((animation) => {
    const button = document.createElement("button");

    button.innerHTML = animation.name;
    buttons.appendChild(button);
    button.addEventListener("click", () => {
      const previusAction = currentAction;

      currentAction = mixer.clipAction(animation);

      if (previusAction !== currentAction) {
        previusAction.fadeOut(0.5);
        currentAction.reset().fadeIn(0.5).play();
      }
    });
  });

  const hasAnimaiton = gltf.animations.length !== 0;

  if (hasAnimaiton) {
    currentAction = mixer.clipAction(gltf.animations[0]);

    currentAction.play();
  }
  const clock = new THREE.Clock();

  const render = () => {
    const delta = clock.getDelta();
    controls.update();

    mixer.update(delta);

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
