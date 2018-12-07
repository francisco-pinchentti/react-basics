import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import { booksStoreRootReducer } from "../../src/redux/reducers";

export const TEST_BOOK_1 = {
    id: '1',
    title: 'test book 1',
    isbn: 't1',
    summary: ''
}

export const getNewStore = () => createStore(booksStoreRootReducer, applyMiddleware(thunk));