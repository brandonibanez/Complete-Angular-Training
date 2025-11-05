import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

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
        'email': new FormControl(null, [Validators.required, Validators.email], this.invalidEmails.bind(this)),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    });
    this.form.statusChanges.subscribe(status => {
      console.log(status);
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

  invalidEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsInvalid': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
    
}
