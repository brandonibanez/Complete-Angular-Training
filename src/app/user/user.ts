import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { DUMMY_USERS } from './dummy-user';

interface Users {
  id: string;
  name: string;
  avatar: string;
};

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.sass'
})
export class User {
  @Input({required: true}) user!: Users ;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  onSelectedUser() {
    this.select.emit(this.user.id);
  }
}
