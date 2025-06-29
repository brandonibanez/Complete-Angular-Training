import { Component } from '@angular/core';
import { DUMMY_USERS } from './dummy-user';

const randomIndex = () => Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.sass'
})
export class User {
  selectedUser = DUMMY_USERS[randomIndex()];

  changeUser() {
    this.selectedUser = DUMMY_USERS[randomIndex()];
  }
}
