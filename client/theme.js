import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#a6d4fa",
      main: "#90caf9",
      dark: "#648dae",
      constrastText: "#000",
    },
    secondary: {
      light: "#f6a5c0",
      main: "#f48fb1",
      dark: "#aa647b",
      contrastText: "#fff",
    },
    openTitle: "#3f4771",

    type: "light",
  },
});

export default theme;
