import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import * as actions from "../../src/redux/actions";
import DefaultStoreSchema from "../schemas/initial-schema";

import { TEST_BOOK_1, getNewStore } from "./setup";

const store = getNewStore();

describe('update a book action', () => {
    it('should update a given book', () => {
        return store
            .dispatch(actions.addBook(TEST_BOOK_1))
            .then(() => {
                const b = Object.assign({}, store.getState().books[0], {
                    title: "NEW TEST TITLE",
                    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                });
                return store
                    .dispatch(actions.updateBook(b))
                    .then(() => {
                        // match current state against a reduced json schema:
                        expect(store.getState()).toMatchSchema(DefaultStoreSchema);
                        // state should no longer be "loading":
                        expect(store.getState().requestStatus.putBook.pending).toBe(false);
                        expect(store.getState().requestStatus.putBook.error).toBe(false);
                        expect(store.getState().books.length).toBe(1);
                        expect(store.getState().books[0] === b);
                    });
            });
    });
});