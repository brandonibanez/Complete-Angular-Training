import { Component, ElementRef, Inject, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  
  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {
    
  }

  onAddTask(title: string, description: string) {
    this.formEl()?.nativeElement.reset();
    this.tasksService.addTask({title, description});
  }
}
