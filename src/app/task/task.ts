import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.sass'
})
export class Task {
  @Input({required: true}) name!: string;
}
