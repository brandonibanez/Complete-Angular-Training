import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { DUMMY_USERS } from './dummy-user';

const randomIndex = () => Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.sass'
})
export class User {
  @Input({required: true}) user!: {
    id: string;
    avatar: string;
    name: string;
  };
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  onSelectedUser() {
    this.select.emit(this.user.id);
  }
}
