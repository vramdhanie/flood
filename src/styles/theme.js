import { extendTheme } from "@chakra-ui/react";

const colours = {
  board: {
    900: "#BBBBBB",
    800: "#999999",
  },
  cell: {
    0: "#FF0000",
    1: "#191970",
    2: "#006400",
    3: "#ffd700",
    4: "#00ff00",
    5: "#1e90ff",
    6: "#c71585",
    7: "#ffb6c1",
  },
};

const theme = extendTheme({ colors: colours });

export default theme;
