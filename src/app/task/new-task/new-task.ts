import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type TaskData } from '../individual-task/task.model';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.sass'
})
export class NewTask {
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<TaskData>();
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  onCancelTask() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      date: this.enteredDate
    });
    this.enteredTitle = '';
    this.enteredSummary = '';
    this.enteredDate = '';
  }
}
