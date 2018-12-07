import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import * as actions from "../../src/redux/actions";
import DefaultStoreSchema from "../schemas/initial-schema";

import { TEST_BOOK_1, getNewStore } from "./setup";

const store = getNewStore();

describe('delete a book action', () => {

    it('should delete a given book', () => {
        return store.dispatch(actions.addBook(TEST_BOOK_1))
            .then(() => {
                return store
                    .dispatch(actions.removeBook(store.getState().books[0]))
                    .then(() => {
                        // match current state against a reduced json schema:
                        expect(store.getState()).toMatchSchema(DefaultStoreSchema);
                        // state should no longer be "loading":
                        expect(store.getState().requestStatus.delBook.pending).toBe(false);
                        expect(store.getState().requestStatus.delBook.error).toBe(false);
                        expect(store.getState().books.length).toBe(0);
                    });
            });
    });
});
