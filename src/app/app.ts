import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';
import { User } from "./user/user";
import { DUMMY_USERS } from "./user/dummy-user";
import { Task } from "./task/task";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, User, Task],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'Angular-App';
  user = DUMMY_USERS;
  selectedUser ?: string;

  onSelectedUser(id: string) {
    const foundUser = this.user.find(user => user.id === id);
    if (foundUser) {
      this.selectedUser = foundUser.name;
    }
  }
}
