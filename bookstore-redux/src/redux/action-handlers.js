import { actionTypes } from './action-types';

/**
 *  Helper function for avoiding switch() statements (commonly viewed
 * as a code smell) in reducers:
 */
export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
}

// function onRequestPending(state = {}, action) {
//     switch (action.type) {
//         case actionTypes.requestPending:
//             const requestStatus = { ...state.status };
//             requestStatus[action.args.source] = {
//                 pending: true,
//                 error: false
//             }
//             return { ...state, requestStatus };
//         default:
//             return state;
//     }
// }

// function onRequestFinished(state = {}, action) {
//     switch (action.type) {
//         case actionTypes.requestFinished:
//             const requestStatus = { ...state.status };
//             requestStatus[action.args.source] = {
//                 pending: false,
//                 error: action.args.status !== 'ok'
//             }
//             return { ...state, requestStatus };
//         default:
//             return state;
//     }
// }

export const actionHandlers = {
    [actionTypes.addBook](state, action) {
        const books = state.books.concat([action.args]);
        return { ...state, books };
    },
    [actionTypes.requestPending](state,action) {
        const requestStatus = Object.assign({}, state.requestStatus);
        requestStatus[action.args.source] = {
            pending: true,
            error: false
        }
        return { ...state, requestStatus };
    },
    [actionTypes.requestFinished](state,action) {
        const requestStatus = Object.assign({}, state.requestStatus);
        requestStatus[action.args.source] = {
            pending: false,
            error: action.args.status !== 'ok'
        }
        return { ...state, requestStatus };
    }
}
