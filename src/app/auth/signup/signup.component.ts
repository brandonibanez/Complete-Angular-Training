import { Component, OnInit } from '@angular/core';
import { TestService } from '../service/test.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{

  constructor(private testService: TestService) {}

  candidate$ = this.testService.candidate$;

  ngOnInit(): void {
    // this.testService.candidate$.subscribe(res => {
    //   this.candidate = res
    // })
  }

}
