import { compose, createStore } from "redux";
import reducers from "./reducers";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers());

export const stateParser = (state) => JSON.parse(JSON.stringify(state));
