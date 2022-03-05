import { Layout } from "~/components/layout/layout";
import { Container } from "~/design-system/react/container";
import { Heading } from "~/design-system/react/heading";
import DancingGirl from "~/projects/code/dancing_girl";

export default function DancingGirlPage() {
  return (
    <>
      <Container>
        <Heading size="4" css={{ mb: "$4" }}>
          dancing_girl
        </Heading>
      </Container>
      <DancingGirl />
    </>
  );
}
