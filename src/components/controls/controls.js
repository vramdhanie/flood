import useColours from "../../hooks/colours";
import { Grid, Button } from "@chakra-ui/react";

const Controls = ({ n, setCurrentColour }) => {
  const colours = useColours(n);
  return (
    <Grid w="300px" mt="2" templateColumns={`repeat(${n / 2}, 1fr)`}>
      {colours.map((colour) => (
        <Button
          key={colour}
          bg={colour}
          color={colour}
          w="full"
          h="full"
          borderRadius={0}
          border="none"
          onClick={() => setCurrentColour(colour)}
        >
          {" . "}
        </Button>
      ))}
    </Grid>
  );
};

export default Controls;
