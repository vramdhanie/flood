import React from "react";
import { Grid, Center } from "@chakra-ui/react";
import Cell from "../cell/cell";

const Board = ({ cells }) => {
  return (
    <Center w="full" height="100vh">
      <Grid w={400} h={400} gridTemplateColumns="repeat(40, 1fr)">
        {cells.map((cell) => (
          <Cell key={cell.id} {...cell} />
        ))}
      </Grid>
    </Center>
  );
};

export default Board;
