import React from "react";
import { Container } from "~/design-system/react/container";

export const PageContainer = (
  props: React.ComponentProps<typeof Container>
) => (
  <Container
    size={2}
    {...props}
    css={{
      py: "$4",
      flex: "1 1 auto",
      minWidth: 200,
      overflowY: "auto",
      ...props.css,
    }}
  />
);
