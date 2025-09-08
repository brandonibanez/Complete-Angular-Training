import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userName = '';
  destroyRef = inject(DestroyRef);

  // userName = computed(() => 
  //   this.userService.users.find(u => u.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.userName = this.userService.users.find(u => u.id === params.get('userId'))?.name || 'Unknown User';
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
    
  }
}
