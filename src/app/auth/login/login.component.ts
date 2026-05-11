import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Test2Service } from '../service/test2.service';
import { Candidate } from './candidate';


function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return { mustContainQuestionMark: true };
}

function mustBeSame(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password !== confirmPassword ? { mustBeSame: true } : null;
}

function mustContainChar(char: string) {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null
    }

    const charizard = control.value.includes(char);

    return charizard ? null : { mustContainChar: { requiredChar: char } };
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private http = inject(HttpClient);
  candidate = this.testService.candidate;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
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
    console.log("GET METHOD!");
    return this.http.get<Candidate[]>("http://localhost:8080/candidates/7").pipe(map(a => a.filter(a => a.name == "John")));
  }

  addCandidate() {
    console.log("POST METHOD!");
    this.http.post("http://localhost:8080/candidates", { name: "Test", place: "fourth"}).subscribe();
  }

  constructor(private testService: Test2Service, private fb: FormBuilder) {
    effect(() => {
      console.log(`Inside effect ${this.candidate()}`);
    })
  }

  onSubmit() {
    console.log(this.form);
    // this.addCandidate();
    console.log(computed(() => {
      console.log("Inside computed!");
      return `This is my signal ${this.candidate()}`;
    })());
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
