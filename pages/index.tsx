import { staticRequest, useCMS } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/layout/layout";
import { useTina } from "tinacms/dist/edit-state";
import { PageContainer } from "~/components/page-container";
import {
  ExperimentalGetTinaClient,
  Requester,
} from "~/.tina/__generated__/types";

export const getStaticProps = async () => {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.getPageDocument({
    relativePath: "home.mdx",
  });

  return {
    props: {
      ...tinaProps,
    },
  };
};

function Home(props: any) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const tina = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  // const cms = useCMS();

  const content = tina.data?.getPageDocument?.data.body ?? "";
  return (
    <PageContainer>
      <TinaMarkdown content={content} />
    </PageContainer>
  );
}

export default Home;
