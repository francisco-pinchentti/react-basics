import { createReducer, actionHandlers } from "./action-handlers";
import { initialState } from "./initial-state";

export const reducers = createReducer(initialState, actionHandlers);
