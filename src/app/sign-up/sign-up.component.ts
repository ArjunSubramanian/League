import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, AfterViewChecked {
  model: any = {};
  signUpForm: NgForm;
  @ViewChild('signUpForm') currentForm: NgForm;

  formErrors = {
    'name': '',
    'username': '',
    'password': '',
    'confirmPassword': ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 18 characters long.'
    },
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 5 characters long.',
      'maxlength': 'Username cannot be more than 12 characters long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 8 characters long.',
      'maxlength': 'Password cannot be more than 20 characters long.'
    },
    'confirmPassword': {
      'required': 'Confirm password is required.',
      'appValidateEqual': 'Confirm password field must be the same as password.'
    }
  };

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.signUpForm) { return; }
    this.signUpForm = this.currentForm;
    if (this.signUpForm) {
      this.signUpForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.signUpForm) { return; }
    const form = this.signUpForm.form;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
