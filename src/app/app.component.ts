import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, SignupComponent],
})
export class AppComponent {

  something = "LOLS"

  showSomething(val:any) {
    this.something = val;
    console.log(`From APP COMPONENT: ${val}`);
  }

}
