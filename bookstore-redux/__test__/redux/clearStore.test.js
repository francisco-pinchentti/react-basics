import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import * as actions from "../../src/redux/actions";
import DefaultStoreSchema from "../schemas/initial-schema";

import { TEST_BOOK_1, getNewStore } from "./setup";

const store = getNewStore();

describe('clear whole store action', () => {
    it('should clear the books collection', () => {
        return store
            .dispatch(actions.addBook(TEST_BOOK_1))
            .then(() => {
                return store
                    .dispatch(actions.clearStore())
                    .then(() => {
                        // match current state against a reduced json schema:
                        expect(store.getState()).toMatchSchema(DefaultStoreSchema);
                        // state should no longer be "loading":
                        expect(store.getState().requestStatus.clearStore.pending).toBe(false);
                        expect(store.getState().requestStatus.clearStore.error).toBe(false);
                        expect(store.getState().books.length).toBe(0);
                    });
            });
    });
});