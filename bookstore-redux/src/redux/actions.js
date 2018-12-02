import { actionTypes } from "./action-types";
import { saveBook } from "../services/BooksService";

/**
 * We'll use this action to flag the store as busy while an async op is in progress
 * @param {Object} args
 * @param {string} args.source Usually the redux action that triggered this request
 * @param {Object} [args.payload] The original request payload
 */
function requestPending(args) {
    return {
        type: actionTypes.requestPending,
        args
    }
}

/**
 * 
 * @param {Object} args
 * @param {string} args.source Usually the redux action that triggered the initial request
 * @param {Object} [args.payload] The original request payload
 * @param {string} args.status Either 'ok' or 'error'
 */
function requestFinished(args) {
    return {
        type: actionTypes.requestFinished,
        args
    }
}

function addBook(args) {
    return {
        type: actionTypes.addBook,
        args
    }
}

function postNewBook(book) {
    const actionMetadata = {
        source: 'postNewBook',
        payload: book
    };

    return function(dispatch) {
        dispatch(requestPending(actionMetadata));
        return saveBook(book).then( result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok'}));
            dispatch(addBook(book));
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

export {
    postNewBook,
    // getBooks,
    // deleteBook,
    // clearStore,
    // refreshStore
}