import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Test2Service {

    private val = signal<string>('');
  
    candidate = this.val.asReadonly();
  
    updateUser(val: string) {
      this.val.set(val);
    }
}
