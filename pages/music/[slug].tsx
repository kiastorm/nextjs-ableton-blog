import { FaPlay, FaPause } from "react-icons/fa";
import { staticRequest } from "tinacms";
import { Layout } from "../../components/layout/layout";
import { useTina } from "tinacms/dist/edit-state";
import { Heading } from "~/design-system/react/heading";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "~/design-system/react/container";
import { PageContainer } from "~/components/page-container";
import { styled } from "~/stitches.config";
import { useGlobalContext } from "~/global-context";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Flex } from "~/design-system/react/flex";
import { Spinner } from "~/design-system/react/spinner";
import { square } from "~/design-system/react/square";
import { Button } from "~/design-system/react/button";
import { useAudioPlayer } from "react-use-audio-player";
import { ExperimentalGetTinaClient } from "~/.tina/__generated__/types";
import { Box } from "~/design-system/react/box";

// const PlayButton = styled("button", {
//   border: "none",
//   margin: "0",
//   padding: "0",
//   overflow: "visible",

//   background: "transparent",

//   color: "inherit",
//   font: "inherit",

//   lineHeight: "normal",

//   maxHeight: "18px",
//   // display: "inline-flex",
//   alignItems: "center",
//   flexBasis: "18px",
//   width: "18px",
//   height: "18px",
// });

const StyledPlayButton = styled(Button, {
  alignItems: "center",
  gap: "$2",
  color: "$hiContrast !important",
  flex: "0 0 auto",
  fontWeight: "600",
  fontSize: "$4 !important",
  svg: {
    color: "$hiContrast",
    width: "16px",
    height: "16px",
  },
});

export const MusicImage = styled("img", {
  // Reset
  verticalAlign: "middle",
  maxWidth: "100%",
  flex: "1 0 260px",
  minWidth: "0",
});

export default function Home(props: any) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const { playTrack } = useGlobalContext();

  const {
    player,
    togglePlayPause,
    load,
    ready,
    play,
    pause,
    loading,
    playing,
  } = useAudioPlayer();
  console.log(data);

  const { title, audioUrl, imageUrl, body } =
    props.data.getMusicDocument.data ?? {};

  return (
    <PageContainer>
      <Flex gap={4} wrap="wrap" css={{}}>
        <Flex
          direction="column"
          gap={2}
          css={{ flex: "1 1 228px", "> p": { my: "0" } }}
        >
          <Box>
            <StyledPlayButton
              size={2}
              disabled={audioUrl === player?._src && loading}
              onClick={() => {
                if (audioUrl === player?._src) {
                  togglePlayPause();
                } else playTrack(audioUrl);
              }}
              css={
                audioUrl === player?._src && playing
                  ? {
                      bgc: "#18E27D",
                      boxShadow: "none",
                      "&:focus": {
                        boxShadow:
                          "inset 0 0 0 1px $colors$blue4, 0px 0px 0px 2px $colors$blue4",
                      },
                    }
                  : {}
              }
            >
              {audioUrl === player?._src && loading ? (
                <>
                  <Spinner /> HANG ON
                </>
              ) : audioUrl === player?._src && playing ? (
                <>
                  <FaPlay style={{ color: "" }} />
                  PAUSE
                </>
              ) : (
                <>
                  <FaPlay />
                  PLAY
                </>
              )}
            </StyledPlayButton>
          </Box>
          <Heading size="2">{title}</Heading>
          <TinaMarkdown content={body} />
        </Flex>
        <MusicImage src={imageUrl} />
      </Flex>
    </PageContainer>
  );
}

export const getStaticPaths = async () => {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.getMusicList({});

  const paths = tinaProps.data
    ? tinaProps.data.getMusicList?.edges?.map((x) => {
        return { params: { slug: x?.node?.sys.filename ?? "" } };
      })
    : [];

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async (ctx: any) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.getMusicDocument(variables);

  return {
    props: { ...tinaProps },
  };
};
