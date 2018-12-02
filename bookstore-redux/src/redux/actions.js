import { actionTypes } from "./action-types";
import { postBook, getBooks, delBook, putBook, loadSampleData, clearBooks } from "../services/BooksService";

/**
 * We'll use this action to flag the store as busy while an async op is in progress
 * 
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
 * We'll use this action to indicate that a pending async operation has finished
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

function doUpdateTimestamp() {
    return {
        type: actionTypes.updateTimestamp
    }
}

function doAddBook(args) {
    return {
        type: actionTypes.addBook,
        args
    }
}

function addBook(book) {
    const actionMetadata = {
        source: 'postBook',
        payload: book
    };

    return function(dispatch) {
        dispatch(requestPending(actionMetadata));
        return postBook(book).then( result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok'}));
            dispatch(doAddBook(result));
            dispatch(doUpdateTimestamp());
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

function updateBookList(args) {
    return {
        type: actionTypes.getBooks,
        args
    }
}

function listBooks(book) {
    const actionMetadata = {
        source: 'getBooks',
        payload: book
    };

    return function (dispatch) {
        dispatch(requestPending(actionMetadata));
        return getBooks().then(result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok' }));
            dispatch(updateBookList(result));
            dispatch(doUpdateTimestamp());
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

function doRemoveBook(args) {
    return {
        type: actionTypes.deleteBook,
        args
    }
}

function removeBook(book) {
    const actionMetadata = {
        source: 'delBook',
        payload: book
    };

    return function (dispatch) {
        dispatch(requestPending(actionMetadata));
        return delBook(book).then(result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok' }));
            dispatch(doRemoveBook(book));
            dispatch(doUpdateTimestamp());
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

function doUpdateBook(args) {
    return {
        type: actionTypes.updateBook,
        args
    }
}

function updateBook(book) {
    const actionMetadata = {
        source: 'putBook',
        payload: book
    };

    return function (dispatch) {
        dispatch(requestPending(actionMetadata));
        return putBook(book).then(result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok' }));
            dispatch(doUpdateBook(book));
            dispatch(doUpdateTimestamp());
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

function doClearStore(args) {
    return {
        type: actionTypes.clearStore,
        args
    }
}

function clearStore() {
    const actionMetadata = {
        source: 'clearStore'
    };

    return function (dispatch) {
        dispatch(requestPending(actionMetadata));
        return clearBooks().then(result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok' }));
            dispatch(doClearStore());
            dispatch(doUpdateTimestamp());
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

function doRefreshStore(args) {
    return {
        type: actionTypes.refreshState,
        args
    }
}

function refreshStore() {
    const actionMetadata = {
        source: 'loadSampleData'
    };

    return function (dispatch) {
        dispatch(requestPending(actionMetadata));
        return loadSampleData().then(result => {
            dispatch(requestFinished({ ...actionMetadata, status: 'ok' }));
            dispatch(doRefreshStore());
            dispatch(doUpdateTimestamp());
            return result;
        }, reason => {
            dispatch(requestFinished({ ...actionMetadata, status: 'error' }));
            return reason;
        });
    }
}

export {
    addBook,
    listBooks,
    removeBook,
    updateBook,
    clearStore,
    refreshStore
}