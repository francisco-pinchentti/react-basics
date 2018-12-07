import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import * as actions from "../../src/redux/actions";
import DefaultStoreSchema from "../schemas/initial-schema";

import { getNewStore } from "./setup";
import { SAMPLEBOOK } from "../../src/services/BooksService";

const store = getNewStore();

describe('refresh store action', () => {
    it('should leave a single sample book on the store', () => {
        return store
            .dispatch(actions.refreshStore())
            .then(() => {
                // match current state against a reduced json schema:
                expect(store.getState()).toMatchSchema(DefaultStoreSchema);
                // state should no longer be "loading":
                expect(store.getState().requestStatus.loadSampleData.pending).toBe(false);
                expect(store.getState().requestStatus.loadSampleData.error).toBe(false);
                expect(store.getState().books.length).toBe(1);
                expect(store.getState().books[0].title === SAMPLEBOOK.title);
                expect(store.getState().books[0].summary === SAMPLEBOOK.summary);
                expect(store.getState().books[0].isbn === SAMPLEBOOK.isbn);
            });
    });
});