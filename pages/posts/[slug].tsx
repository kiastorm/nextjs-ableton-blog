import { staticRequest } from "tinacms";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PageContainer } from "~/components/page-container";
import { Heading } from "~/design-system/react/heading";

const query = `query getPost($relativePath: String!) {
  getPostDocument(relativePath: $relativePath) {
    data {
      title
      body
    }
  }
}
`;

export default function Home(props: any) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  const { title, body } = data?.getPostDocument?.data ?? {};
  console.log(body);

  return (
    <PageContainer>
      <Heading>{title}</Heading>
      <TinaMarkdown content={body} />
    </PageContainer>
  );
}

export const getStaticPaths = async () => {
  const postsResponse = await staticRequest({
    query: `{
        getPostList{
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
  const paths = (postsResponse as any).getPostList.edges.map((x: any) => {
    return { params: { slug: x.node.sys.filename } };
  });

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
