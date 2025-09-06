import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(`Clicked Button ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map((val) => val*2)
    // ).subscribe({
    //   next: (val) => this.displaySomething(val)
    // });

    // this.destroyRef.onDestroy( () => {
    //   subscription.unsubscribe();
    // });
  }

  displaySomething(val: any): void {
    console.log(val);
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }

}