import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";
import theme from "./theme";
import MainRouter from "./MainRouter";
import store from "./store";

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
