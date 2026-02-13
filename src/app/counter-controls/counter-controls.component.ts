import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../counter-store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent {

  constructor(private store: Store<{ counter: number }>) { }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }
}
