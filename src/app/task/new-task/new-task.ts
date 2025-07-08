import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-task',
  imports: [],
  templateUrl: './new-task.html',
  styleUrl: './new-task.sass'
})
export class NewTask {
  @Output() cancel = new EventEmitter<void>();

  onCancelTask() {
    this.cancel.emit();
  }
}
