import { staticRequest, useCMS } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/layout/layout";
import { useTina } from "tinacms/dist/edit-state";
import { PageContainer } from "~/components/page-container";
import { TextField } from "~/design-system/react/text-field";
import { Label } from "~/design-system/react/label";
import { Heading } from "~/design-system/react/heading";

const query = `{
  getPageDocument(relativePath: "contact.mdx"){
    data{
      body
    }
  }
}`;

export async function getStaticProps() {
  const variables = {};
  let data: any = {};
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
}

function Home(props: any) {
  const tina = useTina({
    query,
    variables: {},
    data: props.data,
  });
  // const cms = useCMS();

  return (
    <PageContainer
      css={{
        "[role=label]": { fontWeight: 500, mb: "$1" },
        input: { mb: "$3" },
      }}
    >
      <TinaMarkdown content={tina.data?.getPageDocument.data.body} />
      <Label>Name</Label>
      <TextField />
      <Label>Email</Label>
      <TextField />
      <Label>Message</Label>
      <TextField as="textarea" />
    </PageContainer>
  );
}

export default Home;
