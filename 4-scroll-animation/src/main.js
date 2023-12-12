import * as THREE from "three";
import { GUI } from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const init = async () => {
  // 스크롤 이벤트를 쉽게 하기 위해 트리거를 호출
  gsap.registerPlugin(ScrollTrigger);

  const params = {
    waveColor: "#00ffff",
    backgroundColor: "#ffffff",
    fogColor: "#f0f0f0",
  };

  const canvas = document.querySelector("#canvas");
  const gui = new GUI();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });

  renderer.shadowMap.enabled = true;

  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xf0f0f0, 0.1, 500);

  gui.add(scene.fog, "near").min(0).max(100).step(0.1);

  gui.add(scene.fog, "far").min(100).max(500).step(0.1);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.set(0, 25, 150);

  const waveGeometry = new THREE.PlaneGeometry(1500, 1500, 150, 150);
  const waveMaterial = new THREE.MeshStandardMaterial({
    color: params.waveColor,
  });

  const wave = new THREE.Mesh(waveGeometry, waveMaterial);

  wave.rotation.x = -Math.PI / 2;

  scene.add(wave);

  wave.receiveShadow = true;

  const waveHeight = 2.5;

  const initialZpositions = [];

  for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
    const z =
      waveGeometry.attributes.position.getZ(i) +
      (Math.random() - 0.5) * waveHeight;

    waveGeometry.attributes.position.setZ(i, z);
    initialZpositions.push(z);
  }

  wave.update = function () {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < waveGeometry.attributes.position.count; i++) {
      const z =
        initialZpositions[i] + Math.sin(elapsedTime * 3 + i ** 2) * waveHeight;

      waveGeometry.attributes.position.setZ(i, z);
    }
    waveGeometry.attributes.position.needsUpdate = true;
  };

  const gltfLoader = new GLTFLoader();

  const gltf = await gltfLoader.loadAsync("./models/ship/scene.gltf");

  const ship = gltf.scene;

  ship.traverse((el) => {
    if (el.isMesh) {
      el.castShadow = true;
    }
  });

  ship.scale.set(40, 40, 40);

  ship.rotation.y = Math.PI;

  ship.update = () => {
    const elapsedTime = clock.getElapsedTime();

    ship.position.y = Math.sin(elapsedTime * 3);
  };

  scene.add(ship);

  const pointLight = new THREE.PointLight(0xffffff, 1);

  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.radius = 10;

  pointLight.position.set(15, 15, 15);

  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 10;

  directionalLight.position.set(-15, 15, 15);

  scene.add(directionalLight);

  const clock = new THREE.Clock();

  const render = () => {
    wave.update();
    ship.update();

    camera.lookAt(ship.position);

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

  gui.hide();

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      markers: true,
      scrub: true,
    },
  });

  tl.to(params, {
    waveColor: "#4268ff",
    onUpdate: () => {
      waveMaterial.color = new THREE.Color(params.waveColor);
    },
  })
    .to(
      params,
      {
        backgroundColor: "#2a2a2a",
        onUpdate: () => {
          scene.background = new THREE.Color(params.backgroundColor);
        },
      },
      "<"
    )
    .to(
      params,
      {
        fogColor: "#2f2f2f",
        onUpdate: () => {
          scene.fog.color = new THREE.Color(params.fogColor);
        },
      },
      "<"
    );
};

window.addEventListener("load", () => {
  init();
});
