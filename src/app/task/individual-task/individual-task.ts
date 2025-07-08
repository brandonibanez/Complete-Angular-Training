import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from './task.model';

@Component({
  selector: 'app-individual-task',
  imports: [],
  templateUrl: './individual-task.html',
  styleUrl: './individual-task.sass'
})
export class IndividualTask {
  @Input({required: true}) task!: Task;
  @Output() complete = new EventEmitter<string>();

  onCompleteTask() {
    this.complete.emit(this.task.id);
  }
}
