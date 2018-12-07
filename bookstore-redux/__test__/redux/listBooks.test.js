import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import * as actions from "../../src/redux/actions";
import DefaultStoreSchema from "../schemas/initial-schema";

import { getNewStore } from "./setup";

const store = getNewStore();

describe('list books action', () => {
    it('should return the books collection', () => {

        Promise.all([
            store.dispatch(actions.addBook({ title: 'test b1', summary: 'a', isbn: 'sd54s5a' })),
            store.dispatch(actions.addBook({ title: 'test b2', summary: 'b', isbn: 'jg3h1' })),
            store.dispatch(actions.addBook({ title: 'test b3', summary: 'c', isbn: 'rty32y' })),
            store.dispatch(actions.addBook({ title: 'test b4', summary: 'd', isbn: 'g1r5gr' })),
        ])
            .then(() => {
                return store
                    .dispatch(actions.listBooks())
                    .then((books) => {
                        // match current state against a reduced json schema:
                        expect(store.getState()).toMatchSchema(DefaultStoreSchema);
                        // state should no longer be "loading":
                        expect(store.getState().requestStatus.postBook.pending).toBe(false);
                        expect(store.getState().requestStatus.postBook.error).toBe(false);
                        expect(store.getState().requestStatus.getBooks.pending).toBe(false);
                        expect(store.getState().requestStatus.getBooks.error).toBe(false);
                        expect(books.find(b => b.title === 'test b1')).toBeDefined();
                        expect(books.find(b => b.title === 'test b2')).toBeDefined();
                        expect(books.find(b => b.title === 'test b3')).toBeDefined();
                        expect(books.find(b => b.title === 'test b4')).toBeDefined();
                        expect(books.length).toBe(4);
                    });
            });
    });
});