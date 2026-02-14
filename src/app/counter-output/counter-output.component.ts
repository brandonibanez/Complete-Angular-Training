import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCount, selectDoubleCount } from '../counter-store/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent {
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.count$ = this.store.select(selectCount);
    this.doubleCount$ = this.store.select(selectDoubleCount);
  }
}
