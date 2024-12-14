import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';

const draco = new DRACOLoader();
draco.setDecoderConfig({ type: 'js' });
draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

type LoadGLTFOptions = {
  receiveShadow?: boolean;
  castShadow?: boolean;
};

export function loadGLTFModel(
  scene: THREE.Scene,
  glbPath: string,
  options: LoadGLTFOptions = { receiveShadow: true, castShadow: true }
): Promise<THREE.Object3D> {
  const { receiveShadow, castShadow } = options;

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene;
        obj.name = 'model';
        obj.position.set(0, 0, 0);
        obj.receiveShadow = receiveShadow ?? true;
        obj.castShadow = castShadow ?? true;
        scene.add(obj);

        obj.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = castShadow ?? true;
            child.receiveShadow = receiveShadow ?? true;
          }
        });

        resolve(obj);
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
        reject(error);
      }
    );
  });
}
