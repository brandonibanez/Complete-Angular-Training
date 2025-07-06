import { Component, Input } from '@angular/core';
import { IndividualTask } from './individual-task/individual-task';

@Component({
  selector: 'app-task',
  imports: [IndividualTask],
  templateUrl: './task.html',
  styleUrl: './task.sass'
})
export class Task {
  @Input({required: true}) name!: string;
}
