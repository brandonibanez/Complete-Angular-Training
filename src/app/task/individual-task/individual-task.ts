import { Component, Input } from '@angular/core';

import { Task } from './task.model';

@Component({
  selector: 'app-individual-task',
  imports: [],
  templateUrl: './individual-task.html',
  styleUrl: './individual-task.sass'
})
export class IndividualTask {
  @Input({required: true}) task!: Task;
}
