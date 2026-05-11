import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Test2Service {

    private val = signal('Test');
  
    candidate = this.val.asReadonly();
  
    getCurrentUserValue(): string {
      return this.val();
    }
  
    updateUser(val: string) {
      this.val.set(val);
    }
}
