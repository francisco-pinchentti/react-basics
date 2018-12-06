import { Book } from 'src/model/Book';

export interface ReduxAction {
    type: string,
    args?: any
}

export interface ReduxThunkAction {
    (dispatch: Function): any
}

export interface StoreState {
    books: Book[],
    lastUpdateTime: Date,
    requestStatus: any
}

