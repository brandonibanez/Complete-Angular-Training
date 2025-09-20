import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent, resolveTitle, resolveUsername } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.route';

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Tasks',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'Hello'
    },
    resolve: {
      userName: resolveUsername
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
