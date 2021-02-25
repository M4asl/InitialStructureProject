import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

// modules for server side rendering
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheets } from "@material-ui/core";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import MainRouter from "../client/MainRouter";
import Template from "./template";
import createStore from "./helpers/createStore";
import theme from "../client/theme";

// modules for server
import globalErrorHandler from "./helpers/dbErrorHandler";

// comment out before building for production
import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// comment out before building for production
devBundle.compile(app);

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// mount routes

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const store = createStore();
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MainRouter />
          </ThemeProvider>
        </Provider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup,
      css,
      store,
    })
  );
});

app.use(globalErrorHandler);

export default app;
