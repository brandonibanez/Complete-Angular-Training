import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { withLatestFrom, tap } from "rxjs";
import { decrement, increment } from "./counter.actions";

export class CounterEffects {
    saveCount = createEffect(() =>
        this.actions$.pipe(
            ofType(increment, decrement),
            tap((action) => {
                localStorage.setItem('count', action.value.toString());
            })
        ),
    { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store<{ counter: number }>
    ) {}
}