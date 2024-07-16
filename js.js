let scene, camera, renderer, clock, marker;

scene = document.querySelector('a-scene');
camera = scene.querySelector('a-entity[camera]');
renderer = scene.renderer;
clock = new THREE.Clock();

const loader = new THREE.GLTFLoader();
loader.load('scene.gltf', (gltf) => {
  const world = gltf.scene.children[0];
  const animation = gltf.animations[0];

  const mixer = new THREE.AnimationMixer(world);
  const action = mixer.clipAction(animation);

  action.play();

  scene.querySelector('#model').object3D.add(gltf.scene);

  animate();

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    mixer.update(delta);

    // Add rotation to the model
    scene.querySelector('#model').object3D.rotation.y += 0.01;
  }

  // Add an event listener to the marker
  marker = scene.querySelector('a-marker');
  marker.addEventListener('markerFound', () => {
    // Play the audio here
    const audio = document.getElementById('audio');
    audio.play();
  });

  marker.addEventListener('markerLost', () => {
    // Stop the audio here
    const audio = document.getElementById('audio');
    audio.pause();
  });
});
