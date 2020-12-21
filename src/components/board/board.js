import React from "react";
import { Grid, Center } from "@chakra-ui/react";

import Controls from "../controls/controls";

const Board = ({ setCurrentColour, children }) => {
  return (
    <Center w="full" height="100vh" flexDirection="column">
      <Grid w={300} h={300} gridTemplateColumns="repeat(30, 1fr)">
        {children}
      </Grid>
      <Controls n={6} setCurrentColour={setCurrentColour} />
    </Center>
  );
};

export default Board;
