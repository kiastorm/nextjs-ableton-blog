import { Layout } from "~/components/layout/layout";
import { Container } from "~/design-system/react/container";
import { Heading } from "~/design-system/react/heading";
import DancingGirl from "~/projects/code/dancing_girl";

export default function DancingGirlPage({}) {
  return (
    <>
      <Container css={{ bgc: "$slate7", minHeight: "100%" }}>
        <Heading size="3" css={{ mb: "$4" }}>
          white background
        </Heading>
        <Heading size="2" css={{ mb: "$4" }}>
          looks okay?
        </Heading>
      </Container>
    </>
  );
}
