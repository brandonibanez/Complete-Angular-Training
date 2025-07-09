import { Injectable } from '@angular/core';
import { type TaskData } from './individual-task/task.model';

@Injectable({providedIn: 'root'})
export class TaskService {
  private taskers = [
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

  getTasks(userId: string) {
    return this.taskers.filter((task) => task.userId === userId);
  }

  addTask(taskData: TaskData, userId: string) {
    this.taskers.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    // this.isAddingTask = false;
  }

  removeTask(taskId: string) {
    this.taskers = this.taskers.filter((task) => task.id !== taskId);
  }
}
