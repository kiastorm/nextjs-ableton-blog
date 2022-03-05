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

const query = `query getPhoto($relativePath: String!) {
  getPhotoDocument(relativePath: $relativePath) {
    data {
      title
      photoCollectionUrl
      body
    }
  }
}
`;

const IconButton = styled("button", {
  border: "none",
  margin: "0",
  padding: "0",
  overflow: "visible",

  background: "transparent",

  color: "inherit",
  font: "inherit",

  lineHeight: "normal",

  maxHeight: "18px",
  // display: "inline-flex",
  alignItems: "center",
  flexBasis: "18px",
  width: "18px",
  height: "18px",
});

const StyledPlayIcon = styled(FaPlay, {
  width: "12px",
  height: "12px",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.2)",
  },

  variants: {
    variant: {
      paused: {
        color: "#000",
      },
      playing: {
        color: "#18E27D",
        "&:hover": {
          color: "#18E27D",
        },
      },
    },
  },
});

export default function Home(props: any) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  const { title, photoCollectionUrl, body } =
    data?.getPhotoDocument?.data ?? {};

  return (
    <PageContainer css={{ img: { mb: "$6" } }}>
      <Flex gap={2} align="center">
        <Heading size="4" css={{ mb: "$4" }}>
          {title}
        </Heading>
      </Flex>
      <Flex direction="column" align="stretch">
        <img src={`${photoCollectionUrl}/1.jpg`} />
        <img src={`${photoCollectionUrl}/2.jpg`} />
        <img src={`${photoCollectionUrl}/3.jpg`} />

        <img src={`${photoCollectionUrl}/6.jpg`} />
      </Flex>
    </PageContainer>
  );
}

export const getStaticPaths = async () => {
  const photoResponse = await staticRequest({
    query: `{
        getPhotoList{
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }`,
    variables: {},
  });
  const paths = (photoResponse as any).getPhotoList.edges.map((x: any) => {
    return { params: { slug: x.node.sys.filename } };
  });
  console.log(paths);

  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async (ctx: any) => {
  const variables = {
    relativePath: ctx.params.slug + ".mdx",
  };
  let data: any = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch (error) {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      variables,
    },
  };
};
