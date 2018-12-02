export const initialState = {
    books: [],
    lastUpdateTime: new Date(),
    requestStatus: {
        postNewBook: {
            pending: false,
            error: false
        },
        updateBook: {
            pending: false,
            error: false
        },
        deleteBook: {
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
        }
    }
}
