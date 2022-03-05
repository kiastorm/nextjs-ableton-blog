// @ts-nocheck

import * as THREE from "three/src/Three";
import React, { useRef, useMemo } from "react";
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { useRender } from "react-three-fiber";
// A React animation lib, see: https://github.com/react-spring/react-spring

export default function Stars() {
  let group = useRef();
  let theta = 0;

  useRender(() => {
    // Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
    group.current.rotation.set(r, r, r);
  });

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

  const [geo, mat, vertices, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("lightblue"),
    });
    const coords = new Array(2000)
      .fill()
      .map((i) => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ]);
    return [geo, mat, vertices, coords];
  }, []);

  return (
    <group ref={group}>
      {/* <mesh geometry={spaceGeo} mat={spaceMat} position={[0, 0, 0]} /> */}
      {/* {spaceSphere} */}
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
}
