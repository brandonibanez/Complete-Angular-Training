import { Action, createReducer, on } from "@ngrx/store";
import { decrement, increment } from "./counter.actions";
// import { Increment, Decrement, CounterActions, INCREMENT, DECREMENT } from "./counter.actions";

const initialState = 0;

// export const counterReducer = createReducer(
//     initialState,
//     on(increment, (state, { amount }) => state + amount),
//     on(decrement, state => state - 1)
// );

export function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case increment.type:
            return state + action.amount;
        case decrement.type:
            return state - 1;
        default:
            return state;
    }
}