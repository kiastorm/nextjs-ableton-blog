import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import guid from "short-uuid";
import * as THREE from "three";

const glsl = require("glslify");

// This shader is from Bruno Simons Threejs-Journey: https://threejs-journey.xyz
class WaveMaterial extends THREE.ShaderMaterial {
  static key: guid.SUUID;
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        colorStart: { value: new THREE.Color("blue") },
        colorEnd: { value: new THREE.Color("red") },
      },
      vertexShader: glsl`
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
      fragmentShader: glsl`
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
      uniform float time;
      uniform vec3 colorStart;
      uniform vec3 colorEnd;
      varying vec2 vUv;
      void main() {
        vec2 displacedUv = vUv + cnoise3(vec3(vUv * 10.0, time * 0.1));
        float strength = cnoise3(vec3(displacedUv * 10.0, time * 0.2));
        float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
        strength += outerGlow;
        strength += step(-0.2, strength) * 0.6;
        strength = clamp(strength, 0.0, 1.0);
        vec3 color = mix(colorStart, colorEnd, strength);
        gl_FragColor = vec4(color, 1.0);
      }`,
    });
  }

  set time(v) { this.uniforms.time.value = v } // prettier-ignore
  get time() { return this.uniforms.time.value } // prettier-ignore
  get colorStart() { return this.uniforms.colorStart.value } // prettier-ignore
  get colorEnd() { return this.uniforms.colorEnd.value } // prettier-ignore
}

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
WaveMaterial.key = guid.generate();
// Make the material available in JSX as <waveMaterial />
extend({ WaveMaterial });

function ShaderPlane() {
  const ref = useRef<WaveMaterial>();
  const { width, height } = useThree((state) => state.viewport);
  useFrame((_, delta) =>
    ref.current ? (ref.current.time += delta) : undefined
  );
  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      {/* @ts-ignore */}
      <waveMaterial
        ref={ref}
        key={WaveMaterial.key}
        colorStart="yellow"
        colorEnd="blue"
      />
    </mesh>
  );
}

export default function WallOfEcho() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas dpr={[1, 2]}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
