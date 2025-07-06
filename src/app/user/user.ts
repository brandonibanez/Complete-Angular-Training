import { Component, computed, Input, signal } from '@angular/core';
import { DUMMY_USERS } from './dummy-user';

const randomIndex = () => Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.sass'
})
export class User {
  @Input() avatar!: string;
  @Input() name!: string;
  // selectedUser = signal(DUMMY_USERS[randomIndex()]);
  // imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);

  get imagePath() {
    return `assets/users/${this.avatar}`;
  }
}
