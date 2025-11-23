import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap, withLatestFrom } from "rxjs";
import { decrement, increment } from "./counter.actions";
import { Injectable } from "@angular/core";
import { selectCount } from "./counter.selector";

@Injectable()
export class CounterEffects {
    saveCount = createEffect(() =>
        this.actions$.pipe(
            ofType(increment, decrement),
            withLatestFrom(this.store.select(selectCount)),
            tap(([action, count]) => {
                localStorage.setItem('counter', count.toString());
            })
        ),
    { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store<{ counter: number }>
    ) {}
}