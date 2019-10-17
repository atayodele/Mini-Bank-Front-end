import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Properties
  insertForm: FormGroup;
  surname: FormControl;
  othername: FormControl;
  phoneNumber: FormControl;
  address: FormControl;
  // password: FormControl;
  // cpassword: FormControl;
  email: FormControl;
  
  ErrorMessage: string;

  constructor(private fb: FormBuilder,
    private acct: AccountService,
    private router: Router,
    private toastr: ToastrService) { }


    onSubmit() {
        let userDetails = this.insertForm.value;
        this.acct.register(userDetails.surname, userDetails.othername, userDetails.phoneNumber,
           userDetails.password, userDetails.email, userDetails.address).subscribe(result => {            
            this.toastr.success('Registration Successful');
            this.router.navigate(['/login']);
        }, error => {
            this.ErrorMessage = error.error.loginError;
            this.toastr.error(this.ErrorMessage);
        });
    }

  ngOnInit() {

    this.surname = new FormControl('', [Validators.required]);
    this.othername = new FormControl('', [Validators.required]);
    this.phoneNumber = new FormControl('', [Validators.required]);
    this.address = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    // this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    // this.cpassword = new FormControl('', [Validators.required, this.MustMatch(this.password)]);

    this.insertForm = this.fb.group(
      {
        'surname': this.surname,
        'othername': this.othername,
        'phoneNumber': this.phoneNumber,
        'email': this.email,
        'address': this.address,
        // 'password': this.password,
        // 'cpassword': this.cpassword
      });
      
  }

  // Custom Validator
  MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
        // return null if controls haven't initialised yet
        if (!passwordControl && !cpasswordControl) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (cpasswordControl.hasError && !passwordControl.hasError) {
          return null;
        }
        // set error on matchingControl if validation fails
        if (passwordControl.value !== cpasswordControl.value) {
          return { 'mustMatch': true };
        }
        else {
          return null;
        }
    }
}

}
