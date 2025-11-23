import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { decrement, increment, init, set } from "./counter.actions";
import { Injectable } from "@angular/core";
import { selectCount } from "./counter.selector";

@Injectable()
export class CounterEffects {
    loadCount = createEffect(() =>
        this.actions$.pipe(
            ofType(init),
            switchMap(() => {
                const storedCount = localStorage.getItem('counter');
                const count = storedCount ? parseInt(storedCount, 10) : 0;
                return of(set({ value: count }));
            })
        )
    );

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
    ) { }
}