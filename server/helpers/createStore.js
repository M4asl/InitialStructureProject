import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../../client/reducers/index";

const middleware = [thunk];

export default () => {
  const store = createStore(
    reducers,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return store;
};
