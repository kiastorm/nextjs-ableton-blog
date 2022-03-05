// @ts-nocheck

import React from "react";
import Stars from "./assets/Stars";
import DanceFloor from "./assets/DanceFloor";

export default function Scene({ model }) {
  return (
    <>
      <ambientLight color="lightblue" />
      <pointLight color="white" intensity={4} position={[50, 300, 50]} />
      <Stars />
      {model && (
        <primitive
          object={model.scene || model}
          position={[0, -80, 0]}
          wireframe
          material={{ wireframe: true }}
        />
      )}
      {/* <DanceFloor /> */}
    </>
  );
}
