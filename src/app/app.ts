import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { User } from "./user/user";
import { DUMMY_USERS } from "./user/dummy-user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, User],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'Angular-App';
  user = DUMMY_USERS;
}
