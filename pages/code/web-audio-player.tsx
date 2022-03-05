import { styled, VariantProps } from "@stitches/react";
import { PropsWithChildren, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { Button } from "~/design-system/react/button";
import { Container } from "~/design-system/react/container";
import { Heading } from "~/design-system/react/heading";
import { Spinner } from "~/design-system/react/spinner";
import { useBoolean } from "~/design-system/react/use-boolean";

const StyledPlayPauseButton = styled(Button, {
  display: "inline-flex",
  alignItems: "center",
  gap: "$2 !important",
  color: "$hiContrast !important",
  flex: "0 0 auto",
  fontWeight: "600",
  fontSize: "$4 !important",
  svg: {
    color: "$hiContrast",
    width: "16px",
    height: "16px",
  },
  variants: {
    state: {
      playing: {
        bgc: "#18E27D",
        boxShadow: "none",
        "&:focus": {
          boxShadow:
            "inset 0 0 0 1px $colors$blue4, 0px 0px 0px 2px $colors$blue4",
        },
      },
      loading: {},
      paused: {},
    },
  },
});

const PlayPauseButton = ({
  state,
  ...rest
}: VariantProps<typeof StyledPlayPauseButton> &
  React.ComponentPropsWithRef<"button">) => {
  return (
    <StyledPlayPauseButton
      size={2}
      disabled={state === "loading"}
      state={state}
      {...rest}
    >
      {state === "loading" && (
        <>
          <Spinner /> HANG ON
        </>
      )}

      {state === "playing" && (
        <>
          <FaPlay />
          PAUSE
        </>
      )}

      {state === "paused" && (
        <>
          <FaPlay />
          PLAY
        </>
      )}
    </StyledPlayPauseButton>
  );
};

const useWebAudioPlayer = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  // const canvasRef = useRef();

  const onPlayPauseClick = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (audioElementRef.current?.paused) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  };

  return {
    audioContextRef,
    audioElementRef,

    onPlayPauseClick,
  };
};

export default function WebAudioPlayer({}) {
  const player = useWebAudioPlayer();
  return (
    <>
      <Container
        css={{
          py: "$4",
          //  bgc: "$slate7",
          minHeight: "100%",
        }}
      >
        <Heading size="3" css={{ mb: "$4" }}>
          Web Audio Player
        </Heading>
        <Heading size="2" css={{ mb: "$4" }}>
          Stream and control a queue of mp3 files using Web Audio API.
        </Heading>
        <audio
          loop
          src={"/music/KING_TUBBY.mp3"}
          ref={player.audioElementRef}
        />
        <PlayPauseButton
          state={player?.audioElementRef.current?.paused ? "paused" : "playing"}
          onClick={player.onPlayPauseClick}
        />
      </Container>
    </>
  );
}
