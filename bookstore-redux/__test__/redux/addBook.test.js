import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import * as actions from "../../src/redux/actions";
import DefaultStoreSchema from "../schemas/initial-schema";

import { TEST_BOOK_1, getNewStore } from "./setup";

const store = getNewStore();
const initialTimeStamp = store.getState().lastUpdateTime.getTime();

describe('create a book action', () => {
    it('should add a single book to the books collection', () => {
        return store
            .dispatch(actions.addBook(TEST_BOOK_1))
            .then(() => {
                // match current state against a reduced json schema:
                expect(store.getState()).toMatchSchema(DefaultStoreSchema);
                // state should no longer be "loading":
                expect(store.getState().requestStatus.postBook.pending).toBe(false);
                expect(store.getState().requestStatus.postBook.error).toBe(false);
                expect(store.getState().books.length).toBe(1);
                expect(store.getState().lastUpdateTime.getTime()).toBeGreaterThan(initialTimeStamp);
            });
    });
});