import { Component, Input } from '@angular/core';

interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}

@Component({
  selector: 'app-individual-task',
  imports: [],
  templateUrl: './individual-task.html',
  styleUrl: './individual-task.sass'
})
export class IndividualTask {
  @Input({required: true}) task!: Task;
}
