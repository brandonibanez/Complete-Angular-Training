import { Component, OnInit } from '@angular/core';
import { Test2Service } from '../service/test2.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{

  constructor(private testService: Test2Service) {}

  candidate = this.testService.candidate;

  ngOnInit(): void {
    // this.testService.candidate$.subscribe(res => {
    //   this.candidate = res
    // })
  }

}
