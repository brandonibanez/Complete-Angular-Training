import { Component, computed, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-user';

const randomIndex = () => Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.sass'
})
export class User {
  selectedUser = signal(DUMMY_USERS[randomIndex()]);
  imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);

  changeUser() {
    this.selectedUser.set(DUMMY_USERS[randomIndex()]);
  }
}
