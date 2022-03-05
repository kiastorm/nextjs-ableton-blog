// @ts-nocheck

import useModelLoader from "./use-model-loader";
import useAnimationMixer from "./use-animation-mixer";

const CoreModelViewer = ({ src, type, children }) => {
  const {
    model,
    modelCenter,
    error: modelError,
    progress: modelProgress,
  } = useModelLoader(type, src);

  const {
    animations,
    animationIndex,
    playing,
    loopMode,
    timeScale,
    progress: animationProgress,
    play,
    pause,
    seek,
    setLoopMode,
    setTimeScale,
    setAnimationIndex,
  } = useAnimationMixer(model);

  return children({
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
    play,
    pause,
    seek,
    setLoopMode,
    setTimeScale,
    setAnimationIndex,
  });
};

export default CoreModelViewer;
