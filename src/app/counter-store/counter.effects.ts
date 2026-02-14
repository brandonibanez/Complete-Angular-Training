import { Actions, createEffect, ofType } from "@ngrx/effects";
import { withLatestFrom, tap } from "rxjs";
import { increment, decrement } from "./counter.actions";
import { selectCount } from "./counter.selector";

export class CounterEffects {
    saveCount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(increment, decrement),
            tap((action) => {
                localStorage.setItem('count', action.amount.toString());
            })
        ), { dispatch: false }
    );

    constructor(private actions$: Actions, private store: any) { }
}