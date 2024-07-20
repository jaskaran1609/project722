import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    green: {
      main: "#8bc34a",
      idle: "#6a9739"
    },
    grey: {
      main: "#333333",
    },
    primary: {
      main: "#8bc34a"
    },
  },
  typography: {
    h1: {
      fontSize: "52px",
      fontFamily: ["Merriweather", "serif"].join(","),
      fontWeight: 700,
    },
    h2: {
      fontSize: "34px",
      fontFamily: ["Merriweather", "serif"].join(","),
      fontWeight: 700,
    },
    h3: {
      fontSize: "24px",
      fontFamily: ["Merriweather", "serif"].join(","),
      fontWeight: 700,
    },
    h4: {
      fontSize: "20px",
      fontFamily: ["Merriweather", "serif"].join(","),
      fontWeight: 700,
    },
    h5: {
      fontSize: "17px",
      fontFamily: ["Merriweather", "serif"].join(","),
      fontWeight: 700,
    },
    h6: {
      fontSize: "16px",
      fontFamily: ["Merriweather", "serif"].join(","),
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: 400,
    },
    body2: {
      fontSize: "13.6px",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: 400,
      marginBottom: "7px",
      color: "#333"
    },
    subtitle1: {
      fontSize: "16px",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "14px",
      lineHeight: "1",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: 400,
    },
  },
});

export default theme
