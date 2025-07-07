import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { DUMMY_USERS } from './dummy-user';
import { Users } from './user.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.sass'
})
export class User {
  @Input({required: true}) user!: Users ;
  @Input({required:true}) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  onSelectedUser() {
    this.select.emit(this.user.id);
  }
}
