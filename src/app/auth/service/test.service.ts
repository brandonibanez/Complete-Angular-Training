import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private val = new BehaviorSubject<string>('Test');

  candidate$ = this.val.asObservable();

  getCurrentUserValue(): string {
    return this.val.getValue();
  }

  updateUser(val: string) {
    this.val.next(val);
  }
}
