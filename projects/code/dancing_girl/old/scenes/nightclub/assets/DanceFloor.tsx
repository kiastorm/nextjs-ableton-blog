// @ts-nocheck

import * as THREE from "three/src/Three";
import React, { useRef, useMemo } from "react";
import { useRender } from "react-three-fiber";

export default function DanceFloor() {
  let floor = useRef();

  // useRender(() => {
  //   // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
  //   const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
  //   group.current.rotation.set(r, r, r);
  // });

  // const [spaceGeo, spaceMat, spaceSphere] = useMemo(() => {
  //   const spaceTex = THREE.ImageUtils.loadTexture(
  //     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/space.jpg"
  //   );
  //   const spaceGeo = new THREE.SphereGeometry(200, 200, 200);
  //   const spaceMat = new THREE.MeshPhongMaterial();

  //   const spaceSphere = new THREE.Mesh(spaceGeo, spaceMat);

  //   spaceMat.map = spaceTex;

  //   //spacesphere needs to be double sided as the camera is within the spacesphere
  //   spaceSphere.material.side = THREE.DoubleSide;

  //   spaceSphere.material.map.wrapS = THREE.RepeatWrapping;
  //   spaceSphere.material.map.wrapT = THREE.RepeatWrapping;
  //   spaceSphere.material.map.repeat.set(5, 3);

  //   return [spaceGeo, spaceMat, spaceSphere];
  // }, []);

  // const [geo, mat, vertices] = useMemo(() => {
  //   const geo = new THREE.PlaneGeometry(20, 20);
  //   const mat = new THREE.MeshBasicMaterial({
  //     color: new THREE.Color("lightblue"),
  //     side: THREE.DoubleSide
  //   });
  //   // const coords = new Array(2000)
  //   //   .fill()
  //   //   .map(i => [
  //   //     Math.random() * 800 - 400,
  //   //     Math.random() * 800 - 400,
  //   //     Math.random() * 800 - 400,
  //   //   ]);
  //   return [geo, mat, vertices];
  // }, []);

  return (
    <mesh
      ref={floor}
      position={new THREE.Vector3(0, 0, 0)}
      rotation={new THREE.Euler(-90, 0, 0)}
    >
      <planeGeometry attach="geometry" args={[200, 200]} />
      <meshBasicMaterial
        attach="material"
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}
