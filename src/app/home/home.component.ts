import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.subscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const customerObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
      }, 1000);
    });

    this.subscription = customerObservable.subscribe((count: number) => {
      console.log(count);
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
