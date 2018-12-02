import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers";

const store = createStore(
    combineReducers(reducers),
    compose(applyMiddleware(thunk))
);

export default store;
