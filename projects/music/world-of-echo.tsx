import { FC } from "react";
import { Box } from "~/design-system/react/box";
import { Container } from "~/design-system/react/container";

const MusicPostLayout: FC<{}> = ({ children, ...rest }) => {
  return (
    <Container
      size="3"
      css={{ py: "$4", flex: "1 1 auto", minWidth: 200, overflowY: "auto" }}
    >
      {children}
    </Container>
  );
};
export const WorldOfEcho = () => {
  return (
    <MusicPostLayout>
      helloo
      <Box>Hle</Box>
    </MusicPostLayout>
  );
};
