import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);

  increment() {
    this.counter.update(value => value + 1);
    this.actions.update(actions => [...actions, 'INCREMENT']);
  }

  decrement() {
    this.counter.update(value => value - 1);
    this.actions.update(actions => [...actions, 'DECREMENT']);
  }
}
