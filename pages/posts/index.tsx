import { staticRequest } from "tinacms";
import { Layout } from "../../components/layout/layout";
import Link from "next/link";
import { useTina } from "tinacms/dist/edit-state";
import { PageContainer } from "~/components/page-container";

const query = `{
  getPostList{
    edges {
      node {
        id
        sys {
          filename
        }
      }
    }
  }
}`;

const Home = (props: any) => {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });
  const postsList = data.getPostList.edges;
  return (
    <PageContainer>
      <h1>Posts</h1>
      <div>
        {postsList.map((post: any) => (
          <div key={post.node.id}>
            <Link href={`/posts/${post.node.sys.filename}`}>
              <a>{post.node.sys.filename}</a>
            </Link>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Home;

export const getStaticProps = async () => {
  let data: any = {};
  const variables = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
