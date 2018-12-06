import { actionTypes } from "./action-types";
import { postBook, getBooks, delBook, putBook, loadSampleData, clearBooks } from "../services/BooksService";
import { Book } from 'src/model/Book';
import { ReduxAction, ReduxThunkAction } from './interfaces';

interface RequestPendingArgs {
    source: string,
    payload?: any
}

interface RequestFinishedArgs {
    source: string,
    payload?: any,
    status: string
}

/**
 * We'll use this action to flag the store as busy while an async op is in progress
 *
 * @param {Object} args
 * @param {string} args.source Usually the redux action that triggered this request
 * @param {Object} [args.payload] The original request payload
 */
function requestPending(args: RequestPendingArgs): ReduxAction {
    return {
        type: actionTypes.requestPending,
        args
    };
}

/**
 * We'll use this action to indicate that a pending async operation has finished
 *
 * @param {Object} args
 * @param {string} args.source Usually the redux action that triggered the initial request
 * @param {Object} [args.payload] The original request payload
 * @param {string} args.status Either 'ok' or 'error'
 */
function requestFinished(args: RequestFinishedArgs): ReduxAction {
    return {
        type: actionTypes.requestFinished,
        args
    };
}

function doUpdateTimestamp(): ReduxAction {
    return {
        type: actionTypes.updateTimestamp
    };
}

function doAddBook(args: Book): ReduxAction {
    return {
        type: actionTypes.addBook,
        args
    };
}

function addBook(book: Book) {
    const actionMetadata = {
        source: "postBook",
        payload: book
    };

    return function (dispatch: Function) {
        dispatch(requestPending(actionMetadata));
        return postBook(book).then(
            result => {
                dispatch(requestFinished({ ...actionMetadata, status: "ok" }));
                dispatch(doAddBook(result));
                dispatch(doUpdateTimestamp());
                return result;
            },
            reason => {
                dispatch(requestFinished({ ...actionMetadata, status: "error" }));
                return reason;
            }
        );
    };
}

function updateBookList(args: Book[]): ReduxAction {
    return {
        type: actionTypes.getBooks,
        args
    };
}

function listBooks(): ReduxThunkAction {
    const actionMetadata = {
        source: "getBooks"
    };

    return function (dispatch: Function) {
        dispatch(requestPending(actionMetadata));
        return getBooks().then(
            result => {
                dispatch(requestFinished({ ...actionMetadata, status: "ok" }));
                dispatch(updateBookList(result));
                dispatch(doUpdateTimestamp());
                return result;
            },
            reason => {
                dispatch(requestFinished({ ...actionMetadata, status: "error" }));
                return reason;
            }
        );
    };
}

function doRemoveBook(args: Book): ReduxAction {
    return {
        type: actionTypes.deleteBook,
        args
    };
}

function removeBook(book: Book): ReduxThunkAction {
    const actionMetadata = {
        source: "delBook",
        payload: book
    };

    return function (dispatch: Function) {
        dispatch(requestPending(actionMetadata));
        return delBook(book).then(
            result => {
                dispatch(requestFinished({ ...actionMetadata, status: "ok" }));
                dispatch(doRemoveBook(book));
                dispatch(doUpdateTimestamp());
                return result;
            },
            reason => {
                dispatch(requestFinished({ ...actionMetadata, status: "error" }));
                return reason;
            }
        );
    };
}

function doUpdateBook(args: Book): ReduxAction {
    return {
        type: actionTypes.updateBook,
        args
    };
}

function updateBook(book: Book): ReduxThunkAction {
    const actionMetadata = {
        source: "putBook",
        payload: book
    };

    return function (dispatch: Function) {
        dispatch(requestPending(actionMetadata));
        return putBook(book).then(
            result => {
                dispatch(requestFinished({ ...actionMetadata, status: "ok" }));
                dispatch(doUpdateBook(book));
                dispatch(doUpdateTimestamp());
                return result;
            },
            reason => {
                dispatch(requestFinished({ ...actionMetadata, status: "error" }));
                return reason;
            }
        );
    };
}

function doClearStore(): ReduxAction {
    return {
        type: actionTypes.clearStore
    };
}

function clearStore(): ReduxThunkAction {
    const actionMetadata = {
        source: "clearStore"
    };

    return function (dispatch: Function) {
        dispatch(requestPending(actionMetadata));
        return clearBooks().then(
            result => {
                dispatch(requestFinished({ ...actionMetadata, status: "ok" }));
                dispatch(doClearStore());
                dispatch(doUpdateTimestamp());
                return result;
            },
            reason => {
                dispatch(requestFinished({ ...actionMetadata, status: "error" }));
                return reason;
            }
        );
    };
}

function doRefreshStore(): ReduxAction {
    return {
        type: actionTypes.refreshState
    };
}

function refreshStore(): ReduxThunkAction {
    const actionMetadata = {
        source: "loadSampleData"
    };

    return function (dispatch: Function) {
        dispatch(requestPending(actionMetadata));
        return loadSampleData().then(
            result => {
                dispatch(requestFinished({ ...actionMetadata, status: "ok" }));
                dispatch(doRefreshStore());
                dispatch(doUpdateTimestamp());
                return result;
            },
            reason => {
                dispatch(requestFinished({ ...actionMetadata, status: "error" }));
                return reason;
            }
        );
    };
}

export { addBook, listBooks, removeBook, updateBook, clearStore, refreshStore };
