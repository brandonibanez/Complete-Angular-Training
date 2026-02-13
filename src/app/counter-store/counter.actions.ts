import { Action, createAction, props } from "@ngrx/store";

export const increment = createAction('[Counter] Increment', props<{ amount: number }>());
export const decrement = createAction('[Counter] Decrement');

// export const INCREMENT = '[Counter] Increment';
// export const DECREMENT = '[Counter] Decrement';

// export class Increment implements Action {
//     readonly type = INCREMENT;
//     constructor(public amount: number) { }
// }

// export class Decrement implements Action {
//     readonly type = DECREMENT;
//     constructor() { }
// }

// export type CounterActions = Increment | Decrement;