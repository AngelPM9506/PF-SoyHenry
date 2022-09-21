import { AvatarGroup, extendTheme } from "@chakra-ui/react";

export const myTheme = extendTheme({
  colors: {
    primary: "#293541",
    secondary: "#4b647c",
    highlight: "#02b1b1",
    background: "#D1DFE3",
    danger: "#F3B46F",

    components: {
      AvatarGroup: {
        variants: {
          _hover: {
            _hover: { max: 20 },
          },
        },
      },
    },
  },
});

export default myTheme;
