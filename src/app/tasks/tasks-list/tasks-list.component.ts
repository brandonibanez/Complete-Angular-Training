import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  private tasksService = inject(TasksServiceToken);
  private selectedFilter = signal<string>('all');
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
    if(this.selectedFilter() === 'all') {
      return this.tasksService.allTasks();
    } else {
      return this.tasksService.allTasks().filter(task => task.status === this.selectedFilter())
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
