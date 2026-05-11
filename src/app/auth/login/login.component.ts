import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidate } from './candidate';
import { AsyncPipe } from '@angular/common';
import { Test2Service } from '../service/test2.service';

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
  candidate = this.testService.candidate;

  form = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
    // password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark] }),
    confirmPassword: ['', [Validators.required]],
  }, { validators: mustBeSame });

  ngOnInit() {
    setTimeout(() => {
      this.testService.updateUser('SUPER BOOGER!');
    }, 1000);
    this.form.get('email')?.valueChanges.pipe(map(a => a!.length > 0 ? a + '@test.com' : ' ')).subscribe(val => {
      if (val) {
        this.test(val);
      }
    });
  }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>("http://localhost:8080/candidates").pipe(map(a => a.filter(a => a.name == "John")));
  }

  constructor(private testService: Test2Service, private fb: FormBuilder) { }

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
