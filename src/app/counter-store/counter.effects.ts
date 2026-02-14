import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, withLatestFrom } from "rxjs";
import { increment, decrement } from "./counter.actions";
import { Injectable } from "@angular/core";
import { selectCount } from "./counter.selector";
import { Store } from "@ngrx/store";

@Injectable()
export class CounterEffects {
    saveCount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(increment, decrement),
            withLatestFrom(this.store.select(selectCount)),
            tap(([action, count]) => {
                localStorage.setItem('count', count.toString());
            })
        ), { dispatch: false }
    );

    constructor(private actions$: Actions, private store: Store<{ counter: number }>) { }
}
