import { OnEndResult } from './../../../../node_modules/esbuild/lib/main.d';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark] }),
    confirmPassword: new FormControl('', { validators: [Validators.required] }),
  }, { validators: [mustBeSame] });

  onSubmit() {
    console.log(this.form.value);
  }
}
