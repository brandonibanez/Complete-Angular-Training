import { Component, Input } from '@angular/core';
import { IndividualTask } from './individual-task/individual-task';
import { NewTask } from './new-task/new-task';
import { TaskData } from './individual-task/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  imports: [IndividualTask, NewTask],
  templateUrl: './task.html',
  styleUrl: './task.sass',
})
export class Task {
  @Input({required:true}) userId!: string;
  @Input({required:true}) name!: string;
  isAddingTask = false;
  
  constructor(private tasksService: TaskService) {}

  get selectedUserTask() {
    return this.tasksService.getTasks(this.userId);
  }

  onCompleteTask(taskId: string) {
    this.tasksService.removeTask(taskId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCancelAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(taskData: TaskData) {
    this.tasksService.addTask(taskData, this.userId);
    this.isAddingTask = false;
  }
}
