import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';

import { booksStoreRootReducer } from "./reducers";

const store = createStore(
    booksStoreRootReducer,
    compose(applyMiddleware(thunk, logger))
);

export default store;
