import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Component, computed, DestroyRef, effect, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Test2Service } from '../service/test2.service';
import { Candidate } from './candidate';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from "../button/button.component";


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
  imports: [ReactiveFormsModule, FormsModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnChanges {
  ref = inject(DestroyRef);
  router = inject(Router);
  authServicce = inject(AuthService);
  @Input() something:string = '';
  @Output() something2 = new EventEmitter();
  private http = inject(HttpClient);
  candidate = this.testService.candidate;
  token: string = 'test';

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
    // this.form.get('email')?.valueChanges.pipe(map(a => a!.length > 0 ? a + '@test.com' : ' ')).subscribe(val => {
    //   if (val) {
    //     this.test(val);
    //   }
    // });
    // this.authServicce.getToken();
  }

  getCandidates(): Observable<Candidate[]> {
    console.log("GET METHOD!");
    return this.http.get<Candidate[]>("http://localhost:8080/candidates").pipe(map(a => a.filter(a => a.name == "John")));
  }

  addCandidate() {
    console.log("POST METHOD!");
    const body  = { name: "Test", place: "fourth"};
    this.http.post("http://localhost:8080/candidates", body).subscribe();
  }

  constructor(private testService: Test2Service, private fb: FormBuilder) {
    // effect(() => {
    //   console.log(`Inside effect ${this.candidate()}`);
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("NG ON CHANGES");
    const something = changes['something'];
    console.log(`Old value: ${something.previousValue}, New value: ${something.currentValue}`);
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
        this.something2.emit(a[0].name)
      },
      error: a => console.log(`Object is empty! ${a}`),
      complete: () => console.log("It is done!")
    });
    this.router.navigateByUrl('/signup');
  }

  test(val: string) {
    this.testService.updateUser(val);
  }
}
