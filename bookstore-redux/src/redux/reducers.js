import { actionTypes } from './action-types';
import { initialState } from './initial-state';
import { SAMPLEBOOK } from '../services/BooksService';

function requestStatus(state = {}, action ) {
    const _updatedStatus = Object.assign({}, state);
    switch (action.type) {
        case actionTypes.requestPending:
            _updatedStatus[action.args.source] = {
                pending: true,
                error: false
            }
            return _updatedStatus;
        case actionTypes.requestFinished:
            _updatedStatus[action.args.source] = {
                pending: false,
                error: action.args.status !== 'ok'
            }
            return _updatedStatus;
        default:
            return state;
    }
}

function books(state = [], action) {
    switch (action.type) {
        case actionTypes.addBook:
            return state.concat([action.args]);
        case actionTypes.getBooks:
            return action.args.books;
        case actionTypes.deleteBook:
            return state.filter( b => b.id !== action.args.id);
        case actionTypes.updateBook:
            // remove outdated instance:
            const books = state.filter(b => b.id !== action.args.id);
            return books.concat([action.args]);
        case actionTypes.refreshState:
            return [ SAMPLEBOOK ];
        case actionTypes.clearStore:
            return [];
        default:
            return state;
    }
}

function lastUpdateTime(state = new Date(), action) {
    switch (action.type) {
        case actionTypes.updateTimestamp:
            return new Date();
        default:
            return state;
    }
}

/**
 * Reduces all store properties
 * @see: note that this boilerplate code is mostly replaced with more generic functions like combineReducers()
 * 
 * @param {object} [state=initialState]
 * @param {object} action
 * @param {object} action.type
 * @param {object} action.args
 */
function booksStoreRootReducer(state = initialState, action) {
    return {
        books: books(state.books, action),
        requestStatus: requestStatus(state.requestStatus, action),
        lastUpdateTime: lastUpdateTime(state.lastUpdateTime, action)
    }
}

export {
    booksStoreRootReducer
}