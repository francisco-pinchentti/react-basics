import { StoreState } from './interfaces';

export const initialState : StoreState = {
    books: [],
    lastUpdateTime: new Date(),
    requestStatus: {
        postBook: {
            pending: false,
            error: false
        },
        putBook: {
            pending: false,
            error: false
        },
        delBook: {
            pending: false,
            error: false
        },
        getBooks: {
            pending: false,
            error: false
        },
        clearStore: {
            pending: false,
            error: false
        },
        loadSampleData: {
            pending: false,
            error: false
        }
    }
};
