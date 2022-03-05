// @ts-nocheck
import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useRender, extend } from "react-three-fiber";
import NightclubScene from "./scenes/nightclub/Scene";
import CoreModelViewer from "./model-viewer/core/CoreModelViewer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dancingGirl from "~/assets/models/dancing-girl/scene.gltf";

extend({ OrbitControls });

function CameraControls(props: any) {
  const controls = useRef();
  const { camera } = useThree();

  useRender(() => controls.current && controls.current.update(), false);

  return <orbitControls ref={controls} args={[camera]} {...props} />;
}

const ThreeCanvas = ({ src, type, aspect, className, ...rest }) => {
  useEffect(() => {
    document.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    return () => {
      document.removeEventListener(
        "touchmove",
        function (e) {
          e.preventDefault();
        },
        { passive: false }
      );
    };
  }, []);

  return (
    <CoreModelViewer src={dancingGirl} type="gltf">
      {({
        model,
        modelCenter,
        modelProgress,
        modelError,
        animations,
        animationIndex,
        playing,
        loopMode,
        timeScale,
        animationProgress,
        play = true,
        pause,
        seek,
        setLoopMode,
        setTimeScale,
        setAnimationIndex,
      }) => (
        <div className={className}>
          <Canvas
            style={{ background: "#353A47" }}
            camera={{ position: [100, 0, 160] }}
            {...rest}
          >
            <CameraControls
              enableDamping
              minDistance={140}
              maxDistance={400}
              dampingFactor={0.3}
              autoRotate
              autoRotateSpeed={1}
              minPolarAngle={0.6}
              target={[60, 10, 0]}
              maxPolarAngle={Math.PI / 2.25}
            />
            <NightclubScene model={model} />
          </Canvas>
        </div>
      )}
    </CoreModelViewer>
  );
};

export default ThreeCanvas;
