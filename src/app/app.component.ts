import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  form: FormGroup;
  invalidUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.form = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.invalidNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.form);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.form.get('hobbies')).push(control);
  }

  get controls() {
    return (this.form.get('hobbies') as FormArray).controls;
  }

  invalidNames(control: FormControl): {[s: string]: boolean} {
    if (this.invalidUsernames.indexOf(control.value) !== -1) {
      return {'nameIsInvalid': true};
    }
    return null;
  }
}
