// export const increment = createAction(
//     '[Counter] Increment',
//     props<{ value: number }>()
// );

import { Action } from "@ngrx/store";

export const INCREMENT = '[Counter] Increment';

export class IncrementAction implements Action {
    readonly type = INCREMENT;
    constructor(public value: number) {}
}

export type CounterActions = IncrementAction;