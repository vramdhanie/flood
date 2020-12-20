import { extendTheme } from "@chakra-ui/react";

const colours = {
  board: {
    900: "#BBBBBB",
    800: "#999999",
  },
  cell: {
    0: "#0000FF",
    1: "#FF0000",
    2: "#00FF00",
    3: "#FFFF00",
    4: "#00FFFF",
    5: "#5D0016",
    6: "#FF007F",
    7: "#008000",
  },
};

const theme = extendTheme({ colors: colours });

export default theme;
