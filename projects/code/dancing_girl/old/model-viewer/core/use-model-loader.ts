// @ts-nocheck
// import * as THREE from "three";
// import React, { useState, useMemo } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// export default function Model({ url }) {
//   const [obj, setObj] = useState();

//   useMemo(async () => {
//     await new GLTFLoader().load(
//       url,
//       gltf => {
//         const model = gltf.scene;
//         setObj(model);
//       },
//       null,
//       error => console.error("Error loading GLTF Model", error)
//     );
//   }, [url]);

//   return obj ? <primitive object={obj} /> : null;
// }

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useState, useEffect, useMemo } from "react";

const manager = new THREE.LoadingManager();

function getLoader(type) {
  switch (type) {
    case "gltf": {
      return new GLTFLoader(manager);
    }
    case "obj": {
      return new OBJLoader(manager);
    }
    case "fbx": {
      return new FBXLoader(manager);
    }
    case "collada": {
      return new ColladaLoader(manager);
    }
    default:
      return;
  }
}

const useModelLoader = (type: any, src: any) => {
  const loader = useMemo(() => getLoader(type), [type]);

  const [model, setModel] = useState(undefined);
  const [modelCenter, setModelCenter] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(loader);

    loader?.load(
      // resource URL
      src,
      // called when the resource is loaded
      (model) => {
        model.scene.traverse((node) => {
          if (!node.isSkinnedMesh && !node.material) return;

          if (
            node.material.name !== "Bottommat" &&
            node.material.name !== "Topmat"
          ) {
            node.material.wireframe = true;
          }
        });

        setModel(model);
      },
      // called while loading is progressing
      ({ loaded, total }) => {
        setProgress((loaded / total) * 100);
      },
      // called when loading has errors
      (error) => {
        console.error("error loading model", error);
        setError(error);
      }
    );
  }, [loader, src]);

  // get the center of the model
  useEffect(() => {
    if (!model) {
      return;
    }

    const box = new THREE.Box3();

    box.setFromObject(model.scene);

    const center = new THREE.Vector3();

    box.getCenter(center);

    setModelCenter(center);
  }, [model]);

  return { model, modelCenter, progress, error };
};

export default useModelLoader;
