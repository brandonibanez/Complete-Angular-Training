import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidate } from './candidate';
import { TestService } from '../service/test.service';
import { AsyncPipe } from '@angular/common';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function mustBeSame(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value === confirmPassword.value) {
    return null;
  }
  return { mustBeSame: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private http = inject(HttpClient);
  candidate$ = this.testService.candidate$;

  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
    // password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark] }),
    confirmPassword: new FormControl('', { validators: [Validators.required] }),
  }, { validators: [mustBeSame] });

  ngOnInit() {
    setTimeout(() => {
      this.testService.updateUser('SUPER BOOGER!');
    }, 1000);
  }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>("http://localhost:8080/candidates").pipe(map(a => a.filter(a => a.name == "John")));
  }

  constructor(private testService: TestService) { }

  onSubmit() {
    console.log(this.form.value);
    this.getCandidates().subscribe({
      next: a => {
        console.log(a);
        this.testService.updateUser(a[0].name);
      },
      error: a => console.log(`Object is empty! ${a}`),
      complete: () => console.log("It is done!")
    });
  }

  test(val: string) {
    this.testService.updateUser(val);
  }
}
