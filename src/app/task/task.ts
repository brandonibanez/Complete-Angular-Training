import { Component, Input } from '@angular/core';
import { IndividualTask } from './individual-task/individual-task';

@Component({
  selector: 'app-task',
  imports: [IndividualTask],
  templateUrl: './task.html',
  styleUrl: './task.sass',
})
export class Task {
  @Input({required:true}) userId!: string;
  @Input({required:true}) name!: string;

  taskers = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary: 'Learn Angular from scratch',
      dueDate: '2025-09-01',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ];

  get selectedUserTask() {
    return this.taskers.filter((task) => task.userId === this.userId);
  }
}
