// @ts-nocheck
// @ts-nocheck

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animation types
import { Object3D } from "three/src/core/Object3D"; //Object3D types

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
    };
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
  };
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[40, 10, 5]} intensity={0.2} />
      <directionalLight
        castShadow
        position={[10, 420, 100]}
        intensity={1.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-left={-30}
        shadow-camera-right={10}
        shadow-camera-top={40}
        shadow-camera-bottom={-10}
      />
      <spotLight intensity={0.5} position={[90, 100, 50]} castShadow />
    </>
  );
};

const Model = () => {
  /* Refs */
  const group: group = useRef();
  const actions: actions = useRef();

  /* State */
  const [model, setModel] = useState<Object3D | null>(null);
  const [animation, setAnimation] = useState<AnimationClip[] | null>(null);

  /* Mixer */
  const [mixer] = useState(() => new THREE.AnimationMixer(null));

  /* Load model */
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/models/dancing_girl/scene.gltf", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const animations = await gltf.parser.getDependencies("animation");
      gltf.scene.traverse((node: any) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      setModel(nodes[0]);
      setAnimation(animations);
    });
  }, []);

  /* Set animation */
  useEffect(() => {
    if (animation && typeof group.current != "undefined") {
      actions.current = {
        idle: mixer.clipAction(animation[0], group.current as Object3D),
      };
      actions.current.idle.play();
      return () => animation.forEach((clip) => mixer.uncacheClip(clip));
    }
  }, [animation]);

  /* Animation update */
  useFrame((_, delta) => mixer.update(delta));
  /* Rotation */
  // useFrame(() => {
  //   if (typeof group.current != "undefined")
  //     return (group.current.rotation.y += 0.01);
  // });

  return (
    <>
      {model ? (
        <group ref={group} position={[0, -80, 0]} dispose={null}>
          <primitive ref={group} name="Object_0" object={model} />
        </group>
      ) : (
        <Html>Loading...</Html>
      )}
    </>
  );
};

const Nightclub = () => {
  return (
    <Canvas colorManagement camera={{ position: [0, 0, 300] }}>
      <Lights />
      <Model />
    </Canvas>
  );
};

export default Nightclub;
